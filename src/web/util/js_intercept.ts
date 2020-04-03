import { PlatformType, getPlatformType } from "../../pi_sys/setup/platform"
import { toByteArray } from "../../pi_sys/modules/util/base64js"

/**
 * 读本地文件
 * cb：如果错误，返回null，否则返回 Uint8Array
 */
export const getAssetFile = (path: string, cb?: (content: Uint8Array) => void) => {
    let platformType = getType();

    if (platformType === PlatformType.Web) {

        setTimeout(() => {
            cb && cb(null);
        }, 0);
        return;
    }

    if (platformType === PlatformType.Win) {
        // Windows 用的是Electron版本，所以有nodejs
        if (!window.require) {
            console.warn("window electron, no nodejs require in window");
            cb(null);
            return;
        }
        console.log("!!!!!!!!!!! window.require");
        window["require"]("fs").readFile(path, (err, data) => {
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

    if (platformType === PlatformType.Android) {
        if (window["JSIntercept"] && window["JSIntercept"].getAssetFile) {
            window["JSIntercept"].getAssetFile(id, path);
        } else {
            setTimeout(() => {
                cb && cb(null);
            }, 0);
        }
    } else if (platformType === PlatformType.IOS) {
        // TODO
    }
}

// ========================== 本地


let jsInterceptID = 0;
let jsInterceptMap = new Map<number, Function>();

let platform: PlatformType = undefined;

const getType = () => {
    if (platform !== undefined) {
        return platform;
    }

    platform = getPlatformType();

    if (platform !== PlatformType.Web) {
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