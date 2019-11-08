import { FileSys } from "./filesys";

/**
 * 主目录
 *      * 项目文件名, 微信路径, 大小,  签名
 * 临时目录
 *      * 项目文件名, 磁盘路径, 大小,  签名
 */

/**
 * 主目录资源文件信息记录
 */
interface MainDirFileInfo {
    size: number;
    sign: string;
}

/**
 * 临时目录资源文件信息记录
 */
interface TempDirFileInfo {
    path: string;
    size: number;
    sign: string;
}

interface IFileInfo {
    path: string;
    sign: string;
    size: number;
    suffix: string;
}

export enum EFileStatus {
    /**
     * 有旧文件,并且有了差异
     */
    HAS_CHANGE  = 1,
    /**
     * 需要写入
     */
    NEED_WRITE  = 2,
    /**
     * 需要写入
     */
    CAN_USE     = 4
}

export class WX_DEPEND_MGR {
    public mainDependFilePath: string;
    public tempDependFilePath: string;
    public get mainInfo() {
        return this.main;
    }
    public get tempInfo() {
        return this.temp;
    }
    private main: {[index: string]: MainDirFileInfo} = {};
    private temp: {[index: string]: TempDirFileInfo} = {};
    private mainDependSize: number;
    private tempDependSize: number;
    private mainCfgSize: number;
    private mainFontSize: number;
    private mainImageSize: number;
    private mainAudioSize: number;
    private mainOtherSize: number;
    /**
     * 启动时读取并初始化, 请求写入主目录时,若被允许立即增加,写入失败时减少,删除文件成功时减少
     */
    private mainAllSize: number;
    private mainAllObjSize: number;
    private writeTimer: any;
    private mainDependDirty: boolean = false;
    private tempDependDirty: boolean = false;
    private static MaxMainAllSize: number;
    private static MaxMainAllObjSize: number;
    constructor(mainDependFilePath: string, tempDependFilePath: string) {
        this.mainDependFilePath = mainDependFilePath;
        this.tempDependFilePath = tempDependFilePath;
    }
    // private MaxMainAllSize: number;
    public readDependFile() {
        this.initMainSize();
        const main = new Promise((resolve, reject) => {
                        if (FileSys.isFileExist(this.mainDependFilePath)) {
                            FileSys.readFile(this.mainDependFilePath, 'utf8')
                                .then(
                                    (data) => {
                                        const json = JSON.parse((data as string));

                                        this.initMain(json || {});

                                        resolve(null);
                                    }
                                )
                                .catch(() => {
                                    this.initMain({});
                                    this.writeDependMain();
                                    resolve(null);
                                });
                        } else {
                            this.initMain({});
                            this.writeDependMain();
                            resolve(null);
                        }
                        });

        const temp = new Promise((resolve, reject) => {
                        if (FileSys.isFileExist(this.tempDependFilePath)) {
                            FileSys.readFile(this.tempDependFilePath, 'utf8')
                                .then(
                                    (data) => {
                                        const json = JSON.parse((data as string));

                                        this.initTemp(json || {});

                                        resolve(null);
                                    }
                                )
                                .catch(() => {
                                    this.initTemp({});
                                    this.writeDependTemp();
                                    resolve(null);
                                });
                        } else {
                            this.initTemp({});
                            this.writeDependTemp();
                            resolve(null);
                        }
                        });

        return Promise.all([main, temp]);
    }
    public initMain(data: {[index: string]: MainDirFileInfo}) {
        this.main = data;
    }
    public initTemp(data: {[index: string]: TempDirFileInfo}) {
        this.temp = data;
    }
    /**
     * 尝试写入一个文件到主目录，返回操作是否可行
     * @param info 文件信息
     * @param asObj 目标是否为 obj 类型数据
     * @returns  0：文件需要下载到临时目录， 1: 主目录旧文件需要删除,需要下载新文件到临时目录; 2: 需要下载文件到主目录; 3: 需要更新主目录文件; 4: 文件在主目录有效,可直接使用
     */
    public checkMain(info: IFileInfo, asObj?: boolean): EFileStatus {
        const old = this.main[info.path];
        let sizeType, status: EFileStatus = 0;

        // switch (info.suffix)  {
        //     case ('scene'):
        //     case ('config'):
        //     case ('json'):
        //     case ('dcss'):
        //     case ('kcss'):
        //     case ('widcfg'):
        //     case ('cfg'): {
        //         sizeType = 'mainCfgSize';
        //     }
        //     case ('ttf'): {
        //         sizeType = 'mainFontSize';
        //     }
        //     default: {
        //         sizeType = 'mainOtherSize';
        //     }
        // }

        // 判断是否存在旧文件信息
        if (old) {
            // 不需要更新文件
            if (old.sign === info.sign) {
                status = EFileStatus.CAN_USE;
                return status;
            } else {
                // this.deleteMain(info.path);
                // this[sizeType] -= info.size;
                // this[sizeType] = this[sizeType] < 0 ? 0 : this[sizeType];
                status += EFileStatus.HAS_CHANGE;
            }
        }

        // 判断新文件是否可写入主目录
        let tempAllSize = this.mainAllSize + info.size;
        let tempObjSize = this.mainAllObjSize + info.size;

        if (asObj) {
            if (tempAllSize > WX_DEPEND_MGR.MaxMainAllSize || tempObjSize > WX_DEPEND_MGR.MaxMainAllObjSize) {

            } else {
                status += EFileStatus.NEED_WRITE;
            }
        } else {
            if (tempAllSize > WX_DEPEND_MGR.MaxMainAllSize) {
                //
            } else {

                // this.addMain(info);

                // this[sizeType] += info.size;
                // this.mainAllSize = tempAllSize;

                status += EFileStatus.NEED_WRITE;
            }
        }

        return status;
    }
    /**
     * 尝试写入一个文件到主目录，返回操作是否可行
     * @param info 文件信息
     * @returns  0：不需任何处理,文件在本地有效; 1: 本地文件需要删除; 2: 需要下载文件到本地; 3: 需要更新本地文件
     */
    public checkTemp(info: IFileInfo): EFileStatus {
        const old = this.temp[info.path];
        let status: EFileStatus = 0;

        if (old) {
            if (old.sign === info.sign) {
                if (FileSys.isFileExist(old.path)) {
                    return status;
                }
            } else {
                this.deleteTemp(info.path);
                status += EFileStatus.HAS_CHANGE;
            }
        }

        this.addTemp(info);

        status += EFileStatus.NEED_WRITE;

        return status;
    }
    public addMain(info: IFileInfo) {
        this.main[info.path] = {
            size: info.size,
            sign: info.sign
        };
        this.mainDependDirty = true;
    }
    public addTemp(info: IFileInfo) {
        this.temp[info.path] = {
            path: info.path,
            size: info.size,
            sign: info.sign
        };
        this.tempDependDirty = true;
    }
    public changeTempPath(info: IFileInfo, wxPATH: string) {
        this.temp[info.path] = {
            path: wxPATH,
            size: info.size,
            sign: info.sign
        };
        this.tempDependDirty = true;
    }
    /**
     * 清空操作需要同步
     * * 同时需要立即调用 clearMainSize
     */
    public clearMain() {
        this.main = {};
        this.mainDependDirty = true;
        this.writeDependMain();
    }
    public deleteMain(key: string) {
        if (this.main[key]) {
            this.mainDependDirty = true;
            this.main[key] = undefined;
        }
    }
    public deleteTemp(key: string) {
        if (this.temp[key]) {
            this.tempDependDirty = true;
            this.temp[key] = undefined;
        }
    }
    public readMain(key: string) {
        return this.main[key];
    }
    public readTemp(key: string) {
        return this.temp[key];
    }
    public initMainSize() {
        this.mainAllSize    = localStorage.dbSize || 0;
        this.mainAllObjSize = localStorage.dbObjSize || 0;
    }
    public clearMainSize() {
        this.mainAllSize    = 0;
        this.mainAllObjSize = 0;

        localStorage.dbSize     = this.mainAllSize;
        localStorage.dbObjSize  = this.mainAllObjSize;
    }
    public readMainSize() {
        return this.mainAllSize;
    }
    public updateMainSize(change: number, asObj?: boolean) {
        this.mainAllSize        += change;
        localStorage.dbSize     = this.mainAllSize;

        if (asObj) {
            this.mainAllObjSize     += change;
            localStorage.dbObjSize  = this.mainAllObjSize;
        }

        // const size = this.mainDependSize
        //                 + this.tempDependSize
        //                 + this.mainCfgSize
        //                 + this.mainFontSize
        //                 + this.mainImageSize
        //                 + this.mainAudioSize;
    }
    public writeDepend() {
        if (!this.writeTimer) {
            this.writeTimer = setTimeout(this._writeDepend, 200);
        }
    }
    private _writeDepend = () => {
        clearTimeout(this.writeTimer);
        this.writeTimer = undefined;
        this.writeDependMain();
        this.writeDependTemp();
    }
    private writeDependMain() {
        if (this.mainDependDirty) {
            const jsonMain = {};

            for (const key in this.main) {
                if (this.main[key]) {
                    jsonMain[key] = this.main[key];
                }
            }

            FileSys.writeFileSync(this.mainDependFilePath, JSON.stringify(jsonMain));
        }
        this.mainDependDirty = false;
    }
    private writeDependTemp() {
        if (this.tempDependDirty) {
            const jsonTemp = {};

            for (const key in this.temp) {
                if (this.temp[key]) {
                    jsonTemp[key] = this.temp[key];
                }
            }

            FileSys.writeFileSync(this.tempDependFilePath, JSON.stringify(jsonTemp));
        }
        this.tempDependDirty = false;
    }
}