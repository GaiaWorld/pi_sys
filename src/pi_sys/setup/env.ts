
export const init = (json: any) => {
    for(let k in json) {
        if(json.hasOwnProperty(k))
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