Title: How did I automate the setup of my developer Windows laptop?
Lead: A git repository, 2 packages managers, a little bit of scripting, and here is my new environment ready
Published: 02/09/2022
Image: /images/laptop_2.jpg
Tags:
  - thoughts
---
In this article, I talked about my latest project: how I built a script to automate the setup of my developer machine using Boxstarter, Chocolatey, Winget, and PowerShell... and how I learned a few things along the way.

## Context

You have probably already faced this situation when you get a new personal or professional laptop, and you have to reinstall all the software you are using daily on this machine. Usually, you lose a few hours to a day to set up your developer environment and not everything is exactly as it was on your previous laptop because you always forget some things.

It's not even only about installing software but also configuring your environment to meet your habits. And that's important because a properly configured developer environment with the right tools is what makes you productive in your everyday developer life.

<img src="/posts/images/automate_developer_machine_tool.jpg" class="img-fluid centered-img">

A lot of people have solved this issue by scripting their developer environment setup, and I decided it was time for me to do the same. And believe me, it was not for the beauty of having everything automatically installed but to stop wasting my time each time I change or reinstall my laptop.

Please note that what I did to setup my developer machine was inspired by the [Windows Dev Box setup scripts](https://github.com/Microsoft/windows-dev-box-setup-scripts) GitHub repository and other repositories using boxstarter (check [Laurent Kempé's repository](https://github.com/laurentkempe/Cacao) for instance) to install their Windows environment.

## How does it work?

There are many ways to automate the setup of a developer machine. Before choosing one, I had a few requirements/preferences:
- installation of my machine should be simple to script and run
- no need to pre-install some software before launching the installation of my environment
- avoid manual steps or user interaction during the installation
- be able easily to share some software configurations between laptops

Because of these requirements, I chose to use [Boxstarter](https://boxstarter.org/). It has several interesting features (check the [website](https://boxstarter.org/whyboxstarter)) but the one I like the most is you can launch your installation process directly by [clicking on a link](https://boxstarter.org/weblauncher). You just need an URL like this one: 
```http
https://boxstarter.org/package/nr/url?{urlToYourInstallationScript}
```
The `{urlToYourInstallationScript}` part is the URL where is stored your installation script. I put mine in a [public GitHub repository](https://github.com/TechWatching/dotfiles/blob/main/boxstarter.ps1) called `dotfiles`. 

<img src="/posts/images/automate_developer_machine_boxstarter.png" class="img-fluid centered-img">

> 💬 Boxstarter was a nice discovery, I barely scratched the surface but it can do interesting things like remote installations.

In this repository, I also put different scripts (to separate the different steps instead of having one big installation script file), some config files I wanted to use in my setup (my `.gitconfig` file for instance), and a readme with some explanations and the link to launch the installation. I did not reinvent the wheel as it's more or less how the [Windows Dev Box setup scripts](https://github.com/Microsoft/windows-dev-box-setup-scripts) work.

Because I wanted to share some software configurations between laptops (or between installations), using a GitHub repository is interesting. The first thing my setup script does is to install Git, then it clones this repository to have access to the other scripts and configuration files. 

```pwsh
# Install git and clone repository containing scripts and config files
choco install -y git --params "/GitOnlyOnPath /NoShellIntegration /WindowsTerminal"
RefreshEnv
git clone https://github.com/TechWatching/dotfiles.git "$env:USERPROFILE\dotfiles"
```

The scripts are written in [PowerShell](https://docs.microsoft.com/en-us/powershell/).

## Installing software

### Package managers

The easiest way to automate installing, upgrading, and configuring software is to use package managers. There are several available on Windows but I chose to use [Windows Package Manager](https://docs.microsoft.com/en-us/windows/package-manager/) and [Chocolatey](https://chocolatey.org/).

Windows Package Manager (aka winget) is relatively new so has fewer features and packages available than other package managers like Chocolatey. However it's very promising, it's getting better every day, it's built-in Windows, and above all, it supports installing Microsoft Store apps. So I chose to use winget by default and fallback to Chocolatey when a package I needed was not available or not up-to-date in winget.

> 💬 I learned a few things about winget while starting to use it. You can find my articles talking about it [here](https://www.techwatching.dev/tags/winget/) if you are interested.

### Installing Integrated Development Environments (IDEs)

Visual Studio has been my main IDE for a while, but I have been started recently to use more and more Rider as well. Both are nice IDEs with many features particularly well suited for .NET development which is what I mostly do. I have been a Visual Studio Code long-time user too, mostly using it as a text editor or for front development. I also use vscode to work with Azure because it has nice extensions for a lot of Azure services.

<img src="/posts/images/automate_developer_machine_visualstudio.jpg" class="img-fluid centered-img">

You probably want to customize your Visual Studio installation to only include the workloads, components, and language packs you are using. You can specify them as parameters in the winget or chocolatey install command but that's a bit cumbersome. The easiest way is to export your configuration from the Visual Studio installer. 

You can then install Visual Studio with this kind of command:

```pwsh
winget install -e -h --id Microsoft.VisualStudio.2022.Enterprise --silent --override "--wait --quiet --addProductLang En-us --config .vsconfig"
```

> 💬 I did not know before trying to automate Visual Studio installation that you could specify parameters to its installer on the command line but that's very useful.

I don't export Visual Studio settings or extensions as most of them can be synchronized through the personalization account (you just have to sign in to Visual Studio with the same account).

In a similar way, I use [vscode built-in settings synchronization](https://code.visualstudio.com/docs/editor/settings-sync) to share my setup (extensions, settings, keybindings) across machines so I don't have to do a custom installation.

There is a Rider package available on chocolatey but it is not always up-to-date and I prefer to use the JetBrains ToolBox application to manage the installation and update of my JetBrains tools. Unfortunately, JetBrains ToolBox does not currently have a CLI to automate the installation of Rider and other useful .NET tools (there is an [issue](https://youtrack.jetbrains.com/issue/TBX-653/toolbox-cli) opened though if you want to vote) so I only automated the installation of JetBrains ToolBox and will have to install it Rider manually from it.

### Tools I need

Of course, git is a must-have. I use [NVM for windows](https://github.com/coreybutler/nvm-windows) to manage multiple installations of node.js on my laptop, and [pnpm](https://pnpm.io/) is my preferred package manager for Node.js.

There are 2 shells I like to use (both of them are cross-platform): [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/overview) and [Nushell](https://www.nushell.sh/). I use [Oh My Posh](https://ohmyposh.dev/) to configure an enhanced prompt for both shells. [Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/) is my go-to terminal.

As I work mainly on cloud projects, there are some Azure tools I need on my laptop:

```pwsh
winget install -e -h --id Microsoft.AzureCLI
winget install -e -h --id Microsoft.AzureCosmosEmulator
winget install -e -h --id Microsoft.AzureDataStudio
winget install -e -h --id Microsoft.azure-iot-explorer
winget install -e -h --id Microsoft.AzureStorageExplorer
winget install -e -h --id Pulumi.Pulumi
winget install -e -h --id Microsoft.AzureFunctionsCoreTools
# Azurite can be installed through vscode extension or as a global npm package
# pnpm add -g azurite
```

My script also automates the installation of other tools, not related to software development but that I often use (like [7zip](https://www.7-zip.org/), [Microsoft Power Toys](https://docs.microsoft.com/en-us/windows/powertoys/) or just browsers).

Generally, when the applications I want to install are available in the Microsoft Store, I specify winget to install them from there.

```pwsh
winget install -e -h --id Microsoft.WindowsTerminal -s msstore
```
> 💬 Automating the installation of my developer machine was the opportunity to realize all the tools I was using daily, and which ones were really useful.

### Tools I don't need

Unnecessary applications that come with Windows out of the box are uninstalled using this function:

```pwsh
function removeApp {
	Param ([string]$appName)
	Write-Output "Trying to remove $appName"
	Get-AppxPackage $appName -AllUsers | Remove-AppxPackage
	Get-AppXProvisionedPackage -Online | Where DisplayName -like $appName | Remove-AppxProvisionedPackage -Online
```

It allows me to get rid of pre-installed applications like `Facebook`or `Bing News`.

## Configuring software

Installing software is one part, but configuring it is another. As I previously mentioned, for some applications in which you sign in with an account, settings are synchronized so you don't need to transfer the application settings from your previous laptop. For the others, I decided to use symbolic links.

<img src="/posts/images/automate_developer_machine_idea.jpg" class="img-fluid centered-img">

Here are some examples of settings I wanted to set up on a new laptop:
- my [.gitconfig file](https://github.com/TechWatching/dotfiles/blob/main/config/git/.gitconfig)
- my [Windows Terminal settings](https://github.com/TechWatching/dotfiles/blob/main/config/windowsTerminal/settings.json)
- my [PowerShell profile](https://github.com/TechWatching/dotfiles/blob/main/config/powershell/Microsoft.PowerShell_profile.ps1)
- my [custom prompt configuration](https://github.com/TechWatching/dotfiles/blob/main/config/prompt/.oh-my-posh.omp.json) done using oh my posh 

To create a symbolic link at the Windows Terminal settings file pointing to the settings file in my `dotfiles` cloned repository I can do the following command:
```pwsh
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json" -Target "$env:USERPROFILE\dotfiles\config\windowsTerminal\settings.json""
```

Because I use symbolic links, when I modify the configuration of my Windows Terminal (event through the UI), the settings file in my git repository is the one being modified so I can commit it and push it so that my other machines have the latest version. And it's the same for all my settings files.

There are others settings in my repository and I will probably continue to add some later. 

## What I did not automate ... yet!

There are many things I did not automate yet and that I will do bit by bit.  Nevertheless, I am happy with the current setup. There is much room for improvement but I've already won some time last time I changed my laptop, and that was the goal.

As I've just said, there are other configurations I would probably need to store in my repository. [Power Toys](https://docs.microsoft.com/en-us/windows/powertoys) settings might be one of them unless they add a settings sync (issue already opened [here](https://github.com/microsoft/PowerToys/issues/3381)). It would be better because there are many settings files so only using symbolic links could be cumbersome.

Most of the software I need is installed by my setup script. One exception is JetBrains products but I hope it will be possible soon. I have some commented lines in my installation script about automating the setup of [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) and docker (well installation of Rancher Desktop to be more precise as a replacement of Docker Desktop due to its new license model) that required some windows features to be installed.  I think these lines should work with some adjustments, it's just that I did that manually last time and did not take the time to test the corresponding commands properly. 

There are also some limitations to my current approach to installing my developer machine:
- As everything is contained in a public GitHub repository, I can't keep some files or secrets private obviously (it could be useful to configure a new machine to [sign commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) for instance)
- The installation script is not idempotent so it will try to re-install and re-configure everything if I re-run it (not a big deal as I mainly use it to install a new machine, but it would be nice to be able to just re-run it to get on an existing installation all the latest improvements I made on another laptop)
- I did not set up anything to handle multiple configurations (one for my personal laptop and one for my professional laptop for example) 

I think the tool [chezmoi](https://www.chezmoi.io/) might help to solve some of these limitations. Maybe one day I'll take the time to dig a little deeper to see if I can improve the whole process.

## To conclude

You can find the repository with all the code I use to automate my installation [here](https://github.com/TechWatching/dotfiles).

Automating my machine installation was not that fun, but I learned lots of things while doing it about package managers, windows, symbolic links, PowerShell... And in the end, it is very satisfying when everything starts to install automatically and you find a familiar environment on a new laptop.

Whether you adopt this approach or another to automate the setup of your development machine, I think it's an important thing to do. It does not have to be complex, and you don't need to automate everything. But you should probably at least use a package manager for your software installations, have a list somewhere of the most useful tools you need, and keep a copy of the configuration files of your most important tools.

This article is part of the [4 articles in 4 weeks Hashnode writing contest](https://townhall.hashnode.com/4-articles-in-4-weeks-hashnode-writing-contest).

Happy learning.