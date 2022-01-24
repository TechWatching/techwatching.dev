Title: Once upon a time in .NET
Lead: A story about records, HTTP message handlers, HTTP client extensions...
Published: 24/04/2021
Image: /images/western_1.jpg
Tags:
  - ASP.NET Core
  - HTTP
  - records
  - rest
  - refit
---

In this article, I want to talk about a few things in .NET such as HTTP requests with an Http Client, HTTP message handlers, records... For the theoretical aspect of these topics, I think the official documentation on docs.microsoft.com and many blog articles already explain them very well, better than I could ever do. But what I am interested in here is to talk about these topics through a case study.

## Introducing the case study
I wrote a very basic ASP.NET Core API [`MyLotrApi`](https://github.com/TechWatching/MyLotrApi/tree/a70b6f91fcbcc30a3c3a3616799e3e85817b7906) that exposes some data from the "Lord of the Rings" universe. This API calls another existing API [`The One API`](https://the-one-api.dev/) to retrieve this data. The code is quite simple: 
- a controller `LotrController` with 2 routes
    - `GET /popularmovies` that returns the movies in the "Lord of the Rings" universe with a rotten tomatoes score above 80
    - `GET /famousorcs` that returns orc characters from the "Lord of the Rings" universe 
- a service `TheOneApiService` that
    - makes the HTTP calls to the API `The One API`
    - has one method for each endpoint of the API `The One API` that is used
    - uses NewtonSoft for deserializing responses
- a `Models` class that contains the different data models used by the API

## About using records

Instead of using basic C# classes for the models in this API, I used [records](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9#record-types). Many people are talking about records nowadays because it is one of the latest trendy features of C# 9. Unfortunately, that makes other people think records are just another syntactic sugar added to C# that they do not need to use in their code. Yet, there are a lot of benefits in using records.

In my sample, I declared my models with the [positional syntax for property definition](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record#positional-syntax-for-property-definition) which is very concise. Conciseness might not be something important for you but for me, it means fewer lines of code to write and to maintain and more clearness.

```csharp
public record Movie(string Name, int RuntimeInMinutes, int BudgetInMillions, float RottenTomatesScore);
```

You can notice that I put my records in one place (the `Models.cs` file), partly because for this example it was faster and simpler than creating a file for each model. But when you think carefully about it, it is not such a bad thing: in one look you have a pretty good view of the different models the code is using without having to browse different files. Of course, in a real project with a lot of code, I would have grouped my models by business concern and separated these different concerns in different files with more expressive names than `Models`. But I think the convention of using one file by class is not completely relevant in the case of records.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyLotrApi
{
    public record Movie(string Name, int RuntimeInMinutes, int BudgetInMillions, float RottenTomatesScore);
    
    public record MovieResponse(IList<Movie> Docs, int Total);

    public record Character(string Name, string Realm);

    public record CharacterResponse(IList<Character> Docs, int Total);
}
```


Another interesting feature of records is that it is easy to declare immutable data models with them. That is exactly what I did here by declaring my data models as immutable records for the objects returned by `The One API`. Indeed it makes perfect sense in this context where my API queries `The One API`, eventually filters the objects returned depending on what it is looking to expose and returns them without modifying their content. In no way the code should modify the data retrieved from `The One API` and immutable records can easily guarantee that: if the code tries to change something it won't compile.

<img src="/posts/images/onceuponatime_records_1.png" class="img-fluid centered-img">

There is one more reason why using records in this API is a good idea: value equality. When writing unit tests I often have the case where I want to assert that an object (or a collection of objects) returned by the method under test is the same that the object(s) I was expected. However, doing an `Assert.AreEqual` on two variables of a reference type does not work because by default they are only equal if they refer to the same object.

<img src="/posts/images/onceuponatime_records_3.png" class="img-fluid centered-img">

As a workaround, you can compare the properties of your two variables (if they are value type properties) or you can use the library [`FluentAssertions`](https://github.com/fluentassertions/fluentassertions) for your asserts. But the real solution to make your asserts work is to implement `IEquatable<T>`, and overrides `Object.Equals(Object)` and `Object.GetHashCode()` on the classes you want to compare. It's the solution I often use, it's a bit cumbersome because it makes you write a lot of boilerplate for your data models but it helps you a lot with your unit tests assertions. The good news, if you are using records is that all this code is already done for you, you have value equality by default so an `Assert.AreEqual` between two variables of a record type will work if all the property and field values match.

<img src="/posts/images/onceuponatime_records_2.png" class="img-fluid centered-img">

## What can be improved in `TheOneApiService`?

Enough talking about records, let's have a closer look at [`TheOneApiService`](https://github.com/TechWatching/MyLotrApi/blob/a70b6f91fcbcc30a3c3a3616799e3e85817b7906/src/MyLotrApi/TheOneApiService.cs) and see what we can improve. At first sight, the code looks fine, just 2 methods that use an `HttpClient` to make a get request, ensure that the response is ok (throw an exception otherwise), retrieve the response content as a string, and deserialize it into their corresponding types with NewtonSoft. Basic code that we can often see.

<img src="/posts/images/onceuponatime_theoneapiservice_1.png" class="img-fluid centered-img">

Yet, it seems that there is a bit of code duplication between the methods, not a problem as we only have two methods but it can quickly become one if we add other methods. So what can we do about that?

### Adding a private method that factorizes the code

This solution is something I often see: people wrap the common logic between their methods in a private method that gets called by the others. So we end up having a generic `Send` that does all the job (request, response handling, deserialization ...), and our 2 methods `GetMovies` and `GetCharacters` that have become quite trivial.

<img src="/posts/images/onceuponatime_theoneapiservice_2.png" class="img-fluid centered-img">

(this code can be found [here](https://github.com/TechWatching/MyLotrApi/blob/3e5561cb71678e432e970edcac6509581e3aaecd/src/MyLotrApi/TheOneApiService.cs))

Well, the code is fine, nothing to say about that but I don't like this solution at all 😁. And here is why:

1) It adds complexity and makes the code more difficult to read

When I look at the `GetMovies` or `GetCharacters` I don't know exactly what they do, the business logic is hidden in the private `Send` method. This private method in itself is more complicated than the previous duplicated code because it has to handle different cases, like the fact that the request can be a POST or a PUT, hence the use of an `HttpRequestMessage` with the potential content to send in the request. In fact, it's quite clear that this method does too many different things. 

2) It abstracts the use of the HttpClient

I have nothing against abstractions, on the contrary, but I think they should add value and not completely hide what we are using under the hood. And here we are concealing the fact we are using an HttpClient, that does a `GET` request on the "character" route for instance. Of course, we can find part of that information in the parameters provided to the `Send` method but it is not as clear as calling the `Get` method of the `HttpClient` as we are used to doing. Using an HttpClient already abstracts the complexity of creating an Http request and sending it, we do not need to trade this abstraction off for another less understandable abstraction. 

3) It makes the code hard to maintain

Because all the main methods of this service call this private method, it will be difficult to change something in it without breaking something else. If someday we need to do something specific linked to the HTTP call for one case it will be hard to implement it in the `Send` method, the only solution will be to add optional parameters and do a lot of conditions in the code which will quickly become dirty.

If you are fond of SOLID, what I am just saying is that this solution does not satisfy several SOLID principles like the Single responsibility principle and the Open-closed principle. 

So what could be done to improve this code if it is not by factorizing it in a private method. As we said, the code in the service does too much things so maybe it's time to remove some concerns from the `TheOneApiService`.

### Implementing an HTTP message handler to simplify the code

I already talked about using an HTTP message handler / delegating handler in [a previous article](https://www.techwatching.dev/posts/delegating-handler). When registered with an HTTP client, it is a piece of code that all the HTTP requests you do on this HTTP client will go through. Hence it is a nice way of factorizing code that we want to apply to all the requests to `The One API` like the fact of throwing the `TheOneApiException` when the HTTP responses are not successful.

<img src="/posts/images/onceuponatime_handler_1.png" class="img-fluid centered-img">

(This code can be found [here](https://github.com/TechWatching/MyLotrApi/blob/9dfd9966044560d6e13c71d93eeba775e02bd18d/src/MyLotrApi/Services/HttpMessageHandlers/TheOneApiErrorDelegatingHandler.cs))

### Using `HttpClientJsonExtensions` to get rid of the deserialization code 

In the current code, there are some lines to read the response content as a string and deserialize it. The interesting code in the service is the fact of doing a GET or a POST to retrieve some data, not the boilerplate code to handle deserialization. So it would be great to be able to remove it. In .NET Framework, there used to be some HTTP client extensions that worked with NewtonSoft to do that.

In .NET Core there is no longer that, however, there are HttpClient method extensions that use System.Text.Json to make the request and deserialize the response content in one line. For that, you need to reference the [`System.Net.Http.Json` NuGet package](https://www.nuget.org/packages/System.Net.Http.Json) and the code becomes simpler.

<img src="/posts/images/onceuponatime_theoneapiservice_3.png" class="img-fluid centered-img">

(This code can be found [here](https://github.com/TechWatching/MyLotrApi/blob/4ceca01826a0de4cca593c731f812ace874924a8/src/MyLotrApi/Services/TheOneApiService.cs))
### Exploring an alternative to implementing the interface `ITheOneApiService` with Refit

I am pretty happy with how we improved and simplified the code thanks to the handler and the HTTP extensions methods. Yet I think I cannot end this article without mentioning [Refit](https://github.com/reactiveui/refit): the automatic type-safe REST library for .NET. The idea behind this [library](https://reactiveui.github.io/refit/) is that you only have to define the interface specifying the routes you want to query and the library will generate an implementation that does the calls for you with an HttpClient. No need to implement that yourself anymore, so less code to maintain for the same result.

<img src="/posts/images/onceuponatime_refit_2.png" class="img-fluid centered-img">

Refit even automatically handles query parameters by mapping them to the public properties of the object in parameter of a `GET` method in the interface. To name differently your property from the query parameter you can simply add an `AliasAs` attribute as I did here.

<img src="/posts/images/onceuponatime_refit_3.png" class="img-fluid centered-img">

Using Refit might not be appropriate to your use case when you have very specific things to do but for a basic REST service like `TheOneApiService`, it is perfect. Refit has other nice features but what I really appreciate is that it also works with delegating handlers. So I can use Refit and still use the delegating handler I previously created.

<img src="/posts/images/onceuponatime_refit_1.png" class="img-fluid centered-img">

(This code can be found [here](https://github.com/TechWatching/MyLotrApi/blob/76f85099bdb8c747717bf3e61007c276d5055e6f/src/MyLotrApi/Startup.cs))
## To conclude

In this article, we have seen how we can improve some .NET code while talking about records, delegating handlers, refit...