/**
 * 本地进度条
 */

 export class Bar {
    timeRef: number;
    // 加载的总文件长度
    public total: number = 0;
    // 加载的当前进度
    public loaded: number = 0;
    old: number = 0;
    last: number = 0;
    opacity: number = 0;

    public constructor(cfg:any) {
    }
    // 显示文字和进度条， 文字有呼吸灯的效果
    public show(text: string, total: number, loaded: number) {
    }
    public onProcess(url:string, type: string, total:number, loaded: number, data?: Uint8Array) {
    }
    public clear() {
    }
}
