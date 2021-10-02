Title: Automate configuration of Teams Tab SSO with PowerShell.
Lead: Creating a PowerShell script to configure SSO for the tab of a Teams application.
Published: 15/06/2020
Image: /images/shell_1.jpg
Tags:
  - Microsoft Teams
  - PowerShell
  - Azure Active Directory
---
If you have no interest in reading the blog post and just want the final script, you can find it on this [GitHub repository](https://github.com/TechWatching/TeamsDev/blob/master/infra/Scripts/ConfigureTeamsTabSSO.ps1).

## Context

Several months ago, I supervised a student project aiming at developing a Teams application for my company. The application is mainly composed of a tab where Human Resources people can see information about arrivals and departures in the company. Once the project finished and a first version of the application available, I provisioned the application infrastructure on my company Azure tenant using [Pulumi](https://www.pulumi.com/) which is a really nice infrastructure as code platform. 

However, configuring Single Sign-On for the tab of the application did not seem possible with Pulumi as it internally uses Terraform Provider for AzureAD which at the time of writing don't have all functionalities necessary to configure this. The [documentation about SSO for Teams tab](http://aka.ms/teams-sso) currently lists all the steps necessary to configure it from the Azure Portal, however it mentions nothing about automating it, hence this blog post.

## Steps to create the PowerShell script

Usually I prefer Azure CLI to PowerShell as I find easier to find commands I need, but Azure CLI doesn't have yet the necessary commands. Most of the code comes from [this script](https://github.com/Azure-Samples/active-directory-dotnet-native-aspnetcore-v2/blob/master/3.-Web-api-call-Microsoft-graph-for-personal-accounts/AppCreationScripts/Configure.ps1) located in a repository of the [Azure Samples GitHub organization](https://github.com/Azure-Samples). I took only what was necessary for Teams Tab SSO, adapted it to use Microsoft Graph objects / commands and added missing commands.

I am not an expert in PowerShell so there might me things to improve in the final script, but I hope the following steps will help you to understand how to configure SSO for your Teams Tab.

### Interacting with Azure Active Directory

PowerShell has a module called [AzureAd](https://docs.microsoft.com/en-us/powershell/module/azuread/?view=azureadps-2.0) that allow us to interact with Azure Active Directory.
First step is to install this module if not already installed, import it and authenticate to Azure AD in order to be able to use Active Directory commands once authenticated.

```PowerShell
if ($null -eq (Get-Module -ListAvailable -Name "AzureAD")) { 
    Install-Module -Name "AzureAD" -Force
}

Import-Module AzureAD

Connect-AzureAD -TenantId $tenantId
```

This will prompt us to login with our AD account. We will see later in the article how we can avoid that if we are using this script in an Azure Pipeline.

### Retrieving the application registration

I already created my application registration in AD with Pulumi so I just have to retrieve it before configuring it.

```PowerShell
$app = Get-AzureADMSApplication -ObjectId $applicationObjectId
```

If you don't have an existing application registration you can create one with the `New-AzureADMSApplication` command.

💎 You may note that there are similar commands `Get-AzureADApplication` and `New-AzureADApplication` that exist. Both commands work fine but commands with *MS* in their name internally use Microsoft Graph which seems to be the modern way to interact with Azure AD.

### Creating the service principal

When you register an application in Azure Portal it creates an Application object and a Service Principal in your tenant. But if you create the Application outside the Azure Portal (Azure CLI, PowerShell, Pulumi, ...), you will have to create the Service Principal as well. Just as a reminder the [application object should be considered as the global representation of your application for use across all tenants, and the service principal as the local representation for use in a specific tenant](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals#application-and-service-principal-relationship). 

```PowerShell
New-AzureADServicePrincipal -AppId $app.AppId -Tags {WindowsAzureActiveDirectoryIntegratedApp}
```

### Exposing an application as an API

To expose an application as an API, it is necessary to set the identifier URI of the application. We will use a variable `$customDomainName` to specify the custom domain of the application. Indeed as stated by the documentation, for the moment Teams Tab SSO does not support applications that use the azurewebsites.net domain. 

```PowerShell
$appId = $app.AppId
Set-AzureADMSApplication -ObjectId $app.Id -IdentifierUris "api://$customDomainName/$appId"
```

### Creating the access_as_user scope

Teams Tab SSO works by making the Teams client (whether it be Teams mobile app, desktop app or web app) ask for an Azure AD token with the scope `access_as_user` of the Tab application you developed. So we need to create a scope `access_as_user` in the application.

```PowerShell
# Add all existing scopes first
$scopes = New-Object System.Collections.Generic.List[Microsoft.Open.MsGraph.Model.PermissionScope]
$app.Api.Oauth2PermissionScopes | foreach-object { $scopes.Add($_) }
$scope = CreateScope -value "access_as_user"  `
    -userConsentDisplayName "Teams can access the user’s profile"  `
    -userConsentDescription "Allows Teams to call the app’s web APIs as the current user."  `
    -adminConsentDisplayName "Teams can access your user profile and make requests on your behalf"  `
    -adminConsentDescription "Enable Teams to call this app’s APIs with the same rights that you have"
$scopes.Add($scope)
$app.Api.Oauth2PermissionScopes = $scopes
Set-AzureADMSApplication -ObjectId $app.Id -Api $app.Api
```
This piece of PowerShell just ensures existing scopes won't be deleted when adding the scope `access_as_user`. Display names and descriptions of the new scope are the ones recommended in the documentation. This code calls a PowerShell function that simply creates the scope object.

```PowerShell
<#.Description
   This function creates a new Azure AD scope (OAuth2Permission) with default and provided values
#>  
function CreateScope(
    [string] $value,
    [string] $userConsentDisplayName,
    [string] $userConsentDescription,
    [string] $adminConsentDisplayName,
    [string] $adminConsentDescription)
{
    $scope = New-Object Microsoft.Open.MsGraph.Model.PermissionScope
    $scope.Id = New-Guid
    $scope.Value = $value
    $scope.UserConsentDisplayName = $userConsentDisplayName
    $scope.UserConsentDescription = $userConsentDescription
    $scope.AdminConsentDisplayName = $adminConsentDisplayName
    $scope.AdminConsentDescription = $adminConsentDescription
    $scope.IsEnabled = $true
    $scope.Type = "User"
    return $scope
}
```

### Preauthorize Teams clients.

As the Teams clients will ask a token with the previously created scope, they must be authorized to have access to this permission. That is what does the following script:

```PowerShell
# Authorize Teams mobile/desktop client and Teams web client to access API
$preAuthorizedApplications = New-Object 'System.Collections.Generic.List[Microsoft.Open.MSGraph.ModePreAuthorizedApplication]'
$teamsRichClienPreauthorization = CreatePreAuthorizedApplication `
    -applicationIdToPreAuthorize '1fec8e78-bce4-4aaf-ab1b-5451cc387264' `
    -scopeId $scope.Id
$teamsWebClienPreauthorization = CreatePreAuthorizedApplication `
    -applicationIdToPreAuthorize '5e3ce6c0-2b1f-4285-8d4b-75ee78787346' `
    -scopeId $scope.Id
$preAuthorizedApplications.Add($teamsRichClienPreauthorization)
$preAuthorizedApplications.Add($teamsWebClienPreauthorization)   
$app = Get-AzureADMSApplication -ObjectId $applicationObjectId
$app.Api.PreAuthorizedApplications = $preAuthorizedApplications
Set-AzureADMSApplication -ObjectId $app.Id -Api $app.Api
```
This code calls a PowerShell function that simply creates the PreAuthorizedApplication object.

```PowerShell
<#.Description
   This function creates a new PreAuthorized application on a specified scope
#>  
function CreatePreAuthorizedApplication(
    [string] $applicationIdToPreAuthorize,
    [string] $scopeId)
{
    $preAuthorizedApplication = New-Object 'Microsoft.Open.MSGraph.Model.PreAuthorizedApplication'
    $preAuthorizedApplication.AppId = $applicationIdToPreAuthorize
    $preAuthorizedApplication.DelegatedPermissionIds = @($scopeId)
    return $preAuthorizedApplication
}
```

### Grant user-level Graph API permissions

Next step consists in specifying the permissions the application will need for the AAD endpoint: email, offline_access, openid, profile ([OpenID connect scopes](https://docs.microsoft.com/fr-fr/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes)).

```PowerShell
# Add API permissions needed
$requiredResourcesAccess = New-Object System.Collections.Generic.List[Microsoft.Open.MsGraph.Model.RequiredResourceAccess]
$requiredPermissions = GetRequiredPermissions `
    -applicationDisplayName 'Microsoft Graph' `
    -requiredDelegatedPermissions "User.Read|email|offline_access|openid|profile"
$requiredResourcesAccess.Add($requiredPermissions)   
Set-AzureADMSApplication -ObjectId $app.Id -RequiredResourceAccess $requiredPermissions
```

This codes calls a PowerShell function `GetRequiredPermissions` that add the delegated or application permissions specified in parameter. Here we only ask for delegated permissions of Microsoft Graph needed to retrieve an OpenId Connect token but this function is generic and could be used to require scopes or roles of other APIs.

```PowerShell
#
# Example: GetRequiredPermissions "Microsoft Graph"  "Graph.Read|User.Read"
# See also: http://stackoverflow.com/questions/42164581/how-to-configure-a-new-azure-ad-application-through-powershell
function GetRequiredPermissions(
    [string] $applicationDisplayName,
    [string] $requiredDelegatedPermissions,
    [string]$requiredApplicationPermissions,
    $servicePrincipal)
{
    # If we are passed the service principal we use it directly, otherwise we find it from the display name (which might not be unique)
    if ($servicePrincipal)
    {
        $sp = $servicePrincipal
    }
    else
    {
        $sp = Get-AzureADServicePrincipal -Filter "DisplayName eq '$applicationDisplayName'"
    }

    $requiredAccess = New-Object Microsoft.Open.MsGraph.Model.RequiredResourceAccess
    $requiredAccess.ResourceAppId = $sp.AppId 
    $requiredAccess.ResourceAccess = New-Object System.Collections.Generic.List[Microsoft.Open.MsGraph.Model.ResourceAccess]

    # $sp.Oauth2Permissions | Select Id,AdminConsentDisplayName,Value: To see the list of all the Delegated permissions for the application:
    if ($requiredDelegatedPermissions)
    {
        AddResourcePermission $requiredAccess -exposedPermissions $sp.Oauth2Permissions -requiredAccesses $requiredDelegatedPermissions -permissionType "Scope"
    }
    
    # $sp.AppRoles | Select Id,AdminConsentDisplayName,Value: To see the list of all the Application permissions for the application
    if ($requiredApplicationPermissions)
    {
        AddResourcePermission $requiredAccess -exposedPermissions $sp.AppRoles -requiredAccesses $requiredApplicationPermissions -permissionType "Role"
    }
    return $requiredAccess
}
```
The `GetRequiredPermissions` function calls a `AddResourcePermission` function that creates permissions (ResourceAccess objects). 

```PowerShell
# Adds the requiredAccesses (expressed as a pipe separated string) to the requiredAccess structure
# The exposed permissions are in the $exposedPermissions collection, and the type of permission (Scope | Role) is 
# described in $permissionType
function AddResourcePermission(
    $requiredAccess,
    $exposedPermissions,
    [string]$requiredAccesses,
    [string]$permissionType)
{
        foreach($permission in $requiredAccesses.Trim().Split("|"))
        {
            foreach($exposedPermission in $exposedPermissions)
            {
                if ($exposedPermission.Value -eq $permission)
                {
                    $resourceAccess = New-Object Microsoft.Open.MsGraph.Model.ResourceAccess
                    $resourceAccess.Type = $permissionType # Scope = Delegated permissions | Role = Application permissions
                    $resourceAccess.Id = $exposedPermission.Id # Read directory data
                    $requiredAccess.ResourceAccess.Add($resourceAccess)
                }
            }
        }
}
```

## Using the script in an Azure Pipeline

To execute this script in the Azure pipeline that deploys and configures the rest of the application infrastructure we can use an [Azure PowerShell task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-powershell?view=azure-devops). 

The task of the Azure Pipeline will look like this:

```yaml
- task: AzurePowerShell@5
  displayName: 'Configure Teams tab SSO'
  inputs:
    azureSubscription: 'My Azure Service Connection'
    ScriptType: 'FilePath'
    ScriptPath: 'infra/AdditionalScripts/ConfigureTeamsTabSSO.ps1'
    ScriptArguments: 
      -applicationObjectId $(AzureAdObjectId) `
      -customDomainName $(CustomDomainName)
    azurePowerShellVersion: 'LatestVersion'
```

The advantage is that this task will connect to Azure with an Azure Service Connection that has enough rights to execute the Azure AD commands in this script. However it involves passing to the `Connect-AzureAD` command the access token of the Service Principal associated to the Azure Service Connection. This can easily be done as I found out in [a stackoverflow post](https://stackoverflow.com/questions/60185213/automate-connect-azuread-using-powershell-in-azure-devops).

```PowerShell
$context = [Microsoft.Azure.Commands.Common.Authentication.Abstractions.AzureRmProfileProvider]::Instance.Profile.DefaultContext
$graphToken = [Microsoft.Azure.Commands.Common.Authentication.AzureSession]::Instance.AuthenticationFactory.Authenticate($context.Account, $context.Environment, $context.Tenant.Id.ToString(), $null, [Microsoft.Azure.Commands.Common.Authentication.ShowDialog]::Never, $null, "https://graph.microsoft.com").AccessToken
$aadToken = [Microsoft.Azure.Commands.Common.Authentication.AzureSession]::Instance.AuthenticationFactory.Authenticate($context.Account, $context.Environment, $context.Tenant.Id.ToString(), $null, [Microsoft.Azure.Commands.Common.Authentication.ShowDialog]::Never, $null, "https://graph.windows.net").AccessToken
Connect-AzureAD -AadAccessToken $aadToken -MsAccessToken $graphToken -AccountId $context.Account.Id -TenantId $context.tenant.id
```

### Summary
In this post, I wanted to show the different steps to configure Teams Tab SSO in PowerShell. The final script can be found [here](https://github.com/TechWatching/TeamsDev/blob/master/infra/Scripts/ConfigureTeamsTabSSO.ps1) and is directly used in an Azure pipeline to automate this configuration. Although it does the job, I hope doing such Azure AD configurations will be supported soon in Pulumi as it would have been easier to set it up instead of coming up with a big PowerShell script like this which is not idempotent.   

