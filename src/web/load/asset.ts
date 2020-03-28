
import { getAssetFile } from "../util/js_intercept"
import { CommonKey, get as getEnv } from "../../pi_sys/setup/env"
import { utf8Decode } from "../../pi_sys/modules/util/util"

/**
 * 本地资源加载
 */

/**
 * @description 获取资源信息数组Json, [[file, time, size, sign], ...]
 * 读不到返回空数组
 */
export const get = (): Promise<string[][]> => {
    return new Promise((resolve) => {
        
        let filePath = `${getEnv(CommonKey.AssetPath)}/depend`;
        getAssetFile(filePath, (content) => {
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
export const read = (path: string): Promise<ArrayBuffer> => {
    return new Promise((resolve) => {
        let filePath = `${getEnv(CommonKey.AssetPath)}/${path}`;
        getAssetFile(filePath, (content) => {
            resolve(content ? content.buffer : null);
        });
    });
};