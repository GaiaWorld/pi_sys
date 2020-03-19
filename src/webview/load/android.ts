/**
 * 取到相关的depend内容，没有就调用cb([])
 */
export const get = (cb: (content?: string[][]) => void) => {
}

/**
 * 取到本地对应的file内容，没有就调用cb(null)
 */
export const read = (key: string, cb: (content?: ArrayBuffer) => void) => {
}