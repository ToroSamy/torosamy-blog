---
titleTemplate: Linux Markdown
---
# 库与makefile
## C++文件的编译过程
C++文件的编译过程可以简单的分为两个阶段
#### 一、从.cpp文件到.o文件，这是一个文件的变化
只不过这个过程又可以继续划分为3个阶段 命令: `g++ -c  filename.cpp`
- **预处理阶段**：将include语句替换为对应的头文件，对所有的宏进行处理

- **编译阶段**：编译阶段是整个编译过程（从cpp文件到最终可执行程序的过程）**最耗费时间的阶段**，将cpp文件变为汇编文件（也就是.s文件）。
- **汇编阶段**：将汇编文件变为二进制文件（也就是.o文件）


#### 二、将多个.o文件整合为一个可执行文件
其实大家只要记住一个命令就可以了： `g++ filename1.o filename2.o -o executableFile`

总结：C++的编译过程就这么简单，这节课有意义的知识点只有那两个命令，再了解一下这几个步骤，就可以了。

## 静态库，动态库


### 一、C++动态库
cout是ostream类的对象，ostream类的声明部分在iostream中，那ostream的实现部分在哪里呢？
答案是，在C++动态库中。至于动态库究竟是什么，我们实际看一下。


```bash
# 编译test
g++ main.cpp add.cpp sub.cpp -o test 
# 查看可执行文件所需要的动态链接库
ldd test # 输出libstdc++.so.6 => /lib/x86-64-linux-gnu/libstdc++.so.6
# 查看链接
ls -l libstdc++.so.6 # 输出libstdc++.so.6 => libstdc++.so.6.0.28
```
看到libstdc++.so.6是个软链接 这个软链接指向的才是cpp真正的动态运行库 如果我们要升级cpp版本 我们只需要下载好最新版本的动态运行库 让这个指向新的动态运行库就可以了

### 二、我们为什么要使用库
- 很多时候，一套源代码是非常宝贵的，我们并不想让他人知道实现部分。我们可以只给他人提供一个头文件，也就是调用接口。而将实现部分（也就是对应的cpp文件）编译为二进制文件（二进制文件人类无法阅读），实现部分在被编译为二进制文件后，就被称为库。
- 很多时候，我们并不想让别人修改我们已经写好的代码，我们可以给他人提供已经编译好的库，这样既加快了程序的编译或执行速度，又防止他人修改代码。
- 基于这两点，库是被大范围使用的，比如C++的标准库。


### 三、静态库和动态库介绍
**C++的库又被分为两种，静态库，动态库。动态库在C++程序中是经常使用的，一定要理解动态库的工作原理并且会制作它。静态库的使用频率要比动态库低一些，但工作原理和制作流程还是要尽量掌握的。**
**动态库**：
- 动态库的定义：动态库是程序执行时才会连接的库，也就是说，程序如果缺乏动态库，那么仍然是可以编译的，只不过在执行时会出现找不到定义的错误。
- 每个进程都有动态库链接区，这个区就是存储程序在编译时链接的动态库的。

**静态库**：
- 静态库的定义：静态库是在程序编译时就会被整合进最终可执行文件的库。程序如果缺乏静态库，那么根本无法编译，在编译期就会报错。

**如果大家看过上一门课，就是那个C++语法，应该还对vld的安装，配置有	印象，大家可以回去试一下动态库和静态库的特性。**

### 四、静态库动态库的对比：
**使用静态库得到的程序体积要比动态库大很多**：
- 静态库是在编译期被整合进可执行程序的，每有一个地方调用静态库，就要将静态库整合进去，所以如果这个库被频繁调用的话，会导致整个可执行文件大的离谱。
- 动态库只有在可执行文件执行时才会被加载，也就是说动态库只加载了一次。

**使用动态库的程序在启动时要比静态库慢一些**：
- 动态库在执行时才会加载，而静态库在编译时就加载了，所以使用动态库自然会慢一些。

**总结：一般我们都使用动态库，比如C++运行库，当然，如果有些程序被加载的次数很少，且比较追求启动时的效率，也可以使用静态库。**

### 五、静态库，动态库的制作与使用：

- 动态库，静态库的制作流程不要死记硬背，要理解。
- 其实很好理解，库的本质就是对头文件的实现部分进行封装
- 第一步自然是对.cpp文件编译为.o文件了
- 第二步就是对.o文件封装为库，因为库的封装方式不同，所以使用方式就自然有些区别


#### 动态库的制作与使用：
```bash
g++  -fPIC  -shared  fileName.cpp  -o libFileName.so
g++  main.cpp  -L ./  -l sub -o test
```

PIC是 Position Independent Code 的缩写，表示要生成位置无关的代码，这	是动态库需要的特性； -shared告诉g++生成动态库而不是可执行文件。


