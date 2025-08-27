---
titleTemplate: Git
---
# Git

## VCS

在多人合作开发软件时，如果每个人都直接改同一份代码，很容易出现以下问题：
- 你改了文件，但同事也同时改了同一个文件，最后合并时会混乱。
- 想要回退到上周的版本，却发现文件早就被覆盖。
- 你写的新功能实验失败了，还得手动恢复到之前的版本。

为了解决这些麻烦，就需要一个版本控制系统 (Version Control System, VCS)

---

## Git诞生
Git 是 Linus Torvalds（Linux 之父）在 2005 年开发的。起因是 Linux 内核当时用的版本控制工具（BitKeeper）突然不免费了，而且商业授权限制了自由。

Linus 一气之下决定“自己写一个”，结果只花了 两周时间，Git 就诞生了。
结果 Git 不但很好用，还逐渐取代了 CVS、SVN 等老版本控制工具，成为事实上的行业标准。

---

## 安装 Git

### Windows
- 直接打开官网下载安装包 https://git-scm.com/download/win
- 推荐保持 `Git Bash`（提供类 Linux 的命令行环境）
- `Add Git to PATH` 会将git添加到环境变量, 就能在 CMD/PowerShell 里使用 git 命令

### Linux
大多数 Linux 发行版都自带 Git，如果没有，可以通过包管理器安装

::: details 点击查看示例的安装命令行
```bash
sudo apt install git
```
```bash
sudo dnf install git
```
```bash
sudo yum install git
```
```bash
sudo pacman -S git
```
:::

### macOS

可以通过 Homebrew 安装（推荐）
```bash
brew install git
```
也可以从官网 https://git-scm.com/download/mac 下载 DMG 安装包。

### 验证与配置
无论在哪个平台，安装完成后第一步建议配置用户名和邮箱（会出现在提交记录中）
```bash
git config --global user.name "你的名字" # 配置全局用户名
git config --global user.email "你的邮箱" # 配置全局邮箱
git config --list # 查看当前的 Git 配置信息。
```

---

## 托管平台

- Git 是一个版本控制系统 (VCS)，是一个软件，运行在你本地电脑上。
- 它帮你管理项目的历史版本、分支、合并等操作。
- 就算完全离线，你也能用 Git 正常开发、保存、回退版本。

而 `GitHub`、 `GitLab`、 `Gitee` 是代码托管平台。这些平台本质上是代码托管服务，让你把本地的 Git 仓库上传到远程服务器，方便多人协作。

类比：这些平台就像云端网盘，不过存的不是照片，而是代码；同时还加了协作、讨论、自动化工具。

---

## Github 配置 SSH

如果你还没有一对密钥, 可以[查看这里](../Cryptography/公钥密码学), 去生成一对密钥

之后根据以下步骤, 将生成密钥对中的公钥内容复制进 Github
- 打开浏览器并登录你的 GitHub 账户
- 点击右上角的个人头像，选择 Settings
- 在左侧菜单中找到并点击 SSH and GPG keys
- 点击 New SSH key 按钮 粘贴复制的内容
- 在 Title 字段中随便输入一个名字
- 在 Key 字段中粘贴你刚才复制的公钥内容。
- 点击 Add SSH key 按钮保存密钥。

这里建议根据 [OpenSSH](../Cryptography/OpenSSH) 里的内容对 `config文件` 进行类似如下的配置

```
Host github.com
    HostName github.com
    User git
    IdentityFile E:/DevTools/ssh/private
    IdentitiesOnly yes
    AddKeysToAgent yes
```

