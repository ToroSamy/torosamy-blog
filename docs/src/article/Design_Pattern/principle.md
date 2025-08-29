---
titleTemplate: Design Pattern
---
# 设计原则
23 种设计模式大多是基于一系列的设计原则而构建的，目的是提高代码的可维护性、可扩展性、复用性和灵活性。以下是常见的设计原则，以及它们在设计模式中的体现

## 1. 单一职责原则（SRP - Single Responsibility Principle）
每个类应该只有一个职责，也就是说，一个类应该只有一个引起它变化的原因。这个原则强调一个类只承担一个功能或业务逻辑。

**设计模式实例**：工厂模式、策略模式、责任链模式等。
**Java代码演示**: 
```java
class User {
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}

class UserRepository {
    // 单一职责：负责用户数据的存储
    public void save(User user) {
        System.out.println("Saving user data to database");
    }
}

class EmailService {
    // 单一职责：负责发送邮件
    public void sendEmail(User user) {
        System.out.println("Sending email to " + user.getEmail());
    }
}

public class Main {
    public static void main(String[] args) {
        User user = new User("John Doe", "john.doe@example.com");
        
        // 使用不同的类处理不同的职责
        UserRepository userRepository = new UserRepository();
        userRepository.save(user);     // 保存用户数据
        
        EmailService emailService = new EmailService();
        emailService.sendEmail(user);  // 发送邮件
    }
}
```
**Cpp代码演示**
```cpp
#include <iostream>
#include <string>
using namespace std;

class User {
private:
    string name;
    string email;

public:
    User(string name, string email) : name(name), email(email) {}

    string getName() const { return name; }
    string getEmail() const { return email; }
};

class UserRepository {
public:
    // 单一职责：负责用户数据的存储
    void save(const User& user) {
        cout << "Saving user data to database" << endl;
    }
};

class EmailService {
public:
    // 单一职责：负责发送邮件
    void sendEmail(const User& user) {
        cout << "Sending email to " << user.getEmail() << endl;
    }
};

int main() {
    User user("John Doe", "john.doe@example.com");
    
    // 使用不同的类处理不同的职责
    UserRepository userRepository;
    userRepository.save(user);       // 保存用户数据
    
    EmailService emailService;
    emailService.sendEmail(user);    // 发送邮件
    
    return 0;
}

```
## 2. 开放封闭原则（OCP - Open/Closed Principle）
软件实体（类、模块、函数等）应该对扩展开放，对修改封闭。即：可以通过扩展功能来修改类的行为，而不需要直接修改已有代码。

**设计模式实例**：模板方法模式、策略模式、观察者模式等。
**Java代码演示**: 
```java
public abstract class AbstractSkin {
    public abstract void display();
}
```
```java
public class DefaultSkin extends AbstractSkin{
    @Override
    public void display() {
        System.out.println("Default Skin");
    }
}
```
```java
public class TorosamySkin extends AbstractSkin{
    @Override
    public void display() {
        System.out.println("Torosamy Skin");
    }
}
```
```java
public class TorosamyInput {
    private AbstractSkin skin;

    public void setSkin(AbstractSkin skin) {
        this.skin = skin;
    }

    public void display() {
        skin.display();
    }
}
```
```java
public class Client {
    public static void main(String[] args) {
        TorosamyInput torosamyInput = new TorosamyInput();
        torosamyInput.setSkin(new TorosamySkin());
//        torosamyInput.setSkin(new DefaultSkin());
        torosamyInput.display();
    }
}
```
**Cpp代码演示**: 
```cpp
#ifndef ABSTRACTSKIN_HPP
#define ABSTRACTSKIN_HPP

class AbstractSkin {
public:
    virtual void display() = 0;
    virtual ~AbstractSkin() = default;
};

#endif
```

```cpp
#ifndef DEFAULTSKIN_HPP
#define DEFAULTSKIN_HPP
#include "AbstractSkin.hpp"

class DefaultSkin : public AbstractSkin{
public:
    DefaultSkin() = default;
    void display() override {
      std::cout<<"Default Skin"<<std::endl;
    }
};

#endif
```

```cpp
#ifndef TOROSAMYSKIN_HPP
#define TOROSAMYSKIN_HPP
#include "AbstractSkin.hpp"

class TorosamySkin : public AbstractSkin{
public:
    TorosamySkin() = default;
    void display() override {
      std::cout<<"Torosamy Skin"<<std::endl;
    }
};

#endif
```
```cpp
#ifndef INPUTSOFT_HPP
#define INPUTSOFT_HPP
#include <memory>
#include "AbstractSkin.hpp"

class InputSoft {
public:
    void display() {
      mAbstractSkin->display();
    }
    void setSkin(const std::shared_ptr<AbstractSkin>& abstractSkin) {
      this->mAbstractSkin = abstractSkin;
    }

private:
    std::shared_ptr<AbstractSkin> mAbstractSkin;
};

#endif
```
```cpp
#include "include/DefaultSkin.hpp"
#include "include/InputSoft.hpp"
//#include "include/TorosamySkin.hpp"
int main() {
    InputSoft inpuSoft;
    inpuSoft.setSkin(std::make_shared<DefaultSkin>());
    //inpuSoft.setSkin(std::make_shared<TorosamySkin>());
    inpuSoft.display();

    return 0;
}
```


