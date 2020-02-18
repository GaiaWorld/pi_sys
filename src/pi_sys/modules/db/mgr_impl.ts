/**
 * 
 */

import { TabMeta } from '../serialization/sinfo';
import { CDB, CSession, CTransaction } from './client';
import { Handler, Item, Mgr as MgrInterface, Tr as TrInterface, DbListener } from './mgr';

export class Mgr implements MgrInterface {
    public ware_list: Map<string, CDB>;
	public sessions: Map<string, CSession>;
	listeners: Map<string, DbListener>;
	
	isExist(ware_name: string, tab_name: string): boolean {
		let db = this.ware_list.get(ware_name);
		if(!db) {
			return false;
		}

		return db.tabs.get(tab_name)?true: false;
	}

    // 表的元信息
    public tabInfo(ware_name: string, tab_name: string): TabMeta {
		let db = this.ware_list.get(ware_name);
		if(!db) {
			return null;
		}

		let tab = db.tabs.get(tab_name);
		if(!tab) {
			return null;
		}

		return tab.meta;
    }

    // 创建事务
    public transaction(writable: boolean): Tr {
        return new Tr(this.ware_list, this.sessions, writable);
    }

    // 注册数据库
    public register<T>(ware_name: string, ware: T): boolean {
        if (this.ware_list.get(ware_name)) {
            return false;
        }
        this.ware_list.set(ware_name, <any>ware);

        return true;
    }

    // 写数据库
    public write(txhd: Handler, timeout: number = 10) {
        const time = new Date().getTime();
        while (timeout > 0) {
            const tr = this.transaction(true);
            const r = txhd(tr);
            try {
                tr.prepare();
                tr.commit();

                return r;
            } catch (error) {
                timeout = timeout - (new Date().getTime() - time);
                tr.rollback();
            }
        }
        throw new Error('write timeout');
    }

    // 读数据库
    public read(txhd: Handler, timeout: number = 10) {
        const time = new Date().getTime();
        while (timeout > 0) {
            const tr = this.transaction(false);
            const r = txhd(tr);
            try {
                tr.prepare();
                tr.commit();

                return r;
            } catch (error) {
                timeout = timeout - (new Date().getTime() - time);
                tr.rollback();
            }
        }
        throw new Error('read timeout');
	}

	addListener(name: string, listener: DbListener): boolean {
		if(!(<any>listener).constructor._$info) {
			throw new Error("listener is not _$info");
		}

		if (this.listeners.get(name)) {
			console.log("DbListener is exist, name: ", name);
			return false;
		}

		this.listeners.set(name, listener);
		return true;
	}

	cancelListener(name: string): void {
		this.listeners.delete(name);
	}
	
	/**
	 * 读数据
	 * @param items 修改的数据
	*/
	notify(items: Item[]){
		if(this.listeners) {
			this.listeners.forEach((listener) => {
				listener.listen(items);
			});
		}
	}
	
	// /**
	//  * 添加监听器
	//  * @param name 监听器名称， 如果数据库管理器已经存在相同名称的监听器，添加监听器会失败
	//  * @param listner 监听器
	//  */
	// addListener(name: string, listner: DbListener): boolean { return false;}

	// /**
	//  * 取消监听器
	//  * @param name 监听器名称
	//  */
	// cancelListener(name: string): void {}
}

export class Tr implements TrInterface {
    public ware_list: Map<string, CDB>;
    public sessions: Map<string, CSession>;
    public writable: boolean;

    public prepare_list: CTransaction[];
    public tr_map: Map<string, CTransaction>;
    constructor(ware_list: Map<string, CDB>, sessions: Map<string, CSession>, writable: boolean) {
        this.ware_list = ware_list;
        this.sessions = sessions;
        this.writable = writable;
        this.prepare_list = [];
        this.tr_map = new Map();
    }
    // 预提交
    public prepare() {
        this.tr_map.forEach((v, k) => {
            v.prepare();
            this.prepare_list.push(v);
        });
    }

    // 提交
    public commit() {
        this.tr_map.forEach((v, k) => {
            v.commit();
            v.end();
            // 结束事务， 关闭session
            const session = this.sessions.get(k);
            session.close();
        });
        this.prepare_list = [];
        this.sessions.clear();
        this.tr_map.clear();
    }

    // 回滚
    public rollback() {
        // 回滚已经预提交的事务
        for (let i = 0; i < this.prepare_list.length; i++) {
            this.prepare_list[i].rollback();
        }
        // 结束事务， 关闭session
        this.tr_map.forEach((v, k) => {
            v.commit();
            v.end();
            const session = this.sessions.get(k);
            session.close();
        });
        this.prepare_list = [];
        this.sessions.clear();
        this.tr_map.clear();
    }

    // 查询
    public query(arr: Item[], lock_time: number, read_lock: boolean): Item[] {
        const items: Item[] = [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            const tr = this.getTr(arr[i].ware);
            const r = <any>tr.query_one(item, lock_time);
            r.ware = arr[i].ware;
            items[i] = r;
        }

        return items;
    }

    // 修改
    public modify(arr: Item[], lock_time: number, read_lock: boolean) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            const tr = this.getTr(arr[i].ware);
            tr.modify_one(item, lock_time);
        }
    }

    // 创建表
    public alter(ware_name: string, tab_name: string, meta: TabMeta) {
        const tr = this.getTr(ware_name);
        tr.alter(tab_name, meta);
    }

    // 迭代器
    public iter<K, V>(ware: string, tab: string, key: any, descending: boolean, _filter: string): Iterable<[K, V]> {
        const tr = this.getTr(ware);

        return {
            [Symbol.iterator]: () => new DbItertor(tr.iter(tab, _filter))
        };
    }
    // 迭代器
    // PITODO
    public iter_raw?<K, V>(ware: string, tab: string, key: any, descending: boolean, _filter: string): Iterator<[K, V]> {
        const tr = this.getTr(ware);

        return new DbItertor1(tr.iter(tab, _filter));
    }

    private getTr(ware_name: string): CTransaction {
        let tr = this.tr_map.get(ware_name);
        if (!tr) {
            const db = this.ware_list.get(ware_name);
            if (!db) {
                throw new Error('create tr error, ware is not exist!');
            }
            let session = this.sessions.get(ware_name);
            if (!session) {
                session = new CSession();
                session.open(db);
                this.sessions.set(ware_name, session);
            }
            tr = new CTransaction();
            tr.writable = this.writable;
            tr.start(session);
            this.tr_map.set(ware_name, tr);
        }

        return tr;
    }
}

export class DbItertor<K, V> implements Iterator<[K, V]> {
    public inner: IterableIterator<{ key: K; value: V }>;

    constructor(inner: IterableIterator<{ key: K; value: V }>) {
        this.inner = inner;
    }

    public next() {
        const r = this.inner.next();
        if (r.done === true) {
            return { done: true, value: undefined };
        } else {
            return { done: false, value: [r.value.key, r.value.value] as [K, V] };
        }
    }
}

// 迭代器， 文件数据库不能使用foreach迭代， 因此封装了该迭代器， 直接用next方法进行迭代
export class DbItertor1<K, V> implements Iterator<[K, V]> {
    public inner: IterableIterator<{ key: K; value: V }>;

    constructor(inner: IterableIterator<{ key: K; value: V }>) {
        this.inner = inner;
    }

    public next() {
        const r = this.inner.next();
        return !r.done ? [r.value.key, r.value.value] as any : undefined;
    }

}
