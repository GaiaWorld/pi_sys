/**
 * 代码加载器
*/

// ============================== 导入
import { FileLoad } from './bin_load';
import { FileInfo } from './depend';

// ============================== 导出
/**
 * 初始化参数
 */
export const init = (domainUrls: string[], downloadPath:string) => {
}

export class CodeLoad extends FileLoad {

    /**
     * @description 开始
     * @example
     */
    public start() {
        let arr = [];
        return Promise.all(arr);
    }
}
