/**
 * 资源对象加载器， 图片、声音、视频, 字体
 * 小游戏加载该类资源时，先将其下载到本地临时目录中，
 * 后续通过拷贝将资源拷贝到本地用户目录下面
 */
// ============================== 导入
import { FileLoad } from './bin';
import { DEPEND_MGR, FileInfo } from '../setup/depend';
import { wx } from '../device/wx';
import { FileSys } from '../device/filesys';
import { LoadMgr } from './mgr';

// ============================== 导出
type ObjElement = WXFontFace | wx.Image | wx.InnerAudioContext | WXVideo;
/**
 * 初始化参数
 */
export const init = (domainUrls: string[], downloadPath:string) => {
    urls = domainUrls;
    downPath = downloadPath;
}

class WXFontFace {
    public name: string;
    public family: string;
    public localPath: string;
    public src: string;

    constructor(name: string, src: string) {
        this.name = name;
        this.src = src;
    }

    public load(): Promise<any> {
        const p = FileSys.download(this.src)
                    .then((localPath) => {
                        const family = wx.loadFont(localPath);
                        if (family === null) {
                            this.family = family;
                            this.localPath = localPath;
                        } else {
                            this.family = family;
                            this.localPath = localPath;
                        }
                        return localPath;
                    });

        return p;
    }
}

class WXVideo {
    public src: string;
    private video: wx.Video;
    constructor(src) {
        this.src = src;
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
                let suffix = DEPEND_MGR.fileSuffix(info.path);
                let type = Suffixs[suffix];

                if (type) {
                    loadObj(this, info, type, map, resolve, reject)
                } else if (FontSuffixs.has(suffix)) {
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
const loadFont = (load: ObjLoad, file: FileInfo, map: Map<string, WXFontFace>, callback: (f: WXFontFace) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path +", "+ errText);
    }
    
    const font = new WXFontFace(DEPEND_MGR.fileBasename(file.path), `${urls[i || 0]}${downPath}${file.path}?${file.sign}`);
    // 添加到全局的 FontFaceSet 中，小游戏中直接用 Set 模拟
    (window as any).fonts = new Set();
    (window as any).fonts.add(font);
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
        (window as any).fonts.delete(font);
        loadFont(load, file, map, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
    });
};

// TODO: video 在兼容层没做兼容，需要兼容，但优先级不高
const loadObj = (load: ObjLoad, file: FileInfo, eleType: "img"|"audio"|"video", map: Map<string, ObjElement>, callback: (e: ObjElement) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {

    const status = LoadMgr.wxdepend.checkMain(file, true);

    switch (status) {
        case (0): {
            // temp 目录
            loadObjCall(load, file, false, eleType, map, callback, errorCallback);
            break;
        }
        case (1): {
            FileSys.deleteFile(LoadMgr.formatMainPath(file.path))
                .then(() => {
                    LoadMgr.wxdepend.updateMainSize(-file.size, true);
                    LoadMgr.wxdepend.deleteMain(file.path);
                    LoadMgr.wxdepend.writeDepend();
                });

            // temp 目录
            loadObjCall(load, file, false, eleType, map, callback, errorCallback);
            break;
        }
        case (2): {
            // 主目录
            loadObjCall(
                load, file, true, eleType, map, 
                (e) => {
                    LoadMgr.wxdepend.updateMainSize(file.size, true);
                    LoadMgr.wxdepend.addMain(file); 
                    LoadMgr.wxdepend.writeDepend();
                    callback(e);
                },
                errorCallback
            );
            break;
        }
        case (3): {
            // 主目录
            loadObjCall(load, file, true, eleType, map, 
                (e) => { 
                    const old = LoadMgr.wxdepend.readMain(file.path);
                    if (old) {
                        LoadMgr.wxdepend.updateMainSize(-old.size, true);
                    }
                    LoadMgr.wxdepend.deleteMain(file.path);

                    LoadMgr.wxdepend.updateMainSize(file.size, true);
                    LoadMgr.wxdepend.addMain(file);
                    LoadMgr.wxdepend.writeDepend();
                    
                    callback(e); 
                }, 
                errorCallback
            );
            break;
        }
        default: {
            // 主目录
            createObj(load, file, FileSys.fullLocalPath(LoadMgr.formatMainPath(file.path)), eleType, map, callback, errorCallback);
        }
    }

}

const loadObjCall = (load: ObjLoad, file: FileInfo, asMain: boolean, eleType: "img"|"audio"|"video", map: Map<string, ObjElement>, callback: (e: ObjElement) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path +", "+ errText);
    }

    FileSys.download(`${urls[i || 0]}${downPath}${file.path}?${file.sign}`, asMain ? LoadMgr.formatMainPath(file.path) : undefined)
        .then((localTmpPath) => {
            createObj(load, file, localTmpPath, eleType, map, callback, errorCallback);
        }).catch((err) => {
            loadObj(load, file, eleType, map, callback, errorCallback, err.errMsg, i === undefined ? 0 : i + 1);
        });
}

const createObj = (load: ObjLoad, file: FileInfo, localTmpPath: string, eleType: "img"|"audio"|"video", map: Map<string, ObjElement>, callback: (e: ObjElement) => void, errorCallback: (err: string) => void) => {
    switch (eleType) {
        case "img": {
            let n = new Image();
            n.src = localTmpPath;
            n.onload = () => {
                map.set(file.path, n);
                load.loaded += file.size;
                load.onProcess(file.path, "objLoad", load.total, load.loaded, n);
                callback && callback(n);
            }
            break;
        }
        case "audio": {
            let n = wx.createInnerAudioContext();
            n.src = localTmpPath;
            map.set(file.path, n);
            load.loaded += file.size;
            load.onProcess(file.path, "objLoad", load.total, load.loaded, n);
            callback && callback(n);
            break;
        }
        case "video": {
            let n = new WXVideo(localTmpPath);
            map.set(file.path, n);
            load.loaded += file.size;
            load.onProcess(file.path, "objLoad", load.total, load.loaded, n);
            callback && callback(n);
            break;
        }
        default: {
            errorCallback(`no such fileType ${eleType}`);
        }
    }
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
