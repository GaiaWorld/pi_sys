import { toByteArray } from "../../pi_sys/modules/util/base64js"
import { utf8Decode } from "../../pi_sys/modules/util/util"

/**
 * 取到相关的depend内容，没有就调用cb([])
 */
export const get = (cb: (content?: string[][]) => void) => {
    getAssetFile("depend", (content) => {
        let json = [];
        if (content) {
            let str = utf8Decode(content);
            json = JSON.parse(str);
        }
        cb(json);
    });
}

/**
 * 取到本地对应的file内容，没有就调用cb(null)
 */
export const read = (key: string, cb: (content?: ArrayBuffer) => void) => {
    getAssetFile(key, (content) => {
        cb(content ? content.buffer : null);
    });
}

// =========================== 本地

let jsInterceptID = 0;
let jsInterceptMap = undefined;

/**
 * 读文件，返回ArrayBuffer
 * path: 相对于assets的路径，不能以斜杠开头
 */
const getAssetFile = (path: string, cb: (content: Uint8Array) => void) => {

    if (!jsInterceptMap) {
        initJsIntercept();
    }

    jsInterceptMap.set(++jsInterceptID, (_ok, str) => {
        if (str === "") {
            cb(null);
        } else {
            cb(toByteArray(str));
        }
    });

    window["webkit"].messageHandlers.JSIntercept.postMessage(["getAssetFile", jsInterceptID, path]);
}

/**
 * 注册和底层通信的处理函数，之所以要放到这里，是因为iOS和windows有自己的处理函数，如果放到加载时，会冲掉。
 */
const initJsIntercept = () => {
    jsInterceptID = 0;
    jsInterceptMap = new Map<number, Function>();

    window["handle_jsintercept_callback"] = (listenerID, isSuccess, r1, r2, r3, r4, r5) => {
        if (jsInterceptMap.has(listenerID)) {
            let callback = jsInterceptMap[listenerID];
            delete jsInterceptMap[listenerID];
            callback && callback(isSuccess, r1, r2, r3, r4, r5);
        }
    }
}