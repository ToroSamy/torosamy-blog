
```java
int imperativeSum = 0;
for (int i = 0; i < 100; i++) {
    imperativeSum += i;
}
System.out.println("Sum using Imperative Approach : " + imperativeSum);
```
在以上代码示例中 我们通过修改变量来得到结果 如果我们在多线程中使用这段代码可能会遇到各种问题
从代码的可读性来看 你需要一行一行阅读代码 这会导致有些用例可能会导致编写复杂的代码
```java        
int declarative = IntStream.range(0, 100).sum();
System.out.println("Sum using Declarative Approach : " + declarative);
```
这段代码是显式调用 而且这段代码你只需要调用并行版本即可 而不需要创建线程
```java
int declarative = IntStream.range(0, 100)
        .parallel() // 并行
        .sum();
System.out.println("Sum using Declarative Approach : " + declarative);
```


```java
List<Integer> integerList = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

List<Integer> uniqueList = new ArrayList<>();
for (Integer integer : integerList) {
    if(!uniqueList.contains(integer)) {
        uniqueList.add(integer);
    }
}
System.out.println("Imperative Approach: " + uniqueList);
```
Declarative Approach中我们不需要关心如何实现的 这就是声明式编程的优势
我们只需要适当的调用函数即可 他将执行工作并给您提供想要的结果
```java
List<Integer> integerList = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

List<Integer> uniqueList = integerList.stream()
        .distinct()
        .collect(Collectors.toList());
System.out.println("Declarative Approach: " + uniqueList);
```



What is Lambda Expression
在java8之前 你需要这样做
```java
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        System.out.println("Inside Runnable");
    }
};

new Thread(runnable).start();
```
java6加入lambda之后 你可以使用以下3种方法
```java
Runnable runnable1 = () -> {
    System.out.println("Inside Runnable Lambda 1");
};
new Thread(runnable1).start();

Runnable runnable2 = () -> System.out.println("Inside Runnable Lambda 2");
new Thread(runnable2).start();


new Thread(() -> System.out.println("Inside Runnable Lambda 3")).start();
```

```java
public class Main {
    public static void main(String[] args) {
        Comparator<Integer> comparator = new Comparator<>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o1.compareTo(o2);
            }
        };

        System.out.println("Result of the comparator is : " + comparator.compare(3,2));

        Comparator<Integer> comparator1 = Integer::compareTo;
        //Comparator<Integer> comparator1 = (Integer a, Integer b) -> a.compareTo(b);
        System.out.println("Result of the comparator using Lambda 1 is : " + comparator1.compare(3,2));

        Comparator<Integer> comparator2 = Integer::compareTo;
        //Comparator<Integer> comparator2 = (a,b)-> a.compareTo(b);
        System.out.println("Result of the comparator using Lambda 2 is : " + comparator2.compare(3,2));
    }
}
```
优点显而易见 lambda 让你编写更简单的代码





进行案例前我们需要先添加以下代码
```java
@Getter
@Setter
public class Student {
    private String name;
    private int gradeLevel;
    private double gpa;
    private String gender;
    List<String> activities = new ArrayList<>();

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", gradeLevel=" + gradeLevel +
                ", gpa=" + gpa +
                ", gender='" + gender + '\'' +
                ", activities=" + activities +
                ", noteBooks=" + noteBooks +
                ", bike=" + bike +
                '}';
    }
    private int noteBooks;
    private Optional<Bike> bike = Optional.empty();

    public Student(String name, int gradeLevel, double gpa, String gender, List<String> activities, int noteBooks) {
        this.name = name;
        this.gradeLevel = gradeLevel;
        this.gpa = gpa;
        this.gender = gender;
        this.activities = activities;
        this.noteBooks = noteBooks;
    }

    public Student(String name, int gradeLevel, double gpa, String gender, List<String> activities) {
        this.name = name;
        this.gradeLevel = gradeLevel;
        this.gpa = gpa;
        this.gender = gender;
        this.activities = activities;
    }

    public Student() {

    }

    public Student(String s) {
        this.name=s;
    }
}
```

```java
public class StudentDataBase {

    public static Supplier<Student> studentSupplier = () -> {
        Bike bike = new Bike();
        bike.setName("ABC");
        bike.setModel("XYZ");
       Student student = new Student("Adam",2,3.6, "male",Arrays.asList("swimming", "basketball","volleyball"));
       student.setBike(Optional.ofNullable(bike));
       return student;
    };

    public static List<Student> getAllStudents(){
        Student student1 = new Student("Adam",2,3.6, "male",Arrays.asList("swimming", "basketball","volleyball"),11);
        Student student2 = new Student("Jenny",2,3.8,"female", Arrays.asList("swimming", "gymnastics","soccer"),12);
        Student student3 = new Student("Emily",3,4.0,"female", Arrays.asList("swimming", "gymnastics","aerobics"),10);
        Student student4 = new Student("Dave",3,3.9,"male", Arrays.asList("swimming", "gymnastics","soccer"),9);
        Student student5 = new Student("Sophia",4,3.5,"female", Arrays.asList("swimming", "dancing","football"),15);
        Student student6 = new Student("James",4,3.9,"male", Arrays.asList("swimming", "basketball","baseball","football"),14);

        List<Student> students = Arrays.asList(student1,student2,student3,student4,student5,student6);
        return students;
    }

}
```

```java
public class Main {
    public static void main(String[] args) {
        Consumer<String> out = (s) -> System.out.println(s.toUpperCase());
        out.accept("Torosamy");
        printStudents();
        printNameAndActivities();
    }

    public static void printStudents() {
        //Consumer<Student> c2 = (s) -> System.out.println(s);
        Consumer<Student> c = System.out::println;
        List<Student> students = StudentDataBase.getAllStudents();
        students.forEach(c);
    }

    public static void printNameAndActivities() {
        Consumer<Student> c1 = (student -> System.out.print(student.getName()));

        Consumer<Student> c2 = (student -> System.out.println(student.getActivites()));

        List<Student> students = StudentDataBase.getAllStudents();
        students.forEach(c1.andThen(c2)); //consumer chaining
    }
}
```

现在我要进行一些额外操作 比如如果年级大于3.0 我将执行一些过滤操作
但其实以上代码是存在一些问题的 我们会重复代码 代码重复导致代码质量低下 将引发错误和问题
```java
public class Main {
    static Consumer<Student> c2 = System.out::println;
    static Consumer<Student> c3 = (student -> System.out.print(student.getName()));
    static Consumer<Student> c4 = (student -> System.out.println(student.getActivites()));

    public static void main(String[] args) {
        Consumer<String> out = (s) -> System.out.println(s.toUpperCase());
        out.accept("Torosamy");
        //printStudents();
        printNameAndActivities();
        printNameAndActivitiesUsingCondition();
    }

    public static void printStudents() {
        List<Student> students = StudentDataBase.getAllStudents();
        students.forEach(c2);
    }

    public static void printNameAndActivities() {
        System.out.println("printNameAndActivities : ");
        List<Student> students = StudentDataBase.getAllStudents();
        students.forEach(c3.andThen(c4));
    }

    public static void printNameAndActivitiesUsingCondition() {
        System.out.println("printNameAndActivitiesUsingCondition : ");
        List<Student> students = StudentDataBase.getAllStudents();
        students.forEach(student ->{
            if (student.getGradeLevel() >= 3 && student.getPga() > 3.9) {
                c3.andThen(c4).accept(student);
            }
        });
    }
}
```
如果你想在代码中 如果你想在代码中重复使用下面的一种条件来处理不同的情况的话 当前的设置是无法实现的 我们需要再次复制代码 所以以上代码还可以再改进


# 双向消费者功能接口
```java
public class Main {
    public static void nameAndActivites() {
        BiConsumer<String,List<String>> biConsumer = (name, activities) -> {
            System.out.println(name + " : " + activities);
        };

        List<Student> allStudents = StudentDataBase.getAllStudents();
        allStudents.forEach(student -> {biConsumer.accept(student.getName(),student.getActivites());});
    }
    public static void main(String[] args) {
        BiConsumer<String,String> biConsumer = (a,b) -> {
            System.out.println("a : "+a + ", b : " + b);
        };
        biConsumer.accept("java7","java8");

        BiConsumer<Integer,Integer> multiplier = (a,b) -> {
            System.out.println("Multiplication is : " + a*b);
        };
        BiConsumer<Integer,Integer> divisor = (a,b) -> {
            System.out.println("Division is : " + a/b);
        };
        multiplier.andThen(divisor).accept(10,5);
        nameAndActivites();
    }
}
```
你现在知道区别了吗 何时由消费者使用 何时使用消费者

如果你觉得这2个条件可以结合起来成为一个属性。单实例本身, 然后由消费者使用
如果你认为将其放在一个单独的消费者功能接口中更有价值 你可以使用第一个

将性能问题或其他问题与消费者之间的比较进行对照是没有好处的

```java
public class Main {
    static Predicate<Integer> p1 = (i) -> i % 2 == 0;
    static Predicate<Integer> p2 = (i) -> i % 5 == 0;

    public static void predicateAnd() {
        System.out.println("predicate And Result is : " +p1.and(p2).test(10));
        System.out.println("predicate And Result is : " +p1.and(p2).test(9));
    }

    public static void predicateOr() {
        System.out.println("predicate Or Result is : " +p1.or(p2).test(10));
        System.out.println("predicate Or Result is : " +p1.or(p2).test(8));
    }

    public static void predicateNegate() {
        System.out.println("predicate Negate Result is : " +p1.or(p2).negate().test(8));
    }

    public static void main(String[] args) {
        System.out.println(p1.test(4));
        predicateAnd();
        predicateOr();
        predicateNegate();
    }
}

```
这些就是谓词接口的一部分方法 接下来我们将探索学生数据库 

```java
public class Main {
    static Predicate<Student> p1 = (s) -> s.getGradeLevel() >= 3;
    static Predicate<Student> p2 = (s) -> s.getPga() > 3.9;

    public static void filterStudentsByGpa() {
        System.out.println("filterStudentsByGpa : ");
        List<Student> students = StudentDataBase.getAllStudents();
        students.forEach(student -> {
            if(p2.test(student)) System.out.println(student);
        });
    }

    public static void filterStudents() {
        System.out.println("filterStudents : ");
        List<Student> students = StudentDataBase.getAllStudents();
        students.forEach(student -> {
            if(p1.and(p2).test(student)) System.out.println(student);
        });
    }

    public static void main(String[] args) {
        filterStudentsByGpa();
        filterStudents();
    }
}
``` 


接下来 我们将结合谓词和消费者功能接口
```java
public class Main {
    Predicate<Student> p1 = (s) -> s.getGradeLevel() >= 3;
    Predicate<Student> p2 = (s) -> s.getPga() >= 3.9;

    BiConsumer<String,List<String>> studentBiConsumer = (name,activities) -> System.out.println(name + ": " + activities);

    Consumer<Student> studentConsumer = (s) -> {
        if(p1.and(p2).test(s)) {
            studentBiConsumer.accept(s.getName(),s.getActivites());
        }
    };

    public void printNameAndActivities(List<Student> students) {
        students.forEach(studentConsumer);
    }


    public static void main(String[] args) {
        List<Student> students = StudentDataBase.getAllStudents();
        new Main().printNameAndActivities(students);
    }
}
```
这种代码的优势是完全模块化的 因此非常容易修改功能

