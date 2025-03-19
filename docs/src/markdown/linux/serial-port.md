---
titleTemplate: Linux Markdown
---
# SerialPort
## ioctl
**ioctl**是一种由操作系统提供的系统调用函数，用于对设备文件执行特殊操作其原型定义在 Linux 的头文件 sys/ioctl.h 中，常用于对设备驱动进行控制和通信

```c
int ioctl(int fd, unsigned long request, ...);
```

**参数说明**
- **fd**: 文件描述符，通常是通过 open() 函数返回的值，指向需要操作的设备文件
- **request**: 控制命令，定义了要执行的具体操作通常，这些命令在设备驱动程序中定义，开发者可以通过宏来创建这些命令
不同的设备驱动程序会定义各自支持的 request，但一些常用的请求是系统内置的以下是几类常见的请求：

| 宏名称     | 说明     |
| -------- | -------- |
|**通用请求** |**用于多种设备，定义在标准头文件中** |
| FIONREAD | 获取输入缓冲区中可读取的字节数 |
| TIOCGWINSZ | 获取终端窗口大小（行列数） |
| TIOCSWINSZ | 设置终端窗口大小（行列数） |
| TIOCEXCL | 设置终端为独占模式 |
| TIOCNXCL | 关闭终端的独占模式 |
| TCGETS | 获取终端设备的当前参数 |
| TCSETS | 设置终端设备的当前参数 |
|**网络设备请求** |**用于网络设备，定义在 linux/sockios.h 等头文件中** |
| SIOCGIFADDR | 获取网络接口的 IP 地址 |
| SIOCSIFADDR | 设置网络接口的 IP 地址 |
| SIOCGIFFLAGS | 获取网络接口的标志（如启用/禁用） |
| SIOCSIFFLAGS | 设置网络接口的标志 |
| SIOCGIFMTU | 获取网络接口的 MTU（最大传输单元） |
| SIOCSIFMTU | 设置网络接口的 MTU |
|**块设备请求** |**用于控制块设备，例如磁盘或文件系统** |
|BLKGETSIZE	 |获取块设备大小（单位：块）|
|BLKGETSIZE64 |	获取块设备大小（单位：字节）|
|BLKFLSBUF |清空块设备的缓冲区|
|BLKRRPART |	重新读取块设备的分区表|
|BLKSSZGET |	获取块设备的逻辑扇区大小（单位：字节）|
|**字符设备请求** |**字符设备（如串口、终端）有特定的请求** |
|TIOCGSERIAL|获取串口设备信息|
|TIOCSSERIAL|设置串口设备信息|
|TIOCMGET|	获取调制解调器控制线的状态|
|TIOCMSET	|设置调制解调器控制线的状态|
|TIOCM_CAR|	检测是否连接载波信号|
|TIOCMBIS|	设置调制解调器的特定位|
|**用户自定义请求** |**设备驱动开发者可以定义自己的 ioctl 请求，通过宏生成命令号这些宏位于 asm/ioctl.h 或 asm-generic/ioctl.h 中：** |
|IOC(dir, type, nr, size)|	手动生成一个命令号|
|IO(type, nr)	|无数据传递的简单命令|
|IOR(type, nr, datatype)	|从内核读取数据|
|IOW(type, nr, datatype)	|向内核写入数据|
|IOWR(type, nr, datatype)|	从内核读写数据|
- **...**: 可选的第三个参数，通常是一个指向数据的指针，用于传递或者接收额外的信息，取决于 request 的具体含义

**返回值:**
- 失败时返回 -1，并设置全局变量 errno 以指示错误类型
- 成功时返回 0


**使用场景**
-  获取或设置设备参数，例如显示器分辨率、网络接口状态等
- 启动或停止设备的某些功能
- 从设备获取状态信息或统计数据

**注意事项**
- ioctl 是一种通用接口，灵活但不够直观，不同设备可能定义了完全不同的 request 命令和数据格式
- 使用 ioctl 时，需要了解目标设备驱动程序的实现细节（通常会通过驱动文档或源代码了解支持的 request 命令）
- **不建议滥用 ioctl**，因为其操作可能难以跨平台移植
- 需要深入学习时，可以查看设备驱动开发的相关资料，例如《Linux设备驱动程序（Linux Device Drivers, LDD3）》等经典书籍

## 用户权限
**1.权限分类**
Linux 系统中，文件和目录的权限分为读（r，read）、写（w，write）、执行（x，execute）三种，针对三种不同的用户角色进行设置：
- **文件所有者（user）**：创建文件或目录的用户。
- **所属组（group）**：文件或目录所属的用户组。
- **其他用户（others）**：除了文件所有者和所属组用户之外的其他用户。


