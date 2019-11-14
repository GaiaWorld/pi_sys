/**
 * ecs系统
 * 概念： https://blog.csdn.net/i_dovelemon/article/details/25798677
 * ecs的核心是将数据和逻辑分离（数据部分采用组合而非继的方式进行组织）， 增加程序的扩展性、可维护性
 * 
 * 在本模块中， 提供的对ecs最基本的支持， 同时增加了事件驱动的功能，在大部分情况下相较于传统ecs会有更好的性能表现
 * 
 * 使用：
class C1 implements Component{
	@writeNotify // 装饰器， name属性改变， 会发送C1的修改事件
	name: string;

	_id: number;

	@writeNotify // 有时， 你想要为属性定义一个访问器， 如果需要writeNotify装饰该属性， 你应该将装饰器应用在访问器上， 并必须定义另一个相对应的访问器（get，set缺一不可）
	set id(value: number) {
		this._id = value;
	}

	get id(): number {
		return this._id;
	}
}
class C2 implements Component{}
class E1 implements Entity{}

// single
class S1{
	@writeNotify
	id: number;

	constructor(id: number) {
		this.id = id;
	}
}

//系统
class MatrixSystem implements System {
	// 定义初始化方法（可选）
	setup(world: World) {
		if (world instanceof World) {
			console.log("MatrixSystem setup ok");
		}
	}

	// 定义run方法
	@read([E1, C1], [E1, C2]) // 声明run方法需要读取 Multi<E1, C1>， Multi<E1, C2>数据
	run(read: [Multi<E1, C1>, Multi<E1, C2>], write: World) {
		if (read && read.length == 2 && read[0] instanceof Multi && read[1] instanceof Multi && write instanceof World) {
			console.log("MatrixSystem run ok");
		}
	}

	// 定义监听方法
	@listenCreate([E1, C1]) // 监听C1类型组件的创建事件
	@write([E1, C1]) // liten1方法运行时， 需要对Mult<E1, C1>数据进行修改
	liten1(e: CreateEvent, read: World, write: [Multi<E1, C1>]) {
		if (read instanceof World && write && write.length == 1 && write[0] instanceof Multi) {
			console.log("MatrixSystem liten1 ok");
		}
	}

	@listenModify([E1, C2]) // 监听C2类型组件的修改事件
	@write(S1) // liten2执行时， 需要修改Single<S1>
	liten2(e: ModifyEvent, read: World, write: [Single<S1>]) {
		if (read instanceof World && write && write.length == 1 && write[0] instanceof Single) {
			console.log("MatrixSystem liten2 ok");
		}
	}

	@listenDestroy([E1, C2]) //  监听C2类型组件的销毁事件， 不声明读写数据类型时， 除事件外， 还会接收到另一个参数： world
	liten3(e: DestroyEvent, world: World) {
		if (world instanceof World) {
			console.log("MatrixSystem liten3 ok");
		}
	}
}

let world = new World();

// 首先应该注册组件类型和单例实例
world.registerComponent(E1, C1);
world.registerComponent(E1, C2);
let s1 = new S1(10);
world.registerSingle(s1);

// 注册组件前， 确保组件中的监听函数和run函数需要读取和写入的数据（组件和单例）全部已经注册完毕
world.registerSystem("matrixSys", new MatrixSystem());

// 这是一个顺序派发器， 可以被world的run方法驱动， 将按照build中描述的组件顺序执行System的润方法
let dispacher = new SeqDispatcher();
dispacher.build(["matrixSys"], world);
world.addDispatcher("test", dispacher);

// 驱动名为"test"的派发器， 在实际应用中， 通常在每个事件循环中调用
world.run("test");

let c2 = new C2();

// 创建一个实体
let e1 = world.createEntity(E1);

//为e1插入一个C2组件， 会发送C2创建事件， 但是没有System监听C2的创建事件， 该事件不会执行任何逻辑
world.fetchComponent(E1, C2).insert(e1, c2);

// 发送c2修改事件
c2.name = "xxx";

// 发送c2修改事件
c2.id = 2;

// 删除e1中的C2组件， 将发送c2销毁事件
world.fetchComponent(E1, C2).destroy(e1);

// 为e1插入一个C1组件， 会发送C1创建事件
let c1 = new C1();
world.fetchComponent(E1, C1).insert(e1, c1);
 */


