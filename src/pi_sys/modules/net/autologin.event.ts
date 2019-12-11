
/**
 * 会话管理
 */

// ================================================================= 导入
import { Mgr, Tr } from '../db/mgr';
import { Env } from '../lang/env';
import { Session as PiSession } from '../net/session';
import { randomInt } from '../math/math';
import { AutoLogin, AutoLoginResult, GetToken, Session, SessionTab, Token } from './autologin.struct';

declare var env: Env;

// ================================================================= 导出-rpc
// #[rpc=rpcServer] 自动登录
export const autoLogin = (login: AutoLogin): AutoLoginResult => {
    const session = getCacheSession(login.uid, 'token')[0];
    const token = session ? session.value : undefined;
    const result = new AutoLoginResult();
    console.log('\n\n\n\n\n---------autoLogin-------------', session, login.uid);
    // tslint:disable-next-line:possible-timing-attack
    if (login.token !== token) {
        result.code = -1;

        return result;
    }
    // 更新会话状态
    replaceSession(login.uid);
    result.code = 1;

    return result;

};

// #[rpc=rpcServer] 获取token
export const getToken = (getToken: GetToken): Token => {
    const token2 = new Token();

    const uid = getToken.uid;
    if (!uid) {
        token2.code = -1;
        token2.token = '';

        return token2;
    }
    const token = randomInt(100000, 999999).toString();
    setSession([['token', token]], uid);

    token2.code = 1;
    token2.token = token;

    return token2;
};

// ================================================================= 导出
// 设置会话属性
export const setSession = (_sessions: [string, string][], uid?: string) => {
    const session = <PiSession>env.get('session');
    if (!session) {
        console.log('setSession fail, session is not exist');
    }
    const dbMgr = env.dbMgr;
    dbMgr.write((tr: Tr) => {
        for (let i = 0; i < _sessions.length; i++) {
            session.set(tr, _sessions[i][0], _sessions[i][1]);
        }
    });
    if (!uid) return;
    // const sessionTab = new Bucket('memory', SessionTab._$info.name, dbMgr);
    let sessions = dbMgr.read((tr: Tr) => querySessionTable(tr, uid));
    if (!sessions) {
        sessions = new SessionTab();
        sessions.id = uid;
        sessions.sessions = [];
    }

    let hadSuid = false;
    for (let i = 0; i < _sessions.length; i++) {
        // 写入会话缓存
        const session2 = new Session();
        session2.key = _sessions[i][0];
        session2.value = _sessions[i][1];

        let j;
        for (j = 0; j < sessions.sessions.length; j++) {
            if (sessions.sessions[j].key === 'suid') hadSuid = true;
            if (sessions.sessions[j].key === session2.key) {
                sessions.sessions[j] = session2;
                break;
            }
        }
        if (j >= sessions.sessions.length) sessions.sessions.push(session2);
    }
    // 检查是否回话使用的唯一id是否存在
    if (!hadSuid) {
        const session2 = new Session();
        session2.key = 'suid';
        session2.value = uid;
        sessions.sessions.push(session2);
    }

    dbMgr.write((tr: Tr) => {
        return tr.modify([{ ware: 'memory', tab: SessionTab._$info.name, key: uid, value: sessions }], 1000, false);
    });
};

// 获取会话属性
export const getSession = (key: string): string => {
    const dbMgr = env.dbMgr;
    const session = <PiSession>env.get('session');
    if (!session) console.log('getSession fail, session is not exist');

    return dbMgr.read((tr: Tr) => session.get(tr, key));
};

// ================================================================= 本地
const querySessionTable = (tr: Tr, key: string) => {
    return tr.query([{ ware: 'memory', tab: SessionTab._$info.name, key }], 1000, false)[0].value;
};

// 替换会话
const replaceSession = (uid: string) => {
    const session = <PiSession>env.get('session');
    if (!session) console.log('replaceSession fail, session is not exist');
    const suid = getCacheSession(uid, 'suid')[0].value;
    // 验证uid
    if (uid !== suid) {
        throw new Error(`uid error uid:${uid}, suid:${suid}`);
    }
    env.dbMgr.write((tr: Tr) => {
        const oldSessions = querySessionTable(tr, uid);
        if (!oldSessions) return;

        for (const session2 of oldSessions.sessions) {
            session.set(tr, session2.key, session2.value);
        }
    });
};

// 获取缓存中的会话
const getCacheSession = (uid: string, key?: string): Session[] => {
    const sessions = env.dbMgr.read((tr: Tr) => querySessionTable(tr, uid));
    if (!sessions) return [];
    if (!key) {

        return sessions.sessions;
    }
    for (const s of sessions.sessions) {
        if (s.key === key) {

            return [s];
        }
    }

    return [];
};