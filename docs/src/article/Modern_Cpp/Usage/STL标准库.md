---
titleTemplate: Modern Cpp
---
# `STL`标准库

## `STL`介绍
`STL`就是(standard template library)的简称, 定义在std命名空间中, 定义了C++常用的容器与算法等。

**在C++开发中, 可以说: 不会用`STL`的人, 会用`STL`但不懂`STL`实现原理的人, 既会使用`STL`, 又懂得`STL`实现原理的人是完完全全的三个档次。**

泛型编程的概念: 用模板进行编程, 可以实现一些其它方式难以实现的功能。

但对于新手来说, 泛型编程可能会难以理解, 摸不着头脑。也就是说, 模板是学习泛型编程的基础。

**注意: 泛型编程不属于面向对象编程的范畴, 泛型编程和面向对象编程是并列的。**

**`STL`作为泛型编程的最典型代表**, 它实现了其它编程方式难以实现的效果, 比如将整个模板库分为六个部分, 每个部分可以单独设计。

例如: vector和map在数据结构方面完全不一样, 但`STL`可以设计出`迭代器`这个模块, 让该模块可以在不同的数据结构中按照同样的方式运行。




## 为什么要学习`STL`？

_C++_ 中的 ``STL`` (_Stanard Template Library_)容器，**在很大程度上可以帮助开发者避免显式管理内存**。

``STL`` 容器如 `std::vector`, `std::list`, `std::map` 等都自动管理内存分配和释放，因此**可以有效的避免内存泄漏和悬空指针**等问题。

### 自动内存管理
使用 ``STL`` 容器时，容器会自动管理内部元素的内存分配和释放。

例如，`std::vector` 在需要时自动扩展其容器，并在销毁时释放所有分配的内存。
```cpp
std::vector<int> vec = {1, 2, 3, 4}; //自动分配内存
vec.push_back(5); // 如果容量不够，自动重新分配更多的内存
//当 vec 超出作用域时。内存会自动释放
```
### 对象的生命周期管理
``STL`` 容器中的元素以值的方式储存，这意味着当你将一个对象插入到容器中时，容器会拷贝或者是移动该对象。

当容器被销毁时，所有对象的内存都会自动释放。

例如，对于 `std::list` 或 `std::map` 这样的容器，无需担心节点或键值对的手动内存释放，容器析构时会自动清理所有的元素。
```cpp
std::list<std::string> strList = {"hello","world"};
// 不需要手动管理内存，strLsit 离开作用域是自动释放
```

### 自动分配内存
``STL`` 容器通常能够防止内存泄漏。例如，在 `std::vector` 中，当其容量不足时，会自动分配内存空间，复制旧数据并释放旧的内存。这就避免了手动管理内存带来的复杂性和错误。

### RAII (资源获取即初始化)
``STL`` 容器遵循 `RAII` 原则：当容器超出作用域时，它的析构函数就会调用，自动释放所有管理的资源（即使在异常发生时也能确保内存被释放）。
```cpp
void func(){
    std::vector<int> numbers = {1, 2, 3, 4};
    //函数结束时，numbers 自动释放，无需调用 delete
}
```


### 处理动态分配对象的容器
虽然 ``STL`` 容器可以处理内置类型和自动管理的对象类型，但如果你在容器中存储动态分配的指针，需要显式管理这些指针的生命周期。

但可以使用 智能指针与容器结合，避免手动释放指针对象的内存。
```cpp
std::vector<std::shared_ptr<int>> vec;
vec.push_back(std::make_shared<int>(10));  //使用智能指针存储动态分配的对象
//无需手动释放，智能指针会自动管理内存
```

### 异常安全性
``STL`` 容器在处理异常时也能够安全的释放资源。

即使程序在插入、删除或重新分配时抛出异常，``STL`` 容器也能够确保已经分配的内存被正确释放，不会发生内存泄漏。




## 学习`STL`的注意事项
- 学习`STL`一定要有全局观念, 不要局限于单个容器, 重点在于明白六大组件之间的联系。
- 当然, 如果只是单纯为了应付当前的业务, 单独学一下某个容器的用法也没有问题。

## 六大模块 

| 六大模块      | 容器 |迭代器 |算法 |仿函数 |适配器 |分配器 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
||container|iterator|alogorithm|functor|adaptor|allocator|




