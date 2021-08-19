import React from 'react';
import ReactDOM from 'react-dom';
import App from './pop-up/App';
import './shared/styles/popup.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import PluginDataProvider from '@shared/contexts/plugin-data.context';

ReactDOM.render(
  <React.StrictMode>
    <PluginDataProvider>
      <App />
    </PluginDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
