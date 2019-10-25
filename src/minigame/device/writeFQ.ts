/*
 * store模块写文件时用到的写文件队列
 */

import { readFile, writeFile, writeFileSync } from './filemanager';
import { Store } from '../feature/store';

interface DataInfo {
    data: ArrayBuffer | Uint8Array;
    path: string;
    sign: string;
}

export class WriteFileQueue {
    static create(lstore: Store): Promise<WriteFileQueue> {
        return new Promise((resolve, reject) => {
            const wfq = new WriteFileQueue();
            wfq.store = lstore;
            wfq.localSignFile = `${lstore.dbName}/${lstore.tabName}/depend`;
            wfq.initSignMap().then(() => {
                resolve(wfq);
            }).catch(reject);
        });
    }

    private store: Store;
    private localSignFile: string;

    private concurrent = 0;
    private max_concurrent = 1;
    private queue = new Map<string, DataInfo>();

    private timer: number = null;
    private delay: number = 50; // 写入一个文件后，等待该毫秒后再写入后续文件
    private writing: boolean = false; // 正在写入

    private signMap = new Map<string, string>(); // {path: sign}

    private initSignMap() {
        const p = readFile(this.localSignFile, 'utf8').then((data) => {
            const json = JSON.parse((data as string));
            Object.keys(json).forEach((k) => {
                this.signMap.set(k, json[k]);
            });
        });
        return p;
    }

    private write(path: string, data: ArrayBuffer | Uint8Array) {
        console.log("=========== Write File:", this.queue.size, path);
        localStorage.dbSize += data.byteLength;
        if (ArrayBuffer.isView(data)) {
            data = data.slice().buffer;
        }
        // 所有文件到放到 `store.dbName/store.tabName` 目录下，方便清理
        path = `${this.store.dbName}/${this.store.tabName}/${path}`;
        writeFile(path, data).then(() => {
            this.oneFileComplete();
            this.store.files.add(path);
            // TODO: 文件写入本地用户目录后
            // this.store.db[""][path] = this.signMap.get(path);
            // delete this.store.db[path];
        }).catch(() => {
            this.signMap.delete(path);
            this.oneFileComplete();
            localStorage.dbSize -= data.byteLength;
        });
    }

    private oneFileComplete() {
        this.concurrent--;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.writeNext();
        }, this.delay);
    }

    private allFilesComplete() {
        clearTimeout(this.timer);
        this.timer = null;
        this.writing = false;
        this.writeSignMap();
        console.log("write file queue is clean");
    }

    private writeNext() {
        while (this.concurrent < this.max_concurrent) {
            const { value, done } = this.queue.keys().next();
            if (done) {
                this.allFilesComplete();
                return;
            }
            const info = this.queue.get(value);
            this.queue.delete(value);
            if (info) {
                this.concurrent++;
                const { path, data, sign } = info;
                if (data.byteLength + localStorage.dbSize > Store.limitSize) {
                    return this.allFilesComplete();
                }
                this.signMap.set(path, sign);
                this.write(path, data);
            }
        }
    }

    start() {
        if (this.timer || this.writing) { return; }
        this.writing = true;
        console.log("store write start", this.queue.size);
        this.writeNext();
    }

    add(path: string, data: DataInfo) {
        this.queue.set(path, data);
    }

    addSign(key: string, sign: string) {
        this.signMap.set(key, sign);
    }

    getSign(key: string) {
        return this.signMap.get(key);
    }

    deleteSign(key: string) {
        this.signMap.delete(key);
    }

    clearSign() {
        this.signMap.clear();
    }

    writeSignMap() {
        const json = this.transformSignMap();
        writeFileSync(this.localSignFile, JSON.stringify(json));
    }

    transformSignMap() {
        const json = {};
        this.signMap.forEach((v, k) => {
            json[k] = v;
        });
        return json;
    }
}
