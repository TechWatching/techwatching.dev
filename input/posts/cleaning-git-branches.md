Title: Clean up your local git branches.
Lead: Playing with Nushell to create a useful git alias to delete unused local git branches.
Published: 06/04/2020
Image: /images/branches_1.jpg
Tags:
  - tooling
  - git
  - shell
  - nushell
---
When working on a git repository, I often have to manually delete old local branches that I don't use anymore. That's not a huge waste of time but still, that's something I have to do quite often so I decided to automate that.

## Why do I end up having outdated local branches on my git repositories?

First, let's talk about how I end up having many useless local git branches. That's something quite usual and directly linked with the way I work with git but chances are that you are having the same issue.

At work I am working in a small team of developers, we host our git repositories in [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/repos/) and we try to respect the following practices in our daily development:
- having a main branch (master) on which nobody can commit directly
- always create a short-lived branch (also called feature branch) when developing a new feature of the application
- only merge a feature branch on the main branch through an Azure DevOps pull request
  - the PR triggers a pipeline that ensures the code build correctly, follow some conventions (with a Sonar analysis for instance) and that unit tests pass
  - the PR can only be completed after a code review of at least one member of the team
  
These practices allow us to keep good quality in our code base, not to mess with our git repositories, and ensure the main branch always builds.

However, each week we are creating a lot of branches that need to be deleted as once merged we no longer need to have them. When a pull request is approved and we decide to complete it, Azure DevOps takes care of automatically merging the associated feature branch into master and deleting it from the repository. Once that's done, I can do a `git fetch --prune` on my laptop to have the feature branch removed from the remote of my local repository (by the way, I recommend you to directly set the fetch command to prune by default in your git config 👌). Nevertheless, this does not delete the local version of the feature branch thus our problem: over time if we do not think of deleting all these outdated branches, they become too many and we don't even know which branch should be kept or not.

## Git commands to identify and delete outdated branches.

As my outdated branches are already removed from my remote (thanks to `git fetch --prune`) it should not be too complicated to use some git commands to guess which branches are not useful anymore. But as it's Azure DevOps that took care of merging them (sometimes with a squash) I cannot use the `git branch --merged` command.

If I take my blog repository as an example I have a bunch of branches: some that could be useful (articles I have started to write but did not finish yet and I don't know if I will one day 😋) and some that are already merged into my master branch through a PR.

<img src="/posts/images/cleaningbranches_shell_1.png" class="img-fluid centered-img">

The command `git branch -vl` (which lists in a verbose way the local git branches) gives us an interesting view as it shows the branches for which the remote has been deleted specifying a `[gone]` for them. These branches correspond to the outdated branches we want to delete.

<img src="/posts/images/cleaningbranches_shell_2.png" class="img-fluid centered-img">

We know how to identify the outdated branches but we need a command to delete them which is the `git branch -D` command. Now we only need a script to associate the output and input of these two commands to automate the deletion.

You can find on Stackoverflow some posts like [this one](https://stackoverflow.com/questions/7726949/remove-tracking-branches-no-longer-on-remote) that show different solutions using bash that work perfectly but I thought it would be interesting to try to script that using another shell. Indeed I recently started to use a shell called [nushell](https://github.com/nushell/nushell) which is a pretty powerful yet simple cross-platform shell. It is still in preview at the time of writing but if you have not heard of it I suggest you read the [introduction post](https://www.jonathanturner.org/2019/08/introducing-nushell.html) of Jonathan Turner.

## Let's script that with nushell!

Enough of talking, let's script.
To start with, we can use the nu lines command to create a table from the lines of the `git branch -vl` output (we added an extra `*/*` argument as we are only interested in posts branches).

<img src="/posts/images/cleaningbranches_shell_3.png" class="img-fluid centered-img">

Then we can split the different lines into columns that we can name with the `split column` command. We use spaces to correctly split a line and the option `--collapse-empty` to remove the empty columns.

<img src="/posts/images/cleaningbranches_shell_4.png" class="img-fluid centered-img">

We then just have to filter the table to get only the lines with the Status `[gone]`.

<img src="/posts/images/cleaningbranches_shell_5.png" class="img-fluid centered-img">

And the final script:
```bash
git branch -vl '*/*' | lines | split column " " BranchName Hash Status --collapse-empty | where Status == '[gone]' | each { git branch -D $it.BranchName }
```

## Make it a git alias.

We can integrate this script into our git commands by creating a git alias. Let's say I want to create the alias `bcl` for branch clean up, we only need to add the following to our `.gitconfig`:

```git
[alias]
	bcl = !nu \"D:\\gitalias_bcl.nu\"
```

where `gitalias_bcl.nu` is the nu script file we created earlier (it's located here in the `D://` drive but can be created anywhere). 

Now we can simply do a `git bcl` to clean our outdated local git branches.

<img src="/posts/images/cleaningbranches_shell_6.png" class="img-fluid centered-img">

That's it, nothing revolutionary but that was the opportunity to automate the boring task of deleting outdated local branches while playing with nushell.