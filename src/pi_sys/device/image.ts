import { ResTab, Res } from '../modules/util/res_mgr';

export const loadImageRes = (_resTab: ResTab, _path: string, args?: any[]): Promise<Res> => {
    return Promise.resolve(new Res());
};

// 往Res中注册Image对象
export const initImageLoad = () => {
    
}