import { ResTab, register } from '../../pi_sys/modules/util/res_mgr';
import { loadRes } from "../load/app";
import { cc, log } from "../../pi_sys/feature/log"
import { DEPEND_MGR } from '../setup/depend';

// ======================= 导出

/** 
 * 导出成为资源
 */
export const loadImageRes = (resTab: ResTab, path: string) => {
    return resTab.load(ImageType, path, [path]);
}

// ======================= 立即执行

const load = (_tab: ResTab, _type: string, _name: string, path: string) => {
    let info = DEPEND_MGR.getFile(path);
    if (!info) {
        return Promise.reject("loadImage failed, info not found, path = " + path);
    }

    return loadRes(info).then((image) => {
        cc.info() && log("Res load image ok !!!");
        return image;
    });
}

const destroy = (_image: HTMLImageElement) => {
    cc.info() && log("Res release image !!!");
}

const ImageType = "image";

// 往Res中注册Image对象
register(ImageType, load, destroy);