在生成可执行文件后，我们执行该可执行文件后，发现文件无法执行，**会报找不到动态库的错误**。为什么呢，动态库明明就在这个目录啊！

**这和动态库的设计理念有关系，动态库的设计理念这样就是将动态库集中在几个目录中，这样方便管理。比如C++程序常用的io库，stl库就作为动态库存放在固定目录中。**

**如果通过-L来指定目录，那么容易导致库的存储混乱，带来各种麻烦，比如程序的部署就是个大问题。**


于是，进程在需要加载动态库时，会到以下路径寻找动态库，找不到就报错了，我们需要把动态库拷贝到那些路径可以找到的地方。
进程在加载动态库时，会按照优先级从高到低的顺序在以下路径依次寻找。

##### 1.在生成可执行文件时指定动态库的存放路径
> ```bash
> g++ main.cpp sub.cpp -L ./ -ladd -Wl,-rapt=./ -o test
> ```
> **一般不推荐使用，容易导致动态库的存放混乱。知道有这么个方法就可以了。**

##### 2.修改环境变量：
> ```bash
> export LD_LIBRARY_PATH = $LD_LIBRARY_PATH:libPath
> ```
> **这种方法最简单，但只可以作为临时的设置方式。如果修改配置文件使其长期生效当然可以，但这种修改配置文件的方式不推荐，如果大家有兴趣，可以百度一下，非常简单。**


##### 3.在/lib，/usr/lib目录中查找动态库。
> - 我们直接将动态库复制到这两个目录中当然是可以的。
> - 但是/lib目录下存放的动态库大都是系统级别的，比如C++标准库
> - 我们自己的动态库一般不会直接拷贝到/lib目录中。

##### 4.在/etc/ld.so.config文件中添加动态库路径
> -	sudo vim /etc/ld.so.conf
> -	在文件最后行添加路径
> -	保存并退出文件后再 sudo ldconfig
> - 在做项目时，可以在/usr/local下创建一个目录。
> - 然后将这个目录添加到/etc/ld.so.config文件中。



**这四种方法：3用的最少，1偶尔会用，2，4用的都比较普遍。短期内设置路径就用2，长期设置路径，就用4。**



#### 静态库的制作与使用：
静态库虽然使用频率和动态库比要低一些，但仍然是最好要掌握的，

```bash
# 静态库的制作：
g++ -c *.cpp # 将.cpp 文件生成对应的.o文件。
ar  rcs libxxx.a  *.o # 使用ar工具将多个.o文件生成一个静态库，
```

ar工具是什么，rcs参数什么意思都不用管，这么记住就可以了。

```bash
# 静态库的使用
g++ main.cpp -L./ -lxxx -o test   
```
这样最终可执行程序就制作完毕了，因为静态库直接被编译在最终可执行程序中，所以不需要考虑链接路径的问题。


总结：这节课的东西稍微有点多，也比较麻烦，我光文档就写了好久，大家如果比较迷惑的话就多看几遍，看懂为止，这些真的很重要。



## Makefile
makefile完成一些基本的功能其实是比较简单的，但当项目大后，makefile也会非常复杂，于是cmake诞生了，用cmake编译大型项目会比用makeilfe编译大型项目简单很多。

等到网络课程，就会讲解cmake。到时可以看一看cmake和makefile的区别。

makefile没必要太过关注语法，**makefile是用来用的，实用优先**。
### 一、makefile介绍：
**为什么要有makeifle：**
- 在linux中，我们用g++来编译程序，但仅用g++也有很大的缺陷。
- 如果仅仅用g++，一旦项目体积膨胀到一定规模，g++的使用就会变的极其困难。
- 比如有几十个文件分布在各种目录中，用g++就会非常麻烦。
- 单使用g++难以对项目进行各种灵活的操作，比如清除项目这类操作。
- 于是，makeilfe诞生了。它给了我们编译大型项目的能力。

**makefile的工作原理：**

任何版本的shell都会包含了make命令，当我们执行make命令时，make就会执行makefile定义的操作。

从make的功能上讲，我们实际上可以使用make做很多事情，不只是编译项目。但从实际开发的角度讲，makefile只用于编译项目，其它的操作都有更好的方式去完成。

### 二、如何编写makefile：
关于makefile的编写，有人专门去读介绍makefile的书，这完全没有必要，我接下来的讲的知识已经足够完成95%的任务，剩下的真遇到了去百度一下就可以了。



**1.基础规则**
```makefile
target: dependence
  command
```
```makefile
test:./src/main.cpp ./src/add.cpp ./libSrc/sub.cpp
  g++ ./src/main.cpp ./src/add.cpp ./libSrc/sub.cpp -o test
```

