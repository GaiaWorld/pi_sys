import { CommonKey, get as getEnv } from "../../pi_sys/setup/env"

export enum PlatformType {
    Web = "Web", 
    Win = "Win",
    Android = "Android",
    IOS = "iOS",
}

export const getPlatformType = (): PlatformType => {
    if (platform !== undefined) {
        return platform;
    }

    platform = PlatformType.Web;

    let ua = getEnv(CommonKey.UserAgent);
    if (ua.indexOf("YINENG_ANDROID") >= 0) {
        platform = PlatformType.Android;
    } else if (ua.indexOf("YINENG_IOS") >= 0) {
        platform = PlatformType.IOS;
    } else if (ua.indexOf("YINENG_WINDOWS") >= 0) {
        platform = PlatformType.Win;
    }

    return platform;
}

// ================================= 本地

let platform: PlatformType = undefined;