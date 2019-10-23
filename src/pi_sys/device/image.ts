import { ResTab, Res } from '../modules/util/res_mgr';

export const loadImageRes = (_resTab: ResTab, _path: string): Promise<Res> => {
    return Promise.resolve(new Res());
}
