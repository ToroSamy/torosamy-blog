---
titleTemplate: Http
---

# Http

## 简介
HTTP，全称 **HyperText Transfer Protocol（超文本传输协议）**。\
它是互联网的基石，规定了客户端（比如浏览器）和服务器之间如何通信。

- 当你在浏览器地址栏输入 `https://example.com` 并按下回车时，浏览器和服务器之间的交流就是通过 HTTP 来完成的。
- 简单来说，HTTP 就像是两个人对话时的"交流语言"。


> 浏览器就像你去餐厅点餐的顾客，HTTP就是点餐的语言，服务员就是服务器。
> 你说"我要一份牛排"，服务员听懂后去厨房拿给你。这一来一回的过程就是HTTP。




---

## 特点

- **无状态**：每次请求都是独立的，服务器不会记住你之前说过什么
- **灵活**：支持多种数据格式（HTML、JSON、图片、视频等）
- **明文传输**：易于调试，但不安全

---

## 请求与响应

HTTP 是基于 **请求-响应模型** 的协议。也就是： 
- **客户端发起请求**（Request）。 
- **服务器返回响应**（Response）。

###  请求报文

HTTP 请求报文一般分为三部分：请求行、请求头（Headers）、请求体（Body）
#### 请求行
包含了请求方法、URL 和协议版本。
```
GET /index.html HTTP/1.1
```

#### 请求头
用来说明客户端的环境信息和请求的附加内容。
```
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

#### 请求体
一般在 POST、PUT 这类方法中使用，用来传输数据。
```
username=alice&password=123456
```
---

### 响应报文

服务器返回的 HTTP 响应报文结构与请求类似：
#### 状态行
```
HTTP/1.1 200 OK
```

#### 响应头
包含了服务器信息、返回内容的类型、长度等。
```
Content-Type: text/html; charset=UTF-8
Content-Length: 1024
```

#### 响应体
真正的内容，比如 HTML 页面、JSON 数据等。

---

## 常见方法

HTTP 提供了一系列方法，让客户端可以和服务器"沟通"。

|方法|作用|举例|
|-|-|-|
|**GET**|获取资源（类似"点菜单"）|打开网站首页：GET 请求|
|**POST**|提交数据（比如提交表单、上传文件）|发布一篇文章：POST 请求|
|**PUT**|更新资源|修改个人资料：PUT 请求|
|**DELETE**|删除资源|删除一条评论：DELETE 请求|
|**HEAD**|获取资源的元信息，不返回内容|
|**OPTIONS**|查询服务器支持的方法|


---

## 状态码

服务器返回的状态码是对请求结果的反馈

- **1xx**：信息类（例如 100 Continue）。
- **2xx**：成功（200 OK、201 Created）。
- **3xx**：重定向（301 永久重定向、302 临时重定向）。
- **4xx**：客户端错误（400 Bad Request、404 Not Found）。
- **5xx**：服务器错误（500 Internal Server Error、502 Bad Gateway）。


---

## HTTPS

HTTP是明文传输，**HTTPS** 即`HTTP over TLS`, HTTP 流量通过 **[TLS加密](../Cryptography/TLS)** 加密传输

- **安全性**：防止数据被窃听
- **完整性**：防止数据被篡改
- **身份验证**：确保对方就是你要访问的网站

---



## 协议的演进

| 协议版本   | 特点 |
|------------|------|
| **HTTP/0.9** | - 只有 GET 方法<br>- 只能传输 HTML |
| **HTTP/1.0** | - 增加了请求头、响应头<br>- 引入了状态码<br>- 每次请求都需要重新建立连接，效率低下 |
| **HTTP/1.1** | - **长连接**（Keep-Alive），不用每次都重新握手<br>- 支持管线化（Pipelining）<br>- 引入了 Host 头部，支持虚拟主机 |
| **HTTP/2**   | - 使用二进制传输，而不是文本<br>- **多路复用**：一个连接上可以同时处理多个请求<br>- **头部压缩**：减少冗余数据传输 |
| **HTTP/3**   | - 基于 **QUIC 协议**（运行在 UDP 上）<br>- 连接更快，延迟更低<br>- 更适合现代互联网（移动端、弱网环境） |


---

## 案例分析

- 当访问 `https://api.example.com` 时，浏览器先查找 DNS，把域名解析成 IP 地址
- 建立 TCP 连接。如果是 HTTPS，还需要 TLS 握手
- 浏览器发送一个请求：`GET / HTTP/1.1    Host: api.example.com`
- 服务器返回一个 HTML 页面。浏览器解析 HTML。
- 浏览器发现需要加载其他内容，发起更多请求 `GET https://api.example.com/users/123`
- 返回

``` json
{
  "id": 123,
  "name": "Alice",
  "age": 25
}
```

### 完整示例

#### 请求

``` http
POST /login HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 32

username=alice&password=123456
```

#### 响应

``` http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 27

{"status":"success","id":1}
```

---