**2.数字表示法**
|权限	|读（r）|写（w）| 执行（x）|无权限|
| -------- | -------- |-------- | -------- | -------- |
|数字值|	4|2|1|0|

将这些权限对应的数字相加，就可以得到一个代表特定权限组合的数字。

**3.数字组合**

|数字组合	|3 = 2 + 1|5 = 4 + 1|6 = 4 + 2|7 = 4 + 2 +1|
| -------- | -------- |-------- | -------- | -------- |
|数字值|写和执行|读和执行|读和写|读写执行|

**4.数字位数含义**
注意: 在第1位数 0表示不设置特殊权限
|位数	|1|2|3|4|
| -------- | -------- |-------- | -------- | -------- |
|含义|通常用于设置特殊权限（如 SUID、SGID、Sticky Bit）|文件所有者的权限|所属组的权限|其他用户的权限|




## open
**open**是一个系统调用函数，用于打开文件或设备，并返回一个文件描述符
**通过 strace 可以查看程序中实际调用的 open 行为**

```cpp
#include <fcntl.h>
int open(const char *pathname, int flags, ... /mode_t mode */);
```
```cpp
int fd = open("text.txt",O_WRONLY|O_CREAT|O_APPEND,0644);
std::cout<<fd<<std::endl;
# 在一个进程启动时,会首先为我打开3个文件 标准输入0 标准输出1 标准错误输出2。那么理论fd轮到3了。 
```
**参数说明**
- **pathname**: 文件路径
- **flags**: 操作标志，定义了文件的访问模式和其他选项 这些标志可以通过逻辑或 (|) 组合使用

| 访问模式(必选)  | 说明     |
| -------- | -------- |
|O_RDONLY |只读模式打开文件 |
|O_WRONLY |只写模式打开文件 |
|O_RDWR |读写模式打开文件 |
|**其他选项(可选)** |**说明** |
|O_CREAT|	文件不存在时创建文件|
|O_EXCL|	与 O_CREAT 配合使用，文件已存在则报错|
|O_TRUNC	|打开文件时将文件长度截断为 0|
|O_APPEND	|每次写入操作从文件末尾追加数据|
|O_NONBLOCK|设置为非阻塞模式（用于管道、设备等）|
|O_SYNC|	每次写操作都会等待硬件完成同步|
|O_NOFOLLOW|	不允许跟随符号链接|

- **mode**: 可选，仅当使用 O_CREAT 标志时需要指定,设置新创建文件的权限（八进制格式）

|权限	|描述|
| -------- | -------- |
|0644|	用户读写，组和其他用户只读|
|0755	|用户读写执行，其他用户只读执行|


**返回值:**
- 成功时，返回一个非负整数（文件描述符），表示打开的文件
- 失败时，返回 -1，并设置全局变量 errno 指示错误原因

