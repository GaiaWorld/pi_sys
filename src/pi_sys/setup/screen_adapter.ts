import {get, set} from "./env";

export interface Size {
	width: number;
	height: number;
}

export const adaptive = (cfg: any) => {
	let top = cfg.bangs;
	// 进行刘海适配
	if(top == -1) {
		top = get("notchHeight") || 0;
	}
	
	let adaptiveResult = getAdaptiveResult(cfg.designSize, get("device").screen, cfg.maxExtend, cfg.gpuPerformance, top, cfg.rotateFit);
	set("adaptiveResult", adaptiveResult);
	
	let zoom = selectImgZoom(adaptiveResult.layoutSize, adaptiveResult.renderSize, get("imgZoomOptions"));
	set("imgZoom", zoom);
}

/***
 * 适配屏幕
 * @param designSize 设计稿尺寸
 * @param deviceSize 设备尺寸（单位为css像素）
 * @param maxExtend 最大可扩展比率
 * @param gpuPerformance 设备的gui性能参考值，默认为1，有效范围（0-1）， gpuPerformance值小于1时，返回更小的布局尺寸
 * @param top 可用于刘海屏适配，表示刘海高度
 * @param rotateFit 当设备尺寸与设计尺寸宽高比差距很大时，是否允许旋转
 */
export const getAdaptiveResult = (
	designSize: Size,
	deviceSize: Size,
	maxExtend = 0,
	gpuPerformance = 1,
	// reduction?: number,
	top = 0,
	rotateFit = true
	): AdaptiveResult =>  {
	// 容错，避免gpuPerformance不合法， gpuPerformance应该在0~1之间
	gpuPerformance = gpuPerformance<0?1:(gpuPerformance > 1?1: gpuPerformance);
	top = top < 0?0:top;
	
	// let availableDeviceSize = {width: deviceSize.width, height: deviceSize.height};
	
	// 该值代表手握设备是否旋转（认为设备的宽度小于高度）
	let holdRotate: boolean = deviceSize.height < deviceSize.width;
	let availableDeviceSize: Size;
	if(holdRotate) {
		availableDeviceSize = {width: deviceSize.width - (top * 2), height: deviceSize.height}
	} else {
		availableDeviceSize = {width: deviceSize.width, height: deviceSize.height - (top * 2)}
	}
	// 可用的设备尺寸(可用与适配刘海屏， top值代表刘海高度)
	// let availableDeviceSize = {width: deviceSize.width, height: deviceSize.height - (top * 2)};
	// 代表是否需要旋转显示
	let isRotate: boolean;
	if(rotateFit) {
		isRotate = calcIsRotate(designSize, availableDeviceSize);
		if(isRotate) {
			availableDeviceSize = {width: availableDeviceSize.height, height: availableDeviceSize.width};
		}
	}
	let ratio = calcShowRatio(designSize, availableDeviceSize, maxExtend);
	
	// 布局尺寸，尽量与设计尺寸，设计比率保持一直，当设计比率和屏幕比率有差异时，允许在设计尺寸的的基础上作相应的调整，宽度或高度最大调整比率不超过maxExtend
	let layoutSize = calcLayoutSize(designSize, ratio);
	//渲染尺寸
	let showSize = calcShowSize(availableDeviceSize, ratio);

	// 显示尺寸
	let renderSize = {width: showSize.width*window.devicePixelRatio, height: showSize.height*window.devicePixelRatio};

	// 根据gui性能指标，合理调整渲染尺寸
	renderSize.width *= gpuPerformance;
	renderSize.height *= gpuPerformance;

	// 渲染尺寸不超过布局尺寸，没有意义
	if(renderSize.width > layoutSize.width) {
		renderSize.width = layoutSize.width;
		renderSize.height = layoutSize.height;
	}

	let l: number, t: number;

	if(isRotate) {
		l = (availableDeviceSize.height - showSize.height)/2.0;
		t = (availableDeviceSize.width - showSize.width)/2.0;
	} else {
		l = (availableDeviceSize.width - showSize.width)/2.0;
		t = (availableDeviceSize.height - showSize.height)/2.0;
	}

	holdRotate?(l += top):(t += top);

	return {
		isRotate: isRotate,
		renderSize: renderSize,
		styleSize: showSize,
		layoutSize: layoutSize,
		styleLeft: l,
		styleTop: t,
	}
};