/**
 * 系统， 可选择实现run和setup方法
 * setup方法可用于对系统的初始化设置
 * 如果定义run方法， 将会通过Dispatcher调用
 */
export interface System {
	setup?(world: World): void;
	run?(...list): void;
}

/**
 * 组件
 */
export interface Component {}

/**
 * 实体
 */
export interface Entity {}

/**
 * 创建事件
 * @property id 实体id
 */
export interface CreateEvent {
	id: number; 
}

/**
 * 修改事件
 * @property id 实体id
 * @property field 组件或单例字段名称
 */
export interface ModifyEvent {
	id: number;
	field: string;
	// index: number;
}

/**
 * 销毁事件
 * @property id 实体id
 */
export interface DestroyEvent {
	id: number
}

/**
 * 监听器的集合
 */
export class Notify {
	createListners: Listener<CreateEvent>[];
	modifyListners: Listener<ModifyEvent>[];
	destroyListners: Listener<DestroyEvent>[];

	constructor() {
		this.createListners = [];
		this.modifyListners = [];
		this.destroyListners = [];
	}

	/**
	 * 添加一个创建监听器 
	 * @param f 监听器
	 */
	addCreateListener(f: Listener<CreateEvent>) {
		this.createListners.push(f);
	}

	/**
	 * 添加一个修改监听器 
	 * @param f 监听器
	 */
	addModifyListener(f: Listener<ModifyEvent>) {
		this.modifyListners.push(f);
	}

	/**
	 * 添加一个销毁监听器 
	 * @param f 监听器
	 */
	addDestroyListener(f: Listener<DestroyEvent>) {
		this.destroyListners.push(f);
	}

	/**
	 * 发送创建事件
	 * @param f 实体id
	 */
	createEvent(id: number) {
		for(var litener of this.createListners) {
			litener({id: id});
		}
	}

	/**
	 * 发送修改该事件
	 * @param id 实体id（如果是单例， id可以写0）
	 * @param field 组件字段名
	 */
	modifyEvent(id: number, field: string) {
		for(var litener of this.modifyListners) {
			litener({id: id, field: field});
		}
	}

	/**
	 * 发送销毁事件
	 * @param id 实体id
	 */
	destroyEvent(id: number) {
		for(var litener of this.destroyListners) {
			litener({id: id});
		}
	}
}

/**
 * 实体容器
 */
export class Entitys<E> extends Notify {
	private data: Set<number>;
	private components: Multi<E, Component>[];
	private curIndex: number;

	constructor () {
		super();
		this.data = new Set;
		this.components = [];
		this.curIndex = 0;
	}

	/**
	 * 实体是否存在
	 * @param id 实体id
	 */
	has(id: number): boolean {
		if (this.data.has(id)) {
			return true;
		} else {
			return false;
		}
	}

	// 注册组件
	register_component<C>(component: Multi<E, C>) {
		this.components.push(component);
	}

	/**
	 * 销毁实体
	 * @return 实体id
	 */
	create(): number {
		this.curIndex = loopAdd(this.curIndex);
		let curIndex = this.curIndex;
		this.data.add(curIndex);
		this.createEvent(curIndex);
		return curIndex;
	}

	/**
	 * 销毁实体
	 * @param id 实体id
	 */
	destroy(id: number) {
		// let mark = this.data.get(id);
		this.data.delete(id);
		this.modifyEvent(id, "");

		for (let c of this.components) {
			c.destroy(id);
		}
		this.destroyEvent(id);
	}

	iter(): Iterable<number> {
		return this.data;
	}
}

/**
 * 组件容器
 */
export class Multi<_E, C> extends Notify{
	private data: Map<number, C>;

	constructor() {
		super()
		this.data = new Map();
	}

	/**
	 * 获取组件
	 * @param id 实体id
	 * @return 组件实例
	 */
	get(id: number): C {
		return this.data[id - 1];
	}

	/**
	 * 插入组件
	 * @param id 实体id
	 * @param c 组件实例
	 */
	insert(id: number, c: C) {
		let old = this.data.get(id);
		this.data.set(id, c);
		// 插入组件， 为组件添加通知器
		(<any>c).__notify__ = this;
		(<any>c).__id__ = id;

		if (old) {
			this.modifyEvent(id, "");
		} else {
			this.createEvent(id);
		}
		return this.data[id - 1];
	}
	
