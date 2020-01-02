/**
 * 将多个渲染目标的内容，按照层级关系合成
 */
import { nextPowerOfTwo } from '../math/math';

/**
 * 渲染合成器, 将多个fbo合成到某个渲染目标上
 */
export class Composer {
	/**
	 * 构造函数
	 * @param gl webgl上下文
	 * @param width 视口宽度
	 * @param height 视口高度
	 */
	constructor(gl: WebGLRenderingContext, width: number, height: number) {
		this.gl = gl;
		this._width = width;
		this._height = height;
		this.list = [];
		this.init();
	}

	/**
	 * 绑定渲染目标
	 * @param target 将所有添加的纹理合成到该fbo或渲染目标上， 如果不设置或设置为null，将合成到gl的默认渲染目标中
	 */
	public bingRenderTarget(target: WebGLFramebuffer | RenderObject) {
		this.fbo = target?((<any>target).fbo?(<any>target).fbo:target):null;
	}

	/**
	 * 添加一个合成对象
	 * @param obj 被合成对象
	 * @param z_index 可选， 层级关系， 值越大，会合成到越前面, 默认将其设置为最大
	 */
	public add(obj: RenderObject, zIndex?: number){
		if (zIndex === undefined || zIndex === null) {
			zIndex = this.zMax++;
		}

		// 添加，并按z值排序
		let o = {
			z: zIndex,
			texture: obj.texture,
			availWidth: obj.availWidth,
			availHeight: obj.availHeight,
			width: obj.width,
			height: obj.height,
		};
		this.initData(o); // 初始化uv，vector，face数据
		this.updateData(o); // 初始化uv，vector，face buffer
		this.list.push(o);
		this.list.sort((a, b) => {
			return a.z - b.z;
		});
	}

