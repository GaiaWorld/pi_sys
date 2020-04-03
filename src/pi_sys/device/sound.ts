/*
 * 声音播放
 * 注意，时间单位是秒, 可以使用小数表示毫秒
 */

// ============================== 导入
// import { depend, load } from '../../pi_sys/modules/lang/mod';
// import { logLevel, warn } from '../util/log';
// import { arrDrop } from '../util/util';
// import { console.warn, loadOK, register, Res, ResTab } from './res_mgr';

import { cc, log } from '../../pi_sys/feature/log';
import { register, Res, ResTab } from '../../pi_sys/modules/util/res_mgr';
import { getFile } from '../../pi_sys/setup/depend';
import { loadAudioRes, RES_TYPE_AUDIO } from '../device/audio';
import { HttpDownload } from '../feature/http';
import { loadRes } from '../load/app';
import { loadBlobRes2 } from './bloburl';

// ============================== 导出
export let globalSoundResTab: SoundResTab;

let domainUrls: string[];
let domainPath: string;

/**
 * @description 声音状态类型
 */
export enum StateType {
    INIT = 0, // 初始化
    READY, // 就绪
    PLAY, // 播放
    PAUSE // 暂停
}

export type StepType = 'linear' | 'quadIn' | 'quadOut' | 'quadInOut';

/**
 * 背景音乐
 */
class BGMAudio {
    public src: HTMLAudioElement;	// 源
    public volume: number;	// 音量
    public stepTime: number;	// 渐进时间
    public stepType: StepType;	// 渐进方式
    constructor(src: HTMLAudioElement, volume: number, stepTime: number, stepType: StepType) {
        this.src = src;
        this.volume = volume;
        this.stepTime = stepTime;
        this.stepType = stepType;
    }
}

/**
 * 背景音乐使用audio标签播放，只存在一个，每次切换音乐场景时，在点击事件中触发
 * ios 的交互操作不能放在回调中，故而只能采用使用相对资源路径
 */
export class BGMusic {
    /**
     * 当前播放音乐的路径
     */
    private path: string = null;

    /**
     * 音乐节点，不用重复创建
     */
    private audioMap: Map<string, BGMAudio> = new Map();

    /**
     * 资源服务器cdn（实例化时设置）
     */
    private server: string = null;

    /**
     * 静音，用于设置
     */
    private muted: boolean = false;
    /**
     *
     * @param s 资源服务器 PI.server
     */
    constructor(s: string) {
        this.server = s;
    }

    /**
     * 创建播放
     * @param path 资源路径
     * @param volume 音量
     * @param loop 循环
     * @param stepTime 渐进时间
     * @param stepType 渐进类型
     */
    public play(path: string, volume: number = 1, loop: boolean = true, stepTime: number = 0, stepType?: StepType) {
        if (!this.server) {
            throw new Error('set server first!');
        }
        if (this.muted) {
            console.warn('muted set');

            return;
        }
        if (path === this.path) {
            console.warn(`${path} is playing`);

            return;
        }
        // 停止当前资源
        this.stop();

        let a = this.audioMap.get(path);
        if (a) {
            this.path = path;
            a.volume = volume;
            a.stepTime = stepTime;
            a.stepType = stepType;
            a.src.play();
        } else {
            // 创建新的资源
            this.path = path;
            const audio = new Audio();
            // // audio.src = this.server + "dst/" + path;
            // if (isWXMiniGame) {
            //     pi_modules["pi/minigame/adapter"].exports.getLocalResPath(path, (localPath) => {
            //         audio.src = localPath;
            //     }, (err) => {
            //         audio.src = this.server + path;
            //     });
            // } else {
            //     audio.src = this.server + path;
            // }

            loadAudioRes(globalSoundResTab, path, audio).then((res) => {
                //
            });
            audio.loop = loop;

            // const m = this;
            audio.oncanplay = () => {
                audio.play();
            };
            if (!loop) {
                audio.onended = () => {
                    // m.path = null;
                };
            }

            a = new BGMAudio(audio, volume, stepTime, stepType);

            this.audioMap.set(path, a);
            audio.load();
        }
    }

