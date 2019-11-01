
import { BonBuffer } from "../serialization/bon";
import { addToMeta, removeFromMeta, Struct, notifyModify, StructMgr, structMgr} from "../serialization/struct_mgr";
import { StructInfo, Type, FieldInfo, EnumType, EnumInfo} from "../serialization/sinfo";

export class AutoLogin extends Struct {

    uid: string;
    token: string;
	static _$info =  new StructInfo("pi_sys/modules/net/autologin.AutoLogin",4150208014, null, [new FieldInfo("uid", 
new EnumType( Type.Str ), null), new FieldInfo("token", 
new EnumType( Type.Str ), null) ]);





	bonDecode(bb:BonBuffer) {
		(<any>this).uid = bb.readUtf8();
		(<any>this).token = bb.readUtf8();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.uid);
                
        bb.writeUtf8(this.token);
        
	}
    }
    structMgr.register(AutoLogin._$info.name_hash, AutoLogin, AutoLogin._$info.name);


export class AutoLoginResult extends Struct {

    code: number;
	static _$info =  new StructInfo("pi_sys/modules/net/autologin.AutoLoginResult",2916109975, null, [new FieldInfo("code", 
new EnumType( Type.U32 ), null) ]);





	bonDecode(bb:BonBuffer) {
		(<any>this).code = bb.readInt();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.code);
        
	}
    }
    structMgr.register(AutoLoginResult._$info.name_hash, AutoLoginResult, AutoLoginResult._$info.name);


export class GetToken extends Struct {

    uid: string;
	static _$info =  new StructInfo("pi_sys/modules/net/autologin.GetToken",1683859897, null, [new FieldInfo("uid", 
new EnumType( Type.Str ), null) ]);





	bonDecode(bb:BonBuffer) {
		(<any>this).uid = bb.readUtf8();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.uid);
        
	}
    }
    structMgr.register(GetToken._$info.name_hash, GetToken, GetToken._$info.name);


export class Token extends Struct {

    code: number;
    token: string;
	static _$info =  new StructInfo("pi_sys/modules/net/autologin.Token",4170074803, null, [new FieldInfo("code", 
new EnumType( Type.U32 ), null), new FieldInfo("token", 
new EnumType( Type.Str ), null) ]);





	bonDecode(bb:BonBuffer) {
		(<any>this).code = bb.readInt();
		(<any>this).token = bb.readUtf8();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeInt(this.code);
                
        bb.writeUtf8(this.token);
        
	}
    }
    structMgr.register(Token._$info.name_hash, Token, Token._$info.name);


export class Session extends Struct {

    key: string;
    value: string;
	static _$info =  new StructInfo("pi_sys/modules/net/autologin.Session",2340617746, null, [new FieldInfo("key", 
new EnumType( Type.Str ), null), new FieldInfo("value", 
new EnumType( Type.Str ), null) ]);





	bonDecode(bb:BonBuffer) {
		(<any>this).key = bb.readUtf8();
		(<any>this).value = bb.readUtf8();
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.key);
                
        bb.writeUtf8(this.value);
        
	}
    }
    structMgr.register(Session._$info.name_hash, Session, Session._$info.name);


export class SessionTab extends Struct {

    id: string;
    sessions: Array<Session>;
	static _$info =  new StructInfo("pi_sys/modules/net/autologin.SessionTab",2828718636,  new Map( [["primary","id"],["db","memory"]]), [new FieldInfo("id", 
new EnumType( Type.Str ), null), new FieldInfo("sessions", 
new EnumType( Type.Arr, 
new EnumType(Type.Struct, Session._$info ) ), null) ]);


	addMeta(mgr: StructMgr){
		if(this._$meta)
			return;
		addToMeta(mgr, this);
	}

	removeMeta(){
		removeFromMeta(this);
	}



	bonDecode(bb:BonBuffer) {
		(<any>this).id = bb.readUtf8();
		(<any>this).sessions = bb.readArray(() => {
	return      bb.readBonCode((<any>this)._$EnumTypeMap?(<any>this)._$EnumTypeMap(this.sessions):Session);
})
;
	}


	bonEncode(bb:BonBuffer) {        
        bb.writeUtf8(this.id);
                
        bb.writeArray(this.sessions, (el) => {    
            bb.writeBonCode(el);
            
        });
        
	}
    }
    structMgr.register(SessionTab._$info.name_hash, SessionTab, SessionTab._$info.name);

