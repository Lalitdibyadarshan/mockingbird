import React from 'react'
import Endpoint from './endpoint/endpoint'
import { usePlugin } from '@shared/contexts/plugin-data.context';
import { Alert, Button } from 'react-bootstrap';
import { ChromeUtils } from '@shared/utils/chrome-utils';
import PopUpDictionary from '../../i18n/popup-dictionary';


function Body() {
    const {pluginData} = usePlugin();
    const renderBody = () => {
        return (pluginData && pluginData.length) ?
                (<div>
                    {pluginData.map((endpoint, index) => {
                        return (
                            <Endpoint index={index} endpointData={endpoint}/>
                        )
                    })}
                </div>) :
                (<Alert  variant={'warning'}>
                    {PopUpDictionary.ALERT_NO_CONFIG_FOUND}
                    <Button variant="link" onClick={() => ChromeUtils.openOptionsPage()}>{PopUpDictionary.BTN_CLICK}</Button>
                    {PopUpDictionary.TEXT_HERE}
                  </Alert>)
    }

    return (
        renderBody()
    )
}

export default Body
