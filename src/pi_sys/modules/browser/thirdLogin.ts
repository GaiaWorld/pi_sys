// ============================== 导入
import { NativeObject, registerSign, ParamType } from './native';
// ============================== 导出

/**
 * 微信登陆
 */
export class ThirdLogin extends NativeObject {


	/**
	 * getToken: 获取第三方登录凭证
	 * iOS 支持平台：QQ，Wechat，apple
	 * android 支持平台：QQ，Wechat，Weibo
	 * QQ登陆返回参数：{"token":"",openId:""}
	 * wechat登陆返回参数：{"code":""}
	 * Apple登陆返回参数:{"identityToken":"base64","authorizationCode":"base64","userID":""}
	 * @param result ：0:登陆成功， -1:参数异常,  -2：用户选择取消, -3:没有网络， -6:当前iOS系统不支持apple登陆, -7：用户没有安装微信
	 */
	public static getToken(type:LoginType, successCallBack:(message:string)=>void,failCallBack:(code:number, message:string)=>void) {
		var success = (code: number, message: string)=>{
			if(code === 0){
				successCallBack(message);
			}else{
				failCallBack(code, message);
			}
		}
		getInstance().call("getToken",{type, success})
	}

}

/**
 * 底层接口和参数的声明
 */
registerSign(ThirdLogin, {
	getToken:[
		{
			name: 'type',
			type: ParamType.String
		}
	]
});

let thirdLogin = null;

const getInstance = () => {
	if (!thirdLogin) {
		thirdLogin = new ThirdLogin();
		thirdLogin.init();
	}
	return thirdLogin;
}

export enum LoginType{
	WeChat = "WeChat",
	WeiBo = "WeiBo",
	QQ = "QQ",
	FaceBook = "FaceBook",
	Apple = "Apple" //iOS 13 必须添加的登陆方式（13版本一下手机无法使用）
}

export const isIOS = navigator.userAgent.indexOf('IOS') > 0 ? true : false;