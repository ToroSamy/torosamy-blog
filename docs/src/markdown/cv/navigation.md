---
titleTemplate: Cv Markdown
---
# 导航相关
## Ros2
**安装ros2**
```bash
#可以按官方教程来安装
https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
#鱼香ros把以上网络等问题封装了以下可以输入以下指令一键安装 不放心可以按官方的来
wget http://fishros.com/install -O fishros && . fishros
```
**安装ros相关**
```bash
sudo apt install ros-humble-navigation2
sudo apt install ros-humble-nav2-bringup
sudo apt install ros-$ROS_DISTRO-joint-state-publisher
sudo apt install ros-$ROS_DISTRO-robot-state-publisher
sudo apt install ros-$ROS_DISTRO-xacro
sudo apt install ros-$ROS_DISTRO-nav2-map-server
sudo apt install gazebo
sudo apt install ros-humble-turtlebot3-gazebo
sudo apt install ros-humble-spatio-temporal-voxel-layer
```
**安装rqt插件tf-tree**
```bash
sudo apt install ros-humble-rqt
sudo apt install ros-$ROS_DISTRO-rqt-tf-tree
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
## 因为rqt会生成一个默认配置文件
rm -rf ~/.config/ros.org/rqt_gui.ini
```
**配置rosdep(可选)**

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

**安装ros-control(可选)**
```bash
sudo apt install ros-$ROS_DISTRO-ros2-control
sudo apt install ros-$ROS_DISTRO-ros2-controllers
sudo apt install ros-$ROS_DISTRO-gazebo-ros2-control
```

**安装ros-slam-toolbox(可选)**
```bash
sudo apt install ros-$ROS_DISTRO-slam-toolbox
```


## Ubuntu22.04配置Mid360网关
- settings(设置) -> network(网络) -> wired -> ipv4
- ipv4 method选择manual(手动)
- DNS地址写不写无所谓 地址(address)192.168.1.5 网关(gateway)192.168.1.1 子网掩码(netmark)255.255.255.0
- 在Mid360.json中找到lidar_configs选项 根据实物雷达后面的数字修改ip
![alt text](mid360-network-door.png)

## 配置Mid360SDK
https://github.com/Livox-SDK/Livox-SDK2
```bash
git clone git@github.com:Livox-SDK/Livox-SDK2.git
```
- 打开Livox-SDK2 并 新建文件夹build
- 进入build文件夹 并 打开bash输入指令
```bash
cmake .. && make -j 4
sudo make install
```

## 安装small_icp
```bash
sudo apt install -y libeigen3-dev libomp-dev
```
```bash
git clone https://github.com/koide3/small_gicp.git
```
```bash
cmake .. -DCMAKE_BUILD_TYPE=Release && make -j
sudo make install
```

## 修改slam_toolbox地图
- 加载.tar的镜像
```bash
sudo docker load < ogm2pgbm.tar
```
查看本地镜像
```bash
sudo docker images
```
- clone项目Ogm2Pgbm 并运行docker镜像
```bash
git clone https://github.com/ToroSamy/Ogm2Pgbm.git
```
```bash
cd Ogm2Pgbm
sudo ./autorun.sh
```
- 将map.yaml 和 map.pgm 拷贝到Ogm2Pgbm/workspace/map
- 在 **docker容器** 中执行如下命令行
```bash
roslaunch ogm2pgbm ogm2pgbm.launch map_file:=/root/workspace/map/map.yaml record:=true
```

- 当 终端 提示`done!`后 使用如下命令行 将`.bag`拷贝到宿主机中
查看docker容器id
```bash
sudo docker ps
```
从 id 为60ba15da2b35的容器中拷贝.bag到~/develop-work-space/project/Ogm2Pgbm/builder/下
```bash
sudo docker cp 60ba15da2b35:/root/.ros/ogm2pgbm_sensordata.bag ~/develop-work-space/project/Ogm2Pgbm/builder/
```
- 在Ogm2Pgbm/workspace/builder下执行如下命令行
```bash
rviz2 -d ogm2pgbm.rviz
```
```bash
pip install rosbags
```
进入存放 rosbag 的目录，执行以下命令，将 ogm2pgbm_sensordata.bag 转换为 base.db3 
```bash
rosbags-convert --src ogm2pgbm_sensordata.bag   --dst base   --src-typestore empty   --dst-typestore ros2_humble   --exclude-topic /rosout /robot/map /rosout_agg
```
启动 slam_toolbox 准备建图
```bash
ros2 run slam_toolbox async_slam_toolbox_node --ros-args   -p use_sim_time:=True   -p odom_frame:=robot_odom   -p base_frame:=robot_base_link   -p map_frame:=robot_map   -p do_loop_closing:=False   -p max_laser_range:=10.0
```
播放rosbag
```bash
ros2 bag play base.db3
```
- 待 rosbag 播放完毕，在 rviz2 界面左侧 SlamToolBoxPlugin 中设置好文件名，点击 Serialize Map 即可保存 .posegraph+.data 地图；点击 Save Map 可保存 .pgm+.yaml 地图