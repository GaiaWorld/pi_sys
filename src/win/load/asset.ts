
import { get as getEnv } from "../../pi_sys/setup/env"

import { toByteArray } from "../../pi_sys/modules/util/base64js"
import { utf8Decode } from "../../pi_sys/modules/util/util"

/**
 * 本地资源加载
 */

/**
 * @description 获取资源信息数组Json, [[file, time, size, sign], ...]
 * 读不到返回空数组
 */
export const get = (): Promise<string[][]> => {
    return Promise.resolve([]);
};

/**
 * @description 读取资源
 * @example
 */
export const read = (key: string): Promise<ArrayBuffer> => {
    return Promise.resolve(null);
};

// ============================ 本地

/**
 * 是否运行在pi打包的exe环境
 */
let isWin = undefined;

/**
 * 每次调用函数，尽可能的加判断
 */
const checkExe = () => {
    if (isWin === undefined) {
        isWin = false;
        let ua = getEnv("userAgent");
        if (ua) {
            isWin = ua.indexOf("YINENG_WINDOWS") >= 0;
        }
    }
}