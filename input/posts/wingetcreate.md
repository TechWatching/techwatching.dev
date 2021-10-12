Title: Producing packages for Windows Package Manager
Lead: Automate the upgrade of a winget package with GitHub Actions and Winget Create.
Published: 25/08/2021
Image: /images/surface_2.jpg
Tags:
  - winget
  - wingetcreate
  - package manager
  - tooling
  - nushell
  - GitHub Actions
---

In my [previous articles about winget](https://www.techwatching.dev/tags/winget) I talked about installing packages but I did not talk about producing packages for Windows Package Manager. So let's set things right.

# About winget packages

Windows Package Manager allows you to search and install applications that are referenced by the sources you have configured to be used by the winget tool. Sources are repositories that list applications that can be installed by winget and the data needed for them to be installed (in the form of a manifest file containing information such as the installer location of a package for instance). The default source is the [Windows Package Manager Community Repository](https://github.com/microsoft/winget-pkgs) which is a public GitHub repository where everyone can submit their application package manifest to make an application available for installation to Windows Package Manager users. 

<img src="/posts/images/wingetcreate_package_repository.png" class="img-fluid centered-img">

Once you know that, if you are the developer of an application you want to distribute on Windows through the Windows Package Manager you have to create a manifest for your application and publish it through a Pull Request on the Windows Package Manager Community Repository. And each time you release a new version of your application, you have to update your app manifest with the information of your new package version (new version number, new installer location...) and create a PR to the Windows Package Manager Community Repository with this updated version of your manifest. For more details, you can have a look at the official [documentation](https://docs.microsoft.com/en-us/windows/package-manager/package/)

As a package creator, you probably do not want to create and update this app manifest manually. Luckily for you, there is a tool to do that for you.

# WingetCreate to the rescue

## Introducing WingetCreate
[Windows Package Manager Manifest Creator](https://github.com/microsoft/winget-create) aka WingetCreate is a tool "designed to help generate or update manifest files for the Community repo" (quoting the readme of WingetCreate repository). At the time of writing it is still in preview but you can already use it to help you with your manifest files. You can download the installer from [this link](https://aka.ms/wingetcreate/latest) but of course, it is available from winget: `winget install wingetcreate`.

The main commands are [New](https://github.com/microsoft/winget-create/blob/main/doc/new.md), [Update](https://github.com/microsoft/winget-create/blob/main/doc/update.md) and [Submit](https://github.com/microsoft/winget-create/blob/main/doc/submit.md).

## The `New` command
It allows you to create a new manifest from scratch. If you don't know where to start to deal with manifest files it is a nice way of getting started. Yet having a look at existing manifests in the [winget community repository](https://github.com/microsoft/winget-pkgs) can be sometimes more efficient.

## The `Update` command
It allows you to update an existing manifest, that is to say, to create an updated version of your manifest when you have released a new version of your application (so new version number and new installer URL). You can use this command to `submit` your updated package to the Windows Package Manager Community Repository. In my opinion, it is the most useful command from WingetCreate as it can be easily be integrated into a build pipeline to publish your installer. 

## The `Submit` command
It allows you to submit an existing manifest (you created earlier on disk with the create or update command) to the Windows Package Manager Community Repository automatically. Basically, what it does is that it uses the GitHub personal access token you give it to create a Pull Request with your manifest in this repository.

## What else?

If you look at the [settings command](https://github.com/microsoft/winget-create/blob/main/doc/settings.md) you will see that you can specify the name of the GitHub repository to target for your package submission. This is interesting if you want to host a private source for winget available to your organization only where you will publish applications related to your business needs and that you don't want to make available publicly. 

WingetCreate is a really helpful tool to create, update and validate a manifest for your winget package. Still, you probably don't want to manually run WingetCreate each time you release a new package version. So let's see how to automate that with GitHub Actions.

# Automating your app manifest upgrade with GitHub Actions

## Why using GitHub Actions to demonstrate the automation of app manifests upgrades?

<img src="/posts/images/wingetcreate_githubactions.png" class="img-fluid centered-img">

In my daily work, Azure Pipelines are the pipelines I used to do CI/CD and they are great. Currently, they offer more functionalities than GitHub Actions and as the code I develop is hosted in Azure Repos it makes more sense to use the Azure DevOps built-in CI/CD tool than something else (although Azure DevOps does not enforce at all you to choose their tools). However there is already in WingetCreate's readme a section with a link to an example about using WingetCreate with Azure Pipelines, but there is no example with GitHub Actions.

Moreover, I think many applications that are available or will want to be available as a winget package are open source applications whose code are hosted in a GitHub repository and that are already using GitHub Actions for their CI/CD. So I thought it could be useful to have an example of using WingetCreate with GitHub Actions, especially as GitHub has this concept of "releases".

## An interesting use case for with Nushell

[Nushell](https://www.nushell.sh/) is a cross-platform shell written in Rust. Nushell's developers took the best of existing shells (like the structured data approach from PowerShell) and created a shell that feels modern, easy-to-use, and very useful in my opinion.

There was a [GitHub issue](https://github.com/nushell/nushell/issues/1859) to support the new official Windows package manager so I though it was the opportunity to contribute to Nushell. Contributing to this project was something that I had not been able to do yet because I did not know Rust, writing CI/CD pipelines however is something I can do. 

<img src="/posts/images/wingetcreate_nushell.png" class="img-fluid centered-img">

Nushell already uses GitHub Actions for its continuous integration and to create releases. If you are not familiar with GitHub releases you can read the [official documentation](https://docs.github.com/en/github/administering-a-repository/releasing-projects-on-github/about-releases) but basically a release is a version of your software (corresponding to a git tag in your repository) that you make available with release notes and binaries files. 

<img src="/posts/images/wingetcreate_release.png" class="img-fluid centered-img">

Therefore, the idea was to update Nushell manifest with the latest version of Nushell using `WingetCreate` each time a new release of Nushell is published.

## Triggering a new workflow from a release event

Automating the app manifest upgrade of Nushell just meant creating a `job` in a GitHub Actions workflow that would call `WingetCreate` with the new version number and the new installer URL.

I first wanted to modify the existing Nushell GitHub Actions workflow that was creating the releases by adding a new `job` at the end of the workflow just after the release was created. Well this is was a bad idea, I pushed this change and during the next release of Nushell the workflow failed because I did not pay attention that the workflow was creating releases in draft, so the installer URL of the new version did not exist when my job called `WingetCreate`. 

Because of that, I decided to create a separate workflow that would be triggered each time a Nushell release is published. In Nushell this is done manually (passing from draft to release) but even if it were done automatically by the release workflow I think it is a better idea to have a specific workflow triggered by the publication of a release.

```yml
name: Submit Nushell package to Windows Package Manager Community Repository 

on:
  release:
    types: [published]

jobs:

  winget:
    name: Publish winget package
```

I like how it is possible with GitHub Actions to trigger on many different GitHub events. It is something that seems more limited in Azure Pipelines.

### Calling `WingetCreate` from a GitHub Actions workflow.

Windows Package Manager Manifest Creator needs to be run in windows so we need to specify that in the job that will submit a new version of Nushell package to Windows Package Manager Community Repository:

```yml
jobs:

  winget:
    name: Publish winget package
    runs-on: windows-latest
```

This job will only contain one step that is the execution of the commands to call `WingetCreate`. These commands will be in PowerShell as this is the default runner (`pwsh`) in a windows job.

```yml
  winget:
    name: Publish winget package
    runs-on: windows-latest
    steps:
      - name: Submit package to Windows Package Manager Community Repository
        run: |

```

First, we need to download the latest version of `WingetCreate` by using the following command :
```powershell
iwr https://aka.ms/wingetcreate/latest -OutFile wingetcreate.exe
```

Second, we want to retrieve the version number and the installer URL of the new package. These 2 pieces of information will be needed as parameters to the WingetCreate update command. We can find these in the GitHub context which contains the release event that triggered the workflow. We are using these 2 lines of PowerShell to get assets associated with the release and filter on the msi file which is the Windows installer of Nushell.

```powershell
$github = Get-Content '${{ github.event_path }}' | ConvertFrom-Json
$installerUrl = $github.release.assets | Where-Object -Property name -match 'windows.msi' | Select -ExpandProperty browser_download_url -First 1
```

> 💡 I just thought that instead of doing this in PowerShell we could have done this in Nushell, which would have been fun 'using Nushell to provide a new version of Nushell' but as it is not installed by default on windows agents it would mean a loss of time each time the workflow runs.

Third, we can call the `WingetCreate` update command by specifying the version, the URL of the installer, and a Personal Access Token that will be used by `WingetCreate` to make the Pull Request in the Windows Package Manager Community Repository. This PAT needs to be created by a maintainer of the repository with permission and added to the secrets of the project.

<img src="/posts/images/wingetcreate_pat.png" class="img-fluid centered-img">

Here you can see a run of the workflow in GitHub:

<img src="/posts/images/wingetcreate_wokflow_1.png" class="img-fluid centered-img">

## Overview of the created workflow

You can find the complete workflow below and [here](https://github.com/nushell/nushell/blob/main/.github/workflows/winget-submission.yml) in the Nushell repository.

```
name: Submit Nushell package to Windows Package Manager Community Repository 

on:
  release:
    types: [published]

jobs:

  winget:
    name: Publish winget package
    runs-on: windows-latest
    steps:
      - name: Submit package to Windows Package Manager Community Repository
        run: |
          iwr https://aka.ms/wingetcreate/latest -OutFile wingetcreate.exe
          $github = Get-Content '${{ github.event_path }}' | ConvertFrom-Json
          $installerUrl = $github.release.assets | Where-Object -Property name -match 'windows.msi' | Select -ExpandProperty browser_download_url -First 1
          .\wingetcreate.exe update Nushell.Nushell -s -v $github.release.tag_name -u $installerUrl -t ${{ secrets.NUSHELL_PAT }}
```

Here is what a Pull Request generated by the GitHub Actions workflow looks like:

<img src="/posts/images/wingetcreate_pr.png" class="img-fluid centered-img">

# To summarize

We have introduced the notion of source for winget packages and in particular, the Windows Package Manager Community Repository where we can open PR to submit a new application or new versions of an existing application. We have seen how Windows Package Manager Manifest Creator could help us do that and how it could be automated from a GitHub Actions workflow like it was done for the Nushell project.

Do not hesitate to copy some of the GitHub Actions workflows I showed you. I hope this will inspire you to do the same to distribute your applications through winget.

A big thank you to [Edward Thomson](https://twitter.com/ethomson) who explained to me how to retrieve GitHub Actions contexts in PowerShell. Thanks also to [Darren Schroeder](https://twitter.com/fdncred) and [Jonathan Turner](https://twitter.com/jntrnr) who supported me to set up a workflow that publishes new releases of Nushell in winget.  