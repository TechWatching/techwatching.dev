Title: Organize your GitHub stars with Astral
Published: 28/11/2021
Lead: Another way to bookmark GitHub repositories.
Image: /images/stars_1.jpg
Tags:
  - tooling
  - GitHub
---

Do you often star a GitHub repository and later when you want to get back to it struggle to find it on your stars page? I do! Well, I did... until I discovered [Astral](https://astralapp.com/), the web application that allows you to `Organize Your GitHub Stars With Ease`. That is what we are going to talk about in this article.

# GitHub stars as a bookmarking tool.

When you find an interesting GitHub repository, instead of adding it to your browser bookmarks among a lot of other websites, you can star it. As [GitHub Docs](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars) say: `Starring make it easy to find a repository again later`. Indeed usually, when I come across a nice GitHub repository, I want to go back to it later (to deep dive into the awesome framework I discover, to try this new open source tool, to have this useful sample somewhere when I will need it...).

As you can see below, all the GitHub repositories you have starred can be found on your GitHub stars page.

<img src="/posts/images/astral_github_1.png" class="img-fluid centered-img">

In addition to that, you can sort, filter (by language or topic), and search starred repositories:

<img src="/posts/images/astral_github_2.png" class="img-fluid centered-img">

# Have you seen that repository I am looking for?

Using GitHub stars to bookmark the repositories you are interested in is great but if you do it a lot, it can become hard to find later the repository you want. Even if it is possible to sort, filter, and search repositories, it is sometimes impossible to quickly find what you are looking for. And there are good reasons for that:
- You have starred this repository a long time ago, and it does not stand out from other repositories in terms of activity or number of stars so sorting won't help you
- Most of your starred repositories are in the same language so filters are useless
- The repository was not tagged with a topic that could help you to find it
- You don't remember the name of the repository

The problem is that starred repositories can only be filtered with information that is not particularly useful to you. What we would need is something to organize the starred repositories in a way relevant to us. And here comes Astral.

# What is Astral?

[Astral](https://github.com/astralapp/astral) is an open source web application that helps you organize your starred repositories.

<img src="/posts/images/astral_app_1.png" class="img-fluid centered-img">

It solves the issues I was previously pointing out by allowing us to add tags to our starred repositories. That means I can create a tag with a meaningful name and add this tag to the appropriate repositories.

Once grouped by tags, it becomes very easy to find the repositories you need. The interface is quite simple but shows all the information we need:
- the list of starred repositories grouped by tags 
- basic information for each repository (language, number of stars, number of pull requests, number of days since the last commit, the latest release, ...)
- a preview of the README file of the currently selected repository with the URL to quickly clone the repository
- a notes section where you can write extra information for each repository

<img src="/posts/images/astral_app_2.png" class="img-fluid centered-img">

> 🗨 Astral can also be self-hosted if you need. As it is a free web application, I don't see the point of self-hosting it but it is possible.  

# How do I use Astral?

I organize my starred repositories by grouping them with tags that I create in Astral and that are relevant to my way of categorizing things. That is the power of creating custom tags and assigning repositories to them, everyone can organize its starred repositories as it suits him or her.

To be honest, I only started to use Astral recently so my organization is subject to change but here are kinds of tags I like to create:

- Tags for different IT areas (like database, cloud, testing, IoT,..)
- Tags for the type of repository (like libraries, training, samples)
- Tags for the different frameworks I am interested in
> The language used in a repository is one thing but that does not say what framework is used (like ASP.NET Core, MAUI, Vue.js, React.js,...) and that can be a useful criterion when you are later looking for repositories using a specific framework


<img src="/posts/images/astral_app_3.png" class="img-fluid centered-img">

Starred repositories I have not yet tagged are located in the top left corner of the application. I try to tag a starred repository with different tags to help the future me looking for some repositories with multiple criteria.

Speaking of multiple criteria, you can create `Smart Filters` in Astral to filter your starred repositories with specific rules. For instance, I created a smart filter called `Microsoft 365 samples` to list active repositories showing samples to build Microsoft 365 applications (Teams applications, applications using Microsoft Graph...). This is just an example but you can create much more complex filters.

<img src="/posts/images/astral_app_4.png" class="img-fluid centered-img">

# To conclude

If you are often bookmarking GitHub repositories for future usage, Astral is a nice little web application to add to your toolbox. I found it by chance, but I liked it and I am now regularly using it. So try it and if you like it, give it a star and tag the repo with a `tools` tag in Astral 😉.