/**
 * 选择图片缩放版本
 * @param layoutSize 设计尺寸
 * @param renderSize 渲染尺寸
 * @param isRotate 是否旋转
 * @param zoomOptions 缩放比率选项
 */
export const selectImgZoom = (layoutSize: Size, renderSize: Size, zoomOptions: number[] = [1]): number => {
	// 该值不会大于1
	let zoom = renderSize.width/layoutSize.width;
	let curz = 1, oldDiff = Number.MAX_SAFE_INTEGER;
	for(let z of zoomOptions) {
		if(z > 1) {
			continue;
		}

		let diff = Math.abs(z - zoom);
		if(diff > oldDiff) {
			continue;
		}

		if(diff < oldDiff) { // 当前diff更小时，取当前缩放
			curz = z;
			oldDiff = diff;
		} else if(z > curz) { // 当diff相等时，取更高的缩放
			curz = z
		}
	}
	return curz;
}

export const calcShowRatio = (design: Size, screen: Size, maxExtend: number): number => {
	if (!design.width || !design.height || !screen.width || !screen.height ) {
		throw new Error("width or height is not exist in design or screen");
	}
	let d_ratio = design.width/design.height;
	let s_ratio = screen.width/screen.height;
	let ratio: number;

	if (d_ratio === s_ratio) {
		return d_ratio;
	}
	
	if (s_ratio > d_ratio) {
		ratio = d_ratio * (1 +maxExtend);
		// 如果屏幕比率与设计比率相差大于最大可扩展比率， 直接将设计比率扩展最大比率,否则使用屏幕比率
		ratio = s_ratio > ratio?ratio:s_ratio;
	} else {
		ratio = d_ratio / (1 +maxExtend);
		ratio = ratio > s_ratio?ratio:s_ratio;
	}
	return ratio;
}

/**
 * 计算布局尺寸
 * 设计尺寸可能与屏幕的实际尺寸差异较大， 为达到最佳显示效果， 屏幕显示宽高比应与设计宽高比保持一致， 有的手机宽高比与设计宽高比可能差距很大， 该方法允许设置一个最大允许扩展比率， 扩展宽度或高度
 * @param designSize 设计尺寸
 * @param screen 屏幕尺寸
 * @param maxExtend 最大可扩展比率
 */
export const calcLayoutSize = (designSize: Size, ratio: number): Size => {
	if (!designSize.width || !designSize.height || !screen.width || !screen.height ) {
		throw new Error("width or height is not exist in design or screen");
	}
	let d_ratio = designSize.width/designSize.height;
	
	if (d_ratio === ratio) {
		return designSize;
	}
	
	if (ratio > d_ratio) {
		return {width:  Math.floor(designSize.height * ratio), height: designSize.height };
	} else {
		return {width: designSize.width, height:Math.floor(designSize.width/ratio)};
	}
}

/**
 * 计算显示区域
 * 设计尺寸可能与屏幕的实际尺寸差异较大， 为达到最佳显示效果， 屏幕显示宽高比应与设计宽高比保持一直， 有的手机宽高比与设计宽高比可能差距很大， 该方法允许设置一个最大允许扩展比率， 扩展宽度或高度
 * @param design 设计尺寸
 * @param screen 屏幕尺寸
 * @param maxExtend 最大可扩展比率
 */
