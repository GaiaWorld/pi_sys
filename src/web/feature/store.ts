/**
 * 存储， 会全局管理并行写的次数，这样提高性能和读的响应性。
 * 当有写请求时， 如果并行写次数容许，则立刻写入，否则挂起等待。 写入完毕后检查挂起的存储，继续写入。
 */

// 默认的最大并行写的数量
export let parallelWriteCount = 2;

export class Store {
    public readonly dbName: string;
    public readonly tabName: string;
    tab: IDBDatabase;
    map: Map<number | string, any>;
    writeWait: Array<Entry> = [];
    writeLimitSize = 1 * 1024 * 1024;

    /**
	 * @description 判断是否支持IndexedDB
	 * @example
	 */
    static check = () => {
        return !!iDB;
    }
    /**
	 * 删除指定的数据库
	 */
    static delete = (dbName: string) : Promise<any> => {
        return new Promise((resolve, reject) => {
            let request = iDB.deleteDatabase(dbName);
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }
    /**
	 * @description 创建指定名称的存储
	 * @example
	 */
    static create = (dbName: string, tabName = "_db") : Promise<Store> => { // 返回值类型1|类型2
        return new Promise((resolve, reject) => {
            if (!iDB) {
                let s = new Store(dbName, tabName);
                s.map = new Map();
                return resolve(s);
            }
            try {
                let request = iDB.open(dbName, 1);
                request.onupgradeneeded = (e) => {
                    // 创建table
                    (<any>e.currentTarget).result.createObjectStore(tabName, {
                        autoIncrement: false
                    });
                };
                request.onsuccess = (e) => {
                    let s = new Store(dbName, tabName);
                    s.tab = (<any>e.currentTarget).result;
                    return resolve(s);
                };
                request.onerror = reject;
            } catch (e) {
                iDB = undefined;
                let s = new Store(dbName, tabName);
                s.map = new Map();
                return resolve(s);
            }
        });
    }
    constructor(dbName: string, tabName: string) {
        this.dbName = dbName;
        this.tabName = tabName;
    }

    /**
	 * @description 读取数据
	 * @example
	 */
    public read(key: number | string) : Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.map) {
                return resolve(this.map.get(key));
            }
            let request = this.tab.transaction(this.tabName, "readonly").objectStore(this.tabName).get(key);
            request.onsuccess = (e) => resolve((<any>e.target).result);
            request.onerror = reject;
        });
    }
    /**
	 * @description 写入数据，如果键名存在则替换
	 * @example
	 */
    public write(key: number | string, data: Uint8Array) : Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.map) {
                this.map.set(key, data);
                return resolve();
            }
            if(curWriteCount < parallelWriteCount) {
                curWriteCount++;
                let tx = this.tab.transaction(this.tabName, "readwrite");
                tx.objectStore(this.tabName).put(data, key);
                tx.oncomplete = () => {
                    resolve();
                    writeNext();
                };
                tx.onerror = (err) => {
                    reject(err);
                    writeNext();
                };
            }else if(this.writeWait.length > 0) {
                let cur = this.writeWait[this.writeWait.length - 1];
                if(cur.size + data.byteLength > this.writeLimitSize) {
                    cur = new Entry();
                    this.writeWait.push(cur);
                }
                cur.push(key, data, resolve, reject);
            }else{
                let cur = new Entry();
                this.writeWait.push(cur);
                cur.push(key, data, resolve, reject);
                storeWait.push(this);
            }
        });
    }
    /**
	 * @description 删除数据
	 * @example
	 */
    public delete(key: number | string) : Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.map) {
                this.map.delete(key);
                return resolve();
            }
            let tx = this.tab.transaction(this.tabName, "readwrite");
            tx.objectStore(this.tabName).delete(key);
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    }
    /**
	 * @description 清除存储
	 * @example
	 */
    public clear() : Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.map) {
                this.map.clear();
                return resolve();
            }
            let tx = this.tab.transaction(this.tabName, "readwrite");
            tx.objectStore(this.tabName).clear();
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    }
    /**
	 * @description 迭代, callback返回false表示停止迭代
	 * @example
	 */
    public iterate(callback: (result: {key: any, value: any}) => boolean, errorCallback: (err: Event) => void) {
        if (!iDB) {
            return setTimeout(() => {
                for (let [key, value] of this.map) {
                    if (callback({key, value}) === false) {
                        return;
                    }
                }
                callback(null);
            }, 0);
        }
        let cursor = this.tab.transaction(this.tabName, "readonly").objectStore(this.tabName).openCursor();
        cursor.onsuccess = () => {
            let r = cursor.result;
            if (r) {
                if (callback(r) === false) {
                    return;
                }
                r.continue();
            } else {
                callback(null);
            }
        };
        cursor.onerror = errorCallback;
    }
    // 继续写， 返回是否写完毕
    writeNext(): boolean {
        let cur = this.writeWait.shift();
        let tx = this.tab.transaction(this.tabName, "readwrite");
        for(let r of cur.arr) {
            tx.objectStore(this.tabName).put(r.data, r.key);
        }
        tx.oncomplete = () => {
            for(let r of cur.arr) {
                r.resolve();
            }
            writeNext();
        };
        tx.onerror = (err) => {
            for(let r of cur.arr) {
                r.reject(err);
            }
            writeNext();
        };
        return this.writeWait.length === 0;
    }
}

class Entry {
    arr: Array<{key: number|string, data: Uint8Array, resolve: (value?:any) => void, reject: (reason?: any) => void}> = [];
    size = 0;

    push(key: number|string, data: Uint8Array, resolve: (value?:any) => void, reject: (reason?: any) => void) {
        this.arr.push({key, data, resolve, reject});
        this.size += data.byteLength;
    }
}
// 当前并行写的数量
let curWriteCount = 0;
// 存储器等待数组
let storeWait: Array<Store> = [];

const writeNext = () => {
    let len = storeWait.length;
    if(len === 0) {
        curWriteCount--;
        return;
    }
    let i = 0;
    if(len > 1) {
        i = Math.floor(Math.random() * (len + 1.0));
    }
    if(storeWait[i].writeNext()) {
        storeWait[i] = storeWait[len - 1];
        storeWait.length = len - 1;
    }
}
// ============================== 立即执行
let iDB = self.indexedDB; // || self.webkitIndexedDB || self.mozIndexedDB || self.msIndexedDB;
