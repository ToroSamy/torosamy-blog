---
titleTemplate: SSH
---
# SSH


## SSH 介绍
SSH（Secure Shell）是一种 **网络安全协议**, 主要用于在不安全的网络上实现安全的远程登录与数据传输。  
它的核心目标是：**身份认证、数据加密、完整性保护**。相比早期的 Telnet、rsh 等明文传输方式, SSH 通过**引入密码学**算法确保了通信过程不会被窃听或篡改。

---

## OpenSSH

SSH 是一个协议标准, 而最常见的实现就是 **OpenSSH**。 

### 安装方式
- Linux: 需用包管理器(`apt`, `dnf`, `yum`, `pacman`, `zypper`)手动安装 `OpenSSH` 的 `Server` 和 `Client`
- Windows: 自带 `OpenSSH`

---


### 获取密钥对
#### Linux
假设要生成到 `/home/workspace/resource/` 下
- RSA 2048 位
```bash
ssh-keygen -t rsa -b 2048 -f /home/workspace/resource/rsa_id -C "your_email@example.com"
```
- Ed25519
```bash
ssh-keygen -t ed25519 -f /home/workspace/resource/ed25519_id -C "your_email@example.com"
```

---

#### Windows

假设要生成到 `E:\DevTools\ssh\` 下
- RSA 2048 位
```powershell
ssh-keygen -t rsa -b 2048 -f E:\DevTools\ssh\rsa_id -C "your_email@example.com"
```
- Ed25519
```powershell
ssh-keygen -t ed25519 -f E:\DevTools\ssh\ed25519_id -C "your_email@example.com"
```
---

## OpenSSH Client
OpenSSH Client(ssh)运行在用户本地电脑上的 SSH 客户端, 用于发起连接（例如 `ssh user@host`）。

### 启动方式
随装随用, 不需要后台服务

### ssh-agent
`ssh-agent` 是一个密钥管理工具, 是 `OpenSSH Client` 的一部分。是一个`钥匙串服务`。

#### 作用
在内存里帮你保存已经解锁的私钥, 这样你在同一次会话里不用每次都输入 `passphrase` 。

#### 常用命令
```bash
ssh-add /路径/私钥   # 把私钥加载进 agent
ssh-add -l                  # 查看已加载的密钥
```

#### Windows

在 Windows 下, ssh-agent 是一个 Service, 可以设置开机自启。

这里假设私钥在 `E:\DevTools\ssh\private` 中

- 确认你用的是 Windows 自带 OpenSSH 工具
```powershell
(Get-Command ssh-add).Source
(Get-Command ssh).Source
# 期望看到：C:\Windows\System32\OpenSSH\ssh-add.exe / ssh.exe
```

- 把服务设为`自动`并启动
```powershell
Set-Service -Name ssh-agent -StartupType Automatic
Start-Service -Name ssh-agent
```
- 验证服务状态
```powershell
Get-Service -Name ssh-agent
# Status 应该是 Running
```

- 限制私钥只允许当前用户访问
```powershell
# 去掉继承的权限
icacls "E:\DevTools\ssh\private" /inheritance:r

# 删除`已验证用户`的访问
icacls "E:\DevTools\ssh\private" /remove "NT AUTHORITY\Authenticated Users"

