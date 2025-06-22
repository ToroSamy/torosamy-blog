---
titleTemplate: CMake Markdown
---
# Makefile
makefile完成一些基本的功能其实是比较简单的，但当项目大后，makefile也会非常复杂，于是cmake诞生了，用cmake编译大型项目会比用makeilfe编译大型项目简单很多。

makefile没必要太过关注语法，**makefile是用来用的，实用优先**。

## 作用
在linux中，我们用g++来编译程序，但如果仅仅用g++，一旦项目体积膨胀到一定规模，g++的使用就会变的极其困难。

比如有几十个文件分布在各种目录中，用g++就会非常麻烦。单使用g++难以对项目进行各种灵活的操作，比如清除项目这类操作。

于是，makeilfe诞生了。它给了我们编译大型项目的能力。

## 工作原理

任何版本的shell都会包含了make命令，当我们执行make命令时，make就会执行makefile定义的操作。

从make的功能上讲，我们实际上可以使用make做很多事情，不只是编译项目。但从实际开发的角度讲，makefile只用于编译项目，其它的操作都有更好的方式去完成。

## 关于编写
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

## 项目结构
- 对于库：在linux中，静态库和动态库常常放在一个目录中，比如/lib目录，注意如果在一个目录中，有**同名的**静态库和动态库。**优先调用动态库。所以不要让静态库和动态库同名**。当然了，静态库和动态库放在两个目录中也是可的。
</br>

- 对于库源码，**可以给静态库源码，动态库源码两个文件夹**。比如动态库源码的文件夹叫dynamicLibSrc，静态库的源码叫staticLibSrc。
</br>
- 我们对文件的操作常常需要debug版本和release版本。如何用makeilfe熟练的实现debug，release需要条件判断语句，这部分在讲完Part13，也就是shell脚本后，大家会对条件判断有个基本概念。
网络的时候，我们的makefile会把这些功能添加进去。
</br>
- 项目中常常把中间文件放到一个单独的文件夹中，这一点以后再实现吧。