# BiPredicate
```java
public class Main {
    BiPredicate<Integer,Double> biPredicate = (gradeLevel,gpa) -> gradeLevel >= 3;
    BiConsumer<String,List<String>> studentBiConsumer = (name,activities) -> System.out.println(name + ": " + activities);

    Consumer<Student> studentConsumer = (student) -> {
        if(biPredicate.test(student.getGradeLevel(),student.getPga())) {
            studentBiConsumer.accept(student.getName(),student.getActivites());
        }
    };

    public void printNameAndActivities(List<Student> students) {
        students.forEach(studentConsumer);
    }
    
    public static void main(String[] args) {
        List<Student> students = StudentDataBase.getAllStudents();
        new Main().printNameAndActivities(students);
    }
}
```
概括来说 通过谓词接收2个参数并执行某种操作 操作的运行结果取决于传递给为此实力的输入是什么
他将返回一个布尔值作为结果


```java
public class Main {
    //static Function<String,String> function = (name) -> name.toUpperCase();
    static Function<String,String> function = String::toUpperCase;
    static Function<String,String> addSomeString = (name) -> name.toUpperCase().concat("default");

    public static void main(String[] args) {
        System.out.println("Result is : "+function.apply("java8"));
        System.out.println("Result of addthen is : "+function.andThen(addSomeString).apply("java8"));
        System.out.println("Result of compose is : "+function.compose(addSomeString).apply("java8"));
    }
}
```
接下来我们将学生示例来探索函数接口
```java
public class MyPredicate {
    public static Predicate<Student> p1 = (s) -> s.getGradeLevel() >= 3;
    public static Predicate<Student> p2 = (s) -> s.getPga() >= 3.9;
}
```

```java
public class Main {
    static Function<List<Student>,Map<String,Double>> studentFunction = (students -> {
        Map<String,Double> studentGradeMap = new HashMap<>();
        students.forEach(student -> {
            if (MyPredicate.p1.test(student)) {
                studentGradeMap.put(student.getName(),student.getPga());
            }
        });
        return studentGradeMap;
    });

    public static void main(String[] args) {
        System.out.println(studentFunction.apply(StudentDataBase.getAllStudents()));
    }
}
```

```java
public class Main {
    static BiFunction<List<Student>,Predicate<Student>,Map<String,Double>> biFunction = ((students,studentPredicate)-> {
        Map<String,Double> studentGradeMap = new HashMap<>();
        students.forEach(student -> {
            if(studentPredicate.test(student)) {
                studentGradeMap.put(student.getName(),student.getPga());
            }
        });
        return studentGradeMap;
    });

    public static void main(String[] args) {
        System.out.println(biFunction.apply(StudentDataBase.getAllStudents(),MyPredicate.p1));
    }
}
```

让我们继续来看看一元和二元操作符函和数接口
一元
```java
public class Main {
    static UnaryOperator<String> unaryOperator = (s) -> s.concat("Default");

    public static void main(String[] args) {
        System.out.println(unaryOperator.apply("java8"));
    }
}
```

二元
```java
public class Main {
    //static Comparator<Integer> comparator = (a,b)->a.compareTo(b);
    static Comparator<Integer> comparator = Integer::compareTo;

    public static void main(String[] args) {
        BinaryOperator<Integer> binaryOperator = (a, b) -> a * b;
        System.out.println(binaryOperator.apply(3,4));

        BinaryOperator<Integer> maxBy = BinaryOperator.maxBy(comparator);
        System.out.println("Result of maxBy is : " + maxBy.apply(3,4));

        BinaryOperator<Integer> minBy = BinaryOperator.minBy(comparator);
        System.out.println("Result of minBy is : " + minBy.apply(3,4));
    }
}

```

Supplier
```java
public class Main {

    public static void main(String[] args) {
        Supplier<Student> studentSupplier = () -> {
            return new Student(2,"Adam",3.6,"male",Arrays.asList("swimming","basketball","volleyball"));
        };

        Supplier<List<Student>> listSupplier = StudentDataBase::getAllStudents;

        System.out.println("Student is : " + studentSupplier.get());

        System.out.println("Students are : " + listSupplier.get());
    }
}
```

不可以使用方法引用和可以使用的情况 上述已经出现过
我来看一下构造器引用
```java
public class Main {

    static Supplier<Student> studentSupplier = Student::new;
    static Function<String,Student> studentFunction = Student::new;

    public static void main(String[] args) {
        System.out.println(studentSupplier.get());
        System.out.println(studentFunction.apply("ABC"));
    }
}
```

接下来 我们将讨论局部变量及其与Lambda表达式的限制
- 你不得使用与Lambda参数相同的名字作为局部变量名 或者在里面使用同样的局部变量名
- 你不得在lambda表达式中将一个新的值分配给局部变量
- 变量和类变量则没有任何限制
# Introduction to Streams
```java
public class StreamsExample {

    public static void main(String[] args) {

        //student name and there activities in a map
        Predicate<Student> studentPredicate = (student -> student.getGradeLevel()>=3);
        Predicate<Student> studentgpaPredicate = (student -> student.getGpa()>=3.9);


        Map<String,List<String>> studentMap = StudentDataBase.getAllStudents().parallelStream()
                .filter(studentPredicate)
                .filter(studentgpaPredicate)
                .collect(Collectors.toMap(Student::getName,Student::getActivities));

        System.out.println(studentMap);
    }
}
```
## Collections Vs Stream
```java
public class CollectionsVsStream {
    public static void main(String[] args) {

        ArrayList<String> names = new ArrayList<>();
        names.add("adam");
        names.add("jim");
        names.add("jenny");

        for(String name : names){
            System.out.println(name);
        }

        for(String name : names){
            System.out.println(name);
        }

        names.remove(0);

        System.out.println(names);

        Stream<String> nameStream = names.stream();
        nameStream.forEach(System.out::println);
       // nameStream.forEach(System.out::println);


    }
}
```
## How to debug Stream Operations
```java
public class StreamsExample {

    public static void main(String[] args) {

        //student name and there activities in a map
        Predicate<Student> studentPredicate = (student -> student.getGradeLevel()>=3);
        Predicate<Student> studentgpaPredicate = (student -> student.getGpa()>=3.9);


        Map<String,List<String>> studentMap = StudentDataBase.getAllStudents().stream()
                .peek((student -> {
                    System.out.println(student);
                }))
                .filter(studentPredicate) //Stream<Students>
                .peek((student -> {
                    System.out.println("after 1 st filter " + student);
                }))
                .filter(studentgpaPredicate)//Stream<Students>
                .peek((student -> {
                    System.out.println("after 2 nd filter " + student);
                }))
                .collect(Collectors.toMap(Student::getName,Student::getActivities)); //<Map>

        System.out.println(studentMap);

    }
}
```
## map()
```java
public class StreamsMapExample {
    public static List<String> namesList(){
        List<String> studentList = StudentDataBase.getAllStudents().stream() //Stream<Student>
                //Student as an input -> Student Name
                .map(Student::getName) //Stream<String>
                .map(String::toUpperCase) //Stream<String> -> uppercase operation on each input
                .collect(toList()); //List<String>

        return studentList;
    }
    public static Set<String> namesSet(){

        Set<String> studentList = StudentDataBase.getAllStudents().stream() //Stream<Student>
                //Student as an input -> Student Name
                .map(Student::getName) //Stream<String>
                .map(String::toUpperCase) //Stream<String> -> uppercase operation on each input
                .collect(toSet()); //Set<String>

        return studentList;

    }

    public static void main(String[] args) {
        System.out.println(namesList());
        System.out.println(namesSet());

    }
}
```
## flatMap()
```java
public class StreamsFlatMapExample {

    public static List<String> printStudentActivities(){

        List<String> studentActivities = StudentDataBase.getAllStudents().stream() //Stream<Student>
                .map(Student::getActivities) //Stream<List<String>
                .flatMap(List::stream) //Stream<String>
                .collect(toList());

        return studentActivities;
    }


    public static void main(String[] args) {

        System.out.println("printStudentActivities : " + printStudentActivities());
    }
}
```
## distinct count sorted
```java
public class StreamsFlatMapExample {

    public static List<String> printStudentActivities(){

        List<String> studentActivities = StudentDataBase.getAllStudents().stream() //Stream<Student>
                .map(Student::getActivities) //Stream<List<String>
                .flatMap(List::stream) //Stream<String>
                .distinct()
                .sorted()
                .collect(toList());

        return studentActivities;
    }

    public static long getStudentActivitiesCount(){

        long noOfStudentActivities = StudentDataBase.getAllStudents().stream() //Stream<Student>
                .map(Student::getActivities) //Stream<List<String>
                .flatMap(List::stream) //Stream<String>
                .distinct() //Stream<String> -> with distinct function performed
                .count();

        return noOfStudentActivities;
    }


    public static void main(String[] args) {

        System.out.println("printStudentActivities : " + printStudentActivities());
        System.out.println("getStudentActivitiesCount : " + getStudentActivitiesCount());
    }
}
```
## customized-sort-using-comparator
```java
public class StreamsComparatorExample {
    public static List<Student> sortStudentsByName(){
        return StudentDataBase.getAllStudents()
                .stream()
                .sorted(Comparator.comparing(Student::getName))
                .collect(toList());
    }

    public static List<Student> sortStudentsByGpa(){
        return StudentDataBase.getAllStudents()
                .stream()
                .sorted(Comparator.comparing(Student::getGpa))
                .collect(toList());
    }

    public static List<Student> sortStudentsByGpaDesc(){
        return StudentDataBase.getAllStudents()
                .stream()
                .sorted(Comparator.comparing(Student::getGpa).reversed())
                .collect(toList());
    }

    public static void main(String[] args) {
        System.out.println("Students sorted by Name : ");
        sortStudentsByName().forEach(System.out::println);
        System.out.println("Students sorted by GPA : ");
        sortStudentsByGpa().forEach(System.out::println);

        System.out.println("Students sorted by GPA DESC: ");
        sortStudentsByGpaDesc().forEach(System.out::println);
    }
}
```
## filter() PartI
```java
public class StreamsFilterExample {
    public static List<Student> filterStudents(){

        return StudentDataBase.getAllStudents().stream() //Stream<Student>
                .filter((student -> student.getGender().equals("female"))) //Stream<Student>
                //filters and sends only the students whose gender is female
                .filter(student -> student.getGpa()>=3.9)
                .collect(toList());

    }

    public static void main(String[] args) {
        //System.out.println("filterStudents : " + filterStudents());
        filterStudents().forEach(System.out::println);

    }
}
```
## reduce() PartI
```java
public class StreamReduceExample {
    public static int performMultiplication(List<Integer> integerList){
        return integerList.stream()
                //1
                //3
                //5
                //7
                .reduce(1,(a,b) -> a*b);
    }

    public static Optional<Integer> performMultiplicationWithoutIdentity(List<Integer> integerList){
        return integerList.stream()
                //1
                //3
                //5
                //7
                .reduce((a,b) -> a*b);
    }

    public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(1,3,5,7);
        List<Integer> integers1 = new ArrayList<>();

        System.out.println(performMultiplication(integers));
        Optional<Integer> result = performMultiplicationWithoutIdentity(integers);

        System.out.println(result.isPresent());
        System.out.println(result.get());

        Optional<Integer> result1 = performMultiplicationWithoutIdentity(integers1);
        System.out.println(result1.isPresent());

        if(result1.isPresent()){
            System.out.println(result1.get());
        }

    }
}
```
## reduce() PartII
```java
public class StreamReduceExample {
    public static int performMultiplication(List<Integer> integerList){

        return integerList.stream()
                //1
                //3
                //5
                //7
                .reduce(1,(a,b) -> a*b);

    }

    public static Optional<Integer> performMultiplicationWithoutIdentity(List<Integer> integerList){
        return integerList.stream()
                //1
                //3
                //5
                //7
                .reduce((a,b) -> a*b);

    }

    public static Optional<Student> getHighestGPAStudent(){
        return StudentDataBase.getAllStudents().stream()
                //students one by one
                .reduce((s1,s2)->(s1.getGpa()>s2.getGpa()) ? s1 : s2);
    }

    public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(1,3,5,7);

        List<Integer> integers1 = new ArrayList<>();

        System.out.println(performMultiplication(integers));

        Optional<Integer> result = performMultiplicationWithoutIdentity(integers);

        System.out.println(result.isPresent());
        System.out.println(result.get());

        Optional<Integer> result1 = performMultiplicationWithoutIdentity(integers1);
        System.out.println(result1.isPresent());

        if(result1.isPresent()){
            System.out.println(result1.get());
        }

        Optional<Student> studentOptional = getHighestGPAStudent();
        if(getHighestGPAStudent().isPresent()){
            System.out.println(studentOptional.get());
        }

    }
}
```
## Map + Filter + Reduce Pattern
```java
public class StreamMapReduceExample {
    private static int noOfNoteBooks(){

       int noOfNoteBooks=  StudentDataBase.getAllStudents().stream() //Stream<Student>
                .filter((student -> student.getGradeLevel()>=3))
               .filter(student -> student.getGender().equals("female"))
                .map(Student::getNoteBooks) //Stream<Integer>
                //.reduce(0,(a,b)-> a+b);
        .reduce(0,Integer::sum);

       return noOfNoteBooks;

    }
    public static void main(String[] args) {
        System.out.println("noOfNoteBooks : " + noOfNoteBooks());
    }
}
```
## max & min using reduce()
```java
public class StreamsMinMaxExample {
    public static int findMaxvalue(List<Integer> integerList){
        return integerList.stream()
                //6 -> y
                //7 -> y
                //8-> y
                //9-> y
                //10-> y
                //x variable holds the max value for each element in the iteration
                .reduce(0,(x,y)-> x>y ? x : y);
    }

    public static Optional<Integer> findMinvalue(List<Integer> integerList){
        return integerList.stream()
                //6 -> y
                //7 -> y
                //8-> y
                //9-> y
                //10-> y
                //x variable holds the max value for each element in the iteration
                .reduce((x,y)-> x<y ? x : y);
    }

    public static Optional<Integer> findMaxvalueOptional(List<Integer> integerList){
        return integerList.stream()
                //6 -> y
                //7 -> y
                //8-> y
                //9-> y
                //10-> y
                //x variable holds the max value for each element in the iteration
                .reduce((x,y)-> x>y ? x : y);
    }

    public static void main(String[] args) {
       // List<Integer> integerList = Arrays.asList(6,7,8,9,10);
        List<Integer> integerList = new ArrayList<>();

        Optional<Integer> minValueOptional = findMinvalue(integerList);
        System.out.println("minValueOptional : " + minValueOptional);

        if(minValueOptional.isPresent()){
            System.out.println("The minimum value is : " + minValueOptional.get());
        }else{
            System.out.println("No Input is passed");
        }

       /* int maxValue = findMaxvalue(integerList);
        System.out.println(" max value is :" + maxValue);

        Optional<Integer> maxValueOptional = findMaxvalueOptional(integerList);
        System.out.println("Optional Max is : " + maxValueOptional);
        if(maxValueOptional.isPresent()){
            System.out.println("MaxValue using optional :" + maxValueOptional.get());
        }else{
            System.out.println("Input list is empty.");
        }*/
    }
}
```
## Limit and Skip
```java
public class StreamsLimitSkipExample {
    public static Optional<Integer> limit(List<Integer> integers){
        return integers.stream()
                //6
                //7
                //8
                //9
                //10
                .limit(3) //6,7,8
                .reduce((x,y)->x+y);
    }

    public static Optional<Integer> skip(List<Integer> integers){
        return integers.stream()
                //6
                //7
                //8
                //9
                //10
                .skip(3)//9,10
                .reduce((x,y)->x+y);
    }


    public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(6,7,8,9,10);
        /*Optional<Integer> limitResult = limit(integers);
        if(limitResult.isPresent()){
            System.out.println("The limit result is :" + limitResult.get());
        }else{
            System.out.println("No input is passed");
        }
*/
        Optional<Integer> skipResult = skip(integers);
        if(skipResult.isPresent()){
            System.out.println("The skip result is :" + skipResult.get());
        }else{
            System.out.println("No input is passed");
        }

    }
}
```
## any none match
```java
public class StreamsMatchExample {
    public static boolean allMatch(){
        return StudentDataBase.getAllStudents().stream()
                .allMatch(student -> student.getGpa()>=3.5);
    }

    public static boolean anyMatch(){
        return StudentDataBase.getAllStudents().stream()
                .anyMatch(student -> student.getGpa()>=4.0);
    }

    public static boolean noneMatch(){
        return StudentDataBase.getAllStudents().stream()
                .noneMatch(student -> student.getGpa()>=4.0);
    }


    public static void main(String[] args) {
        System.out.println("Result of All Match :" + allMatch());
        System.out.println("Result of Any Match :" + anyMatch());
        System.out.println("Result of none Match :" + noneMatch());
    }
}
```
## find any first
```java
public class StreamsFindAnyFirstExample {
    public static Optional<Student> findAnyStudent(){
        return StudentDataBase.getAllStudents().stream()
                //adam
                //jenny
                //emily
                .filter(student -> student.getGpa()>=3.9)
        .findAny();
    }

    public static Optional<Student> findFirstStudent(){
        return StudentDataBase.getAllStudents().stream()
                //adam
                //jenny
                //emily
                .filter(student -> student.getGpa()>=3.9)
                .findFirst();
    }

    public static void main(String[] args) {
        Optional<Student> studentOptionalFindAny = findAnyStudent();
        if(studentOptionalFindAny.isPresent()){
            System.out.println("Found The student : "+ studentOptionalFindAny.get());
        }else{
            System.out.println("Student Not Found !");
        }

        Optional<Student> studentOptionalFindFirst = findFirstStudent();
        if(studentOptionalFindFirst.isPresent()){
            System.out.println("Found The student : "+ studentOptionalFindFirst.get());
        }else{
            System.out.println("Student Not Found !");
        }
    }
}
```
Factory Methods
## of iterate generate
```java
public class StreamOfGenerateIterateExample {
    public static void main(String[] args) {
        Stream<String> stringStream = Stream.of("adam","dan","julie");
        stringStream.forEach(System.out::println);

        Stream.iterate(1,x->x*2)
                .limit(10)
                .forEach(System.out::println);

        Supplier<Integer> integerSupplier = new Random()::nextInt;
        Stream.generate(integerSupplier)
                .limit(5)
            .forEach(System.out::println);
    }
}
```

