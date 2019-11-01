export interface MqttServer {
    setTopic(topic: string, can_publish: boolean, can_subscribe: boolean): boolean;
    unsetTopic(topic: string): void;
}

export interface addGlobalMqttTopic {
	(is_public:boolean,topic:string)
}