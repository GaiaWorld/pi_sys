# pi_sys 系统

* 依赖构建系统，将不同系统的兼容代码构建成不同的引导代码。 
* 应用项目可以通过配置来改变引导和获得控制权。

## 多平台

* Web
* WebView: mobile | iOS | 小程序 | PC
* 微信小游戏
* 平台 Service | VM

## 启动

* 全局变量
   + self，比如web版本的windows对象
   + self._$pi = {define, require, modules = {} }
   + env：环境相关的变量
      * winit
      * userAgent

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

===========

下周：构建，运行hello：pi-demo

* 我/子午线：跑通pi-sys。helloworld。 userAgent->env
* 小游戏：陈中辉。以一个小游戏跑起来。
* 小燕：pi-2d拆出来，跑通以一个gui-demo跑起来。
* 白鹏：pi-babylon，跟 厨房 性能。以一个3ddemo跑起来。