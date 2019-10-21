/**
 * 资源对象加载器， 图片、声音、视频, 字体
*/
declare class FontFace {
    constructor(name: string, url: string);
    load(): Promise<any>;
}
// ============================== 导入
import { FileLoad } from './bin';

// ============================== 导出
/**
 * 初始化参数
 */
export const init = (domainUrls: string[], downloadPath:string) => {
}

export class ObjLoad extends FileLoad {

    /**
     * @description 开始
     * @example
     */
    public start() {
        let map = new Map;
        let arr = [];
        return Promise.all(arr).then(() => {return map});
    }

}

// ============================== 立即执行

