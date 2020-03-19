/**
 * 提供资源加载， 仅用于移动端的安装包内的资源读取
 */

import { get as getEnv } from "../../pi_sys/setup/env"

// ============================== 导出

export const enum PlatformType {
    Web = 1,
    Windows = 2,
    Android = 3,
    iOS = 4
}

/**
 * @description 获取资源信息数组Json, [[file, time, size, sign], ...]
 * 读不到返回空数组
 */
export const get = (): Promise<any[]> => {
    if (pType === undefined) {
        pType = getPlatformType();
    }

    return new Promise(resolve => {
        switch (pType) {
            case PlatformType.Windows:
                resolve([]);
                break;
            case PlatformType.Android:
                resolve([]);
                break;
            case PlatformType.iOS:
                resolve([]);
                break;
            default:
                resolve([]);
                break;
        }
    });
};

/**
 * @description 读取资源
 * @example
 */
export const read = (key: string): Promise<ArrayBuffer> => {
    if (pType === undefined) {
        pType = getPlatformType();
    }

    return new Promise(resolve => {
        switch (pType) {
            case PlatformType.Windows:
                resolve(null);
                break;
            case PlatformType.Android:
                resolve(null);
                break;
            case PlatformType.iOS:
                resolve(null);
                break;
            default:
                resolve(null);
                break;
        }
    });
};

// ============================== 本地

let pType: PlatformType = undefined;

const getPlatformType = () => {
    let ua = getEnv("userAgent");

    if (ua.indexOf("YINENG_WINDOWS")) {
        return PlatformType.Windows;
    } else if (ua.indexOf("YINENG_ANDROID")) {
        return PlatformType.Android;
    } else if (ua.indexOf("YINENG_IOS")) {
        return PlatformType.iOS;
    }
    else {
        return PlatformType.Web;
    }
}