---
title: 基础配置
titleTemplate: Computer Version
---
# 基础配置 - Linux

## 预编译包
### 优点: 
- 简易 快捷 方便 自动包管理
### 缺点
- 只能安装官方源的版本
- 例如Ubunt22.04是4.5.4
### 安装方式
```bash
sudo apt update
sudo apt install libopencv-dev
```
### 卸载方式
```bash
sudo apt remove --purge libopencv-dev
```

## 编译源码
### 优点:
- 可自定义度非常高 但是**最推荐这种方式**
### 缺点:
- 安装步骤对于**入门者**来说比较繁琐 和 复杂
### 安装方式
- 下载对应版本的本体源码 和 拓展源码

- 下载各种依赖
```bash
sudo apt update
sudo apt install mlocate
sudo updatedb
sudo apt install build-essential cmake git libgtk-3-dev pkg-config
sudo apt install libavcodec-dev libavformat-dev libswscale-dev 
sudo apt install libv4l-dev libxvidcore-dev libx264-dev openexr
sudo apt install libatlas-base-dev libopenexr-dev
sudo apt install libgstreamer-plugins-base1.0-dev libgstreamer1.0-dev
sudo apt install python3-dev python3-numpy libtbb2 libtbb-dev libjpeg-dev
sudo apt install libpng-dev libtiff-dev libdc1394-dev gfortran
sudo apt install libavutil-dev libopenblas-dev
sudo apt install libhdf5-dev liblapack-dev libblas-dev libavformat-dev 
```


**例如**我的版本是4.9.0 那么clone指令就是如下
```bash
git clone -b 4.9.0 https://github.com/opencv/opencv.git #本体
git clone -b 4.9.0 https://github.com/opencv/opencv_contrib.git #拓展
```
运行完后 当前路径新多出2个文件夹(一般会是opencv 和 opencv_contrib)
**推荐打开这2个文件夹** 分别运行指令 查看clone的是否为希望的版本
```bash
git describe --tags
```
- 执行cmake 根据自己的需要生成makefile文件

打开clone的opencv本体文件夹(opencv) 紧接着 创建文件夹**并打开**(一般为build)

根据**个人的需求修改**以下的cmake命令 并且运行。**以下命令只是示例 请不要照抄**
```bash
cmake -D CMAKE_BUILD_TYPE=Release \
      -D CMAKE_INSTALL_PREFIX=/opt/opencv \
      -D INSTALL_C_EXAMPLES=ON \
      -D INSTALL_PYTHON_EXAMPLES=ON \
      -D OPENCV_GENERATE_PKGCONFIG=ON \
      -D BUILD_EXAMPLES=ON \
      -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib/modules \
      -D WITH_GTK=ON \
      -D BUILD_opencv_world=OFF \
      -D BUILD_opencv_java=OFF \
      ..
```
| CMAKE_INSTALL_PREFIX | OPENCV_EXTRA_MODULES_PATH  | WITH_GTK | BUILD_opencv_world | BUILD_opencv_java |
| -------- | -------- | -------- | -------- | -------- |
| 希望安装到哪个位置 | 拓展模块源码的位置 | 显式启用 GTK 支持 | 构建单体的 libopencv_world.so 库 | Java 模块构建 |

`CMAKE_INSTALL_PREFIX=/opt/opencv`会将安装位置修改为/opt/opencv

`WITH_GTK=ON`会使CMake尝试找到你系统上安装的 GTK 3.0 开发库并使用它们。在大多数现代 Linux 发行版中 通常会默认使用 GTK 3.0。

`BUILD_opencv_world=OFF`将其设置为 OFF 会告诉 CMake 不要构建单体的 libopencv_world.so 库。而是 构建独立的 OpenCV 组件库 (例如 libopencv_core.so, libopencv_highgui.so 等)。避免之前遇到的 libopencv_world.so.409 版本依赖问题。

