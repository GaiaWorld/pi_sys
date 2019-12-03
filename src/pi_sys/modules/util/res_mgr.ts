/**
 * 通用的资源管理，二级缓冲。
 *
 * 1、注册，以 Texture 为例，前提：image已经注册到res去了。
 *
 *   register("texture", (resTab, type, name, path, imageConfig) => {
 *          // load的最后一个参数，代表需不需要为该资源添加引用计数
 *          // 如果是外部人员使用，默认是true；
 *          // 这里用于图片仅仅是加载纹理的中间对象，不要缓冲，传false
 *          return resTab.load("image", name, [path, imageConfig], false).then(imageRes => {
 *              // 在这里调用创建纹理的实现
 *              let texture = createTexture(imageRes.link);
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
    // 注意：该引用代表的语义是：有几个ResTab在引用它。
    private _count = 0;
    public get count() {
        return this._count;
    }

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

        if (resMap.get(genKey(type, name))) {
            console.error(`resMap 中已创建了目标Res.此处再次创建`);
        }

        this.name = name;
        this.type = type;
        this.link = link;
    }

    /**
     * @description 使用，引用计数加1
     * 注意：只有ResTab能调用该函数
     * 注意：每个ResTab最多只能调用一次use
     */
    public use(): void {
        this._count = this._count + 1;
        // console.warn(`${this.key} use ${this._count}`);
    }

    /**
     * @description 不使用，引用计数减1
     * 注意：只有ResTab能调用该函数
     */
    public unuse(timeout: number, nowTime: number): void {
        this._count = this._count - 1;
        // console.warn(`${this.key} unuse ${this._count}`);
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
        if (this._count > 0) {
            return;
        }
        if (nowTime < this.timeout) {
            // console.warn(`${this.key} release ${this._count}`);
            timeoutRelease(this, nowTime, this.timeout);
        } else {
            // console.warn(`${this.key} destroy ${this._count}`);
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
     * 加载资源
     * loadArgs 加载函数的参数，调用的时候会展开
     * hasTabRes 该Res是否需要放到tab中，默认true；但是如果是注册一种资源的时候，需要加载的中间资源，可以是false
     *    比如：注册加载纹理的load函数，使用的图片，就是中间资源，可以不放在res中，填false
     */
    public load(type: string, name: string, loadArgs: any[], hasTabRes = true): Promise<Res> {

        let key = genKey(type, name);

        // 取到就返回，内部做了引用+1了
        let res = this.get(key, hasTabRes);
        if (res) {
            return Promise.resolve(res);
        }

        // 等待的Promise
        let wait = waitMap.get(key);
        if (!wait) {
            // 取对应类型的加载函数
            let func = typeMap.get(type);
            if (!func) {
                throw new Error("res_mgr load failed, type isn't registered, type = " + type);
            }

            // 等待
            wait = func.load(this, type, name, ...loadArgs).then((link) => {
                // 加载完成，创建res，并从等待移除
                waitMap.delete(key);
                return this.createRes(name, type, link);
            }).catch((err) => {
                // 加载失败，从等待移除，从新抛出错误。
                // 注：暂时不能用Promise.finally，因为需要浏览器版本比较新，Chrome 63
                waitMap.delete(key);
                return Promise.reject(err);
            });

            // 将Promise设置到等待列表
            waitMap.set(key, wait);
        }

        // 基于wait处理tab的信息
        let p = wait.then((res) => {
            // 异步回来的时候，可能tab已经被release
            if (!this.tab) {
                return Promise.reject(new Error("res_mgr load failed, resTab has released"));
            }

            if (hasTabRes) {
                this.addRes(key, res);
            } else if (res.count === 0) {
                // 如果当前的res不被任何tab引用，则开始释放流程
                const t = now();
                timeoutRelease(res, t, t + defalutTimeout);
            }
            return res;
        });

        return p;
	}
	
	/**
     * @description 获取资源
     * @example
     */
    public get(key: string, hasTabRes: boolean): Res {
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

        if (hasTabRes) {
            this.addRes(key, r);
        }
        return r;
    }

    /**
     * @description 释放资源
     * @example
     */
    public delete(res: Res, timeout?: number): boolean {
        const tab = this.tab;
        if (!tab || !res) { // TODO 可以不判断res是否存在， 临时解决pibabylon的资源释放问题
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

    /**
     * 当表中没有对应的res的时候，才会将引用计数+1
     * 记得：每个res的引用数，意味着它被多少个resTab握住。
     */
    private addRes(key: string, res: Res) {
        if (!this.tab.has(key)) {
            res.use();
            this.tab.set(key, res);
        }
    }

    private createRes(name: string, type: string, link: any): Res {
        let r = new Res();
        r.create(name, type, link);
        resMap.set(r.key, r);
        return r;
    }
}

/**
 * 注册：类型名，以及该类型的加载函数，还有销毁函数
 * @param load 加载函数，返回Promise<link>，通过返回值，可以取到 将要 放到res.link的数据
 * @param destroy 销毁函数，用于销毁res.link
 */
export const register = (type: string, load: (tab: ResTab, type: string, name: string, ...args: any[]) => Promise<any>, destroy: (link: any) => void) => {
    if (typeMap.has(type)) {
        throw new Error("res_mgr register failed, type has registered, type = " + type);
    }
    typeMap.set(type, {
        load,
        destroy
    });
};

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
const waitMap: Map<string, Promise<Res>> = new Map();
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
        // res.release(time);
        const res_ = resMap.get(res.key);
        if (res !== res_) {
            console.warn(`即将销毁的 res 与 当前缓存的 res 不一致 ${res.key}`);
        }
        res.release(time);
    }
};

/**
 * @description 超时释放, 最小500ms
 * @example
 */
const timeoutRelease = (res: Res, nowTime: number, releaseTime: number): void => {
    if (releaseArray.indexOf(res) >= 0) {
        console.warn(`release again`);
    } else {
        releaseArray.push(res);
    }
    if (timerTime <= releaseTime + minReleaseTimeout) {
        return;
    }
    if (timerRef) {
        clearTimeout(timerRef);
    }
    timerTime = (releaseTime > (nowTime + minReleaseTimeout)) ? releaseTime : nowTime + minReleaseTimeout;
    timerRef = setTimeout(collect, timerTime - nowTime);
};

const genKey = (type: string, name: string) => {
    return `${type}:${name}`;
};