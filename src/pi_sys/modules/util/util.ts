declare var TextDecoder;
declare var TextEncoder;
declare var self;

/**
 * 通用模块， Number.isInteger可判断是否为整数， Array.isArray可判断是否为数组
 */
// ============================== 导出

// 单参数的回调函数
export interface Callback {
	(arg: any);
}
// 比较方法的回调函数
export interface DiffCallback {
	(args: any, key: string | number, v1: any, v2: any);
}

// 空回调函数，返回第一个参数
export const EmptyFunc = (arg?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any, arg7?: any, arg8?: any) => arg;

/**
 * @description 判断参数是否为字符串
 * @example
 */
export const isString = (str: any) => {
	return (typeof str === 'string');
};
/**
 * @description 判断参数是否为数字
 * @example
 */
export const isNumber = (num: any) => {
	return (typeof num === 'number');
};
/**
 * @description 判断参数是否为boolean
 * @example
 */
export const isBoolean = (bool: any) => {
	return (typeof bool === 'boolean');
};

export const isPrimaryDataType = (data: any) => {
	return data === null || data === undefined || isString(data) || isNumber(data) || isBoolean(data);
};
export const objToPrimaryData = (obj: any) => {
	// tslint:disable:variable-name
	const _data = {};
	for (const key in obj) {
		if (isString(obj[key])) {
			_data[key] = obj[key];
		} else {
			_data[key] = JSON.stringify(obj[key]);
		}
	}

	return _data;
};
/**
 * @description 返回字符串
 * @example
 */
export const toString = (o: any) => {
	if (o === undefined || o === null) {
		return o;
	}
	const t = typeof o;
	if (t === 'boolean' || t === 'number' || t === 'string' || t === 'function') {
		return o;
	}
	try {
		return JSON.stringify(o);
	} catch (e) {
		// tslint:disable:prefer-template
		return '' + o;
	}
};
/**
 * @description 将xx0yyyyy这样的整数(x不能为0, y可以为0)按从高位出现的第一个0来劈分数字，取x和y的值。 主要用在将配置中将类型和参数结合后的数的分解
 * @example
 */
export const splitFirstZero = (n: number) => {
    let lastn = 0;
    let lasti = 0;
    let i10 = 1;
    let i = n;
    while(i > 9) {
        i = (i/10)|0;
        i10*=10;
        if(i %10 === 0 ){
            lastn = i;
            lasti = i10;
        }
    }
    return [(lastn/10)|0, n - lastn*lasti];
};
/**
 * @description 比较2个Obj, 跳过所有_$开头的键， 值为undefined表示没有该键， 用===直接比较值。返回相同键的数量。先遍历长的，如果短的键都被长的覆盖，则不需要遍历短的
 * @example
 */
// tslint:disable-next-line:cyclomatic-complexity
export const objDiff = (obj1: any, objSize1: number, obj2: any, objSize2: number, cb: DiffCallback, args?: any): number => {
	let c = 0;
	if (objSize1 < objSize2) {
		for (const k in obj2) {
			if (k.charCodeAt(0) === 95 && k.charCodeAt(0) === 36) {
				continue;
			}
			const v1 = obj1[k];
			if (v1 !== undefined) {
				c++;
				const v2 = obj2[k];
				if (v1 !== v2) {
					cb(args, k, v1, v2);
				}
			} else {
				cb(args, k, v1, obj2[k]);
			}
		}
		if (c < objSize1) {
			for (const k in obj1) {
				if (k.charCodeAt(0) === 95 && k.charCodeAt(0) === 36) {
					continue;
				}
				const v2 = obj2[k];
				if (v2 === undefined) {
					cb(args, k, obj1[k], v2);
				}
			}
		}
	} else {
		for (const k in obj1) {
			if (k.charCodeAt(0) === 95 && k.charCodeAt(0) === 36) {
				continue;
			}
			const v2 = obj2[k];
			if (v2 !== undefined) {
				c++;
				const v1 = obj1[k];
				if (v1 !== v2) {
					cb(args, k, v1, v2);
				}
			} else {
				cb(args, k, obj1[k], v2);
			}
		}
		if (c < objSize2) {
			for (const k in obj2) {
				if (k.charCodeAt(0) === 95 && k.charCodeAt(0) === 36) {
					continue;
				}
				const v1 = obj1[k];
				if (v1 === undefined) {
					cb(args, k, v1, obj2[k]);
				}
			}
		}
	}

	return c;
};

