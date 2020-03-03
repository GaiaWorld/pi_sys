
import { init as envInit, get, set } from "../../pi_sys/setup/env";
import { init as dependInit } from "../../pi_sys/setup/depend";
import { init as logInit } from "../../pi_sys/feature/log";
import { init as codeInit } from '../load/code';
import { init as objInit } from '../load/object';
import { init as binLoadInit } from '../load/bin';
import { BatchLoad, setCodeObjSuffix, setCfgHandler, setResLru } from '../../pi_sys/load/app';
import { adaptive } from '../../pi_sys/setup/screen_adapter';
import { Bar } from '../device/processbar';
import { initFileLoad } from "../device/file";
import { initImageLoad } from "../device/image";
import { initAudioLoad } from "../device/audio";
import { initFontLoad } from "../device/font";
import { initBlobLoad } from "../device/bloburl";
import { initSoundLoad } from "../device/sound";


 /**
  * 屏幕适配
  */
 export const screenAdaptive = (cfg: any) => {
	userAgent();
	adaptive(cfg);
}

export const main = (cfg: any, depend: any) => {
    envInit(cfg);
    dependInit(depend);
    logInit(cfg.log);
    codeInit(cfg.domains, cfg.root_path);
    objInit(cfg.domains, cfg.root_path);
    binLoadInit(cfg.name, cfg.domains, cfg.batch_path).then(() => loadExec(""));
    // userAgent();
    setCodeObjSuffix(cfg.code_suffixs, cfg.obj_suffixs);
    for (let s of cfg.cfg_suffixs) {
        setCfgHandler(s, null);
    }
    for (let s of cfg.res_suffixs) {
        setResLru(s, cfg.res_timeout, cfg.res_cache_size / cfg.res_suffixs.length);
    }
    // window全局错误捕捉，记录次数后发送到服务器上
    if (cfg.catch) {
        window.addEventListener('unhandledrejection', onReject);
        (<any>window).onerror = onError;
    }
    initImageLoad();
    initFileLoad();
    initAudioLoad();
    initFontLoad();
    initBlobLoad(cfg.domains, cfg.root_path);
    initSoundLoad(cfg.domains, cfg.root_path);
};

// ============================== 本地
// 显示加载进度条， 开始加载load， 加载完毕后执行exec
const loadExec = (next: string): Promise<any> => {
    let load = new BatchLoad(get(next + "load"));
    let bar = new Bar(get(next + "load_bar"));
    bar.show(get(next + "load_text"), load.total, load.loaded);
    load.addProcess(bar.onProcess.bind(bar));

    return load.start().then(() => {
        bar.clear();
        if (!next) {
            let arr = [];
            arr.push(loadExec("next_"));
            arr.push(execMfa(get("exec")));
            // 第二次mfa执行需要等待第二次加载和第一次mfa执行结束
            Promise.all(arr).then(() => {
                execMfa(get("next_exec"));
            });
        }
    });
};

const execMfa = (exec: any): Promise<any> => {
    return new Promise((resolve, _reject) => {
        if (!exec || exec.length === 0) {
            return resolve();
        }
        let arr = [];
        let execCount = 0;
        for (let execi of exec) {
            import(execi[0]).then((mod) => {
                let r = mod[execi[1]](...(execi.slice(2)));
                if (r && r instanceof Promise) {
                    arr.push(r);
                }
                execCount += 1;
                if (execCount === exec.length) {
                    Promise.all(arr).then(() => {
                        resolve(null);
                    });
                }
                return mod;
            });
        }
    });

};

// // 执行mfa， 保证执行顺序
// const execMfa = (index: number, tasks:[Promise<any>, any][]) => {
// 	let t = tasks[index];
// 	t[0].then(() => {
// 		let arr = [];
// 		let execCount = 0;
// 		let exec = t[1];
// 		if (exec) {
// 			for (let i = 0; i < exec.length; i++) {
// 				exec[i][0] && import(exec[i][0]).then((mod) => {
// 					let r = mod[exec[i][1]](...(exec[i].slice(2)));
// 					if (r && r instanceof Promise) {
// 						arr.push(r);
// 					}
// 					execCount += 1;

// 					if (execCount === exec.length && index < tasks.length - 1) {
// 						Promise.all(arr).then(() => {
// 							execMfa(index + 1, tasks);
// 						});
// 					}
// 					return mod;
// 				});
// 			}
// 		}
// 	});
// }

/**
 * @description 获得浏览器的userAgent. 设置
 * @example
 */
