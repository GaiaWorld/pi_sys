/**
 * 代码加载器
 * 对小游戏来说是分包加载器，只能加载分包
 */

// ============================== 导入
import { ResultFunc } from './bin';
import { ProcessFunc } from '../feature/http';

declare var wx: any;
// ============================== 导出
/**
 * 初始化参数
 */
export const init = (domainUrls: string[], downloadPath:string) => {
    // 无需做任何操作
    urls = domainUrls;
    downPath = downloadPath;
}

// 小游戏分包加载只需要分包名称即可，无需其他信息，故不能直接继承 FileLoad
export class CodeLoad {
    // 多个加载文件
    files: Set<string> = new Set();
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
    public add(pkgName: string) {
        this.files.add(pkgName);
        this.total += 1;
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
        const arr = [];
        for (let pkgName of this.files.values()) {
            arr.push(new Promise((resolve, reject) => {
                loadSubPkg(this, pkgName, resolve, reject);
            }));
        }
        return Promise.all(arr);
    }
}

const loadSubPkg = (
    load: CodeLoad,
    pkgName: string,
    callback: () => void,
    errorCallback: (err: string) => void,
    errText?: string,
    i?: number
) => {
    if (i >= urls.length) {
        return errorCallback(`${pkgName}, ${errText}`);
    }
    const task = wx.loadSubpackage({
        name: pkgName,
        success: () => {
            load.loaded += 1;
            callback();
        },
        fail: (err: any) => {
            loadSubPkg(
                load, pkgName, callback, errorCallback,
                err.errMsg, i === undefined ? 0 : i + 1
            );
        }
    });

    // 分包加载进度
    task.onProgressUpdate((res: any) => {
        const p = res.totalBytesWritten / res.totalBytesExpectedToWrite;
        load.onProcess(pkgName, "codeLoad", load.total, load.loaded + p);
    });
}

// ============================== 本地
// 下载的多域名，在这里用于分包加载的最大次数
let urls: string[] = [];
// 下载的路径，要含 "/"
let downPath: string = "/";
// ============================== 立即执行
