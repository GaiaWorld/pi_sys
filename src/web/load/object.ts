/**
 * 资源对象加载器， 图片、声音、视频, 字体
*/
declare class FontFace {
    constructor(name: string, url: string);
    load(): Promise<any>;
}
// ============================== 导入
import { FileLoad } from './bin';
import { fileSuffix, fileBasename, FileInfo } from '../setup/depend';

// ============================== 导出
/**
 * 初始化参数
 */
export const init = (domainUrls: string[], downloadPath:string) => {
    urls = domainUrls;
    downPath = downloadPath;
}

export class ObjLoad extends FileLoad {

    /**
     * @description 开始
     * @example
     */
    public start() {
        let map = new Map;
        let arr = [];
        for(let info of this.files.values()) {
            arr.push(new Promise((resolve, reject)=>{
                let suffix = fileSuffix(info.path);
                let type = Suffixs[suffix];
                if(type) {
                    loadObj(this, info, type, map, resolve, reject)
                }else if(FontSuffixs.has(suffix)) {
                    loadFont(this, info, map, resolve, reject)
                }
            }));
        }
        return Promise.all(arr).then(() => {return map});
    }

}
// 字体比较特别，需要单独处理
const loadFont = (load: ObjLoad, file: FileInfo, map: Map<string, Element>, callback: (f: FontFace) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path +", "+ errText);
    }
    const font = new FontFace(fileBasename(file.path), 'url('+urls[i || 0] + downPath +file.path+"?"+file.sign+')');
    // 添加到全局的 FontFaceSet 中
    (document as any).fonts.add(font);
    font.load().then(() =>{
        load.loaded+=file.size;
        map.set(file.path, font as any as Element);
        load.onProcess(file.path, "objLoad", load.total, load.loaded);
        callback(font);
    }).catch((errText) => {
        (document as any).fonts.remove(font);
        loadFont(load, file, map, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
    });
}
const loadObj = (load: ObjLoad, file: FileInfo, eleType: "img"|"audio"|"video", map: Map<string, Element>, callback: (e:Element) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path +", "+ errText);
    }
    let n = document.createElement(eleType);
    n.onerror = () => {
        n.onload = n.onerror = undefined;
        loadObj(load, file, eleType, map, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
    };
    n.onload = () => {
        n.onload = n.onerror = undefined;
        map.set(file.path, n);
        load.loaded+=file.size;
        load.onProcess(file.path, "objLoad", load.total, load.loaded, n);
        callback && callback(n);
    };
    n.crossOrigin = "anonymous";
    n.src = urls[i || 0] + downPath + file.path+"?"+file.sign;
}

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

let FontSuffixs = new Set(["ttf", "otf","woff","woff2",]);

// ============================== 立即执行

