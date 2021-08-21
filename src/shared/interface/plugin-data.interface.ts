import { HttpType } from "../enums/http-type.enum";

export interface PluginDataInterface {
    id: string;
    url: string,
    isEnabled: boolean;
    status: number,
    delay: number,
    // allPath: boolean,
    ignoreQuery: boolean,
    type: HttpType
    // mock: boolean, // enabled when status not 200
    selectedMock?: string,
    mockData: MockDataInterface[], // enabled when mock true // contains actual json variants
    header?: Object // disabled when mock true
}

export interface MockDataInterface {
    alias: string,
    data: Object
}