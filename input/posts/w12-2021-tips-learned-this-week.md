Title: Week 12, 2021 - Tips I learned this week
Lead: Version in git tag with Azure Pipelines and in application insight logs.
Published: 26/03/2021
Image: /images/surface_1.jpg
Tags:
  - tips learned this week
  - git
  - Azure Pipelines
  - Application Insights
---

This week I learned a few things related to versioning an application 

# Create a git tag from an Azure Pipeline.

Creating a git tag for your repository stored in Azure DevOps can be done quite easily by creating a tag in your local repository and pushing it to Azure DevOps or by simply manually creating it from the `Tags` page in Azure DevOps. So why bother creating a tag from an Azure Pipeline?

Doing things manually is error-prone and takes time, so for repetitive tasks, it is a good idea to automate them. And Azure Pipelines are great at automating things especially when it is relative to building or deploying code. In my team what we wanted was to have our CI/CD pipeline compute in what version was the code we were building and automatically tag the commit built with that version.

Computing the version in an azure pipeline is not the topic here, so let's just say there are multiple ways to do that like using [variables and the counter expression](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/expressions?view=azure-devops#counter) or using the [gitversion task](https://marketplace.visualstudio.com/items?itemName=gittools.gittools).

Once you know the version you can use the git command line in a script task to create the tag and push it.
```yml
- script: |
    git tag $(VersionPreviouslyComputed)
    git push origin $(VersionPreviouslyComputed)
  displayName: Tag version
  workingDirectory: $(Build.SourcesDirectory)
```

For this script to work, you have to ensure that the identity that executes your pipeline has the right to push a tag on your repository. Concretely you have to give the `contribute` permission to the **user** named `Project Collection Build Service ({your organization})` as described [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/git-commands?view=azure-devops&tabs=yaml#grant-version-control-permissions-to-the-build-service).

Moreover, you need to add an extra checkout task at the beginning of your pipeline. By default, you don't have to add this task, pipelines automatically do a checkout. But in this case, you want to set to true the parameter `persistsCredentials` to reuse the same credentials used for the initial checkout in the following other git operations in your pipelines.

```yml
- checkout: self
  persistCredentials: true
```

If you are not using a Microsoft-hosted agent but your own on-premise agent, you can have a problem when you delete a tag that was created by a pipeline. Indeed tags in the local repository of an on-premise agent are not automatically fetched and pruned so your following build can fail if it tries to create a tag that still exists locally (even if does not on the remote repository). To avoid that you can do add following command in your script `git fetch origin refs/tags/*:refs/tags/* --prune`.

# Application version in logs in Application Insights

When developing applications in Azure, Application Insights is a key component to monitor these applications. But as for many components, we sometimes do not know how to use it to its full potential. 
This week a colleague told me about a very basic feature that I did not know about: logs in Application Insights contain the version of the application that sends the logs. Indeed there is a property `application_Version` in each log with the version number of the application.

<img src="/posts/images/w122021tips_ai_1.png" class="img-fluid centered-img">  

It might look not very interesting but it can be really useful to have that in order to filter logs to a specific version in Log Analytics queries.

One thing to note though is that by default Application Insights sets the `AssemblyVersion` in the `application_Version` property. So if you keep that by default, do not forget to set the `AssemblyVersion` with the correct version number when you build the application code. In Azure Pipelines it can be done like that:

```yml
- task: DotNetCoreCLI@2
  displayName: Build
  inputs:
    command: build
    arguments: -p:AssemblyVersion=$(VersionPreviouslyComputed)
```

And that's it for this week, happy learning!