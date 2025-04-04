---
titleTemplate: Ros2 Markdown
---
# Ros2

## 安装ros2
```bash
#可以按官方教程来安装
https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
#鱼香ros把以上网络等问题封装了以下可以输入以下指令一键安装 不放心可以按官方的来
wget http://fishros.com/install -O fishros && . fishros
```
## 安装ros相关
```bash
sudo apt install ros-$ROS_DISTRO-navigation2
sudo apt install ros-$ROS_DISTRO-nav2-bringup
sudo apt install ros-$ROS_DISTRO-joint-state-publisher
sudo apt install ros-$ROS_DISTRO-robot-state-publisher
sudo apt install ros-$ROS_DISTRO-xacro
sudo apt install ros-$ROS_DISTRO-nav2-map-server
sudo apt install gazebo
sudo apt install ros-$ROS_DISTRO-turtlebot3-gazebo
sudo apt install ros-$ROS_DISTRO-spatio-temporal-voxel-layer
```
## 安装rqt插件tf-tree
```bash
sudo apt install ros-$ROS_DISTRO-rqt
sudo apt install ros-$ROS_DISTRO-rqt-tf-tree
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
## 因为rqt会生成一个默认配置文件
rm -rf ~/.config/ros.org/rqt_gui.ini
```
## 配置rosdep(可选)

下载脚本并执行脚本 (因为每次执行这个脚本后，都会自动删除脚本，所以需要重新执行)
```bash
wget http://fishros.com/install -O fishros && . fishros
```

使用rosdep补全编译前置
```bash
rosdep install -r --from-paths src --ignore-src --rosdistro $ROS_DISTRO -y
```
- install：表示你要安装依赖项。
- -r 或 --reinstall：这个选项会在依赖项已经安装的情况下重新安装它们。通常用于确保依赖项是最新的，或者你已经修改了包中的某些内容并希望重新安装依赖。
- --from-paths src：指定从工作区中的 src 目录加载源代码（即 ROS 包）。src 目录通常包含你所有的 ROS 包的源代码。
- --ignore-src：这个选项告诉 rosdep 忽略 src 目录中已有的源代码包。也就是说，它仅会关注依赖项，而不会尝试重新编译 src 中的包。

## 安装ros-control(可选)
```bash
sudo apt install ros-$ROS_DISTRO-ros2-control
sudo apt install ros-$ROS_DISTRO-ros2-controllers
sudo apt install ros-$ROS_DISTRO-gazebo-ros2-control
```

## 安装ros-slam-toolbox(可选)
```bash
sudo apt install ros-$ROS_DISTRO-slam-toolbox
```