## 3. 里氏替换原则（LSP - Liskov Substitution Principle）
子类型必须能够替换父类型，且程序的行为不变。简单来说，就是派生类应当能够替换基类的对象。

**设计模式实例**：抽象工厂模式、工厂方法模式、模板方法模式等。
**Java代码演示**: 
```java
// 飞行接口
interface Flyable {
    void fly();
}

// 父类：鸟类
class Bird {
    public void eat() {
        System.out.println("Bird is eating");
    }
}

// 子类：鸽子
class Pigeon extends Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("Pigeon is flying");
    }
}

// 子类：企鹅（不能飞）
class Penguin extends Bird {
    public void swim() {
        System.out.println("Penguin is swimming");
    }
}

public class Main {
    public static void main(String[] args) {
        Bird pigeon = new Pigeon();
        if (pigeon instanceof Flyable) {
            ((Flyable) pigeon).fly();  // 输出: Pigeon is flying
        }

        Bird penguin = new Penguin();
        // Penguin 没有飞行能力
        ((Penguin) penguin).swim();  // 输出: Penguin is swimming
    }
}
```
**Cpp代码演示**: 
```cpp
#include <iostream>
using namespace std;

// 飞行接口
class Flyable {
public:
    virtual void fly() = 0;
};

// 父类：鸟类
class Bird {
public:
    void eat() {
        cout << "Bird is eating" << endl;
    }
};

// 子类：鸽子
class Pigeon : public Bird, public Flyable {
public:
    void fly() override {
        cout << "Pigeon is flying" << endl;
    }
};

// 子类：企鹅（不能飞）
class Penguin : public Bird {
public:
    void swim() {
        cout << "Penguin is swimming" << endl;
    }
};

int main() {
    Pigeon pigeon;
    pigeon.fly();  // 输出: Pigeon is flying

    Penguin penguin;
    penguin.swim();  // 输出: Penguin is swimming

    return 0;
}
```
## 4. 依赖倒置原则（DIP - Dependency Inversion Principle）
高层模块不应该依赖于低层模块，二者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象。它的核心思想是`依赖于接口，而不是具体实现`。

**设计模式实例**：工厂模式、策略模式、依赖注入（DI）模式等。
**Java代码演示**：
```java
// 抽象接口
interface Task {
    void performTask();
}

// 低层模块实现 Task 接口
class LowLevelModule implements Task {
    @Override
    public void performTask() {
        System.out.println("Low level task is being performed.");
    }
}

// 高层模块依赖于抽象接口 Task
class HighLevelModule {
    private Task task;

    public HighLevelModule(Task task) {
        this.task = task;  // 高层模块依赖于接口而不是具体实现
    }

    public void execute() {
        task.performTask();  // 调用接口方法，而不是具体实现
    }
}

public class Main {
    public static void main(String[] args) {
        Task task = new LowLevelModule();  // 可以随时替换不同的 Task 实现
        HighLevelModule highLevelModule = new HighLevelModule(task);
        highLevelModule.execute();  // 输出: Low level task is being performed.
    }
}

```
**Cpp代码演示**：
```cpp
#include <iostream>
using namespace std;

// 抽象接口
class Task {
public:
    virtual void performTask() = 0;  // 纯虚函数，定义任务执行的接口
    virtual ~Task() = default;  // 虚析构函数，防止内存泄漏
};

// 低层模块实现 Task 接口
class LowLevelModule : public Task {
public:
    void performTask() override {
        cout << "Low level task is being performed." << endl;
    }
};

// 高层模块依赖于抽象接口 Task
class HighLevelModule {
private:
    Task* task;  // 高层模块依赖于接口 Task，而不是具体实现

public:
    HighLevelModule(Task* task) : task(task) {}  // 通过构造函数注入依赖

    void execute() {
        task->performTask();  // 调用接口方法
    }
};

int main() {
    LowLevelModule lowLevelModule;  // 可以替换成其他 Task 实现
    HighLevelModule highLevelModule(&lowLevelModule);
    highLevelModule.execute();  // 输出: Low level task is being performed.
    return 0;
}

```
## 5. 接口隔离原则（ISP - Interface Segregation Principle）
一个类不应该依赖它不使用的方法。也就是说，多个特定客户端接口要比一个总接口更好。

