import { wx } from "./wx";


interface UserFileList {
    dir: string[],
    file: string[],
    err?: any
}

enum Status {
    OK = "OK",
    ERR = "ERR"
}

export class FileSys {
    /**
     * 本地用户文件根目录
     */
    public static root: string = `${wx.env.USER_DATA_PATH}/`;
    public static localFlag: string;
    /**
     * 文件系统对象
     */
    public static fs: wx.FileSystemManager;
    public static init() {
        this.fs = wx.getFileSystemManager();
        
        const idx = this.root.indexOf(":");
        this.localFlag = `${this.root.substring(0, idx)}://`;
        
    }
    /**
     * 格式化目录，目标格式为"example/"
     * @param   dir 需要格式化的目录
     */
    public static formatDir(dir: string) {
        if (dir[0] === "/") {
            dir.slice(1);
        }

        if (dir[dir.length - 1] !== "/") {
            dir += "/";
        }

        return dir;
    }
    /**
     * 获取path在本地用户目录下的完整URL
     * @param   path    项目文件路径
     */
    public static fullLocalPath(path: string) {
        if (path.startsWith("/")) {
            path = path.slice(1);
        }

        if (path.search(FileSys.localFlag) === -1) {
            path = FileSys.root + path;
        }

        return path;
    }
    /**
     * 判断path对应的文件是否存在
     */
    public static isFileExist = (path: string) => {
        path = FileSys.fullLocalPath(path);

        try {
            FileSys.fs.accessSync(path);
            return true;
        } catch (err) {
            return false;
        }
    }
    /**
     * 为即将下载的文件准备目录，防止不能存储
     */
    public static prepareDir(fileName: string) {
        fileName = fileName.replace(FileSys.root, '');
        if (fileName.startsWith("/")) {
            fileName.slice(1);
        }

        if (navigator.platform === "devtools") {
            let i = 0;
            while ((i = fileName.indexOf("/", i + 1)) >= 0) {
                let dir = `${fileName.slice(0, i)}`;
                dir = FileSys.fullLocalPath(dir);
                if (!FileSys.isFileExist(dir)) {
                    FileSys.fs.mkdirSync(dir);
                }
            }
        } else {
            // 在开发者工具中该方法报错，真机上可用
            const idx = fileName.lastIndexOf("/");
            if (idx !== -1) {
                fileName = fileName.slice(0, idx);
            }
            fileName = FileSys.fullLocalPath(fileName);
            if (!FileSys.isFileExist(fileName)) {
                FileSys.fs.mkdirSync(fileName, true);
            }
        }

    }
    
    /**
     * 递归删除指定目录及该目录下的所有文件
     * @param dir 要删除的目录，如不指定，则默认删除根目录下的所有文件及文件夹
     */
    public static clearDir(dir: string = FileSys.root): Promise<undefined> {
        dir = FileSys.fullLocalPath(dir);
        if (dir !== FileSys.root) {
            return new Promise((resolve, reject) => {
                FileSys.fs.rmdir({
                    dirPath: dir,
                    recursive: true,
                    success: () => resolve(),
                    fail: reject
                })
            });
        }
        return new Promise((resolve, reject) => {
            FileSys.fs.readdir({
                dirPath: dir,
                success: ({files}) => resolve(files),
                fail: reject
            })
        }).then((files: string[]) => {
            const pArr = [];
            files.forEach((file) => {
                pArr.push(new Promise((resolve, reject) => {
                    file = `${FileSys.root}${file}`;
                    FileSys.fs.stat({
                        path: file,
                        success: ({stats}) => resolve({ file, stats }),
                        fail: reject
                    });
                }));
            });

            return Promise.all(pArr);
        }).then((resArr: {file: string, stats: wx.Stats}[]) => {
            const arr = [];
            resArr.forEach(({file, stats}) => {
                arr.push(new Promise((resolve, reject) => {
                    if (stats.isFile()) {
                        FileSys.fs.unlink({
                            filePath: file,
                            success: () => resolve(),
                            fail: reject
                        });
                    } else {
                        FileSys.fs.rmdir({
                            dirPath: file,
                            recursive: true,
                            success: () => resolve(),
                            fail: reject
                        });
                    }
                }));
            });
            return Promise.all(arr);
        }).then(() => undefined);
    }
    /**
     * 同步递归删除指定目录及该目录下的所有文件
     * @param dir 要删除的目录，如不指定，则默认删除根目录下的所有文件及文件夹
     */
    public static clearDirSync(dir: string = FileSys.root) {
        try {
            // 根目录不能删除(无权限)，只能删除根目录下的文件及文件夹
            if (FileSys.fullLocalPath(dir) === FileSys.root) {
                const files = FileSys.fs.readdirSync(FileSys.root);
                files.forEach((file: string) => {
                    file = `${FileSys.root}${file}`;
                    if (FileSys.fs.statSync(file).isFile()) {
                        FileSys.fs.unlinkSync(file);
                    } else {
                        FileSys.fs.rmdirSync(file, true);
                    }
                });
            } else {
                dir = FileSys.fullLocalPath(dir);
                FileSys.fs.rmdirSync(dir, true);
            }
        } catch (err) {
            console.warn("clearDirSync:", dir, err);
        }
    }
    /**
     * 列出目录下的所有文件及文件夹
     * @param dirPath 需要列出文件的目录，不传则默认列出根目录下的所有文件及文件夹
     */
    public static listUserFiles(dirPath: string = FileSys.root) {
        const userFiles: UserFileList = { dir: <string[]>[], file: [], err: undefined };

        const listFiles = (dir: string) => {
            dir = FileSys.formatDir(dir);
            try {
                const files = FileSys.fs.readdirSync(dir);
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (FileSys.fs.statSync(dir + file).isDirectory()) {
                        userFiles.dir.push(dir + file);
                        listFiles(dir + file);
                    } else {
                        userFiles.file.push(dir + file);
                    }
                }
            } catch (err) {
                userFiles.err = err;
            }

            return userFiles;
        };

