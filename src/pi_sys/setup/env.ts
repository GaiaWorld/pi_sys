
/**
 * 通用Key
 */
export enum CommonKey {
    UserAgent = "user_agent",                // navigation.userAgent
    MobileAssetPath = "mobile_asset_path",   // 移动端的AssetPath
    WindowsAssetPath = "windows_asset_path", // Windows的AssetPath
    AssetDependPath = "asset_depend_path",   // 本地包的depend文件名，相对于assetPath，不以/开头
}

export const init = (json: any) => {
    for (let k in json) {
        if (json.hasOwnProperty(k))
            map.set(k, json[k])
    }
}

export const get = (key: string) => {
    return map.get(key)
}

export const set = (key: string, val: any) => {
    return map.set(key, val)
}

export const keys = () => {
    return map.keys()
}

// ============================== 本地
const map: Map<string, any> = new Map;