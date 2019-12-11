import { TabMeta } from "../serialization/sinfo";
import { Struct } from "../serialization/struct_mgr";

export interface Item {
    ware: string,
    tab: string,
    key: any,
    value?: any
}

export interface Mgr {
	/**
	 * 是否存在表
	 * @param ware_name 库名
	 * @param tab_name 表名
	 */
	isExist(ware_name: string, tab_name: string): boolean;

    //表的元信息
    tabInfo(ware_name: string, tab_name: string): TabMeta;

    //创建事务
    transaction(writable: boolean): Tr;

    //注册数据库
    register<T>(ware_name: string, ware: T): boolean;

    //写数据库
    write(txhd: Handler, timeout?: number): void;

    //读数据库
    read(txhd: Handler, timeout?: number): void;

    // 数据改变通知
	notify(items: Item[]): void;
	
	/**
	 * 添加监听器
	 * @param name 监听器名称， 如果数据库管理器已经存在相同名称的监听器，添加监听器会失败
	 * @param listner 监听器
	 */
	addListener(name: string, listner: DbListener): boolean;

	/**
	 * 取消监听器
	 * @param name 监听器名称
	 */
	cancelListener(name: string): void;
}

export interface Tr {
    //预提交
    prepare(): void;

    //提交
    commit(): void;

    //回滚
    rollback(): void;

    //查询
    query(arr: Item[], lock_time: number, read_lock: boolean): Item[];

    //修改
    modify(arr: Item[], lock_time: number, read_lock: boolean): void;

    //创建表
    alter(ware_name: string, tab_name: string, meta: TabMeta): void;

    //迭代器
    iter<K, V>(ware: string, tab: string, key: any, descending: boolean, _filter: string): Iterable<[K, V]>;

    //迭代器
    iter_raw?(ware: string, tab: string, key: any, descending: boolean, _filter: string): Iterator<[any, any]>;
}

export interface Handler {
    (tr: Tr): any
}

export interface DataListener {
    (items: Item[]): void;
}

/**
 * 数据库监听器
 */
export interface DbListener extends Struct {
	listen(items: Item[]): void;
}