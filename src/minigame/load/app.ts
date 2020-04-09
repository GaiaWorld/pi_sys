/*
 * xiaoyouxi 应用加载模块
 * 根据使用的不同将文件分为4类。
 *  代码code, 配置(必须同步使用)cfg, 对象资源(异步使用，对象形式)obj, 资源(异步使用，二进制数据形式)res
 * 可以设置代码加载器。 比如web版的release版将代码设置为配置，使用配置处理函数来加载代码。而微信小游戏，可能是分包下载。
 * 可以设置对象资源加载器。比如web版没有对象类型。而微信小游戏，使用download将对象资源下载到临时目录，并维护对应的depend。
 * 可以设置配置的处理函数表，并且记录每个配置文件的处理状态（下载中、加载中、处理中，处理完）。
 * 可以设置资源的下载缓冲时间和大小LRU，下载缓存的目标仅是为了下载后不用重新加载。
 */
// ============================== 导入
import { Download, LocalLoad, FileLoad, getSign, ResultFunc } from './bin';
import { IFileDependInfo } from "../device/base";
import { fileSuffix, DirInfo, getFile, getDir, filePseudoSuffix } from "../setup/depend";
import { cc, log, pattern, error } from "../feature/log";
import { CodeLoad } from './code';
import { ObjLoad } from './object';

// ============================== 导出
export enum SuffixType {
    CODE = 1,
    CFG,
    OBJ,
    RES,
}

// 设置2类文件的后缀类型。 代码code, 对象资源(异步使用，对象形式)obj。
export const setCodeObjSuffix = (code: string[], obj: string[]) => {
    for (let s of code) {
        suffixMap.set(s, SuffixType.CODE);
    }
    for (let s of obj) {
        suffixMap.set(s, SuffixType.OBJ);
    }
};

// 设置配置的后缀类型及处理函数， 如果处理函数为null, 表示将配置的二进制数据临时存放。 如果已经有临时存放的配置，则会立即进行处理
export let setCfgHandler = (
    suffix: string,
    handler: (file: string, data: Uint8Array) => Promise<void>): Promise<any> => {
    suffixMap.set(suffix, SuffixType.CFG);
    handlerMap.set(suffix, handler);
    if (!handler)
		return Promise.resolve();
	let arr = [];
    for (let [k, v] of cfgTempMap) {
		let s = filePseudoSuffix(k);
		while(s){
			if (s === suffix) {
				break;
			}
			s = filePseudoSuffix(s);
		}
		if (!s) {
			continue;
		}
        // 如果handler返回false， 表示handler未处理该文件
        cfgFinish(k, v, handler).then((r) => {
            if(r !== false) {
                cfgTempMap.delete(k);
            }
        });
	}
	return Promise.all(arr);
};
// 设置的后缀类型及缓存时间和大小
export const setResLru = (suffix: string, timeout: number, cacheSize: number) => {
    suffixMap.set(suffix, SuffixType.RES);
    resMap.set(suffix, new Lru(timeout, cacheSize));
};

// 整理资源
export const collect = (time: number) => {
    let exit = true;
    for (let v of resMap.values()) {
        v.collect_time(time);
        v.collect_size();
        exit = exit && v.size === 0;
    }
    return exit;
};

/**
 * @description 加载指定文件或目录(以/结尾)及子目录下的所有代码、配置、资源和对象。
 * 异步返回成功或失败。加载器上可以设置进度监听。
 * 次序是按照目录逐层加载，目录按序深度遍历加载
 * @example
 */
export class BatchLoad extends FileLoad {
    public dirOrFiles: string[];
    public fileFilters: RegExp[][] = [[], []]; // 第0位为匹配路径， 第1位为排除匹配
    public dirFilters: RegExp[][] = [[], []]; // 第0位为匹配路径， 第1位为排除匹配
    public loads: Set<FileLoad> = new Set();

