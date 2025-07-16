---
titleTemplate: Neural Network
---
# 部署OpenVINO

## Windows
- **第 1 步**: 在Pycharm终端键入以下命令行即可
```bash
pip install openvino-dev
```

## 转化模型格式

### 将.pt文件转化为.onnx文件
```py
from ultralytics import YOLO

model = YOLO('yolov12n.pt')
model.export(format="onnx", half=True)  # or format="onnx"
```

### 将.onnx文件转为.xml和.bin
```py
from openvino import convert_model, save_model
import os

# 指定您的 ONNX 模型路径
onnx_model_path = 'E:/project/yolov12/yolov12n.onnx'

# 指定您想要保存 OpenVINO IR 模型的输出路径（包括文件名）
output_path = 'E:/project/yolov12/openvino/yolov12n.xml'

# 如果输出目录不存在，尝试创建它
output_dir = os.path.dirname(output_path)
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

try:
    # 使用 convert_model 函数进行转换
    ov_model = convert_model(onnx_model_path)

    # 保存模型
    save_model(ov_model, output_path)

    print(f"ONNX 模型已成功转换为 OpenVINO IR 格式，保存在: {output_path} 和相应的 .bin 文件")

except Exception as e:
    print(f"转换过程中发生错误：{e}")
```
## Ubuntu22.04

- 第 1 步：下载 GPG-PUB-KEY-INTEL-SW-PRODUCTS.PUB。您也可以使用以下命令
```bash
wget https://apt.repos.intel.com/intel-gpg-keys/GPG-PUB-KEY-INTEL-SW-PRODUCTS.PUB
```
- 第 2 步：将此密钥添加到系统密钥环。
```bash
sudo apt-key add GPG-PUB-KEY-INTEL-SW-PRODUCTS.PUB
```
- 第 3 步：通过以下命令添加存储库。

```bash
# Ubuntu 20
echo "deb https://apt.repos.intel.com/openvino/2025 ubuntu20 main" | sudo tee /etc/apt/sources.list.d/intel-openvino-2025.list
```
```bash
# Ubuntu 22
echo "deb https://apt.repos.intel.com/openvino/2025 ubuntu22 main" | sudo tee /etc/apt/sources.list.d/intel-openvino-2025.list
```
```bash
# Ubuntu 24
echo "deb https://apt.repos.intel.com/openvino/2025 ubuntu24 main" | sudo tee /etc/apt/sources.list.d/intel-openvino-2025.list
```
- 第 4 步：使用更新命令更新软件包列表。
```bash
sudo apt update
```
- 第 5 步：验证 APT 存储库的设置是否正确。使用 apt-cache 命令查看包含所有可用 OpenVINO 程序包和组件的列表
```bash
apt-cache search openvino
```
- 第 6 步：安装 OpenVINO 运行时。
```bash
sudo apt install openvino-2025.0.0
```

## 验证测试

::: details 点击查看项目结构
```bash
├── build
├── CMakeLists.txt
├── config
│   ├── bus.jpg
│   ├── yolov12n.bin
│   └── yolov12n.xml
├── include
└── src
    └── infer_image.cpp
```
:::
::: details 点击查看CMakeLists.txt
```cmake
cmake_minimum_required(VERSION 3.10)
project(yolov12_inference)

find_package(OpenCV REQUIRED)
message(STATUS "Found OpenCV library: ${OpenCV_VERSION}")
find_package(OpenVINO REQUIRED)


file(GLOB_RECURSE YOLO_SOURCE_FILES
        "${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp"
        "${CMAKE_CURRENT_SOURCE_DIR}/src/*.c"
)

add_executable(${PROJECT_NAME} ${YOLO_SOURCE_FILES})


target_link_libraries(${PROJECT_NAME} PUBLIC
    ${OpenCV_LIBS}
    ${OpenVINO_LIBRARIES}
    openvino::frontend::onnx
    openvino::runtime
    openvino::frontend::tensorflow_lite
)
```
:::
::: details 点击查看.cpp 测试代码
```cpp
#include <iostream>
#include <string>
#include <vector>
#include <opencv2/opencv.hpp>
#include <openvino/openvino.hpp>

int main() {
    // 指定 OpenVINO IR 模型的路径
    std::string model_path = "../config/yolov12n.xml";
    std::string weights_path = "../config/yolov12n.bin";

    // 指定要识别的图片路径
    std::string image_path = "../config/bus.jpg";

    try {
        // 1. 创建 OpenVINO Core 对象
        ov::Core core;

        // 2. 读取模型
        auto model = core.read_model(model_path, weights_path);

        // 3. 获取模型的输入端口
        auto input_port = model->inputs().front();
        ov::Shape input_shape = input_port.get_shape();

        // 4. 编译模型到设备 (这里使用 CPU，您可以根据需要更改为 "GPU")
        auto compiled_model = core.compile_model(model, "CPU");

        // 5. 创建推理请求
        auto infer_request = compiled_model.create_infer_request();

        // 6. 使用 OpenCV 读取图片
        cv::Mat image = cv::imread(image_path);
        if (image.empty()) {
            std::cerr << "Error: Could not open the image: " << image_path << std::endl;
            return 1;
        }

        // 7. 预处理图像
        cv::Mat resized_image;
        cv::resize(image, resized_image, cv::Size(input_shape[3], input_shape[2]));
        cv::Mat blob;
        cv::dnn::blobFromImage(resized_image, blob, 1.0 / 255.0, cv::Size(), cv::Scalar(), true, false);

        // 8. 设置输入数据到推理请求
        ov::Tensor input_tensor(input_port.get_element_type(), input_shape, blob.ptr());
        infer_request.set_input_tensor(input_tensor);

        // 9. 执行推理
        infer_request.infer();

        // 10. 获取输出结果
        const ov::Tensor& output_tensor = infer_request.get_output_tensor();
        const float* output_data = output_tensor.data<const float>();

        // 11. 后处理输出结果 (您需要根据您的 YOLOv12 模型实现这部分)
        std::cout << "Inference Results (first 100 elements):" << std::endl;
        size_t output_size = output_tensor.get_size();
        for (size_t i = 0; i < std::min((size_t)100, output_size); ++i) {
            std::cout << output_data[i] << " ";
        }
        std::cout << std::endl;
        if(!resized_image.empty())cv::imshow("123", resized_image);
        else std::cout<<1<<std::endl;
        cv::waitKey(0);

    } catch (const std::exception& error) {
        std::cerr << "Error occurred: " << error.what() << std::endl;
        return 1;
    }

    return 0;
}

```
:::