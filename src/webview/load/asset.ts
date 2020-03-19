/**
 * 提供资源加载， 仅用于移动端的安装包内的资源读取
 */

import { get as getEnv } from "../../pi_sys/setup/env"

import {get as getWindows, read as readWindows} from "./windows";
import {get as getAndroid, read as readAndroid} from "./android";
import {get as getiOS, read as readiOS} from "./ios"

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
export const get = (): Promise<string[][]> => {
    if (pType === undefined) {
        pType = getPlatformType();
    }

    return new Promise(resolve => {
        switch (pType) {
            case PlatformType.Windows:
                getWindows(resolve);
                break;
            case PlatformType.Android:
                getAndroid(resolve);
                break;
            case PlatformType.iOS:
                getiOS(resolve);
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
                readWindows(key, resolve);
                break;
            case PlatformType.Android:
                readAndroid(key, resolve);
                break;
            case PlatformType.iOS:
                readiOS(key, resolve);
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