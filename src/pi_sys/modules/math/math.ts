/**
 * 数学库
 */

// 32 位下实现 64 位的乘法运算
// 	http://www.mouseos.com/assembly/example/mul64.html

// ============================== 导入

// ============================== 导出
export const UINT32_MAX = -1 >>> 0;
export const UINT32_SIZE = UINT32_MAX + 1;
export const INT32_SIZE = UINT32_SIZE / 2;
export const INT32_MAX = INT32_SIZE - 1;

/**
 * 浮点误差
 */
export const EPISION = 0.001;

/**
 * 处理显示上的浮点误差， 选择 12 是一个经验的选择，一般选12就能解决掉大部分0001和0009问题
 * 遇到浮点数误差问题时可以直接使用 https://github.com/dt-fe/number-precision
 * 一个用于任意精度的十进制算术的小型，快速的JavaScript的库。 http://mikemcl.github.io/big.js
 */
export const strip = (num: number, precision = 12) => {
	return +parseFloat(num.toPrecision(precision));
};

/**
 * 返回被视为 32 位带符号整数的两个数字的积。和C的运算一致，会自动溢出32以上的值
 */
export const imul = (() => {
	if (Math.imul) {
		return Math.imul;
	}

	return (a: number, b: number) =>
		(((a & 0xffff) * b) + ((((a >>> 16) * b) & 0xffff) << 16)) & 0xffffffff;
})();

/**
 * 取小数点后n位数，其后的数四舍五入
 * @param   nfloat 数字
 * @param   n 前n位
 * @return  数字
 */
export const round = (nfloat: number, n: number) => {
	const i = Math.pow(10, n);

	return Math.round(nfloat * i) / i;
};
/**
 * 取小数点前n位数，其后的数四舍五入
 * @param   nint 数字
 * @param   n 前n位
 * @return  数字
 */
export const roundInt = (nint: number, n: number) => {
	const i = Math.pow(10, n);

	return Math.round(nint / i) * i;
};

/**
 * @description 获得一个指定范围（左闭右开区间）的随机浮点数
 * @example
 *
 */
export const randomFloat = (v1: number, v2: number): number => {
	return v1 + Math.random() * (v2 - v1);
};
/**
 * @description 获得一个指定范围（闭区间）的随机整数
 * @example
 *
 */
export const randomInt = (v1: number, v2: number): number => {
	return v1 + Math.floor(Math.random() * (v2 - v1 + 1.0));
};

/**
 * @description 获得一个安全的随机32位整数
 * @example
 *
 */
export const cryptoRandomInt = (): number => {
	if (crypto) {
		crypto.getRandomValues(cryptoCache);

		return cryptoCache[0];
	} else {
		return Math.floor(Math.random() * 0xffffffff);
	}
};

/**
 * @description 获得一组安全的随机32位整数
 * @example
 *
 */
export const cryptoRandomInts = (array: Uint32Array): ArrayBufferView => {
	if (crypto) {
		return crypto.getRandomValues(array);
	}
	for (let i = 0, len = array.length; i < len; i++) {
		array[i] = Math.floor(Math.random() * 0xffffffff);
	}

	return array;
};
/**
 * @description 数组乱序
 * @example
 *
 */
export const shuffle = (array: any[]) => {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

/**
 * @description 获得两个向量夹角的方向，正数为顺时针，负数为逆时针
 * @example
 */
export const getDirection = (vx1: number, vy1: number, vx2: number, vy2: number): number => {
	return vx1 * vy2 - vx2 * vy1;
};
/**
 * @description 获得两个向量夹角的度数
 * @example
 */
export const getAngle = (vx1: number, vy1: number, vx2: number, vy2: number) => {
	const len1 = Math.sqrt(vx1 * vx1 + vy1 * vy1);
	const len2 = Math.sqrt(vx2 * vx2 + vy2 * vy2);
	const mr = len1 * len2;
	if (mr === 0) {
		return 0;
	}
	const dot = vx1 * vx2 + vy1 * vy2;
	let r = dot / mr;
	if (r > 1) {
		r = 1;
	} else if (r < -1) {
		r = -1;
	}

	return Math.acos(r) * 180 / Math.PI;
};

/**
 * @description  线性插值 interpolation
 * @example
 */
export const linear = (t: number, p0: number, p1: number): number => {
	return (p1 - p0) * t + p0;
};
/**
 * @description  阶乘
 * @example
 */
export const factorial = (n: number): number => {
	const len = facCache.length;
	if (n < len) {
		return facCache[n];
	}
	let s = facCache[len - 1];
	for (let i = len; i <= n; i++) {
		s *= i;
		facCache.push(s);
	}

	return s;
};
/**
 * @description  伯恩斯坦 多项式
 * @example
 */
export const bernstein = (i: number, n: number): number => {
	return factorial(n) / factorial(i) / factorial(n - i);
};
/**
 * @description Catmull-Rom 样条插值 interpolation
 * @example
 */
export const catmullRom = (t: number, p0: number, p1: number, p2: number, p3: number): number => {
	const v0 = (p2 - p0) * 0.5;
	const v1 = (p3 - p1) * 0.5;
	const t2 = t * t;
	const t3 = t * t2;

	// tslint:disable:binary-expression-operand-order
	return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
};

/**
 * @description 截取num在[min, max]之间
 * @note 假设：min必须小于等于max
 */
export const clamp = (num: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, num));
};

/**
 * @description 3次平滑插值
 */
export const smoothstep = (x: number, min: number, max: number) => {
	if (x <= min) return 0;
	if (x >= max) return 1;
	x = (x - min) / (max - min);

	return x * x * (3 - 2 * x);
};

/**
 * @description 5次平滑插值
 */
export const smootherstep = (x: number, min: number, max: number) => {
	if (x <= min) return 0;
	if (x >= max) return 1;
	x = (x - min) / (max - min);

	return x * x * x * (x * (x * 6 - 15) + 10);
};

/**
 * @description 角度转弧度
 */
export const degreeToRadian = (degrees: number) => {
	const DEG2RAD = Math.PI / 180;

	return degrees * DEG2RAD;
};

/**
 * @description 弧度转角度
 */
export const radianToDegree = (radians: number) => {
	const RAD2DEG = 180 / Math.PI;

	return radians * RAD2DEG;
};

/**
 * @description 是否为二的冥
 */
export const isPowerOfTwo = (value: number) => {
	return (value & (value - 1)) === 0 && value !== 0;
};

/**
 * @description 最近的2的冥的整数
 */
export const nearestPowerOfTwo = (value: number) => {
	return Math.pow(2, Math.round(Math.log(value) / Math.LN2));
};

/**
 * @description 下一个2的冥的数
 */
export const nextPowerOfTwo = (value: number) => {
	--value;
	value |= value >> 1;
	value |= value >> 2;
	value |= value >> 4;
	value |= value >> 8;
	value |= value >> 16;

	return ++value;
};

/**
 * @description 浮点数相等
 */
export const equal = (num1: number, num2: number) => {
	return Math.abs(num1 - num2) < EPISION;
};

// ============================== 本地
// 阶乘的计算缓冲
const facCache = [0, 1, 2];

// 单个安全的随机32位整数的计算缓冲
const cryptoCache = new Uint32Array(1);
