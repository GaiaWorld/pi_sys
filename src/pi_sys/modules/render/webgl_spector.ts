import * as SPECTOR  from "./spector.bundle";

// 录制时调用此方法
let spector: any;
export const webglRecord = (canvas: HTMLCanvasElement) =>{
	if(spector) {
		spector.captureCanvas(canvas);
	} else {
		console.log("webgl record err, spector is undefined");
	}
}

// 保存文件
const save = (hostname: string, content: string, success?: Function, fail?: Function) => {
	let form = new FormData();
	const sPath = `dst/webgl_record.json`;
	form.append("content", new Blob([content]), sPath);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', `http://${hostname}/upload`);
	xhr.addEventListener('error', r => console.warn(r), false);
	xhr.addEventListener('readystatechange', r => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			if (xhr.response === '' || xhr.response !== undefined || xhr.response !== null) {
				success && success(xhr.response);
				console.log(`save success`);
			}
			else {
				fail && fail(xhr.response);
				console.warn(`save result :\n` + xhr.response);
				// alert(`怎么搞的😒😒😒,输个路径都输不对🙈\n${path}`);
			}
		}
	}, false);
	xhr.send(form);
	form = undefined;
}

// spector.bundle.js加载成功，实例化SPECTOR
spector = new SPECTOR.Spector();
spector.onCapture.add((capture) => {
	let data = JSON.stringify(capture);
	save(`${document.domain}:${location.port}`, data, function() {
		console.log("webgl_record success");
	});
});

