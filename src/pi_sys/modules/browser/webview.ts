
// ========================= import 
declare var pi_modules;

import { NativeObject, ParamType, registerSign } from './native';

// ========================= export

export enum screenMode {
    portrait = "portrait",
    landscape = "landscape"
}

/**
 * WebView管理相关
 */
export class WebViewManager extends NativeObject {

    public static isDefaultKilled(success: (success) => void) {
        if (isJSVM) {
            getInstance().call('isDefaultKilled', { success });
        }
    }

    public static reloadDefault() {
        if (isJSVM) {
            getInstance().call('reloadDefault', {});
        }
    }

    /**
     * 创建新的WebView窗口并弹出来
     * 注：webViewName不能和已有的WebView重复，如果相同，抛异常
     * 注：主WebView的名字是"default"
     */
    public static open(webViewName: string, url: string, title: string, injectContent: string, screenOrientation: screenMode) {
        getInstance().call('openWebView', { webViewName, url, title, injectContent, screenOrientation });
    }

    /**
     * 释放指定名字的WebView
     * 注：不能使用这个释放主WebView
     */
    public static close(webViewName: string) {
        if (isJSVM) {
            window["JSVM"].closeWebView(webViewName);
        } else {
            getInstance().call('closeWebView', { webViewName });
        }
    }

    /**
     * 获取屏幕刘海与下部分高度
     */
    public static getScreenModify(success: (high: number, low: number) => void) {
        getInstance().call('getScreenModify', { success });
    }

    public static minWebView(webViewName: string, walletUrl: string) {
        if (isJSVM) {
            window["JSVM"].minWebView(webViewName, walletUrl);
        } else {
            getInstance().call('minWebView', { webViewName, walletUrl });
        }
    }

    /**
     * 创建一个新的webview，但不会显示出来
     * 一般用于微信支付
     * headers = {"Referer": url}
     */
    public static newView(webViewName: string, url: string, headers: any) {
        headers = headers || {};
        const headerString = JSON.stringify(headers);
        getInstance().call('newView', { webViewName, url, headers: headerString });
    }

    /**
     * 只有newView的东西，才能用freeView释放
     */
    public static freeView(webViewName: string) {
        getInstance().call('freeView', { webViewName });
    }

    /**
     * 往指定名字的WebView发信息
     * globalName: 因为 webview 有 sdk，所以需要这个参数："pi_sdk" 或者 "pi_modules"
     */
    public static postMessage(webViewName: string, message: string, globalName?: string) {
        globalName = globalName || "pi_modules";

        if (isJSVM) {
            console.log(`~~~~~~~~ JSVM.postMessage=(webviewName=${webViewName}, globalName=${globalName}, message=${message}`);
            (<any>window).JSVM.postMessage(webViewName, globalName, message);
        } else if (isPC) {
            console.log(`~~~~~~~~ PC.postMessage=(webviewName=${webViewName}, globalName=${globalName}, message=${message}`);
            pi_modules.globalCallback.onWebViewPostMessage('self', globalName, message);
        } else {
            console.log(`~~~~~~~~ Android.postMessage=(webviewName=${webViewName}, globalName=${globalName}, message=${message}`);
            getInstance().call('postWebViewMessage', { webViewName, globalName, message });
        }
    }

    /**
     * 注册收到别的webView发过来的postmessage信息后的回调函数
     */
    public static addPostMessageListener(listener: PostMessageListener) {
        if (postMessageListeners.indexOf(listener) < 0) {
            postMessageListeners.push(listener);
        }
    }

    /**
     * 取消注册当收到别的WebView发过来的postmessage消息后的回调函数
     */
    public static removePostMessageListener(listener: PostMessageListener) {
        const position = postMessageListeners.indexOf(listener);
        if (position >= 0) {
            postMessageListeners.splice(position, 1);
        }
    }

    /**
     * 往指定名字的WebView调用指定模块的导出方法
     * data: 指定对方WebView执行的模块和导出方法
     * callback：返回结果的回调函数， 如果要调用的function中，有callBack，就不能写该callBack
     * 注：RPC都是一来一回的结构，没有注册一次可以调用多次的结构！
     */
    public static rpc(webViewName: string, data: RpcData, callback?: Function) {
        const funcs = [];
        let globalName = data.globalName || "pi_modules";
        
        // 本地的全局变量。
        data.globalName = pi_modules.isSDK ? "pi_sdk" : "pi_modules";
        data.params = data.params || [];
        data.params = data.params.map(v => {
            if (v === undefined) {
                v = null;
            } else if (v instanceof Function) {
                const id = funcs.length;
                funcs.push(v);
                v = RPC_CALLBACK_PARAM + id;
            }
            return v;
        });

        const sign = <RpcCallSign>data;
        if (callback) {
            sign.resultCallbackID = funcs.length;
            funcs.push(callback);
        }

        if (funcs.length > 0) {
            sign.rpcID = ++rpcCurrentID;
            rpcMap.set(sign.rpcID, funcs);
        }

        if (isPC) {
            pi_modules.globalCallback.onWebViewPostMessage('self', RPC_CALL_START + JSON.stringify(sign));
        } else {
            WebViewManager.postMessage(webViewName, RPC_CALL_START + JSON.stringify(sign), globalName);
        }
    }
}


