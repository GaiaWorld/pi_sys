/**
 * 资源对象加载器， 图片、声音、视频, 字体
 * 小游戏加载该类资源时，先将其下载到本地临时目录中，
 * 后续通过拷贝将资源拷贝到本地用户目录下面
 */
// ============================== 导入
import { FileLoad } from './bin';
import { fileSuffix, fileBasename, FileInfo } from '../setup/depend';
import { download } from '../device/download';

declare var wx: any;
// ============================== 导出
/**
 * 初始化参数
 */
export const init = (domainUrls: string[], downloadPath:string) => {
    urls = domainUrls;
    downPath = downloadPath;
}

class FontFace {
    public name: string;
    public family: string;
    public localPath: string;
    private url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }

    load(): Promise<any> {
        const p = download(this.url).then((localPath) => {
            const family = wx.loadFont(localPath);
            if (family === null) {
                throw new Error("wx load font failed");
            }
            this.family = family;
            this.localPath = localPath;
            return localPath;
        });

        return p;
    }
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
                // TODO: store 需要实现文件拷贝队列，写队列与拷贝队列协同工作，方便空间分配
            }));
        }
        const p = Promise.all(arr).then(() => map);
        return p;
    }
}
// 字体比较特别，需要单独处理
const loadFont = (load: ObjLoad, file: FileInfo, map: Map<string, FontFace>, callback: (f: FontFace) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path +", "+ errText);
    }
    const font = new FontFace(fileBasename(file.path), `${urls[i || 0]}${downPath}${file.path}?${file.sign}`);
    // 添加到全局的 FontFaceSet 中，小游戏中直接用 Set 模拟
    (document as any).fonts = new Set();
    (document as any).fonts.add(font);
    /*
     * TODO: (优化)
     * 为了快速实现功能，字体目前全部存放到临时目录里面，
     * 后续可以将其放到用户目录里面去并记录下来，方便下次使用
     */
    font.load().then(() => {
        load.loaded+=file.size;
        map.set(file.path, font);
        load.onProcess(file.path, "objLoad", load.total, load.loaded);
        callback(font);
    }).catch((errText) => {
        (document as any).fonts.delete(font);
        loadFont(load, file, map, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
    });
};

// TODO: video 在兼容层没做兼容，需要兼容，但优先级不高
const loadObj = (load: ObjLoad, file: FileInfo, eleType: "img"|"audio"|"video", map: Map<string, Element>, callback: (e:Element) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path +", "+ errText);
    }
    download(`${urls[i || 0]}${downPath}${file.path}?${file.sign}`).then((localTmpPath) => {
        let n: any;
        switch (eleType) {
            case "img":
                n = new Image();
                break;
            case "audio":
                n = new Audio();
                break;
            case "video":
                n = wx.createVideo();
                break;
        }
        n.src = localTmpPath;
        map.set(file.path, n);
        load.loaded += file.size;
        load.onProcess(file.path, "objLoad", load.total, load.loaded, n);
        callback && callback(n);
    }).catch((err) => {
        loadObj(load, file, eleType, map, callback, errorCallback, err.errMsg, i === undefined ? 0 : i + 1);
    });
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

const Suffixs = {
    png: "img", jpg: "img", jpeg: "img", webp: "img", gif: "img", svg: "img",
    wav: "audio", mp3: "audio", aac: "audio",
    webm: "video", mp4: "video", ogg: "video", m3u8: "video",
};

// 小游戏只支持 ttf 格式的字体
const FontSuffixs = new Set(["ttf"]);

// ============================== 立即执行