**请不要漏了上述指令最后一行的'..' 这是用来帮助定位CmakeLists.txt位置的**
- 查看终端提示信息确认生成的makefile文件**是否为所期望**的。

::: details 点击查看示例的提示信息

```bash
-- General configuration for OpenCV 4.9.0 =====================================
--   Version control:               4.9.0
-- 
--   Extra modules:
--     Location (extra):            /home/torosamy/develop-work-space/resource/opencv and opencv_contrib - 4.9.0/opencv_contrib/modules
--     Version control (extra):     4.9.0
-- 
--   Platform:
--     Timestamp:                   2025-02-28T02:28:51Z
--     Host:                        Linux 6.8.0-52-generic x86_64
--     CMake:                       3.22.1
--     CMake generator:             Unix Makefiles
--     CMake build tool:            /usr/bin/gmake
--     Configuration:               Release
-- 
--   CPU/HW features:
--     Baseline:                    SSE SSE2 SSE3
--       requested:                 SSE3
--     Dispatched code generation:  SSE4_1 SSE4_2 FP16 AVX AVX2 AVX512_SKX
--       requested:                 SSE4_1 SSE4_2 AVX FP16 AVX2 AVX512_SKX
--       SSE4_1 (18 files):         + SSSE3 SSE4_1
--       SSE4_2 (2 files):          + SSSE3 SSE4_1 POPCNT SSE4_2
--       FP16 (1 files):            + SSSE3 SSE4_1 POPCNT SSE4_2 FP16 AVX
--       AVX (9 files):             + SSSE3 SSE4_1 POPCNT SSE4_2 AVX
--       AVX2 (38 files):           + SSSE3 SSE4_1 POPCNT SSE4_2 FP16 FMA3 AVX AVX2
--       AVX512_SKX (8 files):      + SSSE3 SSE4_1 POPCNT SSE4_2 FP16 FMA3 AVX AVX2 AVX_512F AVX512_COMMON AVX512_SKX
-- 
--   C/C++:
--     Built as dynamic libs?:      YES
--     C++ standard:                11
--     C++ Compiler:                /usr/bin/c++  (ver 11.4.0)
--     C++ flags (Release):         -fsigned-char -W -Wall -Wreturn-type -Wnon-virtual-dtor -Waddress -Wsequence-point -Wformat -Wformat-security -Wmissing-declarations -Wundef -Winit-self -Wpointer-arith -Wshadow -Wsign-promo -Wuninitialized -Wsuggest-override -Wno-delete-non-virtual-dtor -Wno-comment -Wimplicit-fallthrough=3 -Wno-strict-overflow -fdiagnostics-show-option -Wno-long-long -pthread -fomit-frame-pointer -ffunction-sections -fdata-sections  -msse -msse2 -msse3 -fvisibility=hidden -fvisibility-inlines-hidden -O3 -DNDEBUG  -DNDEBUG
--     C++ flags (Debug):           -fsigned-char -W -Wall -Wreturn-type -Wnon-virtual-dtor -Waddress -Wsequence-point -Wformat -Wformat-security -Wmissing-declarations -Wundef -Winit-self -Wpointer-arith -Wshadow -Wsign-promo -Wuninitialized -Wsuggest-override -Wno-delete-non-virtual-dtor -Wno-comment -Wimplicit-fallthrough=3 -Wno-strict-overflow -fdiagnostics-show-option -Wno-long-long -pthread -fomit-frame-pointer -ffunction-sections -fdata-sections  -msse -msse2 -msse3 -fvisibility=hidden -fvisibility-inlines-hidden -g  -O0 -DDEBUG -D_DEBUG
--     C Compiler:                  /usr/bin/cc
--     C flags (Release):           -fsigned-char -W -Wall -Wreturn-type -Waddress -Wsequence-point -Wformat -Wformat-security -Wmissing-declarations -Wmissing-prototypes -Wstrict-prototypes -Wundef -Winit-self -Wpointer-arith -Wshadow -Wuninitialized -Wno-comment -Wimplicit-fallthrough=3 -Wno-strict-overflow -fdiagnostics-show-option -Wno-long-long -pthread -fomit-frame-pointer -ffunction-sections -fdata-sections  -msse -msse2 -msse3 -fvisibility=hidden -O3 -DNDEBUG  -DNDEBUG
--     C flags (Debug):             -fsigned-char -W -Wall -Wreturn-type -Waddress -Wsequence-point -Wformat -Wformat-security -Wmissing-declarations -Wmissing-prototypes -Wstrict-prototypes -Wundef -Winit-self -Wpointer-arith -Wshadow -Wuninitialized -Wno-comment -Wimplicit-fallthrough=3 -Wno-strict-overflow -fdiagnostics-show-option -Wno-long-long -pthread -fomit-frame-pointer -ffunction-sections -fdata-sections  -msse -msse2 -msse3 -fvisibility=hidden -g  -O0 -DDEBUG -D_DEBUG
--     Linker flags (Release):      -Wl,--exclude-libs,libippicv.a -Wl,--exclude-libs,libippiw.a   -Wl,--gc-sections -Wl,--as-needed -Wl,--no-undefined  
--     Linker flags (Debug):        -Wl,--exclude-libs,libippicv.a -Wl,--exclude-libs,libippiw.a   -Wl,--gc-sections -Wl,--as-needed -Wl,--no-undefined  
--     ccache:                      NO
--     Precompiled headers:         NO
--     Extra dependencies:          dl m pthread rt
--     3rdparty dependencies:
-- 
--   OpenCV modules:
--     To be built:                 alphamat aruco bgsegm bioinspired calib3d ccalib core datasets dnn dnn_objdetect dnn_superres dpm face features2d flann freetype fuzzy gapi hdf hfs highgui img_hash imgcodecs imgproc intensity_transform line_descriptor mcc ml objdetect optflow phase_unwrapping photo plot python3 quality rapid reg rgbd saliency sfm shape stereo stitching structured_light superres surface_matching text tracking ts video videoio videostab viz wechat_qrcode xfeatures2d ximgproc xobjdetect xphoto
--     Disabled:                    java world
--     Disabled by dependency:      -
--     Unavailable:                 cannops cudaarithm cudabgsegm cudacodec cudafeatures2d cudafilters cudaimgproc cudalegacy cudaobjdetect cudaoptflow cudastereo cudawarping cudev cvv julia matlab ovis python2
--     Applications:                tests perf_tests examples apps
--     Documentation:               NO
--     Non-free algorithms:         NO
-- 
--   GUI:                           GTK3
--     GTK+:                        YES (ver 3.24.33)
--       GThread :                  YES (ver 2.72.4)
--       GtkGlExt:                  NO
--     VTK support:                 YES (ver 9.1.0)
-- 
--   Media I/O: 
--     ZLib:                        /usr/lib/x86_64-linux-gnu/libz.so (ver 1.2.11)
--     JPEG:                        /usr/lib/x86_64-linux-gnu/libjpeg.so (ver 80)
--     WEBP:                        /usr/lib/x86_64-linux-gnu/libwebp.so (ver encoder: 0x020f)
--     PNG:                         /usr/lib/x86_64-linux-gnu/libpng.so (ver 1.6.37)
--     TIFF:                        /usr/lib/x86_64-linux-gnu/libtiff.so (ver 42 / 4.3.0)
--     JPEG 2000:                   OpenJPEG (ver 2.4.0)
--     OpenEXR:                     /usr/lib/x86_64-linux-gnu/libImath-2_5.so /usr/lib/x86_64-linux-gnu/libIlmImf-2_5.so /usr/lib/x86_64-linux-gnu/libIex-2_5.so /usr/lib/x86_64-linux-gnu/libHalf-2_5.so /usr/lib/x86_64-linux-gnu/libIlmThread-2_5.so (ver 2_5)
--     HDR:                         YES
--     SUNRASTER:                   YES
--     PXM:                         YES
--     PFM:                         YES
-- 
--   Video I/O:
--     DC1394:                      YES (2.2.6)
--     FFMPEG:                      YES
--       avcodec:                   YES (58.134.100)
--       avformat:                  YES (58.76.100)
--       avutil:                    YES (56.70.100)
--       swscale:                   YES (5.9.100)
--       avresample:                NO
--     GStreamer:                   YES (1.20.3)
--     v4l/v4l2:                    YES (linux/videodev2.h)
-- 
--   Parallel framework:            pthreads
-- 
--   Trace:                         YES (with Intel ITT)
-- 
--   Other third-party libraries:
--     Intel IPP:                   2021.10.0 [2021.10.0]
--            at:                   /home/torosamy/develop-work-space/resource/opencv and opencv_contrib - 4.9.0/opencv/build/3rdparty/ippicv/ippicv_lnx/icv
--     Intel IPP IW:                sources (2021.10.0)
--               at:                /home/torosamy/develop-work-space/resource/opencv and opencv_contrib - 4.9.0/opencv/build/3rdparty/ippicv/ippicv_lnx/iw
--     VA:                          NO
--     Lapack:                      NO
--     Eigen:                       YES (ver 3.4.0)
--     Custom HAL:                  NO
--     Protobuf:                    build (3.19.1)
--     Flatbuffers:                 builtin/3rdparty (23.5.9)
-- 
--   OpenCL:                        YES (no extra features)
--     Include path:                /home/torosamy/develop-work-space/resource/opencv and opencv_contrib - 4.9.0/opencv/3rdparty/include/opencl/1.2
--     Link libraries:              Dynamic load
-- 
--   Python 3:
--     Interpreter:                 /usr/bin/python3 (ver 3.10.12)
--     Libraries:                   /usr/lib/x86_64-linux-gnu/libpython3.10.so (ver 3.10.12)
--     numpy:                       /usr/lib/python3/dist-packages/numpy/core/include (ver 1.21.5)
--     install path:                lib/python3.10/dist-packages/cv2/python-3.10
-- 
--   Python (for build):            /usr/bin/python3
-- 
--   Java:                          
--     ant:                         NO
--     Java:                        YES (ver 11.0.26)
--     JNI:                         /usr/lib/jvm/default-java/include /usr/lib/jvm/default-java/include/linux /usr/lib/jvm/default-java/include
--     Java wrappers:               NO
--     Java tests:                  NO
-- 
--   Install to:                    /opt/opencv
-- -----------------------------------------------------------------

```
:::

