Title: You almost no longer need Key Vault references for Azure Functions.
Lead: Talking about how to manage configuration secrets in Azure Functions.
Published: 21/09/2020
Image: /images/lightning_1.jpg
Tags:
  - Azure Functions
  - Azure Key Vault
  - Azure
  - Configuration
---
The possibility to add configuration sources in Azure Functions has just been released with the latest version of `Microsoft.Azure.Functions.Extensions` [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Extensions/1.1.0). I have been waiting for this feature for a long time (like many people I think) because it brings to Azure Functions all the things we are used to with configuration in ASP.NET Core 😻. But that is not the only reason, it is also because with this feature you almost don't need to use key vault references!

But before deep dive into this topic, let's give a bit of context about configuration and secrets in Azure Functions (just skip the next section if you already are familiar with all that).

## A quick reminder about configuration and secrets in Azure Functions

Configuration used by functions in a Function App is stored in settings that can be set in the `Configuration` section of a Function App in Azure Portal. When developing locally you have to use a `local.settings.json` file that will contain copies of the settings stored in Azure portal. The settings from `local.settings.json` will be loaded as environment variables when debugging locally. But as its name suggests, the purpose of this file is to be used for local development only: its settings are not used when the function runs on Azure. Furthermore, this file should never be committed to avoid putting settings corresponding to secrets in source control.

<img src="/posts/images/functionssecrets_localsettings_1.png" class="img-fluid centered-img">

Speaking of secrets, they should never be directly stored in the application settings of a Function App (the same goes for App Services by the way). Why not? Because secrets would be available to  anyone who has access to the Function App in the Azure Portal. The right way is to use an Azure Key Vault which is the Azure component for securely storing and accessing secrets 🔒. Once your secrets are in the key vault, you have to grant the Key Vault access to the identity of your Function App and you can then reference the secrets you need directly in your application settings. These are called [Key Vault references](https://docs.microsoft.com/en-us/azure/app-service/app-service-key-vault-references) because an application setting does not contain directly the value of a secret but a reference to the secret which is stored in Key Vault. When running, your function will automatically have access to the secret and its value as an environment variable, as if it was a normal application setting.

<img src="/posts/images/functionssecrets_portal_1.png" class="img-fluid centered-img">

Key Vault references work for both App Services and Function Apps and are particularly useful for existing applications that have their secrets stored in settings because securing the secrets with Azure Key Vault references does not require any code change.

## The downside of Key Vault references: the local debugging experience

Do you remember when I told you that the local settings file should not be committed to your git repository? Well, what you might not have realized is that it means when someone from your team clones the git repository containing your function he won't have this `local.settings.json` file which is mandatory to run your function app locally. And even if he creates manually the file, he will not necessarily know which settings to put in it. But we want to avoid him manually copying all the settings from the Azure portal or asking a colleague to send his local settings file by email (which is a really bad practice if it contains secrets). Hopefully, there are some ways to fill or generate this file. 

If you use Visual Studio there is a GUI that will help you compare/modify local settings and Azure settings.

<img src="/posts/images/functionssecrets_vs_1.png" class="img-fluid centered-img">

And whether or not you are using Visual Studio, you can generate the local settings file filled with Azure settings with a few Azure Functions CLI commands:

<?# Gist d51ded28cfb84b7c2714627075dffe58 /?>

This is an example of a generated `local.settings.json` file:

<img src="/posts/images/functionssecrets_localsettings_1.png" class="img-fluid centered-img">

However, as you can see, the settings corresponding to secrets contain the Key Vault reference values that are used by Azure to link the settings to the secrets. But this is an Azure mechanism, locally the true secrets value won't be loaded into configuration. So you will have to manually retrieve the value of the secrets in your key vault and set them manually in your local settings file. That may be okay for one secret but that gets quickly annoying when you have many secrets. You don't want your team members to constantly lose time copying secret values from the key vault on their local environment. I don't even talk about the loss of time understanding what is wrong when a secret value has changed and you did not realize it or the bad habits it could lead to like sending secrets by email or chat messages.

This is a terrible local debugging experience and honestly, you don't want that. What you want is that your function code just works when you or one of your colleagues clones or pulls a new version of the function app code. When debugging locally the code of an ASP.NET Core application deployed in an App Service you don't have this kind of problem because usually your code directly loads the secrets from the Key Vault thanks to [Key Vault configuration provider](https://docs.microsoft.com/en-us/aspnet/core/security/key-vault-configuration?view=aspnetcore-3.1).

## Here comes `IFunctionsConfigurationBuilder`

If you are already familiar with dependency injection in Azure Functions, you already know the `Microsoft.Azure.Functions.Extensions` NuGet package that allows you to inherit from the `FunctionStartup` abstract class and register the different services you want to inject into your functions (you can find more about that in the [documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-dependency-injection)). In the latest version of this NuGet package, a new virtual method has been added to `FunctionStartup`: `ConfigureAppConfiguration`. It allows you to specify additional configuration sources you would need in your functions.

<img src="/posts/images/functionssecrets_vs_2.png" class="img-fluid centered-img">

What is awesome is that you can use all the configuration providers you are used to in ASP.NET Core and that includes the Key Vault Configuration provider. I think you understand what I am getting at 😉: instead of using key vault references in your function app settings, you can simply retrieve the secrets from your key vault thanks to the configuration provider.

<img src="/posts/images/functionssecrets_vs_3.png" class="img-fluid centered-img">

This way, no more copying secret, no more storing secrets values locally, no more wondering if you have the latest version of a secret. Say goodbye to key vault references, pull the latest version of your code, press F5 and it will work!

## The triggers case

Well in my title I said *"you **almost** no longer need key vault references"* and the **almost** is important. As the [Azure Functions documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-dotnet-dependency-injection#customizing-configuration-sources) about customizing configuration sources mentions:

>For function apps running in the Consumption or Premium plans, modifications to configuration values used in triggers can cause scaling errors. Any changes to these properties by the FunctionsStartup class result in a function app startup error.

Therefore, if you use a trigger that needs a secret (the connection string of an EventHub trigger for instance), you have no other choice than to use a key vault reference. But for everything else you are good to go with Azure Key Vault configuration provider.

## To conclude

To summarize, after a quick recall of how Azure Functions configuration works we have seen how Key Vault references can help to avoid having secret values in settings. We talked about the downside of this approach for the local development experience and how using the Azure Key Vault configuration provider solved that except when a secret is needed in a trigger. 