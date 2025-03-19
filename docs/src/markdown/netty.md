---
titleTemplate: Markdown
---
# Netty

Netty 是一个高性能、异步事件驱动的网络通信框架，主要用于构建快速、可靠、可伸缩的网络应用程序。Netty 是基于 Java 的，它简化了很多网络编程的复杂性，广泛应用于高并发场景中。

## 1. Netty 基本概念

### 1.1 Channel
**Channel** 是 Netty 中的一个重要概念，它表示一个网络连接（如 TCP 连接）。Netty 中有多种类型的 **Channel**，比如：
- **NioSocketChannel**：用于 TCP 连接。
- **NioDatagramChannel**：用于 UDP 连接。

### 1.2 EventLoop
**EventLoop** 是一个用于处理 I/O 操作的线程。每个 **Channel** 都会绑定一个 **EventLoop**，它负责处理与 **Channel** 相关的所有 I/O 事件。**EventLoop** 通常会绑定到一个线程池中。

### 1.3 ChannelPipeline
**ChannelPipeline** 是一个 **Channel** 处理的责任链，它包含多个 **ChannelHandler**，用于对 I/O 事件进行处理、拦截、修改或转发。

### 1.4 ChannelHandler
**ChannelHandler** 是用来处理 I/O 事件的处理器，处理逻辑通常包括：
- 处理接收到的消息。
- 处理写出数据。
- 处理异常或关闭事件。

## 2. Netty 架构与流程

### 2.1 Netty 架构
Netty 的架构主要由以下几个组件组成：
- **Bootstrap**：启动客户端或服务器，配置事件循环组、Channel 类型、ChannelHandler 等。
- **EventLoopGroup**：线程池，用于处理所有的 I/O 操作。
- **Channel**：表示一个网络连接。
- **ChannelPipeline**：事件处理链。
- **ChannelHandler**：处理器，负责实际的 I/O 操作。

### 2.2 处理流程
1. **客户端/服务器启动**：使用 **Bootstrap** 或 **ServerBootstrap** 来启动 Netty 服务，配置相关参数。
2. **I/O 操作**：Netty 通过 **EventLoopGroup** 来管理和分配线程，每个 **Channel** 都有一个对应的 **EventLoop** 来处理 I/O 操作。
3. **事件处理**：通过 **ChannelPipeline** 进行事件的逐级传递，直到被某个 **ChannelHandler** 处理。
4. **数据传输**：数据通过 **ChannelHandlerContext** 在 **ChannelPipeline** 中传递，完成编码/解码、业务处理等操作。

## 3. Netty 常用组件

### 3.1 Bootstrap
**Bootstrap** 是用于客户端启动的工具类，用于设置各种参数，如 **EventLoopGroup**、**Channel** 类型、**ChannelHandler** 等。

```java
Bootstrap bootstrap = new Bootstrap();
bootstrap.group(eventLoopGroup)
         .channel(NioSocketChannel.class)
         .handler(new MyClientHandler());
```


### 3.2 ServerBootstrap
**ServerBootstrap** 是用于服务器端启动的工具类，它的使用方式类似于 **Bootstrap**。

```java
ServerBootstrap serverBootstrap = new ServerBootstrap();
serverBootstrap.group(bossGroup, workerGroup)
                .channel(NioServerSocketChannel.class)
                .childHandler(new MyServerHandler());
```



### 3.3 ChannelHandler 例子
**ChannelHandler** 用于处理接收到的消息或者其他 I/O 操作。常见的处理器有 **ChannelInboundHandlerAdapter** 和 **ChannelOutboundHandlerAdapter。**

#### Inbound Handler 示例
```java
public class MyChannelInboundHandler extends ChannelInboundHandlerAdapter {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("Received: " + msg);
        ctx.fireChannelRead(msg);  // 传递给下一个 handler
    }
}
```
#### Outbound Handler 示例
```java
public class MyChannelOutboundHandler extends ChannelOutboundHandlerAdapter {
    @Override
    public void write(ChannelHandlerContext ctx, Object msg, ChannelPromise promise) throws Exception {
        System.out.println("Sending: " + msg);
        super.write(ctx, msg, promise);  // 发送消息
    }
}
```




## 4. 编码与解码
Netty 提供了 **ByteToMessageDecoder** 和 **MessageToByteEncoder** 来处理编码与解码操作。

### 4.1 编码器（MessageToByteEncoder）
用于将对象编码成字节流发送到网络。

```java
public class MyMessageEncoder extends MessageToByteEncoder<MyMessage> {
    @Override
    protected void encode(ChannelHandlerContext ctx, MyMessage msg, ByteBuf out) throws Exception {
        out.writeInt(msg.getId());
        out.writeBytes(msg.getData());
    }
}
```
### 4.2 解码器（ByteToMessageDecoder）
用于将接收到的字节流解码为对象。

```java
public class MyMessageDecoder extends ByteToMessageDecoder {
    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        if (in.readableBytes() < 4) {
            return;  // 至少需要 4 字节来读取数据
        }

        int id = in.readInt();
        byte[] data = new byte[in.readableBytes()];
        in.readBytes(data);
        
        MyMessage message = new MyMessage(id, data);
        out.add(message);
    }
}
```