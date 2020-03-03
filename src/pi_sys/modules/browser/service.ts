/**
 * 服务器应用管理
 */
// ============================== 导入
import { addEventListener } from './native';
// ============================== 导出

export class ServiceManager{


	/**
	 * bind事件回应
	 */
	public static resoleBind(webViewName: string, initData: string) {
		(<any>window).sendBindMessage(webViewName, "pi_modules", initData)
	}

	/**
	 * 添加bind监听事件
	 */
	public static bindServiceListener(cb:(webViewName: string, autoToken: string) => void) {
		addEventListener('ServiceAction', 'bind', cb)
	}

	/**
	 * 添加unbind监听事件
	 */
	public static unbindServiceListener(cb:(webViewName: string) => void) {
		addEventListener('ServiceAction', 'unbind', cb)
	}
}
