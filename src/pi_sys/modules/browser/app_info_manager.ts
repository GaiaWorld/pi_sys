
// ============================== 导入
import { NativeObject, ParamType, registerSign } from './native';
// ============================== 导出

/**
 * app管理器
 */
export class AppInfoManager extends NativeObject {
	constructor() {
		super();
		this.init();
	}

	/**
	 * 下载在服务器上有的apk
	 * @param info 下载apk所需信息
	 * @param callback 过程回调，total总大小，current当前下载
	 * @param success 成功回调 file_path下载完成的本地地址
	 * @param fail 失败回调
	 */
	public luanchDownLoadApp(info: AppInfo, callback:(total: number, current: number)=>void, success:(file_path: string)=>void, fail){
		let infoString = JSON.stringify(info);
		this.call("luanchDownLoadApp",{infoString, callback, success, fail})
	}

	/**
	 * 取消下载 没有失败回调，如果当前没有下载任务还是返回成功
	 * @param success 成功回调 
	 */
	public cannelDownLoadApp(success){
		this.call("cannelDownLoadApp",{success})
	}

	/**
	 * 安装下载好的apk
	 * @param filePath apk下载地址 
	 */
	public installDownloadApp(filePath: string){
		this.call("installDownloadApp",{filePath})
	}

	/**
	 * 获取本地下载进度信息
	 * @param appPkg apk包名
	 * @param successful 获取成功回调
	 * @param failure 获取失败 （当前包名的包未下载）
	 */
	public getLocalDownLoadInfo(appPkg: string, successful:(info: AppInfo)=>void, failure){
		let success = (info: string) => {
			if(info == ""){
				failure("app is not download now")
			}else{
				let appInfo = <AppInfo>JSON.parse(info)
				successful(appInfo)
			}
		}
		this.call("getLocalDownLoadInfo",{appPkg, success})
	}

	/**
	 * 删除上次下载缓存
	 * @param appPkg apk包名 
	 * @param success 删除成功
	 * @param fail 删除失败
	 */
	public removeLocalDownLoadFile(appPkg: string, success, fail){
		this.call("removeLocalDownLoadFile",{appPkg, success, fail})
	}

	/**
	 * 获取网络状态
	 * @param success netWorkStatus 网络状态 string （没有网络 wifi 2G 3G 4G 手机流量）
	 */
	public getNetWorkStatus(success:(network: NetWork)=>void){
		this.call("getNetWorkStatus",{success})
	}

	/**
	 * 获取手机上安装的所有apk包
	 * @param successful 成功回调，app_names 所有包包名
	 */
	public getInstallAppGame(successful:(app_names: string[])=>void){
		let success = (apps: string) => {
			let names = apps.split(',')
			successful(names)
		}
		this.call("getInstallAppGame",{success})
	}

	/**
	 * 获取手机安装的应用商店
	 * @param markets_list 接受配置的应用商店包名
	 * @param successful 成功回调：install_markets: 手机上安装的应用商店与配置中的应用商店的并集
	 */
	public getInstallAppMarket(markets_list: string[],successful:(install_markets: string[])=>void){
		let markets = markets_list.join(',')
		let success = (apps: string) => {
			let names = apps.split(',')
			successful(names)
		}
		this.call("getInstallAppGame",{markets, success})
	}

	/**
	 * 跳转到指定app
	 * @param appPkg app包名
	 */
	public launchInstallGame(appPkg: string){
		this.call("launchInstallGame",{appPkg})
	}

	/**
	 * 跳转到应用商店的app详情页
	 * @param appPkg app包名
	 * @param marketPkg 应用商店包名
	 */
	public launchAppDetail(appPkg: string, marketPkg: string){
		this.call("launchAppDetail",{appPkg, marketPkg})
	}
	

}

export enum NetWork{
	NETWORK_NONE = "没有网络",
	NETWORK_WIFI = "wifi",
	NETWORK_2G = "2G",
	NETWORK_3G = "3G",
	NETWORK_4G = "4G",
	NETWORK_MOBILE = "GPRS"
}

export interface AppInfo {
	appPkg: string           // apk包名
    url: string;             // apk下载地址
    version: string;         // apk版本号
    start: number;           // apk已经下载字节数
    end: number;             // apk总长度
}

registerSign(AppInfoManager, {
	luanchDownLoadApp: [
		{
			name: 'infoString',
			type: ParamType.String
		}
	],
	cannelDownLoadApp: [],
	installDownloadApp:[
		{
			name: 'filePath',
			type: ParamType.String
		}
	],
	getLocalDownLoadInfo:[
		{
			name: 'appPkg',
			type: ParamType.String
		}
	],
	removeLocalDownLoadFile:[
		{
			name: 'appPkg',
			type: ParamType.String
		}
	],
	getNetWorkStatus:[],
	getInstallAppGame:[],
	getInstallAppMarket:[
		{
			name: 'markets',
			type: ParamType.String
		}
	],
	launchInstallGame:[
		{
			name: 'appPkg',
			type: ParamType.String
		}
	],
	launchAppDetail:[
		{
			name: 'appPkg',
			type: ParamType.String
		},{
			name: 'marketPkg',
			type: ParamType.String
		}
	]
});
