/**
 * 日志框架， 需要在构建时，将模块名和cc.xxx()的参数进行混合。 
 * 可以在外部通过路径匹配来配置来决定指定模块及其等级。
 * 应该在应用中，通过特定区域的连续点击来升高或降低全局日志等级。
 * 应该在应用中，通过特定区域的连续点击来开启，日志显示界面，并可以注册新的模块路径匹配。
 * 应该在应用中，通过特定区域的连续点击来开启FPS等性能的显示。
 * 
 * 项目中一般的写法： 
 * import {cc, log} from './log';
 * cc.debug() && log("user: ", user, 2);
 * cc.debug("modify") && log("user: ", user, 2, arr);
*/

export enum LogLevel {
	debug = 1,
	info,
	warn,
	error,
	none,
}

/**
 * 外部可设置的全局日志级别
 */
export let logLevel = LogLevel.info;

/**
 * 模式匹配。
 * 给定目录的pattern，生成对应的正则表达式
 * pattern的模式：*, **
 * 星号*，匹配除 斜杠 的东西；
 * 星星号*，匹配 0层 或 多层 斜杠 /
 */
export const pattern = (p: string) : RegExp => {
	let str = "";
	let arr = p.split("/");
	for (let i = 0; i < arr.length; ++i) {
		let p = arr[i];
		if (p === "**") {
			str += "(?:(.*)\\\/)?";
		} else {
			// 将所有的*替换掉
			p = p.replace(/\./g, "\\\.");
			p = p.replace(/\*/g, "([^/]*)");

			str += p;
			if (i + 1 < arr.length) {
				str += "\\\/";
			}
		}
	}
	return new RegExp("^" + str + "$", "g");
}
/**
 * 根据配置设置日志级别
 */
export const init = (cfg: any) => {
	for(let k in cfg) {
        if(cfg.hasOwnProperty(k))
            set(k, cfg[k])
    }
}

/**
 * 设置模块名的模式匹配及对应的日志级别，后设置会覆盖前面的设置。
 * 支持**, *。
 */
export const set = (p: string, level: LogLevel) =>{
	let r = pattern(p);
	patternMap.set(p, {reg: r, level: level});
	for(let [k, v] of logMap) {
		if(r.test(k)){
			v.pattern = p;
			v.level = level;
		}
	}
}
export const debug = (mod?: string) =>{
	return check(LogLevel.debug, mod);
}
export const info = (mod?: string) =>{
	return check(LogLevel.info, mod);
}
export const warn = (mod?: string) =>{
	return check(LogLevel.warn, mod);
}
export const error = (mod?: string) =>{
	return check(LogLevel.error, mod);
}
export const cc = {
	debug: debug,
	info: info,
	warn: warn,
	error: error,
}

export const check = (level: LogLevel, mod?: string) => {
	if (logLevel > level || !console || !mod)
		return false;
	let r = logMap.get(mod);
	if (!r) {
		// 匹配最后的设置
		r = {pattern: "", level: LogLevel.none};
		for(let [k, v] of patternMap) {
			if(v.reg.test(mod)) {
				r.pattern = k;
				r.level = v.level;
			}
		}
		logMap.set(mod, r);
	}
	if(r.level > level)
		return false;
	lastLevel = level;
	lastMod = mod;
}
/**
 * 该方法支持重新设置， 已支持扩展
 */
export let log = (msg:any, ...args: any[]): void => {
	consoleLog[lastLevel - LogLevel.debug](lastMod, Date.now() / 1000, msg, args);
};

const logMap: Map<string, {pattern: string, level: LogLevel}>=new Map;// 日志表

const patternMap: Map<string, {reg: RegExp, level: number}>=new Map;// 匹配表

const consoleLog = [console.debug, console.info, console.warn, console.error];

let lastLevel = LogLevel.debug;
let lastMod = "";