    /**
     * @description 加载指定文件或目录(以/结尾)及子目录下的所有代码、配置、资源和对象
     */
    public constructor(dirOrFiles: string[]) {
        super();
        this.dirOrFiles = dirOrFiles;

    }
    /**
     * @description 添加文件和目录的模式匹配。支持**, *。
     * 如果开头为!，表示为排除的模式匹配
     * 如果最后结尾为/，表示为目录的模式匹配
     * @example
     */
    public addFilter(s: string) {
        let filters = s.charAt(s.length - 1) === '/' ? this.dirFilters : this.fileFilters;
        let arr = filters[0];
        if (s.charAt(0) === '!') {
            arr = filters[1];
            s = s.slice(1);
        }
        arr.push(pattern(s));
    }
    /**
     * @description 加载, 是否对象资源及资源仅下载（如果已经在本地，则不加载）
     */
    public start() {
        return this.load();
    }
    /**
     * @description 加载, 是否对象资源及资源仅下载（如果已经在本地，则不加载）
     */
    public load(onlyDown = true) {
        let binload = new LocalLoad();
        let download = new Download();
        let codeload = new CodeLoad();
        let objload = new ObjLoad();
        let arr = [];
        for (let s of this.dirOrFiles) {
            if (s.charAt(s.length - 1) === '/') {
                this.loadDir(s, getDir(s), onlyDown, binload, download, codeload, objload, arr);
            } else {
                let info = getFile(s);
                if (info) {
                    this.loadFile(info, onlyDown, binload, download, codeload, objload, arr);
                }
                else {
                    cc.warn() && log("batchload, invalid file, ", s);
                }
            }
        }
        if (binload.files.size) {
            let p = binload.start();
            arr.push(waitLoad(binload, localLoad, p.then(handleBinMap)));
            this.addLoad(binload);
        }
        if (download.files.size) {
            let p = download.start();
            arr.push(waitLoad(download, downLoad, p.then(handleBinMap)));
            this.addLoad(download);
        }
        if (codeload.files.size) {
            let p = codeload.start();
            arr.push(waitLoad(codeload, codeLoad, p));
            this.addLoad(codeload);
        }
        if (objload.files.size) {
            let p = objload.start();
            arr.push(waitLoad(objload, objLoad, p));
            this.addLoad(objload);
        }
        return Promise.all(arr).then(
            (value: any) => this.onResult(value)
        ).catch(
            (reason: any) => () => {
                cc.error() && error(reason);
                this.onResult(null, reason);
            }
        );
    }
    public loadDir(
        path: string,
        dir: DirInfo,
        onlyDown: boolean,
        binload: LocalLoad,
        download: Download,
        codeload: CodeLoad,
        objload: ObjLoad,
        result: Promise<any>[]) {
        if (!dir) {
            return;
        }
        let s = dir.path.slice(path.length); // 要用从该目录起的相对路径
        for (let r of this.dirFilters[0]) {
            if (!r.test(s)) {
                return;
            }
        }
        for (let r of this.dirFilters[1]) {
            if (r.test(s)) {
                return;
            }
        }
        if (dir.files) {
            for (let f of dir.files) {
                s = f.path.slice(path.length);
                if (filter(s, this.fileFilters[0], this.fileFilters[1])) {
                    this.loadFile(f, onlyDown, binload, download, codeload, objload, result);
                }
            }
        }
        if (dir.children) {
            for (let d of dir.children) {
                this.loadDir(path, d, onlyDown, binload, download, codeload, objload, result);
            }
        }
    }
    public loadFile(
        file: IFileDependInfo,
        onlyDown: boolean,
        binload: LocalLoad,
        download: Download,
        codeload: CodeLoad,
        objload: ObjLoad,
        result: Promise<any>[]) {
        // 文件长度为0，跳过
        if (!file.size) {
            return;
        }
        let suffix = fileSuffix(file.path);
        let st = suffixMap.get(suffix);
        if (!st) {
            return cc.warn() && log("batch load, invalid suffix, file:" + file.path);
        }
        if (st === SuffixType.RES || st === SuffixType.OBJ) {
            // 如果Lru中有，则跳过
            let lru = resMap.get(suffix);
            if (lru && lru.map.get(file.path)) {
                return;
            }
            this.downOrload(file, onlyDown, binload, download, result);
        // } else if (st === SuffixType.OBJ) {
        //     if ((file.sign !== getSign(file.path) || !onlyDown) && this.checkLoad(file, objLoad, result)) {
        //         objload.add(file);
        //     }
        } else if (st === SuffixType.CFG) {
            // 先检查是否在cfgMap
            let rr = cfgMap.get(file.path);
            if (rr) {
                result.push(new Promise((resolve, reject) => {
                    rr.push((val: any, err?: any) => {
                        err ? reject(err) : resolve(val);
                    });
                }));
                return;
            } else if (rr === null) {// 忽略已经处理过的配置
                return;
            }
            // 是否在cfgTempMap
            let rd = cfgTempMap.get(file.path);
            if (rd) {
                return;
            }
            this.downOrload(file, onlyDown, binload, download, result);
        } else {
            // if (this.checkLoad(file, codeLoad, result)) {
            //     codeload.add(file);
            // }
        }
    }
    // 下载或加载
    public downOrload(
        file: IFileDependInfo,
        onlyDown: boolean,
        binload: LocalLoad,
        download: Download,
        result: Promise<any>[]) {
        if (file.sign === getSign(file.path)) {
            if ((!onlyDown) && this.checkLoad(file, localLoad, result)) {
                binload.add(file);
            }
        } else {
            if (this.checkLoad(file, downLoad, result)) {
                download.add(file);
            }
        }
    }
    // 检查是否正在加载
    public checkLoad(file: IFileDependInfo, set: Set<FileLoad>, result: Promise<any>[]) {
        for (let load of set) {
            if (load.files.has(file.path)) { // 文件正在加载
                if (!this.loads.has(load)) {
                    result.push(new Promise((resolve, reject) => {
                        load.addResult((val: any, err?: any) => {
                            err ? reject(err) : resolve(val);
                        });
                    }));
                    this.addLoad(load);
                }
                return false;
            }
        }
        return true;
    }
    // 在下载器上添加进度通知
    public addLoad(load: FileLoad) {
        load.addProcess(this.processValue.bind(this));
        this.loads.add(load);
        this.total += load.total;
        this.loaded += load.loaded;
    }
    // 获得子加载器的进度通知，并计算当前进度，抛出进度事件
    public processValue(url: string, type: string, total: number, loaded: number, data?: Uint8Array) {
        this.loaded = 0;
        for (let load of this.loads) {
            this.loaded += load.loaded;
        }
        this.onProcess(url, type, this.total, this.loaded);
        if (type === "fileLocalLoad") { // 提前解析配置
            let suffix = fileSuffix(url);
            let st = suffixMap.get(suffix);
            if (st === SuffixType.CFG) {
                handleCfg(url, data, suffix);
            }
        }
    }
}

