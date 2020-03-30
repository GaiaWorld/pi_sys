
import { getAssetFile } from "../util/js_intercept"
import { CommonKey, get as getEnv } from "../../pi_sys/setup/env"
import { utf8Decode } from "../../pi_sys/modules/util/util"
import { PlatformType, getPlatformType } from "../../pi_sys/setup/platform"

/**
 * 本地资源加载
 */

/**
 * @description 获取资源信息数组Json, [[file, time, size, sign], ...]
 * 读不到返回空数组
 */
export const get = (): Promise<string[][]> => {
    return new Promise((resolve) => {

        if (!assetPath) {
            let platformType = getPlatformType();

            if (platformType === PlatformType.Win) {
                assetPath = getEnv(CommonKey.WindowsAssetPath);
                if (!assetPath) {
                    console.warn("windows, env can't find asset path");
                }
            } else if (platformType === PlatformType.Android || platformType === PlatformType.IOS) {
                assetPath = getEnv(CommonKey.MobileAssetPath);
                if (!assetPath) {
                    console.warn("mobile, env can't find asset path");
                }
            }
        }

        let dependPath = getEnv(CommonKey.AssetDependPath);
        if (!dependPath) {
            console.warn("env can't find asset depend path");
        }

        if (!assetPath || !dependPath) {
            resolve([]);
            return;
        }

        let filePath = `${assetPath}/${dependPath}`;
        getAssetFile(filePath, (content) => {
            let json = [];
            if (content) {
                try {
                    let str = utf8Decode(content);
                    json = JSON.parse(str);
                } catch (e) {
                    console.log("getAssetFile parse json failed, e = ", e);
                    json = [];
                }
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
        // read之前肯定调用过get
        if (!assetPath) {
            resolve(null);
            return;
        }

        let filePath = `${assetPath}/${path}`;
        getAssetFile(filePath, (content) => {
            resolve(content ? content.buffer : null);
        });
    });
};

let assetPath = undefined;