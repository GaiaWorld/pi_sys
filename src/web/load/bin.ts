/**
// 二进制数据的加载和下载框架：
1、提供下载器及加载器。根据资源列表和本地文件签名，判断是否需要找服务器要数据，分别使用下载器下载，加载器加载。
2、服务器提供一次性下载多个文件的接口，GET上行要最小化文件列表，因为要CDN缓存。ajax取数据，支持上下行进度。
3、下载器下载后，将数据保存在IndexedDB里面，并更新本地签名。
4、对单个下载延时40ms进行合并。用尽量少的请求下载。
5、由调用方来进行查重， 这里就不进行查重处理
7、 TODO 支持SRI


上行消息结构： (后缀1(文件名1:文件名2)后缀2(文件名1:文件名2):目录1()目录2()) (): $作为转义,$转$$ (转$1 )转$2
上行消息支持路径，如果一个目录下所有文件都需要下载，则仅发送路径
下行数据结构： [{2字节le的文件名长度, 文件名utf8编码, 4字节le的文件内容长度, 文件内容}, ...]

知识：
文件名不能包含 \/:*?"<>|
":@-._~!$&'()*+,;="等字符在url的路径部分允许不被转义，
"/?:@-._~!$&'()*+,;="等字符在任何段中允许不被转义。

*/

// ============================== 导入
import {FileInfo, DirInfo, getFile, initDir} from "../../pi_sys/setup/depend";
import {Store} from "../feature/store";
import {get as assetGet, read} from "../../pi_sys/load/asset";
import {HttpDownload, ProcessFunc} from "../feature/http";
import { utf8Decode } from "../../pi_sys/feature/string";

// ============================== 导出
export interface ResultFunc {
	(val: any, err?: any): void
}

/**
 * @description 获取本地存储
 * @example
 */
export const getStore = () => {
    return localStore;
};

/**
 * 删除store
 */
export const deleteStore = () => {
    if (localStore) {
        return Store.delete(localStore.dbName);
    }else{
        return Promise.resolve()
    }
}

/**
 * 初始化存储, 及默认参数。 limitLength 限制url的长度， sizeLimit 一次请求的byte限制
 */
export const init = (storeName: string, domainUrls: string[], downloadPath:string, urllimitLength = 1024 - 100, reqSizeLimit = 8 * 1024 * 1024) => {
    urls = domainUrls;
    batchPath = downloadPath;
    limitLength = urllimitLength;
    sizeLimit = reqSizeLimit;
    if (localSign) {
        return Promise.resolve();
    }
    return Store.create(storeName).then(store => {
        return store.read("").then(value => {
            if (value) {
                localInitCheck(store, value, false);
            } else {
                // 初始化的时候要先读取资源信息数组
                value = {};
                return assetGet().then((arr: any[]) => {
                    localStore = store;
                    for (let info of arr) {
                        value[info[0]] = "-" + info[3];
                    }
                    localInitCheck(store, value, false);
                });
            }
        });    
    });
}

/**
 * @description 获得路径签名
 * @example
 */
export const getSign = (path:string) => {
    return formatSign(localSign[path]);
}
/**
 * @description 检查文件是否会从本地加载, 返回 true | false | undefined
 * @example
 */
export const isLocal = (filePath:string) => {
    let info = getFile(filePath);
    return (info) ? info.sign === getSign(filePath) : undefined;
};

export class FileLoad {
    // 多个加载文件
    files: Map<string, FileInfo> = new Map;
    // 加载进度的回调函数
    process: ProcessFunc[];
    // 结果的回调函数
    result: ResultFunc[];
    // 加载的总文件长度
    public total: number = 0;
    // 加载的当前进度
    public loaded: number = 0;
    /**
     * @description 添加下载文件
     * @example
     */
    public add(info: FileInfo) {
        this.files.set(info.path, info);
        this.total += info.size;
    }
    /**
     * @description 添加下载文件
     * @example
     */
    public onProcess(url:string, type: string, total:number, loaded: number, data?: any) {
        if(!this.process)
            return
        for(let p of this.process)
            p(url, type, total, loaded, data)
    }
    /**
     * @description 添加下载文件
     * @example
     */
    public addProcess(p: ProcessFunc) {
        if(!this.process)
            this.process = [];
        this.process.push(p)
    }
    /**
     * @description 添加下载文件
     * @example
     */
    public onResult(val: any, err?: any) {
        if(!this.result)
            return
        for(let r of this.result)
            r(val, err)
    }
    /**
     * @description 添加下载文件
     * @example
     */
    public addResult(r: ResultFunc) {
        if(!this.result)
            this.result = [];
        this.result.push(r)
    }
    /**
     * @description 开始
     * @example
     */
    public start(): Promise<any> {
        return
    }
}

