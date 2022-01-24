Title: Handle token retrieval while querying an API
Lead: Using a DelegatingHandler
Published: 29/01/2020
Image: /images/keyboard_1.jpg
Tags:
  - HTTP
  - rest
  - ASP.NET Core
---
In our daily job, we often have to query secure REST APIs that require our HTTP requests to have a valid access token in their Authorization header. 
Of course, many APIs come with an SDK that makes the job easier for us as it directly takes care of retrieving a token and sending the authenticated HTTP requests.
However, it is not always the case and knowing how to implement that using HttpClient, IMemoryCache, and DelegatingHandler can become pretty useful.

# Context

Let's imagine we have a very simple API which contains the following routes :

<img src="/posts/images/delegatinghandler_api_1.png" class="img-fluid centered-img">

The `POST /login` route returns an `AuthResponse` that contains the necessary Bearer token to call the 2 protected routes `GET /users` and `PUT /users/{username}`.

We want to implement an IUserService that has 2 methods: 
- `GetAllUsers` to retrieve the list of users that will use the `GET /users` route
- `UpdateUser` to update a user that will use the `PUT /users/{username}` route

<?# Gist 781932fe14afa5290208cb6fc8d7ce47 /?>

Each of these methods needs to retrieve a valid token from the `POST /login` route and set the Authorization header with this token in the HTTP request to each of the protected routes.

The following code shows how to retrieve the token:
<?# Gist 31e420ab21227bad3702a8a103984644 /?>

where `AuthResponse` is a class we defined to map the response of the `POST /login` route
<?# Gist 200bc5705e53ef9b9f56c37896d92e4d /?>

So now we have the code to retrieve the token, how do we use it to implement our `IUserService`?

# Retrieve the token from a private method 
The easiest way to do that is to create a private method in `UserService` that returns this token and to call it from `GetAllUsers` and `UpdateUser`. That would give us something like that :

<?# Gist 337f610109a2ffd7fad5214045693001 /?>

There are two main problems with this way of doing things: 
- We have some code duplication as we are calling the `RetrieveToken` in each of our methods calling the API. That could be okay here as we only have 2 methods calling the API but that can quickly be problematic if we start to have more methods and repeat the call to `RetrieveToken`in each method.
- For each call to an authenticated route of the API, we are making a call to the `login` route even if our token from a previous call is probably still valid. 

# Use a dedicated service to retrieve the token and save it for future calls
Although it's not necessary at this point, it can be interesting to move the code of our private method `RetrieveToken` into a separate service `UserApiAuthenticationService` that will be injected in `UserService`. That way, if the authentication method changes someday, `UserService` implementation won't change. Moreover, we won't mess with the same `HttpClient` for authentication and other calls. 

<?# Gist 5483325936f012388af3bf20ab013ae5 /?>

To avoid requesting always the same token to the API, we added a line to store the token in the memory cache and a line to check if the token is already in the cache before querying the API.
We could also have used a class as a singleton to store the token and its expiration date, but the built-in `IMemoryCache` of ASP.NET Core is more convenient and handle the expiration of the token for us by removing it from the cache when the date is passed. You can find more about cache memory in ASP.NET Core [here](https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory?view=aspnetcore-3.1).

# Use a Delegating handler to directly set the token in the HttpClient request

Handling the token retrieval in a separate service is nice but that does not solve the issue of duplicated code. Even if the `RetrieveToken` method is now part of `UserApiAuthenticationService`, each method of `UserService` will still call `RetrieveToken`. Moreover setting the token on each request should not be a concern of `UserService`.

That's where come *delegating handlers*. A delegating handler is quite similar to an ASP.NET Core middleware but instead of applying some processing on an incoming request and its response, it does so on an outgoing request and its response. In concrete terms, you use a delegating handler to apply something (logging, authentication, caching ...) to http requests you make to an API using an `HttpClient`. To learn more about *delegating handlers* there is a nice [article](https://www.stevejgordon.co.uk/httpclientfactory-aspnetcore-outgoing-request-middleware-pipeline-delegatinghandlers) from Steve Gordon on the topic. 

A custom delegating handler is exactly what we need: a piece of code that all our HTTP requests from `UserService` will go through and where we will be able to set the token on the authentication header of each request. Here is the code of our custom delegating handler:

<?# Gist 54e992e0dcc6c30436902b8f7672e599 /?>

That's it, we don't need anymore to handle token retrieval on UserService which becomes simpler: 

<?# Gist 2c07e0a7c08152cff8e1f145aa1671cd /?>

To finish we just have to specify in the `Startup.cs` on which HttpClient to apply the delegating handler we have just created.

<?# Gist a907d4bcc06fa98a60f2939a6a388ec6 /?>

# To conclude

To summarize, we have put the code that retrieves a token in a separate dedicated service that caches the token until it expires. And we have created a custom delegating handler that calls this service and sets the retrieved token on the authentication header of each HTTP request to the API.