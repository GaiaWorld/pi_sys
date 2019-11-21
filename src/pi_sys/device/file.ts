import { ResTab, register } from "../../pi_sys/modules/util/res_mgr";
import { getStore } from "../load/bin";

export const RES_TYPE_FILE          = 'RES_TYPE_FILE';

type LoadCall = (tab: ResTab, type: string, name: string, ...args: any[]) => Promise<any>;

interface IFile {
    link: ArrayBuffer;
}

const loadFile: LoadCall = (tab: ResTab, _type: 'RES_TYPE_FILE', _name: string, ...args: any[]): Promise<IFile> => {
    return new Promise((resolve, reject) => {
            getStore().read(_name).then((res) => {
                resolve(res);
            });
        });

};

export const initFileLoad = () => {
    register(RES_TYPE_FILE, loadFile, () => {});
};
