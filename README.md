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
   + env: 环境相关的变量
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

1，项目需要根据情况控制个别图片的压缩质量。
2，多平台的多种压缩方式: 
   压缩图片: png, jpg, webp
   压缩纹理: etc(Android), pvrtc(iOS), astc
3，多平台的多分辨率需求。默认3种。

如果不做压缩，所有图片其实都是png和jpg。不透明和只有透明不透明2种的，也是jpg出图，透明部分为纯黑色。
我们的目标是项目内最低成本的拥有多分辨率，质量和大小最平衡的图片。

美术制作时，比例按高分辨率来做，由构建工具转成中分辨率和低分辨率。(1920×1024 1440×768 960×512, 比例系数为1.875) (1920×1000 1440×750 960×500) (2000×1000 1500×750 1000×500)
界面制作时，采用自适应的top,bottom,left,right,center的绝对定位和flex布局，来适应实际屏幕的比例变化。

在GUI版本上，GUI会有一个图片组件负责显示。
UI的图片组件，名字为psd的名字，里面有每图层的名字和对应图片及UV。 在tpl中使用时，直接使用该组件，参数为图层名。
以后UI的美术出图会使用PSD作为标准格式。由构建工具生成多种分辨率和多种压缩的合并图片。项目可以在PSD上修改特定字段来平衡质量。

Scene则还是会使用GLTF配置。会有一个单独的构建合并过程，来修改UV和配置。

web和webview平台: 
    android:  png, webp | webp, etc,
    IOS:  png, pvrtc | jpg, pvrtc,
    win:  png, webp, dds | webp, dds,
微信小游戏: 
    android:  png | jpg, etc,
    IOS: png, pvrtc | jpg, pvrtc,
VM: 
    android:  png, astc | astc,
    IOS: png, astc | astc,

不透明的默认格式为jpg, 根据平台使用 etc pvrtc dds astc。 不透明必然使用压缩图片或纹理，可以调整压缩率。
透明的默认格式为png, 根据平台使用 webp pvrtc dds astc
启动代码必须确定分辨率，可以用 是否为mobile，屏幕大小，配置，作为系数确定分辨率。小游戏和vm版可以维护一个机型配置表。
启动代码必须确定平台。 平台和分辨率一起确定.depend.
每平台的每个分辨率对应一个depend。一个图片在一个depend上，只有一个文件，该文件的格式由项目的配置决定。
全局的压缩配置，直接在app.conf里面配置。
psd配置里面， 可以决定每个图片，在每平台每分辨率下的压缩级别和参数。

项目在使用UI时， 应该使用psd中的图层名， 由组件来添加后缀名。后缀名包括分辨率和类型。
项目在使用场景渲染时， 一般应该有配置，配置里面应该引用的是md5值的图片资源，该图片资源应该是png或jpg，md5值为该文件的hash。 也就是说场景导出的图片全是最佳的png或jpg。然后通过构建转换成多分辨率和多格式。 然后有单独的函数来做转换。