## intro to numeric 
```java
public class NumericStreamsExample {
    public static int sumOfNNumbers(List<Integer> integerList){
        return integerList.stream()
                .reduce(0,(x,y)->x+y);// unboxing to convert the Integer to int
    }

    public static int sumOfNNumbersIntStream(){
        return IntStream.rangeClosed(1,6)
                    .sum();
    }

    public static void main(String[] args) {
        List<Integer> integerList = Arrays.asList(1,2,3,4,5,6);

        System.out.println("Sum of N Numbers :" + sumOfNNumbers(integerList));

        System.out.println("Sum of N Numbers using IntStream:" + sumOfNNumbersIntStream());

    }
}
```
## range rangeclosed count foreachh
```java
public class NumericStreamRangesExample {
    public static void main(String[] args) {
        IntStream intStream = IntStream.range(1,50);
        System.out.println("Range Count " + intStream.count());

        IntStream.range(1,50).forEach((value -> System.out.print(value+",")));
        System.out.println();
        System.out.println("Range Closed Count " + IntStream.rangeClosed(1,50).count());
        IntStream.rangeClosed(1,50).forEach((value -> System.out.print(value+",")));
        System.out.println();
        System.out.println("Long Stream Range Closed Count " + LongStream.rangeClosed(1,50).count());
        LongStream.rangeClosed(1,50).forEach((value -> System.out.print(value+",")));
        System.out.println();
        IntStream.range(1,50).asDoubleStream().forEach((value -> System.out.print(value+",")));
    }
}
```
## sum max min average
```java
public class NumericStreamsExample {
    public static int sumOfNNumbers(List<Integer> integerList){
        return integerList.stream()
                .reduce(0,(x,y)->x+y);// unboxing to convert the Integer to int
    }

    public static int sumOfNNumbersIntStream(){
        return IntStream.rangeClosed(1,6)
                    .sum();
    }


    public static void main(String[] args) {
        List<Integer> integerList = Arrays.asList(1,2,3,4,5,6);

        System.out.println("Sum of N Numbers :" + sumOfNNumbers(integerList));

        System.out.println("Sum of N Numbers using IntStream:" + sumOfNNumbersIntStream());
    }
}
```
## boxing unboxing
```java
public class NumericStreamsBoxingUnboxingExample {
    public static List<Integer> boxing(){
       return IntStream.rangeClosed(1,10) // intstream of 10 elements
                //int
                .boxed()
                //Integer
                .collect(Collectors.toList());
    }

    public static int unBoxing(List<Integer> integerList){
            //wrapper to primitive
        return integerList.stream()
                //Wrapper Integer Values
                .mapToInt(Integer::intValue) // intstream(intValue of the Wrapper class)
                .sum();
    }

    public static void main(String[] args) {
        System.out.println("Boxing : " + boxing());

        List<Integer> integerList = boxing();
        System.out.println("Unboxing : " + unBoxing(integerList));
    }
}
```
## mapToObj() mapTolong() mapToDouble()
```java
public class NumericStreamMapExample {
    public static List<Integer> mapToObj(){
        return IntStream.rangeClosed(1,5)
                .mapToObj((i) -> {
                    return new Integer(i);
                })
                .collect(toList());
    }

    public static long mapToLong(){
        return IntStream.rangeClosed(1,5) // intstream
                //i is passed from the intstream
                .mapToLong((i)->i) // convert intstream to longStream
                .sum();
    }

    public static double mapToDouble(){
        return IntStream.rangeClosed(1,5) // intstream
                //i is passed from the intstream
                .mapToDouble((i)->i) // convert intstream to DoubleStream
                .sum();
    }

    public static void main(String[] args) {
        System.out.println("mapToObj : " + mapToObj());
        System.out.println("mapToLong : " + mapToLong());
        System.out.println("mapToDouble : " + mapToDouble());
    }
}
```
## joining()
```java
public class StreamsJoiningExample {
    public static String joining_1(){
       return StudentDataBase.getAllStudents()
                .stream()
                .map(Student::getName)//<Stream<String>>
                .collect(joining());
    }

    public static String joining_2(){
        return StudentDataBase.getAllStudents()
                .stream()
                .map(Student::getName)//<Stream<String>>
                .collect(joining("-"));
    }

    public static String joining_3(){
        return StudentDataBase.getAllStudents()
                .stream()
                .map(Student::getName)//<Stream<String>>
                .collect(joining("-","(",")"));
    }

    public static void main(String[] args) {
        System.out.println("joining_1 : " + joining_1());
        System.out.println("joining_2 : " + joining_2());
        System.out.println("joining_3 : " + joining_3());
    }
}
```
## counting()
```java
public class StreamsCountingExample {
    public static long count(){
        return StudentDataBase.getAllStudents()
                .stream()
                .filter(student -> student.getGpa()>=3.9)
                .collect(counting());
    }
    public static void main(String[] args) {
        System.out.println(count());
    }
}

```
## mapping()
```java
public class StreamsMappingExample {
    public static void main(String[] args) {
        List<String> namesList = StudentDataBase.getAllStudents()
                .stream()
                .collect(mapping(Student::getName,toList()));

        System.out.println("namesList : " + namesList);

        Set<String> namesSet = StudentDataBase.getAllStudents()
                .stream()
                .collect(mapping(Student::getName,toSet()));

        StudentDataBase.getAllStudents()
                .stream()
                .map(Student::getName)
                .collect(toList());
        System.out.println("namesSet : " + namesSet);

    }
}
```
## minBy() maxBy using collect()
```java
public class StreamsMinByMaxyByExample {
    public static Optional<Student> minBy_example(){
       return StudentDataBase.getAllStudents()
                .stream()
                .collect(minBy(Comparator.comparing(Student::getGpa)));
    }

    public static Optional<Student> maxBy_example(){
        return StudentDataBase.getAllStudents()
                .stream()
                .collect(maxBy(Comparator.comparing(Student::getGpa)));
    }

    public static void main(String[] args) {
        System.out.println(minBy_example());
        System.out.println(maxBy_example());
    }
}
```
## sun() avg using collect()
```java
public class StreamsSumAvgExample {
    public static int sum(){
        return StudentDataBase.getAllStudents()
                .stream()
                .collect(summingInt(Student::getNoteBooks));
    }

    public static double average(){
        return StudentDataBase.getAllStudents()
                .stream()
                .collect(averagingInt(Student::getNoteBooks));
    }

    public static void main(String[] args) {
        System.out.println("Total No of notebooks : " + sum());
        System.out.println("Average No of notebooks : " + average());
    }
}
```
## groupingBy-approach1
```java
public class StreamGroupingByExample {
    public static void groupStudentsByGender(){
       Map<String, List<Student>> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGender));

        System.out.println(studentMap);
    }

    public static void customizedGroupingBy(){
        Map<String, List<Student>> studentMap = StudentDataBase.getAllStudents()
                .stream() //Stream<Students>
                .collect(groupingBy(student -> student.getGpa()>=3.8 ? "OUTSTANDING" : "AVERAGE"));

        System.out.println(studentMap);
    }

    public static void main(String[] args) {
       // groupStudentsByGender();
        customizedGroupingBy();

    }
}
```
## groupingBy-approach2
```java
public class StreamGroupingByExample {
    public static void groupStudentsByGender(){
       Map<String, List<Student>> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGender));

        System.out.println(studentMap);
    }

    public static void customizedGroupingBy(){
        Map<String, List<Student>> studentMap = StudentDataBase.getAllStudents()
                .stream() //Stream<Students>
                .collect(groupingBy(student -> student.getGpa()>=3.8 ? "OUTSTANDING" : "AVERAGE"));

        System.out.println(studentMap);
    }

    public static void twoLevelGrouping_1(){
        Map<Integer,Map<String,List<Student>>> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGradeLevel,
                        groupingBy(student -> student.getGpa()>=3.8 ? "OUTSTANDING" : "AVERAGE")));

        System.out.println(studentMap);
    }

    public static void twoLevelGrouping_2(){
        Map<String,Integer> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getName,
                        summingInt(Student::getNoteBooks)));

        System.out.println(studentMap);
    }




    public static void main(String[] args) {
       // groupStudentsByGender();
        //customizedGroupingBy();
        //twoLevelGrouping_1();
        twoLevelGrouping_2();
    }
}
```
## groupingBy-approach3
```java
public class StreamGroupingByExample {
    public static void groupStudentsByGender(){
       Map<String, List<Student>> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGender));

        System.out.println(studentMap);
    }

    public static void customizedGroupingBy(){
        Map<String, List<Student>> studentMap = StudentDataBase.getAllStudents()
                .stream() //Stream<Students>
                .collect(groupingBy(student -> student.getGpa()>=3.8 ? "OUTSTANDING" : "AVERAGE"));

        System.out.println(studentMap);
    }

    public static void twoLevelGrouping_1(){
        Map<Integer,Map<String,List<Student>>> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGradeLevel,
                        groupingBy(student -> student.getGpa()>=3.8 ? "OUTSTANDING" : "AVERAGE")));

        System.out.println(studentMap);
    }

    public static void twoLevelGrouping_2(){
        Map<String,Integer> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getName,
                        summingInt(Student::getNoteBooks)));

        System.out.println(studentMap);
    }

    public static void threeArgumentGroupBy(){
       LinkedHashMap<String,Set<Student>> studentLinkedHashmap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getName,LinkedHashMap::new,toSet()));

        System.out.println(studentLinkedHashmap);
    }




    public static void main(String[] args) {
       // groupStudentsByGender();
        //customizedGroupingBy();
        //twoLevelGrouping_1();
       // twoLevelGrouping_2();
        threeArgumentGroupBy();

    }
}
```
## groupingBy maxBy() minBy() collectingAndThen()
```java
public class StreamGroupingByExample {
    public static void groupStudentsByGender(){

       Map<String, List<Student>> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGender));

        System.out.println(studentMap);
    }

    public static void customizedGroupingBy(){
        Map<String, List<Student>> studentMap = StudentDataBase.getAllStudents()
                .stream() //Stream<Students>
                .collect(groupingBy(student -> student.getGpa()>=3.8 ? "OUTSTANDING" : "AVERAGE"));

        System.out.println(studentMap);
    }

    public static void twoLevelGrouping_1(){
        Map<Integer,Map<String,List<Student>>> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGradeLevel,
                        groupingBy(student -> student.getGpa()>=3.8 ? "OUTSTANDING" : "AVERAGE")));

        System.out.println(studentMap);
    }

    public static void twoLevelGrouping_2(){
        Map<String,Integer> studentMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getName,
                        summingInt(Student::getNoteBooks)));

        System.out.println(studentMap);
    }

    public static void threeArgumentGroupBy(){
       LinkedHashMap<String,Set<Student>> studentLinkedHashmap = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getName,LinkedHashMap::new,toSet()));

        System.out.println(studentLinkedHashmap);
    }

    public static void calculateTopGpa(){
        Map<Integer,Optional<Student>> studentMapOptional = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGradeLevel,
                        maxBy(Comparator.comparing(Student::getGpa))));

       // System.out.println(studentMapOptional);

        Map<Integer,Student> studentMapOptional1 = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGradeLevel,
                        collectingAndThen(maxBy(Comparator.comparing(Student::getGpa))
                        ,Optional::get)));

        System.out.println(studentMapOptional1);
    }

    public static void calculateleastGpa(){
        Map<Integer,Optional<Student>> studentMapOptional = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGradeLevel,
                        minBy(Comparator.comparing(Student::getGpa))));

        // System.out.println(studentMapOptional);

        Map<Integer,Student> studentMapOptional1 = StudentDataBase.getAllStudents()
                .stream()
                .collect(groupingBy(Student::getGradeLevel,
                        collectingAndThen(minBy(Comparator.comparing(Student::getGpa))
                                ,Optional::get)));

        System.out.println(studentMapOptional1);
    }




    public static void main(String[] args) {
       // groupStudentsByGender();
        //customizedGroupingBy();
        //twoLevelGrouping_1();
       // twoLevelGrouping_2();
       // threeArgumentGroupBy();
        //calculateTopGpa();
        calculateleastGpa();

    }
}
```
partitioningBy()
```java
public class StreamsParitioninigByExample {
    public static void partitioningBy_1(){

        Predicate<Student> gpaPredicate = student -> student.getGpa()>=3.8;
        Map<Boolean,List<Student>> partitioningMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(partitioningBy(gpaPredicate));

        System.out.println("partitioningMap : " + partitioningMap);
    }

    public static void partitioningBy_2(){
        Predicate<Student> gpaPredicate = student -> student.getGpa()>=3.8;

        Map<Boolean,Set<Student>> partitioningMap = StudentDataBase.getAllStudents()
                .stream()
                .collect(partitioningBy(gpaPredicate,
                        toSet()));

        System.out.println("partitioningMap_2 : " + partitioningMap);
    }

    public static void main(String[] args) {
        //partitioningBy_1();
        partitioningBy_2();

    }
}
```
introduction to parallel streams
```java
public class ParallelStreamExample {
    public static int sum_sequential_Stream(){
        return IntStream.rangeClosed(1,100000)
                .sum();
    }
    public static int sum_parallel_Stream(){
        return IntStream.rangeClosed(1,100000)
                .sum();
    }
    public static void main(String[] args) {
        System.out.println(sum_sequential_Stream());

        System.out.println(sum_parallel_Stream());
    }
}
```


