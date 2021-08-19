import PluginDataProvider from '@shared/contexts/plugin-data.context';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './options/app';
import './shared/styles/options.scss';

ReactDOM.render(
    <React.StrictMode>
        <PluginDataProvider>
            <App />
        </PluginDataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
