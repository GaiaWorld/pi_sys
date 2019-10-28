/**
 * 小游戏下载接口
 */
declare var wx: any;

/**
 * 小游戏原生下载接口封装
 * @param   url         资源url
 * @param   savePath    要保存到的位置
 */
export const download = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url,
            success: (res: any) => {
                if (res.statusCode === 200) {
                    resolve(res.tmpFilePath);
                } else {
                    reject(res);
                }
            },
            fail: reject
        });
    });
};
