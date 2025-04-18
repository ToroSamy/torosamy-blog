---
titleTemplate: Linux Markdown
---
# Git

## https - ssh
```bash
https://github.com/ToroSamy/TorosamyStorm.git
git@github.com:ToroSamy/TorosamyStorm.git
```

## 最佳实践
在git的最佳实践中 推荐每个人都是用一个独立的分支

## 各种参数

|命令|作用|
|-|:-:|
|git pull --rebase|拉去远端仓库的提交 将当前提交挂载在后面|
|```git add .```|暂存所有改动文件|
|```git commit -m "注释说明"```|提交并保存，产生版本快照|
|```git ls files```|查看**暂存区**有哪些文件|
|```git status -s```|查看文件状态|

## git的三个区域

|区域|作用|
|-|:-:|
|工作区|实际开发操作的文件夹|
|暂存区|保存之前的准备区域(暂存改动过的文件)|
|版本库|提交并保存暂存区的内容，产生一个版本快照|

|命令|作用|
|-|:-:|
|```git add 文件名```|暂存指定文件|
|```git add .```|暂存所有改动文件|
|```git commit -m "注释说明"```|提交并保存，产生版本快照|
|```git ls files```|查看**暂存区**有哪些文件|
|```git status -s```|查看文件状态|

## git文件状态

|状态|说明|
|-|:-:|
|未跟踪|新文件，从未被git管理过|
|已跟踪|git已知且管理的文件|

|文件状态|概念|场景|
|-|:-:|:-:|
|未跟踪(**U**)|从未被git管理过|新文件|
|新添加(**A**)|第一次被git暂存|git的版本记录中无此文件|
|未修改(**"**)|三个区域状态相同|提交保存后|
|已修改(**M**)|工作区内容变化|修改了内容产生的状态|

## 暂存区使用

暂时存储，可以临时恢复代码内容，与版本库解耦

|命令|作用|
|-|:-:|
|```git restore```|从**暂存区**覆盖文件到**工作区**|
|```git rm --cached```|目标文件，从暂存区移除文件|
|```git log```|查看提交记录详细信息|
|```git log --oneline```|查看提交到版本库的提交历史|

## git分支合并冲突
不同分支中对同一部分内容进行修改导致git无法干净合并，产生合并冲突
手动处理：当提交时ide会提示处理(git命令也会提示)


## Ubuntu22.04配置git
如果你还没有生成 SSH 密钥对，可以运行以下命令生成一个新的 SSH 密钥对：
```bash
ssh-keygen -t rsa -b 4096 -C "你的邮箱地址"
```
- -t rsa 指定密钥类型为 RSA。
- -b 4096 指定密钥长度为 4096 位。
- -C "你的邮箱地址" 是附加的注释，用于标识这个密钥。

系统会提示你输入保存密钥的文件路径，默认是 ~/.ssh/id_rsa。直接按回车使用默认路径。接下来，系统会提示你设置一个密码短语，可以设置一个密码短语来增加安全性，也可以直接按回车跳过。

生成密钥对后，运行以下命令复制 SSH 公钥的内容：
```bash
cat ~/.ssh/id_rsa.pub
```
这会在终端显示你的公钥。选择并复制整段公钥内容。

- 打开浏览器并登录你的 GitHub 账户
- 点击右上角的个人头像，选择 Settings
- 在左侧菜单中找到并点击 SSH and GPG keys
- 点击 New SSH key 按钮 粘贴复制的内容
- 在 Title 字段中随便输入一个名字
- 在 Key 字段中粘贴你刚才复制的公钥内容。
- 点击 Add SSH key 按钮保存密钥。

通过以下命令测试是否成功连接到 GitHub：
```bash
ssh -T git@github.com
```
如果配置正确，你会看到类似以下的信息：
```bash
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```
配置邮箱 记得把""去掉
```bash
git config --global user.email "你的邮箱"
```
配置用户名
```bash
git config --global user.name "你的用户名"
```



# Git 常用指令

## 配置
- `git config --global user.name "你的用户名"`  
  配置全局用户名。

- `git config --global user.email "你的邮箱"`  
  配置全局邮箱。

- `git config --list`  
  查看当前的 Git 配置信息。

## 创建与初始化
- `git init`  
  初始化一个新的 Git 仓库。

- `git clone <仓库地址>`  
  克隆一个远程仓库。

## 基本操作
- `git status`  
  查看当前仓库状态（工作区与暂存区差异）。

- `git add <文件名>`  
  将文件添加到暂存区。

- `git add .`  
  添加当前目录下的所有文件到暂存区。

- `git commit -m "提交信息"`  
  提交暂存区的文件到本地仓库。

- `git commit -am "提交信息"`  
  添加并提交已被跟踪的文件。

- `git log`  
  查看提交日志。

- `git log --oneline`  
  查看简洁的提交日志。

## 分支管理
- `git branch`  
  查看本地分支。

- `git branch <分支名>`  
  创建新分支。

- `git checkout <分支名>`  
  切换到指定分支。

- `git checkout -b <分支名>`  
  创建并切换到新分支。

- `git merge <分支名>`  
  合并指定分支到当前分支。

- `git branch -d <分支名>`  
  删除本地分支。

## 远程操作
- `git remote add origin <远程仓库地址>`  
  添加远程仓库。

- `git remote -v`  
  查看远程仓库地址。

- `git push origin <分支名>`  
  推送本地分支到远程仓库。

- `git pull origin <分支名>`  
  拉取远程仓库的更新。

- `git fetch`  
  获取远程仓库的更新但不合并。

## 恢复与撤销
- `git checkout -- <文件名>`  
  撤销工作区中的修改。

- `git reset HEAD <文件名>`  
  取消暂存区的文件。

- `git revert <提交ID>`  
  撤销某次提交，生成新的提交。

- `git reset --soft <提交ID>`  
  回退到某个版本，保留暂存区和工作区修改。

- `git reset --hard <提交ID>`  
  强制回退到某个版本，丢弃所有修改。

## 标签管理
- `git tag`  
  查看所有标签。

- `git tag <标签名>`  
  创建标签。

- `git tag -a <标签名> -m "标签说明"`  
  创建带说明的标签。

- `git push origin <标签名>`  
  推送标签到远程仓库。

- `git push origin --tags`  
  推送所有标签到远程仓库。

- `git tag -d <标签名>`  
  删除本地标签。

- `git push origin :refs/tags/<标签名>`  
  删除远程标签。

## 查看差异
- `git diff`  
  查看工作区与暂存区的差异。

- `git diff <分支名>`  
  比较当前分支与指定分支的差异。

- `git diff --staged`  
  查看暂存区与最新提交之间的差异。

## 其他
- `git stash`  
  保存当前未提交的修改。

- `git stash list`  
  查看保存的修改列表。

- `git stash apply`  
  恢复最近一次保存的修改。

- `git stash drop`  
  删除最近一次保存的修改。

- `git stash pop`  
  恢复最近一次保存的修改并删除该保存。

