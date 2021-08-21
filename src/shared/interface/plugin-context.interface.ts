import { PluginDataInterface } from "./plugin-data.interface";

export interface PluginContextInterface {
    pluginData: PluginDataInterface[],
    extensionState: any,
    isChangesSavedToStorage: boolean,
    setPluginData: React.Dispatch<React.SetStateAction<PluginDataInterface[]>>,
    setIsChangesSavedToStorage: React.Dispatch<React.SetStateAction<boolean>>,
    setExtensionState: any,
    modifyEndpointConfig: (updatedEndpointConfig: PluginDataInterface) => void,
    saveDataToChromeStorage: () => void;
    resetChanges: () => void;
    addNewEndpointConfig: () => void;
    removeEndpointConfig: (endpointConfig: PluginDataInterface) => void;
}