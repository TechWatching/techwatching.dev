Title: Perform Dynamic Execution of an npm Package
Lead: pnpm dlx
Published: 18/05/2023
Image: /images/pnpm.png
Tags:
  - pnpm
  - package manager
  - tooling
Canonical: https://bordeauxcoders.com/perform-dynamic-execution-of-an-npm-package
---
Sometimes, all you want to do is grab an npm package and execute a command with it, without having to install it (whether globally or as a dependency).

That's what you can do with [`pnpm dlx`](https://pnpm.io/cli/dlx).

## An example

```bash
pnpm dlx vercel deploy
```

This example shows how to use the [vercel CLI package](https://vercel.com/docs/cli) without having to install it thanks to `pnpm dlx`.

In this example, pnpm downloads the vercel package, and executes it with the command `deploy` (that deploys a project to the Vercel platform).

## Some use cases

- You don't want to install globally a package because you only need to execute its binary script once
    
- You don't want a package to be a dev dependency of your project, or you are not using it in the context of a Node project
    
- You need to execute a CLI package command from a CI pipeline
    
- You want to ensure you use the latest version of a package (useful for starter kits like `create-vite`, or `create-vue`)
    

## Good to know

For starter kits, you can use [`pnpm create`](https://pnpm.io/cli/create) instead of `pnpm dlx`. For instance, executing `pnpm create vue` is equivalent to executing `pnpm dlx create-vue`.