type Json = any;

/**
 * 管道，和对方 多次 消息发送
 */
export class Channel {
    
    static _createCB: (stub: Channel) => void = null;

    private _msgCB: (statusCode: number, message: Json) => void = null;
    
    set onMessage(cb: (statusCode: number, message: Json) => void) {
        this._msgCB = cb;
    }

    send(message: Json) {
    }

    destroy() {

    }
    
    // 向指定的目标创建管道
    // srcName_id 就是每个管道的标志
    static create(targetID: string, globalName: string) {
        // 返回 Promise<Channel>
    }
    
    // 设置 收到对方管道创建的监听器
    static setCreateListener(cb: (stub: Channel) => void) {
        Channel._createCB = cb;
    }
}

// ========================= implmentation

registerSign(WebViewManager, {
    newView: [{
        name: 'webViewName',
        type: ParamType.String
    }, {
        name: 'url',
        type: ParamType.String
    }, {
        name: 'headers',
        type: ParamType.String
    }],
    freeView: [{
        name: 'webViewName',
        type: ParamType.String
    }],
    openWebView: [{
        name: 'webViewName',
        type: ParamType.String
    }, {
        name: 'url',
        type: ParamType.String
    }, {
        name: 'title',
        type: ParamType.String
    }, {
        name: 'injectContent',
        type: ParamType.String
    }, {
        name: 'screenOrientation',
        type: ParamType.String
    }],
    closeWebView: [{
        name: 'webViewName',
        type: ParamType.String
    }],
    postWebViewMessage: [{
        name: 'webViewName',
        type: ParamType.String
    }, {
        name: 'globalName',
        type: ParamType.String
    }, {
        name: 'message',
        type: ParamType.String
    }],
    getScreenModify: [],
    isDefaultKilled: [],
    reloadDefault: [],
    minWebView: [{
        name: 'webViewName',
        type: ParamType.String
    },
    {
        name: 'walletUrl',
        type: ParamType.String
    }]

});

/**
 * PostMessage的监听器
 */
type PostMessageListener = (fromWebViewName: string, message: string) => void;

/**
 * Rpc的调用数据
 */
export interface RpcData {
    globalName?: string;  // 对方的全局变量名，传空就意味着 pi_modules
    moduleName: string;  // 模块名
    methodName: string;  // 方法名
    params: any[];        // 参数组成的数组，参数可以有回调函数
}

/**
 * Rpc调用的规范
 */
interface RpcCallSign {
    globalName: string;         // 当rpc返回时候的globalName
    moduleName: string;         // 模块名
    methodName: string;         // 模块的导出方法名
    params: any[];              // 参数组成的数组，这里参数的回调函数全部转成Callback ID
    rpcID?: number;             // 可选：调用rpc前注册到Map的RPC ID
    resultCallbackID?: number;  // 可选：回调函数ID
}

/**
 * Rpc回应的规范
 */
interface RpcReplySign {
    rpcID: number;      // 调用rpc前注册到Map的RPC ID
    callbackID: number; // 回调函数ID
    args: any[];        // 参数组成的数组
}

/**
 * 特殊的消息开头，代表这是一个RPC调用
 */
const RPC_CALL_START = '$WEBVIEW_RPC_CALL: ';

/**
 * 特殊的消息开头，代表这是一个RPC回应
 */
const RPC_REPLY_START = '$WEBVIEW_RPC_REPLY: ';

/**
 * 特殊的消息格式，代表参数是一个函数
 */
const RPC_CALLBACK_PARAM = '$WEBVIEW_RPC_FUNCTION_PARAM: ';

/**
 * 监听postmessage的列表
 */
const postMessageListeners = <PostMessageListener[]>[];

/**
 * rpc的当前可用的id 和 RPC映射表
 */
let rpcCurrentID = 0;
const rpcMap = new Map<number, Function[]>();

let count = 0;

/**
 * 注册到pi_modules上的全局函数，用于接收别的webView发送过来的消息 
 */
