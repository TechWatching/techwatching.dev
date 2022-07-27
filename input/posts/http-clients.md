Title: Discussion around API clients
Lead: Why using the vscode extension "REST Client" instead of Postman? 
Published: 05/03/2024
Image: /images/swiss_knifes.jpg
Tags:
  - tooling
  - vscode
  - rest
  - HTTP
---
This article is a discussion around API clients. Without being a comparison between best API clients, this article talks about the pros and cons of some popular tools to send HTTP requests to an API. The goal is not to elect the best one, but rather to try to answer the following question: what we should consider when choosing an API client and what are the challenges when using one.

## Some context

I like discussing tooling because as a developer choosing the right tool is often what makes me more productive in my job. I am talking about "right tool" because I am not necessarily looking for the best one but the most appropriate one for my needs in a given context. The topic of API clients is not new to me, indeed the first post I wrote on this blog in March 2019 (and my most-read article on DEV.to where I re-posted it) was about using the vscode extension "REST Client" instead of Postman. This article is still relevant and in fact I have been using REST Client as my main API client for a few years on different projects and in different teams.

Yet I am not writing this article to convince you to use "REST Client" or any other tool. Besides, you probably already have a favorite tool you are using to send HTTP requests. Indeed, there are many options: Postman, REST Client, Thunder Client, Nightingale, Insomnia, RapidAPI Client, Hoppscotch, and HTTPie just to name a few. There are many reasons why people choose one tool over another: 
- it has more features than others
- some colleague suggested it
- it's the latest tool featured on ProductHunt
- everyone in the company use this API client
- it would be time consuming to learn to use another API Client

I don't think these are good enough reasons, so I will talk to you about what matters to me when using an API Client.

## Ease of use

When I am using an API client, it's to make requests to an API and get responses. It's often to test an API or to debug the API I am developing. Therefore what's important to me is to have a simple tool that makes easy to write HTTP requests, display the responses and that's it.

### All conceivable functionalities vs. essentials features

A lot of tools try to compete each other by providing more features or very advanced features. First, it's useless because you are not going to use most of them. Second, it's counterproductive because having too many features will make an API client more complicated to use.
 
One good example is Postman which went from a simple tool that makes HTTP requests to a real white elephant. To be honnest, I am quite impressed with all the features you can find in Postman: the company has done an amazing job to build a platform that helps you in each step of your API lifecycle (specifications, design, documentation, testing, monitoring, ...). However the downside is that Postman became bigger and less easy to use. I have no doubt Postman brings a lot of value to many developers that are building their APIs, yet a lot of people (like me) don't need all these uncessary features and would be better with a simpler tool. Postman is just an example, there are many other API clients that overwhelm you with concepts you don't need(workspace, collections, mocks, flows), that require you to sign in and to configure a bunch of things before being able to write an HTTP request.

So what are the essentials featues an API Client should have besides sending requests to an API and displaying the responses. First, it should support the "protocol" (REST, SOAP, GraphQL, gRPC) used by the API  you want to query (pretty obvious but not all API clients support gRPC or GraphQL for instance). Second, it should support environment variables. You will need them to easily switch between environments: sending requests to an API in QA and to the same API in Production for instance. Variables can also be useful to store the result of a preview request and use it in another request. In my opinion, testing and integration with CI/CD pipelines (to automate testing) are nice-to-have functionalities but not mandatory.

### GUI tools vs. text-based tools

### Integrated vs. standalone


 
 Postman is just an example, these are just uncesseray features  is you building an API from scratch  an API from scrato offer a set of tools



If I want to test my API on different environments Variables, I probably  not to have a tool with many features but a  to have a tool that make 

## 

Reasons you chose it Maybe your favorite API client has some features other don't have, maybe it's the latest tool featured on ProductHunt, everyone

- Collaboration
  - Git
- Simplicity/Ease-of-use
- Secrets
- Testing
- Integration to CI/CD


- A bit of context

- Comparing some popular options
- Handling secrets
- 