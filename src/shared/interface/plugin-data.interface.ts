import { HttpType } from "../enums/http-type.enum";

export interface PluginDataInterface {
    url: string,
    isEnabled: boolean;
    status: number,
    delay: number,
    allPath: boolean,
    allQuery: boolean,
    type: HttpType
    mock: boolean, // enabled when status not 200

    mockData: MockDataInterface[], // enabled when mock true // contains actual json variants
    header: Object // disabled when mock true
}

export interface MockDataInterface {
    index: number,
    alias: string,
    data: Object
}