- 执行makefile文件 编译源代码
```bash
make -j$(nproc)
```
执行到这步为止 **除了下载各种前置依赖以外** 并没有对系统为止进行任何更改 失败时 **你仍可以随意删除文件夹并重试**
当然你并不需要`sudo apt remove --purge <包名>`来删除依赖 这些都是由linux包管理的 并**不需要入门者关心**

- 安装到期望的目录
```bash
sudo make install
```
本示例会安装到/opt/opencv下 当然如果出现了任何错误 仍可以删除/opt/opencv下的所有内容并重试
- 配置动态库链接规则

打开 `/etc/ld.so.conf.d` 创建xxx.conf (xxx为自定义名字) 例如`opencv.conf`
```bash
sudo touch /etc/ld.so.conf.d/opencv.conf
```
紧接着在 `/etc/ld.so.conf.d` 下的 `opencv.conf` 键入绝对路径 例如
```bash
/opt/opencv/lib
```
然后保存文件 输入指令刷新使规则生效
```bash
sudo ldconfig
```
- 配置其余规则

打开 `/etc/bash.bashrc` 并键入如下**类似内容**
```bash
PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/opt/opencv/lib/pkgconfig
export PKG_CONFIG_PATH
```
输入指令刷新使规则生效
```bash
source /etc/bash.bashrc
```
- 修改规则指定cmake链接的opencv版本

