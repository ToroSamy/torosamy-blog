---
titleTemplate: Cpp Markdown
---
# namespace、typedef、using

## 命名空间
C++经常需要多个团队合作来完成大型项目。多个团队就常常出现起名重复的问题，C++就提供了命名空间来解决这个问题。
比如团队A和团队B都需要定义一个叫做Test的类。那么可以这么做
```cpp
//这是ATest.h文件
#pragma once
namespace A{
    void test();
}
```
```cpp
//这是ATest.cpp文件
#include "ATest.h"
#include <iostream>
namespace A{
    void test() {
        std::cout<< "A::()"<<std::endl;
    }
}
```
```cpp
//这是BTest.h文件
#pragma once
namespace B{
    void test();
}
```
```cpp
//这是BTest.cpp文件
#include "BTest.h"
#include <iostream>
namespace B{
    void test() {
        std::cout<< "B::()"<<std::endl;
    }
}
```

```cpp
//这是main.cpp
#include <iostream>
#include "ATest.h"
#include "BTest.h"

int main() {
    A::test();
    B::test();
    return 0;
}
```

**命名空间的实现原理: C++最后都要转化为C来执行程序。在namespace A中定义的Test类，其实全名是A::Test。**

C++所有特有的库（指c没有的库）,都使用了std的命名空间。比如最常用的iostream。




## typedef

#### 特性
||#define|typedef|
|--------|--------|--------|
|创建的符号受限范围|类型和值|类型|
|解释|预处理器|编译器|

|typedef定义在|函数中|函数外|
|--------|--------|--------|
|typedef具有|局部作用域|文件作用域|

#### 语法
```c
typedef unsigned char BYTE;
BYTE x, y[10], *z;
```
#### 应用场景
- 方便tine_t、size_t等类型 在不同系统代表不同类型
- 简化书写的类型，例如
```c
//把FRPTC 声明为一个函数类型 该函数返回一个指针
//该指针指向内含5个char类型元素的数组
typedef char (*FRPTC()) [5];
```


## using关键字
using关键字设计的目的之一就是为了简化命名空间的。using关键字在命名空间方面主要有两种用法。
1. using 命名空间::变量名
这样以后使用此变量时只要使用变量名就可以了。
2. using namspce 命名空间
这样，每一个变量都会在该命名空间中寻找。
**所以，头文件中一定不能使用using关键字。会导致命名空间的污染。**