    /**
     * 停止
     */
    public stop() {
        if (!this.path) {
            return;
        }

        const now = this.audioMap.get(this.path);
        if (!now) {
            console.warn(`${this.path} not found`);

            return;
        }

        now.src.pause();
        this.audioMap.delete(this.path);
        // now.src.currentTime = 0;
        this.path = null;
    }

    /**
     * 暂停
     */
    public pause(path: string) {
        const a = this.audioMap.get(path);
        if (!a) {
            console.warn(`${this.path} not found`);

            return;
        }
        a.src.pause();

    }

    /**
     * 设置静音
     */
    public setMuted(muted: boolean) {
        this.muted = muted;
        this.stop();
    }

}

/**
 * @description 声音
 * @example
 */
class Sound {
    public res: Res = null;
    public src: AudioBufferSourceNode = null;
    public volume: GainNode = null;
    public playTime: number = 0;
    public pauseTime: number = 0;
    public onended: Function = null;

    /**
     * 暂停
     */
    public getState(): StateType {
        if (!this.res) {
            return StateType.INIT;
        }
        if (this.playTime) {
            return StateType.PLAY;
        }
        if (this.pauseTime) {
            return StateType.PAUSE;
        }

        return StateType.READY;
    }
    /**
     * 获取声音时长
     */
    public getDuration(): number {
        if (!this.res) {
            return -1;
        }

        return this.res.link.duration;
    }
    /**
     * 播放声音
     */
    public play(volume?: number, delay?: number, offset?: number): void {
        if ((!this.res) && this.playTime) {
            return;
        }
        let s: AudioBufferSourceNode;
        // if (isWXMiniGame) {
        //     s = this.src = context;
        //     s.buffer = s.src = this.res.link;
        //     // TODO: 现在还没有实现start方法的delay和offset参数，后续实现
        //     s.start = s.play;
        // } else {
        //     s = this.src = context.createBufferSource();
        //     s.buffer = this.res.link;
        //     this.volume = context.createGain();
        //     this.volume.gain.value = volume || 1;
        //     s.connect(this.volume);
        //     this.volume.connect(context.destination);
        // }

        s = this.src = SoundResTab.context.createBufferSource();
        s.buffer = (<AudioBuffer>this.res.link);
        this.volume = SoundResTab.context.createGain();
        this.volume.gain.value = volume || 1;
        s.connect(this.volume);
        this.volume.connect(SoundResTab.context.destination);

        delay = delay ? SoundResTab.context.currentTime + delay : 0;
        offset = offset || this.pauseTime;
        s.start(delay, offset);
        this.playTime = SoundResTab.context.currentTime + delay - offset;
        this.pauseTime = 0;
        const func = this.onended;

        if (!func) {
            return;
        }

        s.onended = (ev) => {
            this.playTime = 0;
            if (this.onended === func) {
                func(this, ev);
            }
        };
    }
    /**
     * 暂停
     */
    public pause(): void {
        if ((!this.src) && !this.playTime) {
            return;
        }
        this.src.stop();
        this.pauseTime = SoundResTab.context.currentTime - this.playTime;
        if (this.pauseTime < 0) {
            this.pauseTime = 0;
        }
        this.playTime = 0;
    }
    /**
     * 停止
     */
    public stop(): void {
        if ((!this.src) && !this.playTime) {
            return;
        }
        this.src.stop();
        this.playTime = this.pauseTime = 0;
    }
    /**
     * 销毁
     */
    public destroy(): void {
        if (!this.res) {
            return;
        }
        if (this.volume) {
            this.volume.disconnect();
        }
        this.res = null;
    }

}

/**
 * @description 声音管理器
 * @example
 */
