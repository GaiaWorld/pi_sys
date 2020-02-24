import { WebGLInstance, WebGLInstanceOpt, ShaderCfg, Scene, DataBufferCfg, Mesh, TextureInstance } from "./webgl";
import { vs_texture, fs_texture } from "./shader_texture";
import { vs_progress, fs_progress } from "./shader_progress";

export type RenderFlag = 'progress';

export class RenderLauncher {
    public static webgldemo: WebGLInstance;
    public static opt: any = {};
    public static active(canvas: HTMLCanvasElement, flag: RenderFlag, args: any) {
        switch (flag) {
            case 'progress': {
                RenderLauncher.progress(canvas, args);
            }
            default: {

            }
        }
    }
    public static puase() {

    }
    public static destroy() {
        if (RenderLauncher.webgldemo && !RenderLauncher.webgldemo.isDestroy) {
            (<any>window)._$pi.require('pi_sys/modules/util/frame_mgr').getGlobal().clearPermanent(RenderLauncher.webgldemo.loop);
            RenderLauncher.webgldemo.destroy();
            (<any>RenderLauncher.webgldemo) = null;

            if (RenderLauncher.opt.meshProgress) {
                RenderLauncher.opt.meshProgress = undefined;
            }
        }
    }
    public static loadImageSucc = (img: HTMLImageElement, fname: string) => {
        TextureInstance.loaded(img, fname, RenderLauncher.webgldemo);
    }
    public static createTextureLoad = (fname: string, engine: WebGLInstance, cb: (img: HTMLImageElement, fname: string, engine: WebGLInstance) => void) => {
        const img = new Image();

        img.onload = () => {
            RenderLauncher.loadImageSucc(img, fname);
            // setTimeout(() => { loadImageSucc(img, data.fname); }, 2000);
        };
        img.src = fname;
    }
    public static progress(canvas: HTMLCanvasElement, args: any) {
        const opt: WebGLInstanceOpt = <any>{};

        opt.canvas = canvas;

        RenderLauncher.webgldemo = new WebGLInstance(opt);
        TextureInstance.loadCall = RenderLauncher.createTextureLoad;

        const webgldemo: WebGLInstance = RenderLauncher.webgldemo;

        if (!webgldemo.gl) {
            return;
        }

        const shader05 = new ShaderCfg('05', vs_texture, fs_texture);
        const shader06 = new ShaderCfg('06', vs_progress, fs_progress);

        const scene = new Scene('06', webgldemo);
        const dataBuffer02 = new DataBufferCfg('01');
        dataBuffer02.addVertex(-1, -1, 0);
        dataBuffer02.addUV(0, 0);
        dataBuffer02.addVertex(1, -1, 0);
        dataBuffer02.addUV(1, 0);
        dataBuffer02.addVertex(1, 1, 0);
        dataBuffer02.addUV(1, 1);
        dataBuffer02.addVertex(-1, 1, 0);
        dataBuffer02.addUV(0, 1);
        dataBuffer02.addFace(0, 1, 2);
        dataBuffer02.addFace(0, 2, 3);
        dataBuffer02.update(webgldemo.gl);

        const dataBuffer03 = new DataBufferCfg('03');
        dataBuffer03.addVertex(-1, -1, 0);
        dataBuffer03.addVertex(1, -1, 0);
        dataBuffer03.addVertex(1, -1 + 20 / canvas.height, 0);
        dataBuffer03.addVertex(-1, -1 + 20 / canvas.height, 0);
        dataBuffer03.addFace(0, 1, 2);
        dataBuffer03.addFace(0, 2, 3);
        dataBuffer03.update(webgldemo.gl);

        const meshBG = new Mesh('meshBG', dataBuffer02, shader05);
        meshBG.translate[0] = 0.0;
        meshBG.translate[1] = 0.0;
        meshBG.scale[0] = 1;
        meshBG.scale[1] = 1;
        meshBG.texture = webgldemo.createTexture(args.bgurl);
        scene.addMesh(meshBG);

        const meshProgress = new Mesh('meshProgress', dataBuffer03, shader06);
        meshProgress.translate[0] = 0.0;
        meshProgress.translate[1] = 0.0;
        meshProgress.scale[0] = 1;
        meshProgress.scale[1] = 1;
        meshProgress.ufloat = 0.01;
        scene.addMesh(meshProgress);

        webgldemo.renderLoop = (timestamp) => {
            // GUI 初始化后会修改canvas大小
            (<any>webgldemo).width = webgldemo.canvas.width;
            (<any>webgldemo).height = webgldemo.canvas.height;

            webgldemo.clearColor();
            scene.viewport[0] = 0;
            scene.viewport[1] = 0;
            scene.viewport[2] = webgldemo.width;
            scene.viewport[3] = webgldemo.height;
            scene.render(true);
        };

        // webgldemo.loop(0);
        (<any>window)._$pi.require('pi_sys/modules/util/frame_mgr').getGlobal().setPermanent(webgldemo.loop);

        RenderLauncher.opt.meshProgress = meshProgress;
    }
    public static updateProgress(num: number) {
        if (RenderLauncher.opt.meshProgress) {
            RenderLauncher.opt.meshProgress.ufloat = num;
        }
    }
}