conparing performance of sequential vs parallel streams
```java
public class ParallelStreamExample {
    public static long checkPerformanceResult(Supplier<Integer> supplier, int numberOfTimes){

        long startTime = System.currentTimeMillis();
        for(int i=0;i<numberOfTimes;i++){
            supplier.get();
        }
        long endTime = System.currentTimeMillis();
        return endTime-startTime;
    }
    public static int sumSequentialStream(){
        return IntStream.rangeClosed(1,100000)
                .sum();
    }

    public static int sumParallelStream(){
        return IntStream.rangeClosed(1,100000)
                .parallel()
                .sum();
    }

    public static void main(String[] args) {
        System.out.println("Sequential Stream Result :" +
                checkPerformanceResult(ParallelStreamExample::sumSequentialStream
                        ,20));
        System.out.println("Parallel Stream Result : " +
                checkPerformanceResult(ParallelStreamExample::sumParallelStream
                ,20));


    }
}
```
# 15 Streams API-Parallel Processing
### 04 build-a-stream-pipeline 
```java
public class ParallelStreamExample1 {
    public static List<String> sequentialPrintStudentActivities(){

        long startTime = System.currentTimeMillis();
        List<String> studentActivities = StudentDataBase.getAllStudents()
                .stream() //Stream<Student>
                .map(Student::getActivities) //Stream<List<String> - stateless
                .flatMap(List::stream) //Stream<String> - stateless
                .distinct() // stateful
                .sorted() //stateful
                .collect(toList());
        long endTime = System.currentTimeMillis();
        System.out.println("Duration to execute the pipeline in sequential : "+ (endTime-startTime));
        return studentActivities;
    }
    public static List<String> parallelPrintStudentActivities(){

        long startTime = System.currentTimeMillis();
        List<String> studentActivities = StudentDataBase.getAllStudents()
                .stream() //Stream<Student>
                .parallel()
                .map(Student::getActivities) //Stream<List<String> - stateless
                .flatMap(List::stream) //Stream<String> - stateless
                .distinct() // stateful
                .sorted() //stateful
                .collect(toList());
        long endTime = System.currentTimeMillis();
        System.out.println("Duration to execute the pipeline in parallel : "+ (endTime-startTime));
        return studentActivities;
    }

    public static void main(String[] args) {

        sequentialPrintStudentActivities();
        parallelPrintStudentActivities();
    }
}
```


