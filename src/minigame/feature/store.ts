/**
 * 小游戏的 store 通过文件系统模拟 indexedDB ，
 * 文件存放到 dbName/tabName 目录下
 */
import { clearDir, readFile, getFileInfoSync, deleteFile } from "../device/filemanager";
import { WriteFileQueue } from "../device/writeFQ";
import { getFile } from "../setup/depend";

export class Store {
    public readonly dbName: string;
    public readonly tabName: string;
    wfq: WriteFileQueue;                       // 文件读写队列
    map: Map<string, any>;                     // 内存中的数据
    files: Set<string>;                        // 存到用户目录中的文件
    tmpFileMap: Map<string, [string, string]>; // 保存到临时目录中的文件 {path:[sign,localPath]}

    static limitSize = 45 * 1024 * 1024;       // 本地用户目录下最多存放的数据量

    /**
     * 判断是否支持IndexedDB
     */
    static check = () => {
        return false;
    }
    /**
     * 删除指定的数据库
     */
    static delete = (dbName: string): Promise<any> => {
        return clearDir(dbName);
    }
    /**
     * 创建指定名称的存储
     */
    static create = (dbName: string, tabName = "_db"): Promise<Store> => { // 返回值类型1|类型2
        return new Promise((resolve, reject) => {
            let s = new Store(dbName, tabName);
            s.map = new Map();
            WriteFileQueue.create(s).then((wfq) => {
                s.wfq = wfq;
                resolve(s);
            }).catch(reject);
        });
    }
    constructor(dbName: string, tabName: string) {
        this.dbName = dbName;
        this.tabName = tabName;
    }
    /**
     * 读取数据
     */
    public read(key:string): Promise<any> {
        return new Promise((resolve, reject) => {
            if(this.map.has(key)) {
                return resolve([key, this.map.get(key)]);
            }
            let path = "";
            if (this.files.has(path)) {
                path = `${this.dbName}/${this.tabName}/${key}`;
            } else if (this.tmpFileMap.has(`${key}`)) {
                path = this.tmpFileMap.get(`${key}`)[1];
            }
            readFile(path).then((value) => {
                resolve([key, value]);
            }).catch(reject);
        });
    }
    /**
     * 写入数据，如果键名存在则替换
     */
    public write(key:string, data: any): Promise<any> {
        return new Promise((resolve) => {
            this.map.set(key, data);
            this.wfq.add(key, { path: key, data, sign: getFile(key).sign });
            resolve();
            // TODO: 触发队列开始写
        });
    }
    /**
     * 删除数据
     */
    public delete(key:string): Promise<any> {
        return new Promise((resolve, reject) => {
            if(this.files.has(key)) {
                // 数据在本地用户文件中

                // 获取文件大小
                const path = `${this.dbName}${this.tabName}/${key}`;
                const info = getFile(key);
                const size = (info && info.size) ? info.size : (getFileInfoSync(path).size || 0);
                deleteFile(key).then(() => {
                    this.files.delete(key);
                    this.map.has(key) && this.map.delete(key);
                    localStorage.dbSize -= size;
                    this.wfq.deleteSign(key);
                    resolve();
                }).catch(reject);
            } else if (this.tmpFileMap.has(key)) {
                // 数据在本地临时文件中

                // 本地临时文件无需删除文件，直接删除其在store内的文件路径对照
                // 即可，微信对本地临时文件有相应的回收机制
                this.tmpFileMap.delete(key);
            } else {
                // 数据在内存中
                this.map.delete(key);
                resolve();
            }
        });
    }
    /**
     * 清除存储
     */
    public clear(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.map.clear();
            localStorage.dbSize = 0
            clearDir(this.tabName).then(resolve).catch(reject);
        });
    }
    /**
     * 迭代, callback返回false表示停止迭代
     */
    public iterate(callback: (result:{key:any, value:any}) => boolean, errorCallback: (err: Event) => void) {
        setTimeout(() => {
            for (const [key, value] of this.map) {
                if (callback({key, value}) === false) {
                    return;
                }
            }
            const keyArr: string[] = [];
            for (const key of this.files.keys()) {
                keyArr.push(`${this.dbName}/${this.tabName}/${key}`);
            }
            for (const value of this.tmpFileMap.values()) {
                keyArr.push(value[1]);
            }

            let needSkip = false;
            const pArr = [];
            for (const key of keyArr) {
                pArr.push(readFile(key).then((value) => {
                    if (needSkip) {
                        return;
                    }
                    if (callback({key, value}) === false) {
                        needSkip = true;
                    }
                }).catch((err) => {
                    if (needSkip) {
                        return;
                    }
                    needSkip = true;
                    errorCallback(err);
                }));
            }
            Promise.all(pArr).then(() => {
                needSkip || callback(null);
            });
        }, 0);
    };
}