export class LocalLoad extends FileLoad {
    /**
     * @description 开始
     * @example
     */
    public start() {
        let arr = [];
        let map: Map<string, Uint8Array> = new Map;
        for(let info of this.files.values()) {
            let path = info.path;
            let size = info.size;
            let p: Promise<any>;
            if(isAsset(localSign[path])) {
                p = read(info.path);
            }else{
                p = localStore.read(info.path);
            }
            arr.push(p.then((value: any)=>{
                map.set(path, value);
                this.loaded+=size;
                this.onProcess(path, "fileLocalLoad", this.total, this.loaded, value);
            }));
        }
        return Promise.all(arr).then(_v => {
            this.onResult(map);
            return map;
        }).catch( reason => {
            this.onResult(null, reason)
        });
    }
}

export class Download extends FileLoad {
    // TODO 增加一个没有签名的文件列表
    // url为键，值为下载对象
    downloadMap: Map<string, HttpDownload>;
    // 下载超时时间，默认20秒
    public timeout: 20000;

    /**
     * @description 添加下载文件
     * @example
     */
    public add(info: FileInfo) {
        // TODO if(!info.sign) this.noSignFiles.push(info);
        super.add(info);
    }
    /**
     * @description 开始
     * @example
     */
    public start() {
        let downWait: Promise<void>[] = [];
        let localSignWait: Promise<void>[] = [];
        this.downloadMap = new Map;
        let map: Map<string, DirInfo> = new Map;
        // 先构建一个目录树，目录内再构建一个后缀表
        for(let info of this.files.values()) {
            initDir(info, map, true);
        }
        let fileDirTree = map.get("");
        // 加载文件的数据
        let fileMap: Map<string, Uint8Array> = new Map;
        let result = new Result;
        while (true) {
            let count = result.files.length;
            // 检查url长度, 限制长度1k，超过1k，需要分多次下载
            stringify(fileDirTree, limitLength, result);
            if (result.files.length > count)
                result.f = result.url;
            downWait.push(this.startURL(result.d, result.f, result.files, localSignWait, fileMap));
            if (!result.next)
                break;
            result = new Result;
        }
        return Promise.all(downWait).then(_v => {
            this.onResult(map);
            Promise.all(localSignWait).then(() => localStore.write("", localSign));
            return fileMap;
        }).catch( reason => {
            this.onResult(null, reason)
        });
    }
    /**
     * @description 停止
     * @example
     */
    public abort() {
        if(!this.downloadMap)
            return;
        for(let v of this.downloadMap.values()){
            v.abort();
        }
    }
    // 指定目录和文件的一次下载
    startURL(durl: string, furl: string, files:FileInfo[], localSignWait:Promise<void>[], fileMap: Map<string, Uint8Array>) {
        let len = files.length, size = 0, h = 0; // hash值
        if (len === 0)
            return;
        for (let i = 0; i < len; i++) {
            let info = files[i];
            size += info.size;
            // TODO 改成字符串的异或运算， h = butil.hash(info.sign, h);
        }
        let path = batchPath + "s=" + size + (durl ? "&d=" + durl : "") + (furl ? "&f=" + furl : "") + "&h=" + h;
        let down = new HttpDownload(urls, path, this.timeout, this.total);
        this.downloadMap.set(path, down);
        down.onprocess = () => {
            this.loaded = 0;
            for(let v of this.downloadMap.values()) {
                this.loaded += v.loaded;
            }
            this.onProcess(path, 'fileDownload', this.total, this.loaded);
        };
        return down.start().then(value => {
            this.save((value as ArrayBuffer), localSignWait, fileMap);
        });
    }
    save(buff: ArrayBuffer, localSignWait:Promise<void>[], fileMap: Map<string, Uint8Array>) {
        let view = new DataView(buff);
        let offset = 0;
        while(offset < buff.byteLength) {
            let len = view.getInt16(offset, true);
            offset+=2;
            let path = utf8Decode(new Uint8Array(buff, offset, len));
            let info = getFile(path);
            offset+=len;
            let datalen = view.getInt32(offset, true);
            offset+=4;
            // 使用视图切分数据，降低内存消耗
            let data = new Uint8Array(buff, offset, datalen);
            offset+=datalen;
            fileMap.set(path, data);
            this.onProcess(path, "downFile", 0, 0, data);
            localSignWait.push(savefile(path, data, info?info.sign:""));
        }
    };
}

