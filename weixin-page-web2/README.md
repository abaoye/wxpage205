# 校园共享平台web项目

===

### 1. 使用

* 进入根目录，执行npm install，安装项目依赖
* 执行npm start启动项目
* 进入 http://localhost:3000/example 查看样例数据


### 2. 返回数据格式

返回的数据包含以下：

* code：http请求的返回状态
* msg：返回给前端的数据实体

### 3. 说明

* 该项目使用node.js + express搭建
* 去除了express中view组件，将页面展示交给专门的前端项目，该项目仅负责向前端提供数据。实现了简单的前后端分离。


### 4. 数据库临时配置

* 在本地新建nodejs库，用户名和密码为nodejs
* 通过以下语句新建测试用户表：

```
CREATE TABLE `T_User` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(16) NOT NULL DEFAULT '',
  `AddTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```