Title: Install your applications with winget
Lead: Winget import a promising feature
Published: 26/05/2021
Image: /images/surface_2.jpg
Tags:
  - development box setup
  - winget
  - package manager
  - tooling
---
# About Windows Package Manager
You probably have already heard of the new [Windows Package Manager](https://docs.microsoft.com/en-us/windows/package-manager/) and its command-line tool `winget` that allows you to automate installing and upgrading software on your Windows 10 computer.

With winget you can install an application very easily simply by executing in your terminal a command like this one which installs PowerToys:
```powershell
winget install powertoys
```

Currently, Windows Package Manager only offers basic features and has far fewer packages compared to other package managers like [Chocolatey](https://chocolatey.org/). However, even if `winget` is still in its early days, there are some promising features that make it a tool to consider when setting up a Windows 10 machine.

# Installing Microsoft Store applications

First, winget can install Microsoft Store applications. Most of the software you use as a developer probably does not come from Microsoft Store, but there are still some applications that it is handy to get from it. For instance, the new Windows Terminal is available as a Microsoft Store application. As far as I know, apart from `winget`, there is no other easy way to install a Microsoft Store application from the command line. With `winget` you can just do: `winget install Microsoft.WindowsTerminal -s msstore` to install the new WindowsTerminal application from Microsoft Store.

📌 Please note that at the time of writing, installing store applications from winget is an experimental feature that you have to enable in `winget settings` and that only a subset of Microsoft Store applications can be installed.  
<img src="/posts/images/winget_import_1.png" class="img-fluid centered-img">  

# Installing several packages with the import command

Second, winget has an `import` command that allows you installing all the package specified in a JSON file you pass in parameter. It means that instead of writing a script with many install commands for each of the packages you want to install, you can write a `package.json` file that will contain all the packages you want to install, their version, the source of the package (place to find them, msstore for Microsoft Store applications), ... and you will be able to install the software with one command: `winget import packages.json`

Here is an example of such a file:
```json
{
	"$schema" : "https://aka.ms/winget-packages.schema.2.0.json",
	"CreationDate" : "2021-05-23T14:41:38.200-00:00",
	"Sources" : 
	[
		{
			"Packages" : 
			[
				{
					"PackageIdentifier" : "Microsoft.Whiteboard"
				},
				{
					"PackageIdentifier" : "Microsoft.WindowsTerminal"	
				}
			],
			"SourceDetails" : 
			{
				"Argument" : "https://winget.azureedge.net/msstore",
				"Identifier" : "Microsoft.Winget.MSStore.Source_8wekyb3d8bbwe",
				"Name" : "msstore",
				"Type" : "Microsoft.PreIndexed.Package"
			}
		},
		{
			"Packages" : 
			[
				{
					"PackageIdentifier": "Microsoft.AzureCLI"
				},
				{
					"PackageIdentifier" : "Microsoft.PowerToys"
				}
			],
			"SourceDetails" : 
			{
				"Argument" : "https://winget.azureedge.net/cache",
				"Identifier" : "Microsoft.Winget.Source_8wekyb3d8bbwe",
				"Name" : "winget",
				"Type" : "Microsoft.PreIndexed.Package"
			}
		}
	],
	"WinGetVersion" : "0.4.11391"
}
```
It contains packages from Microsoft Store and packages from the `winget` package repository hence the 2 arrays of packages (one by each source).

📌 You can easily edit this JSON in vscode with autocompletion thanks to the link to the JSON `schema` at the beginning of the JSON.

Import is great but there are still things missing like the ability to silently install the applications which is possible with the install command.

# Final thoughts
Chocolatey will continue to be my main package manager for now: on the one hand for the number of packages available and on the other hand for being able to specify some parameters for a package installation (like the workload and components to install for Visual Studio 2019). Yet, `winget` will be part of my toolbox as well to install some packages (including Microsoft Store applications) and I expect it to continue to get better and better.