/**
 * 最终返回
 */
// ============================== 导入
import { NativeObject, ParamType, registerSign } from './native';
// ============================== 导出
export class ExitApp extends NativeObject {
    /**
     * 重启app
     * @param param 
     */
	public static restart() {
		exitAPP.call('restart', {});
	}
    
    /**
     * 退出APP，关闭应用
     * @param param 
     */
	public exitApplication(param: any) {
		exitAPP.call('confirmExit', param);
	}
    
    /**
     * 返回桌面。将应用退到后台
     * @param param 
     */
	public ToHome(param: any) {
		exitAPP.call('backToHome', param);
	}
}

// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(ExitApp, {
	restart: [],
	confirmExit: [],
	backToHome: []
});
const exitAPP = new ExitApp();
exitAPP.init();