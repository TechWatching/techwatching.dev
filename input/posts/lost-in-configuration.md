Title: ASP.NET Core - Lost in configuration
Lead: How should you use configuration providers in ASP.NET Core ?
Published: 27/09/2021
Image: /images/tokyo.jpg
Tags:
  - ASP.NET Core
  - configuration
  - Azure Key Vault
  - Azure
---
Have you ever felt a bit overwhelmed by the configuration in a project, not knowing where to look for the settings between the command line parameters, the environment variables, the configuration files in code, the configuration in Azure, ... ? When developing an ASP.NET Core application there are many places where you can put your configuration which makes it difficult to know where you should put it. Even if the [official documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/) about configuration in ASP.NET Core is very complete and well written, it only describes what you can use and how to use it, not what you should use and when. In this article,     I will try to answer these questions and give you my opinion about how we should use configuration providers in ASP.NET Core.
                       
# A quick reminder about configuration

Configuration is what allows you to quickly change how an application behaves by modifying a setting instead of rewriting the code. Configuration/settings are sometimes linked to the environment where your application runs but not always. Generally, when something is likely to change, a good practice is to define a setting for it in the configuration instead of hard coding it in the source code.

Configuration can take many forms and ASP.NET Core has this powerful concept of configurations providers that read configuration data from different sources. But in the end, configuration is just a collection of key-value pairs.

<img src="/posts/images/lostinconfiguration_providers_2.png" class="img-fluid centered-img">

# Why do I have so many configuration providers by default?

When you create a new ASP.NET Core project from a template and run it, you have probably noticed that your configuration is not empty and that by default, multiple configuration providers are already registered.
<img src="/posts/images/lostinconfiguration_providers_1.png" class="img-fluid centered-img">

Do not worry there is no magic here, it just comes from the call `Host.CreateDefaultBuilder(args)` in your Program.cs.
Here is an extract of what does this method:

```csharp
builder.ConfigureAppConfiguration((hostingContext, config) =>
{
    IHostEnvironment env = hostingContext.HostingEnvironment;
    bool reloadOnChange = GetReloadConfigOnChangeValue(hostingContext);
    config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: reloadOnChange)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange:reloadOnChange);
    if (env.IsDevelopment() && env.ApplicationName is { Length: > 0 })
    {
        var appAssembly = Assembly.Load(new AssemblyName(env.ApplicationName));
        if (appAssembly is not null)
        {
            config.AddUserSecrets(appAssembly, optional: true, reloadOnChange: reloadOnChange);
        }
    }
    config.AddEnvironmentVariables();
    if (args is { Length: > 0 })
    {
        config.AddCommandLine(args);
    }
})
```

As you can see, by default this `CreateDefaultBuilder` method loads configuration data using different configuration providers. You can load additional configuration by calling the `ConfigureAppConfiguration` in the `Program.cs` like in the example which uses Azure Key Vault configuration provider.

<img src="/posts/images/lostinconfiguration_providers_4.png" class="img-fluid centered-img">

It is important to know that order in which the configuration provider is specified matters: in case multiple providers load different values for the same setting, the value of the last provider specifying this setting is the one that will be used in the configuration. You can see in which order the configuration is loaded from different sources in the method documentation.

<img src="/posts/images/lostinconfiguration_providers_3.png" class="img-fluid centered-img">

If the order in which configuration providers are registered by default does not suit you, then you can simply create the `HostBuilder` yourself in `Program.cs` instead of using `CreateDefaultBuilder` method.

# How to have a global view of the configuration used by your application?

Having different providers to load the configuration in your application is great but one drawback is that the configuration is scattered all over the place. Indeed sometimes we want to have the complete list of settings an application uses and if we have to look everywhere (key vault, environment variables, JSON files,...) it becomes impossible to manage.

What I advise is to put all the settings you use in your application in the `appsettings.json` file. It does not mean you will put all the values there too or that the values you put there will be the ones that your application will use. But it means that you will have one place where you can quickly look what are the different settings keys. And concerning the values of these settings, if they should come from another file or provider (because they are relative to an environment or because they are secrets for instance), that is not a problem just put a blank value. 

So why using the `appsettings.json` file for that? In the last section, I showed the code that loads some configuration by default and you may have noticed that this settings file is the first loaded into configuration. That means any following configuration source will override the existing values coming from the `appsettings.json` file, so having all the settings declared in the `appsettings.json` file won't be a problem even if some have blank values (they will be overridden by the values loaded after). 