## 容器
容器是一种数据结构, 也就是真正用来存储数据的地方。

**就不讲基础的数据结构了，这些东西建议熟练之后用来提升自己。数组，链表，树，哈希表如果不明白，可以去百度一下，新手了解概念就可以了。**

| 顺序式容器 | 关联式容器 |无序式容器 |
| -------- | -------- | -------- |

其实无序式容器也是一种关联式容器, 但是既然C++标准委员会将无序容器与关联式容器平行的列了出来, 那么我们这里也就让无序式容器和关联式容器平行吧。




### 顺序容器（sequence container）：
每个元素都有固定的位置，位置取决于插入时间和地点，与元素的值无关
(1)	vector：将元素置于一个动态数组中，可以随机存储元素（也就是用索引直接存取）。

```cpp
std::vector<int>ivec = { 1, 2, 3, 4};
//强烈推荐使用at来访问
std::cout << ivec[1] << " " << ivec.at(1) << std::endl; 
```
数组尾部添加或删除元素非常迅速。但在中部或头部就比较费时。
```cpp
std::vector<int>ivec = { 1, 2, 3, 4};
ivec.push_back(1);//尾插
ivec.pop_back();//尾删
```


(2)	deque：`double end queue`的缩写，也就是双端队列。deque的实现相比于vector有些复杂，但本质仍然是优化过的动态数组，只不过相比于单纯的动态数组，在前面添加或删除元素非常快了。

可以随机存储元素。头部和尾部添加或删除元素都非常快（略慢与vector）。但在	中间插入元素比较费时（和vector差不多）。

```cpp
std::deque<int> ideque {1, 2, 3, 4};
ideque.push_front(1);
ideque.pop_front();
```

(3)	list：本质就是链表，所以自然具有了链表的属性。

**不能随机存取元素（也就是list无法用索引存取元素）**。在任何位置插入和删除元	素都比较迅速。（在任何位置插入删除元素的时间相同，在元素头部操作慢于deque，在元素尾部操作慢于deque和vector）


(4)	string：没什么好说的，就是把普通字符串封装了一下
```cpp
const char* str0 = "hello world";
std::string str("hello world");//就是把str0封装了一下
```

(5)	forward_list：单项链表，简单来说就是受限的list，凡是list不支持的功能，它都不支持。做各种支持的操作效率都会高于list，最典型的就排序算法了，forword_list要优于list。

①	ForwordList 只提供前向迭代器，而不是双向迭代器。因此它也不支持反向迭代器。
②	ForwordList不提供成员函数 size()。
③	ForwordList 没有指向最末元素的锚点。基于这个原因，不提供用以处理最末元素的成员 back(),push_back(),pop_back()。


### 关联容器（associated container）

元素位置取决于元素的值，和插入顺序无关。

(1)	set/multiset：使用`红黑树`实现，是一种高度平衡的二叉树，如果大家不了解红黑树，可以去百度一下。了解个大概就可以了。二叉树的本质决定了set/multiset的元素存取值取决于元素本身的值，和插入顺序无关。

内部元素的值依据元素的值自动排列，与插入顺序无关。set内部相同数值的元素只能出现一次，multiset内部相同数值的元素可出现多次。容器用二叉树实现，便于查找。

(2)	map/multimap：使用`红黑树`实现，是一种高度平衡的二叉树。

内部元素是成对的`key/value`，也就是`键值/实值`，内部元素依据其键值自动排序，map内部相同的键值只能出现一次，multimap则可以出现多次。

### 无序式容器（unordered container）：
(1)	unordered_map/unordered_multimap：使用`哈希表`实现的，由于哈希表的特性，实现了真正的无序。如果不理解为什么使用`哈希表`就是真正无序的，可以去百度一下`哈希表`，或者干脆直接记住就可以了。

使用方法也是`key/value`，和map/multimap类似。

(2)	unordered_set/unorder_multiset：同样使用`哈希表`实现的。自然具有了哈希表实现的容器的特点。

使用方法和setl/multiset类似。

### 关联式容器和无序式容器的对比：
(1)	关联式容器都是有序的，对于那些对顺序有要求的操作，关联式容器效率会高很多。（比如增加元素，删除元素）
(2)	无序容器都是真正的无序，在查找数据方面有着优势。（比如修改特定元素，查找元素）
(3)	从内存消耗的角度讲，无序容器要高于关联容器不过这并不重要。

