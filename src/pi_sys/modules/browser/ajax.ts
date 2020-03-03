/**
 * XMLHttpRequest 封装
 * 
 * 属性
 * 1. onreadystatechange       当readyState属性发生变化时调用的EventHandler。
 * 2. readyState               返回 一个unsigned short 即无符号短整型，请求的状态码。
 * 3. responseText             返回一个DOMString，该DOMString包含对请求的响应，如果请求未成功或尚未发送，则返回null。
 * 4. timeout                  unsigned long 即无符号长整型，表示该请求的最大请求时间（毫秒），超过该时间请求会自动结束。
 * 5. ontimeout                当请求超时调用的EventHandler。
 * 
 * 方法
 * 1. open()                   初始化一个请求 
 * 2. send()                   发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。
 * 3. setRequestHeader()       设置HTTP请求头的值。您必须在open()之后、send()之前调用setRequestHeader()这个方法。
 */

declare var pi_modules;

 /**
  * readyState状态码
  */
export enum ReadyState {
    UNSENT = 0,                // 代理被创建，但尚未调用 open() 方法。
    OPENED = 1,                // open() 方法已经被调用
    HEADERS_RECEIVED = 2,      // send() 方法已经被调用，并且头部和状态已经可获得。
    LOADING = 3,               // 下载中； responseText 属性已经包含部分数据。 
    DONE = 4                   // 下载操作已完成。
}

type Method = 'GET' | 'POST';   // 请求方式 

class XMLHttpRequest {
    public timeout:number = 10 * 1000;                             // 超时时间  实际无效 底层写死了
    public ontimeout:Function;                                     // 超时回调
    public onreadystatechange:Function;                            // readyState改变回调
    private readyState:ReadyState = ReadyState.UNSENT;             // readyState
    private responseText:string = '';                              // 响应文本
    private method:Method = 'GET';                                 // 请求方法
    private url:string;                                            // 请求url
    private async:boolean = true;                                  // 同步 or 异步  只支持异步
    private reqHeader:any = { 'Content-Type':'application/json' }; // 请求头

    /**
     * XMLHttpRequest.open() 方法初始化一个请求。
     */
    public open(method:Method = 'GET', url:string, async:boolean = true) {
        this.setReadyState(ReadyState.OPENED);
        this.method = method;
        this.url = url;
        this.async = async;
    }

    /**
     * 方法用于发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；
     * 如果是同步请求，则此方法直到响应到达后才会返回。
     * XMLHttpRequest.send() 方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。
     */
    public send(body?:any) {
        this.setReadyState(ReadyState.HEADERS_RECEIVED);
        if (this.method === 'GET') {
            pi_modules.ajax.exports.get(this.url,undefined,body,'string',pi_modules.ajax.exports.RESP_TYPE_TEXT,(res) => {
                console.log(`XMLHttpRequest GET ${this.url} success===`,res);
                this.responseText = res;
                this.setReadyState(ReadyState.DONE);
            },(err) => {
                console.log(`XMLHttpRequest GET ${this.url} err===`,err);
                this.responseText = err;
                this.setReadyState(ReadyState.DONE);
            },(res) => {
                this.responseText = res;
                this.setReadyState(ReadyState.LOADING);
            });
        } else if (this.method === 'POST') {
            // tslint:disable-next-line:max-line-length
            pi_modules.ajax.exports.post(this.url,this.reqHeader,body,'string',this.reqHeader['Content-Type'],pi_modules.ajax.exports.RESP_TYPE_TEXT,(res) => {
                console.log(`XMLHttpRequest POST ${this.url} success===`,res);
                this.responseText = res;
                this.setReadyState(ReadyState.DONE);
            },(err) => {
                console.log(`XMLHttpRequest POST ${this.url} err===`,err);
                this.responseText = err;
                this.setReadyState(ReadyState.DONE);
            },(res) => {
                this.responseText = res;
                this.setReadyState(ReadyState.LOADING);
            });
        }
    }

    /**
     * XMLHttpRequest.setRequestHeader() 是设置HTTP请求头部的方法。
     * 此方法必须在  open() 方法和 send()   之间调用。
     * 如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
     */
    public setRequestHeader(header:string, value:string) {
        if (this.readyState !== ReadyState.OPENED) return;
        this.reqHeader[header] = value;
    }

    /**
     * readySate改变
     */
    private setReadyState(readyState:ReadyState) {
        this.readyState = readyState;
        this.onreadystatechange && this.onreadystatechange(this.responseText);
    }
}

window.XMLHttpRequest = window.XMLHttpRequest ? window.XMLHttpRequest : XMLHttpRequest;