import { ResTab, register } from "../../pi_sys/modules/util/res_mgr";
import { getStore } from "../load/bin";
import { getFile } from "../../pi_sys/setup/depend";

export const RES_TYPE_FILE          = 'RES_TYPE_FILE';

type LoadCall = (tab: ResTab, type: string, name: string, ...args: any[]) => Promise<any>;

interface IFile {
    link: ArrayBuffer;
}

const loadFile: LoadCall = (tab: ResTab, _type: 'RES_TYPE_FILE', _name: string, ...args: any[]): Promise<IFile> => {
    return new Promise((resolve, reject) => {
            const info = getFile(_name);
            if (info) {
                getStore().read(info.path)
                    .then((res) => {
                        if (ArrayBuffer.isView(res)) {
                            res = (<Uint8Array>res).slice().buffer;
                        }
                        resolve(res);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else {
                reject(`文件不存在 ${_name}`);
            }
        });

};

export const initFileLoad = () => {
    register(RES_TYPE_FILE, loadFile, () => {});
};
