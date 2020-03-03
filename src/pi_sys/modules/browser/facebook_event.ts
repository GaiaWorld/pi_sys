/**
 * facebook 事件记录
 */
// ============================== 导入
import { NativeObject, registerSign, ParamType } from './native';
// ============================== 导出

export class FaceBookEvent extends NativeObject {

	constructor() {
		super();
		this.init();
	}

	/**
	 * 记录当前事件，没有参数
	 * @param logEvent：事件名（可以使用faceBook标准事件名，也可以使用自己在facebook申请的自定义事件，不能随便填写）
	 */
	recordingEventsWithLogEvent(logEvent: string) {
		this.call("recordingEventsWithLogEvent", { logEvent });
	}

	/**
	 * 记录当前事件
	 * @param logEvent：事件名（可以使用faceBook标准事件名，也可以使用自己在facebook申请的自定义事件，不能随便填写）
	 * @param valueToSum: 总数
	 */
	recordingEventsWithLogEventAndValueToSum(logEvent: string, valueToSum: number) {
		this.call("recordingEventsWithLogEventAndValueToSum", { logEvent, valueToSum });
	}

	/**
	 * 记录当前事件
	 * @param logEvent：事件名（可以使用faceBook标准事件名，也可以使用自己在facebook申请的自定义事件，不能随便填写）
	 * @param params: 参数，json字符串，key为faceBook提供的标准事件名，或者自己在facebook申请的自定义参数，不能随便填写
	 */
	recordingEventsWithLogEventAndParams(logEvent: string, params: string) {
		this.call("recordingEventsWithLogEventAndParams", { logEvent, params });
	}

	/**
	 * 记录当前事件
	 * @param logEvent：事件名（可以使用faceBook标准事件名，也可以使用自己在facebook申请的自定义事件，不能随便填写）
	 * @param valueToSum: 总数
	 * @param params: 参数，json字符串，key为faceBook提供的标准事件名，或者自己在facebook申请的自定义参数，不能随便填写
	 */
	recordingEventsWithLogEventAndValueToSumAndParams(logEvent: string, valueToSum: number, params: string) {
		this.call("recordingEventsWithLogEventAndValueToSumAndParams", { logEvent, valueToSum, params });
	}

	/**
	 * 购买完成
	 * @param pushchase 购买的数量
	 * @param currency 货币单位：eg "USD"
	 * @param params 参数，json字符串
	 */
	purchase(pushchase: number, currency: string, params: string){
		this.call("purchase", { pushchase, currency, params });
	}

}

// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(FaceBookEvent, {
	recordingEventsWithLogEvent: [
		{
			name: 'logEvent',
			type: ParamType.String
		}
	],
	recordingEventsWithLogEventAndValueToSum: [
		{
			name: 'logEvent',
			type: ParamType.String
		},{
			name: 'valueToSum',
			type: ParamType.Number
		}
	],
	recordingEventsWithLogEventAndParams: [
		{
			name: 'logEvent',
			type: ParamType.String
		},{
			name: 'params',
			type: ParamType.String
		}
	],
	recordingEventsWithLogEventAndValueToSumAndParams: [
		{
			name: 'logEvent',
			type: ParamType.String
		},{
			name: 'valueToSum',
			type: ParamType.Number
		},{
			name: 'params',
			type: ParamType.String
		}
	],
	purchase:[
		{
			name: 'pushchase',
			type: ParamType.Number
		},{
			name: 'currency',
			type: ParamType.String
		},{
			name: 'params',
			type: ParamType.String
		}
	],
});


//===================================================

// /** Log this event when an app is being activated. */
// public static final String EVENT_NAME_ACTIVATED_APP = "fb_mobile_activate_app";

// public static final String EVENT_NAME_DEACTIVATED_APP = "fb_mobile_deactivate_app";

// public static final String EVENT_NAME_SESSION_INTERRUPTIONS = "fb_mobile_app_interruptions";

// public static final String EVENT_NAME_TIME_BETWEEN_SESSIONS = "fb_mobile_time_between_sessions";

// /** Log this event when the user has completed registration with the app. */
// public static final String EVENT_NAME_COMPLETED_REGISTRATION =
// 		"fb_mobile_complete_registration";

// /** Log this event when the user has viewed a form of content in the app. */
// public static final String EVENT_NAME_VIEWED_CONTENT = "fb_mobile_content_view";

// /** Log this event when the user has performed a search within the app. */
// public static final String EVENT_NAME_SEARCHED = "fb_mobile_search";

// /**
//  * Log this event when the user has rated an item in the app.
//  * The valueToSum passed to logEvent should be the numeric rating.
//  */
// public static final String EVENT_NAME_RATED = "fb_mobile_rate";

// /** Log this event when the user has completed a tutorial in the app. */
// public static final String EVENT_NAME_COMPLETED_TUTORIAL = "fb_mobile_tutorial_completion";

// /** Log this event when the app obtained a push registration token from FCM. */
// public static final String EVENT_NAME_PUSH_TOKEN_OBTAINED = "fb_mobile_obtain_push_token";

// // Ecommerce related

// /**
//  * Log this event when the user has added an item to their cart.
//  * The valueToSum passed to logEvent should be the item's price.
//  */
// public static final String EVENT_NAME_ADDED_TO_CART = "fb_mobile_add_to_cart";

// /**
//  * Log this event when the user has added an item to their wishlist.
//  * The valueToSum passed to logEvent should be the item's price.
//  */
// public static final String EVENT_NAME_ADDED_TO_WISHLIST = "fb_mobile_add_to_wishlist";

// /**
//  * Log this event when the user has entered the checkout process.
//  * The valueToSum passed to logEvent should be the total price in the cart.
//  */
// public static final String EVENT_NAME_INITIATED_CHECKOUT = "fb_mobile_initiated_checkout";

// /** Log this event when the user has entered their payment info. */
// public static final String EVENT_NAME_ADDED_PAYMENT_INFO = "fb_mobile_add_payment_info";