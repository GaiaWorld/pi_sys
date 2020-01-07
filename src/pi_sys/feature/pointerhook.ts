/**
 * 对屏幕事件进行监控
 * * 项目配置 监控名称 - 监控号码 - 监控响应事件
 * * 监控号码: 全为 '1' 预制为清除所有监控的响应
 * * 数字键盘:
 *     +--------+----------+--------+
 *     |        |          |        |
 *     |        |          |        |
 *     |   1    |    2     |   3    |
 *     |        |          |        |
 *     |        |          |        |
 *     +----------------------------+
 *     |        |          |        |
 *     |        |          |        |
 *     |   4    |     5    |    6   |
 *     |        |          |        |
 *     |        |          |        |
 *     +----------------------------+
 *     |        |          |        |
 *     |        |          |        |
 *     |    7   |     8    |    9   |
 *     |        |          |        |
 *     |        |          |        |
 *     +----------------------------+
 *     |        |          |        |
 *     |        |          |        |
 *     |        |          |        |
 *     |        |          |        |
 *     +--------+----------+--------+
 */

export interface PointerHookCfg {
    hname: string;
    /**
     * 号码 1-9 的数字字符串，长度固定为 PointerHook.CODE_LENGTH
     */
    hcode: string;
    /**
     * 事件取消
     */
    hquit: Function;
    /**
     * 事件激活
     */
    hactive: Function;
}

// tslint:disable-next-line:no-unnecessary-class
export class PointerHook {
    /**
     * 设定号码长度
     */
    public static CODE_LENGTH: number = 10;

    /**
     * 设定号码响应的最大等待时间
     * @description 超过该时间没有事件响应，则清除所有号码记录
     */
    public static WAIT_MAX_TIME: number = 10000;
    public static QUIT_CODE: string = '1111111111';
    public static lastDownTime: number = 0;
    public static hookMap: Map<string, PointerHookCfg> = new Map();
    private static recordCodes: number[] = [];

