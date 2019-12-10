/**
 * 嵌套概率结构， 支持3种结构。 
 * 平均Avg, 表示里面每个元素按相同几率被选择1个。 
 * 权重Weight, 表示里面每个元素根据权重被选择1个或0个。 权重必须是整数。 允许权重数量大于内容， 这样允许可以返回undefined。
 * 概率Prob, 表示里面每个元素都有概率被选中。 概率必须是[0, 1.0)的浮点数。
 * 支持多层嵌套， 如果被选择的还是Avg,Weight,Prob，则继续选择。
 * 顺序概率Rate, 表示里面的元素按顺序依次检查能否按几率被选中， 如果选中则返回。 仅声明使用，实际转化成了权重。
 */

// ============================== 导入
import {Rand} from "./rand"

// ============================== 导出

export class Avg{
	values: any[];

	constructor(values: any[]) {
		this.values = values;
	}
	select(rand: Rand, result: any[]) {
		let i = this.values.length > 1 ?rand.nextInt(0, this.values.length) : 0;
		nextSelect(rand, this.values[i], result);
	}
}
export class Weight extends Avg{
    weights: number[];
	amount: number = 0;

	constructor(values: any[], weights: number[]) {
		super(values);
		// 允许权重数量大于内容， 这样允许可以返回undefined
		if(values.length < weights.length)
			throw("invalid Weight")
		this.weights = weights;
		for(let w of weights)
			this.amount += w;
	}
	select(rand: Rand, result: any[]){
		let cur = rand.nextInt(0, this.amount);
		let i = 0;
		for(let w of this.weights) {
			if(cur < w) {
				return nextSelect(rand, this.values[i], result);
			}
			cur -= w;
			i+=1;
		}
	}
}
export class Prob extends Avg{
    probs: number[];
	constructor(values: any[], probs: number[]) {
		super(values);
		if(values.length !== probs.length)
			throw("invalid Prob")
		this.probs = probs;
	}
	select(rand: Rand, result: any[]){
		let i = 0;
		for(let p of this.probs) {
			if(p === 1.0 || p >= rand.nextFloat(0, 1.0)) {
				nextSelect(rand, this.values[i], result);
			}
			i+=1;
		}
	}
}
// 将顺序概率Rate, 里面的元素按顺序依次检查能否按概率被选中，将其转化成了权重。概率必须是[0, 1.0)的浮点数。
export const rateToWeight = (arr: number[]) : number[] => {
	// 按100,000,000扩大，转化成整数
	let w = 100000000;
	let r = arr.map(e => {
		let r = (e * w) | 0;
		w -= r;
		return r;
	});
	if(w > 0)
		r.push(w);
	return r;
}
/**
 * @description 将数组转成100%的概率Prob。如果是嵌套随机结构，则返回对应的Avg。 如果都不是（比如数字或字符串或json），则转成单元素的Avg，保证100%返回。
 */
export const make = (arg: any[] | number | any) : Avg => {
	if(Array.isArray(arg)) {
		let p = [];
		p.length = arg.length;
		return new Prob(arg.map(e => {
			return makeByJson(e) || e;
		}), p.map(_e => {
			return 1.0;
		}));
	}
	let r = makeByJson(arg);
	if(r) {
		return r;
	}
	return new Avg([arg]);
}
/**
 * @description 用约定结构的嵌套结构数组来构建嵌套随机结构。
 * {"avg_v": [{"prob_p": [0.5,0.2,0.8], "prob_v": [{"rate_p": [0.9, 1.0], "rate_v": [{"a":1}, {"b":2}]}, 200, 500]}, {"weight_w": [5, 8, 10, 20], "weight_v": ["a", "b", "c"]} ]}
 * 嵌套的结构如下： 
 * {"avg_v": [...内容数组]}, 
 * {"weight_w": [...权重数组], "weight_v": [...与权重数组等长的内容数组]}, 
 * {"rate_p": [...概率数组], "rate_v": [...与概率数组等长的内容数组]}, 
 * {"prob_p": [...概率数组], "prob_v": [...与概率数组等长的内容数组]}, 
 * 
 * 如果内容不符合嵌套的结构，则认为是最终值。
 */
export const makeByJson = (cfg: any) : Avg => {
	if(Array.isArray(cfg.avg_v)) {
		return new Avg(cfg.avg_v.map(e => {
			return makeByJson(e) || e;
		}));
	}else if(Array.isArray(cfg.weight_w) && Array.isArray(cfg.weight_v)){
		return new Weight(cfg.weight_v.map(e => {
			return makeByJson(e) || e;
		}), cfg.weight_w);
	}else if(Array.isArray(cfg.rate_p) && Array.isArray(cfg.rate_v)){
		return new Weight(cfg.rate_v.map(e => {
			return makeByJson(e) || e;
		}), rateToWeight(cfg.rate_p));
	}else if(Array.isArray(cfg.prob_p) && Array.isArray(cfg.prob_v)){	
		return new Prob(cfg.prob_v.map(e => {
			return makeByJson(e) || e;
		}), cfg.prob_p);
	}
	return null
}

// 嵌套迭代选择
const nextSelect = (rand: Rand, r: any, result: any[]) => {
	if(r instanceof Avg) {
		return r.select(rand, result)
	}
	result.push(r);
}
