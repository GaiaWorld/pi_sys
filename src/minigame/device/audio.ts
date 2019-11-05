import { ResTab, register } from "../../pi_sys/modules/util/res_mgr";
import { BatchLoad, loadRes } from "../load/app";
import { getStore } from "../load/bin";
import { DEPEND_MGR } from "../setup/depend";
import { cc, log } from "../feature/log";

export const RES_TYPE_AUDIO          = 'RES_TYPE_AUDIO';

type LoadCall = (tab: ResTab, type: string, name: string, ...args: any[]) => Promise<any>;

interface IFile {
    link: ArrayBuffer;
}

const loadAudio: LoadCall = (tab: ResTab, _type: 'RES_TYPE_AUDIO', _name: string, ...args: any[]): Promise<any> => {
    let info = DEPEND_MGR.getFile(_name);
    if (!info) {
        return Promise.reject("loadImage failed, info not found, path = " + _name);
    }

    return loadRes(info).then((audio) => {
        cc.info() && log("Res load image ok !!!");
        return audio;
    });
}

export const loadAudioRes = (tab: ResTab, path: string) => {
    return tab.load(RES_TYPE_AUDIO, path, [path]);
}

export const initAudioLoad = () => {
    register(RES_TYPE_AUDIO, loadAudio, () => {});
}