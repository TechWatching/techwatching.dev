Title: Git Cheat Sheet
Lead: Useful git commands 
---
You can find many nice git cheat sheets everywhere on the web, but let's just quote GitHub's [git cheat sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf) which provides you with most useful git commands. That is not my intent, I won't enumerate all basic commands everybody knows and uses everyday, but list some commands that I use less often and that I want to remind myself of, often because I can never remember their exact syntax.

I tried to organize git commands by situation where you can need them and I added the link to the official documentation.

### When you need to add a range of commits into your current branch history

- `git cherry-pick ebe6952^..905e379` 
    - pick all the commits from commit `ebe6952` to commit `905e379`
    - add them in your current branch
- [Doc](https://git-scm.com/docs/git-cherry-pick)

### When you messed up your repository with git commands like rebase and want to recover changes from a commit not in your history anymore
- `git reflog`
  - gives you an history of the references of your HEAD (current active branch)
  - allow you to see on which commit was your HEAD after each git command you did
  - once you have the commit hash you are interested in, you can see what changes were made in this commit or even reset the branch to this commit
- [Doc](https://git-scm.com/docs/git-reflog)

### Quickly change last commit

``` 
git add . //(to stage modifications to integrate to commit) 
git commit --amend
```
- `git commit --amend` will open your git editor to allow you to change the commit message
- [Doc](https://git-scm.com/docs/git-commit)

### When you are working in a feature branch and want to integrate the changes done by your colleagues in the main branch
```
git checkout dev
git pull
git checkout featurebranch
git rebase dev
git push --force
```
- This will rewrites your branch history, that is why the "--force" is needed (if you have already pushed your commits that have been rewritten)
- Check this [post](https://jeffkreeftmeijer.com/git-rebase/) to understand in a schema what happens when reintegrating changes from another branch
- [Doc](https://git-scm.com/docs/git-rebase)

As a colleague suggested me, if you don't need your local main branch to be up-to-date, you can win a few keystrokes and some time by replacing the above commands by the following commands:
```
git fetch origin
git rebase origin/dev
git push --force
```
It does the same thing than the previous set of commands, but just does not merge the changes of dev on your local dev branch. And as most of the time you don't need to and want to stay on your feature branch, that's easier and quicker to do it this way.

### When you want to have a clean commit history on your branch before creating your pull request
```
git rebase -i HEAD~3
```
- Opens up an editor to pick, reword, edit, squash or fixup your last 3 commits
- Check this [post](https://delicious-insights.com/en/posts/getting-solid-at-git-rebase-vs-merge/#cleaning-up-your-local-history-before-pushing) to deep dive into interactive rebase ... best git command ever ...
- [Doc](https://git-scm.com/docs/git-rebase)

### When you want to stash your local changes with a specific name you can easily find later
- `git stash save "myFriendlyStashName"` will save your local changes in a stash with the name "myFriendlyStashName"
- When you list all you current stash later with `git stash list`, you can easily find its number:
<img src="/images/gitcheatsheet/gitcheatsheet_console_1.png" class="img-fluid centered-img">

- Here we can see that the myFriendlyStashName is the first one and we can pop it with `git stash pop "stash@{0}"` or apply it with `git stash apply "stash@{0}"`
- [Doc](https://git-scm.com/docs/git-stash#Documentation/git-stash)

### When someone did a `git push --force` on the repository and you want to reset your local repository
```
git fetch
git reset origin/master --hard
```
- All your local changes will be erased, if you want to keep them use `--soft`
- See [this Stackoverflow post](https://stackoverflow.com/questions/9813816/git-pull-after-forced-update) for more information

### When you want to reset a file to its previous version
- `git reset HEAD^ filename`
- [Doc](https://git-scm.com/docs/git-reset)

### When you want to "remove" the last commit
- `git reset --soft HEAD~1`
- [Doc](https://git-scm.com/docs/git-reset)


### When you want to move an existing branch to another commit
- `git branch -f myBranch ebe6952`
- [Doc](https://git-scm.com/docs/git-branch)

### Update git when using Windows
```
git update-git-for-windows
```
- Sometimes, once Git is installed, we forget to update it
- Doing this command from time to time will allow you to benefit from git last version with new features and corrected issues

### Checkout a PR when using Azure Repos
```
git config --add remote.origin.fetch +refs/pull/*/merge:refs/remotes/origin/pr/*
git checkout pr/196 
```
- You only need to do the `git config` command once and each fetch will also fetch the PR
- You can then directly checkout the PR number you want to review
- If you use Visual Studio there is a much better way to review PR directly in your IDE by using the Microsoft Extension [Pull Requests for Visual Studio](https://marketplace.visualstudio.com/items?itemName=VSIDEVersionControlMSFT.pr4vs)

### When you want to trigger a CI pipeline you want to test without changing the code
Instead of adding a space to a file just to have something to commit to trigger a pipeline you are testing, just do :
```
git commit --allow-empty -m "improve ci"
```
[Doc](https://git-scm.com/docs/git-commit)

### Flag a bash script as executable when using Linux or WSL
```
git update-index --chmod=+x script.sh
```
- This command will make the script.sh file executable (can be useful when you need your CI like GitHub Actions to execute scripts in your repo)
- [Doc](https://git-scm.com/docs/git-update-index)

### When you want to reorganize you git repository
- Imagine you have created your code project at the root of your git repository and want to reorganize it to have a `src`,`build`, `docs` ... folders like suggested in this [.NET project structure](https://gist.github.com/davidfowl/ed7564297c61fe9ab814).
- You will want to create an src folder and move all your existing files to this `src` folder while keeping the files history.
- For this you can use the `git mv` command but you have to first remove or move your untracked files and folder (`csproj.user`, `bin/`, `obj/`) and to specify in the command not to move your `src` folder (using `!(src)`).
```
git mv ./!(src) src/
```
- [Doc](https://git-scm.com/docs/git-mv)

### When you are bored of writing git commands in your terminal
- If you are used to vs code and like it, if you are using vs code to write your code, or if you just want something more powerful than Visual Studio git integration :
    - Install the excellent [GitLens extension](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) for vs code

- If you prefer standalone git client, have a look at [Fork](https://git-fork.com/)

- Keep using git commands but enhance your terminal with tab completion and repository status in prompt by using
  - [Posh-Git](https://github.com/dahlbyk/posh-git) and [Oh-My-Posh](https://github.com/JanDeDobbeleer/oh-my-posh) when working in PowerShell (see more in [Scott Hanselman blog post](https://www.hanselman.com/blog/HowToMakeAPrettyPromptInWindowsTerminalWithPowerlineNerdFontsCascadiaCodeWSLAndOhmyposh.aspx))
  - [Oh my zsh](https://github.com/robbyrussell/oh-my-zsh) and its git plugin  when working in Bash (Ubuntu / WSL)