/**
 * **注：** 这个文件被构建系统特殊处理，会放到sys.js的最开头。
 * 
 * 模块加载，主要是 3个 接口：
 * 
 *   _$pi.define("a", ["require", "exports", "./b", "./c"], (require, exports, b, c) => { })
 *   
 *   _$pi.require(["./a", "./b"], (a, b) => {...})
 * 
 *   try {
 *          let a = _$pi.import("./a");
 *      或：
 *          let [a, b] = _$pi.import(["./a", "./b"]);
 *   } catch (e) {
 *      console.log("取不到模块");
 *   }
 */
var self;

try {
    self = window;
    window.self = self;
} catch (e) {

}

if (!self) {
    try {
        self = global;
        global.self = self;
        global.window = self;
    } catch (e) {

    }
}

var _$pi = self._$pi = _$pi || (function () {

    // ============================================ 数据结构

    // 工具数组
    let _addNames = [];
    let _deleteNames = [];

    class Module {
        /**
         * @param {Function} buildFunc = (require, exports, modules, a, b, c, ...) => { ... }
         * @param {string[]} dependNames 依赖模块名数组
         */
        constructor(name) {

            this.name = name;

            // 当模块还没有定义，exports为undefined
            this.exports = undefined; // 导出对象

            // 当构建成功后，下面变量全设置为undefined
            this.children = []; // 子模块
            this.buildFunc = undefined; // 构建函数
            this.childrenNames = undefined; // 子模块名

            // 当准备好构建之后，下面变量全设置为undefined
            this.parentNameSet = new Set(); // 父亲名字集合

            this.notifySet = undefined; // 当定义时，需要通知的函数集合
            this.waitNameSet = undefined; // 需要等待 定义的模块名集合
        }

        /**
         * 定义
         */
        setDefine(func, childrenNames) {
            this.exports = {};
            this.buildFunc = func;
            this.childrenNames = childrenNames;
        }

        /**
         * 准备好构建
         */
        setReadyBuild() {
            this.parentNameSet = undefined;
            this.waitNameSet = undefined;
        }

        /**
         * 构建成功
         */
        setBuild() {
            this.children = undefined;
            this.buildFunc = undefined;
            this.childrenNames = undefined;

            this.parentNameSet = undefined;
            this.waitNameSet = undefined;
        }

        /** 
         * 该模块是否已经定义
         */
        isDefined() {
            return this.exports !== undefined;
        }

        /** 
         * 该模块是否已经构建
         */
        isBuild() {
            return this.children === undefined;
        }

        /** 
         * 该模块是否已经准备好构建（或 已经构建）
         */
        isReadyBuild() {

            if (!this.isDefined()) {
                return false;
            }

            if (this.isBuild()) {
                return true;
            }

            if (this.waitNameSet) {
                this._modifyWaitSet();

                if (this.waitNameSet.size === 0) {
                    this.setReadyBuild();
                }
            }

            return this.parentNameSet === undefined;
        }

        _modifyWaitSet() {
            _addNames.length = 0;
            _deleteNames.length = 0;

            for (let n of this.waitNameSet) {
                let w = getModule(n);
                if (w.isDefined()) {
                    _deleteNames.push(n);
                    if (w.waitNameSet) {
                        for (let wn of w.waitNameSet) {
                            _addNames.push(wn);
                        }
                    }
                }
            }

            for (let n of _addNames) {
                this.waitNameSet.add(n);
            }

            for (let n of _deleteNames) {
                this.waitNameSet.delete(n);
            }

            for (let n of _addNames) {
                if (this.waitNameSet.has(n)) {
                    getModule(n).addNotify(this.name);
                }
            }
        }

        addNotify(name) {
            if (!this.notifySet) {
                this.notifySet = new Set();
            }
            this.notifySet.add(name);
        }

        addWaitName(name) {
            if (!this.waitNameSet) {
                this.waitNameSet = new Set();
            }
            this.waitNameSet.add(name);
        }
    }

    /**
     * 模块Map
     *    键：模块绝对路径
     *    值：Module对象
     */
    let _modules = new Map();

    /** 
     * 需要require通知的表
     * 键：模块名，值：[(export) => { ... }]
     */
    let _needRequires = new Map();

    // ============================================ 公有接口

    /**
     * 模块定义
     * name：模块的路径，相对与项目目录
     * depends: 该模块依赖的模块名数组，头三个永远是："require", "exports", "module"
     * func = (require, exports, module, 模块1-Export, 模块-2Export, ...) => { ... }
     *    参数长度和depends长度相同。
     */
    const define = (name, dependNames, func) => {

        let mod = getModule(name);
        if (mod.isDefined()) {
            throw new Error(`Module ${name} is already defined`);
        }

        let ds = [];
        // 依赖名称数组的头三个永远都是"require", "expots", "module" 去掉
        for (let i = 3; i < dependNames.length; ++i) {
            // 转成相对于name的绝对路径
            ds.push(relativePath(dependNames[i], name));
        }

        mod.setDefine(func, ds);

        // 子模块添加父亲
        for (let cname of ds) {
            let p = getModule(cname);
            if (p.parentNameSet) {
                p.parentNameSet.add(name);
            }
        }

        // 通知对应的函数处理
        if (mod.notifySet) {
            _notifySrc.add(name);
            if (_notifySrc.size === 1) {
                Promise.resolve().then(() => notifyDefine());
            }
        }
    }

    /**
     * 模块加载
     * names: Array or string, 模块名
     * func = (模块1-Export, 模块-2Export, ...) => { ... }
     *    参数长度和names长度相同
     */
    const require = (names, func, currModName) => {
        if (!Array.isArray(names)) {
            names = [names];
        }

        //如果是debug模式，模块在10秒内未被构建成功， 将打印错误信息
        requireDebug(names, currModName);

        let mods = [];
        let waitCount = names.length;
        for (let i = 0; i < names.length; ++i) {
            let name = relativePath(names[i], currModName);
            let mod = getModule(name);
            depend(name);
            if (mod.isReadyBuild()) {
                execModule(name);
                if (mod.isBuild()) {
                    mods[i] = mod.exports;
                    --waitCount;
                } else {
                    throw new Error(`require module ${name} failed`);
                }
            } else {
                if (!_needRequires.has(name)) {
                    _needRequires.set(name, []);
                }

                let reqs = _needRequires.get(name);
                reqs.push((exp) => {
                    mods[i] = exp;
                    if (--waitCount === 0) {
                        func(...mods);
                    }
                });
            }
        }

        if (waitCount === 0) {
            func(...mods);
        }
    }

    /**
     * 同步模块加载
     * names: string | string[], 模块名数组
     * 返回：如果 参数是字符串，返回模块导出；如果参数是数组，返回模块导出数组
     */
    const _import = (names, currName) => {

        let isParamString = typeof (names) === typeof ("");
        if (isParamString) {
            names = [names];
        }

        let r = [];

        for (let name of names) {
            name = relativePath(name, currName);
            let mod = getModule(name);
            depend(name, false);
            if (mod.isReadyBuild()) {
                execModule(name);

                if (mod.isBuild()) {
                    r.push(mod.exports);
                } else {
                    throw new Error(`_import Module ${name} failed`);
                }
            } else {
                throw new Error(`_import Module ${name}, depend isn't ready`);
            }
        }

        return isParamString ? r[0] : r;
    }

    // ============================================ 本地方法

    const getModule = (name) => {
        if (!_modules.has(name)) {
            _modules.set(name, new Module(name));
        }
        return _modules.get(name);
    }

    /** 
     * 分析依赖
     */
    const depend = (name, isNotify = true) => {
        let mod = getModule(name);

        // 模块没定义
        if (!mod.isDefined()) {
            mod.addNotify(name);
            return;
        }

        // 已经准备构建 或 构建成功
        if (mod.isReadyBuild()) {
            return;
        }

        // 已经分析过
        if (mod.waitNameSet) {
            if (isNotify) {
                // 需要为等待模块添加本模块的通知，否则等待模块定义后，无法通知这个模块。
                for (let w of mod.waitNameSet) {
                    getModule(w).addNotify(name);
                }
            }
            return;
        }

        mod.waitNameSet = new Set();

        let accessedSet = new Set();
        accessedSet.add(name);

        let notDefineSet = new Set();
        let collectArr = [mod.childrenNames];
        for (let i = 0; i < collectArr.length; ++i) {
            for (let cname of collectArr[i]) {
                if (accessedSet.has(cname)) {
                    continue;
                }
                accessedSet.add(cname);

                let child = getModule(cname);

                if (!child.isDefined()) {
                    notDefineSet.add(cname);
                    child.addNotify(name);
                } else if (child.isReadyBuild(name)) {
                    // 构建成功，不需要任何处理
                } else if (child.waitNameSet) {
                    // 已经分析过依赖
                    for (let w of child.waitNameSet) {
                        mod.waitNameSet.add(w);
                        getModule(w).addNotify(name);
                    }
                } else { // 子模块已经定义，但没有进行依赖分析
                    if (child.childrenNames) {
                        collectArr.push(child.childrenNames);
                    }
                }
            }
        }

        // 从没定义的模块开始，往上面设置 等待集合
        let tempSet = new Set(); // 记录访问过的模块名
        for (let waitName of notDefineSet) {

            tempSet.clear();

            collectArr.length = 0;
            collectArr.push(waitName);
            for (let i = 0; i < collectArr.length; ++i) {
                for (let pname of getModule(collectArr[i]).parentNameSet) {
                    if (!accessedSet.has(pname) || tempSet.has(pname)) {
                        continue;
                    }
                    tempSet.add(pname);
                    collectArr.push(pname);

                    getModule(pname).addWaitName(waitName);
                }
            }
        }
    }

    const requireAgain = (name) => {
        let mod = getModule(name);
        if (mod.isReadyBuild()) {
            execModule(name);

            if (!mod.isBuild()) {
                throw new Error(`Module ${name} failed to build`);
            }

            let fs = _needRequires.get(name);
            if (fs) {
                for (let f of fs) {
                    f(mod.exports);
                }
                _needRequires.delete(name);
            }
        }
    }

    let _notifySrc = new Set();
    const notifyDefine = () => {
        for (let name of _notifySrc) {
            // 找新的等待模块
            depend(name);

            let mod = getModule(name);
            if (mod.notifySet) {
                for (let n of mod.notifySet) {
                    requireAgain(n);
                }
                mod.notifySet = undefined;
            }
        }
        _notifySrc.clear();
    }

    /** 
     * 执行模块, waits = Set<string>();
     * 返回等待模块的数量
     */
    const execModule = (name, accessedSet) => {
        let mod = getModule(name);
        if (!mod.isDefined()) {
            throw new Error(`Module ${name} isn't defined`);
        }

        // 已经加载
        if (mod.isBuild()) {
            return;
        }

        if (!accessedSet) {
            accessedSet = new Set();
        }

        // 子模块
        accessedSet.add(name);
        for (let i = 0; i < mod.childrenNames.length; ++i) {
            if (!mod.children[i]) {
                let cname = mod.childrenNames[i];

                // 循环，则直接指定
                let c = _modules.get(cname);
                if (accessedSet.has(cname)) {
                    mod.children[i] = c.exports;
                    continue;
                }

                execModule(cname, accessedSet);
                if (c.isBuild()) {
                    mod.children[i] = c.exports;
                } else {
                    throw new Error(`build module ${cname} failed`);
                }
            }
        }
        accessedSet.delete(name);

        let func = mod.buildFunc;
        mod.buildFunc = undefined;

        const reqFunc = (names, f) => {
            if (f) {
                require(names, f, name);
            } else {
                return _import(names, name);
            }
        }
        func(reqFunc, mod.exports, mod, ...mod.children);
        mod.setBuild();
    }

    /**
     * 以 dir的目录路径 为基准，计算filePath的绝对路径。
     * 注：如果filePath不以 . 开头，那么filePath就是绝对路径，直接返回即可。
     */
    const relativePath = (filePath, dir) => {
        // 不以 . 开头，就是绝对路径，直接返回
        if (filePath.charCodeAt(0) !== 46) {
            return filePath;
        }

        let i = 0;
        let len = filePath.length;
        let j = dir.length - 1;

        // 最后一个字符不是/，就代表dir不是目录，需要定位到目录
        if (dir.charCodeAt(j) !== 47) {
            j = dir.lastIndexOf("/");
        }

        while (i < len) {
            if (filePath.charCodeAt(i) !== 46) {
                break;
            }
            if (filePath.charCodeAt(i + 1) === 47) { // ./的情况
                i += 2;
                break;
            }
            if (filePath.charCodeAt(i + 1) !== 46 || filePath.charCodeAt(i + 2) !== 47) {
                break;
            }
            // ../的情况
            i += 3;
            j = dir.lastIndexOf("/", j - 1);
        }

        if (i > 0) {
            filePath = filePath.slice(i);
        }

        if (j < 0) {
            return filePath;
        }

        if (j < dir.length - 1) {
            dir = dir.slice(0, j + 1);
        }

        return dir + filePath;
    }

    const requireDebug = (names, currModName) => {
        let envModule = _$pi._modules.get("pi_sys/setup/env");
        let is_debug = envModule && envModule.exports && envModule.exports.get && envModule.exports.get("debug");
        if (!is_debug) {
            return;
        }

        let mods = [];
        if (is_debug) {
            for (let i = 0; i < names.length; ++i) {
                let name = relativePath(names[i], currModName);
                let mod = getModule(name);
                mods.push(mod);
            }
        }

        setTimeout(() => {
            for (let modi of mods) {
                if (!modi.isBuild()) {
                    let message = {
                        name: modi.name
                    };
                    requireDebugWait(message);
                    console.error("require module fail, module: ", message);
                }
            }
        }, 10000);
    }

    const requireDebugWait = (wait) => {
        let mod = _modules.get(wait.name);
        if (!mod || !mod.isDefined()) {
            wait.reason = "not defined";
        } else if (!mod.isBuild()) {
            wait.reason = "wait depend";
            if (mod.waitNameSet) {
                for (wait1 of mod.waitNameSet) {
                    wait.wait = {
                        name: wait1
                    };
                    requireDebugWait(wait.wait);
                    break;
                }
            }
        }
    }

    // ====================== 返回

    return {
        define: define,
        require(names, func) {
            if (func) {
                require(names, func, "");
            } else {
                return _import(names, "");
            }
        },

        // 以下字段 仅仅 用于控制台查看，方便调试，不能用于写逻辑代码；
        _modules,
    };
}());