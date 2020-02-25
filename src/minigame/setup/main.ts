import { DEPEND_DATA, DEPEND_MGR, FileInfo } from './depend';
import { ENV_CFG, ENV_MGR } from './env';

import { initAudioLoad } from '../device/audio';
import { initFileLoad } from '../device/file';
import { initImageLoad } from '../device/image';
import { Bar } from '../device/progressbar';
import { init as logInit } from '../feature/log';
import { setCfgHandler, setCodeObjSuffix, setResLru, BatchLoad } from '../load/app';
import { CodeLoad, init as codeInit } from '../load/code';
import { LoadMgr } from '../load/mgr';
import { initKeyBoard } from '../device/keyboard';
import { initSoundLoad } from '../device/sound';
import { initFontLaod } from '../device/font';

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
    LoadMgr.init(cfg.name, cfg.domains, cfg.batch_path).then(() => loadExec(''));

    // binLoadInit(cfg.name, cfg.domains, cfg.batch_path).then(() => loadExec(""));
    userAgent();
    setCodeObjSuffix(cfg.code_suffixs, cfg.obj_suffixs);

    for (const s of cfg.cfg_suffixs) {
        setCfgHandler(s, null);
    }

    for (const s of cfg.res_suffixs) {
        setResLru(s, cfg.res_timeout, cfg.res_cache_size / cfg.res_suffixs.length);
    }

    // window全局错误捕捉，记录次数后发送到服务器上
    // if (cfg.catch) {
    //     window.addEventListener('unhandledrejection', onReject);
    //     (<any>window).onerror = onError;
    // }

    initImageLoad();
    initFileLoad();
    initAudioLoad();
    initKeyBoard();
    initSoundLoad(cfg.domains, cfg.batch_path);
    initFontLaod();
};

/**
 * @description 获得浏览器的userAgent. 设置
 * @example
 */
// tslint:disable-next-line:cyclomatic-complexity
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

    const browser: any = { name: 'unknown', version: '0.0' };
    ENV_MGR.setENV('browser', browser);

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
    const engine = { name: 'chromium', version: '0.0' };
    ENV_MGR.setENV('engine', engine);

    if (ua.indexOf('trident') > -1) {
        nameVersion(engine, 'ie', /trident\/([\d.]+)/);
    } else if (ua.indexOf('applewebkit') > -1) {
        nameVersion(engine, 'webkit', /applewebkit\/([\d.]+)/);
    } else if (ua.indexOf('gecko') > -1) {
        nameVersion(engine, 'gecko', /gecko\/([\d.]+)/);
    }

    // 解析ua中的os信息
    const os = { name: 'unknown', version: '0.0' };
    ENV_MGR.setENV('os', os);

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
    const h = (<any>document.documentElement).screen.availHeight;
    const w = (<any>document.documentElement).screen.availWidth;

    ENV_MGR.setENV('device', { type: (ua.indexOf('mobile') > -1) ? 'mobile' : 'pc', platform: navigator.platform, screen: { colorDepth: screen.colorDepth, height: h, width: w } });
    ENV_MGR.setENV('language', navigator.language);
    ENV_MGR.setENV('timezone_offset', new Date().getTimezoneOffset());
};

