import { ResTab, register } from '../../pi_sys/modules/util/res_mgr';
import { loadRes } from "../load/app";
import { getFile } from "../../pi_sys/setup/depend";
import { cc, log } from "../../pi_sys/feature/log";

// ======================= 导出
interface FontArg {
    fontFamily: string;
}

/**
 * 导出成为资源
 */
export const loadFontRes = (resTab: ResTab, path: string, arg?: FontArg) => {
    return resTab.load(FontType, path, [arg]);
};

// ======================= 立即执行

const load = (_tab: ResTab, _type: string, _name: string, args: any[]) => {
    let info = getFile(_name);

    if (!info) {
        return Promise.reject("loadImage failed, info not found, path = " + _name);
    }

    return loadRes(info).then((res) => {
        cc.info() && log("Res load image ok !!!");
        return res;
    });
};

const destroy = (_image: HTMLFontElement) => {
    cc.info() && log("Res release image !!!");
};

export const FontType = `FONT_RES`;

// 往Res中注册Image对象
export const initFontLoad = () => {
    register(FontType, load, destroy);
};