# 只允许当前登录用户完全控制（把 <YourUserName> 换成你自己的 Windows 登录名）
icacls "E:\DevTools\ssh\private" /grant:r %USERNAME%:F
```
- 把私钥加到 agent
```powershell
# 用系统内置 ssh-add, 避免走错
& "C:\Windows\System32\OpenSSH\ssh-add.exe" "E:\DevTools\ssh\private"
# 有口令会提示输入一次, 成功会显示 Identity added
& "C:\Windows\System32\OpenSSH\ssh-add.exe" -l   # 应能列出刚加的那把
```

#### Linux
`Linux / Git Bash` 下的 `ssh-agent` 是一个**普通后台进程**

所以每开一个新 `shell`,都要把环境变量 SSH_AUTH_SOCK / SSH_AGENT_PID 重新注入到当前 shell。

- 要么自己 `eval $(ssh-agent -s)`
- 要么写进 `bashrc / .zshrc` 
- 要么用桌面会话的`钥匙串管理器`（GNOME Keyring、KWallet）在登录桌面时自动启动 ssh-agent


---


## OpenSSH Server
OpenSSH Server(sshd)运行在远程主机上的守护进程, 负责接收客户端连接请求, 并通过密钥认证/密码认证等方式确认用户身份。
### 启动方式
- Linux
```bash
sudo systemctl enable sshd   # 开机自启
sudo systemctl start sshd    # 立即启动
```
- Windows
```powershell
# 启动一次
Start-Service sshd
# 设置开机自启
Set-Service -Name sshd -StartupType Automatic
```


---


## 工作流程

### 准备工作
需要被连接的系统安装OpenSSH Server, 连接其他系统的安装OpenSSH Client

当服务端第一次启动 `OpenSSH Server(sshd)` 服务时, 如果没有主机密钥, 会同时生成 `ssh_host_rsa_key`, `ssh_host_ecdsa_key`, `ssh_host_ed25519_key` 等文件(多算法兼容)

客户端需要连接一次服务端, 将公钥里的内容复制到服务端的 `authorized_keys` 中

无论是密码登录还是密钥登录, 服务端都会向客户端发送主机公钥；客户端若选择信任, 就会将其记录在 `known_hosts` 中

### 安全验证
当客户端再次连接时, 身份验证过程分为 **两部分**：

#### 验证服务器身份（防止连到假冒服务器）
- 客户端发一个随机挑战 `challenge` 给服务器
- 服务器用 **主机私钥** 对这个挑战进行签名
- 客户端拿 `known_hosts` 中保存的 **主机公钥** 来验证这个签名
- 如果验证成功则说明：它的身份和之前信任的那台服务器一致

#### 验证客户端身份（防止陌生人登录服务器）
- 服务器检查登录用户的 `authorized_keys` 文件, 找到匹配的用户公钥
- 服务器生成一个随机挑战 `challenge_user`
- 服务器用这个挑战**要求**客户端`用对应的 **用户私钥** 对它签名
- 如果客户端 `config文件` 里没有配置连接该服务端用哪把**用户私钥**, 则默认使用 `~/.ssh/` 下的 **用户私钥** 对挑战签名, 并把签名发回服务器
- 例如使用 `config文件` 对 `github.com` 进行配置
```
Host github.com
    HostName github.com
    User git
    IdentityFile E:/DevTools/ssh/private
    IdentitiesOnly yes
    AddKeysToAgent yes
```
- 在客户端用私钥签发随机挑战的过程中, `config文件` 指定用哪个私钥 `ssh-agent` 帮自动把私钥加载进来
- 服务器用 `authorized_keys` 里的 **用户公钥** 验证这个签名
- 验证通过则说明客户端确实拥有对应的私钥, 允许登录


---


## 用户级目录
这里是 **作为客户端/用户** 的所有东西。


### 配置目录
- Linux: `/home/<用户名>/.ssh/`, `/root/.ssh`
- Windows: `C:\Users\<用户名>\.ssh\`

### 常见文件
| 文件名     | 作用     |
| -------- | -------- |
|id_rsa / id_ed25519 | 用户私钥 |
|id_rsa.pub / id_ed25519.pub | 用户公钥 |
|authorized_keys | 允许登录本机的 外部公钥列表 |
|known_hosts | 保存 你信任过的远程主机的公钥 |
|config | 用户自己的 SSH 配置文件 |



## 系统级目录

这里是 **服务器端 `sshd` 的配置和主机密钥目录** 的所有东西。


### 配置目录
- Linux: `/home/<用户名>/.ssh/`, `/root/.ssh`
- Windows: `C:\Users\<用户名>\.ssh\`

### 常见文件
| 文件名     | 作用     |
| -------- | -------- |
|sshd_config | sshd 服务的配置文件 |
|ssh_config | 系统范围的客户端默认配置 |
|ssh_host_ecdsa_key.pub | 主机公钥(ecdsa) |
|ssh_host_ecdsa_key | 主机私钥 |
|ssh_host_rsa_key.pub | 主机公钥(rsa) |
|ssh_host_rsa_key | 主机私钥 |
|ssh_host_ed25519_key.pub | 主机公钥(ed25519) |
|ssh_host_ed25519_key | 主机私钥 |