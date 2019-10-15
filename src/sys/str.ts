
export const utf8Decode = (arr: Uint8Array) => {
	return decoder.decode(arr);
};
export const utf8Encode = (str: string) => {
	return (str && str.length > 0) ? encoder.encode(str) : null;
}

const decoder = new TextDecoder('utf-8');
const encoder = new TextEncoder();