	/**
	 * 销毁组件
	 * @param id 实体id
	 */
	destroy(id: number): C {
		this.destroyEvent(id);
		let r = this.data.get(id);
		this.data.delete(id);
		(<any>r).__notify__ = undefined;
		return r;
	}

	iter(): Iterable<[number, C]> {
		return this.data;
	}
}

/**
 * 单例容器
 */
export class Single<T> extends Notify{
	data: T;

	constructor(data: T) {
		super()
		this.data = data;
	}

	// 内部调用函数
	register() {
		(<any>this.data).__notify__ = this;
	}
}

/**
 * 世界， ecs系统的管理核心， 负责管理所有的组件数据、单例数据、 系统， 同时， 提供run接口， 驱动系统的运行
 */
export class World {
	private entity_id: number; // 为每实体类型分配一个递增id， 从24位开始， 
	private component_id: number; //为每组件类型分配一个递增id， 从第0位开始， 最大24位
	private data: Map<any, Multi<Entity, Component> | Single<any>>; // world中的所有数据管理
	private key_data: Map<string, Multi<Entity, Component> | Single<any>>; // world中的数据, 以字符串为key
	private entity: Map<any, Entitys<Entity>>;
	private sys: Map<string, [System, Runner]>; // world中的所有系统管理
	private dispach: Map<string, Dispatcher>; // world中的派发器管理

	constructor() {
		this.data = new Map;
		this.key_data = new Map;
		this.entity = new Map;
		this.sys = new Map;
		this.dispach = new Map;
		this.entity_id = 1;
		this.component_id = 1<<24;
	}

	/**
	 * 注册组件类型
	 * @param eTy 组件对应的实体类型
	 * @param cTy 组件类型
	 * @param key 可选， 可以为组件类型定义一个key， 后续能用该key fetch数据
	 */
	registerComponent(eTy: any, cTy: any, key?: string) {
		if (!eTy.__world_eid__) {
			eTy.__world_eid__ = this.entity_id++;
		}

		if (!cTy.__world_cid__) {
			cTy.__world_cid__ = this.component_id;
			this.component_id += 1<<24;
		}
		
		let mc = new Multi();
		this.data.set(eTy.__world_eid__ | cTy.__world_cid__, mc);
		if(key) {
			this.key_data.set(key, mc);
		}
		if(!this.entity.get(eTy)) {
			let entitys = new Entitys();
			this.entity.set(eTy, entitys);
			entitys.register_component(mc);
		}
	}

	/**
	 * 注册单例类型
	 * @param value 单例类型（构造函数）
	 * @param key 可选， 可以为组件类型定义一个key， 后续能用该key fetch数据
	 */
	registerSingle(value: any, key?: string) {
		let s = new Single(value);
		this.data.set(value.__proto__.constructor, s);
		if(key) {
			this.key_data.set(key, s);
		}
		s.register();
	}

	/**
	 * 注册系统
	 * @param key 系统名称
	 * @param sys 系统实例
	 */
	registerSystem(key: string, sys: System) {
		let r: [System, Runner] = [sys, null];
		this.sys.set(key, r);

		setupListener(sys, this, "__create_listeners__");
		setupListener(sys, this, "__modify_listeners__");
		setupListener(sys, this, "__destroy_listeners__");

		// system存在run方法， fetch run方法需要的数据， 并生成run闭包
		if (sys.run && typeof sys.run == "function") {
			let data = fetchData(sys.run, this);
			if (!data[0] && !data[1]) {
				// 否则， 将world作为参数传给run， 以便run可以动态fetch数据
				r[1] = () => {
					sys.run(this);
				}
			} else {
				// 未声明读数据或写数据， 直接将world作为该数据传入run函数
				if (!data[0]) {
					(<any>data)[0] = this;
				} else if(!data[0]){
					(<any>data)[1] = this;
				}
				// 如果使用@read 或@write 装饰器声明run方法需要的数据， 运行run时， 直接将fetch到的数据作为参数传给run
				r[1] = () => {
					sys.run(data[0], data[1])
				}
			}
		}

		// system存在run方法， 调用其setup
		if (sys.setup) {
			sys.setup(this);
		}
	}

	/**
	 * 创建实体
	 * @param eTy 实体类型
	 * @return 实体id
	 */
	createEntity(eTy: any): number {
		let entitys = this.entity.get(eTy);
		if (!entitys) {
			throw new Error("createEntity fail, Entity is not exsit: " + eTy);
		}
		return entitys.create();
	}

