import { Store } from "../feature/store";
import { FileSys } from "./filesys";
import { WX_DEPEND_MGR } from "./wxdepend";
import { IFileDependInfo } from "./base";

/**
 * 
 */

export interface IFileWriteInfo {
    data: ArrayBuffer | Uint8Array;
    info: IFileDependInfo;
}

/**
 * 文件写磁盘的队列
 */
export class WriteFileQueue {
    public static create(lstore: Store, wxdepend: WX_DEPEND_MGR): WriteFileQueue {
        const wfq = new WriteFileQueue();

        wfq.store       = lstore;
        wfq.wxdepend    = wxdepend;

        return wfq;
    }
    private store: Store;
    private wxdepend: WX_DEPEND_MGR;

    private concurrent = 0;
    private max_concurrent = 1;
    private queue = new Map<string, IFileWriteInfo>();

    private timer: any = null;
    private delay: number = 50; // 写入一个文件后，等待该毫秒后再写入后续文件
    private writing: boolean = false; // 正在写入

    private signMap = new Map<string, string>(); // {path: sign}

    /**
     * 下载到的文件写入到主目录
     * @param path 
     * @param data 
     */
    private write(fileInfo: IFileDependInfo, data: ArrayBuffer | Uint8Array) {
        console.log("=========== Write File:", this.queue.size, fileInfo.path);

        // 发起写入时立即修改主目录占用的空间记录 - 失败时去除 : 默认成功,这样实际失败了，但没有获得失败的响应的情况下,记录的剩余空间大小不会大于实际剩余空间大小
        // localStorage.dbSize += data.byteLength;
        this.wxdepend.updateMainSize(data.byteLength);

        if (ArrayBuffer.isView(data)) {
            data = data.slice().buffer;
        }

        // 所有文件到放到 `store.dbName/store.tabName` 目录下，方便清理
        const wxpath = this.store.formatStorePath(fileInfo.path);

        FileSys.writeFile(wxpath, data)
            .then(() => {
                this.oneFileComplete();
                
                // depend 信息在成功/失败时修改
                // this.store.files.add(wxpath);
                this.wxdepend.addMain(fileInfo);

                // TODO: 文件写入本地用户目录后
                // this.store.db[""][wxpath] = this.signMap.get(wxpath);
                // delete this.store.db[wxpath];
            })
            // 虽然发起下载时可以写入，但最终结果还是失败了
            .catch(() => {
                // depend 信息在成功/失败时修改
                // this.signMap.delete(path);
                this.wxdepend.deleteMain(fileInfo.path);

                this.oneFileComplete();
                // localStorage.dbSize -= data.byteLength;
                this.wxdepend.updateMainSize(-data.byteLength);
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
        this.wxdepend.writeDepend();
        console.log("write file queue is clean");
    }

    private writeNext() {
        while (this.concurrent < this.max_concurrent) {

            const { value, done } = this.queue.keys().next();

            if (done) {
                this.allFilesComplete();
                return;
            }

            const writeInfo = this.queue.get(value);
            this.queue.delete(value);

            if (writeInfo) {

                this.concurrent++;
                const { info: fileInfo, data } = writeInfo;
                
                if (data.byteLength + this.wxdepend.readMainSize() > Store.limitSize) {
                    console.warn(`本地空间不足`);
                    return this.allFilesComplete();
                }
                
                // this.signMap.set(path, sign);
                this.wxdepend.addMain(fileInfo);

                this.write(fileInfo, data);
            }
        }
    }
    public add(info: IFileDependInfo, data: any) {
        this.queue.set(info.path, { data, info });
    }

    public start() {
        if (this.timer || this.writing) { 
            return; 
        }

        this.writing = true;
        console.log("store write start", this.queue.size);

        this.writeNext();
    }
}