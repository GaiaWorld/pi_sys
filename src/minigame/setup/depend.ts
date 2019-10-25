export class FileInfo {
    public path: string;
    public sign: string;
    public size: number;
    public depend: string[];
    public suffix: string;
    constructor(args: any[]) {
        this.path = args[0];
        this.size = args[1];
        this.sign = args[2];
        if(args[3])
            this.depend = args[3];
        this.suffix = fileSuffix(this.path);
    }
}
export class DirInfo {
    parent: DirInfo;
    public path: string;
    public count: number = 0;
    public size: number = 0;
    public children: DirInfo[];
    public files: FileInfo[];
    public suffixMap: Map<string, FileInfo[]>; // 好像只需要数量和大小，后面需要计算所有签名的异或值
    constructor(path: string) {
        this.path = path;
    }
    add(info: FileInfo, isSuffix: boolean) {
        let r: FileInfo[];
        if(isSuffix) {
            if(!this.suffixMap)
                this.suffixMap = new Map;
            r = this.suffixMap.get(info.suffix);
            if(!r) {
                r = [];
                this.suffixMap.set(info.suffix, r);
            }
        }else{
            r = this.files;
            if(!r){
                this.files = r = [];
            }
        }
        r.push(info);
        let p: DirInfo = this;
        while(p) {
            p.count+=1;
            p.size+=info.size;
            p = p.parent;
        }
    }
}

// 根据文件表初始化依赖表
export const init = (files: any[][]) => {
    for(let args of files) {
        let f = new FileInfo(args);
        fileMap.set(f.path, f);
        initDir(f, dirMap, false);
    }
}

// 将文件放入到目录表中
export const initDir = (f: FileInfo, map: Map<string, DirInfo>, isSuffix: boolean) => {
    let path = f.path;
    let j = path.lastIndexOf("/");
    let dir = j > 0 ? path.slice(0, j + 1) : "";
    let info = map.get(dir);
    if(!info) {
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

// 获得文件信息
export const getFile = (path: string) => {
    return fileMap.get(path);
};
// 获得目录信息，"***/"表示为目录，包含所有的文件和子目录
export const getDir = (path: string) => {
    return dirMap.get(path);
};


export const fileDot = (file: string) => {
    for (let i = file.length - 1; i >= 0; i--) {
        let c = file.charCodeAt(i);
        if (c === 47)
            return -1;
        if (c === 46)
            return i;
    }
    return -1;
}
export const fileSuffix = (file: string) => {
    let dot = fileDot(file);
    return (dot >= 0) ? file.slice(dot + 1) : "";
}
export const fileBasename = (file: string) => {
    let i = file.lastIndexOf("/");
    let dot = fileDot(file);
    return (i > dot) ? file.slice(i + 1, dot) : file.slice(i + 1);
}
export const relativePath = (filePath:string, dir:string) => {
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

const fileMap: Map<string, FileInfo>=new Map;// 文件表
const dirMap: Map<string, DirInfo>=new Map;// 目录表