pi_modules.globalCallback.onWebViewPostMessage = function (fromWebView: string, message: string) {
    let modName = pi_modules.isSDK ? "pi_sdk" : "pi_modules";

    console.log(`${modName}::onWebViewPostMessage(${fromWebView}, message = ${message}), count = ${++count}`);
    // 收到对方的rpc调用请求，处理
    if (message.startsWith(RPC_CALL_START)) {
        message = message.slice(RPC_CALL_START.length);
        const data = <RpcCallSign>JSON.parse(message);
        return handleRpcCall(fromWebView, data);
    }

    // 收到对方的rpc回应，处理
    if (message.startsWith(RPC_REPLY_START)) {
        message = message.slice(RPC_REPLY_START.length);
        const data = <RpcReplySign>JSON.parse(message);
        return handleRpcReply(data);
    }

    // 其他消息，看高层，谁关心谁处理
    for (const listener of postMessageListeners) {
        listener(fromWebView, message);
    }
};

/**
 * 注册到window上的全局函数，用于接收Native发送过来的消息
 * @param moduleName
 * @param methodName
 * @param params
 * @param callBack(statuCode, message)
 */
window["onNativePostMessage"] = function(moduleName: string, methodName: string, params: string, callBack:(statuCode: number, message: string)=>void){
    let func;
    pi_modules.commonjs.exports.require([moduleName], {}, function (mods) {
        const mod = mods[0];
        func = mod[methodName];
        if (!func) {
            callBack(-1, "call throw error")
        }
        if (func) {
            let args:any[] = [];
            if(params !== undefined && params !== ""){
                args = params.split(',')
            }
            let cb = function(result){
                callBack(0, JSON.stringify(result))
            }
            args.push(cb)
            try{
                func(...args)
            }catch (e){
                callBack(-1, "call throw error")
            }
        }else{
            callBack(-1, "call throw error")
        }
    })
}


/**
 * 收到对方RPC之后的处理
 * @param fromWebViewName 
 * @param message 
 */
const handleRpcCall = (fromWebViewName: string, { globalName, moduleName, methodName, params, rpcID, resultCallbackID }: RpcCallSign) => {
    let func, result;
    
    globalName = globalName || "pi_modules";
    pi_modules.commonjs.exports.require([moduleName], {}, function (mods) {
        const mod = mods[0];
        func = mod[methodName];
        if (!func) {
            result = {
                error: 'throw error, can\'t find module ' + moduleName + ', function = ' + methodName
            };
        }
        if (func) {
            /**
             * 将参数的回调函数恢复回来
             */
            params = params.map(v => {
                if (typeof v === 'string' && v.startsWith(RPC_CALLBACK_PARAM)) {
                    const id = JSON.parse(v.slice(RPC_CALLBACK_PARAM.length));
                    return (...args) => {
                        const sign = <RpcReplySign>{
                            args: args,
                            rpcID: rpcID,
                            callbackID: id
                        };

                        const message = RPC_REPLY_START + JSON.stringify(sign);

                        if (isPC) {
                            pi_modules.globalCallback.onWebViewPostMessage(fromWebViewName, message);
                        } else {
                            WebViewManager.postMessage(fromWebViewName, message, globalName);
                        }
                    };
                }
                return v;
            });

            try {
                result = func(...params);
                console.log(`handleRpcCall result ${result}`)
            } catch (e) {
                func = undefined;
                result = {
                    error: `fromWebViewName = ${fromWebViewName} call throw error: modName=${moduleName}, methodName=${methodName}, stack=${e.stack}, array params = ` + params.join(",")
                };
            }
        }

        // 异常情况时，func为undefined，这时必须让对方的rpc释放掉
        if ((!func) || resultCallbackID !== undefined) {
            const sign = <RpcReplySign>{
                args: [result]
            };

            if (rpcID !== undefined) {
                sign.rpcID = rpcID;
            }

            if (resultCallbackID !== undefined) {
                sign.callbackID = resultCallbackID;
            }

            const message = RPC_REPLY_START + JSON.stringify(sign);
            if (isPC) {
                pi_modules.globalCallback.onWebViewPostMessage(fromWebViewName, message);
            } else {
                WebViewManager.postMessage(fromWebViewName, message, globalName);
            }
        }
    }, function (result) {
        result = {
            error: 'throw error, load fail ' + moduleName
        };
    }, console.log('load mod ing1111111111.....'));

    result = {
        error: 'throw error, can\'t find module ' + moduleName
    };
};

/**
 * 收到对方RPC回应之后的处理
 */
const handleRpcReply = ({ rpcID, callbackID, args }: RpcReplySign) => {
    const funcs = rpcMap.get(rpcID);
    const f = funcs && funcs[callbackID];
    if (f) {
        f(...args);
    }
    rpcMap.delete(rpcID);
};

const isPC = navigator.userAgent.indexOf('YINENG') > 0 ? false : true;
const isJSVM = navigator.userAgent.indexOf('JSVM') > 0 ? true : false;
let webViewMgr: WebViewManager;
const getInstance = () => {
    if (!webViewMgr) {
        webViewMgr = new WebViewManager();
        webViewMgr.init();
    }
    return webViewMgr;
};