**设计模式实例**：观察者模式、适配器模式、代理模式等。
**Java代码演示**: 
```java
// 将接口拆分成更小的接口
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

class Robot implements Workable {
    public void work() {
        System.out.println("Robot working");
    }
}

class Human implements Workable, Eatable {
    public void work() {
        System.out.println("Human working");
    }

    public void eat() {
        System.out.println("Human eating");
    }
}

public class Main {
    public static void main(String[] args) {
        Workable robot = new Robot();
        robot.work();  // 输出: Robot working

        Workable human = new Human();
        human.work();  // 输出: Human working
        Eatable humanEater = (Eatable) human;
        humanEater.eat();  // 输出: Human eating
    }
}
```
**Cpp代码演示**:
```cpp
#include <iostream>
using namespace std;

// 将接口拆分成更小的接口
class Workable {
public:
    virtual void work() = 0;
};

class Eatable {
public:
    virtual void eat() = 0;
};

class Robot : public Workable {
public:
    void work() override {
        cout << "Robot working" << endl;
    }
};

class Human : public Workable, public Eatable {
public:
    void work() override {
        cout << "Human working" << endl;
    }

    void eat() override {
        cout << "Human eating" << endl;
    }
};

int main() {
    Workable* robot = new Robot();
    robot->work();  // 输出: Robot working

    Workable* human = new Human();
    human->work();  // 输出: Human working
    Eatable* humanEater = dynamic_cast<Eatable*>(human);
    humanEater->eat();  // 输出: Human eating

    delete robot;
    delete human;

    return 0;
}

```
## 6. 合成复用原则（CRP - Composite Reuse Principle）
尽量使用对象组合，而不是继承来达到复用目的。通过组合多个对象来实现更复杂的功能，避免了继承层次的复杂性。
**设计模式实例**：组合模式、装饰器模式等。
**Java代码演示**: 
```java
// 创建显示功能接口
interface Displayable {
    void show();
}

// 实现显示功能
class Display implements Displayable {
    public void show() {
        System.out.println("Displaying...");
    }
}

// 计算机类通过组合使用显示功能
class Computer {
    private Displayable display;

    public Computer(Displayable display) {
        this.display = display;
    }

    public void compute() {
        System.out.println("Computing...");
    }

    public void show() {
        display.show();  // 通过组合来复用显示功能
    }
}

public class Main {
    public static void main(String[] args) {
        Displayable display = new Display();
        Computer computer = new Computer(display);
        computer.show();    // 输出: Displaying...
        computer.compute(); // 输出: Computing...
    }
}

```
**Cpp代码演示**: 
```cpp
#include <iostream>
using namespace std;

// 显示接口
class Displayable {
public:
    virtual void show() = 0;
};

class Display : public Displayable {
public:
    void show() override {
        cout << "Displaying..." << endl;
    }
};

// 计算机类通过组合使用显示功能
class Computer {
private:
    Displayable* display;

public:
    Computer(Displayable* display) : display(display) {}

    void compute() {
        cout << "Computing..." << endl;
    }

    void show() {
        display->show();  // 通过组合来复用显示功能
    }
};

int main() {
    Display* display = new Display();
    Computer* computer = new Computer(display);
    computer->show();    // 输出: Displaying...
    computer->compute(); // 输出: Computing...

    delete display;
    delete computer;

    return 0;
}

```

## 7. 最少知识原则（Law of Demeter）
一个对象应该对其他对象有尽可能少的了解。即：一个对象应当只与直接的朋友（其他对象）通信，而不是与陌生对象通信。
**设计模式实例**：代理模式、桥接模式、适配器模式等。
**Java代码演示**:
```java
class Address {
    private String street;
    private String city;

    public Address(String street, String city) {
        this.street = street;
        this.city = city;
    }

    public String getCity() {
        return city;
    }
}

class Person {
    private Address address;

    public Person(Address address) {
        this.address = address;
    }

    public String getCity() {
        return address.getCity();  // 通过 Person 提供的接口获取地址信息
    }
}

class Client {
    public void printCity(Person person) {
        // 遵循最少知识原则，Client 只访问 Person 提供的接口
        System.out.println(person.getCity());
    }
}

public class Main {
    public static void main(String[] args) {
        Address address = new Address("123 Main St", "New York");
        Person person = new Person(address);
        Client client = new Client();
        client.printCity(person);  // 输出: New York
    }
}
```
**Cpp代码演示**: 
```cpp
#include <iostream>
using namespace std;

// 地址类
class Address {
private:
    string street;
    string city;

public:
    Address(string street, string city) : street(street), city(city) {}

    string getCity() const {
        return city;
    }
};

// 人类
class Person {
private:
    Address* address;

public:
    Person(Address* address) : address(address) {}

    string getCity() const {
        return address->getCity();  // 通过 Person 提供的方法获取城市信息
    }
};

// 客户端类
class Client {
public:
    void printCity(Person* person) {
        // 遵循最少知识原则，Client 只访问 Person 提供的接口
        cout << person->getCity() << endl;  // 通过 Person 获取城市信息
    }
};

int main() {
    Address* address = new Address("123 Main St", "New York");
    Person* person = new Person(address);
    Client* client = new Client();
    client->printCity(person);  // 输出: New York

    delete address;
    delete person;
    delete client;

    return 0;
}

```
