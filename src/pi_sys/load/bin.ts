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
import {FileInfo} from "../setup/depend";
import {HttpDownload, ProcessFunc} from "../feature/http";

// ============================== 导出
export interface ResultFunc {
	(val: any, err?: any): void
}

/**
 * @description 获取本地存储
 * @example
 */
export const getStore = () => {
    return null;
};

/**
 * 删除store
 */
export const deleteStore = () => {
    return Promise.resolve()
}

/**
 * 初始化存储, 及默认参数。 limitLength 限制url的长度， sizeLimit 一次请求的byte限制
 */
export const init = (storeName: string, domainUrls: string[], downloadPath:string, urllimitLength = 1024 - 100, reqSizeLimit = 8 * 1024 * 1024) => {
    return Promise.resolve();
}

/**
 * @description 获得路径签名
 * @example
 */
export const getSign = (path:string) => {
    return "";
}
/**
 * @description 检查文件是否会从本地加载, 返回 true | false | undefined
 * @example
 */
export const isLocal = (filePath:string) => {
    return undefined;
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
        return Promise.resolve(null);
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
        return Promise.resolve(null);
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
}

/**
 * @description 设置文件的本地签名
 * @example
 */
export const setLocalSign = (files: FileInfo[]) => {
}


