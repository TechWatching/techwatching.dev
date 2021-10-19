Title: Goodbye Azure Portal, Welcome Azure CLI
Lead: Let's jump into Azure CLI!
Published: 08/04/2019
Image: /images/green-characters.jpg
Tags:
  - Azure CLI
  - Azure
  - shell
---
In this article about Azure CLI, we will talk about:
- [Managing Azure resources](#managing-azure-resources)
- [Azure CLI Syntax](#azure-cli-syntax)
- [Deep dive in Azure CLI](#deep-dive-in-azure-cli)
- [Where to use Azure CLI](#where-to-use-azure-cli)
- [Azure CLI Interactive mode](#azure-cli-interactive-mode)

Azure CLI can be installed by following the instructions on [this page](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).

# 1 - Managing Azure resources
Azure resources can be managed in different ways but the main ones are the [Azure Portal](https://portal.azure.com), [Azure PowerShell](https://docs.microsoft.com/en-us/powershell/azure/) and [Azure CLI](https://docs.microsoft.com/en-us/cli/azure). If you are new to Azure or if you are creating resources you are not familiar with, it is always nice to have a GUI to understand what you are doing and Azure Portal is the right way to go.  

<img src="/posts/images/azurecli_portal_1.png" class="img-fluid centered-img">

However, handling resources in the portal, moving from pane to pane to always do the same kind of operations can quickly become a little cumbersome. So if you want to be more productive or if you are more of a command line person, you will find in Azure CLI or Azure PowerShell really good alternatives to Azure Portal. Both of them are cross-platform tools (PowerShell Core runs on Windows, macOS, and Linux 😀) and provide the same functionalities to manage Azure resources.

Until recently, when I was not using the Azure Portal I was more prompt to use Azure PowerShell than Azure CLI, probably because I was often finding samples of what I wanted to do written in PowerShell. But in fact, there are lots of commands in Azure PowerShell and even with autocomplete I am not good at remembering them. So I couldn't stop returning to using Azure Portal 😕. And yet, lately, I finally came back to the command line when I started to discover the power of Azure CLI: such a nice and above all easy tool to use and that's what I will try to show you next.

# 2 - Azure CLI Syntax

The Azure CLI Syntax is simple to understand. For instance, the command `az webapp list` will list the WebApps in the subscription you are currently logged in.

An Azure CLI command has the following structure:
- a **command group** which represents an Azure service and which can be the composition of subgroups
- a **command** which is the action you want to do on the group / Azure service
- **arguments** optionally which are a list of parameter names and values

To sign in to your Azure account in your terminal, you have to execute the Azure CLI command `az login` where `az` is the command group and `login` is the command relative to the group/service `az` (meaning Azure). 

In our previous example, `az webapp list` :
- `az webapp` was the command group composed of `az` and its subgroup `webapp`
- `list` was the command
- no arguments here

We could have added some arguments to this command, like the `--resource-group` argument (or `-g`) to list only the WebApps in a specific resource group and that would have become `az webapp list --resource-group 'myResourceGroupName'`

A few arguments are globally available arguments which means that can be used for every command. This is the case of the `--help` argument which displays help information about a command. The following example showing the use of the `--help` argument allows us to better understand the structure of an Azure CLI command.

<img src="/posts/images/azurecli_console_1.png" class="img-fluid centered-img">

Once used to the Azure CLI syntax, it is way more convenient than the Azure Portal and you don't have to search what Azure PowerShell command you need to use. You just have to look for the available subgroups and commands in the Azure service where you want to work (don't forget to use `--help`) and you will quickly get the job done.

# 3 - Deep dive in Azure CLI

## Command output
<img src="/posts/images/azurecli_console_2.png" class="img-fluid centered-img">

By default, the output format of Azure CLI commands is JSON but there are other formats you can use by specifying an output argument (`--output` or `-o`) like this: `az group list -o table`.

<img src="/posts/images/azurecli_console_3.png" class="img-fluid centered-img">

💎 The default output format can be configured using the `az configure` command. This command also allows you to configure other settings like a default resource group for your commands for instance.

## Using variables
Whether you choose to run your commands in Bash or PowerShell, you can use variables with Azure CLI, only the syntax for creating variables will change depending on the command-line shell you use. 
>The samples in this article use the PowerShell syntax. 

```
$rgName = 'TestingAzureCLI'

# Create a new resource group
az group create -n $rgName -l westeurope

# Create an App Service plan with the Free tier
az appservice plan create -n $webAppName -g $rgName --sku FREE

# Show the App Service plan just created 
az appservice plan show -n $webAppName -g $rgName 

# Store the result of the show query in a PowerShell variable
$servicePlan = az appservice plan show -n $webAppName -g $rgName 
```

## JMESPath

If you don't know [JMESPath](http://jmespath.org/), it is a query language for JSON that allows to extract and transform elements from a JSON document or CLI output in the context of Azure CLI. 

To use JMESPath you have to add in your CLI command the argument `--query` followed by your JMESPath query.
Let's see that with some examples.

The query `az group list` executed on my subscription returns the following JSON:
```json
[
  {
    "id": "/subscriptions/********-****-****-****-************/resourceGroups/CloudShellRG",
    "location": "westeurope",
    "managedBy": null,
    "name": "CloudShellRG",
    "properties": {
      "provisioningState": "Succeeded"
    },
    "tags": {
      "Environment": "Production"
    },
    "type": null
  },
  {
    "id": "/subscriptions/********-****-****-****-************/resourceGroups/MyApp1ResourceGroup",
    "location": "canadacentral",
    "managedBy": null,
    "name": "MyApp1ResourceGroup",
    "properties": {
      "provisioningState": "Succeeded"
    },
    "tags": {
      "Department": "RH",
      "Environment": "Dev"
    },
    "type": null
  },
  {
    "id": "/subscriptions/********-****-****-****-************/resourceGroups/TestingAzureCLI",
    "location": "westeurope",
    "managedBy": null,
    "name": "TestingAzureCLI",
    "properties": {
      "provisioningState": "Succeeded"
    },
    "tags": {
      "Department": "IT",
      "Environment": "Production"
    },
    "type": null
  }
]
```
Here are some CLI commands that query more precisely the resource groups:
- Select only the resource groups names with `az group list --query '[].name'`
<img src="/posts/images/azurecli_jmespath_2.png" class="img-fluid centered-img">

- Filter on resource groups in West Europe with `az group list --query "[?location=='westeurope']"`
<img src="/posts/images/azurecli_jmespath_1.png" class="img-fluid centered-img">

- Filter on resource groups with an Environment tag with the value Production, select and rename name and tags properties with `az group list --query "[?tags.Environment=='Production'].{RGName:name, RGTags:tags}"`
<img src="/posts/images/azurecli_jmespath_3.png" class="img-fluid centered-img">

💎 JMESPath is not an Azure CLI only thing, it is used in different other projects or tools like the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-output.html#controlling-output-filter).

## Mixing output, variables, and JMESPath
Once you have understood how to use variables, commands output, and JMESPath with Azure CLI you can mix everything to manage Azure resources with CLI commands that use results of previous CLI commands, which can make powerful scripts :)

Let's presume that we want to create a Web App for the IT Department in an existing App Service Plan of our subscription located in West Europe.
We can do the following:
```
# Retrieve resource group name of IT Department in West Europe
$itRgName = az group list --query "[?tags.Department=='IT' && location=='westeurope'].name" -o tsv

# Retrieve app service plan name in this resource group
$appServicePlan = az appservice plan list -g $itRgName --query "[0].name" -o tsv

# Create a new Web App on this app service plan
az webapp create -n "MyNewWebAp" -g $itRgName --plan $appServicePlan

# List all Web App in this resource group
az webapp list -g $itRgName --query "[].name"
```

This is just a quick example but you can easily imagine all the possibilities that Azure CLI offers you.

# Where to use Azure CLI

All that is great but we haven't talked about where we can use Azure CLI, let's do that now!

## Bash vs PowerShell
We briefly mentioned that you can run Azure CLI in Bash or PowerShell, and as a matter of fact you can also run it in Windows Command Prompt.
Although Azure CLI is originally designed to be bash-oriented, it works fine in PowerShell so it's a perfectly valid choice too. What command line shell you choose is up to you!

And don't think that you will be limited to using one or the other shell depending on the platform you are working on, because both PowerShell and Bash are available whatever your platform (PowerShell Core is cross-platform and Bash is available in Windows through Windows Subsystem for Linux). Therefore I would just suggest you use Azure CLI with the shell you are most familiar with.

Just a quick note about autocompletion: at this time tab completion is only supported in bash and Microsoft currently does not plan to add support for PowerShell but is open to contributions from the community. That's not a big deal but that's good to know, there is a [GitHub issue](https://github.com/Azure/azure-cli/issues/2324) on this matter. If you are not using bash and that tab completion is important for you, [Azure CLI interactive mode](https://docs.microsoft.com/en-us/cli/azure/interactive-azure-cli?view=azure-cli-latest) is what you are looking for (we will talk about it later in the article)! 

## Azure CLI in Visual Studio Code
As for most of Azure components, there is an extension in vs code for Azure CLI: Azure CLI Tools.

<img src="/posts/images/azurecli_vscode_1.png" class="img-fluid centered-img">

With this extension you can create Azure CLI Scrapbooks which are files with an `.azcli` extension where you have IntelliSense on CLI commands you write. 

<img src="/posts/images/azurecli_vscode_3.png" class="img-fluid centered-img">

It also allows you to run commands in the integrated terminal or run them and show their output in a side-by-side editor as showN in the screenshot below.    

<img src="/posts/images/azurecli_vscode_2.png" class="img-fluid centered-img">

## Azure Cloud Shell

I did not talk about Azure CLI installation but you can find everything you need in [Microsoft documentation](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest). Actually, Azure Cloud Shell provides you a way to use Azure CLI without installing anything.

If we quote the documentation:
>Azure Cloud Shell is an interactive, browser-accessible shell for managing Azure resources

In concrete terms, you open a browser, go to https://shell.azure.com, log in to your Azure subscription and you have access to a shell (PowerShell or Bash) that can interact with all the resources of your subscription through Azure CLI. 

<img src="/posts/images/azurecli_cloudshell_1.png" class="img-fluid centered-img">

Cloud Shell in itself is free but requires an Azure file share to be mounted so you will have regular storage costs (which are low).

Azure Cloud Shell is also available in the Azure Portal or directly in your vs code integrated terminal through the [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account).

# Azure CLI Interactive mode

I mentioned Azure CLI interactive mode as a way to have auto-completion. In fact, it is much more than that as it also provides you with command descriptions, examples, completion on resources names, JMESPath on the previous command... 

To enter in interactive mode, you have to type `az interactive` in your terminal. 
Then you can type your CLI commands with autocompletion, a description of the command you are using, and examples for it. Moreover, while you are typing a command you will see help about the arguments for this command.

<img src="/posts/images/azurecli_interactive_1.png" class="img-fluid centered-img">

One thing to notice is that commands you type are scoped to a command group. By default, it's scoped to `az` group so you don't have to type the `az` keyword before your commands. So by default, it only saves you two characters as you will write `group list` instead of `az group list`. But you can set the scope to any subgroup as you can see in the following example.

<img src="/posts/images/azurecli_interactive_2.png" class="img-fluid centered-img">

Another nice thing you can do with the interactive mode is to query the results of your previous command using the JMESPath syntax.
Imagine I just have executed the command `group list` in interactive mode. If I want to select only the names in the results of this command, I can just type `"?? [*].name"`.

<img src="/posts/images/azurecli_interactive_3.png" class="img-fluid centered-img">

As you can see in the example above, you can even use a JMESPath query on the previous command as an argument for your next command. Here we are listing all resources on the TestingAzureCLI group.

💎 It can sometimes be a little slow to use Azure interactive mode on https://shell.azure.com/, so if it happens to you I suggest you use the vs code integrated terminal (if you want to use Azure Cloud Shell) or any terminal you want (if you have the Azure CLI installed) instead of the browser.

💎 If you like interactive CLI, you can also have a look at [AzBrowse](https://github.com/lawrencegripper/azbrowse) which is a nice community project.

# To conclude

Even if the title of this article suggests saying goodbye to Azure Portal, when you start using Azure CLI you are not going to stop completely using Azure Portal. You will always need a GUI for some tasks or to better visualize things. However, you will probably use less often Azure Portal as you are going to find yourself more productive with Azure CLI and will enjoy being able to script everything ✨.

There is still much to say about Azure CLI but that's already a long article so the best thing is that you try it by yourself!