/**
 * @description 比较2个Map， 值为undefined表示没有该键， 用===直接比较值。返回相同键的数量。先遍历长的，如果短的键都被长的覆盖，则不需要遍历短的
 * @example
 */
export const mapDiff = (map1: Map<string | number, any>, map2: Map<string | number, any>, cb: DiffCallback, args?: any): number => {
	let c = 0;
	if (map1.size < map2.size) {
		for (const [k, v2] of map2) {
			const v1 = map1.get(k);
			if (v1 !== undefined) {
				c++;
				if (v1 !== v2) {
					cb(args, k, v1, v2);
				}
			} else {
				cb(args, k, v1, v2);
			}
		}
		if (c < map1.size) {
			for (const [k, v1] of map1) {
				const v2 = map2.get(k);
				if (v2 === undefined) {
					cb(args, k, v1, v2);
				}
			}
		}
	} else {
		for (const [k, v1] of map1) {
			const v2 = map2.get(k);
			if (v2 !== undefined) {
				c++;
				if (v1 !== v2) {
					cb(args, k, v1, v2);
				}
			} else {
				cb(args, k, v1, v2);
			}
		}
		if (c < map2.size) {
			for (const [k, v2] of map2) {
				const v1 = map1.get(k);
				if (v1 === undefined) {
					cb(args, k, v1, v2);
				}
			}
		}
	}

	return c;
};

/**
 * @description 函数调用
 * @example
 */
