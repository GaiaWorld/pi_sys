import { BonBuffer, BonEncode } from './bon';

export enum Type {
    Bool,
    U8,
    U16,
    U32,
    U64,
    U128,
    U256,
    Usize,
    I8,
    I16,
    I32,
    I64,
    I128,
    I256,
    Isize,
    F32,
    F64,
    BigI,
    Str,
    Bin,
    Arr,
    Map,
    Struct,//元组被认为是结构体类型
    Option,// 可能为空的类型
    Enum,// 是枚举的类型 ，ts语法ru: number | string
}

export class EnumType implements BonEncode {
    type: Type;
    into?: EnumType;
    mapType?: [EnumType, EnumType];
    structType?: StructInfo;
    enumType?: EnumInfo;

    constructor(type: Type, into?: EnumType | [EnumType, EnumType] | StructInfo | EnumInfo) {
        this.type = type;
        switch (this.type) {
            case Type.Arr:
                this.into = into as EnumType;
                break;
            case Type.Option:
                this.into = into as EnumType;
                break;
            case Type.Map:
                this.mapType = into as [EnumType, EnumType];
                break;
            case Type.Struct:
                this.structType = into as StructInfo;
                break;
            case Type.Enum:
                this.enumType = into as EnumInfo;
                break;
            default:
                break;
        }
    }
    /**
	 * 二进制编码
	 */
    bonEncode(bb: BonBuffer): BonBuffer {
        bb.writeInt(this.type);
        this.into && bb.writeBonCode(this.into);
        if (this.mapType) {
            bb.writeBonCode(this.mapType[0]);
            bb.writeBonCode(this.mapType[1]);
        }
        this.structType && bb.writeBonCode(this.structType);
		this.enumType && bb.writeBonCode(this.enumType);
		return bb;
    }
	/**
	 * 二进制解码
	 */
    static bonDecode(bb: BonBuffer): EnumType {
		let t = new EnumType(0)
        t.type = bb.readInt();
        switch (t.type) {
            case Type.Arr:
                t.into = bb.readBonCode(EnumType);
                break;
            case Type.Option:
                t.into = bb.readBonCode(EnumType);
                break;
            case Type.Map:
                t.mapType = [bb.readBonCode(EnumType), bb.readBonCode(EnumType)];
                break;
            case Type.Struct:
                t.structType = bb.readBonCode(StructInfo);
                break;
            case Type.Enum:
                t.enumType = bb.readBonCode(EnumInfo)
                break;
            default:
                break;
		}
		return t;
    }
}

export class FieldInfo implements BonEncode {
    name: string;
    ftype: EnumType;
    notes: Map<string, string>;

    /**
     * @param name 字段名
     * @param ftype 字段类型
     * @param notes 字段注解， 可以为null
     */
    constructor(name: string, ftype: EnumType, notes: Map<string, string>) {
        this.name = name;
        this.ftype = ftype;
        this.notes = notes;
    }
    /**
	 * 二进制编码
	 */
    bonEncode(bb: BonBuffer): BonBuffer {
        bb.writeUtf8(this.name);
        bb.writeBonCode(this.ftype);
        if (this.notes) {
            bb.writeMap(this.notes, (v, k) => {
                bb.writeUtf8(k);
                bb.writeUtf8(v);
            })
        } else {
            bb.writeNil();
        }
		return bb;
    }

	/**
	 * 二进制解码
	 */
    static bonDecode(bb: BonBuffer): FieldInfo {
		let o = new FieldInfo(null, null, null);
        o.name = bb.readUtf8();
        o.ftype = bb.readBonCode(EnumType);
        if (!bb.isNil()) {
            o.notes = bb.readMap(() => {
                return [bb.readUtf8(), bb.readUtf8()]
            });
		}
		return o;
    }
}

/**
 * 结构信息
 * @example
 */
