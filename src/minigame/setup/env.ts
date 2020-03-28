
/**
 * 通用Key
 */
export enum CommonKey {
    AssetPath = "asset_path",
    UserAgent = "user_agent",
}

export const init = (json: any) => {
    ENV_MGR.init(json);
}

export const get = (key: string) => {
    return ENV_MGR.getENV(key);
};

export const set = (key: string, value: any) => {
    return ENV_MGR.setENV(key, value);
};

export const keys = () => {
    return ENV_MGR.keys();
}

// ================================= 本地

export type ENV_CFG = any;

export class ENV_MGR {

    private static env: Map<string, any> = new Map();

    public static init(CFG: ENV_CFG) {
        for (const k in CFG) {
            if (CFG.hasOwnProperty(k)) {
                ENV_MGR.env.set(k, CFG[k]);
            }
        }
    }

    public static getENV(key: string) {
        return ENV_MGR.env.get(key);
    }

    public static setENV(key: string, value: any) {
        ENV_MGR.env.set(key, value);
    }

    public static keys() {
        return ENV_MGR.env.keys();
    }
}