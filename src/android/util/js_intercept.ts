import { get as getEnv } from "../../pi_sys/setup/env"

/**
 * 
 */
export const callJSIntercept = (name: string, args: any[], cb?: (isSuccess: boolean, r1?: any, r2?: any, r3?: any, r4?: any, r5?: any) => void) => {
    if (isAndroid === undefined) {
        isAndroid = false;
        let ua = getEnv("userAgent");
        if (ua) {
            isAndroid = ua.indexOf("YINENG_ANDROID") >= 0;
        }
    }
    
    let id = ++jsInterceptID;
    if (cb) { 
        jsInterceptMap.set(id, cb);
    }

    if (isAndroid) {
        window["JSIntercept"].call(window["JSIntercept"], id, ...args);
    } else {
        setTimeout(() => {
            cb(false)
        }, 0);
    }
}

// ========================== 本地

let isAndroid = undefined;

let jsInterceptID = 0;
let jsInterceptMap = new Map<number, Function>();

/**
 * 注册和底层通信的处理函数
 */
window["handle_jsintercept_callback"] = (listenerID, isSuccess, r1, r2, r3, r4, r5) => {
    if (jsInterceptMap.has(listenerID)) {
        let callback = jsInterceptMap[listenerID];
        delete jsInterceptMap[listenerID];
        callback && callback(isSuccess, r1, r2, r3, r4, r5);
    }
}