import { ENV_CFG, ENV_MGR } from "./env";
import { DEPEND_DATA, DEPEND_MGR, FileInfo } from "./depend";

import { init as logInit } from "../feature/log";
import { init as codeInit, CodeLoad } from '../load/code';
import { init as objInit } from '../load/object';
import { init as binLoadInit } from '../load/bin';
import { setCodeObjSuffix, setCfgHandler, setResLru } from '../load/app';
import { Bar } from '../device/progressbar';
import { LoadMgr } from "../load/mgr";

/**
 * 项目初始化入口
 * 
 */

/**
 * 
 * @param cfg 
 * @param depend 
 */

export const main = (cfg: ENV_CFG, depend: DEPEND_DATA) => {
    ENV_MGR.init(cfg);
    DEPEND_MGR.init(depend);

    logInit(cfg.log);
    codeInit(cfg.domains, cfg.root_path);
    objInit(cfg.domains, cfg.root_path);
    LoadMgr.init(cfg.name, cfg.domains, cfg.batch_path).then(() => loadExec(""));
    
    // binLoadInit(cfg.name, cfg.domains, cfg.batch_path).then(() => loadExec(""));
    userAgent();
    setCodeObjSuffix(cfg.code_suffixs, cfg.obj_suffixs);

    for (let s of cfg.cfg_suffixs) {
        setCfgHandler(s, null);
    }

    for (let s of cfg.res_suffixs) {
        setResLru(s, cfg.res_timeout, cfg.res_cache_size / cfg.res_suffixs.length);
    }

    // window全局错误捕捉，记录次数后发送到服务器上
    // if (cfg.catch) {
    //     window.addEventListener('unhandledrejection', onReject);
    //     (<any>window).onerror = onError;
    // }
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
    ENV_MGR.setENV("browser", browser);

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
    ENV_MGR.setENV("engine", engine);

    if (ua.indexOf('trident') > -1) {
        nameVersion(engine, 'ie', /trident\/([\d.]+)/);
    } else if (ua.indexOf('applewebkit') > -1) {
        nameVersion(engine, 'webkit', /applewebkit\/([\d.]+)/);
    } else if (ua.indexOf('gecko') > -1) {
        nameVersion(engine, 'gecko', /gecko\/([\d.]+)/);
    }

    // 解析ua中的os信息
    let os = { name: 'unknown', version: '0.0' };
    ENV_MGR.setENV("os", os);

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

    ENV_MGR.setENV("device", { type: (ua.indexOf('mobile') > -1) ? 'mobile' : 'pc', platform: navigator.platform, screen: { colorDepth: screen.colorDepth, height: h, width: w } });
    ENV_MGR.setENV("language", navigator.language);
    ENV_MGR.setENV("timezone_offset", new Date().getTimezoneOffset());
};

// 显示加载进度条， 开始加载load， 加载完毕后执行exec
const loadExec = (next: string = '') => {
    let load = new CodeLoad();

    const pakageList = ENV_MGR.getENV(`${next}load`);

    if (pakageList) {
        pakageList.forEach(pkName => {
            load.add(new FileInfo([pkName, 0, '0']));
        });
    
        let bar = new Bar(ENV_MGR.getENV(`${next}load_bar`));
    
        bar.show(ENV_MGR.getENV(`${next}load_text`), load.total, load.loaded);
    
        load.addProcess(bar.onProcess.bind(bar));
        load.start().then(() => {

            console.log('bar.clear');

            try {
                bar.clear();
            } catch (err) {
                console.error(err)
            }
    
            // if (!next) {
            //     loadExec("next_");
            // }
    
            let exec = ENV_MGR.getENV(`${next}exec`);
            const mode = (<any>window)._$pi.require(exec[0]);

            console.log(exec);
            console.log(mode);

            mode && mode[exec[1]](exec.slice(2));
        });
    }
};

