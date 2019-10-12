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
export const param = (data: any) => {
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
		let ar = this;
		let xhr = ar.xhr;
		if (respType === RESP_TYPE_BIN) {
			xhr.responseType = 'arraybuffer';
		}else if(respType === RESP_TYPE_JSON) {
			xhr.responseType = 'json';
		}
		let activeTime = 0;
		let timerRef = 0;
		// NOTE: 一定不能设置withCredentials，否则跨域变得很严格
		xhr.withCredentials = false;
		return new Promise((resolve, reject) => {
			xhr.onabort= () => {
				if (!xhr) return;
				timeout && clearTimeout(timerRef);
				reject(new AjaxError(ar.url, ERR_ABORT, "abort, " + ar.url));
			};
	
			if (timeout > 0) {
				// 有些(iOS)浏览器版本可能不支持xhr.timeout属性
				// 自己处理超时，超时指超过规定时间没有收到数据
				activeTime = Date.now();
				let timer = () => {
					let t = activeTime + timeout - Date.now();
					if (t > 0) {
						timerRef = setTimeout(timer, t);
					} else {
						// 如处理过就不用管了，否则就设置为处理过了。
						// 必须设置，否则，就会调用两次errorCallback
						if (!xhr) return;
						xhr = null;
						timeout = 0;
						reject(new AjaxError(ar.url, ERR_TIMEOUT, "timeout, " + ar.url));
					}
				};
				timerRef = setTimeout(timer, timeout);
			}
	
			xhr.onerror= (ev) => {
				// 避免定时器超时后重复调用
				if (!xhr) return;
				timeout && clearTimeout(timerRef);
				reject(new AjaxError(ar.url, ERR_NORMAL, "error status: " + xhr.status + " " + xhr.statusText + ", " + ar.url, ev));
			};
	
			xhr.upload.onprogress = (ev) => {
				// 避免定时器超时后重复调用
				if (!xhr) return;
				activeTime = Date.now();
				ar.onprocess && ar.onprocess(ar.url, 'upload', ev.total, ev.loaded);
			};
	
			xhr.onprogress= (ev) =>{
				// 避免定时器超时后重复调用
				if (!xhr) return;
				activeTime = Date.now();
				ar.onprocess && ar.onprocess(ar.url, 'download', ev.total, ev.loaded);
			};
	
			xhr.onload= (ev) => {
				// 避免定时器超时后重复调用
				if (!xhr) return;
				timeout && clearTimeout(timerRef);
	
				if (xhr.status === 300 || xhr.status === 301 || xhr.status === 302 || xhr.status === 303) {
					reject(new AjaxError(ar.url, ERR_LOCATION, xhr.getResponseHeader("Location")));
				} else if (xhr.status !== 0 && xhr.status !== 200 && xhr.status !== 304) {
					// iOS的file协议，成功的状态码是0
					reject(new AjaxError(ar.url, ERR_NORMAL, "error status: " + xhr.status + " " + xhr.statusText + ", " + ar.url, ev));
				} else if (respType === RESP_TYPE_TEXT || !respType) {
					resolve(xhr.responseText);
				} else if (respType === RESP_TYPE_BIN && !xhr.response) {
					resolve(new ArrayBuffer(0));
				} else {
					resolve(xhr.response);
				}
			};
	
			xhr.open(ar.type, ar.url, true);
	
			//传输的文件HTTP头信息， 必须在open之后设置
			if (headers) {
				for (let i in headers) {
					if (headers.hasOwnProperty(i))
						xhr.setRequestHeader(i, headers[i]);
				}
			}
			xhr.send(reqData);
		});
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
		let ad = this;
		return new Promise((resolve, reject) => {
			download(ad, resolve, reject, 0);
		});
	}
	public abort() {
		this.request.abort();
	}
}

// 下载, 如果是微信这类没有进度信息的，需要重写该代码，用统计的网速和设置的total模拟进度信息
const download = (load: AjaxDownload, resolve: (value?: unknown) => void, reject: (reason?: any) => void, retry: number, err?: AjaxError) => {
    if (retry > load.urls.length) {
        return reject(err);
	}
	let ar = new AjaxRequest('GET', load.urls[retry > 0 ? retry - 1 : 0] + load.path);
	let p = ar.request(null, undefined, RESP_TYPE_BIN, load.timeout);
	load.request = ar;
	ar.onprocess = (url:string, type:string, total:number, loaded:number) => {
		if(type === 'upload')
			return;
		load.total = total;
		load.loaded = loaded;
		load.onprocess(load.path, type, total, loaded);
	}
    p.then((value) => {
        resolve(value);
    }).catch((err: AjaxError)=> {
        download(load, resolve, reject, retry + 1, err)
    });
};
