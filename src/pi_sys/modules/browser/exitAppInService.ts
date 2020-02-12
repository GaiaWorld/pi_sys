/**
 * 最终返回
 */
// ============================== 导入
import { NativeObject, ParamType, registerSign } from './native';
// ============================== 导出
export class ExitAppInService extends NativeObject {
    /**
     * 重启app
     * @param param 
     */
    public static restart() {
        console.log('调用底层重启方法');
        exitAppInService.call('restart', {});
    }
    
    /**
     * 退出APP，关闭应用
     * @param param 
     */
    public exitApplication(param: any) {
        exitAppInService.call('confirmExit', param);
    }
    
    /**
     * 返回桌面。将应用退到后台
     * @param param 
     */
    public ToHome(param: any) {
        exitAppInService.call('backToHome', param);
    }
}

// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(ExitAppInService, {
    restart: [],
    confirmExit: [],
    backToHome: []
});
const exitAppInService = new ExitAppInService();
exitAppInService.init();