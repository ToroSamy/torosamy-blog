---
titleTemplate: Development Tool
---
# Docker
## Ubuntu22.04 安装docker

**Step1：更新系统软件包**
```bash
sudo apt update
```
**Step2：安装依赖包【用于通过HTTPS来获取仓库】**
```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```
**Step3：添加Docker官方GPG密钥**
```bash
sudo -i
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-ce.gpg
```
**Step4：验证**
```bash
sudo apt-key fingerprint 0EBFCD88
0EBFCD88 是公钥的指纹。执行这个命令后，系统会显示与该指纹相关的公钥信息。
```
**Step4：添加Docker阿里稳定版软件源**
```bash
sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```
**Step5：再次更新软件包**
```bash
sudo apt update
```
**Step6：安装默认最新版**
```bash
sudo apt install docker-ce docker-ce-cli containerd.io
```
**Step7：测试，安装好后默认启动**
```bash
sudo docker run hello-world
```
如果输出“Hello from Docker!”则表示Docker已经成功安装。

**其他**：
```bash
# 显示可用版本
sudo apt-cache madison docker-ce 
```
```bash
# 将需要的版本替换VERSION_STRING进行安装，例如 5:20.10.17~3-0~ubuntu-focal
sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io 
``` 
```bash
# 查看状态：
sudo systemctl status docker
```
```bash
# 启动：
sudo systemctl start docker
```
```bash
#开机自启：
sudo systemctl enable docker
```
```bash
# 停止：
sudo systemctl stop docker
sudo usermod -aG docker galaxfy
```
```bash
# 刷新shell状态
su - galaxfy
```
```bash
# 验证
docker images
```
# 使用docker
**确保 Docker 已正确安装**
可以通过以下命令检查 Docker 是否安装并正常运行：
```bash
docker --version
```

## 构建 Docker 镜像
在包含 dockerfile.txt 文件的目录下打开终端，执行使用 -f 指定 dockerfile.txt 路径来构建镜像：
```bash
# 这条命令会根据 dockerfile.txt 的内容创建一个新的 Docker 镜像。
docker build -f dockerfile.txt -t my-image-name .
```
- -t 用于指定镜像的标签（可以替换为你想要的镜像名称）。
- . 表示当前目录（Dockerfile 所在的目录）。

## 查看镜像
```bash
docker images
```
## 运行 Docker 容器
```bash
# -it 用于交互式运行容器，可以让你进入容器内部的终端。
# my-image-name 是你在构建镜像时指定的名称。
docker run -it my-image-name
```

## 查看正在运行的docker容器
```bash
sudo docker ps
```
## 停止一个docker容器
```bash
sudo docker stop <container_id>
```

## 删除镜像
```bash
sudo docker rmi my-image-name
```


## 将宿主文件夹复制到容器中
```bash
# 在宿主机文件夹所在父级目录输入
docker cp <your_file_name> <container_id>:/<data_path>
```


## 将正在运行的docker容器转换为新镜像
```bash
sudo docker commit <container_id> <new_image_name>
```

## 使用集显运行docker
```bash
sudo -E docker run -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix -it pb-24
```

## 进入正在运行的docker
```bash
sudo docker exec -it <container_id> /bin/bash
```

## 加载.tar的镜像
```bash
sudo docker load < your_image.tar
```

## 将镜像保存为.tar
```bash
sudo docker tag image_name:tag your_registry/image_name:tag
```