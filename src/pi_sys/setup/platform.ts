
export enum PlatformType {
    Web = "Web", 
    Win = "Win",
    Android = "Android",
    IOS = "iOS",
}

export const getPlatformType = (): PlatformType => {
    return PlatformType.Web;
}