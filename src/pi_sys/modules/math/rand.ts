/**
 * RC4 的随机种子. 提供32位随机性
 * https://github.com/ckknight/random-js
 */

// ============================== 导入
import {imul, INT32_SIZE, INT32_MAX, UINT32_MAX} from "./math"

// ============================== 导出
const ARRAY_SIZE = 624;
const ARRAY_MAX = ARRAY_SIZE - 1;
const M = 397;
const ARRAY_SIZE_MINUS_M = ARRAY_SIZE - M;
const A = 0x9908b0df;

export class Rand {
	private data: Int32Array;
	private index: number; // integer within [0, 624]

	constructor(seed = 1) {
		let data = new Int32Array(ARRAY_SIZE);
		let previous = 0;
		data[0] = previous = seed | 0;

		for (let i = 1; i < ARRAY_SIZE; i++) {
			data[i] = previous = (imul(previous ^ (previous >>> 30), 0x6c078965) + i) | 0;
		}
		this.data = data;
		this.index = ARRAY_SIZE;
	}
	public next() : number {
		if (this.index >= ARRAY_SIZE) {
			this.refreshData(this.data);
			this.index = 0;
		}
		const v = this.data[this.index];
		this.index++;
		return this.value(v);
	}
	public discard(count: number) {
		if (count <= 0) {
		  return;
		}
		if (this.index >= ARRAY_SIZE) {
			this.refreshData(this.data);
			this.index = 0;
		}
		while (count + this.index > ARRAY_SIZE) {
		  count -= ARRAY_SIZE - this.index;
		  this.refreshData(this.data);
		  this.index = 0;
		}
		this.index += count;
	}
	public getState() {
		return {data:this.data, index:this.index}
	}
	public setState(state:{data:Int32Array, index:number}) {
		this.data = state.data;
		this.index = state.index;
	}
	private value(v: number) {
		v ^= v >>> 11;
		v ^= (v << 7) & 0x9d2c5680;
		v ^= (v << 15) & 0xefc60000;
		return (v ^ (v >>> 18)) >>> 0;
	}
	private refreshData(data: Int32Array) {
		let k = 0;
		let tmp = 0;
		for (; k < ARRAY_SIZE_MINUS_M; k++) {
		  tmp = (data[k] & INT32_SIZE) | (data[(k + 1)] & INT32_MAX);
		  data[k] = data[(k + M)] ^ (tmp >>> 1) ^ (tmp & 0x1 ? A : 0);
		}
		for (; k < ARRAY_MAX; k++) {
		  tmp = (data[k] & INT32_SIZE) | (data[(k + 1)] & INT32_MAX);
		  data[k] = data[(k - ARRAY_SIZE_MINUS_M)] ^ (tmp >>> 1) ^ (tmp & 0x1 ? A : 0);
		}
		tmp = (data[ARRAY_MAX] & INT32_SIZE) | (data[0] & INT32_MAX);
		data[ARRAY_MAX] = data[M - 1] ^ (tmp >>> 1) ^ (tmp & 0x1 ? A : 0);
	}
	/**
	 * @description 获得一个指定范围（左闭右开区间）的随机浮点数
	 */
	public nextFloat(v1: number, v2: number): number {
		return v1 + this.next()/UINT32_MAX * (v2 - v1);
	}
	/**
	 * @description 获得一个指定范围（闭区间）的随机整数
	 */
	public nextInt(v1: number, v2: number): number {
		return v1 + Math.floor(this.next()/UINT32_MAX * (v2 - v1 + 1.0));
	}
	/**
	 * @description 数组乱序
	 */
	public shuffle(array: any[]) {
		for (let i = array.length - 1; i >= 0; i--) {
			const j = Math.floor(this.next()/UINT32_MAX * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
}