打开 `~/.bashrc` 并键入如下**类似内容** (**请入门者**自行百度~在linux中的含义)
```bash
export CMAKE_PREFIX_PATH=/opt/opencv:$CMAKE_PREFIX_PATH
```
输入指令刷新使规则生效
```bash
source ~/.bashrc
```
- 写一段CMakeLists.txt 来检验是否安装成功
```cmake
cmake_minimum_required(VERSION 3.10)
project(untitled1)

# 使用 C++17 标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# 添加编译器和链接器选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -g")

find_package(OpenCV REQUIRED)
# 可选：输出找到的OpenCV版本
message(STATUS "Found OpenCV library: ${OpenCV_VERSION}") 

add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} PUBLIC
    ${OpenCV_LIBS}
)
target_include_directories(${PROJECT_NAME} PUBLIC
    ${OpenCV_INCLUDE_DIRS}
)
```

### 卸载方式

- 开始卸载 OpenCV 4.9 (从 /opt/opencv)

```bash
# 定义可能包含 OpenCV 文件的目录
OPENCV_INCLUDE_DIR="/opt/opencv/include/opencv4"
OPENCV_LIB_DIR="/opt/opencv/lib"
OPENCV_LIB64_DIR="/opt/opencv/lib64"
OPENCV_BIN_DIR="/opt/opencv/bin"
OPENCV_SHARE_DIR="/opt/opencv/share/opencv4"
OPENCV_CMAKE_DIR="/opt/opencv/lib/cmake/opencv4" # 常见的 CMake 配置文件路径

sudo rm -rf /opt/opencv/lib/opencv4
sudo rm -rf /opt/opencv/lib/pkgconfig

# 尝试删除 include 目录
if [ -d "$OPENCV_INCLUDE_DIR" ]; then
  echo "删除 include 目录: $OPENCV_INCLUDE_DIR"
  sudo rm -rf "$OPENCV_INCLUDE_DIR"
fi

# 尝试删除 lib 目录下的 OpenCV 库文件
if [ -d "$OPENCV_LIB_DIR" ]; then
  echo "删除库文件从: $OPENCV_LIB_DIR"
  sudo find "$OPENCV_LIB_DIR" -name "libopencv_*" -delete
  sudo find "$OPENCV_LIB_DIR" -name "opencv_*" -delete # 额外添加，以防有些库文件命名不规范
fi

# 尝试删除 lib64 目录下的 OpenCV 库文件 (如果存在 lib64 目录)
if [ -d "$OPENCV_LIB64_DIR" ]; then
  echo "删除库文件从: $OPENCV_LIB64_DIR"
  sudo find "$OPENCV_LIB64_DIR" -name "libopencv_*" -delete
  sudo find "$OPENCV_LIB64_DIR" -name "opencv_*" -delete # 额外添加，以防有些库文件命名不规范
fi


# 尝试删除 bin 目录下的 OpenCV 可执行文件 (通常情况下 OpenCV 不会安装很多可执行文件到 bin 目录，但以防万一)
if [ -d "$OPENCV_BIN_DIR" ]; then
  echo "删除二进制文件从: $OPENCV_BIN_DIR"
  sudo find "$OPENCV_BIN_DIR" -name "opencv*" -delete
fi

# 尝试删除 share 目录下的 OpenCV 相关文件 (例如文档，示例等)
if [ -d "$OPENCV_SHARE_DIR" ]; then
    echo "删除 share 目录: $OPENCV_SHARE_DIR"
    sudo rm -rf "$OPENCV_SHARE_DIR"
fi


# 尝试删除 CMake 配置文件目录
if [ -d "$OPENCV_CMAKE_DIR" ]; then
    echo "删除 CMake 配置文件目录: $OPENCV_CMAKE_DIR"
    sudo rm -rf "$OPENCV_CMAKE_DIR"
fi

echo "请检查是否还有残留文件，如有需要请手动删除。"
```