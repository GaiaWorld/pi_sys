/*
 * 应用加载模块
 * 根据使用的不同将文件分为4类。 
 *  代码code, 配置(必须同步使用)cfg, 对象资源(异步使用，对象形式)obj, 资源(异步使用，二进制数据形式)res
 * 可以设置代码加载器。 比如web版的release版将代码设置为配置，使用配置处理函数来加载代码。而微信小游戏，可能是分包下载。
 * 可以设置对象资源加载器。比如web版没有对象类型。而微信小游戏，使用download将对象资源下载到临时目录，并维护对应的depend。
 * 可以设置配置的处理函数表，并且记录每个配置文件的处理状态（下载中、加载中、处理中，处理完）。
 * 可以设置资源的下载缓冲时间和大小LRU，下载缓存的目标仅是为了下载后不用重新加载。
 */
// ============================== 导入
import { Download, LocalLoad, FileLoad, getSign, ResultFunc } from './bin_load';
import {FileInfo, fileSuffix, DirInfo, getDir, getFile} from "./depend";
import {cc, log, pattern} from "./log";
import { CodeLoad } from './code_load';
import { ObjLoad } from './obj_load';

// ============================== 导出
export enum SuffixType{
    CODE,
    CFG,
    OBJ,
    RES,
}

// 设置2类文件的后缀类型。 代码code, 对象资源(异步使用，对象形式)obj。
export const setCodeObjSuffix = (code: string[], obj: string[]) => {
}

// 设置配置的后缀类型及处理函数， 如果处理函数为null, 表示将配置的二进制数据临时存放。 如果已经有临时存放的配置，则会立即进行处理
export let setCfgHandler = (
    suffix: string,
    handler: (file: string, data: Uint8Array) => Promise<void>) => {
}
// 设置的后缀类型及缓存时间和大小
export const setResLru = (suffix: string, timeout: number, cacheSize: number) => {
}

// 整理资源
export const collect = (time: number) => {
}

/**
 * @description 加载指定文件或目录(以/结尾)及子目录下的所有代码、配置、资源和对象。
 * 异步返回成功或失败。加载器上可以设置进度监听。
 * 次序是按照目录逐层加载，目录按序深度遍历加载
 * @example
 */
export class BatchLoad extends FileLoad {
    dirOrFiles: string[];
    fileFilters: RegExp[][] = [[], []]; // 第0位为匹配路径， 第1位为排除匹配
    dirFilters: RegExp[][] = [[], []]; // 第0位为匹配路径， 第1位为排除匹配
    loads: Set<FileLoad> = new Set;

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
    }
    /**
     * @description 加载, 是否对象资源及资源仅下载（如果已经在本地，则不加载）
     */
    public start() {
        return this.load(false);
    }
    /**
     * @description 加载, 是否对象资源及资源仅下载（如果已经在本地，则不加载）
     */
    public load(down: boolean) {
        return Promise.resolve()
    }
}

/**
 * @description 单资源或资源对象的加载, 没有进度通知。 如果是单资源下载，会进行下载合并.
 * @example
 */
export const loadRes = (file: FileInfo) => {
    return Promise.resolve()
}

/**
 * @description 获得正在下载的数量
 * @example
 */
export const downingCount = () => { 
    return downLoad.size
};
/**
 * @description 获得正在加载的数量
 * @example
 */
export const loadingCount = () => { 
    return localLoad.size
};
/**
 * @description 获得正在加载的代码数量
 * @example
 */
export const codeingCount = () => {
    return codeLoad.size
};
/**
 * @description 获得正在加载的对象数量
 * @example
 */
export const objingCount = () => { 
    return objLoad.size
};

// ============================== 本地
// 正在运行的代码加载器
const codeLoad: Set<CodeLoad> = new Set;
// 正在运行的对象资源加载器
const objLoad: Set<ObjLoad> = new Set;
// 正在运行的加载器
const localLoad: Set<LocalLoad> = new Set;
// 正在运行的下载器
const downLoad: Set<Download> = new Set;

// ============================== 立即执行