export const calcShowSize = (screenSize: Size, ratio: number): Size => {
	let s_ratio = screenSize.width/screenSize.height;
	if (s_ratio === ratio) {
		return screenSize;
	}

	if (ratio > s_ratio) {
		// 如果屏幕宽高比大于设计宽高比， 显示区域的高度应该于屏幕高度相等， 显示区域的宽度应该是保持设计宽高比不变, 但允许对其宽度扩展（最多扩展原宽度的max_extend），
		// let width = (screen.height * d_ratio) * (1 + maxExtend);
		return {width: screenSize.width, height:Math.floor(screenSize.width/ratio)};
	} else {
		// 否则屏幕宽高比小于设计宽高比， 显示区域的宽度应该于屏幕宽度相等， 显示区域的高度应该是保持设计宽高比不变, 但允许对其高度扩展（最多扩展原宽度的max_extend），
		// let height = (screen.width / ratio) * (1 + maxExtend);
		return {width: Math.floor(screenSize.height * ratio), height: screenSize.height };;
	}
}

/**
 * 根据显示区域， 手机型号, gpu性能配置， 确定绘制的大小
 * @param show 显示尺寸
 * @param performance 性能指标， 应该大于0， 当小于1时，表示gpu性能较差， 绘制尺寸可低于显示尺寸， 当大于1时， 绘制尺寸可大于显示尺寸， 
 * @param reduction 如果绘制尺寸接近于2的幂次方， 尽量让绘制尺寸在该数值范围内，reduction描述可缩小的最大比率， 如： 宽度大于1024， 但小于1024 + （1024 * reduction），
 * 表示宽度接近1024， 则宽度可缩小到1024， 高度按照比例缩小
 */
export const calcDrawSize = (show: Size, performance = 1.0, reduction = 0.1): Size => {
	// 先算出显示的宽高比， 后续计算绘制尺寸时， 无论如何调整宽高， 必须保持该比例不变
	let s_ratio = show.width / show.height; 

	// 根据gpu性能，计算绘制区域尺寸
	let width = Math.floor(show.width * performance);
	let height = Math.floor(show.height * performance);

	// 宽度或高度大于2048， 需要将其缩小到2048范围内
	let wv = 2048;
	let hv = 2048;

	// 检验宽度和高度是否接近1024和512（ 根据reduction来判断是否接近）， 记录宽度和高度所接近的阈值
	let arr = [512, 1024];
	for (let v of arr) {
		if (wv === 2048 && width > v && width <= v * (1 + reduction)) {
			wv = v;
		}
		if (hv === 2048 && height > v && height <= v * (1 + reduction)) {
			hv = v;
		}
	}

	// 比较 宽度/其接近的阈值 和 高度/其接近的阈值 的大小， 按最大缩小比，缩小绘制尺寸
	if (width > wv || height > hv) {
		if (width/wv > height/hv) {
			width = wv;
			height = width / s_ratio;
		} else {
			height = hv;
			width = height * s_ratio;
		}
	}

	return {
		width: Math.floor(width),
		height: Math.floor(height)
	};
}

/**
 * 是否旋转
 * 当设计尺寸为横屏设计、 设备尺寸为竖屏， 或设计尺寸为竖屏设计、 设备尺寸为横屏时， 应该旋转， 以达到最佳显示效果
 * @param design
 * @param screen
 */
export const calcIsRotate = (design: Size, screen: Size): boolean => {
	if ((screen.width < screen.height && design.width > design.height) || (screen.width > screen.height && design.width < design.height)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 适配结果
 */
export interface AdaptiveResult {
	/**
	 * 布局尺寸（单位： css像素）
	 */
	layoutSize: Size,

	/**
	 * 显示区域尺寸（单位：css像素）
	 */
	styleSize: Size,

	/**
	 * 渲染尺寸（单位：真实像素， renderSize与showSize的关系可以看作是window.devicePixelRatio，只是根据设备性能，将该值做了调整）
	 */
	renderSize: Size,

	/**
	 * 是否需要旋转画面
	 */
	isRotate: boolean,
	/**
	 * 显示区域到屏幕顶部的距离
	 */
	styleTop: number,
	/**
	 * 显示区域到屏幕左侧的距离
	 */
	styleLeft: number,
}


