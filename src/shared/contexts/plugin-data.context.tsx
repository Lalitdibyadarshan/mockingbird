import { StorageKey } from '@shared/enums/storage-key.enum';
import { useChromeStorage } from '@shared/hooks/chrome-storage';
import { PluginContextInterface } from '@shared/interface/plugin-context.interface';
import { PluginDataInterface } from '@shared/interface/plugin-data.interface';
import { EndpointConfig } from '@shared/models/endpoint-config';
import { ChromeUtils } from '@shared/utils/chrome-utils';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';


const pluginContext =  React.createContext<PluginContextInterface>({} as PluginContextInterface);
let pluginDataBackup: PluginDataInterface[];

export function usePlugin() {
    return useContext(pluginContext);
}

function PluginDataProvider({children}) {
    const [pluginData, setPluginData] = useState<PluginDataInterface[]>([]);
    const [extensionState, setExtensionState] = useChromeStorage(StorageKey.EXTENSION_STATE, false);
    const [isChangesSavedToStorage, setIsChangesSavedToStorage] = useState<boolean>(true);

    const modifyEndpointConfig = (updatedEndpointConfig: PluginDataInterface) => {
        const updatedPluginData = [...pluginData];
        const index = updatedPluginData.findIndex((val) => val.id === updatedEndpointConfig.id);
        updatedPluginData[index] = updatedEndpointConfig;
        setPluginData(updatedPluginData);
        setIsChangesSavedToStorage(false);
    }

    const saveDataToChromeStorage = () => {
        ChromeUtils.setChromeStorage(StorageKey.EXTENSION_DATA, pluginData);
        setIsChangesSavedToStorage(true);
        pluginDataBackup = JSON.parse(JSON.stringify(pluginData));
    }

    const resetChanges = () => {
        setPluginData(JSON.parse(JSON.stringify(pluginDataBackup)));
        setIsChangesSavedToStorage(true);
    }

    const removeEndpointConfig = (endpointConfig: PluginDataInterface) => {
        const index = pluginData.findIndex(data => data.id === endpointConfig.id);
        pluginData.splice(index, 1);
        setPluginData([...pluginData]);
    }

    const addNewEndpointConfig = () => {
        const newConfig = new EndpointConfig();
        const updatedPluginData = [...pluginData];
        updatedPluginData.push(newConfig)
        setPluginData(updatedPluginData);
        setIsChangesSavedToStorage(false);
    }

    const value = {
        pluginData: pluginData,
        extensionState: extensionState,
        setPluginData: setPluginData,
        modifyEndpointConfig: modifyEndpointConfig,
        saveDataToChromeStorage: saveDataToChromeStorage,
        setExtensionState: setExtensionState,
        isChangesSavedToStorage: isChangesSavedToStorage,
        setIsChangesSavedToStorage: setIsChangesSavedToStorage,
        resetChanges: resetChanges,
        addNewEndpointConfig: addNewEndpointConfig,
        removeEndpointConfig: removeEndpointConfig
    } as PluginContextInterface;

    useEffect(() => {
      ChromeUtils.getChromeStorage(StorageKey.EXTENSION_DATA)
        .then((data) => {
            setPluginData(data);
            pluginDataBackup = JSON.parse(JSON.stringify(data));
        })
    }, []);

    return (<pluginContext.Provider value={value}>
        {children}
    </pluginContext.Provider>)
}

export default PluginDataProvider
