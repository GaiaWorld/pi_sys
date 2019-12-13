/**
 * RPC， 远程方法调用
 * 采用 mqtt上定义的每会话的$req和$resp主题，来发送请求和接受响应
 */

// ============================== 导入
import { Func, read, write } from "../serialization/struct_mgr";
import { BonBuffer, BonEncode } from '../serialization/bon';
import { Client } from "./mqtt_c";

/**
 * 创建一个RPC函数
 * @example
 */
export const create = (client: Client): Rpc => {
	const mqttRpc = new MqttRpc(client);
	client.onMessage((topic, payload: Uint8Array) => {
		if (topic === "$r") {
			let bb = new BonBuffer(payload, 0, payload.length);
			let rid = bb.readU32();//消息开始表示此次请求的id
			bb.readU8(); // timeout TODO
			if (mqttRpc.wait[rid]) {
				mqttRpc.wait[rid](read(bb));
				delete mqttRpc.wait[rid];
			}
		}
	});
	return (name: string, req: BonEncode, callback: Func, timeout: number) => {
		mqttRpc.call(name, req, callback, timeout);
	}
}

class MqttRpc {
	rid = 1;
	wait = {};
	client: Client;
	constructor(client: Client) {
		this.client = client;
	};

	//远程调用
	call(name: string, req: BonEncode, callback: Func, timeout: number) {
		let bb = new BonBuffer();
		this.wait[this.rid] = callback;
		bb.writeU32(this.rid++); // rid
		bb.writeU8(timeout); // timeout
		this.rid >= 0xffffffff && (this.rid = 1);
		write(req, bb);
		this.client.publish(name, bb.getBuffer(), 0, true);
	}
}

export interface Rpc {
	(name: string, req: BonEncode, callback: Func, timeout: number): void;
}