### 05 when-not-to-use-parallel-stream-part1
```java
public class ParallelStreamBoxedExample {

    public static int sequentialSum(List<Integer> integerList){

        long start = System.currentTimeMillis();
        int sum = integerList
                .stream()
                .reduce(0,(x,y)->x+y);
        long duration = System.currentTimeMillis()-start;
        System.out.println("Duration in Sequential Stream : "+ duration);
        return sum;

    }

    public static int parallelSum(List<Integer> integerList){

        long start = System.currentTimeMillis();
        int sum = integerList
                .parallelStream()
                .reduce(0,(x,y)->x+y); // perform the unboxing from Integer to int
        long duration = System.currentTimeMillis()-start;
        System.out.println("Duration in Parallel Stream : "+ duration);
        return sum;

    }

    public static void main(String[] args) {

        List<Integer> integerList = IntStream.rangeClosed(1,10000)
                .boxed()
                .collect(toList());
        sequentialSum(integerList);
        parallelSum(integerList);

    }
}
```


### 06 when-not-to-use-parallel-sream-part2    有两个一个sum 一个sumclient
```java
public class Sum {
    private int total;

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total;}
    public void performSum(int input){total+=input;}
}
```
```java
public class SumClient {
    public static void main(String[] args) {

        Sum sum = new Sum();

        IntStream.rangeClosed(1,1000)
                //1,2,3..1000
                .parallel()
                .forEach(sum::performSum); //500500
        //448461
        //427396
        //424733
        System.out.println(sum.getTotal());
    }
}
```


# 16 Optional
### 01 intruction-to-optional
```java
public class OptionalExample {

    public static String getStudentName(){
        //Student student = StudentDataBase.studentSupplier.get();
        Student student = null;
        if(student!=null){
            return student.getName();
        }

        return null;
    }

    public static Optional<String> getStudentNameOptional(){
        //Optional<Student> studentOptional = Optional.ofNullable(StudentDataBase.studentSupplier.get());
        Optional<Student> studentOptional = Optional.ofNullable(null); // Optional.empty()
        if(studentOptional.isPresent()){
            studentOptional.get(); //Student
            return studentOptional.map(Student::getName); //Optional<String>
        }

        return Optional.empty(); // Represents an optional object with no value
    }

    public static void main(String[] args) {

        /*String name = getStudentName();
        if(name!=null)
            System.out.println("Length of the student Name : " + name.length());
        else
            System.out.println("Name not found");*/

        Optional<String> stringOptional = getStudentNameOptional();

        if(stringOptional.isPresent()){
            System.out.println("Length of the student Name : " +
                    stringOptional.get().length()); //String which is Student Name
        }else{
            System.out.println("Name not found");
        }

    }
}
```

### 02 empty-ofNullable-of
```java
public class OptionalOfEmptyNullableExample {

    public static Optional<String> ofNullable(){

        Optional<String> stringOptional =Optional.ofNullable("Hello");
        return stringOptional;
    }


    public static Optional<String> of(){

        Optional<String> stringOptional =Optional.of("Hello");
        return stringOptional;
    }

    public static Optional<String> empty(){

        return Optional.empty();
    }

    public static void main(String[] args) {

        System.out.println("OfNUllable : " + ofNullable());
        System.out.println("of : " + of());
        System.out.println("empty : " + empty());
    }
}
```


### 03 optional-orElse
```java
public class OptionalOrElseExample {
    public static String optionalOrElse(){

       /* Optional<Student> studentOptional =
                Optional.ofNullable(StudentDataBase.studentSupplier.get());*/
        Optional<Student> studentOptional = Optional.ofNullable(null); // Option.empty
        String name = studentOptional.map(Student::getName).orElse("Default");
        return name;
    }
    //orElseGet
    public static String optionalOrElseGet(){
        Optional<Student> studentOptional =
                Optional.ofNullable(null);
        String name = studentOptional.map(Student::getName).orElseGet(()->"Default");
        return name;

    }

    //orElseThrow
    public static String optionalOrElseThrow(){

        Optional<Student> studentOptional =
                Optional.ofNullable(null);

        String name = studentOptional.map(Student::getName)
                .orElseThrow(()->new RuntimeException("No Data Available"));

        return name;
    }
    public static void main(String[] args) {

        System.out.println("orElse : " + optionalOrElse());
        System.out.println("orElseGet :  " + optionalOrElseGet());
        System.out.println("orElseThrow :  " + optionalOrElseThrow());
    }
}
```


### 04 ifPresent-ispresent
```java
public class OptionalPresentExample {

    public static void main(String[] args) {

        //isPresent
        Optional<String> optional = Optional.ofNullable("hello Optional");
        System.out.println(optional.isPresent());
        if(optional.isPresent()){
            System.out.println(optional.get());
        }
        //ifPresent
        optional.ifPresent(s -> System.out.println(s));
    }
}
```


### 05 map-flatmap-filter-part1
```java
public class OptionalMapFlatMapExample {

    //filter
    public static void optionalFilter(){

        Optional<Student> studentOptional =
            Optional.ofNullable(StudentDataBase.studentSupplier.get()); //Optional<Student>

        studentOptional.
                filter(student -> student.getGpa()>=4.0)
                    .ifPresent(student -> System.out.println(student));
    }

    //map
    public static  void optionalMap(){
        Optional<Student> studentOptional =
                Optional.ofNullable(StudentDataBase.studentSupplier.get()); //Optional<Student>

        if(studentOptional.isPresent()){
            Optional<String> stringOptional = studentOptional
                    .filter(student -> student.getGpa()>=3.5)
                    .map(Student::getName);
            System.out.println(stringOptional.get());
        }
    }
    public static void main(String[] args) {

        optionalFilter();
        optionalMap();
    }
}
```


### 06 map-flatmap-filter-part2
```java
// Bike
public class Bike {

    private String name;
    private String model;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Override
    public String toString() {
        return "Bike{" +
                "name='" + name + '\'' +
                ", model='" + model + '\'' +
                '}';
    }
}
```



# 17 DefaultStatic Methods in interfaces
### 02 default-methods
```java
public class DefaultMethodsExample {

    public static void main(String[] args) {
        List<String> stringList = Arrays.asList("Adam","Jenny","Alex","Dan","Mike","Eric");

        stringList.sort(Comparator.naturalOrder());

        System.out.println("Sorted list using List.Sort() : " + stringList);

        stringList.sort(Comparator.reverseOrder());

        System.out.println("Sorted list using List.Sort() reverse : " + stringList);
    }
}
```



### 05 create-default-static-methods
```java

public interface Multiplier {

    int multiply(List<Integer> integerList);

    default int size(List<Integer> integerList){

        System.out.println("Inside Multiplier Interface");
        return integerList.size();
    }

    static boolean isEmpty(List<Integer> integerList){

        return integerList!=null && integerList.size()>0;
    }
}
```
```java
public class MultiplierClient {

    public static void main(String[] args) {

        Multiplier multiplier = new MultiplierImpl();
        List<Integer> integerList = Arrays.asList(1,3,5);

        System.out.println("Result is :" + multiplier.multiply(integerList));
        System.out.println("default method size is :" + multiplier.size(integerList));
        System.out.println("static method isEmpty is : " + Multiplier.isEmpty(integerList));

    }
}
```
```java
public class MultiplierImpl implements Multiplier {
    @Override
    public int multiply(List<Integer> integerList) {

        return integerList.stream()
                .reduce(1,(x,y)->x*y);

    }

    public int size(List<Integer> integerList){
        System.out.println("Inside MultiplierImpl class");
        return integerList.size();
    }
}
```


### 07 multiple-inheritance
```java
public interface Interface1 {

    default void methodA(){

        System.out.println("Inside Method A" + Interface1.class);
    }
}
```
```java
public interface Interface2 extends Interface1 {

    default void methodB(){
        System.out.println("Inside Method B");
    }

    default void methodA(){

        System.out.println("Inside Method A" + Interface2.class);
    }
}
```
```java
public interface Interface3 extends Interface2 {

    default void methodC(){

        System.out.println("Inside Method C");
    }
}

```
```java
public class Client123 implements Interface1,Interface2,Interface3 {
    public void methodA(){
        System.out.println("Inside Method A" + Client123.class);
    }

    public static void main(String[] args) {

        Client123 client123 = new Client123();
        client123.methodA(); //resolve to the child implementation
        client123.methodB();
        client123.methodC();
    }
}
```



# 18 New DateTime APIs
### 01 introduction-to-new-data-libaries
```java
public class NewDateTimeExample {

    public static void main(String[] args) {

        //LocalDate
        LocalDate localDate = LocalDate.now();
        System.out.println("localDate : "+ localDate);
        //LocalTime
        LocalTime localTime = LocalTime.now();
        System.out.println("localTime : "+ localTime);
        //LocalDateTime
        LocalDateTime localDateTime = LocalDateTime.now();
        System.out.println("localDateTime : "+ localDateTime);
    }
}
```


### 02 local-data-part1
```java
public class LocalDateExample {

    public static void main(String[] args) {

        LocalDate localDate = LocalDate.now();

        System.out.println("localDate : " + localDate);

        LocalDate localDate1 = LocalDate.of(2018,07,17);
        System.out.println("localDate1 : " + localDate1);

        LocalDate localDate2 = LocalDate.ofYearDay(2018,02);
        System.out.println("localDate2 : " + localDate2);



        System.out.println("getMonth : " + localDate.getMonth());
        System.out.println("getMonthValue : " + localDate.getMonthValue());
        System.out.println("getDayOfWeek : " + localDate.getDayOfWeek());
        System.out.println("getDayOfYear : " + localDate.getDayOfYear());
        System.out.println("Day of Month using get :" +
                localDate.get(ChronoField.DAY_OF_MONTH));

        System.out.println("plusDays : " + localDate.plusDays(2));
        System.out.println("plusMonths : " + localDate.plusMonths(2));
        System.out.println("minusDays : " + localDate.minusDays(2));
        System.out.println("withYear : " +localDate.withYear(2019));
        System.out.println("with ChronoField : "
                +localDate.with(ChronoField.YEAR,2020));
        System.out.println("with TemporalAdjusters : "
                +localDate.with(TemporalAdjusters.firstDayOfNextMonth()));
    }
}
```


### 03 local-data-part2
```java
public class LocalDateExample {

    public static void main(String[] args) {

        LocalDate localDate = LocalDate.now();

        System.out.println("localDate : " + localDate);

        LocalDate localDate1 = LocalDate.of(2018,07,17);
        System.out.println("localDate1 : " + localDate1);

        LocalDate localDate2 = LocalDate.ofYearDay(2018,02);
        System.out.println("localDate2 : " + localDate2);


        System.out.println("getMonth : " + localDate.getMonth());
        System.out.println("getMonthValue : " + localDate.getMonthValue());
        System.out.println("getDayOfWeek : " + localDate.getDayOfWeek());
        System.out.println("getDayOfYear : " + localDate.getDayOfYear());
        System.out.println("Day of Month using get :" +
                localDate.get(ChronoField.DAY_OF_MONTH));

        System.out.println("plusDays : " + localDate.plusDays(2));
        System.out.println("plusMonths : " + localDate.plusMonths(2));
        System.out.println("minusDays : " + localDate.minusDays(2));
        System.out.println("withYear : " +localDate.withYear(2019));
        System.out.println("with ChronoField : "
                +localDate.with(ChronoField.YEAR,2020));
        System.out.println("with TemporalAdjusters : "
                +localDate.with(TemporalAdjusters.firstDayOfNextMonth()));
    }
}

```


