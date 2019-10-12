# 系统兼容框架
    提供一个空或通用实现， 让其他模块可以无缝调用
    现在有4种对应的实现， web ios app mini_game
    依赖构建系统，将不同系统的兼容代码构建成不同的引导代码。 应用项目可以通过配置来改变引导和获得控制权。

## 环境, 路径及环境变量

## 启动及模块加载
    # 提供_$self _$pi全局环境

## 设备

## 进程或activity

## 线程

## 网络

## 存储

## 图片

## 声音

## 视频

## 字体

## 时间

## 数字文字处理和其他杂项
    大数 utf8 base64等


## 调试标识、日志和错误处理


## 账户、支付及分享

web: index.html -> .version -> sys.js + .depend -> 下载代码模块(pi, pi_gui, app, app_a/), 引导代码app_a/main.js
app_h5: file:///index.html + file:///sys.js -> .version -> .depend + 更新 -> 下载代码模块(pi, pi_gui, app, app_a/), 引导代码app_a/main.js
app: main.js(sys.js)-> .version -> .depend + 更新 -> 下载代码模块(pi, pi_gui, app, app_a/), 引导代码app_a/main.js
mini_game: main.js(sys.js)-> .version -> .depend -> 下载代码模块(pi, pi_gui, app, app_a/), 引导代码app_a/main.js

因为GUI的初始化较慢，为了和网络下载并行，应该将pi, pi_gui作为第一部分进行加载，然后加载app, app_a。同步初始化GUI。