	/**
	 * 销毁实体
	 * @param eTy 实体的类型
	 * @param id 实体的id
	 */
	destroyEntity(eTy: any, id: number) {
		let entitys = this.entity.get(eTy);
		if (!entitys) {
			throw new Error("destroyEntity fail, Entity is not exsit: " + eTy);
		}
		return entitys.destroy(id);
	}

	/**
	 * 取到指定类型的数据（组件或单例）
	 * @param ty1 ty1为组件所对应的实体的类型
	 * @param ty2 ty2为组件类型
	 */
	fetchComponent(ty1: any, ty2?: any): Multi<Entity, Component> {
		if(typeof ty1 === "string") {
			return this.key_data.get(ty1) as Multi<Entity, Component>;
		} else {
			return this.data.get(ty1.__world_eid__ | ty2.__world_cid__) as Multi<Entity, Component>;
		}
	}

	/**
	 * 取到指定类型的数据（组件或单例）
	 * @param ty1 ty1为单例类型或单例的key
	 */
	fetchSingle(ty1: any): Single<any> {
		if(typeof ty1 === "string") {
			return this.key_data.get(ty1) as Single<any>;
		} else {
			return this.data.get(ty1) as Single<any>;
		}
	}

	/**
	 * 取到指定类型的数据（组件或单例）
	 * @param ty1 ty1为单例类型或单例的key
	 */
	fetchEntity(ty1: any): Entitys<Entity> {
		return this.entity.get(ty1);
	}

	/**
	 * 取到一个系统的实例
	 * @param name 系统名称
	 */
	fetchSys(name: string): System {
		let r = this.sys.get(name);
		if (!r) {
			return null;
		} else {
			return r[0];
		}
	}

	/**
	 * 添加一个派发器
	 * @param name 派发器的名称
	 * @param sysNames 该派发器所关联的系统名称集合
	 */
	addDispatcher(name: string, d: Dispatcher) {
		let size = this.dispach.size;
		this.dispach.set(name, d);

		if (size === this.dispach.size) {
			console.warn("Build dispatch repeatedly, name:" + name);
		}
	}

	/**
	 * 删除一个派发器
	 * @param name 派发器的名称
	 */
	removeDispatcher(name: string) {
		this.dispach.delete(name);
	}

	/**
	 * 获取派发器
	 * @param name 派发器的名称
	 */
	getDispatcher(name: string): Dispatcher {
		return this.dispach.get(name);
	}

	/**
	 * 驱动派发器
	 * @param dispachName 派发器的名称
	 */
	run(dispachName: string) {
		let dispach = this.dispach.get(dispachName);
		if (!dispach) {
			throw new Error("run fail, dispach is not exist, name" + dispachName);
		} else {
			dispach.run();
		}
	}

	// 内部调用
	getRunner(name: string): Runner {
		let r = this.sys.get(name);
		if (!r) {
			return null;
		} else {
			return r[1];
		}
	}
	
	/**
	 * 内部调用
	 * 取到指定类型的数据（组件或单例）
	 * @param ty1 如果是组件， ty1为组件所对应的实体的类型， 如果是单例， ty1为单例类型
	 * @param ty2 如果是单例， 不需要该参数， 如果是组件， ty2为组件类型
	 */
	fetchData(ty1: any, ty2?: any): Multi<Entity, Component> | Single<any> | Entitys<Entity> {
		if (ty2) {
			return this.data.get(ty1.__world_eid__ | ty2.__world_cid__);
		} else {
			let s = this.data.get(ty1);
			if (s) {
				return s;
			} else {
				return this.entity.get(ty1);
			}
		}
	}
}

export interface Dispatcher {
	build(names: string[], world: &World);
	run();
}

// 派发器
export class SeqDispatcher implements Dispatcher {
	list: Runner[];

	constructor(){
		this.list = [];
	}

	build(names: string[], world: &World){
		for(let n of names) {
			let runner = world.getRunner(n);
			if (!runner) {
				throw new Error("system is not exist!, name: " + n);
			}
			this.list.push(runner);
		}
	}

	run() {
		for(let run of this.list) {
			run();
		}
	}
}