const userAgent = (): any => {
    const ua = navigator.userAgent.toLowerCase();
    const nameVersion = (obj, name, rxp) => {
        const arr = ua.match(rxp);
        if (!arr) {
            return;
        }
        obj.version = arr[1];
        obj.name = name;

        return true;
    };
    const cfg = {
        chrome: null,
        msie: 'ie',
        firefox: null,
        opr: 'opera',
        micromessenger: null,
        mqqbrowser: null,
        ucbrowser: null
    };
    let browser: any = { name: 'unknown', version: '0.0' };
    set("browser", browser);
    if (ua.indexOf('safari') > -1) {
        if (ua.indexOf('mobile') > -1) {
            if (nameVersion(browser, 'safari', /version\/([\d.]+)/)) {
                browser.safari = browser.version;
            }
        } else {
            if (nameVersion(browser, 'safari', /safari\/([\d.]+)/)) {
                browser.safari = browser.version;
            }
        }
    }
    for (const k in cfg) {
        if (!cfg.hasOwnProperty(k)) {
            continue;
        }
        const i = ua.indexOf(k);
        if (i < 0) {
            continue;
        }
        let name = cfg[k];
        name = name || k;
        if (nameVersion(browser, name, new RegExp(k + '\/([\\d.]+)'))) {
            browser[name] = browser.version;
        }
    }

    // 解析ua中的engine信息
    let engine = { name: 'chromium', version: '0.0' };
    set("engine", engine);
    if (ua.indexOf('trident') > -1) {
        nameVersion(engine, 'ie', /trident\/([\d.]+)/);
    } else if (ua.indexOf('applewebkit') > -1) {
        nameVersion(engine, 'webkit', /applewebkit\/([\d.]+)/);
    } else if (ua.indexOf('gecko') > -1) {
        nameVersion(engine, 'gecko', /gecko\/([\d.]+)/);
    }

    // 解析ua中的os信息
    let os = { name: 'unknown', version: '0.0' };
    set("os", os);
    if (ua.indexOf('windows nt') > -1) {
        nameVersion(os, 'windows', /windows nt ([\d.]+)/);
        if (os.version === '6.1') {
            os.version = '7';
        } else if (os.version === '6.2') {
            os.version = '8';
        }
    } else if (ua.indexOf('iphone os') > -1) {
        nameVersion(os, 'ios', /iphone os ([\d_]+)/);
        os.version = os.version.split('_').join('.');
    } else if (ua.indexOf('android') > -1) {
        nameVersion(os, 'android', /android ([\d.]+)/);
    } else if (ua.indexOf('linux') > -1) {
        nameVersion(os, 'linux', /linux ([\d.]+)/);
    }

    // 通用
    // let h = screen.height > screen.width ? screen.height : screen.width;
    // let w = screen.height > screen.width ? screen.width : screen.height;
    let h = window.innerHeight;
	let w = window.innerWidth;
    set("device", { type: (ua.indexOf('mobile') > -1) ? 'mobile' : 'pc', platform: navigator.platform, screen: { colorDepth: screen.colorDepth, height: h, width: w } });
    set("language", navigator.language);
    set("timezone_offset", new Date().getTimezoneOffset());
};

// ============================== 本地
const errMap: Map<string, { count: number }> = new Map;
const sid = Date.now().toString(36) + "X" + Math.floor(Math.random() * 0xffffffff).toString(36);

const count = (e: string) => {
    let r = errMap.get(e);
    if (!r) {
        r = { count: 0 };
        errMap.set(e, r);
    }
    r.count += 1;
    let c = 1;
    while (true) { // 仅在1,2,4,8...上发送错误信息
        if (c === r.count) { return r.count; }
        if (c > r.count) { return 0; }
        c += c;
    }
};
const onReject = (ev: PromiseRejectionEvent) => {
    onError(ev.reason);
};
const onError = (msg: any, uri?: string, line?: string, column?: string, error?: any) => {
    let e: any;
    if (msg.stack) {
        e = msg.stack;
    } else if (error && error.stack) {
        e = error.stack;
    } else {
        return;
    }
    console.warn(e);
    e = JSON.stringify(e) + uri?(", uri:" + uri + line?(", line:" + line + ", column:" + column):""):"";
    let c = count(e);
    c && ((new Image()).src = "errlog?s=" + sid + "&e=" + encodeURIComponent(e) + "&c=" + c + "&r=" + Math.random());
};