/**
 * @description 单资源或资源对象的加载, 没有进度通知。 如果是单资源下载，会进行下载合并.
 * @example
 */
export const loadRes = (file: IFileDependInfo, objInstance?: any) => {
    let suffix = fileSuffix(file.path);
    let st = suffixMap.get(suffix);
    if (!st) {
        cc.warn() && log("load, invalid suffix, file:" + file);
        return Promise.reject("load, invalid suffix, file:" + file);
    }
    if (st === SuffixType.RES) {
        // 如果Lru中有，则从lru中删除，然后直接返回
        let lru = resMap.get(suffix);
        let r = lru.remove(file.path);
        if (r) {
            return Promise.resolve(r);
        }
        if (file.sign === getSign(file.path)) {// 如果是本地加载
            let pr = checkWaitLoad(file, localLoad);
            if (pr) {
                return pr;
            }
            let load = new LocalLoad();
            load.add(file);
            let p = load.start();
            return waitLoad(load, localLoad, p).then((map: Map<string, any>) => map.values().next().value);
        } else {
            let pr = checkWaitLoad(file, downLoad);
            if (pr) {
                return pr;
            }
            if (!downWait) {
                downWait = new Download();
            }
            downWait.add(file);
            if (downWait.files.size === 1) {
                setTimeout(() => { // 合并下载
                    let p = downWait.start();
                    waitLoad(downWait, downLoad, p); // 这里并不需要缓存到lru
                    downWait = null;
                }, DownWaitTime);
            }
            return new Promise((resolve, reject) => {
                downWait.addResult((map: Map<string, Uint8Array>, err?: any) => {
                    err ? reject(err) : resolve(map.get(file.path));
                });
            });
        }
    } else if (st === SuffixType.OBJ) {
        let pr = checkWaitLoad(file, objLoad);
        if (pr) {
            return pr;
        }
        let load = new ObjLoad();
        load.add({...file, obj: objInstance});
        let p = load.start();
        return waitLoad(load, objLoad, p).then((map: Map<string, any>) => map.values().next().value);
    }
};

/**
 * @description 获得正在下载的数量
 * @example
 */
export const downingCount = () => {
    return downLoad.size;
};
/**
 * @description 获得正在加载的数量
 * @example
 */
export const loadingCount = () => {
    return localLoad.size;
};
/**
 * @description 获得正在加载的代码数量
 * @example
 */
export const codeingCount = () => {
    return codeLoad.size;
};
/**
 * @description 获得正在加载的对象数量
 * @example
 */
export const objingCount = () => {
    return objLoad.size;
};

// ============================== 本地
// 后缀类型表, 没有设置的都认为资源(异步使用，二进制数据形式)res
const suffixMap: Map<string, SuffixType> = new Map();
// 配置处理表
const handlerMap: Map<string, (file: string, data: Uint8Array) => Promise<void>> = new Map();
// 每配置状态表， 如果ResultFunc有值，表示正在处理。为null，表示已处理完毕
const cfgMap: Map<string, ResultFunc[]> = new Map();
// 每配置的临时表
const cfgTempMap: Map<string, Uint8Array> = new Map();
// 资源缓存表
const resMap: Map<string, Lru> = new Map();
// 资源缓存表当前是否真正整理
let timerStart = false;

