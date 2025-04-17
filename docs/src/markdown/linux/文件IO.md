---
titleTemplate: Linux Markdown
---
# 文件IO
注意：我们做项目，C++的文件操作用的比较多，其次是C语言的文件操作。使用系统调用进行文件操作已经比较少了，这里只是让大家对文件操作原理有更加深刻的理解。

这门课的核心就是让大家对linux整个体系有基本的理解。

## io系统概述


#### 1.系统调用读写文件的流程
- 在实际项目中，网络部分还需要经常使用write，read函数
- 至于对普通文件的操作，还是推荐使用C++语言提供的文件操作，C语言的也可以。
- 以下是简单描述 详细见 `serial-port.md`

|	函数名|open|read|write|
| -------- | -------- | -------- |-------- |
|说明 |打开|读|写|



#### 2.lseek函数
(1)	每一个已打开的文件都有一个读写位置，在打开文件时，通常的读写位置是文件的开头。若是以附加的方式打开文件，则会指向文件的末尾。

那我们如何知道读哪里 写哪里呢 每一个文件都有一个文件指针 这个文件指针指向哪里 这个文件就读哪里写哪里 如果有O_APPEND这个文件指针则从文件末尾开始 没有就是文件开头

(2)	每一个已打开的文件都有一个读写位置, 当打开文件时通常其读写位置是指向文件开头, 若是以附加的方式打开文件(如O_APPEND), 则读写位置会指向文件尾. 当read()或write()时, 读写位置会随之增加,lseek()便是用来控制该文件的读写位置。.

(3)	下列是**典型的**使用方式，这个0表示移动位置:

|	使用方式|lseek(int fildes, 0, SEEK_SET)|lseek(int fildes, 0, SEEK_END)|lseek(int fildes, 0, SEEK_CUR)|
| -------- | -------- | -------- |-------- |
|作用 |欲将读写位置移到文件开头时|欲将读写位置移到文件尾时|想要取得目前文件位置时|


(4)	返回值：当调用成功时则返回目前的读写位置, 也就是距离文件开头多少个字节. 	若有错误则返回-1, errno 会存放错误代码

**lseek函数对于互联网用的并不多。写驱动的还是需要研究的。**

#### 3.阻塞操作和非阻塞操作
(1)	阻塞操作的定义：阻塞操作是指在执行设备操作时，若不能获得资源，则挂起进程，直到进程满足可操作的条件后再进行操作。


(2)	非阻塞操作的定义：进程在不能进行设备操作时，并不挂起，它要么放弃，要么不停的查询，直到可以进行操作。

**注意：只有对设备文件进行IO操作时才有可能发生阻塞，普通文件不是设备文件。**
**现阶段，大家只要知道有阻塞，非阻塞就可以了，阻塞，非阻塞的最典型用法在网络操作部分，到那时再讲解阻塞和非阻塞。**


# 文件的操作函数
**读普通文件进行操作的函数**
stat函数和lstat函数。其实这两个函数的作用就是获取文件的属性，使用方法非常简单。
```cpp
#include <iostream>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>

int main() {
  struct stat statBuf{};
  int statRet = stat("num.txt", &statBuf);
  //int statRet = lstat("num.txt", &statBuf);
  if(statBuf == -1) {
    perror("stat func error");
    return -1;
  }

  std::cout << statBuf.st_size << std::endl;
  return 0;
}
```

**对目录文件进行操作**
opendir、readdir、closedir函数。这三个函数主要作用就是遍历目录，用法也非常简单，我直接演示了。
```cpp
#include <iostream>
#include <sys/types.h>
#include <dirent.h>
#include <errno.h>
#include <string>
#include <filesystem>

void readDir(const std::string& dirName, unsigned blockNum) {
    DIR* dir = opendir(dirName.c_str());
    if (!dir) {
        perror("opendir error");
        return;
    }
    struct dirent* pDirent = nullptr;

    while ((pDirent = readdir(dir))) {
        const std::string& fileName = pDirent->d_name;
        if (fileName == "." || fileName == "..") continue;

        // Print indentation based on depth
        std::cout << std::string(blockNum, '\t') << "| " << fileName << std::endl;

        // If directory, recurse into it
        if (pDirent->d_type == DT_DIR) {
            std::filesystem::path childDir = std::filesystem::path(dirName) / fileName;
            readDir(childDir.string(), blockNum + 1);
        }
    }

    if (errno) {
        perror("readdir error");
    }
    closedir(dir);
}

int main() {
    readDir("./", 0);
    return 0;
}

```

总结：这节课的几个函数，使用频率都不是很高，远远比不上open，write，read，close。但还是有意义的，应该尽量掌握。




## 对文件描述符进行操作的函数
**操作文件描述符的函数**
dup函数和dup2函数通常配合在一起使用。可以理解为给文件描述符起别名。
```cpp
int main() {
  int fd = open("num2.txt", O_WRONLY | O_CREAT | O_APPEND,0644);
  if(fd == -1) {
    perror("open file error");
    return -1;
  }

  int oldfd = dup(STDOUT_FILENO);
  if(oldfd == -1) {
    perror("dup func error");
    return -1;
  }
  if(dup2(fd, STUOUT_FILENO) == -1) {
    perror("dup2 func error");
    return -1;
  }

  const char* str = "hello world";
  if(write(STDOUT_FILENO, str, strlen(str)) == -1) {
    perror("write func error");
    return -1;
  }

  if(dup2(oldfd, STUOUT_FILENO) == -1) {
    std::string errStr = std::string("dup2 func error, line num is : ") 
                       + std::to_string(__LINE__) + "file name is"
                       + __FILE__;
    perror(errStr.c_str());
    return -1;
  }
  if(write(STDOUT_FILENO, str, strlen(str)) == -1) {
    perror("write func error");
    return -1;
  }
  close(oldfd);
  close(fd);
  return 0;
}
```

**操作文件描述符的意义**
看了我刚才的代码，肯定很多人觉得操作文件描述符有什么用啊。其实操作文件描述符还是很有用的。很多函数在声明时已经确定了作用的文件描述符，此时操作文件描述符就很有意义了。**最典型的例子就文件重定向。如果大家linux系统编程做的比较多，就容易见到把文件描述符已经写死的情况，这时这两个函数就有用了。**

**总结一下part6：第一课的open，write，read函数用的是最多的，一定要会。第二课，第三课用的频率要少很多，尽量会。**
