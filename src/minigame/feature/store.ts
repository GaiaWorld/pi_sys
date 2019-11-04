/**
 * 小游戏的 store 通过文件系统模拟 indexedDB ，
 * 文件存放到 dbName/tabName 目录下
 */
// import { WriteFileQueue } from "../device/writeFQ";
import { WriteFileQueue } from "../device/write_file_queue";
import { DEPEND_MGR } from "../setup/depend";
import { FileSys } from "../device/filesys";
import { WX_DEPEND_MGR } from "../device/wxdepend";

export class Store {
    /**
     * 框架存储器
     */
    public static instance: Store;
    /**
     * 项目名称
     */
    public readonly projectName: string;
    /**
     * 子文件夹名称
     */
    public readonly childDirName: string;
    /**
     * 文件写磁盘的队列
     */
    public writeFileQueue: WriteFileQueue;
    /**
     * 下载到内存的文件列表
     */
    public fileBufferMap: Map<string, any>;
    /**
     * 微信空间文件信息
     */
    public wxdepend: WX_DEPEND_MGR;
    /**
     * 主目录下最多存放的数据量
     */
    public static limitSize = 45 * 1024 * 1024;

    /**
     * 判断是否支持IndexedDB
     */
    public static check = () => {
        return false;
    }
    /**
     * 删除指定的子目录
     */
    public static delete(childDirName: string): Promise<any> {
        return FileSys.clearDir(childDirName);
    }

    /**
     * 创建指定名称的存储
     */
    // public static create(projectName: string, childDirName?: string): Promise<Store> {
    public static create(projectName: string, childDirName?: string): Store {
        return new Store(projectName, childDirName);
        // return new Promise((resolve, reject) => {
        //     let store = new Store(projectName, childDirName);
        //     Store.instance = store;

        //     WX_DEPEND_MGR.mainDependFilePath = store.formatStorePath('depend');
        //     WX_DEPEND_MGR.mainDependFilePath = store.formatStorePath('depend_temp');

        //     store.wxdepend = new WX_DEPEND_MGR();

        //     store.wxdepend.readDependFile()
        //         .then(() => {
        //             store.writeFileQueue = WriteFileQueue.create(store, store.wxdepend);
        //             resolve(store);
        //         })
        //         .catch(reject);
        // });
    }
    
    constructor(projectName: string, childDirName: string) {
        this.projectName = projectName;
        this.childDirName = childDirName;

        this.fileBufferMap = new Map();
    }

    /**
     * 获得主目录文件保存路径
     * @param path 
     */
    public formatStorePath(path: string) {
        if (this.childDirName) {
            return `${this.projectName}/${this.childDirName}/${path}`;
        } else {
            return `${this.projectName}/${path}`;
        }
    }

    /**
     * 读取数据
     */
    public read(key: string): Promise<any> {
        const fileInfo = DEPEND_MGR.getFile(key);

        if (!!fileInfo) {
            return Promise.reject(`no such file ${key}`);
        } else {
            // 默认一定足够主目录
            // const status = this.wxdepend.checkMain(fileInfo);

            return new Promise((resolve, reject) => {
                if (this.fileBufferMap.has(key)) {
                    return resolve([key, this.fileBufferMap.get(key)]);
                }

                let wxpath;

                const mainInfo = this.wxdepend.readMain(key);
                const tempInfo = this.wxdepend.readTemp(key);

                if (mainInfo) {
                    wxpath = this.formatStorePath(key);
                } else if (tempInfo) {
                    wxpath = tempInfo.path;
                }

                if (wxpath) {
                    FileSys.readFile(wxpath)
                        .then((value) => {
                            resolve([key, value]);
                        })
                        .catch((err) => {
                            reject(err)
                        });
                } else {
                    resolve(null)
                }
            });
        }
    }

    /**
     * 写入数据，如果键名存在则替换
     * @param fileInfo 如果为空则启动文件写队列
     * @param data 文件数据
     */
    public write(key: string, data: any): Promise<any> {
        return new Promise((resolve) => {

            const fileInfo = DEPEND_MGR.getFile(key);

            // 写localSign时触发写队列开始写文件
            if (!fileInfo) {
                this.writeFileQueue.start();
            } else {
                this.fileBufferMap.set(fileInfo.path, data);
                this.writeFileQueue.add(fileInfo, data);
            }

            resolve();
        });
    }
    /**
     * 删除数据
     */
    public delete(key: string): Promise<any> {
        const fileInfo = DEPEND_MGR.getFile(key);
        
        if (!!fileInfo) {
            return Promise.reject(`no such file ${key}`);
        } else {
            return new Promise((resolve, reject) => {

                if (this.fileBufferMap.has(key)) {
                    return resolve([key, this.fileBufferMap.get(key)]);
                }

                let wxpath;

                const mainInfo = this.wxdepend.readMain(key);
                const tempInfo = this.wxdepend.readTemp(key);
                
                this.fileBufferMap.has(key) && this.fileBufferMap.delete(key);

                if (mainInfo) {
                    // 数据在本地用户文件中
                    // 获取文件大小
                    wxpath = this.formatStorePath(key);
                    this.wxdepend.updateMainSize(-fileInfo.size);

                    FileSys.deleteFile(wxpath)
                        .then(() => {
                            this.wxdepend.deleteMain(fileInfo.path);
                            resolve();
                        }).catch(reject);
                } else if (tempInfo) {
                    // 数据在本地临时文件中

                    // 本地临时文件无需删除文件，直接删除其在store内的文件路径对照
                    // 即可，微信对本地临时文件有相应的回收机制
                    wxpath = tempInfo.path;
                    this.wxdepend.deleteTemp(key);
                    resolve();
                } else {
                    // 数据在内存中
                    resolve();
                }
            });
        }
    }
    /**
     * 清除存储
     */
    public clear(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fileBufferMap.clear();
            
            FileSys.clearDir(this.formatStorePath(''))
                .then(() => {
                    resolve();
                    // 此处是同步写
                    this.wxdepend.clearMain();
                    // 同步修改 size 记录
                    this.wxdepend.clearMainSize();
                })
                .catch(reject);
        });
    }
    /**
     * 迭代, callback返回false表示停止迭代
     */
    public iterate(callback: (result:{key:any, value:any}) => boolean, errorCallback: (err: Event) => void) {
        setTimeout(() => {
            for (const [key, value] of this.fileBufferMap) {
                if (callback({key, value}) === false) {
                    return;
                }
            }
            const keyArr: string[] = [];

            const main = this.wxdepend.mainInfo;
            for (const key in main) {
                keyArr.push(this.formatStorePath(key));
            }

            const temp = this.wxdepend.tempInfo;
            for (const key in temp) {
                keyArr.push(temp[key].path);
            }

            let needSkip = false;
            const pArr = [];

            for (const key of keyArr) {
                pArr.push(FileSys.readFile(key)
                    .then((value) => {
                        if (needSkip) {
                            return;
                        }
                        if (callback({key, value}) === false) {
                            needSkip = true;
                        }
                    })
                    .catch((err) => {
                        if (needSkip) {
                            return;
                        }
                        needSkip = true;
                        errorCallback(err);
                    })
                );
            }
            Promise.all(pArr).then(() => {
                needSkip || callback(null);
            });
        }, 0);
    };
}
