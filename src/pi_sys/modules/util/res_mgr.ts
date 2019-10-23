/**
 * 通用的资源管理，二级缓冲。
 * 
 * 1、注册，以 Texture 为例，前提：image已经注册到res去了。
 * 
 *   register("texture", (resTab, name, type, path, config) => {
 *          return resTab.load("image", name, [path, config]).then(imageRes => {
 *              // 在这里调用创建纹理的实现
 *              let texture = createTexture(imageRes.link);
 *              
 *              // 注：如果不缓存图片，这里应该直接调用unuse
 *              imageRes.unuse();
 *             
 *              return Promise.resolve(texture);
 *           });
 *    }, (texture) => {
 *       // 在这里释放纹理，texture就是上面加载函数创建的纹理
 *       destroyTexture(texture);
 *    });
 * 
 * 2、加载，以纹理为例：
 *    
 *    resTab.load("texture", name, [path, config]).then(textureRes => {
 *       // 纹理就是 textureRes.link
 *    });
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
    // 超时时间
    public timeout: number = 0;
    // 链接数据
    public link: any = null;

    // 名
    private name: string = '';
    // 类型
    private type: string = '';
    // 引用数
    private count: number = 0;

    // 键
    private _key: string = '';
    public get key() {
        if (!this._key) {
            this._key = genKey(this.type, this.name);
        }
        return this._key;
    }

    public create(name: string, type: string, link: any) {
        if (!typeMap.has(type)) {
            throw new Error("res create failed, type isn't registered, type = " + type);
        }

        this.name = name;
        this.type = type;
        this.link = link;
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
        let func = typeMap.get(this.type);
        if (func && this.link) {
            func.destroy(this.link);
            this.link = undefined;
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
     * 加载资源
     */
    load(name: string, type: string, loadArgs: any[]): Promise<Res> {

        let key = genKey(type, name);

        let r = this.get(key);
        if (r) {
            return Promise.resolve(r);
        }

        let p = waitMap.get(key);
        if (p) {
            return p;
        }

        let func = typeMap.get(type);
        if (!func) {
            throw new Error("res_mgr load failed, type isn't registered, type = " + type);
        }

        p = func.load(this, name, type, ...loadArgs).then((link) => {
            this.createRes(name, type, link);
            waitMap.delete(key);
        }).catch((err) => {
            waitMap.delete(key);
            return Promise.reject(err);
        });

        waitMap.set(key, p);
        return p;
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

    private createRes(name: string, type: string, link: any): Res {
        let r = new Res();
        r.create(name, type, link);
        resMap.set(r.key, r);

        r.use();
        this.tab.set(r.key, r);

        return r;
    }

}

/** 
 * 注册：类型名，以及该类型的加载函数，还有销毁函数
 * @param load 加载函数，返回Promise<link>，通过返回值，可以取到 将要 放到res.link的数据
 * @param destroy 销毁函数，用于销毁res.link
 */
export const register = (type: string, load: (tab: ResTab, name: string, type: string, ...args: any[]) => Promise<any>, destroy: (link: any) => void) => {
    if (typeMap.has(type)) {
        throw new Error("res_mgr register failed, type has registered, type = " + type);
    }
    typeMap.set(type, {
        load,
        destroy
    })
}

/**
 * @description 获得资源主表
 * @example
 */
export const getResMap = () => {
    return resMap;
};

// ============================== 本地
// 类型表
const typeMap: Map<string, { load: (...args: any[]) => Promise<any>, destroy: (link: any) => void }> = new Map();
// 等待加载表
const waitMap: Map<string, Promise<any>> = new Map();
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

const genKey = (type: string, name: string) => {
    return `${type}:${name}}`;
}