/**
 * 下载游戏分享界面的背景图
 * @param gameName 游戏名称
 * @param url 游戏设置的分享的背景图地址
 * @param success（path）成功回调（地址）
 * @param fail（message）失败回调（失败原因）
 */
export const downLoadShareGameImageWithUrl = (gameName: string, url: string, success:(path: string) => void, fail:(message: string) => void) => {
    const callBack = (code: number, message: string) => {
        if (code === -1) {
            fail(message);
        } else {
            success(message);
        }
    };
    window.Service.downLoadShareGameImageWithUrl(gameName, url, callBack);
};

/**
 * 游戏中打开分享界面
 * @param imageName 游戏名
 * @param imagePath 图片地址 （如果没有的话，就填“”）
 * @param userName 用户名
 * @param shareCode 邀请码
 * @param shareUrl 用于生产二维码的URL
 * @param callBack(result) 0: 分享成功， -1： 分享失败  -2： 分享取消 
 */
export const goshare = (imageName: string, imagePath: string, userName: string, shareCode: string, shareUrl: string, callBack: (result) => void) => {
    window.Service.goShare(imageName, imagePath, userName, shareCode, shareUrl, callBack);
};

/**
 * android去充值---->打开界面
 * @param slv 银两余额
 */
export const goChareActivity = (slv) => {
    window.Service.goChareActivity(slv);
};

/**
 * 监听充值界面推送事件
 * @param success payAmount：充值金额，单位分，platform：充值平台
 * @param fail code: -1:用户点击返回
 */
export const addChareActionListener = (success:(payAmount, plateform: PayPlatform) => void, fail:(code) => void) => {
    const callBack = (code, payAmount, plateform) => {
        if (code === 0) {
            success(payAmount, plateform);
        } else {
            fail(code);
        }
    };
    window.Service.addActionListener('outpay_action',callBack);
};
/**
 * 关闭监听事件
 */
export const removeChareActionListener = () => {
    window.Service.removeActionListener('outpay_action');
};

/**
 * android游戏内充值---->打开界面
 * @param orderId 订单ID string
 * @param kupayId 好嗨ID string
 * @param balance 银两余额  int (fen)
 * @param seller 收款方 string
 * @param price 收款价格 string
 * @param pay 还需支付 int(fen)
 */
export const goChareInGameActivity = (orderId: String, kupayId: String, balance, seller: String, price: String, pay) => {
    window.Service.goChareInGameActivity(orderId, kupayId, balance, seller, price, pay);
};

/**
 * 监听充值界面推送事件
 * @param success(orderId, platform)订单ID， 充值平台
 * @param fail code: -1:用户点击返回
 */
export const addChareInGameActionListener = (success:(orderId: string, plateform: PayPlatform) => void, fail:(code) => void) => {
    const callBack = (code, orderId, plateform) => {
        if (code === 0) {
            success(orderId,plateform);
        } else {
            fail(code);
        }
    };
    window.Service.addActionListener('inpay_action',callBack);
};
/**
 * 关闭监听事件
 */
export const removeChareInGameActionListener = () => {
    window.Service.removeActionListener('inpay_action');
};

/**
 * 支付宝支付
 * callBack(code) 0: 成功  其他： 取消
 */
export const goAliPay = (codeInfo:String, callBack) => {
    window.Service.goAliPay(codeInfo, callBack);
};

/**
 * 微信支付
 * callBack(code) 0： 成功  其他： 取消
 */
export const goWeXinPay = (app_id: String, partnerid: String, prepayid: String, packages: String, noncestr: String, timestamp: String, sign: String, callBack) => {
    window.Service.goWXPay(app_id, partnerid, prepayid, packages, noncestr, timestamp, sign, callBack);
};

/**
 * 吊起ios支付界面
 * 
 * @param slv 银两余额
 * @param successCallBack 成功回調，拿到充值額度conpay, sMD:iOS支付时所需参数，不做修改，直接回传。 充值平台platform "iOS","alipay","weixinpay"
 * @param failCallBack 失敗回調，用戶選擇了取消
 */
export const gopay = (slv, muchNeed, successCallBack: (conpay, sMD, platform: PayPlatform) => void, failCallBack: () => void) => {
    const callBack = (isSuccess, conpay, sMD, platform) => {
        if (isSuccess === 'success') {
            successCallBack(conpay, sMD, platform);
        } else {
            failCallBack();
        }
    };
    window.JSVM.goPay(slv, muchNeed, callBack);
};

/**
 * 
 * @param sID 后台获取到的订单号
 * @param sMD iOS支付需要的字段
 * @param successCallBack 成功回调会收到订单号sID,凭证base64编码trans 发送给服务器验证
 */
export const goiOSPay = (sID, sMD, successCallBack: (sID, trans) => void, failCallBack: () => void) => {
    window.JSVM.goiosPay(sID, sMD, successCallBack, failCallBack);
};

export const closePayView = () => {
    window.JSVM.closePayView();
};

export enum PayPlatform {
    ApplePay = 'apple_pay',
    AliPay = 'alipay',
    WxPay = 'wxpay'
}