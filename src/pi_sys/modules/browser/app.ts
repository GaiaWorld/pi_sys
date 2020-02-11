
// ============================== 导入
import { NativeObject, registerSign } from './native';

// ============================== 导出

let appInfo = { 
    name: "",
    version: "",
};

let app: App = null;


export class App extends NativeObject {

	public static getVersion(cb: (error: any, version: string) => void) {
        if (appInfo.version) {
            cb(undefined, appInfo.version);
            return;
        }
            
		App.getInstance().call('getVersion', {
            success(version: string) {
                appInfo.name = version;
                cb(undefined, version);
            },
            fail(errInfo: any) {
                cb(errInfo, undefined);
            }
        })
	}

    public static getAppName(cb: (error: any, version: string) => void) {
        if (appInfo.name) {
            cb(undefined, appInfo.name);
            return;
        }
		App.getInstance().call('getAppName', {
            success(name: string) {
                appInfo.name = name;
                cb(undefined, name);
            },
            fail(errInfo: any) {
                cb(errInfo, undefined);
            }
        })
    }
    
    private static getInstance() {
		if(!app) {
            app = new App();
            app.init();
		}
		return app;
	}
}

// ============================== 本地

/**
 * 底层接口和参数的声明
 */
registerSign(App, {
	getVersion: [],
	getAppName: [],
});
