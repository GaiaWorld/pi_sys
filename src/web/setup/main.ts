
import { init as envInit, get, set } from "../../pi_sys/setup/env";
import { init as dependInit } from "../../pi_sys/setup/depend";
import { init as logInit } from "../../pi_sys/feature/log";
import { init as codeInit } from '../load/code';
import { init as objInit } from '../load/object';
import { init as binLoadInit } from '../load/bin';
import { BatchLoad, setCodeObjSuffix, setCfgHandler, setResLru } from '../../pi_sys/load/app';
import { Bar } from '../device/processbar';

export const main = (cfg: any, depend: any) => {
    envInit(cfg);
    dependInit(depend);
    logInit(cfg.log);
    codeInit(cfg.domains, cfg.root_path);
    objInit(cfg.domains, cfg.root_path);
    binLoadInit(cfg.name, cfg.domains, cfg.batch_path).then(() => loadExec(""));
    userAgent();
    setCodeObjSuffix(cfg.code_suffixs, cfg.obj_suffixs);
    for (let s of cfg.cfg_suffixs)
        setCfgHandler(s, null);
    for (let s of cfg.res_suffixs)
        setResLru(s, cfg.res_timeout, cfg.res_cache_size / cfg.res_suffixs.length);
    // window全局错误捕捉，记录次数后发送到服务器上
    if (cfg.catch) {
        window.addEventListener('unhandledrejection', onReject);
        (<any>window).onerror = onError;
    }
};

// ============================== 本地
// 显示加载进度条， 开始加载load， 加载完毕后执行exec
const loadExec = (next: string) => {
    let load = new BatchLoad(get(next + "load"));
    let bar = new Bar(get(next + "load_bar"));
    bar.show(get(next + "load_text"), load.total, load.loaded);
    load.addProcess(bar.onProcess.bind(bar));
    load.start().then(() => {
        bar.clear();
        if (!next)
            loadExec("next_");
        let exec = get(next + "exec");
        exec[0] && import(exec[0]).then((mod) => {
            mod[exec[1]](exec.slice(2));
        });
    });
};

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
    let h = screen.height > screen.width ? screen.height : screen.width;
    let w = screen.height > screen.width ? screen.width : screen.height;
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
        if (c === r.count) return r.count;
        if (c > r.count) return 0;
        c += c;
    }
};
const onReject = (ev: PromiseRejectionEvent) => {
    console.warn(ev.reason.stack);
    let e = JSON.stringify(ev.reason.stack);
    let c = count(e);
    c && ((new Image()).src = "errlog?s=" + sid + "&e=" + encodeURIComponent(e) + "&c=" + c + "&r=" + Math.random());
}
const onError = (msg: any, uri: string, line: string, column: string, error: any) => {
    let e: any;
    if (msg.stack) {
        e = msg.stack;
    } else if (error && error.stack) {
        e = error.stack;
    } else
        return;
    console.warn(e);
    e = JSON.stringify(e) + ", uri:" + uri + ", line:" + line + ", column:" + column;
    let c = count(e);
    c && ((new Image()).src = "errlog?s=" + sid + "&e=" + encodeURIComponent(e) + "&c=" + c + "&r=" + Math.random());
};
