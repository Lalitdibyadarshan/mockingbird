import { StorageKey } from '@shared/enums/storage-key.enum';
import { useChromeStorage } from '@shared/hooks/chrome-storage';
import { PluginContextInterface } from '@shared/interface/plugin-context.interface';
import { PluginDataInterface } from '@shared/interface/plugin-data.interface';
import { ChromeUtils } from '@shared/utils/chrome-utils';
import React, { useContext } from 'react'
import { useState } from 'react';

const pluginContext =  React.createContext<PluginContextInterface>({} as PluginContextInterface);

export function usePlugin() {
    return useContext(pluginContext);
}

function PluginDataProvider({children}) {
    const [pluginData, setPluginData] = useState<PluginDataInterface[]>([]);
    const [extensionState, setExtensionState] = useChromeStorage(StorageKey.EXTENSION_STATE, false);
    const [isChangesSavedToStorage, setIsChangesSavedToStorage] = useState<boolean>(true);

    const modifyEndpointData = (updatedData: PluginDataInterface, index: number) => {
        const updatedPluginData = [...pluginData];
        updatedPluginData[index] = updatedData;
        setPluginData(updatedPluginData);
    }

    const saveDataToChromeStorage = () => {
        ChromeUtils.setChromeStorage(StorageKey.EXTENSION_DATA, pluginData);
        setIsChangesSavedToStorage(true);
    }

    const value = {
        pluginData: pluginData,
        extensionState: extensionState,
        setPluginData: setPluginData,
        modifyEndpointData: modifyEndpointData,
        saveDataToChromeStorage: saveDataToChromeStorage,
        setExtensionState: setExtensionState,
        isChangesSavedToStorage: isChangesSavedToStorage,
        setIsChangesSavedToStorage: setIsChangesSavedToStorage
    } as PluginContextInterface;

    return (<pluginContext.Provider value={value}>
        {children}
    </pluginContext.Provider>)
}

export default PluginDataProvider
