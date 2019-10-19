/**
 * 提供资源加载， 仅用于移动端的安装包内的资源读取
*/

// ============================== 导出
/**
 * @description 获取资源信息数组Json, [[file, time, size, sign], ...]
 * @example
 */
export const get = (): Promise<any[]> => {
    return new Promise((resolve) =>{
        resolve([]);
    });
};

/**
 * @description 读取资源
 * @example
 */
export const read = (key:string) : Promise<ArrayBuffer> => {
    return new Promise((resolve) =>{
        resolve(null);
    });
};