### 04 local-data-part3
```java
public class LocalDateExample {

    public static void main(String[] args) {

        LocalDate localDate = LocalDate.now(); //16-July-2018

        System.out.println("localDate : " + localDate);

        LocalDate localDate1 = LocalDate.of(2018,07,17);
        System.out.println("localDate1 : " + localDate1);

        LocalDate localDate2 = LocalDate.ofYearDay(2018,02);
        System.out.println("localDate2 : " + localDate2);

        /**
         * Get values from localDate
         */

        System.out.println("getMonth : " + localDate.getMonth());
        System.out.println("getMonthValue : " + localDate.getMonthValue());
        System.out.println("getDayOfWeek : " + localDate.getDayOfWeek());
        System.out.println("getDayOfYear : " + localDate.getDayOfYear());
        System.out.println("Day of Month using get :" +
                localDate.get(ChronoField.DAY_OF_MONTH));

        /**
         * Modifying Local Date
         */

        System.out.println("plusDays : " + localDate.plusDays(2));
        System.out.println("plusMonths : " + localDate.plusMonths(2));
        System.out.println("minusDays : " + localDate.minusDays(2));
        System.out.println("withYear : " +localDate.withYear(2019));
        System.out.println("with ChronoField : "
                +localDate.with(ChronoField.YEAR,2020));
        System.out.println("with TemporalAdjusters : "
                +localDate.with(TemporalAdjusters.firstDayOfNextMonth()));
        System.out.println("chronounit minus : " +
                localDate.minus(1, ChronoUnit.YEARS));

        /**
         * Unsupported
         */

       /* System.out.println("chronounit minus : " +
                localDate.minus(1, ChronoUnit.MINUTES));*/
        System.out.println("isSupported : "+ localDate.isSupported(ChronoUnit.YEARS));

        /**
         * Additional Support methods
         */

        System.out.println("leapyear : " +
                LocalDate.ofYearDay(2020,01).isLeapYear());

        //localDate = 16-July-2018
        //localDate1 = 17-July-2018
        System.out.println("isEqual : " +localDate.isEqual(localDate1));
        System.out.println("isBefore : " +localDate.isBefore(localDate1));
        System.out.println("isAfter : " +localDate1.isAfter(localDate));


    }
}

```


### 05 local-time
```java
// LocalTimeExample
public class LocalTimeExample {

    public static void main(String[] args) {

        LocalTime localTime = LocalTime.now();
        System.out.println("localTime : " + localTime);

        LocalTime localTime1 = LocalTime.of(23,33);
        System.out.println("localTime1 : " + localTime1);

        LocalTime localTime2 = LocalTime.of(23,33,33);
        System.out.println("localTime2 : " + localTime2);

        LocalTime localTime3 =
                LocalTime.of(23,33,33,980980980);
        System.out.println("localTime3 : " + localTime3);

        /**
         * getting the values from local time instance
         */

        System.out.println("getHour : " + localTime.getHour());
        System.out.println("getMinute : " + localTime.getMinute());
        System.out.println("CLOCK_HOUR_OF_DAY : " +
                localTime.get(ChronoField.CLOCK_HOUR_OF_DAY));
        System.out.println("toSecondOfDay : " +
                localTime.toSecondOfDay()); // represent the time in seconds

        /**
         * Modify values of LocalTime
         */

        System.out.println("minusHours : "+localTime.minusHours(2));
        System.out.println("ChronoUnit.HOURS : "+localTime.minus(2,
                ChronoUnit.HOURS));
        System.out.println("MIDNIGHT : "+localTime.with(LocalTime.MIDNIGHT));
        System.out.println("HOUR_OF_DAY : "+
                localTime.with(ChronoField.HOUR_OF_DAY,22));

        System.out.println("plusMinutes : "+
                localTime.plusMinutes(30));
        System.out.println("withhour : " + localTime.withHour(10));


    }
}

```


### 06 local-data-time-create-modify
```java
public class LocalDateTimeExample {

    public static void main(String[] args) {

        LocalDateTime localDateTime = LocalDateTime.now();
        System.out.println("localDateTime : " + localDateTime);

        LocalDateTime localDateTime1 = LocalDateTime.of(2018,03,
                21,23,33,33,978);
        System.out.println("localDateTime1 : " + localDateTime1);

        LocalDateTime localDateTime2 =LocalDateTime.of(LocalDate.now(),LocalTime.now());
        System.out.println("localDateTime2 : " + localDateTime2);

        /**
         * Getting the time and date from LocalDateTime instance
         */

        System.out.println("hour : "+ localDateTime.getHour());
        System.out.println("minute : "+ localDateTime.getMinute());
        System.out.println("getDayOfMonth : "+ localDateTime.getDayOfMonth());
        System.out.println("DAY_OF_MONTH : "+ localDateTime.get(ChronoField.DAY_OF_MONTH));

        /**
         * Modifying LocalDate TIme
         */
        System.out.println("plusHours : " +localDateTime.plusHours(2));
        System.out.println("minusDays : " +localDateTime.minusDays(2));
        System.out.println("withMonth : " + localDateTime.withMonth(12));;

    }
}
```



### 08 comparing-dates-period
```java
public class ComparingDatesPeriodExample {

    public static void main(String[] args) {

        LocalDate localDate = LocalDate.of(2018,01,01);
        LocalDate localDate1 = LocalDate.of(2018,12,31);

        /**
         *
         */

        Period period = localDate.until(localDate1);;
        System.out.println("getDays : " + period.getDays());// results is 30 -> performs 31-1
        System.out.println("getMonths : " + period.getMonths()); //12-11
        System.out.println("getYears : " + period.getYears());

        Period period1 = Period.ofDays(10);
        System.out.println("period1.getDays : "+period1.getDays());

        Period period2 = Period.ofYears(10);
        System.out.println("getYears : " + period2.getYears());
        System.out.println("toTotalMonths : " + period2.toTotalMonths());

        Period period3= Period.between(localDate,localDate1);
        System.out.println("Period : " + period3.getDays() + " :" + period3.getMonths()
        +" : " + period3.getYears());

        //Period.between(LocalTime.now(),LocalTime.now().plusHours(24));




    }
}

```


### 09 comparing-datas
```java
public class ComparingTimesDurationExample {

    public static void main(String[] args) {

        LocalTime localTime = LocalTime.of(7,20);

        LocalTime localTime1 = LocalTime.of(8,20);

        long diff = localTime.until(localTime1, ChronoUnit.MINUTES);
        System.out.println("diff : " + diff);

        Duration duration = Duration.between(localTime,localTime1);
        System.out.println("toMinutes : " + duration.toMinutes());

        Duration duration1 = Duration.ofHours(3);
        System.out.println("toMinutes : " +duration1.toMinutes());


        LocalDate localDate = LocalDate.now();
        LocalDate localDate1 = LocalDate.now().plusDays(10);
        Duration duration2 = Duration.between(localDate,localDate1);

    }
}
```


### 10 instant
```java
public class InstantExample {

    public static void main(String[] args) {

        Instant  instant = Instant.now();
        System.out.println(instant);

        //Jan 1st 1970 -> Epoch -> 86400 seconds
        System.out.println("getEpochSecond " + instant.getEpochSecond());

        System.out.println(Instant.ofEpochSecond(0));

        Instant instant1  = Instant.now();

        Duration duration = Duration.between(instant,instant1);
        System.out.println("difference : " + duration.getNano());
    }
}
```


### 11 zonedDataTime-id-offset
```java
public class ZonedDateTimeExample {

    public static void main(String[] args) {


        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        System.out.println("zonedDateTime : " + zonedDateTime);

        System.out.println("zoneOffset : " + zonedDateTime.getOffset());

        System.out.println("Zone Id :" + zonedDateTime.getZone());

        //System.out.println("Available Zones : "+ ZoneId.getAvailableZoneIds());

        /*ZoneId.getAvailableZoneIds()
                .stream()
                .forEach((zone)-> System.out.println(zone));*/

        System.out.println("No of Zones : " + ZoneId.getAvailableZoneIds().size());

        //CST,EST,MST,PST,
        System.out.println("Chicago CST : " + ZonedDateTime.now(ZoneId.of("America/Chicago")));
        System.out.println("Detroit EST : " + ZonedDateTime.now(ZoneId.of("America/Detroit")));
        System.out.println("LA PST      : " + ZonedDateTime.now(ZoneId.of("America/Los_Angeles")));
        System.out.println("Denver MST  : " + ZonedDateTime.now(ZoneId.of("America/Denver")));

        System.out.println("ZonedDatetime using clock : " +
                ZonedDateTime.now(Clock.system(ZoneId.of("America/Denver"))));

        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("America/Detroit"));
        System.out.println("Detroit : " + localDateTime);

        LocalDateTime localDateTime1 = LocalDateTime.now(Clock.system(ZoneId.of("America/Detroit")));
        System.out.println("Detroit : " + localDateTime1);

        LocalDateTime localDateTime2 = LocalDateTime.
                ofInstant(Instant.now(),ZoneId.systemDefault());
        System.out.println("ofInstant : " + localDateTime2);
        


    }
}
```


### 12 instant-localdatetime-zoneddatet
```java
public class ZonedDateTimeExample {

    public static void main(String[] args) {


        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        System.out.println("zonedDateTime : " + zonedDateTime);

        System.out.println("zoneOffset : " + zonedDateTime.getOffset());

        System.out.println("Zone Id :" + zonedDateTime.getZone());

        //System.out.println("Available Zones : "+ ZoneId.getAvailableZoneIds());

        /*ZoneId.getAvailableZoneIds()
                .stream()
                .forEach((zone)-> System.out.println(zone));*/

        System.out.println("No of Zones : " + ZoneId.getAvailableZoneIds().size());

        //CST,EST,MST,PST,
        System.out.println("Chicago CST : " + ZonedDateTime.now(ZoneId.of("America/Chicago")));
        System.out.println("Detroit EST : " + ZonedDateTime.now(ZoneId.of("America/Detroit")));
        System.out.println("LA PST      : " + ZonedDateTime.now(ZoneId.of("America/Los_Angeles")));
        System.out.println("Denver MST  : " + ZonedDateTime.now(ZoneId.of("America/Denver")));

        System.out.println("ZonedDatetime using clock : " +
                ZonedDateTime.now(Clock.system(ZoneId.of("America/Denver"))));

        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("America/Detroit"));
        System.out.println("Detroit : " + localDateTime);

        LocalDateTime localDateTime1 = LocalDateTime.now(Clock.system(ZoneId.of("America/Detroit")));
        System.out.println("Detroit : " + localDateTime1);

        LocalDateTime localDateTime2 = LocalDateTime.
                ofInstant(Instant.now(),ZoneId.systemDefault());
        System.out.println("ofInstant : " + localDateTime2);

        /**
         * convert from localdatetime,instant to ZonedLocalDate andtime
         *
         */

        LocalDateTime localDateTime3 = LocalDateTime.now();
        System.out.println("localDateTime3 : "+ localDateTime3);

        ZonedDateTime zonedDateTime1 = localDateTime3.atZone(ZoneId.of("America/Chicago"));
        System.out.println("zonedDateTime1 : " + zonedDateTime1);

        ZonedDateTime zonedDateTime2 = Instant.now().atZone(ZoneId.of("America/Detroit"));
        System.out.println("zonedDateTime2 : " + zonedDateTime2);


        OffsetDateTime offsetDateTime = localDateTime3.atOffset(ZoneOffset.ofHours(-6));
        System.out.println("offsetDateTime : " + offsetDateTime);

    }
}
```