	/**
	 * 创建渲染目标
	 * 需要外部管理释放问题（需要该模块管理吗？）
	 * @param width 宽度
	 * @param height 高度
	 */
	public createRenderTarget(width: number, height: number): RenderObject {
		const gl = this.gl;
		let w = nextPowerOfTwo(width);
		let h = nextPowerOfTwo(height);

		// 创建纹理
		const tex = gl.createTexture();
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
		
		// 创建fbo
		const fbo = gl.createFramebuffer();
		const depth = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, depth);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depth);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		return {
			texture: tex,
			availWidth: width,
			availHeight:height,
			width: w,
			height: h,
			fbo: fbo
		};
	}

	/**
	 * 渲染，通常放入一个帧循环中
	 * 调用此方法前， 应该总是保证被合成的对象已经渲染完成
	 */
	public render() {
		const gl = <WebGLRenderingContext>this.gl;
		gl.scissor(0, 0, this._width, this._height);
		// this.beforeRender(isClear);

		for(let obj of this.list) {
			// 纹理激活
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, obj.texture);

			gl.enableVertexAttribArray(this._a_position_loc);
			gl.enableVertexAttribArray(this._a_uv_loc);
			gl.useProgram(this.shader_program);

			this._u_sampler && gl.uniform1i(this._u_sampler, 0);

			if (this._a_position_loc >= 0) {
				gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertex_buffer);
				gl.vertexAttribPointer(this._a_position_loc,
					2,
					gl.FLOAT,
					false,
					4 * 2,
					0
				);
			}

			if (this._a_uv_loc >= 0) {
				gl.bindBuffer(gl.ARRAY_BUFFER, obj.uv_buffer);
				gl.vertexAttribPointer(<number>this._a_uv_loc, 2, gl.FLOAT, false, 4 * 2, 0);
			}

			if (obj.face_buffer) {
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.face_buffer);
				gl.drawElements(gl.TRIANGLES,
					obj.face_data.length,
					gl.UNSIGNED_SHORT,
					0
				);
			}

			gl.useProgram(null);
			gl.bindTexture(gl.TEXTURE_2D, null);
			gl.disableVertexAttribArray(this._a_position_loc);
			gl.disableVertexAttribArray(this._a_uv_loc);
			gl.enable(gl.CULL_FACE);
		}
	}

	private getFSShader(gl: WebGLRenderingContext) {
		if (gl === null) { return this.fshader; }

		if (this.fshader) { return this.fshader; }

		this.fshader = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER);

		if (this.fshader === null) { return this.fshader; }

		if (Composer.fs === undefined) { return this.fshader; }

		gl.shaderSource(this.fshader, Composer.fs);
		gl.compileShader(this.fshader);

		if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
			console.error(`ERROR IN 'FRAGMENT_SHADER' SHADER: ${gl.getShaderInfoLog(this.fshader)}`);

			return this.fshader;
		}

		return this.fshader;
	}

	private getVSShader(gl: WebGLRenderingContext) {
		if (gl === null) { return this.vshader; }

		if (this.vshader) { return this.vshader; }

		this.vshader = <WebGLShader>gl.createShader(gl.VERTEX_SHADER);

		if (this.vshader === null) { return this.vshader; }

		if (Composer.vs === undefined) { return this.vshader; }

		gl.shaderSource(this.vshader, Composer.vs);
		gl.compileShader(this.vshader);

		if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
			console.error(`ERROR IN 'VERTEX_SHADER' SHADER: ${gl.getShaderInfoLog(this.vshader)}`);

			return this.vshader;
		}

		return this.vshader;
	}
	
	public initShader() {
		if (!this.vshader) {
			this.getVSShader(this.gl);
		}

		if (!this.fshader) {
			this.getFSShader(this.gl);
		}
	}
	
	public init() {
		const gl = this.gl;
		this.initShader();
		const shader_fragment = this.fshader;
		const shader_vertex = this.vshader;

		if (this.shader_program === undefined && gl.getShaderParameter(shader_fragment, gl.COMPILE_STATUS)) {

			const shader_program = <WebGLProgram>gl.createProgram();

			this.shader_program = shader_program;

			this.gl.attachShader(<WebGLProgram>this.shader_program, shader_vertex);
			this.gl.attachShader(<WebGLProgram>this.shader_program, shader_fragment);

			this.gl.linkProgram(<WebGLProgram>this.shader_program);
		}

		if (this.vao === undefined) {
			this.vao = gl.getExtension('OES_vertex_array_object');
		}

		if (this._a_position_loc === undefined) {
			this._a_position_loc = gl.getAttribLocation(<WebGLProgram>this.shader_program, 'a_position');
		}
		if (this._a_uv_loc === undefined) {
			this._a_uv_loc = gl.getAttribLocation(<WebGLProgram>this.shader_program, 'a_uv');
		}
		if (this._u_sampler === undefined) {
			this._u_sampler = <WebGLUniformLocation>gl.getUniformLocation(<WebGLProgram>this.shader_program, 'u_sampler');
		}
	}

	private updateData(obj: Obj) {
		const gl = this.gl;
		this.beforeRender()

		if (!obj.vertex_buffer) {
			obj.vertex_buffer = <WebGLBuffer>gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertex_buffer);
			gl.bufferData(gl.ARRAY_BUFFER,
				new Float32Array(obj.vertex_data),
				gl.STATIC_DRAW
			);
		}

		if (!obj.face_buffer) {
			obj.face_buffer = <WebGLBuffer>gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.face_buffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
				new Uint16Array(obj.face_data),
				gl.STATIC_DRAW
			);
		}

		if (!obj.uv_buffer) {
			obj.uv_buffer = <WebGLBuffer>gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, obj.uv_buffer);
			gl.bufferData(gl.ARRAY_BUFFER,
				new Float32Array(obj.uv_data),
				gl.STATIC_DRAW
			);
		}
	}

	private initData(obj: Obj) {
		obj.vertex_data = [
			-1, -1,
			1.0, -1,
			1.0, 1.0,
			-1, 1.0
		];
		
		obj.face_data = [
			0, 1, 2,
			0, 2, 3
		];
		
		obj.uv_data = [
			0, 0,
			obj.availWidth / obj.width, 0,
			obj.availWidth / obj.width, obj.availHeight / obj.height,
			0, obj.availHeight / obj.height
		];
	}
	
	private beforeRender = () => {
		if (this.shader_program && this.list.length > 0) {
			const gl = <WebGLRenderingContext>this.gl;

			if (this.vao) {
				this.vao.bindVertexArrayOES(null);
			}

			// 重置 bindFramebuffer
			if (this.fbo) {
				gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
			} else {
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			}

			// 视口
			gl.viewport(0, 0, this._width, this._height);

			this.defBeforeRender && this.defBeforeRender(gl);
		}
	}

	/**
	 * 默认 渲染前操作
	 * 外部可重设置
	 */
	private defBeforeRender = (gl: WebGLRenderingContext) => {
		// http://192.168.31.241:8181/docs/front_library/front_library-1bcj847dthmps
		gl.depthMask(true);

		gl.disable(gl.CULL_FACE);
		gl.disable(gl.DEPTH_TEST);

		// alpha 混合 - 预乘
		gl.enable(gl.BLEND);
		gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
		gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
	}

	private zMax = 4294967296;
	private gl: WebGLRenderingContext;
	private fbo: WebGLFramebuffer;
	private list: Obj[];
	private static vs: string = `
		precision highp float;
		precision highp int;

		attribute   vec2    a_position;
		attribute   vec2    a_uv;
		varying     vec2    v_uv;

		void main( void ){
			v_uv = a_uv;
			gl_Position = vec4( a_position.xy, 0., 1. );
		}
	`;
	private static fs: string = `
		precision highp float;
		precision highp int;

		uniform sampler2D   u_sampler;
		varying     vec2    v_uv;

		void main( void ){
			gl_FragColor = texture2D( u_sampler, v_uv );
		}
	`;
	private vshader: WebGLShader | undefined;
	private fshader: WebGLShader | undefined;
	private shader_program: WebGLProgram;
	private _a_position_loc: number;
	private _a_uv_loc: number;
	private vao: any;
	private _u_sampler: WebGLUniformLocation;
	private _width: number;
	private _height: number;
}

interface Obj {
	z: number;
	texture: WebGLTexture;
	width: number;
	height: number;
	availWidth: number;
	availHeight: number;
	face_buffer?: WebGLBuffer;
	face_data?: number[];
	vertex_buffer?:WebGLBuffer;
	vertex_data?: number[];
	uv_buffer?: WebGLBuffer;
	uv_data?: number[];
}

interface RenderObject{
	width: number;
	height: number;
	texture: WebGLTexture;
	availWidth: number;
	availHeight: number;
	fbo?: WebGLFramebuffer
}

