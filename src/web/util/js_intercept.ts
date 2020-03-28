import { CommonKey, get as getEnv } from "../../pi_sys/setup/env"

import { toByteArray } from "../../pi_sys/modules/util/base64js"

/**
 * 读本地文件
 * cb：如果错误，返回null，否则返回 Uint8Array
 */ 
export const getAssetFile = (path: string, cb?: (content: Uint8Array) => void) => {
    
    let platformType = getPlatformType();
    
    if (platformType === PlatfromType.Web) {
        
        setTimeout(() => {
            cb && cb(null);
        }, 0);
        return;
    }
    
    if (platformType === PlatfromType.Win) {
        require("fs").readFile(name, (err, data) => {
            if (err) {
                cb(null);
            } else {
                // TODO: data应该是ArrayBuffer
                cb(data);
            }
        });
        return;
    }

    let id = ++jsInterceptID;
    if (cb) {
        jsInterceptMap.set(id, (_isOK, base64Str) => {
            let r = null;
            if (base64Str) {
                r = toByteArray(base64Str);
            }
            cb(r);
        });
    }

    if (platformType === PlatfromType.Android) {
        window["JSIntercept"].getAssetFile(id, path);
    } else if (platformType === PlatfromType.iOS) {
        // TODO
    }
}

// ========================== 本地

enum PlatfromType {
    Win,
    Android,
    iOS,
    Web,
}

let jsInterceptID = 0;
let jsInterceptMap = new Map<number, Function>();

let platform: PlatfromType = undefined;

const getPlatformType = () => {
    if (platform !== undefined) {
        return platform;
    }

    platform = PlatfromType.Web;

    let ua = getEnv(CommonKey.UserAgent);
    if (ua.indexOf("YINENG_ANDROID") >= 0) {
        platform = PlatfromType.Android;
    } else if (ua.indexOf("YINENG_IOS") >= 0) {
        platform = PlatfromType.iOS;
    } else if (ua.indexOf("YINENG_WINDOWS") >= 0) {
        platform = PlatfromType.Win;
    }

    if (platform !== PlatfromType.Web) {
        // 注册和底层通信的处理函数
        window["handle_jsintercept_callback"] = (listenerID, isSuccess, r1, r2, r3, r4, r5) => {
            if (jsInterceptMap.has(listenerID)) {
                let callback = jsInterceptMap.get(listenerID);
                delete jsInterceptMap[listenerID];
                callback && callback(isSuccess, r1, r2, r3, r4, r5);
            }
        }
    }

    return platform;
}