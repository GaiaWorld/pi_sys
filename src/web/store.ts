

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
		return !!iDB;
	}
	/**
	 * 删除指定的数据库
	 */
	static delete = (dbName: string) : Promise<any> => {
		return new Promise((resolve, reject) => {
			let request = iDB.deleteDatabase(dbName);
			request.onsuccess = resolve;
			request.onerror = reject;
		});
	}
	/**
	 * @description 创建指定名称的存储
	 * @example
	 */
	static create = (dbName: string, tabName = "_db") : Promise<Store> => { // 返回值类型1|类型2
		return new Promise((resolve, reject) => {
			if (!iDB) {
				let s = new Store(dbName, tabName);
				s.map = new Map;
				return resolve(s);
			}
			try {
				let request = iDB.open(dbName, 1);
				request.onupgradeneeded = (e) => {
					// 创建table
					(<any>e.currentTarget).result.createObjectStore(tabName, {
						autoIncrement: false
					});
				};
				request.onsuccess = (e) => {
					let s = new Store(dbName, tabName);
					s.tab = (<any>e.currentTarget).result;
					return resolve(s);
				};
				request.onerror = reject;
			} catch (e) {
				iDB = undefined;
				let s = new Store(dbName, tabName);
				s.map = new Map;
				return resolve(s);
			}
		});
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
		return new Promise((resolve, reject) => {
			if(this.map) {
				return resolve([key, this.map.get(key)]);
			}
			let request = this.tab.transaction(this.tabName, "readonly").objectStore(this.tabName).get(key);
			request.onsuccess = (e) => resolve((<any>e.target).result);
			request.onerror = reject;
		});
	}
	/**
	 * @description 写入数据，如果键名存在则替换
	 * @example
	 */
	public write(key:number|string, data) : Promise<any> {
		return new Promise((resolve, reject) => {
			if(this.map) {
				this.map.set(key, data);
				return resolve();
			}
			let tx = this.tab.transaction(this.tabName, "readwrite");
			tx.objectStore(this.tabName).put(data, key);
			tx.oncomplete = resolve;
			tx.onerror = reject;
		});
	}
	/**
	 * @description 删除数据
	 * @example
	 */
	public delete(key:number|string) : Promise<any> {
		return new Promise((resolve, reject) => {
			if(this.map) {
				this.map.delete(key);
				return resolve();
			}
			let tx = this.tab.transaction(this.tabName, "readwrite");
			tx.objectStore(this.tabName).delete(key);
			tx.oncomplete = resolve;
			tx.onerror = reject;
		});
	}
	/**
	 * @description 清除存储
	 * @example
	 */
	public clear() : Promise<any> {
		return new Promise((resolve, reject) => {
			if(this.map) {
				this.map.clear();
				return resolve();
			}
			let tx = this.tab.transaction(this.tabName, "readwrite");
			tx.objectStore(this.tabName).clear();
			tx.oncomplete = resolve;
			tx.onerror = reject;
		});
	}
	/**
	 * @description 迭代, callback返回false表示停止迭代
	 * @example
	 */
	public iterate(callback: (result:{key:any, value:any}) => boolean, errorCallback: (err: Event) => void) {
		if (!iDB) {
			return setTimeout(() => {
				for (let [key, value] of this.map) {
					if (callback({key, value}) === false)
						return
				}
				callback(null);
			}, 0);
		}
		let cursor = this.tab.transaction(this.tabName, "readonly").objectStore(this.tabName).openCursor();
		cursor.onsuccess = () => {
			let r = cursor.result;
			if (r) {
				if (callback(r) === false)
					return
				r.continue();
			} else {
				callback(null);
			}
		};
		cursor.onerror = errorCallback;
	};
}

// ============================== 立即执行
let iDB = self.indexedDB;// || self.webkitIndexedDB || self.mozIndexedDB || self.msIndexedDB;
