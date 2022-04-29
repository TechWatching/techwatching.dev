Title: Why will I choose Pulumi over Terraform for my next project?
Lead: My take on choosing an Infrastructure as solution
Published: 29/04/2022
Image: /images/clouds_1.jpg
Tags:
  - IaC
  - Pulumi
  - Terraform
  - DevOps
---
In today's world of cloud-first applications, multi-cloud/hybrid cloud companies, and complex infrastructures, using infrastructure as code is essential. In recent years, Terraform has become one of the most popular IaC solutions, but its challenger Pulumi is quickly gaining traction. In this article, I will tell you why I think Pulumi is better and why I will choose it over Terraform for my next project.

But first, let's talk about what makes a good Infrastructure as Code solution.

## What makes a good Infrastructure as Code solution?

There is no universal answer to this question, but I can give you the characteristics I am looking for in an IaC solution. 

In my opinion, an IaC solution should be:
- **declarative**. I think it is important to focus on what infrastructure we want to provision rather than how to provision it
- **open source**. Beyond being a good thing, open source favors the adoption of technology and makes an ecosystem healthy with contributions from the community
- **multi providers**. Even if I work mainly with Azure, companies tend to be multi clouds; projects often involve provisioning resources in different cloud providers and services. Moreover, beyond cloud providers, I want to be able to automate the provisioning of many things like my Azure DevOps or GitHub projects.
- **easy to learn, easy to use, and easy to be productive with**. I love learning new things but even more when it's easy and I can be quickly productive with new technology.
- **up to date with main cloud providers' resources and features**. IT (and specifically the cloud) is evolving very quickly. The infrastructure we provision needs to be able to benefit from the latest resources, innovations, security improvements... I don't want to have to wait for novelties to be available
- **flexible and customizable**. Cloud infrastructures are more and more complex, and each project has its specificities so flexibility and the ability to easily write custom code to address these specificities are important 
- **secure**. Security in IT is of paramount importance (especially when dealing with infrastructure) and therefore should be built-in

<img src="/posts/images/pulumivstf_cloud_1.jpg" class="img-fluid centered-img">

Terraform and Pulumi have many similarities and some of the characteristics (like being declarative, open source, or multi providers) I mentioned above are present in both solutions. However, that is not the case with all these characteristics. Furthermore, Terraform and Pulumi differ in many other aspects that we will talk about in this article.

## Pulumi, a modern IaC tool with many built-in features

Usually, tools that have been there for quite some time have more features than new tools. New tools bring modernity and innovative features but need a bit of time to catch up with all the features. This is not at all the case with Pulumi, it is even the opposite. Although Terraform is older (created in 2014 vs. 2018 for Pulumi), Pulumi has more built-in features (including key features) than Terraform. Moreover, some of Terraform features are restricted to its paid version Terraform Cloud 💸.

### State, backends, and security

