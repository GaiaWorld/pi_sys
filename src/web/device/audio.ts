import { ResTab, register } from '../../pi_sys/modules/util/res_mgr';
import { loadRes } from "../load/app";
import { getFile } from "../../pi_sys/setup/depend";
import { cc, log } from "../../pi_sys/feature/log";
import { createURL } from './bloburl';

// ======================= 导出

/**
 * 导出成为资源
 */
export const loadAudioRes = (resTab: ResTab, path: string, arg?: HTMLAudioElement) => {
    return resTab.load(RES_TYPE_AUDIO, path, [arg]);
};

// ======================= 立即执行

const load = (_tab: ResTab, _type: string, _name: string, args: any) => {
    let info = getFile(_name);
    let objInstance: HTMLAudioElement;

    if (!info) {
        return Promise.reject("loadImage failed, info not found, path = " + _name);
    }

    if (args) {
        objInstance = args;
    }

    // return loadRes(info, objInstance).then((res) => {
    //     cc.info() && log("Res load image ok !!!");
    //     return res;
    // });
    return new Promise((resolve, reject) => {
        loadRes(info, objInstance).then((ab: ArrayBuffer) => {
            cc.info() && log("Res load image ok !!!");
            if (objInstance) {
                const url = createURL(ab, "");
                let oldOnload = objInstance.onload;
                objInstance.onload = () => {
                    resolve({ link: objInstance });
                    // oldOnload && oldOnload(null);
                };
                objInstance.src = url;
            } else {
                if (ArrayBuffer.isView(ab)) {
                    ab = (<Uint8Array>ab).slice().buffer;
                }

                if (!audioContext) {
                    console.warn(`not get audioContext`);
                } else {
                    audioContext.decodeAudioData(
                        ab,
                        (buffer) => {
                            resolve(buffer);
                        },
                        (err) => {
                            console.warn(_name, {
                                error: 'SOUND_DECODE_ERROR',
                                reason: `decode fail: ${err}`
                            });
                        }
                    );
                }
            }
        });
    });
};

const destroy = (_image: HTMLFontElement) => {
    cc.info() && log("Res release image !!!");
};

let audioContext: AudioContext;

export const RES_TYPE_AUDIO = `AUDIO_RES`;

// 往Res中注册Image对象
export const initAudioLoad = () => {
    register(RES_TYPE_AUDIO, load, destroy);
};

export const setAudioContext = (ctx: AudioContext) => {
    audioContext = ctx;
};