import { PluginDataInterface } from "./plugin-data.interface";

export interface PluginContextInterface {
    pluginData: PluginDataInterface[],
    extensionState: any,
    isChangesSavedToStorage: boolean,
    setPluginData: React.Dispatch<React.SetStateAction<PluginDataInterface[]>>,
    setIsChangesSavedToStorage: React.Dispatch<React.SetStateAction<boolean>>,
    setExtensionState: any,
    modifyEndpointData: (updatedData: PluginDataInterface, index: number) => void,
    saveDataToChromeStorage: () => void;
    resetChanges: () => void;
}