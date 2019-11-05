
export declare type FPATH = string;
export declare type FSIZE = number;
export declare type FSIGN = string;
export declare type FDEPEND = string[];
export declare type IFileInfo = [FPATH, FSIZE, FSIGN, FDEPEND?];

export declare interface IFileDependInfo {
    path: string;
    sign: string;
    size: number;
    depend: string[];
    suffix: string;
}