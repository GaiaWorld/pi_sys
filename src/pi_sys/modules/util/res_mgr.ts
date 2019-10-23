/**
 * 负责创建、销毁BlobURL，负责维护资源的缓存和引用计数
 * 异步加载二进制数据，同步创建BlobURL，异步加载资源（图像、字体……）
 */

// ============================== 导入
import { now } from '../lang/time';

// ============================== 导出

/**
 * @description 资源
 * @example
 */
export class Res {
    // 必须要赋初值，不然new出来的实例里面是没有这些属性的
    // 名称
    public key: string = '';
    // 引用数
    public count: number = 0;
    // 超时时间
    public timeout: number = 0;

    // 链接数据
    public link: any = null;
    // 链接数据的释放函数
    private linkDestroy: (link: any) => void = null;

    /**
     * @description 创建, 参数为源数据 可以是二进制数据，也可以是其他
     * @example
     */
    public create(link: any, linkDestroy: (link: any) => void): void {
        this.link = link;
        this.linkDestroy = linkDestroy;
    }

    /**
     * @description 使用
     * @example
     */
    public use(): void {
        ++this.count;
    }

    /**
     * @description 不使用
     * @example
     */
    public unuse(timeout: number, nowTime: number): void {
        --this.count;
        if (timeout > this.timeout) {
            this.timeout = timeout;
        }
        this.release(nowTime);
    }

    /**
     * @description 释放
     * @example
     */
    public release(nowTime: number): void {
        if (this.count > 0) {
            return;
        }
        if (nowTime < this.timeout) {
            timeoutRelease(this, nowTime, this.timeout);
        } else {
            resMap.delete(this.key);
            this.destroy();
        }
    }

    /**
     * @description 销毁
     * @example
     */
    // tslint:disable:no-empty
    public destroy(): void {
        if (this.linkDestroy) {
            let func = this.linkDestroy;
            this.linkDestroy = undefined;
            func(this.link);
        }
    }
}

/**
 * @description 资源表，用于管理一个场景下所有的资源。需要手工释放。资源表内的资源，只会在资源上增加1个引用计数，释放后减少1个引用计数。
 * @example
 */
export class ResTab {
    // 必须要赋初值，不然new出来的实例里面是没有这些属性的
    // 本地表，为空表示资源表已经被释放
    public tab: Map<string, Res> = new Map();
    // 超时时间
    public timeout: number = 0;

    /**
     * @description 获取当前资源的数量
     * @example
     */
    public size(): number {
        return this.tab ? this.tab.size : -1;
    }

    /**
     * @description 是否已释放
     */
    public isReleased(): boolean {
        return !this.tab;
    }

    /**
     * @description 获取资源
     * @example
     */
    public get(key: string): Res {
        const tab = this.tab;
        if (!tab) {
            return;
        }
        let r = tab.get(key);
        if (r) {
            return r;
        }
        r = resMap.get(key);
        if (!r) {
            return;
        }
        r.use();
        tab.set(key, r);

        return r;
    }

    /**
     * @description 创建资源
     * @example
     */
    public createRes(key: string, data: any, destroy: (link: any) => void): Res {
        let r = this.tab.get(key);
        if (r) {
            return r;
        }

        r = createResGlobal(key, data, destroy);
        r.use();
        this.tab.set(r.key, r);

        return r;
    }

    /**
     * @description 释放资源
     * @example
     */
    public delete(res: Res, timeout?: number): boolean {
        const tab = this.tab;
        if (!tab) {
            return false;
        }
        const b = tab.delete(res.key);
        if (b) {
            const time = now();
            res.unuse(time + (timeout || this.timeout), time);
        }

        return b;
    }

    /**
     * @description 清除全部资源
     * @example
     */
    public clear(): void {
        const tab = this.tab;
        if (!tab) {
            return;
        }
        const time = now();
        const timeout = time + this.timeout;
        for (const res of tab.values()) {
            res.unuse(timeout, time);
        }
        tab.clear();
    }

    /**
     * @description 释放资源表
     * @example
     */
    public release(): boolean {
        const tab = this.tab;
        if (!tab) {
            return false;
        }
        this.tab = null;
        const time = now();
        const timeout = time + this.timeout;
        for (const res of tab.values()) {
            res.unuse(timeout, time);
        }

        return true;
    }
}

/**
 * @description 获得资源主表
 * @example
 */
export const getResMap = () => {
    return resMap;
};

// ============================== 本地
// 全局资源
const resMap: Map<string, Res> = new Map();
// 定时的时间
const defalutTimeout = 1000;
// 最小释放的时间
const minReleaseTimeout = 500;
// 等待释放的资源数组
let releaseArray = [];
// 回收方法的定时器的引用
let timerRef = 0;
// 定时的时间
let timerTime = Number.MAX_SAFE_INTEGER;

const _resTab = new ResTab();
_resTab.timeout = defalutTimeout;

/**
 * @description 回收超时的资源
 * @example
 */
const collect = (): void => {
    const time = now();
    const arr = releaseArray;
    releaseArray = [];
    timerRef = 0;
    timerTime = Number.MAX_SAFE_INTEGER;
    for (const res of arr) {
        res.release(time);
    }
};

/**
 * @description 超时释放, 最小500ms
 * @example
 */
const timeoutRelease = (res: Res, nowTime: number, releaseTime: number): void => {
    releaseArray.push(res);
    if (timerTime <= releaseTime + minReleaseTimeout) {
        return;
    }
    if (timerRef) {
        clearTimeout(timerRef);
    }
    timerTime = (releaseTime > nowTime + minReleaseTimeout) ? releaseTime : nowTime + minReleaseTimeout;
    timerRef = setTimeout(collect, timerTime - nowTime);
};

/** 
 * 在全局缓冲中创建资源
 */
const createResGlobal = (key: string, link: any, destroy: (link: any) => void) => {
    let r = resMap.get(key);
    if (!r) {
        r = new Res();
        r.key = key;
        r.create(link, destroy);
        resMap.set(r.key, r);
    }
    return r;
}