// import * as elliptic from './elliptic'

const elliptic = require('./elliptic');
// ===================================================== 导出
export class Cipher {
    
    /**
     * 生成EDDSA密钥对 (secp256k1)
     * @param secretStr 生成密钥对的种子字符串
     * @param salt 盐
     * @param level 强度系数(哈希次数))
     */
    public static generateEDDSAKeys(secretStr: string, salt: string, level: number): SerializedKeys {
        let keyStr = secretStr;
        // for (let i = 0; i < level; i++) {
        //     keyStr = str.concat(salt); // 加盐
        //     const hashArr = sjcl.sjclCipher.hash.sha256.hash(keyStr); // 哈希
        //     keyStr = sjcl.sjclCipher.codec.hex.fromBits(hashArr);
        // }
        const ec = new elliptic.eddsa('ed25519');
        // 计算密钥对
        const key = ec.keyFromSecret(keyStr);
        const serializedKeys = new SerializedKeys();
        serializedKeys.publicStr = elliptic.utils.toHex(key.pubBytes());
        serializedKeys.secretStr = keyStr;

        return serializedKeys;
    }

    /**
     * EDDSA签名
     * @param signStr 待签名字符串
     * @param secretHexStr 16进制密钥字符串
     */
    public static EDDSASign(signStr: string, secretHexStr: string): string {
        const ec = new elliptic.eddsa('ed25519');
        // 计算密钥对
        const key = ec.keyFromSecret(secretHexStr);
        const signature = key.sign(signStr).toHex();

        return signature; 
    }

    /**
     * EDDSA验签
     * @param strHash 签名源数据
     * @param sign 签名
     * @param pubHexStr 16进制公钥字符串
     */
    public static EDDSAVerify(strHash: string, sign: string, pubHexStr: string): boolean {
        const EdDSA = require('./elliptic').eddsa;
        console.log('---------generateEDDSAKeys---------', elliptic);
        // 生成EDDSA对象
        console.log('---------elliptic.eddsa---------', elliptic.eddsa);
        const ec = new EdDSA('ed25519');
        console.log('---------ec---------', ec);
        const key = ec.keyFromPublic(pubHexStr, 'hex');
        console.log('---------key---------', ec);
        if (key.verify(strHash, sign)) {
            return true;
        } else {
            return false;
        }
    }
}

// ===================================================== 本地

class SerializedKeys{
    secretStr: string;
    publicStr: string;
};