        return listFiles(dirPath);
    }
    /**
     * 同步读取本地文件内容
     */
    public static readFileSync(path: string, encoding?: string) {
        path = FileSys.fullLocalPath(path);
        try {
            const data: string|ArrayBuffer = FileSys.fs.readFileSync(path, encoding);
            return {
                data,
                status: Status.OK
            };
        } catch (err) {
            return {
                status: Status.ERR,
                msg: <string>err.message
            };
        }
    }
    /**
     * 读取文件内容
     * @param path 文件路径
     * @param encoding 编码方式，如果不传该参数，则读取的数据是 ArrayBuffer
     */
    public static readFile(path: string, encoding?: string): Promise<string|ArrayBuffer> {
        return new Promise((resolve, reject) => {
            path = FileSys.fullLocalPath(path);
            FileSys.fs.readFile({
                encoding,
                filePath: path,
                success(res: any) {
                    resolve(res.data);
                },
                fail(err: any) {
                    err.path = path;
                    reject(err);
                }
            });
        });
    }
    /**
     * 获取文件信息
     * @param path 文件路径
     */
    public static getFileInfo(path: string): Promise<{path: string, stats: Object | wx.Stats}> {
        return new Promise((resolve, reject) => {
            path = FileSys.fullLocalPath(path);
            FileSys.fs.stat({
                path,
                success({ stats }) {
                    resolve({ path, stats });
                },
                fail(err: any) {
                    err.path = path
                    reject(err);
                }
            });
        })
    }
    /**
     * 获取文件信息(同步)
     * @param path 文件路径
     */
    public static getFileInfoSync(path: string): wx.Stats {
        path = FileSys.fullLocalPath(path)
        try {
            return FileSys.fs.statSync(path)
        } catch (e) {
            return e
        }
    }
    /**
     * 写文件
     * @param   filePath    要存到的路径
     * @param   data        数据
     * @param   encoding    编码方式
     */
    public static writeFile(
        filePath: string,
        data: string|ArrayBuffer,
        encoding?:string
    ): Promise<undefined> {
        return new Promise((resolve, reject) => {
            FileSys.prepareDir(filePath)
            FileSys.fs.writeFile({
                filePath: FileSys.fullLocalPath(filePath),
                data,
                encoding,
                success: () => resolve(),
                fail: reject
            });
        });
    }
    
    // 同步写文件
    public static writeFileSync = (filePath: string, data: string|ArrayBuffer) => {
        FileSys.prepareDir(filePath)
        FileSys.fs.writeFileSync(FileSys.fullLocalPath(filePath), data)
    }

    // 删除文件
    public static deleteFile = (filePath: string): Promise<undefined> => (
        new Promise((resolve, reject) => {
            FileSys.fs.unlink({
                filePath: FileSys.fullLocalPath(filePath),
                success: () => resolve(),
                fail: reject
            });
        })
    );

    // 同步删除文件
    public static deleteFileSync = (filePath: string)=> {
        FileSys.fs.unlinkSync(FileSys.fullLocalPath(filePath))
    };
    /**
     * 小游戏原生下载接口封装
     * @param   url         资源url
     * @param   savePath    要保存到的位置, 未指定则保存到临时目录
     */
    public static download(url: string, savePath?: string): Promise<string> {
        if (savePath) {
            savePath = this.fullLocalPath(savePath);
        }

        return new Promise((resolve, reject) => {
            if (savePath) {
                FileSys.prepareDir(savePath);
            }
            wx.downloadFile({
                url,
                filePath: savePath,
                success: (res: any) => {
                    if (res.statusCode === 200) {
                        resolve(savePath ? res.filePath : res.tmpFilePath);
                    } else {
                        reject(res);
                    }
                },
                fail: reject
            });
        });
    }
}