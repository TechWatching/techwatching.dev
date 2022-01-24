Title: Week 14, 2021 - Tips I learned this week
Lead: Azure tenant in vs code and Azure IoT Hub vs code extension.
Published: 10/04/2021
Image: /images/surface_1.jpg
Tags:
  - tips learned this week
  - vscode
  - Azure IoT
  - Azure
---

This week I learned a few things related to vscode and especially about the `Azure IoT Hub` vscode extension.

# Accessing Azure resources in vscode from a specific tenant.

There are a lot of vscode extensions (like the ones in [this extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)) that allow you to access and manipulate your Azure resources from Visual Studio Code. 

This [specific extension `Azure Account`](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) makes it easy for you to sign in to your Azure account and select the subscription you want to use. But what if you are working in a consulting company that works for different companies? How do you indicate the tenant of the customer to sign in to? Well, the answer is quite simple, the extension exposes a setting in vscode to specify a specific tenant to use.

<img src="/posts/images/w142021tips_vscode_1.png" class="img-fluid centered-img">  

>📌 If you like to update the settings in JSON mode the key to use is `azure.tenant`

# Azure IoT Hub vs code extension is awesome.

I think everything is in the title. I knew about this extension before this week but I did not take the time to really use it. However this week it helped me a lot for my sprint demo where I needed to show new functionalities I implemented on an IoT backend: modify device twin tags in the IoT Hub and send some messages to an IoT device under certain conditions.

The Azure IoT Hub extension adds an `Azure IoT Hub` view in the Explorer where you can see the devices of the IoT Hub you selected and can do some actions on them.

<img src="/posts/images/w142021tips_vscode_2.png" class="img-fluid centered-img">  

There are also a lot of commands you can use to interact with an IoT Hub and its devices.

<img src="/posts/images/w142021tips_vscode_3.png" class="img-fluid centered-img">  

You can do pretty much anything you want from sending C2D / D2C messages to monitoring C2D / D2C messages. I found it quite nice to be able to directly visualize and edit a device twin as a JSON  document in vs code. 

<img src="/posts/images/w142021tips_vscode_4.png" class="img-fluid centered-img">  

To quickly test something related to IoT Hub, the Azure IoT Hub extension is a very useful tool. An interesting alternative to this tool is the [Azure IoT Explorer](https://github.com/Azure/azure-iot-explorer/releases) which is more user-friendly thanks to its simple UI but does not have all the features.

<img src="/posts/images/w142021tips_iotexplorer_1.png" class="img-fluid centered-img"> 

And that's it for this week, happy learning!