export class StructInfo implements BonEncode {
    name: string;//名称
    name_hash: number;//名称hash
    notes: Map<string, string>;//注解,与rust的StructInfo保持一致，可以为null
    fields: Array<FieldInfo>;//字段详情（包含字段名称及类型）

    /**
     * @param name 名称
     * @param name_hash hash值
     * @param notes 注解，可以为null
     * @param fields 字段，没有字段是应该传入空数组[], 不允许传入null
     */
    constructor(name: string, name_hash: number, notes: Map<string, string>, fields: Array<FieldInfo>) {
        this.name = name;
        this.name_hash = name_hash;
        this.notes = notes;
        this.fields = fields || [];
    }

    bonEncode(bb: BonBuffer): BonBuffer {
        bb.writeUtf8(this.name);
        bb.writeInt(this.name_hash);
        if (this.notes) {
            bb.writeMap(this.notes, (k, v) => {
                bb.writeUtf8(k);
                bb.writeUtf8(v);
            });
        } else {
            bb.writeNil();
        }

        bb.writeArray(this.fields, (el) => {
            bb.writeBonCode(el);
		});
		return bb;
    }
	/**
	 * 二进制解码
	 */
    static bonDecode(bb: BonBuffer): StructInfo {
        let name = bb.readUtf8();
        let name_hash = bb.readInt();
		let notes, fields;
        if (!bb.isNil()) {
            notes = bb.readMap(() => {
                return [bb.readUtf8(), bb.readUtf8()]
            });
        }

        fields = bb.readArray(() => {
            return bb.readBonCode(FieldInfo);
		});
		return new StructInfo(name, name_hash, notes, fields);
    }
}

export class EnumInfo implements BonEncode{
    name: string;//名称
    name_hash: number;//名称hash
    notes: Map<string, string>;//注解,可以为null
    members: Array<EnumType>;//枚举成员类型，该数组不能为空，但其中的元素可以为空

    /**
     * @param name 名称
     * @param name_hash hash值
     * @param notes 注解，可以为null
     * @param members 枚举成员类型，该数组不能为空，但其中的元素可以为空
     */
    constructor(name: string, name_hash: number, notes: Map<string, string>, members: Array<EnumType>) {
        this.name = name;
        this.name_hash = name_hash;
        this.notes = notes;
        this.members = members || [];
    }

    bonEncode(bb: BonBuffer): BonBuffer {
        bb.writeUtf8(this.name);
        bb.writeInt(this.name_hash);
        if (this.notes) {
            bb.writeMap(this.notes, (k, v) => {
                bb.writeUtf8(k);
                bb.writeUtf8(v);
            });
        } else {
            bb.writeNil();
        }

        bb.writeArray(this.members, (el) => {
            if (el === null || el === undefined) {
                bb.writeNil();
            } else {
                bb.writeBonCode(el);
            }
		});
		return bb;
    }
	/**
	 * 二进制解码
	 */
    static bonDecode(bb: BonBuffer): EnumInfo {
        let notes;
        if (!bb.isNil()) {
            notes = bb.readMap(() => {
                return [bb.readUtf8(), bb.readUtf8()]
            });
        }

        let members = bb.readArray(() => {
            if (bb.isNil()) {
                return null;
            } else {
                return bb.readBonCode(EnumType);
            }
		});
		return new EnumInfo(bb.readUtf8(), bb.readInt(), notes, members);
    }
}

//数据库表的元信息， 应该移动至db.ts文件中？
export class TabMeta implements BonEncode {
    k: EnumType;
    v: EnumType;

    constructor(k?: EnumType, v?: EnumType) {
        this.k = k;
        this.v = v;
    }

    bonEncode(bb: BonBuffer): BonBuffer {
        this.k.bonEncode(bb);
		this.v.bonEncode(bb);
		return bb;
    }

    static bonDecode(bb: BonBuffer): TabMeta {
		return new TabMeta(bb.readBonCode(EnumType), bb.readBonCode(EnumType));
    }
}