当完成所有工作之后, 通过以下命令测试是否成功连接到 GitHub：
```bash
ssh -T git@github.com
```
如果配置正确，你会看到类似以下的信息：
```bash
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 核心概念

在使用 Git 的过程中，有一些关键概念需要理解，它们共同构成了 Git 的工作方式。

### 工作区
工作区（Working Directory）是开发者日常编辑、修改代码的地方。所有文件的增删改查，都最先发生在工作区。

### 暂存区
暂存区（Staging Area / Index）是一个临时的缓冲区域。当使用 `git add` 命令时，修改会被放入暂存区，表示这些改动将会进入下一次提交。

### 本地仓库
使用 git commit 后，暂存区的内容会被永久记录到本地仓库（Local Repository）中，形成一次完整的版本快照。这个仓库位于项目根目录下的 .git 文件夹中。

### 远程仓库
远程仓库（Remote Repository）是存放在 GitHub、GitLab、Gitee 等平台上的仓库。团队成员可以通过 git push 将本地提交上传，或用 git pull 下载他人的更新，从而实现协作开发。

### 分支
Git 通过分支（Branch）实现并行开发。不同的功能或实验可以在各自的分支上进行，互不干扰。完成后再将分支合并回主分支，保证主分支的稳定性。

### .gitignore 文件
一个特殊的配置文件，用来告诉 Git 哪些文件或目录不需要纳入版本控制。常见的例子包括：日志文件、临时缓存、编译生成的二进制文件、操作系统自动生成的文件等。`.gitignore` 能让仓库保持整洁，只保存真正需要追踪的源代码。

---

## 最佳实践

TODO

---

## 常用命令行

### 创建与初始化
| 命令                                 | 作用                   |
| ---------------------------------- | -------------------- |
| `git init`                         | 初始化一个新的 Git 仓库。      |
| `git clone <仓库地址>`                 | 克隆一个远程仓库。            |


### 基础操作
| 命令                                 | 作用                   |
| ---------------------------------- | -------------------- |
| `git status`                       | 查看当前仓库状态（工作区与暂存区差异）。 |
| `git add <文件名>`                    | 将文件添加到暂存区。           |
| `git add .`                        | 添加当前目录下的所有文件到暂存区。    |
| `git commit -m "提交信息"`             | 提交暂存区的文件到本地仓库。       |
| `git commit -am "提交信息"`            | 添加并提交已被跟踪的文件。        |
| `git log`                          | 查看提交日志。              |
| `git log --oneline`                | 查看简洁的提交日志。           |


### 分支管理
| 命令                                 | 作用                   |
| ---------------------------------- | -------------------- |
| `git branch`                       | 查看本地分支。              |
| `git branch <分支名>`                 | 创建新分支。               |
| `git checkout <分支名>`               | 切换到指定分支。             |
| `git checkout -b <分支名>`            | 创建并切换到新分支。           |
| `git merge <分支名>`                  | 合并指定分支到当前分支。         |
| `git branch -d <分支名>`              | 删除本地分支。              |


## 远程操作
| 命令                                 | 作用                   |
| ---------------------------------- | -------------------- |
| `git remote add origin <远程仓库地址>`   | 添加远程仓库。              |
| `git remote -v`                    | 查看远程仓库地址。            |
| `git push origin <分支名>`            | 推送本地分支到远程仓库。         |
| `git pull origin <分支名>`            | 拉取远程仓库的更新。           |
| `git fetch`                        | 获取远程仓库的更新但不合并。       |

### 恢复与撤销
| 命令                                 | 作用                   |
| ---------------------------------- | -------------------- |
| `git checkout -- <文件名>`            | 撤销工作区中的修改。           |
| `git reset HEAD <文件名>`             | 取消暂存区的文件。            |
| `git revert <提交ID>`                | 撤销某次提交，生成新的提交。       |
| `git reset --soft <提交ID>`          | 回退到某个版本，保留暂存区和工作区修改。 |
| `git reset --hard <提交ID>`          | 强制回退到某个版本，丢弃所有修改。    |

### 标签管理
| 命令                                 | 作用                   |
| ---------------------------------- | -------------------- |
| `git tag`                          | 查看所有标签。              |
| `git tag <标签名>`                    | 创建标签。                |
| `git tag -a <标签名> -m "标签说明"`       | 创建带说明的标签。            |
| `git push origin <标签名>`            | 推送标签到远程仓库。           |
| `git push origin --tags`           | 推送所有标签到远程仓库。         |
| `git tag -d <标签名>`                 | 删除本地标签。              |
| `git push origin :refs/tags/<标签名>` | 删除远程标签。              |

### 查看差异
| 命令                                 | 作用                   |
| ---------------------------------- | -------------------- |
| `git diff`                         | 查看工作区与暂存区的差异。        |
| `git diff <分支名>`                   | 比较当前分支与指定分支的差异。      |
| `git diff --staged`                | 查看暂存区与最新提交之间的差异。     |

### 其他
| 命令                                 | 作用                   |
| ---------------------------------- | -------------------- |
| `git stash`                        | 保存当前未提交的修改。          |
| `git stash list`                   | 查看保存的修改列表。           |
| `git stash apply`                  | 恢复最近一次保存的修改。         |
| `git stash drop`                   | 删除最近一次保存的修改。         |
| `git stash pop`                    | 恢复最近一次保存的修改并删除该保存。   |

---

## 扩展概念

### 指针与引用
- **HEAD**：当前检出的“游标”；通常指向某个分支的最新提交。  
- **分离的 HEAD（Detached HEAD）**：HEAD 直接指向某个提交而非分支；此时新提交不会挂到任何分支上。  
- **跟踪分支（Tracking Branch）**：本地分支与远程分支的绑定关系，用于 `git pull/push` 的默认上游。  
- **上游/远程别名（upstream/origin）**：`origin` 是默认远程名；`upstream` 常指原始项目（配合 fork 使用）。  
- **标签（Tag）**：给特定提交打标记（如 `v1.0.0`），用于发布版本，位置固定不随历史移动。  
- **Reflog（引用日志）**：记录 HEAD/分支的移动历史，误操作时可据此找回提交。  
- **哈希（SHA-1/2）**：提交、树、对象的内容地址标识，保证完整性与可追溯。  

### 整合历史
- **合并（Merge）**：把两个分支历史汇合，可生成合并提交；能保留分叉的真实历史。  
- **快进合并（Fast-forward）**：当目标分支是源分支的祖先时，直接把指针“快进”，不产生合并提交。  
- **变基（Rebase）**：把一串提交“搬家”到新基点，使历史线性；便于阅读但需谨慎（避免重写公共历史）。  
- **拉取 vs 获取（Pull vs Fetch）**：`fetch` 只更新远程引用不合并；`pull` = `fetch` + 合并/变基。  
- **复位 vs 回滚（Reset vs Revert）**：`reset` 移动分支指针（可改历史）；`revert` 生成“反向提交”保留历史，适合公共分支。  
- **冲突（Merge Conflict）**：不同分支在同一位置的改动发生冲突，需要人工解决后再提交。  

### 协作与结构
- **克隆 vs 派生（Clone vs Fork）**：`clone` 把远程仓库复制到本地；`fork` 在平台上复制一份远程仓库用于独立开发。  
- **贮藏（Stash）**：临时把未提交改动存放起来，便于切分支或拉取更新，之后可恢复。  
- **`.gitignore`**：列出不纳入版本控制的文件/目录（日志、构建产物、系统文件等）。  
- **钩子（Hooks）**：位于 `.git/hooks/` 的触发脚本，如提交前检查、推送前测试等团队规范化手段。  
- **子模块（Submodule）**：在一个仓库中引用另一仓库的特定提交，适合独立组件/依赖以仓库为单位管理。  

### 远程与安全
- **远程 URL 与协议**：常见为 **SSH** 与 **HTTPS**；SSH 免密更适合频繁协作，HTTPS 便于一次性操作或受限环境。  
- **签名提交（GPG/SSH 签名）**：对提交进行加密签名，以证明作者身份、增强供应链安全。  
- **受保护分支 / 代码评审**：平台侧策略（保护 `main`/`release`），与 PR/MR 审核流程配合保障质量。  

---