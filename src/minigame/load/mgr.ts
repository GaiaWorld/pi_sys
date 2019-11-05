import { Store } from "../feature/store";
import { WX_DEPEND_MGR } from "../device/wxdepend";
import { WriteFileQueue } from "../device/write_file_queue";
import { init } from "./bin";

/**
 * 
 */

export class LoadMgr {
    public static localStore: Store;
    public static wxdepend: WX_DEPEND_MGR;
    public static projectName: string;
    public static init(projectName: string, domainUrls: string[], downloadPath:string, urllimitLength = 1024 - 100, reqSizeLimit = 8 * 1024 * 1024) {
        this.projectName    = projectName;
        this.localStore     = Store.create(projectName, '');
        this.wxdepend       = new WX_DEPEND_MGR(this.formatMainPath('depend'), this.formatMainPath('depend_temp'));

        this.localStore.wxdepend = this.wxdepend;
        this.localStore.writeFileQueue = WriteFileQueue.create(this.localStore, this.wxdepend);

        /**
         * 微信本地depend初始化
         * Store 初始化
         */
        const p = new Promise((resolve, rejects) => {
            this.wxdepend.readDependFile()
                .then(() => {
                    init(this.localStore, domainUrls, downloadPath, urllimitLength, reqSizeLimit)
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        rejects(`Store 初始化失败 ${err}`);
                    });
                })
                .catch((err) => {
                    rejects(`微信本地depend初始化失败 ${err}`);
                });
        });

        return p;
    }
    /**
     * 获得文件完整的微信环境存放路径
     * @param path 项目路径
     */
    public static formatMainPath(path: string) {
        return `${this.projectName}/${path}`;
    }
}