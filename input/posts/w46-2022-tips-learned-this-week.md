Title: Week 46, 2022 - Tips I learned this week
Lead: Some tips about .NET, pnpm, and Azure DevOps.
Published: 20/11/2022
Image: /images/surface_1.jpg
Tags:
  - tips learned this week
  - .NET
  - winget
  - pnpm
  - package manager
  - vscode
  - Azure DevOps
  - tooling
---

## .NET tip of the week: install .NET 7 using winget

This week, I installed .NET 7 on my laptop and I used [Windows Package Manager](https://learn.microsoft.com/en-us/windows/package-manager/) for that:

```pwsh
winget install Microsoft.DotNet.SDK.7
```

I like winget, I have already written a few articles about it (you can find them [here](https://www.techwatching.dev/tags/winget/)) so I am really glad to see that we can now use winget to install .NET (whether it be the SDKs or the runtimes). You can check [Microsoft's article](https://devblogs.microsoft.com/dotnet/dotnet-now-on-windows-package-manager/) announcing it for more information.

## Tool of the week: pnpm

I don't know which JavaScript package manager you are using but since I tried [pnpm](https://pnpm.io/) I don't want to use anything else because it's so fast! If you are interested to know why it's so fast and better than npm for instance, you can watch the talk ["What makes pnpm performant"](https://viteconf.org/2022/replay/pnpm) that Zoltan Kochan gave at Vite Conf. Many [popular open-source projects](https://pnpm.io/workspaces#usage-examples) like Vite and Vue are using pnpm.

Here are some tips about pnpm:

1) You can use pnpm to manage Node.js versions on your machine

Previously, I was using [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage multiple installation of Node.js on my laptop and it worked fine. Yet I can now do that directly using pnpm env command:

<img src="/posts/images/w462022tips_pnpm_env.png" class="img-fluid centered-img">

2) You can configure vscode to run npm scripts using pnpm

A lot of the people I know don't use the scripts explorer of vscode to run the scripts contained in the package.json file of the project opened in vscode. It's a pity because it is an handy feature. And you can configure it in your settings to run scripts using a specific package manager, pnpm in my case.

<img src="/posts/images/w462022tips_pnpm_scripts.png" class="img-fluid centered-img">

3) With pnpm, you can use aliases for packages you install

Check the [documentation](https://pnpm.io/aliases) to see why and how to use this feature.

## The GitLens/Azure DevOps tip you did not know about: autolinks

GitLens, the awesome extension for vscode has a nice feature called "autolinks" that can make external references in your commit messages clickable links.

<img src="/posts/images/w462022tips_gitlens_autolink_1.png" class="img-fluid centered-img">

If you are using Azure DevOps, this feature can become very handy for you commit messages that contain references to work items (usually an hasjtag followed by the work item number). You just have to configure # as the prefix and https://dev.azure.com/{organizationName}/{projectName}/_workitems/edit/<num> as the URL) to make it work.

<img src="/posts/images/w462022tips_gitlens_autolink_2.png" class="img-fluid centered-img">

And that's it for this week, happy learning!