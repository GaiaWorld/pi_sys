/**
 * 微信小游戏文件相关接口封装
 */

declare var wx: any;

// 本地用户文件根目录
const root = `${wx.env.USER_DATA_PATH}/`;
const localFlag = (function () {
    const idx = root.indexOf(":");
    return `${root.substring(0, idx)}://`;
})();

// 文件系统对象
const fs = wx.getFileSystemManager();

/**
 * 格式化目录，目标格式为"example/"
 * @param   dir 需要格式化的目录
 */
const formatDir = (dir: string) => {
    if (dir[0] === "/") {
        dir.slice(1);
    }
    if (dir[dir.length - 1] !== "/") {
        dir += "/";
    }
    return dir;
};

/**
 * 获取path在本地用户目录下的完整URL
 * @param   path    项目文件路径
 */
export const fullLocalPath = (path: string) => {
    if (path.startsWith("/")) {
        path = path.slice(1);
    }
    if (path.search(localFlag) === -1) {
        path = root + path;
    }
    return path;
};

/**
 * 判断path对应的文件是否存在
 */
export const isFileExist = (path: string) => {
    path = fullLocalPath(path);
    try {
        fs.accessSync(path);
        return true;
    } catch (err) {
        return false;
    }
};

/**
 * 为即将下载的文件准备目录，防止不能存储
 */
export const prepareDir = (fileName: string) => {
    fileName = fileName.replace(root, '');
    if (fileName.startsWith("/")) {
        fileName.slice(1);
    }

    if (navigator.platform === "devtools") {
        let i = 0;
        while ((i = fileName.indexOf("/", i + 1)) >= 0) {
            let dir = `${fileName.slice(0, i)}`;
            dir = fullLocalPath(dir);
            if (!isFileExist(dir)) {
                fs.mkdirSync(dir);
            }
        }
    } else {
        // 在开发者工具中该方法报错，真机上可用
        const idx = fileName.lastIndexOf("/");
        if (idx !== -1) {
            fileName = fileName.slice(0, idx);
        }
        fileName = fullLocalPath(fileName);
        if (!isFileExist(fileName)) {
            fs.mkdirSync(fileName, true);
        }
    }

};

export interface FileStats {
    mode: string,
    size: number,
    lastAccessedTime: number,
    lastModifiedTime: number,
    isDirectory: () => boolean,
    isFile: () => boolean,
};

/**
 * 递归删除指定目录及该目录下的所有文件
 * @param dir 要删除的目录，如不指定，则默认删除根目录下的所有文件及文件夹
 */
export const clearDir = (dir = root): Promise<undefined> => {
    dir = fullLocalPath(dir);
    if (dir !== root) {
        return new Promise((resolve, reject) => {
            fs.rmdir({
                dirPath: dir,
                recursive: true,
                success: () => resolve(),
                fail: reject
            })
        });
    }
    return new Promise((resolve, reject) => {
        fs.readdir({
            dirPath: dir,
            success: ({files}) => resolve(files),
            fail: reject
        })
    }).then((files: string[]) => {
        const pArr = [];
        files.forEach((file) => {
            pArr.push(new Promise((resolve, reject) => {
                file = `${root}${file}`;
                fs.stat({
                    path: file,
                    success: ({stats}) => resolve({ file, stats }),
                    fail: reject
                });
            }));
        });

        return Promise.all(pArr);
    }).then((resArr: {file: string, stats: FileStats}[]) => {
        const arr = [];
        resArr.forEach(({file, stats}) => {
            arr.push(new Promise((resolve, reject) => {
                if (stats.isFile()) {
                    fs.unlink({
                        filePath: file,
                        success: () => resolve(),
                        fail: reject
                    });
                } else {
                    fs.rmdir({
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
};

/**
 * 同步递归删除指定目录及该目录下的所有文件
 * @param dir 要删除的目录，如不指定，则默认删除根目录下的所有文件及文件夹
 */
export const clearDirSync = (dir = root) => {
    try {
        // 根目录不能删除(无权限)，只能删除根目录下的文件及文件夹
        if (fullLocalPath(dir) === root) {
            const files = fs.readdirSync(root);
            files.forEach((file: string) => {
                file = `${root}${file}`;
                if (fs.statSync(file).isFile()) {
                    fs.unlinkSync(file);
                } else {
                    fs.rmdirSync(file, true);
                }
            });
        } else {
            dir = fullLocalPath(dir);
            fs.rmdirSync(dir, true);
        }
    } catch (err) {
        console.warn("clearDirSync:", dir, err);
    }
};

interface UserFileList {
    dir: string[],
    file: string[],
    err?: any
}
/**
 * 列出目录下的所有文件及文件夹
 * @param dirPath 需要列出文件的目录，不传则默认列出根目录下的所有文件及文件夹
 */
export const listUserFiles = (dirPath = root) => {
    const userFiles: UserFileList = { dir: <string[]>[], file: [], err: undefined };
    const listFiles = (dir: string) => {
        dir = formatDir(dir);
        try {
            const files = fs.readdirSync(dir);
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (fs.statSync(dir + file).isDirectory()) {
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
};

enum Status {
    OK = "OK",
    ERR = "ERR"
}
/**
 * 同步读取本地文件内容
 */
export const readFileSync = (path: string, encoding?: string) => {
    path = fullLocalPath(path);
    try {
        const data: string|ArrayBuffer = fs.readFileSync(path, encoding);
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
};
readFileSync.status = Status;

/**
 * 读取文件内容
 * @param path 文件路径
 * @param encoding 编码方式，如果不传该参数，则读取的数据是 ArrayBuffer
 */
export const readFile = (path: string, encoding?: string): Promise<string|ArrayBuffer> => (
    new Promise((resolve, reject) => {
        path = fullLocalPath(path);
        fs.readFile({
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
    })
);

/**
 * 获取文件信息
 * @param path 文件路径
 */
export const getFileInfo = (path: string): Promise<{path: string, stats: FileStats}> => (
    new Promise((resolve, reject) => {
        path = fullLocalPath(path);
        fs.stat({
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
);

/**
 * 获取文件信息(同步)
 * @param path 文件路径
 */
export const getFileInfoSync = (path: string): FileStats => {
    path = fullLocalPath(path)
    try {
        return fs.statSync(path)
    } catch (e) {
        return e
    }
}

// 写文件
/**
 * 写文件
 * @param   filePath    要存到的路径
 * @param   data        数据
 * @param   encoding    编码方式
 */
export const writeFile = (
    filePath: string,
    data: string|ArrayBuffer,
    encoding?:string
): Promise<undefined> => {
    return new Promise((resolve, reject) => {
        prepareDir(filePath)
        fs.writeFile({
            filePath: fullLocalPath(filePath),
            data,
            encoding,
            success: () => resolve(),
            fail: reject
        });
    });
}

// 同步写文件
export const writeFileSync = (filePath: string, data: string|ArrayBuffer) => {
    prepareDir(filePath)
    fs.writeFileSync(fullLocalPath(filePath), data)
}

// 删除文件
export const deleteFile = (filePath: string): Promise<undefined> => (
    new Promise((resolve, reject) => {
        fs.unlink({
            filePath: fullLocalPath(filePath),
            success: () => resolve(),
            fail: reject
        });
    })
);

// 同步删除文件
export const deleteFileSync = (filePath: string)=> {
    fs.unlinkSync(fullLocalPath(filePath))
};