// 显示加载进度条， 开始加载load， 加载完毕后执行exec
const loadExec = (next: string = '') => {
    return new Promise((resolve, reject) => {
        const pakageList = ENV_MGR.getENV(`${next}load`);

        const dirList = [];
        const dirCfg = [];
        pakageList.forEach((key) => {
            dirList.push(`${key}/`);
            dirCfg.push(`${key}/combine.dcss`);
            dirCfg.push(`${key}/combine.scfg`);
            dirCfg.push(`${key}/combine.widcfg`);
            dirCfg.push(`${key}/combine.kcss`);
            dirCfg.push(`${key}/png.imgcfg`);
            dirCfg.push(`${key}/jpg.imgcfg`);
        });

        if (pakageList) {

            const bar = new Bar(ENV_MGR.getENV(`${next}load_bar`));

            const load = new CodeLoad();

            pakageList.forEach((pkName) => {
                load.add(new FileInfo([pkName, 0, '0']));
            });
            load.addProcess(bar.onProcess);

            // const batchLoad = new BatchLoad(dirList);
            // batchLoad.addFilter('*/**/*.widcfg');
            // batchLoad.addFilter('*/**/*.dcss');
            // batchLoad.addFilter('*/**/*.kcss');
            // batchLoad.addFilter('*/**/*.xcfg');
            // batchLoad.addFilter('*/**/*.json');
            // batchLoad.addFilter('*/**/*.imgcfg');

            const batchLoad = new BatchLoad(dirCfg);
            // batchLoad.addProcess(bar.onProcess);

            bar.show(ENV_MGR.getENV(`${next}load_text`), load.total, load.loaded);

            const promiseCode = load.start();
            // const promiseCfg  = batchLoad.load(false);

            promiseCode.then(() => {
                console.log('Code.OK');
                bar.show(ENV_MGR.getENV(`${next}load_text`), 1, 1);

                const promiseCfg  = batchLoad.load(false);
                batchLoad.addProcess(bar.onProcess);
                bar.show(ENV_MGR.getENV(`${next}load_text`), 1, 1);
                promiseCfg.then(() => {
                    // console.log('bar.clear');

                    // try {
                    //     bar.clear();
                    // } catch (err) {
                    //     console.error(err);
                    // }

                    // const execArr = ENV_MGR.getENV(`${next}exec`);

                    // const arr = [];
                    // for (let i = 0; i < execArr.length; i++) {

                    //     const mode = (<any>window)._$pi.require(execArr[i][0]);
                    //     mode && mode[execArr[i][1]](execArr[i].slice(2));

                    //     // execArr[i][0] && arr.push(import(execArr[i][0]).then((mod) => {
                    //     //     mod[execArr[i][1]](execArr[i].slice(2));

                    //     //     return mod;
                    //     // }));
                    // }

                    resolve(bar);

                    if (!next) {
						console.log('bar.clear');
						try {
							bar.clear();
						} catch (err) {
							console.error(err);
						}
                        Promise.all([execMfa(ENV_MGR.getENV("exec")), loadExec('next_')]).then(([_, bar]) => {
                            execMfa(ENV_MGR.getENV("next_exec")).then(() => {
								try {
									console.log('next_bar.clear');
									bar.clear();
								} catch (err) {
									console.error(err);
								}
							});
                        });
                    }

                });
            });

            // Promise.all([promiseCode, promiseCfg]).then(() => {
            //     console.log('bar.clear');

            //     try {
            //         bar.clear();
            //     } catch (err) {
            //         console.error(err);
            //     }

            //     const execArr = ENV_MGR.getENV(`${next}exec`);

            //     const arr = [];
            //     for (let i = 0; i < execArr.length; i++) {

            //         const mode = (<any>window)._$pi.require(execArr[i][0]);
            //         mode && mode[execArr[i][1]](execArr[i].slice(2));

            //         // execArr[i][0] && arr.push(import(execArr[i][0]).then((mod) => {
            //         //     mod[execArr[i][1]](execArr[i].slice(2));

            //         //     return mod;
            //         // }));
            //     }

            //     if (!next) {
            //         loadExec('next_');
            //     }
            // });
        }

    });
};

// ============================== 本地
// // 显示加载进度条， 开始加载load， 加载完毕后执行exec
// const loadExec = (next: string): Promise<any> => {
//     let load = new BatchLoad(ENV_MGR.getENV(next + "load"));
//     let bar = new Bar(ENV_MGR.getENV(next + "load_bar"));
//     bar.show(ENV_MGR.getENV(next + "load_text"), load.total, load.loaded);
//     load.addProcess(bar.onProcess.bind(bar));

//     return load.start().then(() => {
//         bar.clear();
//         if (!next) {
//             let arr = [];
//             arr.push(loadExec("next_"));
//             arr.push(execMfa(ENV_MGR.getENV("exec")));
//             // 第二次mfa执行需要等待第二次加载和第一次mfa执行结束
//             Promise.all(arr).then(() => {
//                 execMfa(ENV_MGR.getENV("next_exec"));
//             });
//         }
//     });
// };

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
