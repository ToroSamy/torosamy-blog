---
titleTemplate: Cpp Markdown
---
# Cmake
## CMake 基础命令
- `cmake_minimum_required(VERSION <version>)`  
  设置 CMake 的最低版本要求。
  
- `project(<name> [<languages>])`  
  设置项目名称，并指定支持的语言（如 C++, C, Fortran）。

- `add_executable(<name> <source1> <source2> ...)`  
  创建一个可执行文件。

- `add_library(<name> <source1> <source2> ...)`  
  创建一个库文件。

- `target_link_libraries(<target> <library> ...)`  
  为目标添加链接库。

- `include_directories(<dir> ...)`  
  添加头文件目录。

- `link_directories(<dir> ...)`  
  添加库文件目录。

---

## 变量与缓存
- `set(<var> <value>)`  
  设置变量的值。

- `set(<var> <value> CACHE <type> <docstring>)`  
  设置缓存变量，允许在 CMake GUI 或命令行中修改。

- `option(<var> "Description" <default>)`  
  设置布尔类型的选项。

- `message(<mode> "message")`  
  打印消息。

- `get_filename_component(<var> <path> <component>)`  
  获取文件路径的某部分信息（如目录名、文件名等）。

---

## 构建选项
- `CMAKE_BUILD_TYPE`  
  设置构建类型，如 Debug、Release、RelWithDebInfo 等。

- `CMAKE_INSTALL_PREFIX`  
  设置安装路径。

- `CMAKE_CXX_STANDARD`  
  设置 C++ 标准（如 C++11、C++17）。

- `CMAKE_VERBOSE_MAKEFILE`  
  设置是否显示详细的 Makefile 构建过程。

---

## 目标设置与属性
- `target_include_directories(<target> PUBLIC|PRIVATE|INTERFACE <dir> ...)`  
  设置目标的头文件目录。

- `target_compile_definitions(<target> PUBLIC|PRIVATE|INTERFACE <definition>)`  
  设置编译时的宏定义。

- `target_compile_options(<target> PUBLIC|PRIVATE|INTERFACE <options>)`  
  设置编译选项。

- `target_link_libraries(<target> <library> ...)`  
  设置目标链接的库。

---

## 条件判断与循环
- `if(<condition>) ... endif()`  
  条件判断语句。

- `foreach(<var> <list>) ... endforeach()`  
  循环语句。

- `while(<condition>) ... endwhile()`  
  循环语句。

- `elseif(<condition>)`  
  用于在 if 语句中添加额外条件。

---

## 模块与外部库
- `find_package(<package> [version] [REQUIRED|QUIET])`  
  查找外部库或模块。

- `find_library(<var> NAMES <library> [path])`  
  查找库文件。

- `find_file(<var> NAMES <filename> [path])`  
  查找文件。

- `find_path(<var> NAMES <filename> [path])`  
  查找头文件路径。

---
## 测试与安装
- `enable_testing()`  
  启用测试。

- `add_test(<name> <command>)`  
  添加一个测试用例。

- `install(TARGETS <target> DESTINATION <dir>)`  
  安装目标文件。

- `install(FILES <file1> <file2> ... DESTINATION <dir>)`  
  安装单个文件。

---

## 高级功能
- **自定义命令**  
  - `add_custom_command()`  
    自定义构建过程中的命令。

- **生成脚本**  
  - `execute_process()`  
    在 CMake 配置过程中执行外部程序。

- **跨平台构建**  
  - 设置适当的编译器标志和库路径，以确保跨平台构建。

- **导出和导入配置**  
  - `export()`  
    导出 CMake 配置。

- **创建和使用 CMake 包**  
  - `find_package()` 与 CMake 配置包的使用。

---

## CMake 配置文件
- `CMakeLists.txt`  
  每个目录下的配置文件，定义了如何构建该目录下的文件。

- **工具链文件**  
  `-DCMAKE_TOOLCHAIN_FILE=<path>`  
  用于设置交叉编译等工具链配置。

- **构建配置文件**  
  `CMakeCache.txt`  
  用于存储缓存变量的配置文件。

---

## 常见调试命令
- `cmake --build <dir> --target <target> --config <config>`  
  指定构建目标。

- `cmake --install <dir>`  
  安装构建文件。

- `cmake --version`  
  查看当前 CMake 版本。

---

## 资源与链接
- 官方文档: [https://cmake.org/documentation/](https://cmake.org/documentation/)
- CMake教程: [https://cmake.org/cmake-tutorial/](https://cmake.org/cmake-tutorial/)
