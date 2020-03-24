
import { toByteArray } from "../../pi_sys/modules/util/base64js"
import { utf8Decode } from "../../pi_sys/modules/util/util"

import { callJSIntercept } from "../util/js_intercept.js"

/**
 * iOS，本地资源加载
 */

/**
 * @description 获取资源信息数组Json, [[file, time, size, sign], ...]
 * 读不到返回空数组
 */
export const get = (): Promise<string[][]> => {
    return new Promise((resolve) => {
        getAssetFile("depend", (content) => {
            let json = [];
            if (content) {
                let str = utf8Decode(content);
                json = JSON.parse(str);
            }
            resolve(json);
        });
    })
};

/**
 * @description 读取资源
 * @example
 */
export const read = (key: string): Promise<ArrayBuffer> => {
    return new Promise((resolve) => {
        getAssetFile(key, (content) => {
            resolve(content ? content.buffer : null);
        });
    });
};

// =========================== 本地

/**
 * 读文件，返回ArrayBuffer
 * path: 相对于assets的路径，不能以斜杠开头
 */
const getAssetFile = (path: string, cb: (content: Uint8Array) => void) => {

    callJSIntercept("getAssetFile", [path], (_ok, str) => {
        if (str === "") {
            cb(null);
        } else {
            cb(toByteArray(str));
        }
    });
}