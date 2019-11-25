import { ResTab, register } from '../../pi_sys/modules/util/res_mgr';
import { loadRes } from "../load/app";
import { getFile, fileBasename } from "../../pi_sys/setup/depend";
import { cc, log } from "../../pi_sys/feature/log";
import { createURL } from './bloburl';

// =======================
declare type FontFace;
// ======================= 导出
interface FontArg {
    fontFamily: string;
}

let globalFontResTab: ResTab;

/**
 * 导出成为资源
 */
export const loadFontRes = (path: string, arg?: FontArg) => {
    return globalFontResTab.load(FontType, path, [arg]);
};

// ======================= 立即执行

const load = (_tab: ResTab, _type: string, _name: string, ...args: any[]) => {
    let info = getFile(_name);

    if (!info) {
        return Promise.reject("loadImage failed, info not found, path = " + _name);
    }

    return new Promise((resolve, reject) => {
        loadRes(info).then((ab: ArrayBuffer) => {
            cc.info() && log("Res load image ok !!!");

            if (ArrayBuffer.isView(ab)) {
                ab = (<Uint8Array>ab).slice().buffer;
            }
            if (!ab) {
                cc.warn() && log(`err loadimageRes`);
                cc.warn() && log(info);
            }

            const url = createURL(ab, "");

            try {
                if ((<any>window).FontFace) {
                    const fontFamily = args[0] || fileBasename(_name);
                    loadFont(fontFamily, url, resolve, reject, 'err');
                }
            } catch (err) {
                reject(err);
            }
        });
    });
};

const destroy = (_image: HTMLFontElement) => {
    cc.info() && log("Res release image !!!");
};

// 字体比较特别，需要单独处理
const loadFont = (fontFamily: string, url: string, callback: (f: FontFace) => void, errorCallback: (err: string) => void, errText: string) => {
    const font = new (<any>window).FontFace(fontFamily, `url(${url})`);

    // 添加到全局的 FontFaceSet 中
    (document as any).fonts && (document as any).fonts.add(font);
    font.load().then(() => {
        callback(font);
    }).catch((errText) => {
        (document as any).fonts && (document as any).fonts.remove(font);
        errorCallback && errorCallback(`${fontFamily} 字体加载失败 - ${errText}`);
    });
};

export const FontType = `FONT_RES`;

// 往Res中注册Image对象
export const initFontLoad = () => {
    register(FontType, load, destroy);
    globalFontResTab = new ResTab();
};