Both Terraform and Pulumi use code (HCL and programming languages respectively) to describe the desired state of an infrastructure that is compared to the current state of the infrastructure to know which operations (create, update, delete) to do on resources. The current state of the infrastructure is stored in a "backend" than can be for instance the local filesystem, AWS S3, Google Cloud Storage, Azure Blob Storage, or the SaaS offering of Terraform (Terraform Cloud)/Pulumi (Pulumi Service). [Terraform Cloud](https://cloud.hashicorp.com/products/terraform) and [Pulumi Service](https://www.pulumi.com/docs/intro/pulumi-service/) are self-managed backends that offer similar functionalities (deployment history, collaboration functionalities, RBAC for an organization...).

The state stored in a backend contains sensitive data (secrets like connection strings 🔑) that you need to secure. Whatever the backend you choose, **when using Pulumi the secrets in your state are always encrypted** using an encryption provider. The default encryption provider depends on the backend but you can easily configure Pulumi to specify another encryption provider to use. The encryption provider can be a passphrase, AWS Key Management Service, Azure Key Vault, Google Cloud Key Management Service, HashiCorp Vault Transit Secrets Engine, or Pulumi Service. The ability to choose an encryption provider and to encrypt secrets in the state is not something Terraform supports. By default, Terraform will store the state in a local JSON file with the secrets in it 🙀. You probably won't run into security issues if you use Terraform Cloud, yet **security should be built-in and not something you have to pay for**.

<img src="/posts/images/pulumivstf_security_1.jpg" class="img-fluid centered-img">

You may not see this as a big concern as you are probably not storing your state locally but on a cloud storage (like an Azure Blob Storage) where access is restricted to only a few people. But let's imagine one of your storage access keys gets compromised. If you are using Terraform, someone could have access to all the secrets of your infrastructure. If you are using Pulumi he will not because all secrets in the state file are encrypted. And he will have trouble decrypting them because he would have to gain access to the encryption provider. Whether you use Azure Key Vault, AWS Key Management Service, or any other encryption provider, these are components whose purpose is to keep data safe 🔐, and that require proper permissions to have access to encryption/decryption keys. I am not saying you can't make your infrastructure safe with Terraform. (In my example above with an Azure Storage Account, you could always prevent the [shared key authorization](https://docs.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent?tabs=portal) and use only Azure AD authorization to reduce the security risk.) I am just saying that **Pulumi is secure by default, Terraform is not** and extra work is required. 

> If you want to learn more about state, backend, security, and how Terraform handles state compared to Pulumi you can check this [article](https://www.techwatching.dev/posts/pulumi-azure-backend) where I talk about all. I also show how to use Azure Blob Storage as the backend and Azure Key Vault as the encryption provider for my infrastructure.

### IaC brownfield development

Infrastructure as Code is not a new concept and before Terraform and Pulumi arrived, cloud providers' native solutions have been widely used to provision cloud infrastructure. Some infrastructures were also created manually. So today, there is a lot of existing infrastructure and most projects are not greenfield but brownfield projects. When choosing an IaC solution it is important to consider that and have the tools to integrate the existing infrastructure. 

<img src="/posts/images/pulumivstf_brownfield.jpg" class="img-fluid centered-img">

Both Terraform and Pulumi have an `import`  CLI command to import existing infrastructure. Currently, Terraform can only import one resource at a time and can only import it into the state without generating the corresponding configuration code. Pulumi supports bulk import operations (using a JSON file to specify the resources to import) and generates the corresponding infrastructure code to add. It may seem like anecdotal features but they become important when you have a lot of resources to import. 

>Besides, Microsoft has recently announced a new tool [Azure Terrafy](https://github.com/Azure/aztfy) to "quickly turn existing Azure infrastructure into Terraform HCL and import to Terraform state". I guess they did not want to wait for Terraform to have this feature built-in. This won't help you if you are using Terraform with AWS or GCP though.

Being able to import existing resources into Pulumi/Terraform is nice. However, for complex infrastructure, you will probably do it progressively or not at all if you want to keep some parts managed by other tools/teams. No matter the case, you will need your new infrastructure to coexist with the existing infrastructure not (yet) managed by Pulumi/Terraform. Both Terraform and Pulumi can reference existing infrastructure but Pulumi goes beyond that. First, it can reference other Pulumi stacks i.e Pulumi projects, which is especially useful when you are in a big organization or when your architecture is divided into microservices. Second, it can reference external states, i.e outputs from infrastructure created with other IaC tools than Pulumi. For instance, you could reference a Terraform state (whether it is a local `tfstate` or a remote state like a state in a Terraform Cloud workspace) or an AWS CloudFormation stack: you would get access to all the outputs of the corresponding provisioned infrastructure. That way, even if you have some existing infrastructure managed outside your Pulumi project, you can reference it and use it in your project without having to reference each resource with hard-coded names.

If you have already spent time building a complex infrastructure with another IaC tool and want to migrate to Pulumi while preserving the organization of your code and without rewriting everything with Pulumi SDKs from scratch, Pulumi has some [conversion tools](https://www.pulumi.com/docs/converters/) to help you with that. For instance, you can use the [arm2pulumi](https://www.pulumi.com/arm2pulumi/) converter to convert your ARM templates to Pulumi code written in your preferred programming language. You can try it yourself on the website to see what it looks like.

<img src="/posts/images/pulumivstf_converter_1.png" class="img-fluid centered-img">

I like how Pulumi has been designed to work with brownfield projects: it offers all that is needed to coexist with existing infrastructure, adopting it, and converting it to Pulumi code if desired. It goes far beyond the built-in capabilities of Terraform on the topic.

> Pulumi has a very [well-written documentation](https://www.pulumi.com/docs/guides/adopting/) about "adopting Pulumi" if you want to deep dive into working with existing infrastructure.

### Environments and configuration

Thanks to its concept of [stack](https://www.pulumi.com/docs/intro/concepts/stack/), Pulumi has built-in support for deploying the same infrastructure in multiple environments. You can use configuration files to have different settings depending on the environment. For example, if you have a development environment and a production environment that need to have different sizes of VMs to avoid paying too much for the development environment, you will have 2 configuration files: `Pulumi.development.yaml` and a `Pulumi.production.yaml`. These files will contain the same setting to specify the size of the VM with different values. This concept of having a configuration file by environment is quite similar to what you would use when developing an application. In addition to that, you can use the Pulumi CLI to set settings as secrets that will be encrypted in your configuration files (using the same encryption provider that encrypts your state). So Pulumi offers you everything you need to easily and safely provision infrastructure in different environments.

<img src="/posts/images/pulumivstf_configuration_1.png" class="img-fluid centered-img">

Of course, Terraform can also provision infrastructure in different environments. Having different folders for the different environments used to be the way of handling different environments in Terraform which meant a lot of code duplication (unfortunately some companies still do that today😕). Because of that and other deficiencies of Terraform, different Terraform wrappers and frameworks (like [Terragrunt](https://terragrunt.gruntwork.io/) or [Terraspace](https://terraspace.cloud/)) were created by the community to keep the infrastructure code DRY and structured.

> If you want to know the differences between Terraform, Terragrunt, and Terraspace, BlogOps (the creator of Terraspace) has an interesting article on the [topic](https://blog.boltops.com/2020/09/28/terraform-vs-terragrunt-vs-terraspace/).

In 2017, Terraform also introduced its built-in way of managing different environments with [Terraform workspaces](https://www.terraform.io/language/state/workspaces). I think it's great to have different alternatives, but the drawback is to have the Terraform community divided between people that are using pure Terraform and people using other tools built on top of Terraform. Moreover, whatever the tool used I find managing environments and configuration a bit more complicated in Terraform than when you use Pulumi: a lot of documentation and blog posts to read before knowing how to manage environments the proper way.

One important downside of Terraform concerning environments and configuration is that there is no built-in way of managing secrets. Unless you are a Terraform Cloud customer (in which case your secrets will be stored in workspaces as sensitive variables), you have to find a custom way to keep the secrets in your configuration safe. [Gruntwork](https://gruntwork.io/), the company behind Terragrunt has a [detailed article](https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1) about managing secrets in Terraform that I suggest you read. It describes different techniques to keep secrets safe (so not hardcoded in plain text in Terraform code): using environment variables, encrypted files, or a secret store. As you can read in the conclusion of this article (and see in the screenshot of this article below), all these options have trade-offs and require extra work in comparison to Pulumi where secrets encryption is integrated. Moreover, even if you succeed in managing secrets properly in Terraform, they will end up in plain text in Terraform state as we previously mentioned.

<img src="/posts/images/pulumivstf_security_2.png" class="img-fluid centered-img">

### Embedded IaC through an API

To provision infrastructure using Terraform or Pulumi, you can use their respective CLI.

If you are using Terraform Cloud, you can also perform Terraform runs (called [remote operations](https://www.terraform.io/cloud-docs/run#terraform-runs-and-remote-operations) in the documentation which are concepts specific to Terraform Cloud) from there by using an API, UI controls or webhooks of your Version Control System (GitHub, GitLab, BitBucket, Azure DevOps, ...). These are useful capabilities but once again these are only available if you are using Terraform SaaS product.

Now, there are use cases where you would want to provision infrastructure programmatically instead of using a CLI. It can be for instance to:
- provide self-service infrastructure to development teams in your organization (through [developer portals](https://www.pulumi.com/blog/organizational-patterns-developer-portal/) for example)
- integrate provisioning of infrastructure into your platforms and tools (whether it is your custom framework, CLI, or CI/CD workflow)
- automate infrastructure provisioning for your custom needs
- do complex deployments that mix infrastructure and application code such as database migrations

And for that, Pulumi has an [Automation API](https://www.pulumi.com/automation/) which allows you to build, deploy, and manage infrastructure dynamically from your code thanks to an SDK instead of a CLI. I think it's awesome and unfortunately Terraform does not offer something like that. There would be much to say about Automation API (and that's something that will probably continue to evolve), yet the best is that you check the [documentation](https://www.pulumi.com/docs/guides/automation-api/) to learn more about it.

<img src="/posts/images/pulumivstf_automationapi.png" class="img-fluid centered-img">

### What else?

Pulumi has many more built-in features where it stands out compared to Terraform but I can't cover everything in this blog post. The ones I previously talked about were the main ones in my opinion but you can check the [Pulumi vs. Terraform page](https://www.pulumi.com/docs/intro/vs/terraform/) in Pulumi's documentation to read about other differences between Pulumi and Terraform. Other interesting capabilities of Pulumi like dynamic providers or testing will be discussed later in this article.

## Providers

### Why providers?

Providers are the reason why I think Terraform and Pulumi have a great future ahead. Instead of focusing on a specific cloud or platform (which is what Cloud Formation, Azure Bicep, or Google Cloud Deployment Manager do), Terraform and Pulumi allow you to provision resources in many different cloud providers and SaaS providers. That does not mean you will write the same infrastructure code to provision cloud resources on AWS and Azure. Of course not, each cloud provider has its specificities and the resources will be different on each platform so the code needs to be different as well. However, instead of having to use multiple IaC platforms (Cloud Formation and Azure Bicep for instance) if you need to provision resources from different clouds in your project, you will only use one (Terraform or Pulumi) with different providers. 

You can see how this works in Pulumi on this schema from the documentation:
<img src="/posts/images/pulumivstf_architecture.png" class="img-fluid centered-img">

Today lots of companies are using multiple clouds to meet their needs and to avoid putting all their eggs in the same basket. And beyond cloud providers, a lot of other SaaS products are used in an organization and you will probably automate the provisioning of resources for these products too to make them available to your teams (whether it is a VCS or a monitoring platform). So being able to provision and manage all these resources from the same tools, using the same concepts and processes is a must-have, and that is what Pulumi and Terraform offer by supporting many providers 👍.

### How does Pulumi benefit from Terraform ecosystem?

When Pulumi came out in 2018, instead of reinventing the wheel they choose to take advantage of Terraform Providers' mature ecosystem to build most of their own providers. Indeed, Pulumi created tools to adapt/bridge any existing Terraform provider.

<img src="/posts/images/pulumivstf_bridge.png" class="img-fluid centered-img">

To understand what it means, we have to talk about what is exactly a provider. According to Terraform's documentation, "providers are a logical abstraction of an upstream API. They are responsible for understanding API interactions and exposing resources". That means a provider defines a schema describing the resources available on a cloud provider API, and all the mappings (parameters, models, responses ...) needed to interact with this API. Instead of doing the same job of mapping everything, a Pulumi provider that is created by "bridging" a Terraform provider simply reuses the same schema, that's it. But, Pulumi itself does not use Terraform, they have a completely different engine.

> If you are looking for a better explanation about how Pulumi "bridges" Terraform providers you can look at this [article](https://www.leebriggs.co.uk/blog/2021/11/06/pulumi-faqs.html#doesnt-pulumi-use-terraform-under-the-hood-) from Lee Briggs who work at Pulumi.

Why do I talk about all this? It's because I think it's great for Pulumi to be able to benefit from Terraform Providers ecosystem. Thanks to this, like Terraform, Pulumi supports lots of cloud providers and modern cloud SaaS offerings. And in the event there were a provider available in Terraform and not in Pulumi, it would always be possible for anyone to create a Pulumi provider out of this Terraform provider thanks to the [Pulumi Terraform Bridge](https://github.com/pulumi/pulumi-terraform-bridge).

By the way, the fact that some Pulumi providers are created by adapting Terraform providers is completely assumed by Pulumi as you can read in [Pulumi documentation](https://www.pulumi.com/docs/intro/vs/terraform/#providers-terraform).

<img src="/posts/images/pulumivstf_providers_1.png" class="img-fluid centered-img">

### The problem with Terraform providers

We have seen that Pulumi benefits from Terraform providers ecosystem. However, there is a major problem with Terraform providers (and so with corresponding Pulumi providers as well): they are implemented manually.

It has the following inconveniences for a provider:
- it is more likely to contain bugs
- it doesn't have full coverage of its corresponding API
- it is always a little behind an API because it takes time for new resources or new features to be added

At the beginning of the article I explain that I wanted my IaC solution should be *up to date with main cloud providers' resources and features* and that is not the case with Terraform providers even if the community (Pulumi included) is doing a great job at contributing to Terraform providers to make new resources available.

<img src="/posts/images/pulumivstf_clocks.jpg" class="img-fluid centered-img">

Moreover, a version of a provider matches a version of the resources in the API. So you can't have 2 resources from different API versions coexist. For instance, let's say you need to use an old version of the Terraform provider for Azure because they are a lot of breaking changes in the latest version of the provider. You don't want to handle these changes yet as it involves some big changes in some of your resources. But in the same time, you want to use a resource that is only available in the latest version of the provider. Well in this case it's going to be complicated for you. The issue is that with Terraform providers you can't be very flexible with your resources and customize everything you want

### What are  Pulumi native providers?

In order to solve the problem described in the previous section, Pulumi introduced the concept of [native providers](https://www.pulumi.com/blog/pulumiup-native-providers/) for the providers Microsoft Azure, AWS, Google Cloud Platform, and Kubernetes. These providers are automatically built every day from the cloud providers' APIs 🎉. It has the following advantages:
- 100% API coverage, so all resources available including the ones in preview
- Providers are always up-to-date with the APIs 
- Access to all the versions of the APIs so that resources from different API versions can coexist in a project (as you would have with a cloud provider native solution like Azure Bicep)

**Honestly, these are good enough reasons to choose Pulumi over Terraform. If you are developing cloud applications, you don't want to be limited to what you can do by your IaC solution, especially when it concerns the major cloud providers you are probably using**

> It's worth noting that people from Microsoft seem also concerned about these limitations of the Terraform Azure RM provider as they announced a new Azure provider [AzAPI](https://techcommunity.microsoft.com/t5/azure-tools-blog/announcing-azure-terrafy-and-azapi-terraform-provider-previews/ba-p/3270937), built on top of the Azure ARM APIs that can be used to have access to Azure features and services in preview. However, it seems that for other resources, Microsoft expects people to continue using the existing Terraform provider with its limitations.

I think generating the providers from the APIs is the right way of doing things. Unfortunately, it's only possible to create native providers for a cloud provider or a SaaS provider if its API exposes the necessary mapping. But if more APIs do that, more Pulumi native providers will probably be added in the future.

<img src="/posts/images/pulumivstf_providers_2.png" class="img-fluid centered-img">

Another I appreciate a lot with these native providers:  you work with the same "models" as the ones of the corresponding cloud. On the contrary, because a Terraform provider is hand-coded you will have a more or less thin abstraction layer and potential differences between the models. That's not a big deal but can sometimes complicate things because you have to understand how the Terraform models map to the cloud API models.

###  More about providers

If you have looked at [Terraform registry](https://registry.terraform.io/browse/providers), you may have seen that there is a huge amount of community providers. Does it mean Terraform is better than Pulumi? I don't think so: quantity does not mean quality.  That's not me saying that there are many bad quality Terraform providers, not at all. That's me saying that there are probably lots of providers you don't care about. For instance, I assume you don't care that there is a Terraform provider to order a Domino's Pizza 🍕. Okay, that may be fun, but that's it. And concerning the more serious providers, a lot of them are just there to overcome the inherent limitations of HCL (not being a programming language) such as not being able to make an HTTP call without using a provider. You don't have these limitations with Pulumi where you use programming languages and their libraries.

<img src="/posts/images/pulumivstf_tools_1.jpg" class="img-fluid centered-img">

We will talk more about that in the next section but being able to use a programming language and all its ecosystem is a true advantage of Pulumi over Terraform. There are some times when you need to provision some cloud resources and there is no provider to manage them (whether it be Pulumi or Terraform). If you are using Terraform you will have to wait for the community to implement this provider, if it ever really happens. If you are using Pulumi, you are using programming languages and therefore can implement anything you need (by using SDKs or making the API calls yourself). And I am not talking about implementing yourself a whole provider covering a complete API (which would require some time), but just implementing the resources you need.

For that, Pulumi has a concept of [Dynamic Providers](https://www.pulumi.com/docs/intro/concepts/resources/dynamic-providers/) with which you implement the different CRUD operations for a resource so that you are still doing declarative infrastructure as code but with custom logic. It's like implementing on the fly a custom provider specific to your needs directly in your project. Dynamic providers' usage is not limited to supporting a cloud provider that does not yet exist in Pulumi, it is also to do any infrastructure task that no existing provider can help deliver (see examples in this [article](https://www.pulumi.com/blog/dynamic-providers/#sample-use-cases)).

## Using programming languages: the best way to do IaC

Pulumi's approach is to use programming languages to write your infrastructure code. On the opposite, Terraform's approach is to uses a DSL called HCL (that stands for Hashicorp Configuration Language). It's worth reminding that both tools are declarative, even when using an imperative language.

When comparing IaC, the big debate ⚡ is often: show we use Domain Specific Languages (DSL) or programming languages? If you have read the previous sections of this article you know this is just one of many questions, there are other important aspects to consider. Nevertheless, it's an important question because there is more to it than simply a question of personal preference. In my opinion, using programming languages to write your infrastructure code is the right way of doing things and is the future of infrastructure as code. Let me explain to you why and how it is particularly great to use programming languages with Pulumi.

### Better aligned with the DevOps culture

DevOps aims at continuously delivering value to end-users by removing the barrier between software development and IT operations. As one of the practices of DevOps, Infrastructure as Code should help bring closer people from Development teams and people from Operations teams.

Therefore I don't think using different languages, tools, and practices for the application development and the infrastructure development is the right approach. And yet, this is what you do when you write your infrastructure code in HCL while the application code is written in TypeScript or C# for instance. Unfortunately, in some companies, I think using Terraform reinforces the Development and Operations silos more than anything else. It's difficult to deliver value to a customer if that means for a developer to create a ticket to the Operations team just to add a new setting in a web app because only them have access and knowledge of the Terraform code 😿.

<img src="/posts/images/pulumivstf_together.jpg" class="img-fluid centered-img">

I truly believe that the proper way of adopting DevOps practices is to have multidisciplinary self-organizing teams. And what a better way to make software developers, IT operations people, security engineers, ... collaborate in such teams than by making them "speak" the same language, use the same tools, and adopt the same engineering practices. That's what using programming languages for the infrastructure code is about and that's what Pulumi is about.

Passage from the phoenix project (devs and ops together)

### Be productive faster and more

Whatever the IaC solution you choose, you will have to learn new concepts that may not be obvious. Yet, writing the infrastructure code will be easy to learn if you are using a programming language you already know. On the contrary, if you use a DSL, it will add another thing for you to learn (especially HCL that I don't find very intuitive).

Using Pulumi you will not only be able to use the programming language you know but also your favorite IDEs, as well as the libraries and the tools you are familiar with 🛠️. The programming languages supported by Pulumi (TypeScript/JavaScript, Python, Go, .NET languages and probably more to come) are used by lots of people for software development. Therefore IDE support (typing, static analysis, code completion....) is already great and tooling in general better than the tooling for an IaC DSL could ever be.

<img src="/posts/images/pulumivstf_eveyonecancode.jpg" class="img-fluid centered-img">

So in addition to learning faster IaC using programming languages you will be more productive too. That is also true for people not coming from development but from ops, they probably already have some scripting knowledge (Bash, PowerShell, Python...), that's why programming languages can be a good fit for them as well.

Making people quickly productive on an IaC solution is important because as everywhere in IT, in IaC field it's hard to find skilled people to recruit so it's sometimes easier to train people already in your company. Speaking of that, I hear sometimes people saying that: as Terraform is currently more used than Pulumi (due to Pulumi being more recent), it will be easier to hire people who know Terraform than people who know Pulumi. Yes, that's true, but it will be much harder to find people who know HCL than people who know TypeScript, Python, .NET, or Go.

> Independently of HCL, I find Terraform to be more complex to learn than Pulumi, with a lot of different concepts to grasp (variables, local values,  data sources, configuration, workspaces, modules) that are unique to Terraform. Pulumi felt much easier. Of course, learning is unique to each individual so you may have a different opinion but this has been my experience.

### A better developer experience

The developer experience is so much better when using programming languages instead of a DSL. 

> If you are not familiar with the term Developer Experience or DX, it's like User Experience but for software engineers using digital products (developer tools, IT solutions, platforms...).

I already talked about the better code completion of Pulumi which is great to know which resource you can create, what properties can be set, which ones are required, and what are the possible values.

There is also the fact that you can debug infrastructure code because it's just code in a program. With Automation API, Pulumi can be used from anywhere (a console application, a custom CLI, a web application, ...) and easily debugged. Good luck debugging Terraform code 😉. You even have something similar to hot reload for infrastructure with pulumi watch command (see [my article](https://www.techwatching.dev/posts/pulumi-watch) on the topic).

Another topic is testing. You can only do unit testing (understand the testing of components without deploying real infrastructure) with code written in a programming language. Pulumi allows you to write unit tests by mocking the external dependencies using your usual test and mock frameworks. Integration testing/end-to-end testing however can be done with both Pulumi and Terraform.  If you do a bit of search, you will find out that there are several frameworks to write end-to-end tests for Terraform and they require you to write your tests in Go or Ruby (so finally using a programming language after all 😀). You can read more about testing with Pulumi in the [documentation](https://www.pulumi.com/docs/guides/testing/).

### More capabilities

Using a programming language you are not limited to what providers or modules can do. You have the power of a programming language to implement what you need (for example using the dynamic providers I talked about before). Some people are afraid of that, I don't think they should. Programming languages have static analysis mechanisms to ensure best practices are respected in the code. Pulumi also provides policy as code to let you write the rules you want your infrastructure to follow (it could be rules about security or cost for instance).

Terraform has a great community that creates packages and tools for Terraform. As Pulumi is younger, the ecosystem is not as developed as Terraform's. However, when you use Pulumi you use programming languages that have a huge ecosystem from which you can benefit ❤️.

### The future

I have given several reasons why I think programming languages is the best way to do IaC. Today, the majority of people are using DSL based on YAML or JSON to write infrastructure code but things are changing at a great speed. Following the example of Pulumi, there are more and more IaC tools that support programming languages to write infrastructure code, [AWS CDK](https://aws.amazon.com/cdk/) for instance. Even Terraform itself is starting to see the limits of HCL and has launched its CDK in beta. Unfortunately it's still in preview since July 2020, has some limitations, and is not yet mature according to the [documentation](https://www.terraform.io/cdktf#project-maturity). Pulumi has a clear head start but it's very interesting to see the whole IaC ecosystem evolving in this direction.

## Final thoughts
### Summary

To sum up, I will choose Pulumi over Terraform for my next project because:
- it has 100% resource coverage of my cloud provider and more flexibility
- it allows me to be more productive using languages, tools, and libraries I am already familiar with
- it has more built-in functionalities and is more modern
- it is easier to learn and use (something that my teammates will appreciate)
- it is secure by default

<img src="/posts/images/pulumivstf_chess.jpg" class="img-fluid centered-img">

### Disclaimers

Just like any other article on my blog, "the opinions expressed herein are my own and do not represent those of my employer or any other third-party views in any way".

This article is not sponsored, I don't own any shares in Pulumi (unfortunately 😉), and I don't work for Pulumi. That means the article just reflects my point of view, the point of view of a cloud developer interested in infrastructure who has worked with both Terraform and Pulumi, and much prefers Pulumi.

Even if I like Pulumi a lot as it is very nice working with it, I have tried to remain as objective as possible in this article. You will probably not agree with everything I said, but I hope you will understand what are my reasons for choosing Pulumi for my Infrastructure as Code and that it will help you with your choice, whatever it is.

### Is Terraform bad?

Not at all. I would have a hard time saying Terraform is bad and Pulumi is awesome when they rely on similar concepts like declarative infrastructure as code, state file to store the current state of the infrastructure, and providers to support multiple cloud providers and services. In fact, I think Terraform is a great Infrastructure as Code solution, just not the best one in my opinion.  

I think Terraform has truly revolutionized infrastructure as code when it came out in 2014. At that time, cloud providers native solutions were too verbose and too complex, and there was no true alternative to them. Terraform came to simplify that and has enabled people to use the same IaC solution to deploy resources of different cloud providers. Today, things have changed: cloud providers' native solutions have evolved, there are new modern alternatives to Terraform (and I am not talking only about Pulumi), and Terraform has shown some limitations.

Because Terraform is used in many companies, benefits from a rich ecosystem, and has a great community, you will probably not make a big mistake if you go with Terraform instead of Pulumi for your next project. However, if you do so, you have to be aware of the limitations and weaknesses of Terraform that I talked about in this article. This is something very important because each project has its needs and constraints, so maybe Terraform's limitations are not a big deal for your use case, maybe it is. Just make sure which one it is.

Despite all I said, there is one thing I like very much about Terraform, it's its community. Because many people have been using it, and for some years now, there are a lot of examples on the internet and many interesting tools or frameworks have been created around it.

### Is Pulumi perfect?

No Pulumi is not perfect, no IaC solution is, there are always things to improve. 

For instance, a few Pulumi features are not yet available in .NET like Dynamic providers or policy as code (not a real problem as you can write them in TypeScript or Python even if your stack is in .NET).

I also hope more native providers will be created (even if I know it's not only up to Pulumi) because I think native providers are a game-changer. In particular, I would want to have a native provider for Microsoft Graph (you can vote for the issue [here](https://github.com/pulumi/pulumi/issues/8963)).

More generally, I think Infrastructure as Code is evolving quickly and there are many things yet to come. But I am confident Pulumi will continue to bring more features and innovations to this space 🚀.

### Which Infrastructure as Code solution should you choose?

To be honest, I can't think of any good reason why I would choose Terraform over Pulumi for a project. But that's just me.

If you have already invested a lot of time learning HCL/Terraform and are happy with it, you should probably continue using Terraform.

If you don't know either Terraform or Pulumi, I would suggest you use Pulumi even if you don't know any programming language. It's in my opinion the right way to do infrastructure as code. Furthermore, it is better to learn a programming language that could be useful somewhere else than HCL which you will only use in HashiCorp products.

I would like to emphasize one thing: **when choosing an IaC solution, make an informed decision.** Do not choose Terraform because your favorite influencer promotes it. Do not choose Terraform because most people around you use it. The same is true for Pulumi. Do not choose Pulumi just because I say you should. Read articles from people with other points of view. Check what topics are important for you, and compare both solutions on these topics. Make up your own mind.

In the end, you should choose the solution you feel is more appropriate to you and your project, and that you think will be easier for you to learn and use in the long term. If it's Terraform then go with it! If it's Pulumi, welcome to modern Infrastructure as Code!