### 13 data-toLocalDate
```java
public class DatetoLocalDateExample {

    public static void main(String[] args) {

        /**
         * java.util.Date to LocalDate and vice versa
         */
        Date date = new Date();
        System.out.println("date : " + date);

        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        System.out.println("localDate : " + localDate);

        Date date1 = new Date().
                from(localDate.atTime(LocalTime.now()).atZone(ZoneId.systemDefault()).toInstant());

        System.out.println("date1 : " + date1);

        /**
         * java.sql.Date to LocalDate and vice versa
         */

        java.sql.Date date2 = java.sql.Date.valueOf(localDate);
        System.out.println("date2 : " + date2);

        LocalDate localDate1 = date2.toLocalDate();
        System.out.println("localDate1 : " + localDate1);

    }
}

```


### 14 formatlocalDate
```java
public class FormattingLocalDateExample {

    public static void parseLocalDate(){

        /**
         * String to a LocalDate
         */
        String date = "2018-04-28";
        LocalDate localDate = LocalDate.parse(date);
        System.out.println("localDate : " + localDate);
        LocalDate localDate1 = LocalDate.parse(date,DateTimeFormatter.ISO_LOCAL_DATE);
        System.out.println("localDate1 : "+ localDate1);

        String date1="20180428";//yyyyMMdd
        LocalDate localDate2 = LocalDate.parse(date1,DateTimeFormatter.BASIC_ISO_DATE);
        System.out.println("localDate2 : "+ localDate2);

        /**
         * Custom defined dateformat
         */
        String date2 = "2018|04|28";
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy|MM|dd");
        LocalDate localDate3 = LocalDate.parse(date2,dateTimeFormatter);
        System.out.println("localDate3 : " + localDate3);

        String date3 = "2018*04*28";
        DateTimeFormatter dateTimeFormatter1 = DateTimeFormatter.ofPattern("yyyy*MM*dd");
        LocalDate localDate4 = LocalDate.parse(date3,dateTimeFormatter1);
        System.out.println("localDate4 : " + localDate4);

    }

    public static void formatLocalDate(){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy*MM*dd");
        LocalDate localDate = LocalDate.now();
        String formattedDate = localDate.format(dateTimeFormatter);
        System.out.println("formattedDate : " + formattedDate);
    }

    public static void main(String[] args) {
        parseLocalDate();
        formatLocalDate();
    }
}
```


### 15 format-localTime
```java
public class FormattingLocalTimeExample {

    public static void parseTime(){

        String time = "13:00";
        LocalTime localTime = LocalTime.parse(time);
        System.out.println("localTime : " + localTime);

        LocalTime localTime1 = LocalTime.parse(time, DateTimeFormatter.ISO_LOCAL_TIME);
        System.out.println("localTime1 : " + localTime1);

        /**
         * Custom Defined Format
         */
        String time1 = "13*00";
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH*mm");
        LocalTime localTime2 = LocalTime.parse(time1,dateTimeFormatter);
        System.out.println("localTime2 : " + localTime2);


        String time2 = "13*00*02";
        DateTimeFormatter dateTimeFormatter1 = DateTimeFormatter.ofPattern("HH*mm*ss");
        LocalTime localTime3 = LocalTime.parse(time2,dateTimeFormatter1);
        System.out.println("localTime3 : " + localTime3);
    }

    public static void formatTime(){
        DateTimeFormatter dateTimeFormatter1 = DateTimeFormatter.ofPattern("HH|mm|ss");
        LocalTime localTime = LocalTime.now();
        System.out.println(localTime);
        String formattedTime = localTime.format(dateTimeFormatter1);
        System.out.println("formattedTime : " + formattedTime);
    }

    public static void main(String[] args) {

        parseTime();
        formatTime();


    }
}
```


### 16 format-localDateTime
```java
public class FormattingLocalDateTimeExample {

    public static void parseLocalDateTime(){

        String dateTime ="2018-04-18T14:33:33";

        LocalDateTime local = LocalDateTime.parse(dateTime);
        System.out.println("local : " + local);

        LocalDateTime localDateTime =
                LocalDateTime.parse(dateTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        System.out.println("localDateTime : " + localDateTime);

        /**
         * custom format
         */

        String dateTime1 = "2018-04-18T14|33|33";
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH|mm|ss");

        LocalDateTime localDateTime1 =LocalDateTime.parse(dateTime1,dateTimeFormatter);
        System.out.println("localDateTime1 : " + localDateTime1);

        String dateTime2 = "2018-04-18abc14|33|33";
        DateTimeFormatter dateTimeFormatter1 =
                DateTimeFormatter.ofPattern("yyyy-MM-dd'abc'HH|mm|ss");
        LocalDateTime localDateTime2 = LocalDateTime.parse(dateTime2,dateTimeFormatter1);
        System.out.println("localDateTime2 : "+ localDateTime2);

    }
    public static void formatLocalDateTime(){

        DateTimeFormatter dateTimeFormatter1 =
                DateTimeFormatter.ofPattern("yyyy-MM-dd'abc'HH|mm|ss");
        LocalDateTime localDateTime = LocalDateTime.now();
        String convertedDateTime = localDateTime.format(dateTimeFormatter1);
        System.out.println("convertedDateTime : " + convertedDateTime);
    }



    public static void main(String[] args) {

        parseLocalDateTime();
        formatLocalDateTime();
    }
}
```


# 19 没看明白，还是你来吧



# 20 Local Variable Type Interface(LVTI) using var
### 01 19.1-lvti
```java
public class VarTypeExample {


    //var in the class properties are not allowed.
    //private var x = "abc";

    public static void main(String[] args) {

        var list = List.of("adam", "dilip");
        System.out.println("list = " + list);

        for(var name : list ){
            System.out.println("name = " + name);
        }

        var map = Map.ofEntries(Map.entry("a", List.of("adam", "alex")));
        System.out.println("map = " + map);

        map.forEach(( s,strings) ->
                System.out.println("s = " + s));

        var transformedName = transform("dilip");
        System.out.println("transformedName = " + transformedName);

    }

    static String transform(String name) { // var in the function argument is not allowed

        return name.toUpperCase();

    }

}

```



### 02 19.2lvti-limitation
```java
public class VarTypeExample {


    //var in the class properties are not allowed.
//    private var x = "abc";

    public static void main(String[] args) {

        var list = List.of("adam", "dilip");
        System.out.println("list = " + list);

        for(var name : list ){
            System.out.println("name = " + name);
        }

        var map = Map.ofEntries(Map.entry("a", List.of("adam", "alex")));
        System.out.println("map = " + map);

        map.forEach(( s,strings) ->
                System.out.println("s = " + s));

        var transformedName = transform("dilip");
        System.out.println("transformedName = " + transformedName);

        //Limitations
        //var x = null;
        var x = "ABC";
        //x=5

        var var = "Java";

    }

    static String transform(String name) { // var in the function argument is not allowed

        return name.toUpperCase();

    }

}

```

# 21 Text Blocks
### 01 20.1-text-blocks
```java
public class TextBlocks {
    public static String multiLineString() {

        var multiLine = "This is a\n" +
                "    multiline string\n" +
                "with newlines inside";

        return  multiLine;
    }

    public static String multiLineStringV2() {

        var multiLine = """
                This is a
                 multiline string
                with newlines inside
              """;
        return  multiLine;
    }

    public static String multiLineStringWithFormat(String name) {

        var multiLine = """
                Hello, %s!
                This is a
                 multiline string
                with newlines inside
              """.formatted(name);
        return  multiLine;
    }

    public static String sql() {

        var multiLine = """
              select * from employee
              where first_name = 'Dilip'
              where last_name = 'Sundarraj'
              """;
        return  multiLine;
    }

    public static String json() {

        var multiLine = """
              {
              "order_id" : 123456,
              "status" : "DELIVERED",
              "final_charge" : 99.99
              }
              """;
        return  multiLine;
    }


    public static void main(String[] args) {

        System.out.println("multiLineString = " + multiLineString());
        System.out.println("multiLineStringV2 = " + multiLineStringV2());
        System.out.println("multiLineStringWithFormat = " + multiLineStringWithFormat("Dilip"));
        System.out.println("sql = " + sql());
        System.out.println("json  = " + json());
    }
}
```


# 22 Enhanced Switch
### 01 21.1-enhanced-switch
```java
public class DaysInMonth {
    public static int getDays(Month month, int year) {
        int noOfDays = 0;
        switch (month) {
            case SEPTEMBER:
            case APRIL:
            case JUNE:
            case NOVEMBER:
                noOfDays = 30;
                //return noOfDays;
                break;
            case FEBRUARY: // this is a code block;
                System.out.println("Checking if " + year + " is a leap year");
                noOfDays = Year.isLeap(year) ? 29 : 28;
                //  return noOfDays;
                break;

            default:
                noOfDays = 31;
        }
        return noOfDays;

    }

    public static int getDaysV2(Month month, int year) {
        return switch (month){
            case SEPTEMBER, APRIL, JUNE, NOVEMBER -> 30;
            case FEBRUARY -> Year.isLeap(year) ? 29 : 28;
            default -> 31;
        };
    }
}
```


### 02 21.2-enhanced-switch-yield
```java
public class DaysInMonth {
    public static int getDays(Month month, int year) {
        int noOfDays = 0;
        switch (month) {
            case SEPTEMBER:
            case APRIL:
            case JUNE:
            case NOVEMBER:
                noOfDays = 30;
                //return noOfDays;
                break;
            case FEBRUARY: // this is a code block;
                System.out.println("Checking if " + year + " is a leap year");
                noOfDays = Year.isLeap(year) ? 29 : 28;
                //  return noOfDays;
                break;

            default:
                noOfDays = 31;
        }
        return noOfDays;

    }

    public static int getDaysV2(Month month, int year) {
        return switch (month){
            case SEPTEMBER, APRIL, JUNE, NOVEMBER -> 30;
            //case FEBRUARY -> Year.isLeap(year) ? 29 : 28;
            case FEBRUARY -> {
                System.out.println("Check if year is = " + year + " is a leap year ?");
                yield Year.isLeap(year) ? 29 : 28;
            }
            default -> 31;
        };
    }
}
```


### 03 21.3-enhanced-switch-exhaustive
```java
public class DaysInMonth {
    public static int getDays(Month month, int year) {
        int noOfDays = 0;
        switch (month) {
            case SEPTEMBER:
            case APRIL:
            case JUNE:
            case NOVEMBER:
                noOfDays = 30;
                //return noOfDays;
                break;
            case FEBRUARY: // this is a code block;
                System.out.println("Checking if " + year + " is a leap year");
                noOfDays = Year.isLeap(year) ? 29 : 28;
                //  return noOfDays;
                break;

            default:
                noOfDays = 31;
        }
        return noOfDays;

    }

    public static int getDaysV2(Month month, int year) {
        return switch (month){
            case SEPTEMBER, APRIL, JUNE, NOVEMBER -> 30;
            //case FEBRUARY -> Year.isLeap(year) ? 29 : 28;
            case FEBRUARY -> {
                System.out.println("Check if year is = " + year + " is a leap year ?");
                yield Year.isLeap(year) ? 29 : 28;
            }
            default -> 31;
        };
    }

    public static int getDaysV3(Month month, int year) {
        return switch (month){
            case SEPTEMBER, APRIL, JUNE, NOVEMBER -> 30;
            //case FEBRUARY -> Year.isLeap(year) ? 29 : 28;
            case FEBRUARY -> {
                System.out.println("Check if year is = " + year + " is a leap year ?");
                yield Year.isLeap(year) ? 29 : 28;
            }
            //default -> 31;
            case JANUARY, MARCH, MAY, JULY, AUGUST, OCTOBER, DECEMBER -> 31;
        };
    }
}
```


