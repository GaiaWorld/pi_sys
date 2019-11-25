import { ResTab, register } from '../../pi_sys/modules/util/res_mgr';
import { loadRes } from "../load/app";
import { getFile } from "../../pi_sys/setup/depend";
import { cc, log } from "../../pi_sys/feature/log";
import { createURL } from './bloburl';

// ======================= 导出

/**
 * 导出成为资源
 */
export const loadImageRes = (resTab: ResTab, path: string, args?: any[]) => {
    return resTab.load(ImageType, path, args || []);
};

// ======================= 立即执行

const load = (_tab: ResTab, _type: string, _name: string, ...args: any[]): Promise<HTMLImageElement> => {
    let info = getFile(_name);
    let objInstance: HTMLImageElement;

    if (!info) {
        return Promise.reject("loadImage failed, info not found, path = " + _name);
    }

    if (args && args.length > 0) {
        objInstance = args[0];
    }

    // return loadRes(info, objInstance).then((image) => {
    //     cc.info() && log("Res load image ok !!!");
    //     return image;
    // });
    return new Promise((resolve, reject) => {
        loadRes(info, objInstance).then((ab: ArrayBuffer) => {
            cc.info() && log("Res load image ok !!!");
            if (ArrayBuffer.isView(ab)) {
                ab = (<Uint8Array>ab).slice().buffer;
            }
            if (!ab) {
                console.log(`err loadimageRes`);
                console.log(info);
            }

            const url = createURL(ab, "");
            let oldOnload, oldError;

            if (!objInstance) {
                objInstance = new Image();
            } else {
                oldOnload = objInstance.onload;
                oldError = objInstance.onerror;
            }

            objInstance.onload = () => {
                resolve(objInstance);
                oldOnload && oldOnload();
            };

            objInstance.onerror = (err) => {
                console.log(_name);
                console.log(ab);
                reject(err);
                oldError && oldError();
            };

            objInstance.src = url;

            // return objInstance;
        });
    });
};

const destroy = (_image: HTMLDivElement) => {
    cc.info() && log("Res release image !!!");
};

const ImageType = "image";

// 往Res中注册Image对象
export const initImageLoad = () => {
    register(ImageType, load, destroy);
};