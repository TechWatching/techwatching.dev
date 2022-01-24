Title: Week 2, 2022 - Tips I learned this week
Lead: Tooling around .NET, Azure, Github and VS Code.
Published: 14/01/2022
Image: /images/surface_1.jpg
Tags:
  - tips learned this week
  - .NET
  - Azure CLI
  - GitHub
  - vscode
  - tooling
---

This is my first article of the series [Tips I learned this week](https://www.techwatching.dev/tags/tips-learned-this-week/) for 2022 🚀! And today we are going to see some tips about .NET, Azure, GitHub, and VS Code.

## .NET tip of the week: changing the .NET CLI language

Did you know that you could change the language of the .NET CLI to the one you find most appropriate? By default, the dotnet CLI messages you see when running a dotnet program are your language OS (French in my case). However, by setting the "DOTNET_CLI_UI_LANGUAGE" variable environment to `en` for instance I can change it to English.

<img src="/posts/images/w022022tips_dotnet_cli.png" class="img-fluid centered-img">

Why is it useful? Let's imagine I have an issue with a dotnet CLI command and that I want to get some help from the community by posting a question to a Q&A website with a screenshot of my error. If all the messages are in French I will probably not get many answers whereas if it's in English everyone will be able to understand what my commands are doing. There is also the fact that sometimes French accents and special characters are not well displayed by some terminals. 

## The Azure tip you did not know about: simplify your Azure CLI configuration with `azure init`

I don't know if you use a lot Azure CLI but it's a very nice tool! Each time I use Azure CLI, I think "it's awesome 🤩 I should use it more often instead of using Azure Portal". I even wrote a post about that 2 years ago: "[Goodbye Azure Portal, Welcome Azure CLI](https://www.techwatching.dev/posts/welcome-azure-cli)".

However, if you want to configure your Azure CLI, it can be sometimes a bit boring and slow to configure it using the `az config` command. That is why Microsoft has [released in preview](https://techcommunity.microsoft.com/t5/azure-tools-blog/streamline-configuring-azure-cli-with-az-init/ba-p/3051810) an Azure CLI extension called `az init` to simplify this configuration. For example you can quickly configure the output of the commands or the syntax highlighting, things like that.

<img src="/posts/images/w022022tips_az_init.png" class="img-fluid centered-img">

## Tool of the week: GitHub Code Search

Have you ever wished you could easily search code on GitHub in multiple repositories without cloning anything? That is now possible with [GitHub Code Search](https://cs.github.com/). It is still in preview but looks promising! You have access to nice filters to find exactly the code you are looking for, and once you get it you can navigate in and across files.

For a long time, I have kept a bookmark to the "https://source.dot.net/" website for the times when I needed to understand how something was implemented in the .NET Core framework. But with GitHub Code Search I think I don't need it anymore. .NET Core is open source and all the source code is on GitHub so I can quickly find everything I need just by searching it on GitHub.

For instance, let's say I don't remember exactly what configuration is injected by default in a dotnet project when you use the `Host.CreateDefaultBuilder` method. I will scope my search to dotnet organization repositories and a few keystrokes later, I can see all the configuration providers used to load some default configuration in a project.

<img src="/posts/images/w022022tips_githu_cs.gif" class="img-fluid centered-img">

You can read more about GitHub Code Search on [GitHub's blog](https://github.blog/2021-12-08-improving-github-code-search/).

## The VS Code extension you should try: i18n ally

When you are developing an application that supports several languages, it can quickly become annoying to go in every translation file when you need to check or modify a translation. If you are developing your application using VS Code, you probably should check out the extension [i18n ally](https://github.com/lokalise/i18n-ally) because it will save you a lot of time.

<img src="/posts/images/w222021tips_i18n_ally.png" class="img-fluid centered-img">

It is very handy and I like the fact the extension support lots of frameworks like Vue.js, Angular, React, Svelte, and Flutter (you can find the complete list of supported frameworks [here](https://github.com/lokalise/i18n-ally/wiki/Supported-Frameworks)). My only regret with this extension is not to have heard about it sooner.

And that's it for this week, happy learning!