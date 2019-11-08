declare var _$pi;

/**
 * 封装pi中的 模块系统
 */



/**
 * 同步加载模块，返回模块的导出对象
 * 如果找不到该模块，或者找不到模块依赖的其他模块，会直接抛异常。
 */
export const importSync = (names: string | string[]): string | string[] => {
    return _$pi.import(names) as string | string[];
}