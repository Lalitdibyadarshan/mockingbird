import { HttpType } from "@shared/enums/http-type.enum";
import { PluginDataInterface } from "@shared/interface/plugin-data.interface";
import { v4 as uuidv4 } from 'uuid';

export class EndpointConfig implements PluginDataInterface {
    id = uuidv4();
    url = 'New Url';
    mockData = [];
    type = HttpType.GET;
    status = 200;
    isEnabled = false;
    delay = 0;
    ignoreQuery = false;
    selectedMock = '';
}