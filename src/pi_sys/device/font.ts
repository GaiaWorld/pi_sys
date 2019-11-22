import { ResTab, register } from '../../pi_sys/modules/util/res_mgr';
import { loadRes } from "../load/app";
import { getFile } from "../../pi_sys/setup/depend";
import { cc, log } from "../../pi_sys/feature/log";

// ======================= 导出
interface FontArg {
    fontFamily: string;
}

let globalFontResTab: ResTab;

export const FontType = `FONT_RES`;

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

    return loadRes(info).then((res) => {
        cc.info() && log("Res load image ok !!!");
        return res;
    });
};

const destroy = (_font: HTMLFontElement) => {
    cc.info() && log("Res release image !!!");
};

// 往Res中注册Image对象
export const initImageLoad = () => {
    register(FontType, load, destroy);
    globalFontResTab = new ResTab();
};