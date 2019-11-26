import * as sjcl from './sjcl'
import * as sample from './sample_ecdsa'


// ===================================================== 导出
export class Cipher {
    
    /**
     * 生成ECDSA密钥对 (secp256k1)
     * @param str 生成密钥对的种子字符串
     * @param salt 盐
     * @param level 强度系数(哈希次数))
     */
    public static generateECDSAKeys(str: string, salt: string, level: number): SerializedKeys {
        let keyStr = str;
        for (let i = 0; i < level; i++) {
            keyStr = str.concat(salt); // 加盐
            const hashArr = sjcl.sjclCipher.hash.sha256.hash(keyStr); // 哈希
            keyStr = sjcl.sjclCipher.codec.hex.fromBits(hashArr);
        }
        const exponent = new sjcl.sjclCipher.bn(keyStr);
        // 计算密钥对
        const keys = sjcl.sjclCipher.ecc.ecdsa.generateKeys(sjcl.sjclCipher.ecc.curves.k256, 0, exponent);
        const serializedKeys = new SerializedKeys();
        // sjcl生成的公钥在此加上非压缩格式的前缀04
        serializedKeys.publicStr = '04' + keys.pub.serialize().point;
        serializedKeys.secretStr = keys.sec.serialize().exponent;

        return serializedKeys;
    }

    /**
     * ECDSA签名
     * @param signStr 待签名字符串
     * @param secretHexStr 16进制密钥字符串
     */
    public static ECDSASign(signStr: string, secretHexStr: string): string {
        const sig = new sample.KJUR.crypto.Signature({ alg: sample.KJUR.jws.JWS.jwsalg2sigalg.ES256 });
        sig.init({ d: secretHexStr, curve: 'secp256k1' });
        sig.updateString(signStr);
        const sign = sig.sign();

        return sign; 
    }

    /**
     * ECDSA验签
     * @param str 签名源数据
     * @param sign 签名
     * @param pubHexStr 16进制公钥字符串
     */
    public static ECDSAVerify(str: string, sign: string, pubHexStr: string): boolean {
        // 生成ECDSA对象
        const ec = new sample.KJUR.crypto.ECDSA({'curve': 'secp256k1'});
        if (ec.verifyHex(str, sign, pubHexStr)) {
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