**2.伪目标**
加上伪目标后，表示这是一个target，而非要使用的文件
```makefile
.PHONY:clean
clean:
    rm test
```
**3.用.o文件来生成最终可执行文件**

在讲为什么要这样优化之前，先讲一下makefile的一个工作机制，对于那个最基础规则。

如果我们发现target的时间比dependence更早，或dependence不存在。
就会执行该命令，当dependence不存在时，指令无法执行，就会向下去查找。

待该dependence生成后，再来执行该指令。

如果全用.cpp的话，只要有个.cpp发生了错误需要修改，那么。所有的.cpp到.o都得编译一下。
就会非常耗费时间。毕竟.cpp到.o才最耗费时间的编译过程。

用.o的话有一个.cpp出现了错误，只要更改那一个.cpp即可。这样的话就提高程序的运行效率。

```makefile
test:./src/main.o ./src/add.o ./libSrc/sub.o
  g++ ./src/main.o ./src/add.o ./libSrc/sub.o -o test

.PHONY:clean
clean:
    rm test ./src/main.o ./src/add.o ./libSrc/sub.o
```

**4.给makefile添加变量**

```makefile
target=test
obj=./src/main.o ./src/add.o ./libSrc/sub.o
cc=g++

$(target):$(obj)
  $(cc) $(obj) -o $(target)

.PHONY:clean
clean:
    rm $(target) $(obj)
```

**5.模式匹配**
-	%代表每一个，*代表所有。
-	$@ 表示目标，$<表示第一个依赖，$^表示全部的依赖


**6.两个函数**
- wildcard函数：  $(wildcard  ./*.cpp)     获取当前目录下所有的cpp文件
- patsubst函数：  $(patsubst  %.cpp，%.o，./*.cpp) 将对应的cpp文件名全部替换为.o文件名。

```makefile
target=test
src=$(wildcard ./src/*.cpp ./libSrc/*.cpp)
obj=$(patsubst %.cpp, %.o, $(src))
cc=g++

$(target):$(obj)
  $(cc) $^ -o $@

.PHONY:clean
clean:
    rm $(target) $(obj)
```

**7.动态链接库**
链接库下的makefile
```makefile
target=libsub.so
cc=g++
src=$(wildcard *.cpp)
obj=$(patsubst %.cpp, %.o, $(src))

lib_path=../lib

$(target):$(obj)
  $(cc) -shared $^ -o $@
  mv $(target) $(lib_path)/

%.o:$.cpp
  $(cc) -fPIC -c $^

.PHONY:clean
clean:
    rm $(obj) $(lib_path)/$(target)
```
main.cpp下的makefile
```makefile
target=test
src=$(wildcard ./src/*.cpp)
obj=$(patsubst %.cpp, %.o, $(src))
cc=g++

lib_path=./lib
lib_src_path=./libSrc

$(target):$(obj)
  $(cc) $^ -L$(lib_path) -lsub -o $@

.PHONY:clean
clean:
    rm $(target) $(obj)
```


**8.引入其它makefile**
```makefile
target=test
src=$(wildcard ./src/*.cpp)
obj=$(patsubst %.cpp, %.o, $(src))
cc=g++

lib_path=./lib
lib_src_path=./libSrc

$(target):$(obj)
  cd $(lib_src_path) && make && cd ../
  $(cc) $^ -L$(lib_path) -lsub -o $@

.PHONY:clean
clean:
    cd $(lib_src_path) && make clean && cd ../
    rm $(target) $(obj)
```

makefile暂时掌握这些就可以了，其实makeilfe还是有很多可以优化的。


### 三、项目结构
- 对于库：在linux中，静态库和动态库常常放在一个目录中，比如/lib目录，注意如果在一个目录中，有**同名的**静态库和动态库。**优先调用动态库。所以不要让静态库和动态库同名**。当然了，静态库和动态库放在两个目录中也是可的。
</br>

- 对于库源码，**可以给静态库源码，动态库源码两个文件夹**。比如动态库源码的文件夹叫dynamicLibSrc，静态库的源码叫staticLibSrc。
</br>
- 我们对文件的操作常常需要debug版本和release版本。如何用makeilfe熟练的实现debug，release需要条件判断语句，这部分在讲完Part13，也就是shell脚本后，大家会对条件判断有个基本概念。
网络的时候，我们的makefile会把这些功能添加进去。
</br>
- 项目中常常把中间文件放到一个单独的文件夹中，这一点以后再实现吧。

除了这四点，还有很多可以优化的。不过这些最好在讲完Part13后再学。完整版本的就等到网络再做吧。

总结：makeilfe很重要，但是其实东西并不多。这节课讲的已经可以完成基本功能了，这些大家一定要学会。


