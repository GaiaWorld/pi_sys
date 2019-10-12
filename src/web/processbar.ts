/**
 * 本地进度条
 */

 export class Bar {
    text: HTMLDivElement;
    div: HTMLDivElement;
    divProcess: HTMLDivElement;
    timeRef: number;
    // 加载的总文件长度
    public total: number = 0;
    // 加载的当前进度
    public loaded: number = 0;
    last: number = 0;
    opacity: number = 0;

    public constructor(cfg:any) {
        this.text = document.createElement('div');
        this.text.setAttribute("pi", "1");
        this.text.setAttribute("style", "position:absolute;bottom:30px;left: 50%;width: 0px;height: 24px;font-size:20px;");
        this.text.style.color = cfg.text_color || "#fff";
        this.div = document.createElement('div');
        this.div.setAttribute("pi", "1");
        this.div.setAttribute("style", "position:absolute;bottom:16px;left: 3%;width: 94%;height: 10px;padding: 1px;border-radius: 20px;border-top: 1px solid #000;border-bottom: 1px solid #7992a8;");
        this.div.style.backgroundColor = cfg.bar_bgcolor || "#262626";
        this.divProcess = document.createElement('div');
        this.divProcess.setAttribute("style", "width: 0%;height: 100%;border-radius: 20px;");
        this.divProcess.style.backgroundColor = cfg.bar_color || "rgb(162, 131, 39)";
        this.div.appendChild(this.divProcess);
    }
    // 显示文字和进度条， 文字有呼吸灯的效果
    public show(text: string, total: number) {
        this.text.innerHTML = text;
        this.total = total;
        if(this.timeRef)
            return;
        document.body.appendChild(this.text);
        document.body.appendChild(this.div);
        this.timeRef = setTimeout(this.calc.bind(this), 100);
    }
    public onProcess(url:string, type: string, total:number, loaded: number, data?: Uint8Array) {
        this.loaded = loaded;
    }
    calc() {
        setTimeout(this.calc.bind(this), 100);
        this.opacity += 3;
        this.text.style.opacity = ""+(Math.abs(this.opacity % 80 - 40)+10)/50;;
        if(this.last === this.loaded)
            return;
        this.last = this.loaded;
        this.divProcess.style.width = this.last * 100/ this.total + "%";
    }
    public clear() {
        this.total = 0;
        this.loaded = 0;
        if(this.timeRef)
            clearTimeout(this.timeRef);
        this.timeRef = 0;
        document.body.removeChild(this.text);
        document.body.removeChild(this.div);
    }
}
