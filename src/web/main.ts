
// declare var global;
// export const _$self = (<any>window) || (<any>global);
// _$self.pi_modules = _$self.pi_modules || {};

import {init as envInit, get} from "./env";
import {init as dependInit} from "./depend";
import {init as logInit} from "./log";
import {init as codeInit} from './code_load';
import {init as objInit} from './obj_load';
import { init as binLoadInit } from './bin_load';
import { BatchLoad } from './app_load';
import { Bar } from './processbar';

export const main = (cfg:any, depend: any) => {
	envInit(cfg);
	dependInit(depend);
	logInit(cfg.log);
	codeInit(cfg.domains, cfg.root_path);
	objInit(cfg.domains, cfg.root_path);
	binLoadInit(cfg.name, cfg.domains, cfg.batch_path).then(() => loadExec("") );
	// window全局错误捕捉，记录次数后发送到服务器上
	(<any>window).onerror = cfg.catch ? undefined : onError;
};

// 显示加载进度条， 开始加载load， 加载完毕后执行exec
export const loadExec = (next:string) => {
	let load = new  BatchLoad(get(next+"load"));
	let bar = new Bar(get(next+"load_bar"));
	bar.show(get(next+"load_text"), load.total);
	load.start().then(() => {
		bar.clear();
		if(!next)
			loadExec("next_");
		let exec = get(next+"exec");
		import(exec[0]).then((mod) => {
            mod[exec[1]](exec.slice(2));
        });
	});
};

// ============================== 本地
const errMap: Map<string, {count: number}> = new Map;
const sid = Date.now().toString(36) + "X" + Math.floor(Math.random() * 0xffffffff).toString(36);

const count = (e:string) => {
	let r = errMap.get(e);
	if(!r) {
		errMap.set(e, {count: 0});
	}
	r.count+=1;
	let c = 1;
	while (true) { // 仅在1,2,4,8...上发送错误信息
		if (c === r.count) return r.count;
		if (c > r.count) return 0;
		c += c;
	}
};

const onError = (msg:any, uri:string, line:string, column:string, error:any) => {
	let e:any;
	if (msg.stack) {
		e = msg;
	} else if (error && error.stack) {
		e = error;
	} else
		return;
	console.log(e);
	e = JSON.stringify(e) + ", uri:"+uri + ", line:"+line+ ", column:"+column;
	let c = count(e);
	c && ((new Image()).src = "errlog?s=" + sid + "&e=" + encodeURIComponent(e) + "&c=" + c + "&r=" + Math.random());
};