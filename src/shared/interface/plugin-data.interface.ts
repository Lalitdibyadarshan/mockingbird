import { HttpType } from "../enums/http-type.enum";

export interface PluginDataInterface {
    id: string;
    url: string,
    isEnabled: boolean;
    status: number,
    delay: number,
    label: string,
    ignoreQuery: boolean,
    type: HttpType
    selectedMock?: string,
    mockData: MockDataInterface[], // enabled when mock true // contains actual json variants
    header?: Object // disabled when mock true
}

export interface MockDataInterface {
    alias: string,
    data: Object
}