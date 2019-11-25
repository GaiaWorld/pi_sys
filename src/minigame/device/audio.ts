import { ResTab, register } from "../../pi_sys/modules/util/res_mgr";
import { BatchLoad, loadRes } from "../load/app";
import { DEPEND_MGR } from "../setup/depend";
import { cc, log } from "../feature/log";

export const RES_TYPE_AUDIO          = 'RES_TYPE_AUDIO';

type LoadCall = (tab: ResTab, type: string, name: string, ...args: any[]) => Promise<any>;

const loadAudio: LoadCall = (tab: ResTab, _type: 'RES_TYPE_AUDIO', _name: string, ...args: any[]): Promise<any> => {
    let info = DEPEND_MGR.getFile(_name);
    if (!info) {
        return Promise.reject("loadImage failed, info not found, path = " + _name);
    }

    return loadRes(info, args[0]).then((audio) => {
        cc.info() && log("Res load image ok !!!");
        return audio;
    });
};

const destroy = (audio: HTMLAudioElement) => {
    (<any>audio).destroy && (<any>audio).destroy();
};

export const loadAudioRes = (tab: ResTab, path: string, arg?: HTMLAudioElement) => {
    return tab.load(RES_TYPE_AUDIO, path, [arg]);
};

export const initAudioLoad = () => {
    register(RES_TYPE_AUDIO, loadAudio, destroy);
};