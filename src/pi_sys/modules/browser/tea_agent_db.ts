// ============================== 导入
import { NativeObject, ParamType, registerSign } from './native';
// ============================== 导出

/**
 * quick_ad 统计
 */
export class TeaAgentDB extends NativeObject {
	constructor() {
		super();
		this.init();
	}

	

	/**
	 * 统计注册
	 * @param method: 注册渠道 微信，QQ, 手机号
	 * @param is_success： 成功 0：成功， -1： 失败
	 */
	public register(method: string, is_success: number) {
		this.call('register', {method, is_success});
	}

	/**
	 * 统计支付
	 * @param is_success： 成功 0：成功， -1： 失败
	 * @param currency_amount: 充值金额 number
	 */
	public purchase(is_success: number, currency_amount: number){
		this.call('purchase', {is_success, currency_amount});
	}

	/**
	 * 升级
	 * @param level 等级
	 */
	public updateLevel(level: number){
		this.call('updateLevel', {level});
	}

	/**
	 * 设置用户唯一标识
	 * 标识去重，同一用户多台设备只算一台
	 */
	public userUniqueID(id: string){
		this.call('userUniqueID', {id});
	}

}



/**
 * 底层接口和参数的声明
 */
registerSign(TeaAgentDB, {
	register: [
		{
			name: 'method',
			type: ParamType.String
		},
		{
			name: 'is_success',
			type: ParamType.Number
		}
	],
	purchase: [
		{
			name: 'is_success',
			type: ParamType.Number
		},
		{
			name: 'currency_amount',
			type: ParamType.Number
		}
	],
	updateLevel:[
		{
			name: 'level',
			type: ParamType.String
		}
	],
	userUniqueID:[
		{
			name: 'id',
			type: ParamType.String
		}
	]

});