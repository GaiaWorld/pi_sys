// ============================== 导入
import { NativeObject, ParamType, registerSign } from './native';
// ============================== 导出

/**
 * quick_ad 统计
 */
export class QuickAD extends NativeObject {
	constructor() {
		super();
		this.init();
	}

	/**
	 * 激活设备
	 * @param userID: 用户ID string
	 * @param userName： 用户名 string
	 * @param roleID： 角色ID（没有就传0）string
	 */
	public active(userID: string, userName: string, roleID: string) {
		this.call('active',{userID, userName, roleID})
	}

	/**
	 * 统计注册
	 * @param userID: 用户ID string
	 * @param userName： 用户名 string
	 */
	public account(userID: string, userName: string) {
		this.call('account', {userID, userName});
	}

	/**
	 * 统计角色
	 * @param userID: 用户ID string
	 * @param userName： 用户名 string
	 * @param roleID 角色ID string
	 * @param roleName 角色名 string
	 * @param roleServer 角色服务器 string
	 * @param roleLevel 角色等级 string
	 * @param roleVip 角色vip string
	 * @param roleBanlance 角色余额 string
	 */
	public role(userID: string, userName: string, roleID: string, roleName: string, roleServer: string, roleLevel: string, roleVip: string, roleBanlance: string) {
		this.call('role', {userID, userName, roleID, roleName, roleServer, roleLevel, roleVip, roleBanlance});
	}

}



/**
 * 底层接口和参数的声明
 */
registerSign(QuickAD, {
	active: [
		{
			name: 'userID',
			type: ParamType.String
		},
		{
			name: 'userName',
			type: ParamType.String
		},
		{
			name: 'roleID',
			type: ParamType.String
		}
	],
	account: [
		{
			name: 'userID',
			type: ParamType.String
		},
		{
			name: 'userName',
			type: ParamType.String
		}
	],
	role:[
		{
			name: 'userID',
			type: ParamType.String
		},
		{
			name: 'userName',
			type: ParamType.String
		},
		{
			name: 'roleID',
			type: ParamType.String
		},
		{
			name: 'roleName',
			type: ParamType.String
		},
		{
			name: 'roleServer',
			type: ParamType.String
		},
		{
			name: 'roleLevel',
			type: ParamType.String
		},
		{
			name: 'roleVip',
			type: ParamType.String
		},
		{
			name: 'roleBanlance',
			type: ParamType.String
		}
	]

});