>🗨 When running your application locally, if you want to display what are the values of the settings in your configuration and where their values come from you can read [this article](https://andrewlock.net/debugging-configuration-values-in-aspnetcore/) by Andrew Lock that explains how to do that using the `IConfigurationRoot.GetDebugView()` method.

# What about configuration in an App Service or an Azure Function, is it a specific configuration provider?

Well, the answer is no. Application settings in the configuration of an App Service or a Function App (the settings you can see in the Azure portal) are passed as environment variables to the application. 

<img src="/posts/images/lostinconfiguration_azureconfig_1.png" class="img-fluid centered-img">

If you remember in which order the providers are registered, it means that configuration in Azure will override most of the configuration coming from other providers.

# Where to put environment-dependent configuration?
 
As the name suggests, environment variables are a good place to set your environment-dependent configuration. If you are deploying your ASP.NET Core application in an Azure App Service, you can set these environment variables in the application settings section of your App Service in the Azure portal. However, I guess you are probably using an Infrastructure as Code tool (like Pulumi or Terraform) instead of manually modifying your Azure resources in the portal, so that means your environment-dependent configuration will be stored among your infrastructure code and deployed to Azure with the rest of the infrastructure.

>🗨 To know more about how are managed Environments in ASP.NET Core you can read [this page of the official documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments) that talks about that.

Using environment variables is a good approach but it is less convenient than having settings in your JSON settings files. Moreover, if these environment settings are only in your cloud resources, you will miss some settings when you debug your application locally. That's why I think it is a good idea to take advantage of ASP.NET Core default behavior  (see `CreateDefaultBuilder` implementation above) of loading the `appsettings` JSON file corresponding to the current environment. That way, if you have for example a staging environment you can set the environment variable `ASPNETCORE_ENVIRONMENT` to staging and put all your configuration for staging in the `appsettings.staging.json`. This may not work for everything as some settings depend on your infrastructure deployment (maybe you only know the value of a setting after the deployment of the infrastructure), but in that case you will put these settings in your environment variables thanks to your infrastructure code and anyway that should not prevent you from putting them in your `appsettings.json` files afterward to make local debug easier. 

<img src="/posts/images/lostinconfiguration_appsettings_1.png" class="img-fluid centered-img">

# How to deal with secrets in my application configuration?

There are multiple ways of handling secrets but there is one fundamental rule: 'never commit a secret in source control'. Whatever the context, there is no valid reason that justifies putting a value in source code, that's it.

One easy way to avoid having secrets in your source code is to use [Secret Manager](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets#secret-manager). It is a nice tool that allows you to put your secrets in a `secrets.json` file stored in your user profile directory (thus not committed with the rest of the code). When your application runs locally, secrets are loaded from this file in your application configuration thanks to the [File configuration provider](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-5.0#file-configuration-provider) and everything works fine without having to put secrets in the configuration files in source control (`appsettings.json` for instance).

<img src="/posts/images/lostinconfiguration_secrets_1.png" class="img-fluid centered-img">

Secret manager is interesting to debug your application locally when developing but apart from that you will want to use a vault to safely store your secrets and make them available to your application. Each cloud provider has its vault solution: Azure Key Vault, AWS Secret Manager, Google Cloud Secret Manager, and there are also third-party vaults like HashiCorp Vault for instance. To integrate with a vault, you could write your own custom provider that loads the secrets from the vault into configuration but for each of these vaults, there is a configuration provider package supported by the editor or the community.

For instance, to inject secrets from an Azure KeyVault in your configuration you should use the following code:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder()
        .ConfigureAppConfiguration((context, config) =>
        {
            var keyVaultEndpoint = new Uri(Environment.GetEnvironmentVariable("VaultUri"));
            config.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());
        })
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```
 
Vaults are generally cheap and anyway it is not as if security was an optional feature we should choose to add or not, therefore there is no reason not to use a vault to keep your secrets safe.

# How to share configuration between different applications?

There is a specific Azure component for that which is [Azure App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview). It provides you a centralized place to manage your configuration for different applications, environments and locations. It also provides you other interesting features like the ability to dynamically change the value of an application setting without the need to restart this application.

<img src="/posts/images/lostinconfiguration_appconfig_1.png" class="img-fluid centered-img">

Azure App Configuration has its configuration provider that you can register like that:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder()
        .ConfigureAppConfiguration((context, config) =>
        {
            var settings = config.Build();
            var appConfigurationConnectionUri = new Uri(settings.GetValue<string>("Endpoints:AppConfig"));
            config.AddAzureAppConfiguration(options =>
            {
                options.Connect(appConfigurationConnectionUri, new DefaultAzureCredential());
            });
        })
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```

# Which configuration provider can help me to use A/B testing and feature flags in my code?

[Azure App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview) is also the configuration provider to use when you want to use A/B testing or feature flags. 
There are probably other configuration providers that allow you to do that but this is the one I know.

# What is the point of using the `launchsettings.json` file?

Unlike the `appsettings` files, the `launchsettings.json` file is not used when you build and deploy your application somewhere. It is only useful to debug your application code locally. The tools you use to run your application on your local machine (your IDE or the .NET Core CLI) will use the settings in this file to provide configuration to your apps through environments variables or command line arguments. By default, this file will set the `ASPNETCORE_ENVIRONMENT` environment variable (or `DOTNET_ENVIRONMENT` depending on whether your application is an ASP.NET Core application or not) to `Development` so that you debug your code with the `Development` configuration

<img src="/posts/images/lostinconfiguration_launchsettings_1.png" class="img-fluid centered-img">

>🗨 You can define multiple profiles in the `launchsettings.json` file to be able to run your application with multiple configurations. It can be interesting to create a `Staging profile` to debug your application with the `Staging` configuration; for instance to reproduce a bug that only happens in Staging environment. 

# Let's recap.

To know where to put your settings in an ASP.NET Core project you have to ask yourself some questions: is this setting secret or not, does its value depends on the environment, will it be shared with other applications... ?

My point of view about how to handle the configuration in an ASP.NET Core project is the following:
- put all your settings in the appsettings.json file (without necessarily putting the values of the settings) to have a global view of the configuration used by your application
- keep a `appsettings.{EnvironmentName}.json` file by environment in your project with only the settings that are dependent on the environment
- never store secrets in source code and use an Azure Key Vault to store the settings that are secrets
- create different profiles in your `launchsettings.json`file to debug your application locally with different configurations
- use environment variables (through `launchsettings.json` locally and application settings in Azure) to override settings previously defined in other configuration sources
- think about Azure App Configuration if you need to share some settings among different applications

I hope this article has answered some of your questions about configuration ASP.NET Core and that you feel less lost now. Have fun with configuration providers!