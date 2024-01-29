Title: Week 4, 2024 - Tips I learned this week
Lead: Some tips about Azure and Azure DevOps.
Published: 29/01/2024
Image: /images/surface_1.jpg
Tags:
  - tips learned this week
  - Azure Functions
  - FinOps
  - Azure DevOps
ImageAttribution: Picture of <a href="https://unsplash.com/fr/@surface?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Surface</a> on <a href="https://unsplash.com/fr/photos/appareil-surface-sur-la-table-taHYzvApW1o?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---

## Easily debug a non-HTTP-triggered Azure Function

The other day, I wanted to locally debug a Queue-triggered function without manually adding a queue message to my local storage.

My Azure Function looked like that:

```csharp
public record Order(string Product,int Count);

public class ProcessOrder
{
    private readonly ILogger<ProcessOrder> _logger;

    public ProcessOrder(ILogger<ProcessOrder> logger)
    {
        _logger = logger;
    }

    [Function(nameof(ProcessOrder))]
    public void Run([QueueTrigger("orders")] Order sentOrder)
    {
        _logger.LogInformation($"Order contains {sentOrder.Count} {sentOrder.Product}");
    }
}
```

To trigger it, I could simply add a message in the order queue of my [storage emulator](https://github.com/Azure/Azurite) like this:

<img src="/posts/images/w042024tips_storage.webp" class="img-fluid centered-img" alt="Queue message in Azure Storage Explorer.">

You may notice that I don't even have to go to the Azure Storage Explorer to add the message, I can do it directly in the IDE. However, call me lazy but I wanted to execute the function just by making an HTTP call, like we do for HTTP-triggered functions.

This way, I could write the HTTP request in an HTTP file, commit it, and push it to my repository to share it with my colleagues, so they don't have to guess what message they should put in the queue to trigger the function.

Fortunately, the [**documentation** explains](https://learn.microsoft.com/en-us/azure/azure-functions/functions-manually-run-non-http?tabs=azure-portal#define-the-request-location) how to do this.

<img src="/posts/images/w042024tips_function.webp" class="img-fluid centered-img" alt="Define the request location: host name + folder path + function name.">

Thus, for my use case, the resulting request is as follows:

```http
POST http://localhost:7071/admin/functions/ProcessOrder HTTP/1.1
Content-Type: application/json

{
  "input": "{\n  \"product\": \"laptop\",\n  \"count\": 3\n}"
}
```

The content of your queue message goes in the value of the key "input" and **must be escaped**.

> 🚧 If like me, you skim through the documentation, you might miss the "escape" requirement and your request will fail so be sure to properly escape your content.

## The Azure DevOps tip you did not know about: Azure Pipelines tasks name conflicts

I recently discovered that when you install extensions from the Azure DevOps marketplace, several Azure Pipelines tasks can have the same name. And if you use that name in your pipelines, Azure Pipelines won't know which task you are referring to and will prevent your pipeline from running.

This can easily occur if you install multiple extensions for Terraform in your Azure DevOps organization. For instance, the extensions [Azure Pipelines Terraform Tasks](https://marketplace.visualstudio.com/items?itemName=JasonBJohnson.azure-pipelines-tasks-terraform) from Jason Johnson and [Terraform](https://marketplace.visualstudio.com/items?itemName=ms-devlabs.custom-terraform-tasks) from Microsoft Dev Labs both have a task named the same way: `TerraformInstaller`.

To avoid these conflicts, you must use the full name of the tasks in your pipelines. You can find their full names in the GitHub repository of the extensions. Another way is to use these tasks in a test Release and click on the "View YAML" button to see the full name of the task you added.

<img src="/posts/images/w042024tips_ado_release.webp" class="img-fluid centered-img" alt="Screenshot of a release in Azure DevOps.">

## Using metrics to understand your usage of Azure resources

I don't often use all my monthly free credits of my Azure subscription, but this month my spending limit was quickly reached and my subscription was disabled!

The cost analysis tab of my subscription showed me that an Azure Maps Account resource was responsible for consuming most of my credits but didn't provide more details.

So, I went to the Metrics tab of my resource and discovered that I could split the Usage metric by API name to determine exactly which Azure Maps API was heavily used by my applications. Combined with the [pricing page](https://azure.microsoft.com/en-us/pricing/details/azure-maps/), I can deduce which API requests I'm making too frequently and, therefore how to optimize costs.

<img src="/posts/images/w042024tips_azuremaps_metrics.webp" class="img-fluid centered-img" alt="Azure Maps usage metrics by API name.">

Depending on the type of resource, you will use different metrics and split on different properties. Regardless, metrics can help you comprehend your resource usage and its associated cost.
  
And that's it for this week, happy learning!