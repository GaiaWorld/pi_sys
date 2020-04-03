/**
 * 
 */
import { register, ResTab } from '../../pi_sys/modules/util/res_mgr';
import { cc, log } from '../feature/log';
import { BatchLoad, loadRes } from '../load/app';
import { getFile } from '../setup/depend';
import { FileSys } from './filesys';
import { wx } from './wx';

let globalFontResTab: ResTab;

export const RES_TYPE_FONT = `FONT_RES`;

export class WXFontFace {
    public name: string;
    public family: string;
    public localPath: string;
    public src: string;

    constructor(name: string, src: string) {
        this.name = name;
        this.src = src;
    }

    public load(): Promise<any> {
        const p = FileSys.download(this.src, this.localPath)
                    .then((localPath) => {
                        const family = wx.loadFont(localPath);
                        if (family === null) {
                            this.family = family;
                            this.localPath = localPath;
                        } else {
                            this.family = family;
                            this.localPath = localPath;
                        }

                        return localPath;
                    });

        return p;
    }
}

export const loadFontRes = (path: string, fontFamily?: string) => {
    return globalFontResTab.load(RES_TYPE_FONT, path, [fontFamily]);
};

const load = (tab: ResTab, _type: string, _name: string, ...args: any[]) => {
    const info = getFile(_name);

    return new Promise((resolve, reject) => {
        // resolve();
        loadRes(info)
            .then((res) => {
                resolve(res.link);
                cc.info() && log(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const initFontLaod = () => {
    register(RES_TYPE_FONT, load, () => {});
    globalFontResTab = new ResTab();
};