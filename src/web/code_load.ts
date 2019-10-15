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
    urls = domainUrls;
    downPath = downloadPath;
}

export class CodeLoad extends FileLoad {

    /**
     * @description 开始
     * @example
     */
    public start() {
        let arr = [];
        for(let info of this.files.values()) {
            arr.push(new Promise((resolve, reject)=>{
                loadJS(this, info, resolve, reject)
            }));
        }
        return Promise.all(arr);
    }
}

const loadJS = (load: CodeLoad, file: FileInfo, callback: (e:Element) => void, errorCallback: (err: string) => void, errText?: string, i?: number) => {
    if (i >= urls.length) {
        return errorCallback && errorCallback(urls[0] + file.path +", "+ errText);
    }
    let head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    let n = document.createElement('script');
    n.charset = 'utf8';
    n.onerror = () => {
        n.onload = n.onerror = undefined;
        head.removeChild(n);
        loadJS(load, file, callback, errorCallback, errText, i === undefined ? 0 : i + 1);
    };
    n.onload = () => {
        n.onload = n.onerror = undefined;
        head.removeChild(n);
        load.loaded+=file.size;
        load.onProcess(file.path, "codeLoad", load.total, load.loaded);
        callback && callback(n);
    };
    n.async = true;
    n.crossOrigin = "anonymous";
    n.src = urls[i || 0] + downPath + file.path+"?"+file.sign;
    head.appendChild(n);
}

// ============================== 本地
// 下载的多域名
let urls: string[] = [];
// 下载的路径，要含 "/"
let downPath: string = "/";

// ============================== 立即执行

