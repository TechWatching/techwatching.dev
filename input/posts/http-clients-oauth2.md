Title: Call your Azure AD B2C protected API with authenticated HTTP requests from your JetBrains IDE
Lead: Automatically acquire OAuth 2.0 tokens
Published: 11/03/2024
Image: /images/access-code-door.webp
Tags:
  - tooling
  - HTTP
  - OAuth2
  - Azure AD B2C
ImageAttribution: Picture of <a href="https://unsplash.com/fr/@drice22">Danielle Rice</a> on <a href="https://unsplash.com/fr/photos/personne-detenant-une-carte-en-noir-et-blanc-7GfRwb78YWs">Unsplash</a>
  
---

I have written several [blog posts](https://www.techwatching.dev/posts/http-clients) about HTTP clients in the past. I am a big fan of using HTTP text files versioned in a git repository alongside API code and executed by an IDE tooling. However, there was one use case where a GUI tool like Postman or a swagger page was more convenient: retrieving OAuth 2.0 users' tokens. Thanks to the latest [OAuth 2.0 feature](https://www.jetbrains.com/help/idea/oauth-2-0-authorization.html) in JetBrains' IDE built-in HTTP client, this is no longer an issue.

## Context

I am developing a web application composed of a Vue.js frontend and an ASP.NET Core backend (just describing my use case, technologies don't matter). The end users of this application are authenticated using [Azure AD B2C](https://learn.microsoft.com/en-us/azure/active-directory-b2c/overview), which is a [customer identity access management](https://en.wikipedia.org/wiki/Customer_identity_access_management) solution like Auth0 or other competitors.

I often need to manually call the endpoints of the API to verify the code is working properly and that an endpoint is returning the expected result. HTTP files are a convenient way of writing and executing the HTTP requests. Once committed in the Git repository, they can easily be shared with other developers of the team who may not have worked on some endpoints and want to have proper examples with the query parameters and payloads.

As the API is protected by Azure AD B2C, I need to retrieve a valid access token and pass it to my requests.

## Previous solutions

Passing a valid access token to my HTTP requests is something I was previously doing by:

* signing in my frontend
    
* grabbing the token in the web browser dev tools
    
* copying the token to my [HTTP environment variables](https://www.jetbrains.com/help/idea/exploring-http-syntax.html#environment-variables) (preferably the private environment file to avoid committing a secret in your repository)

That works but:

* it's cumbersome
    
* you have to do it each time your access token expires
    

Another solution is to use a tool that generates app-specific local JWTs and configure your local dev environment to authenticate with these tokens instead of using the Azure AD B2C configuration. In .NET, you can use the [`dotnet user-jwts`](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/jwt-authn) to do exactly that. It allows you to generate a JWT token with the scopes, roles, and claims you want. So it's a good solution to debug your API locally without having to bypass the authentication and authorization mechanisms.

However, it has some downsides:

* the tokens are only valid in your local machine so it only works for your local environment
    
* the Azure AD B2C authentication is replaced by this "local JWT authentication" so you are not testing your API in real conditions
    

## With the new HTTP Client OAuth 2.0 feature

Starting version 2024.1, HTTP Client in the JetBrains IDEs (in my case Rider 2024.1) support automatically authenticating HTTP requests, provided that you properly configured it.

>🗨 Support for OAuth 2.0 started in [version 2023.3](https://blog.jetbrains.com/idea/2023/10/intellij-idea-2023-3-eap-3/#oauth-2.0-support), however, Authorization Code Flow with PKCE (PKCE challenge is required in the [OAuth 2.1 specification](https://oauth.net/2.1/) is only supported since 2024.1.

### OAuth 2.0 authorization code flow with PKCE

The OAuth 2.0 flow involved in retrieving a valid access token to make requests to an Azure AD B2C protected API is the authorization code flow with PKCE. There are 2 steps in the [OAuth 2.0 authorization code flow](https://learn.microsoft.com/en-us/azure/active-directory-b2c/authorization-code-flow):

1. Get an authorization code
    
2. Exchange the authorization code for an access token
    

Step 1 involves the user entering their credentials in the login form (Azure AD B2C login form in this case). At first sight, it might appear not very suitable for using HTTP files but the JetBrains HTTP Client handled it by opening the login form in the IDE embedded browser.

For Azure AD B2C,

* the authorize endpoint is `https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/{policy}/oauth2/v2.0/authorize`
    
* the token endpoint is `https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/{policy}/oauth2/v2.0/token`
    

where:

* `tenant` is the name of the Azure AD B2C tenant
    
* `clientId` is the application ID of the application registered in Azure AD the B2C tenant
    
* `policy` is the name of the policy created in the Azure AD B2C tenant
    

>💡When using a custom domain in Azure AD B2C, the endpoints are similar but the `{tenant}.b2clogin.com` part is replaced by the custom domain.

If you want to better understand how this flow works, there is a nice diagram in [Auth0 documentation](https://www.jetbrains.com/help/idea/oauth-2-0-authorization.html).

### Configuration in the JetBrains HTTP Client

To make the authorization code flow work in the HTTP Client, all I have to do is provide the configuration for the Azure AD B2C tenant in the HTTP environment file.

Here is an example of such configuration:

```json
{
  "apiUrl": "https://localhost:5001/api",
  "Security": {
    "Auth": {
      "CIAM": {
        "Type": "OAuth2",
        "Grant Type": "Authorization Code",
        "PKCE": true,
        "Client ID": "3a53c90d-20c4-40e9-b440-4825b70374d7",
        "Scope": "openid offline_access profile https://mytenant.onmicrosoft.com/security/user.read",
        "Auth URL": "https://mytenant.b2clogin.com/mytenant.onmicrosoft.com/b2c_1_sign_in/oauth2/v2.0/authorize",
        "Token URL": "https://mytenant.b2clogin.com/mytenant.onmicrosoft.com/b2c_1_sign_in/oauth2/v2.0/token",
        "Redirect URL": "https://localhost:8080/oidc-callback",
        "Acquire Automatically": true
      }
    }
  }
}
```

>💡 Instead of setting PKCE to true, you can set if to a JSON object with the code challenge method and code verifier to use in it.

>💬 In this example, I have set a local Redirect URL as my front was running locally. But I could also have set the Redirect URL to another environment where my web application is running.

You can check the [JetBrains documentation](https://www.jetbrains.com/help/idea/oauth-2-0-authorization.html) to have more information about the HTTP Client support for OAuth 2.0 authorization.

### Authenticated HTTP Requests in the HTTP file

Once the configuration is set, retrieving an access token can be done with a simple click in the configuration file.

The authentication process is logged so we can check the requests made and identify any mistakes made in the configuration.

<img src="/posts/images/httpclientsoauht2_1.webp" class="img-fluid centered-img" alt="HTTP authentication log.">

Hopefully, we don't have to manually retrieve an access token each time we need to execute an HTTP request in an HTTP file of our IDE. We can just use the `{{$auth.token()}}` variable in the Authorization header of our requests, like this:

```http
GET {{apiUrl}}/products
Authorization: Bearer {{$auth.token("CIAM")}}
```

The IDE will handle the rest for us.

## Wrapping up

The HTTP Client OAuth 2.0 feature in JetBrains IDEs has greatly simplified making authenticated HTTP requests to secure APIs. While this article focused on Azure AD B2C, the same principles apply to other Authorization Servers, with only the authorize and token endpoints differing.

I hope other IDEs will adopt this feature, using the same convention for the `$auth.token()` variable and its configuration. The only drawback is for developers not using JetBrains IDEs, who will need to adjust requests containing the `$auth.token()` variable to run them in their IDEs.