    /**
     * 项目接入事件响应的入口
     * @param x 0-1
     * @param y 0-1
     */
    public static downFire = (x: number, y: number) => {
        const now = Date.now();

        if (now - PointerHook.lastDownTime >= PointerHook.WAIT_MAX_TIME) {
            PointerHook.clearCodes();
        }

        const code = PointerHook.formatCode(x, y);
        PointerHook.recordCodes.push(code);
        if (PointerHook.recordCodes.length > PointerHook.CODE_LENGTH) {
            PointerHook.recordCodes.shift();
        }

        if (PointerHook.recordCodes.length === PointerHook.CODE_LENGTH) {
            const codes = PointerHook.recordCodes.join('');
            PointerHook.check(codes);
        }

        PointerHook.lastDownTime = Date.now();
    }
    /**
     * 添加hook
     * @param cfg hook 配置
     */
    public static addHook(cfg: PointerHookCfg) {
        this.hookMap.set(cfg.hcode, cfg);
    }
    /**
     * 监听检查
     * @param code 号码
     */
    private static check(code: string) {

        if (this.QUIT_CODE === code) {
            this.quit();
            this.clearCodes();
        } else {
            const cfg = this.hookMap.get(code);

            if (cfg) {
                try {
                    cfg.hactive();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
    /**
     * 清空号码记录
     */
    private static clearCodes() {
        this.recordCodes.length = 0;
    }
    /**
     * 退出所有监听响应
     */
    private static quit() {
        this.hookMap.forEach((cfg) => {
            try {
                cfg.hquit();
            } catch (err) {
                console.error(err);
            }
        });
    }
    /**
     * 计算当前号码
     * @param x x
     * @param y y
     */
    private static formatCode(x: number, y: number) {
        return Math.floor(x / 0.33) + Math.floor(y / 0.25) * 3 + 1;
    }
}
/**
 * 对屏幕事件进行监控
 * * 项目配置 监控名称 - 监控号码 - 监控响应事件
 * * 监控号码: 为 '0123456780' 预制为清除所有监控的响应
 * * 数字键盘: 
 *     +--------+----------+--------+
 *     |        |          |        |
 *     |        |          |        |
 *     |   0    |    1     |   2    |
 *     |        |          |        |
 *     |        |          |        |
 *     +----------------------------+
 *     |        |          |        |
 *     |        |          |        |
 *     |   3    |     4    |    5   |
 *     |        |          |        |
 *     |        |          |        |
 *     +----------------------------+
 *     |        |          |        |
 *     |        |          |        |
 *     |    6   |     7    |    8   |
 *     |        |          |        |
 *     |        |          |        |
 *     +----------------------------+
 *     |        |          |        |
 *     |        |          |        |
 *     |        |          |        |
 *     |        |          |        |
 *     +--------+----------+--------+
 */

export interface PointerHookCfg {
    hname: string;
    /**
     * 号码 0-8的数字字符串，长度固定为 PointerHook.CODE_LENGTH
     */
    hcode: string;
    /**
     * 事件取消
     * @descript 可以通过设置另一个号码的 hactive 来作为退出
     */
    hquit?: Function;
    /**
     * 事件激活
     */
    hactive: Function;
}

// tslint:disable-next-line:no-unnecessary-class
export class PointerHook {
    /**
     * 设定号码长度 - 项目如果修改 CODE_LENGTH 需要同时修改 QUIT_CODE
     */
    public static CODE_LENGTH: number = 10;

    /**
     * 设定号码响应的最大等待时间
     * @description 超过该时间没有事件响应，则清除所有号码记录
     */
    public static WAIT_MAX_TIME: number = 1000;
    /**
     * 项目如果修改 CODE_LENGTH 需要同时修改 QUIT_CODE
     */
    public static QUIT_CODE: string = '0123456780';
    private static lastDownTime: number = 0;
    private static hookMap: Map<string, PointerHookCfg> = new Map();
    private static recordCodes: number[] = [];

    /**
     * 项目接入事件响应的入口
     * @param x 0-1
     * @param y 0-1
     */
    public static downFire = (x: number, y: number) => {
        const now = Date.now();

        if (now - PointerHook.lastDownTime >= PointerHook.WAIT_MAX_TIME) {
            PointerHook.clearCodes();
        }

        const code = PointerHook.formatCode(x, y);
        if (code >= 0 && code <= 8) {
            PointerHook.recordCodes.push(code);
            if (PointerHook.recordCodes.length > PointerHook.CODE_LENGTH) {
                PointerHook.recordCodes.shift();
            }
    
            if (PointerHook.recordCodes.length === PointerHook.CODE_LENGTH) {
                const codes = PointerHook.recordCodes.join('');
                PointerHook.check(codes);
            }
    
            PointerHook.lastDownTime = Date.now();
        }
    }
    /**
     * 添加hook
     * @param cfg hook 配置
     */
    public static addHook(cfg: PointerHookCfg) {
        this.hookMap.set(cfg.hcode, cfg);
    }
    /**
     * 监听检查
     * @param code 号码
     */
    private static check(code: string) {

        if (this.QUIT_CODE === code) {
            this.quit();
            this.clearCodes();
        } else {
            const cfg = this.hookMap.get(code);
    
            if (cfg) {
                try {
                    cfg.hactive && cfg.hactive();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
    /**
     * 清空号码记录
     */
    private static clearCodes() {
        this.recordCodes.length = 0;
    }
    /**
     * 退出所有监听响应
     */
    private static quit() {
        this.hookMap.forEach((cfg) => {
            try {
                cfg.hquit && cfg.hquit();
            } catch (err) {
                console.error(err);
            }
        });
    }
    /**
     * 计算当前号码
     * @param x x
     * @param y y
     */
    private static formatCode(x: number, y: number) {
        return Math.floor(x / 0.33) + Math.floor(y / 0.25) * 3;
    }
}