Title: Keeping secrets secure when using API Clients
Lead: Playing with Azure CLI and Nushell to generate a secret environment file to send HTTP requests
Published: 01/08/2022
Image: /images/padlock_1.jpg
Tags:
  - tooling
  - HTTP
  - nushell
  - Azure CLI
  - Azure Key Vault
---
When using some API Clients (like [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or the [HTTP Client of JetBrains' IDEs](https://www.jetbrains.com/help/rider/Http_client_in__product__code_editor.html)), environment variables are stored in JSON files that can contain secrets. To share these files within a team, developers tend to send them by email or by messaging applications, which is not very convenient nor secure 🔐. I thought it would be a good idea to store these secrets directly in an Azure Key Vault and automate the generation of a JSON file containing the secrets using [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/) and [Nushell](https://www.nushell.sh/).

## The problem: keep secrets secure while making HTTP requests

If you have read my article "[Testing your API with REST Client](https://www.techwatching.dev/posts/testing-your-api-with-rest-client)", you know I am a big fan of using the vscode extension `REST Client` to make HTTP requests instead of using GUI tools like Postman. With REST Client, you write your HTTP requests using the standard RFC 2616 in `.http` or `.rest` files and commit them to your git repository. You can define environments and their associated variables in the workspace settings file of vscode (you can also store them in the user settings file but I don't recommend it as they would apply to every vscode workspace). If you have some secrets among your environment variables (like an API key for instance), you obviously can't commit this settings file (you should never commit secrets to a git repository). So sharing among your developer team the environment variables needed to run the requests can be difficult.

```http
### Get Luke Skywalker
GET https://swapi.co/api/people/?search=Luke HTTP/1.1
```

I have been using recently the IDE [Rider](https://www.jetbrains.com/fr-fr/rider/), which has (like all the other JetBrains' IDEs) an integrated [HTTP Client](https://www.jetbrains.com/help/rider/Http_client_in__product__code_editor.html). It's very similar to REST Client (same syntax for the requests that are written in `.http` or `.rest` files) with some extra features. With this HTTP Client, environment variables are stored in a public JSON environment file `http-client.env.json` that can be committed. However, secrets can be stored in a private JSON environment file `http-client.private.env.json` that will not be committed and whose values will override the values in the public file. It's well thought out, yet we still have the problem of sharing with our team the private file containing the secrets.

<img src="/posts/images/httpclientssecrets_rider_1.png" class="img-fluid centered-img">

When someone joins the team or new environment variables have been added, the developer in the team that has the latest version of the environment file usually share it by sending it by email or private message in Microsoft Teams, or Slack... to those who need it. This is not very convenient and this is not a good practice because you don't want secrets floating around. So what can we do about that?

> 💬 To be honest, even if sharing secrets like that bothered me a bit, I only decided to think of a solution when a friend pointed out to me that the big challenge with tools like `REST Client` or `HTTP Client` from JetBrains was managing secrets.

## The solution: use Azure Key Vault and scripting

The solution is not complicated. I asked myself: where do I usually store secrets? The answer is "a vault". Whether it is Azure Key Vault, AWS Secret Manager, Google Cloud Secret Manager, or HashiCorp Vault it does not matter, secrets have to be stored somewhere safe, and it's precisely the purpose of a vault 🔒. I use Azure Key Vault when developing applications so that's what I am going to use as well for secrets needed for sending HTTP requests. If I want my team to be able to retrieve the secrets I just have to ensure everyone has access to the Key Vault. 

> 💡 By the way, I like to create an Azure AD Group for my team so that all the permissions given in Azure (for the project the team is working on) are assigned to this group instead of to each developer. When someone joins or leaves the team, we then can simply add him to the group or remove him from it.

If the secrets are stored in an Azure Key Vault, we can let each developer retrieve the secrets from the vault and put them in their private environment file. But honestly, it's not convenient, especially with many secrets. A better solution is to make a script that automatically retrieves the secrets and generates the JSON file. That way the git repository will contain the HTTP requests, the public environment file, and a script to generate the private environment file so that any new joiner will have everything he needs to get started and run the requests.

## Let's script that with Azure CLI and Nushell!

I have chosen to script that using Azure CLI and Nushell because these are 2 tools I like and I am confident the resulting script will be concise and not too difficult to write. If you are not familiar with Azure CLI, you can check my article "[Goodbye Azure Portal, Welcome Azure CLI](https://www.techwatching.dev/posts/welcome-azure-cli)". If you don't know Nushell you can check its [website](https://www.nushell.sh/) or just continue reading this article to see how nice this shell is.

I have already created an Azure Key Vault named `httpclient-vault` and set 3 secrets in it. 

<img src="/posts/images/httpclientssecrets_keyvault_1.png" class="img-fluid centered-img">

What I am trying to achieve is to produce the following file `http-client.private.env.json`:
```json
{
  "development":
  {
    "ApiKey": "12345678",
    "Username": "admin",
    "UserPassword": "Password"
  }
}
```

First, let's list the secrets in the Key Vault:

<img src="/posts/images/httpclientssecrets_script_1.png" class="img-fluid centered-img">

The output of the command is not that easy to read because it's JSON and there are some properties we are not interested in. However, Azure CLI supports different output formats and can be used with JMESPath expressions to query the output of a command like this:

<img src="/posts/images/httpclientssecrets_script_2.png" class="img-fluid centered-img">

It's nice but I won't need to use this because I can use Nushell (aka Nu) pipelines where everything is structured data that can be filtered, selected, and sorted. To bring the Azure CLI command output into a Nu pipeline, I can use the `from json` command.

<img src="/posts/images/httpclientssecrets_script_3.png" class="img-fluid centered-img">

> 💡 Nu has many `from` commands to convert data from different formats to structured data/table.

You probably have noticed that the Azure CLI command we used to list the secrets does not provide their values. To retrieve the secret values we have to call another command for each secret using the id of the secret like this: `az keyvault secret show --id $secretId`.

<img src="/posts/images/httpclientssecrets_script_4.png" class="img-fluid centered-img">

Again we can use the `from json` command, and the `get` command to only retrieve the value of a secret.

<img src="/posts/images/httpclientssecrets_script_5.png" class="img-fluid centered-img">

Now that we know how to retrieve the value of a secret, we can insert a new column `value` into our table that will be filled with the value of each secret retrieved   using the previous command: 

<img src="/posts/images/httpclientssecrets_script_6.png" class="img-fluid centered-img">

The `{|secret| (az keyvault secret show --id $secret.id | from json | get value)}` part is a block that is executed for each row. The `secret` is the parameter of the block which represents the row, with the values of the columns for this row being available as properties of the variable `$secret`. As the command was becoming long for a single line, we wrapped it in parentheses that allow us to write the command on multiple lines.

As we are only interested in the columns "name" and "value", we only select them.

<img src="/posts/images/httpclientssecrets_script_7.png" class="img-fluid centered-img">

We have to reorganize the data to make key-value pairs where keys come from the column name and values from the column value. We can use the `transpose` with the proper flags to do that:

<img src="/posts/images/httpclientssecrets_script_8.png" class="img-fluid centered-img">

Then we wrap the key-value pairs in a JSON object corresponding to the development environment:

<img src="/posts/images/httpclientssecrets_script_9.png" class="img-fluid centered-img">

We can check we get the JSON we want with the `to json` command.

<img src="/posts/images/httpclientssecrets_script_10.png" class="img-fluid centered-img">

And finally, we can save the data in a `http-client.private.env.json` file using the save command.

Here is the final script 🔽:

```
(
  az keyvault secret list --vault-name httpclient-vault |
  from json |
  insert value {|secret| (az keyvault secret show --id $secret.id | from json | get value)} |
  select name value |
  transpose -rd |
  { development: $in } |
  save http-client.private.env.json
)
```

## Final thoughts

In this example, I scripted with Nu the retrieval of secrets from an Azure Key Vault, but it should not be too difficult to apply the same concepts to fetch secrets from another vault.

I had fun playing with Azure CLI and Nushell to write this script but there are many other ways to do the same thing. There are also probably other tools or services (I have just came across [Doppler](https://www.doppler.com/) which seems nice) that can help you manage secrets securely.

I am not a Nushell expert but I find it awesome, and am considering making it my main shell. You should give it a try too. A big thank you to the people in the Nushell Discord that help me with my script ❤️.