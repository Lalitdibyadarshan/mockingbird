import React from 'react';
import Header from './components/header/header';
import style from './App.module.scss';
import Body from './components/body/body';
import { usePlugin } from '@shared/contexts/plugin-data.context';
import { useEffect } from 'react';
import { ChromeUtils } from '@shared/utils/chrome-utils';
import { StorageKey } from '@shared/enums/storage-key.enum';

function App() {
      const { setPluginData } = usePlugin();
      useEffect(() => {
        ChromeUtils.getChromeStorage(StorageKey.EXTENSION_DATA)
          .then(setPluginData)
      }, []);

      return (
        <div>
            <Header/>
            <Body/>
        </div>
      );
}

export default App;
