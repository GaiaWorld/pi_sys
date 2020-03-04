/**
 * 下载文件为 Blob ， 返回 BlobUrl
 */

import { cc, log } from '../../pi_sys/feature/log';
import { register, ResTab } from '../../pi_sys/modules/util/res_mgr';
import { getFile } from '../../pi_sys/setup/depend';
import { HttpDownload } from '../feature/http';

export const RES_TYPE_BLOB = `BLOB_RES`;

/**
 * @description 后缀名对应的Blob类型
 * @example
 */
export const BlobType = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ttf: 'application/x-font-ttf',
    otf: 'application/x-font-opentype',
    woff: 'application/x-font-woff',
    woff2: 'application/x-font-woff2'
};

let domainUrls: string[];
let domainPath: string;

/**
 * @description 创建BlobURL
 * @example
 */
export const createURL = (data: ArrayBuffer, type: string): string => {
    const blob = new Blob([data], { type: type });

    return URL.createObjectURL(blob);
};

/**
 * @description 销毁BlobURL
 */
export const revokeURL = (url: string): void => {
    URL.revokeObjectURL(url);
};

/**
 * 导出成为资源
 */
export const loadBlobRes = (resTab: ResTab, path: string) => {
    return resTab.load(RES_TYPE_BLOB, path, undefined);
};

/**
 * 导出成为资源
 */
export const loadBlobRes2 = (_name: string): Promise<string> => {
    const info = getFile(_name);

    if (!info) {
        return Promise.reject('loadImage failed, info not found, path = ' + _name);
    }

    const down = new HttpDownload(domainUrls, `${domainPath}${info.path}?${info.sign}`, 10000, 1);
    down.onprocess = () => {

    };

    return new Promise((resolve, reject) =>  {
        down.start().then((ab: ArrayBuffer) => {
            resolve(createURL(ab, ''));
        }).catch((err) => {
            cc.info() && log(err);
            reject(err);
        });
    });
};

// ======================= 立即执行

// const load = (_tab: ResTab, _type: string, _name: string, args: any[]) => {
//     let info = getFile(_name);

//     if (!info) {
//         return Promise.reject("loadImage failed, info not found, path = " + _name);
//     }

//     const down = new HttpDownload(domainUrls, _name, 1000, 1);

//     return new Promise((resolve, reject) => {
//         down.start().then((ab: ArrayBuffer) => {
//             resolve(createURL(ab, ''));
//         }).catch((err) => {
//             console.log(err);
//             reject(err);
//         });
//     });
// };

// const destroy = (url: string) => {
//     revokeURL(url);
// };

// 往Res中注册Image对象
export const initBlobLoad = (urls: string[], downPath: string) => {
    domainUrls = urls;
    domainPath = downPath;

    // register(RES_TYPE_BLOB, load, destroy);
};