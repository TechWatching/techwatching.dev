Title: Testing your API with REST Client
Lead: Why using the vscode extension "REST Client" instead of Postman? 
Published: 05/03/2019
Image: /images/swiss_knifes.jpg
Tags:
  - tooling
  - vscode
  - rest
  - HTTP
---
Let's talk about tooling and testing an API!

## GUI Tools and their limits

Like most developers I guess, I often use GUI tools like Fiddler or Postman to query an API.
Once you get used to the HMI of Postman with all its tabs, it's quite easy to create GET / POST / PUT / ... requests, save them in a collection, and visualize the answers. Postman offers a lot of other features, but a very handy one is the possibility to use environment variables in your requests.

<img src="/posts/images/restclient_postman_1.png" class="img-fluid centered-img">

Seems to be the perfect tool you would say. Well, that's true if you want to quickly test an API on your own, and to be honest I use it a lot for that. But when you are collaborating on a real project with other developers, there might be some things you will miss. For me, it's a way to edit, version, and share requests with other developers.

Okay, I know that Postman paid plan allows you to share requests with other people of your team. And I am aware of the collection export feature on the free plan, but that's not enough. I don't really like to be too tied to a proprietary software and its GUI to do things. As a developer what I want is to be able to edit my requests in simple text files that I can put in version control. And here's come [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

## What is REST Client?

<img src="/posts/images/restclient_vscode_1.png" class="img-fluid centered-img">

The REST Client extension is an open source vs code extension developed by [Huachao Mao](https://github.com/Huachao). If I quote the README of its [GitHub repository](https://github.com/Huachao/vscode-restclient): REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.
Let's see that with a simple GET request to [The Start Wars API](https://swapi.co/):

<img src="/posts/images/restclient_swapi_1.png" class="img-fluid centered-img">

Nothing new or complicated here, just the request you would have written intuitively. Like this, you can write any kind of request you want simply following the standard RFC 2616. Even if you don't know the standard, it's pretty straightforward and you often find samples with this format on the documentation of the API you are querying, like on the [Microsoft Graph API documentation](https://docs.microsoft.com/en-us/graph/api/user-list-memberof?view=graph-rest-1.0#example) for instance.

<img align="right" src="/posts/images/restclient_swapi_3.png" class="img-fluid">

REST Client works on text files in vscode by selecting _HTTP_ as the Language Mode (by default this language mode is associated with files having the _.rest_ or _.http_ extension). It provides you with some autocompletion and a few snippets to help you write your queries. You can write multiple requests on the same file in vscode just by separating them with ###. Above each request an actionable _Send Request_ link allows you to run the request and see the response in a response panel.
<br/>
<br/>

## Using variables in REST Client

As you can see below, it is possible to use variables with REST Client. A variable `planetName` is defined in the file and reused in 2 requests. A variable is also used to name the request _GET https://swapi.co/api/people/?search=Luke_ and makes it possible to use elements from the response (that you can see on the right). Here we are using the `homeworld` property of the response to retrieve the planet from which Luke was from in the following GET request. With the help of variables you can easily combine and chain requests for the scenario you need to realize.

<img src="/posts/images/restclient_swapi_2.png" class="img-fluid centered-img">

REST Client allows you to define environments and their associated variables in the user settings file of vscode. For instance, let's say I want to query the Microsoft Graph API (both the V1 version and the beta version of the API), I will add the following JSON to my  settings file:
```json
    "rest-client.environmentVariables": {
        "$shared": {
            "host": "https://graph.microsoft.com/",
        },
        "graphV1": {
            "version": "v1.0",
        },
        "graphBeta": {
            "version": "beta"
        },
    }
```
I have defined 2 environments _graphV1_ and _graphBeta_ with a specific value for the _version_ variable. These environments share the _host_ as a common variable which is contained in the shared environment _$shared_. From my request file, I can now switch between environments and use the variables _version_ and _host_ to request the Microsoft Graph API.

<img src="/posts/images/restclient_msgraph_1.png" class="img-fluid centered-img">

## What I like about REST Client?

REST Client is a nice alternative to Postman as it allows to easily write requests and query APIs from Visual Studio Code. I am already a vscode user so I appreciate staying in the same environment I know and like for testing an API. REST Client may not offer as many functionalities as Postman but for the usage I have, it is quite enough. 

What I like about this tool is that you treat your requests as code: you can commit the files containing your requests, keep track of their modifications and share the requests with your colleagues in your Git project repository.

I have seen quite a few people using it recently in video tutorials and if you have a look at the number of downloads it seems I am not the only one to find it useful.

## Getting started

There are a lot of other features in REST Client that I didn't talk about (generate code snippet, request history ...) so don't hesitate to give it a try. You can use it on any API you like (there is even basic support for SOAP) the same way you would use Postman or other tools. 

If you quickly want to convert some of your Postman queries, there is a _Code_ button in Postman that allows you to see the HTTP request code that you can just copy and paste in vscode to use it with REST Client.

Or if you prefer you can get started by testing the Star Wars API, you will find below the requests I used. Enjoy :)

<?# Gist 68028e467156017b4c74dbd32791a4b2 /?>