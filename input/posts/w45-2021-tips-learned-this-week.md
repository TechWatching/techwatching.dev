Title: Week 45, 2021 - Tips I learned this week
Lead: A bit of tooling and a bit of git.
Published: 14/11/2021
Image: /images/surface_1.jpg
Tags:
  - tips learned this week
  - Visual Studio
  - Vue.js
  - git
---

## `Vue Devtools`, a must-have browser extension when using Vue.js

Since a colleague showed me the `Vue Devtools` extension, it has been a game-changer for me to work on Vue.js projects. It is very useful!

I could describe to you how this extension works and what are its features but there are already very good articles that do that, like this [one](https://www.vuemastery.com/blog/whats-new-in-the-vue3-devtools/) on Vue Mastery's blog. Check that, have a look at the [documentation](https://devtools.vuejs.org/), install [it](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg) (the beta version), and try it.

<img src="/posts/images/w452021tips_vue_1.png" class="img-fluid centered-img">  

## Cobalt2 theme is available in Visual Studio 2022

I have used [Cobalt2 theme](https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2) for vscode for quite some time now. And this theme is now available in Visual Studio 2022, you can check [this extension](https://marketplace.visualstudio.com/items?itemName=SIBA.Cobalt2Theme) to get it.

A lot of vscode themes have been made available in Visual Studio 2022 thanks to a new tool: [Theme Converter for Visual Studio](https://github.com/microsoft/theme-converter-for-vs). You can read more about that [in this article](https://devblogs.microsoft.com/visualstudio/custom-themes/) from Visual Studio dev blog.

<img src="/posts/images/w452021tips_vs_1.png" class="img-fluid centered-img">  

## Keep a 2nd clone for reviewing pull requests

I think it is often interesting to checkout the branch of a pull request instead of relying only on the web view to review a PR. It allows checking more things and a better comprehension of the code. However, when you are working on a feature, you don't want to mix your current work with the pull request you are reviewing.

That is why instead of stashing code changes and switching branches I prefer having on my laptop 2 clones of the same repository I am working on, with one clone dedicated to code reviews.

## Git CLRF

If you are using Git on Windows, it is a good practice to set your `autocrlf` to true in your Git configuration to avoid line-ending issues (learn more about this topic in the [documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)). You can do that with the following command `git config --global core.autocrlf true`.

Unfortunately, maybe not all your colleagues have correctly configured `autocrlf` on their machine. And you will probably forget to ask each newcomer to check that. So something that can be interesting (if all your team is working on Windows) is to directly enforce this setting on your repository by pushing a `.gitattributes` with `text=auto` in it).

> 🗨 As I was writing these lines, I just saw an article from Scott Hanselman about [Carriage Returns and Line Feeds](https://www.hanselman.com/blog/carriage-returns-and-line-feeds-will-ultimately-bite-you-some-git-tips), if you want to read more about it. 

## dotNetConf playlist

dotNetConf was this week and the replays are available [here](https://www.youtube.com/playlist?list=PLdo4fOcmZ0oVFtp9MDEBNbA2sSqYvXSXO) if you want to watch some talks you missed.

<img src="/posts/images/w452021tips_dotnetconf_1.png" class="img-fluid centered-img">  

And that's it for this week, happy learning!