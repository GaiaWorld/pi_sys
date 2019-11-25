
// ============================== 导入
import { FileLoad } from './bin';
import { fileSuffix, fileBasename, FileInfo } from '../../pi_sys/setup/depend';
import { HttpDownload } from '../feature/http';
import { loadBlobRes, loadBlobRes2 } from '../device/bloburl';

/**
 * 资源对象加载器， 图片、声音、视频, 字体
*/
class FontFace {
    public name: string;
    public family: string;
    public localPath: string;
    public src: string;

    constructor(name: string, src: string) {
        this.name = name;
        this.src = src;
    }

    public load(): Promise<any> {

        const p = new Promise((resolve, rejects) => {
            const ele = <HTMLFontElement>document.createElement('font');
            ele.onload = () => {
                resolve(this);
            };
        });

        return p;
    }
}

// ============================== 导出
interface AudioArg {
    audio?: HTMLAudioElement;
    asArrayBuffer?: boolean;
}

interface ObjFileInfo extends FileInfo {
    arg?: HTMLImageElement | HTMLFontElement | HTMLVideoElement | HTMLAudioElement;
}

/**
 * 初始化参数
 */
export const init = (domainUrls: string[], downloadPath: string) => {
    urls = domainUrls;
    downPath = downloadPath;
};

export class ObjLoad extends FileLoad {

    // 多个加载文件
    public files: Map<string, ObjFileInfo> = new Map();

    /**
     * @description 添加下载文件
     * @example
     */
    public add(info: ObjFileInfo) {
        this.files.set(info.path, info);
        this.total += info.size;
    }

    /**
     * @description 开始
     * @example
     */
    public start() {
        let map = new Map();
        let arr = [];
        for (let info of this.files.values()) {
            arr.push(new Promise((resolve, reject) => {
                loadBlobRes2(info.path).then((res) => {
                    let suffix = fileSuffix(info.path);
                    let type = Suffixs[suffix];
                    if (type == "img") {
                        loadObj(this, <any>{ ...info,  path: res }, map, resolve, reject);
                    }else if (type) {
                        loadMedia(this, <any>{ ...info,  path: res }, type, map, resolve, reject);
                    } else if (FontSuffixs.has(suffix)) {
                        loadFont(this, <any>{ ...info,  path: res }, map, resolve, reject);
                    }
                });
                // let suffix = fileSuffix(info.path);
                // let type = Suffixs[suffix];
                // if (type == "img") {
                //     loadObj(this, info, map, resolve, reject);
                // }else if (type) {
                //     loadMedia(this, info, type, map, resolve, reject);
                // } else if (FontSuffixs.has(suffix)) {
                //     loadFont(this, info, map, resolve, reject);
                // }

            }));
        }
        return Promise.all(arr).then(() => { return map; });
    }

}
// 字体比较特别，需要单独处理
const loadFont = (load: ObjLoad, file: ObjFileInfo, map: Map<string, Element>, callback: (f: FontFace) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path + ", " + errText);
    }
    const font = new FontFace(fileBasename(file.path), 'url(' + urls[i || 0] + downPath + file.path + "?" + file.sign + ')');
    // 添加到全局的 FontFaceSet 中
    (document as any).fonts.add(font);
    font.load().then(() => {
        load.loaded += file.size;
        map.set(file.path, font as any as Element);
        load.onProcess(file.path, "objLoad", load.total, load.loaded);
        callback(font);
    }).catch((errText) => {
        (document as any).fonts.remove(font);
        loadFont(load, file, map, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
    });
};