export class SoundResTab extends ResTab {
    public static context: AudioContext;
    // 当前播放的声音数组
    public arr: SoundCfg[] = [];
    // 音量， 0-1之间
    public volume: number = 1;

    /**
     * 播放指定的声音
     * @param src 声音的文件名
     */
    public play(src: string, delay?: number, repeat?: number, repeatDelay?: number): void {
        if (!SoundResTab.context) {
            return;
        }

        const name = `${RES_TYPE_AUDIO}:${src}`;
        const cfg = new SoundCfg();

        cfg.mgr = this;
        cfg.startTime = SoundResTab.context.currentTime;
        cfg.delay = delay || 0;
        cfg.repeat = repeat || 0;
        cfg.repeatDelay = repeatDelay || 0;

        this.arr.push(cfg);

        loadAudioRes(globalSoundResTab, src).then((res) => {
            if (!cfg.mgr) {
                return globalSoundResTab.delete(res);
            }

            SoundResTab.context.decodeAudioData(
                res.link,
                (buffer) => {
                    play(cfg, <any>{ link: buffer });
                }, (err) => {
                    console.warn(name, {
                        error: 'SOUND_DECODE_ERROR',
                        reason: `decode fail: ${err}`
                    });
                }
            );

            // play(cfg, res);
        });

        // return this.load(name, RES_TYPE_AUDIO, src, undefined, (res) => {
        //     if (!cfg.mgr) {
        //         return this.delete(res);
        //     }
        //     play(cfg, res);
        // }, (error) => {
        //     throw new Error(`play failed, src = ${src}, error = ${error.reason}`);
        // });
    }
    /**
     * 设置音量
     */
    public getVolume(): number {
        return this.volume;
    }
    /**
     * 设置音量
     */
    public setVolume(v: number): void {
        if (v < 0) {
            v = 0;
        } else if (v > 1) {
            v = 1;
        }
        this.volume = v;
        for (const c of this.arr) {
            c.sound.volume.gain.value = v;
        }
    }
    /**
     * 暂停或取消暂停所有的声音
     */
    public pause(b: boolean): void {
        if (b) {
            for (const c of this.arr) {
                c.sound.pause();
            }
        } else {
            for (const c of this.arr) {
                c.sound.play(c.delay);
            }
        }
    }
    /**
     * 停止所有的声音
     */
    public stop(): void {
        for (const c of this.arr) {
            c.mgr = null;
            if (!c.sound) {
                continue;
            }
            this.delete(c.sound.res);
            c.sound.destroy();
        }
        this.arr.length = 0;
    }
    /**
     * 释放资源表
     */
    public release(): boolean {
        if (!super.release()) {
            return false;
        }
        this.stop();

        return true;
    }
}

// ============================== 本地
// 声音配置
export class SoundCfg {
    public mgr: SoundResTab = null; // null 表示被销毁
    public sound: Sound = null;
    public delay: number = 0;
    public repeat: number = 0;
    public repeatDelay: number = 0;
    public startTime: number = 0;
}

