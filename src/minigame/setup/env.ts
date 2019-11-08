/**
 *
 */

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
}

export const get = (key: string) => {
    return ENV_MGR.getENV(key);
};