/**
 * 装饰器， 作用于System中的监听方法， 用于声明监听数据目标
 * 当System被注册到组件中时， 会自动根据该监听目标， 将监听方法注册到目标的监听列表， 以便数据创建时， 调用该方法
 * 例：
 *	export class MatrixSystem implements System {
 *
 *		@listenCreate([E1, C1]) // E1为实体类型， C1为组件类型
 *		c1Create(event: DestroyEvent, read: any, write: any) {
 *			console.log("c1Create ok");
 *		}
 *	}
 * 
 */
export const listenCreate = (listen_target: any): Function => {
	let k = "__create_listeners__";
	return listen(k, listen_target);
}

/**
 * 装饰器， 作用于System中的监听方法， 用于声明监听数据目标
 * 当System被注册到组件中时， 会自动根据该监听目标， 将监听方法注册到目标的监听列表， 以便数据销毁时， 调用该方法
 * 例：
 *	export class MatrixSystem implements System {
 *
 *		@listenModify([E1, C1]) // E1为实体类型， C1为组件类型
 *		c1Modify(event: DestroyEvent, read: any, write: any) {
 *			console.log("c1Modify ok");
 *		}
*		@listenModify(S1) // S1为单例类型， 单例仅支持修改监听
 *		s1Modify(event: DestroyEvent, read: any, write: any) {
 *			console.log("c1Modify ok");
 *		}
 *	}
 * 
 */
export const listenModify = (listen_target: any): Function => {
	let k = "__modify_listeners__";
	return listen(k, listen_target);
}

/**
 * 装饰器， 作用于System中的监听方法， 用于声明监听数据目标
 * 当System被注册到组件中时， 会自动根据该监听目标， 将监听方法注册到目标的监听列表， 以便数据销毁时， 调用该方法
 * 例：
 *	export class MatrixSystem implements System {
 *
 *		@listenDestroy([E1, C1]) // E1为实体类型， C1为组件类型
 *		c1Destroy(event: DestroyEvent, read: any, write: any) {
 *			console.log("c1Destroy ok");
 *		}
 *	}
 * 
 */
export const listenDestroy = (listen_target: any): Function => {
	let k = "__destroy_listeners__";
	return listen(k, listen_target);
}

/**
 * 装饰器， 作用于System中的方法， 用于声明run方法或监听方法的期望数据（该数据仅可读）， 
 * 当System被注册到组件中时， 会自动根据该数据从World上查询到这些数据， 并缓存起来，
 * 以后的每次run调用或监听调用， 将会将这些数据作为读参数传入。
 * 例：
 *	export class MatrixSystem implements System {
 *
 *		@read([E1, C1], [E1, C2]) // E1为实体类型， C1， C2为组件类型
 *		run(read: [Multi<E1, C1>, Multi<E1, C2>], write: any) {
 *			console.log("MatrixSystem run ok");
 *		}
 *	}
 * 
 */
export const read = (...list): Function => {
	return function(_target: any, _propertyKey: string, descriptor: PropertyDescriptor){
		descriptor.value.__read__ = list;
	}
}

/**
 * 装饰器， 作用于System中的方法， 用于声明run方法或监听方法的期望数据（该数据可写）， 
 * 当System被注册到组件中时， 会自动根据该数据从World上查询到这些数据， 并缓存起来，
 * 以后的每次run调用或监听调用， 将会将这些数据作为写参数传入。
 * 例：
 *	export class MatrixSystem implements System {
 *
 *		@write([E1, C1], [E1, C2]) // E1为实体类型， C1， C2为组件类型
 *		run(read: any, write: [Multi<E1, C1>, Multi<E1, C2>]) {
 *			console.log("MatrixSystem run ok");
 *		}
 *	}
 * 
 */
export const write = (...list): Function => {
	return function(_target: any, _propertyKey: string, descriptor: PropertyDescriptor){
		descriptor.value.__write__ = list;
	}
}

/**
 * 装饰器， 作用于属性或访问器， 将set访问器改为： 修改属性值， 同时尝试通知system，数据改变
 * 例： 
 * export class Person implements Component{
 * 		@writeNotify // 装饰器附加在属性上
 * 		name: string;
 * 
 * 		_id: number;
 * 		@writeNotify // 装饰器附加在set访问器上（注意， writeNotify作用于set访问器时， 其get访问也必须被定义）
 * 		set id(value: number) {
 * 			this._id = value;
 * 		}
 * 		get id(): number {
 * 			return this._id;
 * 		}
 * 
 * 		_age: number;
 * 		set age(value: number) {
 * 			this._age = value;
 * 		}
 * 		@writeNotify // 装饰器附加在get访问器上（注意， writeNotify作用于get访问器时， 其set访问也必须被定义）
 * 		get age(): number {
 * 			return this._age;
 * 		}
 * }
 */
