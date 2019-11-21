import {baseType} from "../lang/type";
import {Struct} from "../serialization/struct_mgr";
import {setCfgHandler} from "../../load/app";
import {utf8Decode} from "./util";

export class Cfg{
    map: Map<string, Map<any, Struct>> = new Map<string, Map<any, Struct>>();
    set(key: string, value: Map<any, Struct>){
        this.map.set(key, value);
        let notes = (<any>value.get(0).constructor)._$info.notes;
        if(notes){
            let primary = notes.get("primary");
            if(primary){
                let primarys = primary.split("-");
                for(let i = 0; i < primarys.length; i++){
                    let primaryMap = new Map<any, Struct>();
                    value.forEach((v, k) => {
                        primaryMap.set(v[primarys[i]], v);
                    });
                    this.map.set(`${key}#${primarys[i]}`, primaryMap);
                }
            }
        }
    }

    set_arr(key: string, value: Struct[]){
        // this.map.set(key, value);
        if (value.length > 0) {
            let notes = (<any>value[0].constructor)._$info.notes;
            if(notes){
                let primary = notes.get("primary");
                if(primary){
                    let primarys = primary.split("-");
                    for(let i = 0; i < primarys.length; i++){
                        let primaryMap = new Map<any, Struct>();
                        for(let j = 0; j < value.length; j++){
                            let v = value[j];
                            primaryMap.set(v[primarys[i]], v);
                        }
                        this.map.set(`${key}#${primarys[i]}`, primaryMap);
                    }
                    return;
                }
            }

            let primaryMap = new Map<number, Struct>();
            for(let j = 0; j < value.length; j++){
                let v = value[j];
                primaryMap.set(j, v);
            }
            this.map.set(`${key}`, primaryMap);
        }
    }

    update(key: string, value: Map<baseType, Struct>){
        let m = this.map.get(key);
        if(!m){
            this.set(key, value);
        }else{
            let size = m.size;
            value.forEach((v, _) => {
                m.set(size++, v);
            });
            if(value.size === 0){
                return;
            }
            let notes = (<any>value.get(0).constructor)._$info.notes;
            if(notes){
                let primary = notes.get("primary");
                if(primary){
                    let primarys = primary.split("-");
                    for(let i = 0; i < primarys.length; i++){
                        let map = this.map.get(`${key}#${primarys[i]}`);
                        value.forEach((v, _) => {
                            map.set(v[primarys[i]], v);
                        });
                    }
                }
            }
        }
    }

    get(key: string): Map<baseType, Struct>{
        return this.map.get(key);
    }

    getPrimary(key: string, primary: string): Map<baseType, Struct>{
        return this.map.get(`${key}#${primary}`);
    }
}

export const cfgMgr = new Cfg();

const SCFG_SUFFIX = "scfg";
export const sCfgHandle = (): Promise<any> => {
	return setCfgHandler(SCFG_SUFFIX, (file: string, data: Uint8Array): Promise<any> => {
		return new Promise((resolve, reject) => {
			try {
				const cfgs = JSON.parse(utf8Decode(data));
				let all = [];
				for (let key in cfgs) {
					let file = cfgs[key];
					for (let structName in file) {
						let arr = [];
						let split_index = structName.indexOf(".");
						let modName = structName.slice(0, split_index) + ".s";
						let Ty = structName.slice(split_index + 1, structName.length);
						let r = import(modName).then((mod) => {
							for (let item of file[structName]) {
								arr.push( mod[Ty].prototype.__create(item));
							}
							cfgMgr.set_arr(structName, arr);
						});
						all.push(r);
					}
				}
				Promise.all(all).then(() => {
					resolve(null);
				});
			} catch (e) {
				reject(e);
			}
		});
	});
}