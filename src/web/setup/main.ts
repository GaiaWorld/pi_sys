
import {init as envInit, get} from "./env";
import {init as dependInit, FileInfo} from "./depend";
import {init as logInit, cc, log} from "../feature/log";
import {init as codeInit, CodeLoad} from '../load/code';
import {init as objInit, ObjLoad} from '../load/object';
import { init as binLoadInit } from '../load/bin';
import { BatchLoad, setCodeObjSuffix, setCfgHandler, setResLru } from '../load/app';
import { Bar } from '../device/processbar';

export const main = (cfg:any, depend: any) => {
	envInit(cfg);
	dependInit(depend);
	logInit(cfg.log);
	codeInit(cfg.domains, cfg.root_path);
	objInit(cfg.domains, cfg.root_path);
	binLoadInit(cfg.name, cfg.domains, cfg.batch_path).then(() => loadExec("") );
	setCodeObjSuffix(cfg.code_suffixs, cfg.obj_suffixs);
	for(let s of cfg.cfg_suffixs)
		setCfgHandler(s, null);
	for(let s of cfg.res_suffixs)
		setResLru(s, cfg.res_timeout, cfg.res_cache_size/cfg.res_suffixs.length);
	// window全局错误捕捉，记录次数后发送到服务器上
	if(cfg.catch) {
		window.addEventListener('unhandledrejection', onReject);
		(<any>window).onerror =onError;
	}
};

// 显示加载进度条， 开始加载load， 加载完毕后执行exec
export const loadExec = (next:string) => {
	let load = new  BatchLoad(get(next+"load"));
	let bar = new Bar(get(next+"load_bar"));
	bar.show(get(next+"load_text"), load.total, load.loaded);
	load.addProcess(bar.onProcess.bind(bar));
	load.start().then(() => {
		bar.clear();
		if(!next)
			loadExec("next_");
		let exec = get(next+"exec");
		exec[0] && import(exec[0]).then((mod) => {
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
		r = {count: 0};
		errMap.set(e, r);
	}
	r.count+=1;
	let c = 1;
	while (true) { // 仅在1,2,4,8...上发送错误信息
		if (c === r.count) return r.count;
		if (c > r.count) return 0;
		c += c;
	}
};
const onReject = (ev:PromiseRejectionEvent) => {
	console.warn(ev.reason.stack);
	let e = JSON.stringify(ev.reason.stack);
	let c = count(e);
	c && ((new Image()).src = "errlog?s=" + sid + "&e=" + encodeURIComponent(e) + "&c=" + c + "&r=" + Math.random());
}
const onError = (msg:any, uri:string, line:string, column:string, error:any) => {
	let e:any;
	if (msg.stack) {
		e = msg.stack;
	} else if (error && error.stack) {
		e = error.stack;
	} else
		return;
	console.warn(e);
	e = JSON.stringify(e) + ", uri:"+uri + ", line:"+line+ ", column:"+column;
	let c = count(e);
	c && ((new Image()).src = "errlog?s=" + sid + "&e=" + encodeURIComponent(e) + "&c=" + c + "&r=" + Math.random());
};