const loadObj = (load: ObjLoad, file: ObjFileInfo, map: Map<string, Element>, callback: (e: Element) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path + ", " + errText);
    }

    let n: HTMLImageElement, oldOnLoad: Function;
    if (file.arg) {
        n = <HTMLImageElement>file.arg;
        oldOnLoad = n.onload;
    } else {
        n = new Image();
    }

    n.onerror = () => {
        n.onload = n.onerror = undefined;
        loadObj(load, file, map, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
    };
    n.onload = () => {
        n.onload = n.onerror = undefined;
        map.set(file.path, n);
        load.loaded += file.size;
        load.onProcess(file.path, "objLoad", load.total, load.loaded, n);
        callback && callback(n);
        oldOnLoad && oldOnLoad();
    };
    n.crossOrigin = "anonymous";

    // loadBlobRes2(file.path).then((blobres) => {
    //     n.src = blobres;
    // });

    // n.src = urls[i || 0] + downPath + file.path + "?" + file.sign;
    n.src = file.path;
};

/**
 * 外部传入 Audio 表示使用audio下载，否则表示下载为ArrayBuffer
 * @param load
 * @param file
 * @param eleType
 * @param map
 * @param callback
 * @param errorCallback
 * @param errText
 * @param i
 */
const loadAudio = (load: ObjLoad, file: ObjFileInfo, eleType: "audio", map: Map<string, Element>, callback: (e: Element | ArrayBuffer) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path + ", " + errText);
    }

    if (eleType === 'audio') {
        if (file.arg) {
            let n: HTMLAudioElement | HTMLVideoElement, oldOnLoad: Function;

            n = <HTMLAudioElement>file.arg;
            oldOnLoad = n.onloadstart;

            n.preload = "load";
            n.onerror = () => {
                n.onload = n.onerror = undefined;
                loadAudio(load, file, eleType, map, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
            };
            n.onloadstart = () => {
                n.onload = n.onerror = undefined;
                map.set(file.path, n);
                load.loaded += file.size;
                load.onProcess(file.path, "objLoad", load.total, load.loaded, n);
                callback && callback(n);
                oldOnLoad && oldOnLoad();
            };
            n.crossOrigin = "anonymous";

            // loadBlobRes2(file.path).then((blobres) => {
            //     n.src = blobres;
            // });

            // n.src = urls[i || 0] + downPath + file.path + "?" + file.sign;
            n.src = file.path;

        } else {
            // n = new Audio();

            let path = downPath + file.path + "?" + file.sign;
            let down = new HttpDownload(urls, path, 1000, 1);
            down.onprocess = () => {

            };
            down.start().then((value: ArrayBuffer) => {
                callback && callback(value);
            });
        }
    }
};

const loadMedia = (load: ObjLoad, file: ObjFileInfo, eleType: "video", map: Map<string, Element>, callback: (e: Element) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path + ", " + errText);
    }

    let n: HTMLAudioElement | HTMLVideoElement, oldOnLoad: Function;

    if (file.arg) {
        n = <HTMLVideoElement>file.arg;
        oldOnLoad = n.onloadstart;
    } else {
        n = document.createElement(`video`);
    }

    n.preload = "load";
    n.onerror = () => {
        n.onload = n.onerror = undefined;
        loadMedia(load, file, eleType, map, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
    };
    n.onloadstart = () => {
        n.onload = n.onerror = undefined;
        map.set(file.path, n);
        load.loaded += file.size;
        load.onProcess(file.path, "objLoad", load.total, load.loaded, n);
        callback && callback(n);
        oldOnLoad && oldOnLoad();
    };
    n.crossOrigin = "anonymous";
    n.src = urls[i || 0] + downPath + file.path + "?" + file.sign;
};

// ============================== 本地
// 下载的多域名
let urls: string[] = [];
// 下载的路径，要含 "?"
let downPath: string = "";

let Suffixs = {
    png: "img", jpg: "img", jpeg: "img", webp: "img", gif: "img", svg: "img",
    wav: "audio", mp3: "audio", aac: "audio",
    webm: "video", mp4: "video", ogg: "video", m3u8: "video",
};

let FontSuffixs = new Set(["ttf", "otf", "woff", "woff2", ]);

// ============================== 立即执行
