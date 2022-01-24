Title: HTML templating in Xamarin
Lead: Razor templates, Handlebars.Net ...
Published: 10/03/2019
Image: /images/phone_2.jpg
Tags:
  - Razor
  - Xamarin
  - Templating
---
There are often situations where you need to do some HTML templating and having a powerful HTML templating engine like Razor can be really helpful.
What is nice is that you don't need to be in an ASP.NET context to use Razor templates, in fact you can even use them in a Xamarin Application. 

## Razor templates
There is already a complete article about Razor HTML templates in Xamarin in the [Microsoft documentation](https://docs.microsoft.com/en-us/xamarin/cross-platform/platform/razor-html-templates/) so if you want an in-depth explanation I suggest you to read it. In this article, it is explained how to add a Razor template file (`.cshtml` file) to a Xamarin project by using the _Text Templating_ section of the _New file_ dialog.
However if you try to add a new item in a Xamarin project you won't see a _Text Templating_ section.

<img src="/posts/images/htmltemplating_vs_1.png" class="img-fluid centered-img">

That's because at the time of writing of this article, it only exists in Visual Studio for Mac (probably because it comes from Xamarin Studio). So how to add a Razor template file in Visual Studio (Windows) ?
There is a little tip to do that (I found it in an old post on [StackOverflow](https://stackoverflow.com/questions/39048900/is-there-a-preprocessed-razor-template-for-visual-studio-2015)): you have to manually add a `.cshtml` file to your project and set the custom tool to `RazorTemplatePreprocessor` in the properties of the file (this will generate the code-behind file).

<img src="/posts/images/htmltemplating_vs_2.png" class="img-fluid centered-img">

Then you can generate an html string from your Razor template and your data in your Xamarin project.

Code to generate the html string:
```csharp
var people = new Character[]
{
    new Character() { FirstName = "Ellana", LastName = "Caldin", Job = "Marchombre"},
    new Character() { FirstName = "Edwin", LastName = "Til'Illan", Job = "General"}
};
var template = new RazorTemplate() { Model =  people};
var page = template.GenerateString();
```
Razor template:
```
@model IEnumerable<PdfGeneration.Models.Character>
<html>
<body>
    <ul class="people">
    @foreach (var person in @Model)
    {
        <li>@person.FirstName @person.LastName - @person.Job</li>
    }
    </ul>
</body>
</html>
```
This code produces the following html:
```html
<html>
<body>
    <ul class="people">
        <li>Ellana Caldin - Marchombre</li>
        <li>Edwin Til&#39;Illan - General</li>
    </ul>
</body>
</html>
```

## Handlebars.Net, an alternative to Razor templates
You can also do HTML templating by using [Handlebars.Net](https://github.com/rexm/Handlebars.Net) which is a .NET Handlebars engine. It allows to build semantic templates in a .NET application. It uses the same syntax than [handlebars.js](http://handlebarsjs.com/) for the templates and try to mimic the JS API. Nothing better than a piece of code to illustrate that:
<?# Gist 14bc3bba36aafefb364d4c89d7570c90 /?>
This produces the following html:
```html
<ul class="people">
    <li>Ellana Caldin - Marchombre</li>
    <li>Edwin Til'Illan - General</li>
</ul>
```
The code above `TestingHandlebars.csx` is a C# script so if you have [dotnet-script](https://github.com/filipw/dotnet-script) installed you can run it just by copy/pasting the following command in your terminal: `dotnet script http://tinyurl.com/y5vvv2nm`.

Using Handlebars.Net is pretty simple and quite powerful; and it runs fine on Xamarin too 👌.

---
So now you have 2 solutions to do HTML templating in Xamarin, choose the one you like the best.