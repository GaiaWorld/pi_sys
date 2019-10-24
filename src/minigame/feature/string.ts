/**
 * utf8解码
 */
export const utf8Decode = (arr: Uint8Array) => {
    let c: number;
    let i = 0;
    let out = ""
    const len = arr.length;
    while (i < len) {
        c = arr[i++];
        if (c < 128) {
            out += String.fromCharCode(c);
        } else if (c < 0xE0 && i < len) {
            out += String.fromCharCode(((c & 0x1F) << 6) | (arr[i++] & 0x3F));
        } else if (c < 0xF0 && i + 1 < len) {
            out += String.fromCharCode((((c & 0x0F) << 12) | ((arr[i++] & 0x3F) << 6) | (arr[i++] & 0x3F)));
        } else if (c < 0xF8 && i + 2 < len) {
            out += String.fromCharCode((((c & 0x07) << 18) | ((arr[i++] & 0x3F) << 12) | ((arr[i++] & 0x3F) << 6) | (arr[i++] & 0x3F)));
        } else if (c < 0xFC && i + 3 < len) {
            out += String.fromCharCode((((c & 0x03) << 24) | ((arr[i++] & 0x3F) << 18) | ((arr[i++] & 0x3F) << 12) | ((arr[i++] & 0x3F) << 6) | (arr[i++] & 0x3F)));
        } else if (c < 0xFE && i + 4 < len) {
            out += String.fromCharCode((((c & 0x01) << 30) | ((arr[i++] & 0x3F) << 24) | ((arr[i++] & 0x3F) << 18) | ((arr[i++] & 0x3F) << 12) | ((arr[i++] & 0x3F) << 6) | (arr[i++] & 0x3F)));
        } else {
            throw new Error("invalid utf8");
        }
    }
    return out;
};

/**
 * utf8编码
 */
export const utf8Encode = (str: string) => {
    const text = encodeURI(str);
    const result = [];

    let i = 0;
    while (i < text.length) {
        const c = text.charCodeAt(i);
        ++i;
        if (c === 37) {
            result.push(parseInt(text.substr(i, 2), 16));
            i += 2;
        } else {
            result.push(c);
        }
    }
    return new Uint8Array(result);
};
