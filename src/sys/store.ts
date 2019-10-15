

export class Store {
	public readonly dbName: string;
	public readonly tabName: string;
	tab: IDBDatabase;
	map: Map<number|string, any>;
	/**
	 * @description 判断是否支持IndexedDB
	 * @example
	 */
	static check = () => {
		return false;
	}
	/**
	 * 删除指定的数据库
	 */
	static delete = (dbName: string) : Promise<any> => {
		return Promise.resolve("");
	}
	/**
	 * @description 创建指定名称的存储
	 * @example
	 */
	static create = (dbName: string, tabName = "_db") : Promise<Store> => { // 返回值类型1|类型2
		return Promise.resolve(null);
	}
	constructor(dbName: string, tabName: string) {
		this.dbName = dbName;
		this.tabName = tabName;
	}
	/**
	 * @description 读取数据
	 * @example
	 */
	public read(key:number|string) : Promise<any> {
		return Promise.resolve(null);
	}
	/**
	 * @description 写入数据，如果键名存在则替换
	 * @example
	 */
	public write(key:number|string, data) : Promise<any> {
		return Promise.resolve(null);
	}
	/**
	 * @description 删除数据
	 * @example
	 */
	public delete(key:number|string) : Promise<any> {
		return Promise.resolve(null);
	}
	/**
	 * @description 清除存储
	 * @example
	 */
	public clear() : Promise<any> {
		return Promise.resolve(null);
	}
	/**
	 * @description 迭代, callback返回false表示停止迭代
	 * @example
	 */
	public iterate(callback: (result:{key:any, value:any}) => boolean, errorCallback: (err: Event) => void) {
	};
}

// ============================== 立即执行