# 23 Records
### 22.1-record-classes-intro
```java
public record Product(String name,
                      BigDecimal cost,
                      String type) {
    //By default, the constructors that are generated by the compiler
    // are called canonical constructor.

}
```



### 22.2-record-classes-custom
```java
public record Product(String name,
                      BigDecimal cost,
                      String type) {
    //By default, the constructors that are generated by the compiler
    // are called canonical constructor.

    public Product {

        if(name!=null && name.isBlank()){
            throw  new IllegalArgumentException("name is not valid!");
        }

        if(cost.compareTo(BigDecimal.ZERO) <=0){
            throw  new IllegalArgumentException("cost is not valid!");
        }

    }

   
    public Product(String name,
                   BigDecimal cost){

        this(name, cost, "GENERAL");

    }

}
```


### 22.3-object-equcality
```java
public record Product(String name,
                      BigDecimal cost,
                      String type) {
    //By default, the constructors that are generated by the compiler
    // are called canonical constructor.

    public Product {

        if(name!=null && name.isBlank()){
            throw  new IllegalArgumentException("name is not valid!");
        }

        if(cost.compareTo(BigDecimal.ZERO) <=0){
            throw  new IllegalArgumentException("cost is not valid!");
        }

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product product)) return false;
        return Objects.equals(name, product.name)
                && Objects.equals(cost, product.cost)
                //&& Objects.equals(type, product.type)
                ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, cost, type);
    }

    public Product(String name,
                   BigDecimal cost){

        this(name, cost, "GENERAL");

    }

}
```


# 24 SealedClassesInterfaces
### 01 23.1-sealed-classes-intro  有点没找到


### 02 23.1-sealed-classes-subclasses   也没找到思密达，只有两个基本上只有两行的定义
```java 

```

### 03 23.3-abstract-interface-sealed    同上啊！！
```java
``` 

### 04 23.4-abstract-interfaces 同上啊！！！！



# 25 Pattern Matching
### 01 24.1-typed-pattern-matching
```java
public class PatternMatchingExample {

    public String pattern(Object o) {
        if (o instanceof Integer) {
            var i = (Integer) o;
            return "Integer:" + i;
        }
        if (o instanceof String) {
            var i = (String) o;
            return "String of length:" + i.length();
        }
        return "Not a String or Integer";

    }

    //patternMatching Using InstanceOf - Java 16

    public String patternUsingInstanceOf(Object o) {
        if (o instanceof Integer i) {
            return "Integer:" + i;
        }
        if (o instanceof String s) {
            return "String of length:" + s.length();
        }
        return "Not a String or Integer";

    }

    //patternMatching Using Switch - Java 21

    public String patternUsingSwitch(Object o) {

        return switch (o) {
            case String s -> "String of length:" + s.length();
            case Integer i -> "Integer:" + i;
            case null, default -> "Not a String or Integer";
        };

    }

}
```


### 02 24.2-records-pattern-matching
```java
public class AnimalService {

    public String retrieveName(Animal animal){
        return switch (animal){
            case null -> ""; // This handles the null pointer exception.
            case Cat cat -> cat.name();
            case Dog dog -> dog.name();
        };

    }

    public String retrieveNameV2(Animal animal){
        return switch (animal){
            case Cat(var name , var color) -> name;
            case Dog (var name , var color)  -> name;
            case null -> ""; // This handles the null pointer exception.
        };

    }

}
```



### 03 24.3-gaurded-patterns
```java
public class AnimalService {

    public String retrieveName(Animal animal){
        return switch (animal){
            case null -> ""; // This handles the null pointer exception.
            case Cat cat -> cat.name();
            case Dog dog -> dog.name();
        };

    }

    public String retrieveNameV2(Animal animal){
        return switch (animal){
            case Cat(var name , var color) -> name;
            case Dog (var name , var color)  -> name;
            case null -> ""; // This handles the null pointer exception.
        };
    }

    public String retrieveNameUsingGuardedPattern(Animal animal){
        return switch (animal){
            case Cat(var name , var color) when name==null -> "";
            case Cat(var name , var color) -> name;
            case Dog (var name , var color)  -> name;
            case null -> ""; // This handles the null pointer exception.
        };
    }


}
```



# 26 CheckoutServiceApplicationReal Time Usecase
### 02 25.2-payment-service   有好多我就全写上了不知道对不对，你可以再看看
```java
public sealed abstract class PaymentGateway permits DebitCardPayment,
CreditCardPayment, RewardsCardPayment{

    public abstract PaymentResponse makePayment(Card card, double amount);
}
```
```java
public sealed abstract class PaymentGateway permits DebitCardPayment,
CreditCardPayment, RewardsCardPayment{

    public abstract PaymentResponse makePayment(Card card, double amount);
}

```
```java
public final class DebitCardPayment extends PaymentGateway {
    @Override
    public PaymentResponse makePayment(Card card, double amount) {
        System.out.println("Acquire Debit Card Payment for the amount = " + amount);
        return PaymentResponse.SUCCESS;
    }
}




```
```java
public sealed abstract class PaymentGateway permits DebitCardPayment,
CreditCardPayment, RewardsCardPayment{

    public abstract PaymentResponse makePayment(Card card, double amount);
}

```
```java
public class PaymentFactory {

    public static PaymentGateway paymentGateway(CardType cardType){
        return switch (cardType){
            case DEBIT -> new DebitCardPayment();
            case CREDIT -> new CreditCardPayment();
            case REWARDS -> new RewardsCardPayment();
            case null -> throw new IllegalArgumentException("Card Type null not supported!");
        };
    }
}

```
```java
public class PaymentService {

    public PaymentResponse makePayment(OrderDetails orderDetails) {

        //implement a payment gateway that can handle the different kinds of payment.
        var paymentGateway = PaymentFactory.paymentGateway(orderDetails.card().cardType());
        return paymentGateway.makePayment(orderDetails.card(), orderDetails.finalAmount());
        //return PaymentResponse.SUCCESS;
    }
}

```




# 28 New Http Client
### 01 27.1-new-httpclient
```java
public class MoviesClient {

    HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(2))
            .build();

    private final ObjectMapper objectMapper = new ObjectMapper().
            registerModule(new JavaTimeModule())
            .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    public static String ALL_MOVIES_URL = "http://127.0.0.1:8000/explore-latest-java-features/src/main/resources/movies.json";
    public static String MOVIE_BY_ID_URL = "http://127.0.0.1:8000/explore-latest-java-features/src/main/resources/movie_by_id.json";

    public Movie getMovieById(){

        var request = requestBuilder(MOVIE_BY_ID_URL);
        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Status Code as : " + response.statusCode());
            return objectMapper.readValue(response.body(), Movie.class);
        } catch (Exception e) {
            System.err.println(e);
            throw new RuntimeException(e);
        }

    }

    public static HttpRequest requestBuilder(String url){

        return HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
    }
}
```




### 02 27.2-new-httpclient-junit
```java
//@Disabled
public class MoviesClientTest {

    MoviesClient moviesClient = new MoviesClient();


    @Test
    void getMovieById(){

        var movie = moviesClient.getMovieById();
        assertNotNull(movie);
        assertEquals("Batman Begins", movie.name());
    }

}
```



### 03 27.3-new-httpclient-async   有点没看懂到底是哪个文件里的 MoviesClient 因为有一个 main 文件里他改了，同级目录下的 test 文件里的 MoviesClient 也改了，你可以再看看
```java
public class MoviesClient {

    HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(2))
            .build();

    private final ObjectMapper objectMapper = new ObjectMapper().
            registerModule(new JavaTimeModule())
            .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    public static String ALL_MOVIES_URL = "http://127.0.0.1:8000/explore-latest-java-features/src/main/resources/movies.json";
    public static String MOVIE_BY_ID_URL = "http://127.0.0.1:8000/explore-latest-java-features/src/main/resources/movie_by_id.json";

    public Movie getMovieById(){

        var request = requestBuilder(MOVIE_BY_ID_URL);
        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Status Code as : " + response.statusCode());
            return objectMapper.readValue(response.body(), Movie.class);
        } catch (Exception e) {
            System.err.println(e);
            throw new RuntimeException(e);
        }

    }

    public CompletableFuture<Movie> getMovieByIdAsync(){

        var request = requestBuilder(MOVIE_BY_ID_URL);
        try {
            var response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

            return response
                    .thenApply(httpResponse ->{
                        System.out.println("Status Code as : " + httpResponse.statusCode());
                        try {
                            return objectMapper.readValue(httpResponse.body(), Movie.class);
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                    });

        } catch (Exception e) {
            System.err.println(e);
            throw new RuntimeException(e);
        }

    }

    public static HttpRequest requestBuilder(String url){

        return HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
    }
}

```



### 04 27.4-httpclient-retrieveAllMovies  这个你也可以再看看
```java
public class MoviesClient {

    HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(2))
            .build();

    private final ObjectMapper objectMapper = new ObjectMapper().
            registerModule(new JavaTimeModule())
            .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    public static String ALL_MOVIES_URL = "http://127.0.0.1:8000/explore-latest-java-features/src/main/resources/movies.json";
    public static String MOVIE_BY_ID_URL = "http://127.0.0.1:8000/explore-latest-java-features/src/main/resources/movie_by_id.json";

    public Movie getMovieById(){

        var request = requestBuilder(MOVIE_BY_ID_URL);
        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Status Code as : " + response.statusCode());
            return objectMapper.readValue(response.body(), Movie.class);
        } catch (Exception e) {
            System.err.println(e);
            throw new RuntimeException(e);
        }

    }

    public CompletableFuture<Movie> getMovieByIdAsync(){

        var request = requestBuilder(MOVIE_BY_ID_URL);
        try {
            var response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

            return response
                    .thenApply(httpResponse ->{
                        System.out.println("Status Code as : " + httpResponse.statusCode());
                        try {
                            return objectMapper.readValue(httpResponse.body(), Movie.class);
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                    });

        } catch (Exception e) {
            System.err.println(e);
            throw new RuntimeException(e);
        }

    }

    public List<Movie> getAllMovies(){

        var request = requestBuilder(ALL_MOVIES_URL);
        try {
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Status Code as : " + response.statusCode());
            System.out.println("Response Body is : "+ response.body());
            return objectMapper.readValue(response.body(), new TypeReference<>() {
            });
        } catch (Exception e) {
            System.err.println(e);
            throw new RuntimeException(e);
        }

    }

    public static HttpRequest requestBuilder(String url){

        return HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
    }
}

```
```java
//@Disabled
public class MoviesClientTest {

    MoviesClient moviesClient = new MoviesClient();


    @Test
    void getMovieById(){

        var movie = moviesClient.getMovieById();
        assertNotNull(movie);
        assertEquals("Batman Begins", movie.name());
    }


    @Test
    void getMovieByIdAsync(){

        var movie = moviesClient.getMovieByIdAsync().join();
        assertNotNull(movie);
        assertEquals("Batman Begins", movie.name());
    }


    @Test
    void getAllMovies(){

        var moviesList = moviesClient.getAllMovies();
        assert  moviesList.size() == 10;
    }

}
```



# 29 Java Platform Module System (JPMS)
### 02 28.2-first-module  基本上什么都没有，你可以再看看
```java

```



### 03 28.3-multiple-modules  这个没怎么看懂，需要你看
```java

```



### 04 28.4-multiple-transitively 没怎么看懂，还是你来吧（
```java

```



### 05 28.5-unnamed-automatic-modules  oh no~ 还是没看懂他在干嘛，还是你来吧