/**
 * @description 设置文件的本地签名
 * @example
 */
export const setLocalSign = (files: FileInfo[]) => {
    for(let f of files) {
        localSign[f.path] = f.sign;
    }
    return localStore.write("", localSign)
}
// ============================== 本地
// 下载的多域名
let urls: string[] = [];
// 批下载的路径，要含 "?"
let batchPath: string = "";
// 限制url的长度
let limitLength = 1024 - 100;
// 一次请求的byte限制
let sizeLimit = 8 * 1024 * 1024;
// 本地存储
let localStore: Store;
// 本地签名表
let localSign: any;

class Result {
    url = "";
    d = "";
    f = "";
    files: FileInfo[] = [];
    size = 0;
    next = false;
};

// 格式化签名， "-"开头表示本地文件
const formatSign = (sign:string) => {
    if (!sign)
        return sign;
    if (isAsset(sign))
        return sign.slice(1);
    return sign;
}
// 判断是否为本地文件， "-"开头表示本地文件
const isAsset = (sign:string) => {
    return (sign.charCodeAt(0) === 45)
}
// 本地加载检查
const localInitCheck = (store: Store, signs:any, save:boolean) => {
    localStore = store;
    localSign = signs;
    // 删除不存在或签名不正确的文件
    for (let k in signs) {
        if (!signs.hasOwnProperty(k))
            continue;
        let info = getFile(k);
        if (info && getSign(k) === info.sign)
            continue;
        store.delete(k);
        delete signs[k];
        save = true;
    }
    if (save)
        store.write("", signs);
};

// 获取文件的去掉第一个后缀的文件名
const basename = (file:string) => {
    let i = file.lastIndexOf('/'),
        j = file.lastIndexOf('.');
    return j > i ? file.slice(i + 1, j) : file.slice(i + 1);
};
// 上行消息结构： (后缀1(文件名1:文件名2)后缀2(文件名1:文件名2):目录1()目录2())
const stringify = (tree:DirInfo, limit:number, result:Result) => {
    // 先写入本目录下的文件，按后缀归类
    if(tree.suffixMap) {
        for (let [k, arr] of tree.suffixMap) {
            let i = arr.length - 1;
            let f = arr[i--];
            let rk = replace(k);
            let rs = replace(basename(f.path));
            if (result.url.length + rk.length + rs.length > limit || result.size + f.size > sizeLimit && result.files.length) {
                result.next = true;
                result.size = 0;
                return;
            }
            result.files.push(f);
            result.size += f.size;
            result.url += rk + "(" + rs;
            for (; i >= 0; i--) {
                f = arr[i];
                rs = replace(basename(f.path));
                if (result.url.length + rs.length > limit || result.size + f.size > sizeLimit && result.files.length) {
                    arr.length = i + 1;
                    result.next = true;
                    result.url += ")";
                    result.size = 0;
                    return;
                }
                result.url += ":" + rs;
                result.files.push(f);
                result.size += f.size;
            }
            result.url += ")";
            tree.suffixMap.delete(k);
        }
    }
    result.url += ":";
    if(!tree.children)
        return
    let dir: DirInfo;
    while (dir = tree.children[tree.children.length - 1]) {
        let i = dir.path.lastIndexOf("/", dir.path.length - 2);
        let rk = replace(dir.path.slice(i+1, dir.path.length - 1));
        result.url += rk + "(";
        stringify(dir, limit, result);
        result.url += ")";
        if (result.next)
            return result;
        tree.children.length -= 1;
    }
};
// 3个分隔符 (): $作为转义, $转$$ (转$1 )转$2
const replace = (s:string) => {
    return s.replace(/\(/g, "$1").replace(/\)/g, "$2").replace(/\$/g, "$$");
};

// 保存文件
const savefile = (path: string, data:Uint8Array, sign:string) => {
    return localStore.write(path, data).then(_ => {
        localSign[path] = sign;
     });
};

// ============================== 立即执行