// 正在运行的代码加载器
const codeLoad: Set<CodeLoad> = new Set();
// 正在运行的对象资源加载器
const objLoad: Set<ObjLoad> = new Set();
// 正在运行的加载器
const localLoad: Set<LocalLoad> = new Set();
// 正在运行的下载器
const downLoad: Set<Download> = new Set();

// 批下载资源文件的等待时间
const DownWaitTime: number = 34;

// 批下载器
let downWait: Download;

class Lru {
    public map: Map<string, { time: number, data: Uint8Array }> = new Map();
    public timeout: number;
    public limit: number;
    public size = 0;
    constructor(timeout: number, limit: number) {
        this.timeout = timeout;
        this.limit = limit;
    }
    public add(file: string, data: Uint8Array) {
        this.map.set(file, { time: Date.now() + this.timeout, data: data });
        this.size += data.byteLength;
        startCollectTimer();
    }
    public remove(file: string) {
        let r = this.map.get(file);
        if (!r) {
            return;
        }
        this.size -= r.data.byteLength;
        return r.data;
    }
    public collect_time(time: number) {
        for (let [k, v] of this.map) {
            if (v.time < time) {
                break;
            }
            this.map.delete(k);
            this.size -= v.data.byteLength;
        }
    }
    public collect_size() {
        if (this.size < this.limit) {
            return;
        }
        for (let [k, v] of this.map) {
            this.map.delete(k);
            this.size -= v.data.byteLength;
            if (this.size < this.limit) {
                return;
            }
        }
    }
}
// 启动整理定时器
const startCollectTimer = () => {
    if (timerStart) {
        return;
    }
    timerStart = true;
    collectTimer();
};
// 启动整理定时器
const collectTimer = () => {
    if (collect(Date.now())) {
        timerStart = false;
    } else {
        setTimeout(collectTimer, 100);
    }
};

// 判断文件是否匹配
const filter = (path: string, within: RegExp[], without: RegExp[]) => {
    for (const r of within) {
        r.lastIndex = 0;
        if (!r.test(path)) {
            return false;
        }
    }
    for (const r of without) {
        r.lastIndex = 0;
        if (r.test(path)) {
            return false;
        }
    }
    return true;
};

// 等待加载
const waitLoad = (load: FileLoad, set: Set<any>, p: Promise<any>) => {
    set.add(load);
    // p.finally(()=>set.delete(load))
    return p.then((r) => {
        set.delete(load);
        return r;
    }).catch((e) => {
        console.error(e);
        return set.delete(load);
    });
};

// 检查等待加载
const checkWaitLoad = (file: IFileDependInfo, set: Set<FileLoad>) => {
    for (const load of set) {
        if (load.files.has(file.path)) { // 文件正在加载
            return new Promise((resolve, reject) => {
                load.addResult((val: any, err?: any) => {
                    err ? reject(err) : resolve(val.values().next().value);
                });
            });
        }
    }
};

// 二进制文件表的后处理
const handleBinMap = (map: Map<string, Uint8Array>) => {
    let arr = [];
    for (let [k, v] of map) {
        let suffix = filePseudoSuffix(k);
        let st = suffixMap.get(suffix);
        if (st === SuffixType.CFG) {
            arr.push(handleCfg(k, v, suffix));
        } else if (st === SuffixType.RES) {
            const lru = resMap.get(suffix);
            lru.add(k, v);
        }
    }
    return Promise.all(arr);
};
// 二进制文件的后处理
const handleCfg = (file: string, data: Uint8Array, suffix: string) => {
    let arr = cfgMap.get(file);
    if (!arr) {
        arr = [];
        cfgMap.set(file, arr);
    }
    if (arr.length === 0) {
        const h = handlerMap.get(suffix);
        if (h === null) {
            cfgTempMap.set(file, data);
            return Promise.resolve();
        }
        cfgFinish(file, data, h);
    }
    return new Promise((resolve, reject) => {
        arr.push((val: any, err?: any) => {
            err ? reject(err) : resolve();
        });
    });
};
const cfgFinish = (file: string, data: Uint8Array, h: (file: string, data: Uint8Array) => Promise<any>): Promise<any> => {
    return h(file, data).then((r) => {
        if( r !==  false ) {
            const arr = cfgMap.get(file);
            if (!arr) {
                return;
            }
            cfgMap.set(file, null);
            for (const f of arr) {
                f(null);
            } 
        }

        return r;
    });
};
// ============================== 立即执行
