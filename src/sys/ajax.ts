export const RESP_TYPE_BIN = 'bin';
export const RESP_TYPE_JSON = 'json';
export const RESP_TYPE_TEXT = 'text';

export const ERR_ABORT = "ERR_ABORT";
export const ERR_TIMEOUT = "ERR_TIMEOUT";
export const ERR_ARGS = "ERR_ARGS";
export const ERR_NORMAL = "ERR_NORMAL";
export const ERR_LOCATION = "ERR_LOCATION";
export const ERR_JSON = "ERR_JSON";

export interface ProcessFunc {
	(url:string, type: string, total:number, loaded: number, data?: any): void
}

/**
 * @description URL增加参数
 * @exampleexport const 
 */
export const seedUrl= (url:string, seed?:string) => {
	if(!seed)
		seed = ""+Math.random();
	return (url.indexOf("?") > 0) ? url + "&" + seed : url + "?" + seed;
}

/**
 * @description 参数化对象数据
 * @return {string} 被encodeURIComponent编码过的&=分隔的字符串， "Content-Type":"application/x-www-form-urlencoded"
 * @example
 */
export const param = (data: any): string => {
	let arr = [];
	for (let k in data) {
		if (!data.hasOwnProperty(k))
			continue;
		let v = data[k];
		if (v === undefined) {
			v = "undefined";
		} else if (v === null) {
			v = "null";
		} else if (typeof v === typeof "") {
			v = encodeURIComponent(v);
		} else if (typeof v === typeof 0) { } else {
			v = encodeURIComponent(JSON.stringify(v));
		}
		arr.push(encodeURIComponent(k), "=", v, "&");
	}
	if (arr.length > 0)
		arr.length--;
	return arr.join("");
}

export class AjaxRequest {
	public readonly type : string;
	public readonly url : string;
	public promise: Promise<string|ArrayBuffer|any>;
	public onprocess: ProcessFunc;
	readonly xhr = new XMLHttpRequest();

	public constructor(type: string, url: string) {
		this.type = type;
		this.url = url;
	}
	public request(headers: any, reqData:string|ArrayBuffer|FormData, respType:string, timeout: number) {
		return Promise.resolve("")
	}
	public abort() {
		this.xhr.abort();
	}
}
/**
 * @description GET方法
 * @example
 */
export const get= (url:string, headers: any, reqData: any, respType:string, timeout: number) => {
	if (reqData !== null && typeof reqData === "object") {
		reqData = param(reqData);
		url = (url.indexOf("?") > 0) ? url + "&" + reqData : url + "?" + reqData;
	}
	let ar = new AjaxRequest('GET', url);
	return ar.request(headers, undefined, respType, timeout);
}

/**
 * @description POST方法
 * @example
 */
export const post= (url:string, headers: any, reqData:string|ArrayBuffer|FormData, contentType:string, respType:string, timeout: number) => {
	headers = headers || {};
	headers["Content-Type"] = contentType;
	let ar = new AjaxRequest('POST', url);
	return ar.request(headers, reqData, respType, timeout);
}

export class AjaxError extends Error {
	public readonly url: string;
	public readonly type: string;
	public readonly reason: string;
	public readonly ev: Event;
	public constructor(url: string, type: string, reason: string, ev?: Event) {
		super(reason);
		this.url = url;
		this.type = type;
		this.reason = reason;
		this.ev = ev;
	}
}

export class AjaxDownload {
	urls: string[];
	path: string;
	timeout: number;
	total: number;
	loaded: number;
	request: AjaxRequest;
	public onprocess: ProcessFunc;

	public constructor(urls: string[], path: string, timeout: number, total?: number) {
		this.urls = urls;
		this.path = path;
		this.timeout = timeout;
		this.total = total || 0;
	}
	public start() {
		return new Promise((resolve, reject) => {
			download(this, resolve, reject, 0);
		});
	}
	public abort() {
		this.request.abort();
	}
}

// 下载, 如果是微信这类没有进度信息的，需要重写该代码，用统计的网速和设置的total模拟进度信息
const download = (load: AjaxDownload, resolve: (value?: unknown) => void, reject: (reason?: any) => void, retry: number, err?: AjaxError) => {

};
