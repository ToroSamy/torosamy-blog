---
titleTemplate: Cv Markdown
---
# 常用环境
## windows11家庭版安装hyper-v
创建xxx.bat 将以下内容复制进bat并以管理员的身份运行
```bash
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V -All /LimitAccess /ALL
pause
```


## hyper-v修改分辨率
```bash
sudo gedit /etc/default/grub
```
- 将GRUB_CMDLINE_LINUX_DEFAULT="quiet splash "改为GRUB_CMDLINE_LINUX_DEFAULT="quiet splash video=hyperv_fb:2560x1440"
- 2560x1440为需要的分辨率
```bash
sudo update-grub
sudo apt install linux-image-extra-virtual
```
- 然后在物理机中以**管理员身份**运行cmd
- `<vm_name>`为虚拟机名字 可在hyper管理器中查看
```bash
set-vmvideo -vmname `<vm_name>` -horizontalresolution:2560  -verticalresolution:1440 -resolutiontype single
set-vm `<vm_name>` -EnhancedSessionTransportType HVSocket
```
```
//code
```
## Ubuntu22.04安装eigen3
- 运行以下指令后eigen3会被安装在标准位置/usr/include/eigen3
```bash
sudo apt install libeigen3-dev
```
## 安装g++
```bash
sudo apt install g++
```
## 安装cmake
```bash
sudo apt install cmake
```

## 配置Clion
- 去官方下载安装包https://www.jetbrains.com/clion/download/other.html
- 解压下载的安装包 然后复制到/opt下
```bash
sudo cp -rf "文件夹名" /opt
```
- 到bin目录下运行以下指令进行安装
```bash
sh clion.sh
```
## 配置QT
```bash
sudo apt install libxcb-cursor0 libxcb-cursor-dev
```
- 去[官网下载地址](https://www.qt.io/download-qt-installer-oss)下载在线安装器https://www.qt.io/download-qt-installer-oss
- 中国科学技术大学开源镜像：--mirror https://mirrors.ustc.edu.cn/qtproject
```bash
./qt.xxx --mirror https://mirrors.ustc.edu.cn/
```