// 播放声音
const play = (cfg: SoundCfg, res: Res) => {
    const sound = new Sound();
    sound.res = res;
    cfg.sound = sound;
    sound.onended = () => {
        const mgr = cfg.mgr;
        if (!mgr) {
            return;
        }
        if (cfg.repeat < 1) {
            cfg.mgr = null;
            sound.destroy();
            mgr.delete(res);

            return ''; // arrDrop(mgr.arr, cfg);
        }
        cfg.repeat--;
        sound.play(mgr.volume, cfg.repeatDelay);
    };

    const d = cfg.delay + cfg.startTime - SoundResTab.context.currentTime;
    sound.play(cfg.mgr.volume, d > 0 ? d : 0);
};
// 解码音频
// tslint:disable:no-reserved-keywords
const decode = (ab: ArrayBuffer, name: string, type: string, file: string, construct: Function): Promise<AudioBuffer> => {
    if (ab.byteLength === 0) {
        return Promise.reject(() => {
            console.warn(name, {
                error: 'SOUND_ZERO_SIZE',
                reason: `decode fail: ${file}`
            });
        });
        // return console.warn(name, {
        //     error: 'SOUND_ZERO_SIZE',
        //     reason: `decode fail: ${file}`
        // });
    }
    // if (isWXMiniGame) {
    //     pi_modules["pi/minigame/adapter"].exports.getLocalResPath(file, (localPath) => {
    //         loadOK(name, type, file, construct, localPath);
    //     }, (err) => {
    //         console.warn(name, {
    //             error: 'SOUND_FILE_DOWNLOAD_ERROR',
    //             reason: `decode fail: ${err}`
    //         });
    //     });
    //     return;
    // }

    // SoundResTab.context.decodeAudioData(ab, (buffer) => {
    //     loadOK(name, type, file, construct, buffer);
    // }, (e) => {
    //     console.warn(name, {
    //         error: 'SOUND_DECODE_ERROR',
    //         reason: `decode fail: ${e}`
    //     });
    // });

    return new Promise((resolve, reject) => {
        SoundResTab.context.decodeAudioData(
            ab,
            (buffer) => {
                resolve(buffer);
            }, (err) => {
                console.warn(name, {
                    error: 'SOUND_DECODE_ERROR',
                    reason: `decode fail: ${err}`
                });
            }
        );
    });
};
/**
 * @description 创建声音资源
 * @example
 */
const createSoundRes = (name: string, type: string, file: string, fileMap: Map<string, ArrayBuffer>, construct: Function): Promise<AudioBuffer> => {
    if (!SoundResTab.context) {
        return Promise.reject(() => {
            console.warn(name, {
                error: 'not support web audio api',
                reason: `createSoundRes fail: ${file}`
            });
        });
    }
    if (fileMap) {
        const data = fileMap[file];
        if (data) {
            return decode(data, name, type, file, construct);
        }
    }
    const info = getFile(file);

    if (!info) {
        return Promise.reject(() => {
            console.warn(name, {
                error: 'FILE_NOT_FOUND',
                reason: `createSoundRes fail: ${file}`
            });
        });
        // return console.warn(name, {
        //     error: 'FILE_NOT_FOUND',
        //     reason: `createSoundRes fail: ${file}`
        // });
    }
    // if (isWXMiniGame) {
    //     pi_modules["pi/minigame/adapter"].exports.getLocalResPath(file, (localPath) => {
    //         loadOK(name, type, file, construct, localPath);
    //     }, (err) => {
    //         console.warn(name, {
    //             error: 'SOUND_FILE_DOWNLOAD_ERROR',
    //             reason: `decode fail: ${err}`
    //         });
    //     });
    //     return;
    // }
    // const down = load.create([info], (r) => {
    //     return decode(r[file], name, type, file, construct);
    // }, (err) => {
    //     console.warn(name, err);
    // });
    // load.start(down);
    const down = new HttpDownload(domainUrls, `${domainPath}${info.path}?${info.sign}`, 1000, 1);
    down.onprocess = () => {

    };

    return new Promise((resolve, reject) =>  {
        down.start().then((ab: ArrayBuffer) => {
            decode(ab, name, type, file, construct).then((res) => {
                resolve(res);
            });
        }).catch((err) => {
            cc.info() && log(err);
            reject(err);
        });
    });
};

// ============================== 立即执行

// // 创建音频环境
// const context = (() => {
//     const c = ((<any>window).AudioContext || (<any>window).webkitAudioContext);
//     if (c) {
//         return new c();
//     }
//     console.log('not support web audio api');
// })();

export const initSoundLoad = (urls: string[], downPath: string) => {
    domainUrls = urls;
    domainPath = downPath;

    SoundResTab.context = new AudioContext();
    globalSoundResTab = new SoundResTab();
};
