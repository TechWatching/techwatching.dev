Title: Week 19, 2022 - Tips I learned this week
Lead: Git commands in vscode, a nice tool for Vue developers and a must-have Visual Studio extension.
Published: 14/05/2022
Image: /images/surface_1.jpg
Tags:
  - tips learned this week
  - vscode
  - git
  - Vue.js
  - Visual Studio
  - tooling
---

## Git tip of the week

If you have read my [git cheat sheet](https://www.techwatching.dev/gitcheatsheet), you know that I am a big fan of the [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) vscode extension. I have been using it for a while now but just discovered recently that there is a [Git Command Palette](https://github.com/gitkraken/vscode-gitlens#git-command-palette-) that gives access to most common Git commands.

<img src="/posts/images/w192022tips_gitlens_1.png" class="img-fluid centered-img">

Usually, I prefer typing the git commands rather than using a visual tool. This way, I know exactly what I am doing (no magic commands done by a tool behind the scene), and I improve my knowledge of git. However, I think that with Git Command Palette, I get the best of both worlds. The UI helps me to use the git command I need without having to type everything and remember the exact syntax of the command. Yet, this is not a UI with buttons that hide from me the git commands being run. I am still aware of the exact git commands I am using and how.

<img src="/posts/images/w192022tips_gitlens_2.png" class="img-fluid centered-img">

On Windows, the default shortcut to use the Git Command Palette is `Ctrl + Shift + G : `.

## Tool of the week: Vue Telescope

If you are a Vue developer and don't know this tool yet, this is going to make your day! When browsing a website, you are probably wondering if it has been made with Vue.js and if so what is the technology stack behind it. Personally, I find it very interesting to know which frameworks, libraries, or plugins have been used to create a website in Vue. And that's what [Vue Telescope](https://vuetelescope.com/) is about. It's an open source tool made by [NuxtLabs](https://nuxtlabs.com/) (the team behind the [Nuxt](https://nuxtjs.org/) framework) that detects the Vue technologies used in a website. It can be used from a browser [extension](https://chrome.google.com/webstore/detail/vue-telescope/neaebjphlfplgdhedjdhcnpjkndddbpd) or from Vue Telescope's [website](https://vuetelescope.com/) to search a analyze a specific website.

<img src="/posts/images/w192022tips_vuetelescope_1.png" class="img-fluid centered-img">

You can explore the Vue.js websites already scanned by VueTelescope [here](https://vuetelescope.com/explore) and filter on the frameworks, UI Frameworks you are interested in.

<img src="/posts/images/w192022tips_vuetelescope_2.png" class="img-fluid centered-img">


## The Visual Studio extension you should try: Add New File

Sometimes the simplest IDE extensions are the best. That's the case for the ["Add New"](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.AddNewFile64) Visual Studio extension which allows you to quickly create a new file by hitting "Shift+F2" and writing the name of the file with its extension. Nothing fancy, but it saves you a lot of time compared to adding a new file using the default dialog.

<img src="/posts/images/w192022tips_addnewfile_1.png" class="img-fluid centered-img">

As you can see you can even create the missing folders where the file is placed.

<img src="/posts/images/w192022tips_addnewfile.gif" class="img-fluid centered-img">

And that's it for this week, happy learning!