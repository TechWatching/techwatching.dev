Title: Week 41, 2021 - Tips I learned this week
Lead: vscode, vscode Jest extension, csharp attributes for nullables.
Published: 18/10/2021
Image: /images/surface_1.jpg
Tags:
  - tips learned this week
  - vscode
  - csharp
  - jest
---

This week I worked mainly in vs code to do some web development so tips will mostly be about vscode.

## Work on different parts of your file with the new "split in group" command

When you are developing a component in Vue.js, it is convenient to be able to work at the same time on the HTML template and the TypeScript code which happen to be in the same file.

<img src="/posts/images/w412021tips_vscode_1.png" class="img-fluid centered-img">  

The latest release of vscode allows you to do that easily by introducing a new command "Split in Group" (the shortcut is `Ctrl+K Ctrl+Shift+*` on Windows)" that splits an editor into two sides.

<img src="/posts/images/w412021tips_vscode_2.png" class="img-fluid centered-img">  

## `vscode-jest`, a must-have extension when using Jest

Many projects are using `Jest` as their testing framework for the frontend. But I was quite surprised to see that by default there is no test explorer in vscode to run or debug your `Jest` tests. I like the command line but for some things, like debugging a specific test, a UI is way more convenient. 

> 🗨 From what I understood, there is a native API/UI in vscode that extensions can use to help you managed your tests. You can learn about that [here](https://code.visualstudio.com/api/extension-guides/testing) 

So we have to install the `vscode-jest` [extension](https://github.com/jest-community/vscode-jest) to be able to discover our tests, run them and debug them. 

<img src="/posts/images/w412021tips_jest_1.png" class="img-fluid centered-img">  

If you are familiar with full-featured IDEs, you will like this extension that gives you a nice test explorer as well as other interesting features such as automatically running tests when code changes are made (similar to `Live Unit Testing` in Visual Studio )

That brings me to talking about sharing your vs code extensions with your colleagues.

## Share to your colleagues the vscode extensions to use on your project

When you start working on a new project, you often have to find out which extensions your colleagues are using so that you install everything you need to work on the project. If your colleagues are nice, they would have written this kind of information in the README or the wiki of the project. But what if vscode could directly suggest to you which extensions to install when you open the project on your computer.

<img src="/posts/images/w412021tips_vscode_3.png" class="img-fluid centered-img">  

As you can see on the screenshot above that is exactly what vscode can do for you if someone has specified the recommended vscode extensions of the workspace in the `extensions.json` file of the `.vscode` folder.
Here is an example of such a file:

```json
{
    "recommendations": [
        "orta.vscode-jest",
        "sdras.vue-vscode-extensionpack"
    ]
}
```

> 🗨 If you don't want vscode to recommend you some extensions, you can also specify a list of unwanted recommendations in this file.

This is just a list of vscode extensions identifiers. You can find the identifier of an extension on its details page in vscode. You will also find there a button to directly add the extension to your recommended list of extensions.

<img src="/posts/images/w412021tips_vscode_4.png" class="img-fluid centered-img">  

>🗨 If the `.vscode` folder is in the `gitignore` of your repository, do not forget to add this line `!.vscode/extensions.json` to your `gitignore` file to be able to add your `extensions.json` file in your repository.

And finally, let's talk a little bit about C#.

## Help the C# compiler helps you with nullable reference types.

I am a big fan of enabling nullable on c# projects because I am convinced that it enforces you to write better code. 

>As you can guess I am very happy to see that nullable will be enabled by default on new projects in .NET 6.  I think that warnings as errors for nullable should be set by default as well but that is another story.

However, sometimes the compiler is not enough clever or does not have enough context to know that some code is fine and that it should not raise a warning. When something like that happens, we often solve this by using one of these 2 solutions:
- Use the [null forgiving operator](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-forgiving) that should not be used in most cases
- Use an additional and unnecessary check just to please the compiler

It's because we often forget that we can add attributes on our code for null-state analysis as it is described in the [documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/attributes/nullable-analysis). These attributes will provide more information to the compiler which will be able to provide more accurate warnings.

I recently read a Pull Request where the developer was doing an additional check on the nullability of an out parameter coming from a `TryGet` method like in the example below.
 
```csharp
string name = ".NET 6";
var myStore = new MyAwesomeStore();
myStore.Add("WelcomeMessage", "  Hello ");

if (myStore.TryGet("WelcomeMessage", out var value) && value is not null)
{
    var welcomeMessage = value.TrimStart();
    string message = welcomeMessage + name;
}

public class MyAwesomeStore
{
    private IDictionary<string, string> _store = new Dictionary<string, string>();

    public void Add(string key, string value) => _store.Add(key, value);
    public bool TryGet(string key, out string? value) => _store.TryGetValue(key, out value);
}
```

But if we annotate correctly the `TryGet` method we don't need this check: 
```csharp
public bool TryGet(string key, [NotNullWhen(returnValue: true)] out string? value) => _store.TryGetValue(key, out value);
```

```csharp
if (myStore.TryGet("WelcomeMessage", out var value))
{
```

And that's it for this week, happy learning!