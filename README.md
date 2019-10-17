# pi_sys

前端平台层，和平台相关的模块

## 支持的平台

* web，浏览器/WebView
* mobile
   + Android
   + iOS
* PC
   + Windows
* 微信
   + 小游戏
   + 小程序
* Service/VM，平台服务端

## 功能

* 全局变量：_$pi
   + define(...)
   + require(...)
   + modules = { 模块 }
* loader，加载器
   + code 代码
   + object 底层对象
   + res 二进制资源
   + cfg 文本配置
* 功能
   + depend，依赖
   + log, 日志
   + timer，定时器
   + store，存储/数据库
   + file，文件系统
   + thread，线程worker
   + sound，声音播放
   + video，视频
   + net
      * http, https
      * ws, wss
* device
   + 设备id
   + camera，相机
   + image，图像选择
   + 加速器
   + 陀螺仪
   + 蓝牙
   + 录音
   + ...
* user
   + 登录/注册
   + 分享
   + 支付
   + ...