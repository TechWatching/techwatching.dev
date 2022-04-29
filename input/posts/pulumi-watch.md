Title: IaC Hot Reload with Pulumi Watch
Lead: Hot-reloading your cloud infrastructure.
Published: 02/01/2022
Image: /images/cloud-lighthouse_1.jpg
Tags:
  - Pulumi
  - IaC
---

Do you like using hot reload when developing applications? How about using hot reload when developing the cloud infrastructure of an application? Keep reading because that's what we are going to talk about.

## Developing and deploying Cloud Infrastructure

When doing Infrastructure as Code for a cloud application we usually do the following steps:
1) we write the code describing the desired state of the infrastructure
2) we build this infrastructure code and compare the resulting desired state against the current state of the infrastructure
3) we deploy to the provisioned infrastructure the changes needed to achieve the desired state

When using Pulumi, you can run the [`pulumi preview`](https://www.pulumi.com/docs/reference/cli/pulumi_preview/) command for step 2 and the [`pulumi up`](https://www.pulumi.com/docs/reference/cli/pulumi_up/) command for step 3.

As its name suggests, the `pulumi preview` command only "preview" the updates that could be made to the infrastructure but does not apply them. To perform an update of the cloud infrastructure you have to use the `pulumi update` command which also does a preview of the changes, prompts the user to approve the changes to be made, and performs these changes. That is why, to be honest I don't bother with `pulumi preview`: most of the time I only use the `pulumi up` command (which means I do steps 2 and 3 in one row).

> 🗨 In case you wonder, if you already have run `pulumi preview` before running `pulumi up` you can skip the preview in the `up` command by using the `--skip-preview` option.

Of course, you can use these commands to automate the deployment of your cloud infrastructure using your favorite [CI/CD system](https://www.pulumi.com/docs/guides/continuous-delivery/).

## The need for a hot reload-like experience when doing IaC

All this is great but there are times when all you want is to quickly write your infrastructure code and check that you can successfully provision and configure the cloud resources you need. This can happen when you want to prototype something, test a new cloud resource, or simply when you are developing your infrastructure and want to verify your infrastructure code works. Usually, you are using a "sandbox" cloud environment for this, the same way you would use your local environment for debugging application code. At these moments, you don't care about CI/CD. You care about quickly experimenting with changes to your infrastructure, being productive, making changes in your code, and checking what it does, so you want to be able to quickly iterate to make your code work. Yet, this is not possible if each time you make a change to the code you have to manually run the `pulumi up` command, and approve the deployment.

> 🗨 You can use the `--yes` option to automatically approve the changes and directly perform the update when running the `pulumi up` command.

But guess what? Fast feedback when doing a code change is exactly what you want when developing an application. Indeed whether you are building an application or building infrastructure you are doing software development so you have the same needs and practices. And what do application developers have in their toolbox to be more productive when developing? They have "hot reload": while debugging locally an application, they can modify the source code, and changes made will be almost instantaneously reflected on the application. Wouldn't it be great if similarly you could make a change in your infrastructure code and have the provisioned infrastructure automatically updated? That is what the `pulumi watch` command is here for. 

## Using Pulumi Watch

[`pulumi watch`](https://www.pulumi.com/docs/reference/cli/pulumi_watch/) is a command currently in preview that watches for changes in the infrastructure code directory and continuously updates the cloud resources. 

But the best is to see by yourself. In the following example, you can see on the left of the screen a terminal opened with the `pulumi watch` command running, and on the right of the screen vscode opened with the code describing the currently provisioned Azure infrastructure for my project. Some lines to create a "Tweets" table in the storage account are commented. When I uncomment them and save the code file, you can see that pulumi detects it, builds the code, and deploys the changes so creates the table in that case.

<img src="/posts/images/pulumiwatch_terminal_1.gif" class="img-fluid centered-img">

I don't know what you think but I find this pretty cool: it's like hot reload for your infrastructure as code. Of course, you will probably not use `pulumi watch` all the time, but for quickly writing and testing your infrastructure code it can be very helpful.

As far as I know (don't hesitate to correct me in the comments if I am wrong), there is no such feature in Terraform and it's too bad because when you start using the `watch` command you don't want to do without it.
