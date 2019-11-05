import { IFileDependInfo, IFileInfo } from "../device/base";

/**
 * 
 */

export class FileInfo implements IFileDependInfo {
    public path: string;
    public sign: string;
    public size: number;
    public depend: string[];
    public suffix: string;
    constructor(args: IFileInfo) {
        this.path = args[0];
        this.size = args[1];
        this.sign = args[2];
        this.depend = args[3];
        this.suffix = DEPEND_MGR.fileSuffix(this.path);
    }
}

export class DirInfo {
    public parent: DirInfo;
    public path: string;
    public count: number = 0;
    public size: number = 0;
    public children: DirInfo[];
    public files: FileInfo[];
    public suffixMap: Map<string, FileInfo[]>; // 好像只需要数量和大小，后面需要计算所有签名的异或值
    constructor(path: string) {
        this.path = path;
    }
    public add(info: FileInfo, isSuffix: boolean) {
        let fileInfoList: FileInfo[];

        if (isSuffix) {
            if (!this.suffixMap) {
                this.suffixMap = new Map;
            }

            fileInfoList = this.suffixMap.get(info.suffix);

            if (!fileInfoList) {
                fileInfoList = [];
                this.suffixMap.set(info.suffix, fileInfoList);
            }
        } else {
            fileInfoList = this.files;

            if (!fileInfoList) {
                this.files = fileInfoList = [];
            }
        }

        fileInfoList.push(info);

        let parent: DirInfo = this;

        while (parent) {
            parent.count +=  1;
            parent.size  +=  info.size;

            parent = parent.parent;
        }
    }
}

/**
 * 
 */

export type DEPEND_DATA = IFileInfo[];

export class DEPEND_MGR {
    /**
     * 文件表
     */
    private static fileMap:  Map<string, FileInfo> = new Map();
    /**
     * 目录表
     */
    private static dirMap:  Map<string, DirInfo> = new Map();
    /**
     * 注册数据 - 根据文件表初始化依赖表
     * @param data depend 数据
     */
    public static init(data: DEPEND_DATA) {
        for (let args of data) {

            let fileInfo = new FileInfo(args);

            DEPEND_MGR.fileMap.set(fileInfo.path, fileInfo);

            DEPEND_MGR.initDir(fileInfo, DEPEND_MGR.dirMap, false);
        }
    }
    /**
     * 将文件放入到目录表中
     * @param f *
     * @param map *
     * @param isSuffix *
     */
    public static initDir(f: FileInfo, map: Map<string, DirInfo>, isSuffix: boolean) {
        let path = f.path;
        let j = path.lastIndexOf("/");
        let dir = j > 0 ? path.slice(0, j + 1) : "";
        let info = map.get(dir);

        if (!info) {
            info = new DirInfo(dir);
            map.set(dir, info);
            let sub = info;
            while(true) {
                j = dir.lastIndexOf("/", j - 1);
                if(j <= 0) {
                    let root = map.get("");
                    if(!root) {
                        root = new DirInfo("");
                        root.children = [];
                        map.set("", root);
                    }
                    root.children.push(sub);
                    sub.parent = root;
                    break;
                }
                dir = dir.slice(0, j + 1);
                let parent = map.get(dir);
                if(parent){
                    if(parent.children){
                        parent.children.push(sub);
                    }else{
                        parent.children = [sub];
                    }
                    sub.parent = parent;
                    break;
                }
                parent = new DirInfo(dir);
                parent.children = [];
                map.set(dir, parent);
                parent.children.push(sub);
                sub.parent = parent;
                sub = parent;
            }
        }

        info.add(f, isSuffix);
    }
    public static getFile(path: string) {
        return DEPEND_MGR.fileMap.get(path);
    }
    // 获得目录信息，"***/"表示为目录，包含所有的文件和子目录
    public static getDir(path: string) {
        return DEPEND_MGR.dirMap.get(path);
    }
    public static fileDot(file: string) {
        for (let i = file.length - 1; i >= 0; i--) {
            let c = file.charCodeAt(i);
            if (c === 47)
                return -1;
            if (c === 46)
                return i;
        }
        return -1;
    }
    public static fileSuffix(file: string) {
        let dot = DEPEND_MGR.fileDot(file);
        return (dot >= 0) ? file.slice(dot + 1) : "";
    }
    public static fileBasename(file: string) {
        let i = file.lastIndexOf("/");
        let dot = DEPEND_MGR.fileDot(file);
        return (i > dot) ? file.slice(i + 1, dot) : file.slice(i + 1);
    }
    public static relativePath(filePath:string, dir:string) {
        if (filePath.charCodeAt(0) !== 46)
            return filePath;
        let i = 0;
        let len = filePath.length;
        let j = dir.length - 1;
        if (dir.charCodeAt(j) !== 47) {
            j = dir.lastIndexOf("/");
        }
        while (i < len) {
            if (filePath.charCodeAt(i) !== 46)
                break;
            if (filePath.charCodeAt(i + 1) === 47) { // ./的情况
                i += 2;
                break;
            }
            if (filePath.charCodeAt(i + 1) !== 46 || filePath.charCodeAt(i + 2) !== 47)
                break;
            // ../的情况
            i += 3;
            j = dir.lastIndexOf("/", j - 1);
        }
        if (i > 0)
            filePath = filePath.slice(i);
        if (j < 0)
            return filePath;
        if (j < dir.length - 1)
            dir = dir.slice(0, j + 1);
        return dir + filePath;
    }
}

export const getFile  = (file: string) => {
    return DEPEND_MGR.getFile(file);
}

export const getDir = (dir: string) => {
    return DEPEND_MGR.getDir(dir);
}