export const call = (func: Function, args: any[]) => {
	if (Array.isArray(args)) {
		switch (args.length) {
			case 0:
				return func();
			case 1:
				return func(args[0]);
			case 2:
				return func(args[0], args[1]);
			case 3:
				return func(args[0], args[1], args[2]);
			case 4:
				return func(args[0], args[1], args[2], args[3]);
			case 5:
				return func(args[0], args[1], args[2], args[3], args[4]);
			case 6:
				return func(args[0], args[1], args[2], args[3], args[4], args[5]);
			case 7:
				return func(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
			case 8:
				return func(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
			default:
				func.apply(undefined, args);
		}
	} else {
		return func(args);
	}
};
/**
 * @description 对象方法调用
 * @example
 */
export const objCall = (obj: any, func: string, args: any[]) => {
	if (Array.isArray(args)) {
		switch (args.length) {
			case 0:
				return obj[func]();
			case 1:
				return obj[func](args[0]);
			case 2:
				return obj[func](args[0], args[1]);
			case 3:
				return obj[func](args[0], args[1], args[2]);
			case 4:
				return obj[func](args[0], args[1], args[2], args[3]);
			case 5:
				return obj[func](args[0], args[1], args[2], args[3], args[4]);
			case 6:
				return obj[func](args[0], args[1], args[2], args[3], args[4], args[5]);
			case 7:
				return obj[func](args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
			case 8:
				return obj[func](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
			default:
				obj[func].apply(obj, args);
		}
	} else {
		return obj[func](args);
	}
};

/**
 * @description 获得任意对象的深度Copy, 不支持循环引用
 * @example
 */
export const deepCopy = (v: any): any => {
	if (v === undefined || v === null) {
		return v;
	}
	const t = typeof v;
	if (t === 'boolean' || t === 'number' || t === 'string' || t === 'function') {
		return v;
	}
	if (v instanceof ArrayBuffer) {
		return v.slice(0);
	}
	if (ArrayBuffer.isView(v) && (<any>v).BYTES_PER_ELEMENT > 0) {
		return (<any>v).slice(0);
	}

	return JSON.parse(JSON.stringify(v));
};

/**
 * @description 复制Map
 * @example
 */
export const mapCopy = (src: Map<any, any>, dst: Map<any, any>) => {
	for (const [k, v] of src) {
		dst.set(k, v);
	}

	return dst;
};
/**
 * @description 根据指定的键路径，获得对象的值。键可以多层，数组或字符串，字符串默认用"."分隔
 * @example
 */
export const getValue = (obj: any, path: (string | number)[] | string, split?: string): any => {
	if (typeof path === 'string') {
		split = split || '.';
		let i = path.indexOf(split);
		let j = 0;
		while (i > j) {
			const k = path.slice(j, i);
			const v = obj[k];
			if (v === undefined) {
				return undefined;
			}
			if (v === null) {
				return null;
			}
			obj = v;
			j = i + 1;
			i = path.indexOf(split, j);
		}
		if (j > 0) {
			path = path.slice(j);
		}

		return obj[<string>path];
	}
	for (const k of path) {
		const v = obj[k];
		if (v === undefined) {
			return undefined;
		}
		if (v === null) {
			return null;
		}
		obj = v;
	}

	return obj;
};

/**
 * @description 根据指定的键路径，设置对象的值，层次更新值。键可以多层，数组或字符串，字符串默认用"."分隔。如果键是数字1-9开头，则认为是数组。 返回旧值
 * @example
 */
export const setValue = (obj: any, path: (string | number)[] | string, value: any, split?: string): any => {
	let old;
	if (typeof path === 'string') {
		split = split || '.';
		let i = path.indexOf(split);
		let j = 0;
		while (i > j) {
			const k = path.slice(j, i);
			old = obj[k];
			if (!old) {
				// 如果键是数字1-9开头，则认为应该生成数组
				const c = path.charCodeAt(i + 1);
				obj[k] = old = (c > 57 || c < 49) ? {} : [];
			}
			obj = old;
			j = i + 1;
			i = path.indexOf(split, j);
		}
		if (j > 0) {
			path = path.slice(j);
		}
		old = obj[<string>path];
		obj[<string>path] = value;

		return old;
	}
	let i = 0;
	for (const len = path.length - 1; i < len; i++) {
		const k = path[i];
		old = obj[k];
		if (!old) {
			// 如果键是数字
			obj[k] = old = Number.isInteger(<number>k) ? [] : {};
		}
		obj = old;
	}
	const k = path[i];
	old = obj[k];
	obj[k] = value;

	return old;
};

/**
 * @description utf8的Uint8Array解码成字符串
 * @example
 */
export const utf8Decode = ((self !== undefined) && (<any>self).TextDecoder) ? (() => {
	const decoder = new TextDecoder('utf-8');

	return (arr: ArrayBuffer | Uint8Array): string => {
		if ((!arr) || arr.byteLength === 0) {
			return '';
		}
		if (arr instanceof ArrayBuffer) {
			arr = new Uint8Array(arr);
		}

		return decoder.decode(arr);
	};
})() : (_arr: ArrayBuffer | Uint8Array): string => {
	if (!_arr || _arr.byteLength === 0) {
		return '';
	}
	let arr = null;
	if (_arr instanceof ArrayBuffer) {
		arr = new Uint8Array(_arr);
	} else {
		arr = _arr;
	}
	let c;
	let out = '';
	let i = 0;
	const len = arr.length;
	while (i < len) {
		c = arr[i++];
		if (c < 128) {
			out += String.fromCharCode(c);
		} else if (c < 0xE0 && i < len) {
			out += String.fromCharCode(((c & 0x1F) << 6) | (arr[i++] & 0x3F));
		} else if (c < 0xF0 && i + 1 < len) {
			out += String.fromCharCode((((c & 0x0F) << 12) | ((arr[i++] & 0x3F) << 6) | (arr[i++] & 0x3F)));
		} else if (c < 0xF8 && i + 2 < len) {
			out += String.fromCharCode((((c & 0x07) << 18) | ((arr[i++] & 0x3F) << 12) | ((arr[i++] & 0x3F) << 6) | (arr[i++] & 0x3F)));
		} else if (c < 0xFC && i + 3 < len) {
			// tslint:disable:max-line-length
			out += String.fromCharCode((((c & 0x03) << 24) | ((arr[i++] & 0x3F) << 18) | ((arr[i++] & 0x3F) << 12) | ((arr[i++] & 0x3F) << 6) | (arr[i++] & 0x3F)));
		} else if (c < 0xFE && i + 4 < len) {
			out += String.fromCharCode((((c & 0x01) << 30) | ((arr[i++] & 0x3F) << 24) | ((arr[i++] & 0x3F) << 18) | ((arr[i++] & 0x3F) << 12) | ((arr[i++] & 0x3F) << 6) | (arr[i++] & 0x3F)));
		} else {
			throw new Error('invalid utf8');
		}
	}

	return out;
};
/**
 * @description 字符串编码成utf8的Uint8Array
 * @example
 */
export const utf8Encode = ((self !== undefined) && (<any>self).TextDecoder) ? (() => {
	const encoder = new TextEncoder('utf-8');

	return (s: string): Uint8Array => {
		return (s && s.length > 0) ? encoder.encode(s) : null;
	};
})() : (s: string): Uint8Array => {
	if ((!s) || s.length === 0) {
		return null;
	}

	let bytes = [];
	let leadSurrogate = null;
	for (let i = 0; i < s.length; i++) {
		let codePoint = s.charCodeAt(i);
		// is surrogate component
		if (codePoint > 0xD7FF && codePoint < 0xE000) {
			// last char was a lead
			if (leadSurrogate) {
				// 2 leads in a row
				if (codePoint < 0xDC00) {
					bytes.push(0xEF, 0xBF, 0xBD);
					leadSurrogate = codePoint;
					continue
				} else {
					// valid surrogate pair
					codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000;
					leadSurrogate = null;
				}
			} else {
				// no lead yet

				if (codePoint > 0xDBFF) {
					// unexpected trail
					bytes.push(0xEF, 0xBF, 0xBD);
					continue;
				} else if (i + 1 === s.length) {
					// unpaired lead
					bytes.push(0xEF, 0xBF, 0xBD);
					continue;
				} else {
					// valid lead
					leadSurrogate = codePoint;
					continue;
				}
			}
		} else if (leadSurrogate) {
			// valid bmp char, but last char was a lead
			bytes.push(0xEF, 0xBF, 0xBD);
			leadSurrogate = null;
		}

		// encode utf8
		if (codePoint < 0x80) {
			bytes.push(codePoint);
		} else if (codePoint < 0x800) {
			bytes.push(
				codePoint >> 0x6 | 0xC0,
				codePoint & 0x3F | 0x80
			);
		} else if (codePoint < 0x10000) {
			bytes.push(
				codePoint >> 0xC | 0xE0,
				codePoint >> 0x6 & 0x3F | 0x80,
				codePoint & 0x3F | 0x80
			);
		} else if (codePoint < 0x200000) {
			bytes.push(
				codePoint >> 0x12 | 0xF0,
				codePoint >> 0xC & 0x3F | 0x80,
				codePoint >> 0x6 & 0x3F | 0x80,
				codePoint & 0x3F | 0x80
			);
		} else {
			throw new Error('Invalid code point');
		}
	}
	return new Uint8Array(bytes);
};
/**
 * @description 将字符串解析成json，可以执行运算，可以加注释，obj的键可以不用引号引起来。必须使用缓冲，因为该函数对象v8中不会释放。
 * @note return的两边加上圆括号，是为了让s有空行（因为js引擎的自动加分号机制）和开头的注释时候也能生效
 * @example
 */
export const toJson = (s: string) => {
	// tslint:disable:no-function-constructor-with-string-args
	return (new Function('return (' + s + ')'))();
};

/**
 * @description 获得指定模块的导出变量上，指定类型（包括父类型）的函数
 * @example
 */
export const getExport = (mod: any, func: Function, funcArgs: any): Function => {
	let k;
	let v;
	const exports = mod.exports;
	for (k in exports) {
		if (exports.hasOwnProperty(k)) {
			v = exports[k];
			if (func(v, funcArgs)) {
				return v;
			}
		}
	}
};
/**
 * @description 获得指定模块的导出变量上，指定类型（包括父类型）的函数
 * @example
 */
export const getExportFunc = (mod: any, func: Function, funcArgs: any): Function => {
	let k;
	let v;
	const exports = mod.exports;
	for (k in exports) {
		if (exports.hasOwnProperty(k)) {
			v = exports[k];
			if (func(v, funcArgs)) {
				return () => exports[k];
			}
		}
	}
};
/**
 * @description 检查对象是否为指定类型或其子类型
 * @example
 */
export const checkType = (obj: any, typeClass: Function): boolean => {
	return obj && obj.prototype && typeClass.isPrototypeOf(obj);
};
/**
 * @description 检查对象是否为指定类型或其子类型的实例
 * @example
 */
export const checkInstance = (obj: any, typeClass: Function): boolean => {
	return obj instanceof typeClass;
};

/**
 * @description 数组去重
 * @example
 */
export const unique = (arr: any[]) => {
	return Array.from(new Set(arr));
};

/**
 * @description 判断两个数组是否相等
 * @example
 */
export const arrayEqual = <T>(oldArr: T[], newArr: T[]): boolean => {
	if (oldArr === newArr) {
		return true;
	}
	if (oldArr.length !== newArr.length) {
		return false;
	}
	for (let i = oldArr.length - 1; i >= 0; i--) {
		if (oldArr[i] !== newArr[i]) {
			return false;
		}
	}

	return true;
};
/**
 * @description 数组删除子元素，将最后一个元素放到删除的位置上
 * @example
 */
export const arrDrop = <T>(arr: T[], el: T): number => {
	const i = arr.indexOf(el);
	if (i < 0) {
		return -1;
	}
	const len = arr.length - 1;
	if (i < len) {
		arr[i] = arr[len];
	}
	arr.length = len;

	return i;
};

/**
 * 设置数组指定位置的元素，不改变原数组，返回拷贝后的数组
 */
export const arrSet = <T>(arr: T[], el: T, i: number): T[] => {
	if (i < 0) {
		return arr;
	}
	if (i < arr.length) {
		const a = arr.slice();
		a[i] = el;

		return a;
	}

	return arr;
};
/**
 * 设置数组指定位置的元素，不改变原数组，返回拷贝后的数组，
 * 如果没有位置i或超过数组长度，则添加在尾部，i为负数或0表示添加在头部
 */
export const arrInsert = <T>(arr: T[], el: T, i?: number): T[] => {
	const a = arr.slice();
	if (i === undefined) {
		a.push(el);
	} else if (i <= 0) {
		a.unshift(el);
	} else if (i < a.length) {
		a.splice(i, 0, el);
	} else {
		a.push(el);
	}

	return a;
};

/**
 * 删除数组指定位置的元素，不改变原数组，返回拷贝后的数组
 */
export const arrDelete = <T>(arr: T[], i: number): T[] => {
	if (i < 0) {
		return arr;
	}
	if (i === 0) {
		return arr.slice(1, arr.length);
	}
	if (i < arr.length - 1) {
		const a = arr.slice();
		a.splice(i, 1);

		return a;
	}
	if (i === arr.length - 1) {
		return arr.slice(0, arr.length - 1);
	}

	return arr;
};

/**
 * 删除元素
 */
export const arrRemove = <T>(arr: T[], el: T): T[] => {
	const i = arr.indexOf(el);
	if (i < 0) {
		return arr;
	}
	if (i === 0) {
		return arr.slice(1, arr.length);
	}
	if (i < arr.length - 1) {
		const a = arr.slice();
		a.splice(i, 1);

        return a;
    }

    return arr.slice(0, arr.length - 1);
};

/**
 * 首字母转为大写
 */
export const upperFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

export const ab2hex = (buffer: Uint8Array): string => {
    let hexArr = Array.prototype.map.call(buffer, function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
    }
    )
    return hexArr.join('');
};