export const writeNotify = (target: any, propertyKey: string, descriptor?: PropertyDescriptor): any => {
	if (!descriptor) {
		Object.defineProperty(target, propertyKey, {
			configurable: true,
			set: function (value: any) {
				this["_" + propertyKey] = value;
				if(this.__notify__) {
					this.__notify__.modifyEvent(this.__id__, propertyKey);
				}
			},
			get: function () {
				return this["_" + propertyKey];
			}
		});
	} else {
		if (!descriptor.set || !descriptor.get) {
			throw new Error("仅定义set访问器或仅定义get访问器， 不能使用‘writeNotify’装饰器");
		}
		let old_set = descriptor.set;
		let old_get = descriptor.get;
		descriptor.set = function (value: any) {
			old_set.call(this, value);
			if(this.__notify__) {
				this.__notify__.modifyEvent(this.__id__, propertyKey);
			}
		};

		descriptor.get = function () {
			return  old_get.call(this)
		};
		return descriptor;
	}
}

interface Listener<E> {
	(event: E):void
}

interface Runner {
	():void
}

const listen = (name: string, listen_target: any): Function =>  {
	return function(target: any, _propertyKey: string, descriptor: PropertyDescriptor){
		if (!target[name]) {
			target[name] = [];
		}
		target[name].push({target: listen_target, fun: descriptor.value});
	}
}


const setupListener = (system: System, world: World, name: string) =>  {
	let listener = system[name];
	if (!listener) {
		return;
	}
	let registerFun;
	if (name === "__create_listeners__") {
		registerFun = "addCreateListener";
	} else if (name === "__modify_listeners__") {
		registerFun = "addModifyListener";
	} else if (name === "__destroy_listeners__") {
		registerFun = "addDestroyListener";
	}

	for(var i = 0; i < listener.length; i++) {
		let decs = listener[i];

		let data = fetchData(decs.fun, world);
		let liten: Listener<ModifyEvent | CreateEvent | DestroyEvent>;
		if (!data[0] && !data[1]) {
			// 将world作为参数传给监听方法， 以便监听方法可以动态fetch数据
			liten = (event: ModifyEvent | CreateEvent | DestroyEvent) => {
				decs.fun.call(system, event, world);
			}
		} else {
			//wei声明的数据类型用world代替
			if(!data[0]) {
				(<any>data)[0] = world;
			} else if(!data[1]) {
				(<any>data)[1] = world;
			}
			// 否则使用@read 或@write 装饰器声明监听方法需要的数据， 运行监听方法时， 直接将fetch到的数据作为参数传给监听方法
			liten = (event: ModifyEvent | CreateEvent | DestroyEvent) => {
				decs.fun.call(system, event, data[0], data[1]);
			}
		}

		let p = decs.target;
		if (Array.isArray(p)) {
			world.fetchData(p[0], p[1])[registerFun](liten);
		} else {
			world.fetchData(p)[registerFun](liten);
		}
	}
}

const fetchData = (fun: any, world: World): [any[], any[]] => {
	let read, write;
	// fetch读数据
	if (fun.__read__) {
		read = [];
		for(var i = 0; i < fun.__read__.length; i++) {
			let p = fun.__read__[i];
			if (Array.isArray(p)) {
				read[i] = world.fetchData(p[0], p[1]); // Multi<T> | Single<T>
			} else {
				read[i] = world.fetchData(p); // Multi<T> | Single<T>
			}
		}
	}

	// fetch写数据
	if (fun.__write__) {
		write = [];
		for(var i = 0; i < fun.__write__.length; i++) {
			let p = fun.__write__[i];
			if (Array.isArray(p)) {
				write[i] = world.fetchData(p[0], p[1]); // Multi<T> | Single<T>
			} else {
				write[i] = world.fetchData(p); // Multi<T> | Single<T>
			}
		}
	}

	return [read, write];
}

const loopAdd = (index: number): number => {
	if (index >= 9007199254740992) {
		return 1;
	} else {
		return index + 1;
	}
}