一句话来说，如果从这两类容器中选一个使用的话。如果是增加，删除元素比较频繁，就使用关联式容器。如果修改元素，查找元素比较平凡，就使用无序容器。

### 我们在处理数据时应该选择什么容器呢？
(1)	在我们需要使用存储`key/value`的容器时，只能使用map/multimap/unoredered_map/unordered_multimap。如果增加删除频繁，就使用map/multimap，修改，查找频繁，就使用unordered_map/unoredered_multimap。

**在真正的大型项目中，常常会对这两种容器进行测试，普通练习靠感觉就可以了**

(2)	在处理普通元素：
①	当元素需要频繁插入删除时，选择顺序容器。
1)	如果在尾部插入删除，选择vector
2)	在头部，尾部插入删除，选择deque
3)	在中间插入，删除，选择list

②	当元素需要频繁查找时，选择.set/multiset/unorder_set/unorder_multiset。
1)	频繁增加，删除时，选set，
2)	频繁查找，修改时，选ordered_set

我们发现，对于普通元素，容器的选择不怎么容易判断。
其实在真正的大型项目中，要对各种容器进行测试的，普通练习一般选择vector或set就可以了。这两个使用是比较频繁的，
## 迭代器

**迭代器提供了种可以顺序访问容器各个元素的方法，可以无视不同容器存储方式的不同，用同一的方式访问数据。**

能够让迭代器与容器，算法在设计，使用时互不干扰，又能无缝耦合起来。

使用迭代器可以灵活操作各种容器算法，**而不需要考虑不同容器间的差异**。



## 算法
`STL`的算法可以分为九个种类，具体有什么已经在`附录一`中完全列举了。


|算法| 查找 | 排序 |删除和替换 |排列组合|算数|生成和异法|关系|集合|堆|
| -------- | -------- | -------- |-------- |-------- |-------- |-------- |-------- |-------- |-------- |

## 仿函数
就是一个可以调用`()`运算符的类对象，在 `宏、可调用对象.md` 就已经详细介绍过仿函数了。将operator()重载的类的对象就是仿函数。

简单来说，就是我们在用算法时最后一个参数需要一个可调用对象，`STL`本身已经帮我们定义了很多可调用对象，不用我们自己再去定义了。
```cpp
std::plus<int>iPlus;
std::cout << iPlus(1, 2) << std::endl;
```
这一章最好的办法就是抽出时间 到微软官网详细的看一遍
## 适配器
### 什么是容器适配器：
`适配器是使一种事物的行为类似于另外一种事物行为的一种机制`。适配器对容器进行包装，使其表现出另外一种行为。例如：`stack<int>` 实现了栈的功能，内部默认使用`deque<int>`容器来存储数据。

### `STL`的适配器有哪些：
标准库提供了三种顺序容器适配器，没有关联型容器的适配器。分别是queue（队列），priority_queue（优先级队列），stack（栈）。
### 适配器的使用：
(1)	要使用适配器，首先需要引入对应的头文件
①	要使用stack，                  需要`#include<stack>`
②	要使用queue或priority_queue，  需要`#include<queue>`


(2)	容器适配器必须有匹配的容器：如图所示
| 种类     | 默认顺序容器     | 可用顺序容器     |说明     |
| -------- | -------- | -------- | -------- |
| stack | deque | vector, deque,list	 | |
| queue | deque | list,deque |基础容器必须提供push_front()y运算 |
| priority_queue | vector | vector, deque |基础容器必须提供随机访问的功能 |


(3)	适配器的初始化：
```cpp
stack<int> stk; //普通的初始化方式：
stack<int, vector<int>> stk; //覆盖默认容器类型的初始化方式
```


## 分配器

在分配动态内存时，直接使用new，delete容易产生内存碎片化的问题。

不同的分配器有不同的分配内存的方法，可以大幅提高程序对堆内存的使用效率，我们直接使用默认的分配器就可以了

使用 new 和 delete 时，内存管理不够精细可能导致内存碎片化，因为频繁的分配和释放会在内存中留下不连续的小块可用空间。

当程序请求较大内存块时，这些小块可能无法满足需求，从而导致内存的浪费和性能问题。
