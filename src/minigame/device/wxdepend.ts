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
    HAS_CHANGE = 1,
    /**
     * 需要写入
     */
    NEED_WRITE = 2
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
    private static MaxMainAllSize: number;
    constructor(mainDependFilePath: string, tempDependFilePath: string) {
        this.mainDependFilePath = mainDependFilePath
        this.tempDependFilePath = tempDependFilePath;
    }
    // private MaxMainAllSize: number;
    public readDependFile() {
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
     * @returns  0：不需任何处理,文件在本地有效， 1: 本地文件需要删除; 2: 需要下载文件到本地; 3: 需要更新本地文件 
     */
    public checkMain(info: IFileInfo): EFileStatus {
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

        if (tempAllSize > WX_DEPEND_MGR.MaxMainAllSize) {
            //
        } else {

            // this.addMain(info);

            // this[sizeType] += info.size;
            // this.mainAllSize = tempAllSize;

            status += EFileStatus.NEED_WRITE;
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
    }
    public addTemp(info: IFileInfo) {
        this.temp[info.path] = {
            path: info.path,
            size: info.size,
            sign: info.sign
        };
    }
    public changeTempPath(info: IFileInfo, wxPATH: string) {
        this.temp[info.path] = {
            path: wxPATH,
            size: info.size,
            sign: info.sign
        };
    }
    public clearMain() {
        this.main = {};
        this.writeDependMain();
    }
    public deleteMain(key: string) {
        this.main[key] = undefined;
    }
    public deleteTemp(key: string) {
        this.temp[key] = undefined;
    }
    public readMain(key: string) {
        return this.main[key];
    }
    public readTemp(key: string) {
        return this.temp[key];
    }
    public initMainSize() {
        this.mainAllSize = localStorage.dbSize || 0;
    }
    public clearMainSize() {
        this.mainAllSize = 0;
        localStorage.dbSize = this.mainAllSize;
    }
    public sava() {

    }
    public readMainSize() {
        return this.mainAllSize;
    }
    public updateMainSize(change: number) {
        this.mainAllSize    += change;
        localStorage.dbSize = this.mainAllSize;

        // const size = this.mainDependSize
        //                 + this.tempDependSize
        //                 + this.mainCfgSize
        //                 + this.mainFontSize
        //                 + this.mainImageSize
        //                 + this.mainAudioSize;
    }
    public writeDepend() {
        this.writeDependMain();
        this.writeDependTemp();
    }
    private writeDependMain() {
        const jsonMain = {};

        for (const key in this.main) {
            if (this.main[key]) {
                jsonMain[key] = this.main[key];
            }
        }

        FileSys.writeFileSync(this.mainDependFilePath, JSON.stringify(jsonMain));
    }
    private writeDependTemp() {
        const jsonTemp = {};

        for (const key in this.temp) {
            if (this.temp[key]) {
                jsonTemp[key] = this.temp[key];
            }
        }

        FileSys.writeFileSync(this.tempDependFilePath, JSON.stringify(jsonTemp));
    }
}