|错误代码(errno)|	描述|
| -------- | -------- |
|EACCES|	没有权限访问文件或路径|
|ENOENT	|文件或路径不存在（未使用 O_CREAT）|
|EEXIST	|文件已存在（与 `O_CREAT|
|ENOTDIR|	路径中的某一部分不是目录|
|EBADF|	文件描述符无效（打开的文件错误）|


**特别注意:**
- 如果没有足够的权限打开文件，open 会失败并返回 -1，errno 被设置为 EACCES
若使用 O_CREAT 创建文件，mode 设置的权限可能受进程的 umask 值影响
- open 不仅能打开常规文件，还可以用于打开设备文件（如 /dev/ttyS0、/dev/null），从而与硬件交互

**文件描述符:**
- 每次成功调用 open，都会返回一个新的文件描述符
- 请务必使用 close 释放文件描述符，否则可能导致资源泄漏

|	函数名|说明|
| -------- | -------- |
|open  |是系统调用，操作层次较低，直接与内核交互 |
|fopen | 是标准库函数，基于 open 实现，提供了缓冲机制，使用起来更方便，但性能可能略低 |


## 波特率

波特率是指数据传输速率的单位，表示每秒钟信号变化的次数。它是衡量串口通信或其他数字通信方式中信号传输速度的一个重要参数。

**波特率的定义**
波特率表示每秒钟符号（signal change）传输的次数，其中每个符号可以包含一个或多个比特（bit）。简而言之，波特率决定了数据传输的速率。
- 如果波特率是 **9600 波特（Baud）**，意味着每秒钟传输 **9600 个符号**。
- 在常见的串口通信中，每个符号通常代表一个比特（bit），所以波特率和比特率是相同的。
- 如果波特率为 9600，那么传输速率就是 **9600 比特每秒**（bps）。


**比特率**：每秒传输的比特数，通常用 **bps**（bits per second）表示。

**波特率与比特率的关系**：
  - 对于 **每个符号表示一个比特的通信**，波特率和比特率是相等的。
  - 在某些调制方案中，每个符号可能代表多个比特，这时波特率与比特率就不再相等。
  - 对于每秒传输 9600 个符号，每个符号传递 1 比特数据（常见的串口通信），则波特率与比特率相同。
  - 对于调制方式如 **QAM**（Quadrature Amplitude Modulation）或其他复杂的调制方案，每个符号可能包含多个比特，因此波特率可以低于比特率。

**常见波特率值:** 
300 1200 2400 4800 9600 14400 19200 38400 57600 115200 230400 460800 921600

**波特率与通信质量**
- **较高的波特率**（例如 **115200 Baud** 或更高）可以提高数据传输速度，但也容易受到噪声和干扰的影响，可能导致数据传输错误。
- **较低的波特率**（例如 **9600 Baud**）传输速度较慢，但通常更加稳定，适合较长距离或较差信号环境中的通信。


**波特率的设置**
波特率是串口通信的一个基本参数，通常在设置串口连接时进行配置。不同的设备或计算机端口可能支持不同的波特率，但通信双方（发送端和接收端）必须设置相同的波特率才能保证数据正确传输。




## termios
**termios**是 POSIX 中定义的结构体，用于保存串口的配置参数，例如波特率、校验位、数据位等

## tcflush
刷新串口的输入和输出缓冲区，确保波特率设置前清除历史数据
```cpp
tcflush(int fd, TCIOFLUSH);
```

TCIFLUSH：清除输入缓冲区
TCOFLUSH：清除输出缓冲区
TCIOFLUSH：同时清除输入和输出缓冲区


## cfsetispeed
设置options的输入波特率
```cpp
cfsetispeed(termios* options, speed_t speed);
```


## cfsetospeed
设置options的输出波特率
```cpp
cfsetospeed(termios* options, speed_t speed);
```


## tcsetattr
将更新后的配置 options 应用到串口设备 mFd
```cpp
tcsetattr(mFd, TCSANOW, &options):
```
TCSANOW 参数表示立即更改配置
TCSADRAIN：等待读取完输入缓冲区后更改
TCSAFLUSH：刷新缓冲区后更改


## fd 的定义与分配:
在调用 open() 之后，文件描述符 (fd) 是通过系统分配的，返回的值不会随后调用其他函数（tcsetattr tcgetattr write read等）而改变。文件描述符会一直保持有效，直到你调用 close(fd) 关闭它


如果成功，fd 将返回保存设备文件的系统分配的唯一的文件描述符（非负整数）
如果失败，返回 -1，同时设置 errno 来说明具体错误原因




## read 
从文件描述符 fd 关联的文件或设备中读取最多 count 字节的数据到 buf 缓冲区中
成功时返回实际读取的字节数如果返回值为 0，表示已经到达文件末尾（EOF）
出错时返回 -1，同时设置 errno
```cpp
ssize_t read(int fd, void *buf, size_t count);
```
```
# num.txt
123456789
```
```cpp
#include <unistd.h>
#include <fcntl.h>

int main() {
  int fd = open("num.txt",O_RDONLY);
  if(-1 == fd) {
    perror("open file error");
    return -1;
  }
  std::cout<<fd<<std::endl;
  char readBuf[5]{'z','z','z','z','z'};
  int readNum = 0;
  while(readNum = read(fd,readBuf,3)) {
    if(-1 == readNum) {
      perror("read func error");
      return -1;
    }
    std::cout<<readBuf<<std::flush;//只刷新不换行
  }
  std::cout<<std::endl;
  close(fd);
  return 0;
}
```
```
# 输出
123zz
456zz
789zz
```

## write
将缓冲区 buf 中的 count 字节数据写入到文件描述符 fd 关联的文件或设备中
成功时返回实际写入的字节数通常情况下，这与 count 相同
出错时返回 -1，并设置 errno
```cpp
ssize_t write(int fd, const void *buf, size_t count);
```
```cpp
const char* str = "hello world";
int fd = open("text.txt",O_WRONLY|O_CREAT|O_APPEND,0644);
write(fd, str, strlen(str));
```
**特别注意:**
- read 和 write 操作本质上是独立的，因为它们操作的是不同的缓冲区：read 从输入缓冲区读取数据。write 向输出缓冲区写入数据。

- 如果同一个 fd 被多个read或write线程共享，会影响全局的文件偏移量，导致数据竞争问题
