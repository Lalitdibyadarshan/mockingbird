import React from 'react'
import { HttpType } from '@shared/enums/http-type.enum'
import Endpoint from './endpoint/endpoint'
import { usePlugin } from '@shared/contexts/plugin-data.context';
import { Alert, Button } from 'react-bootstrap';
import { ChromeUtils } from '@shared/utils/chrome-utils';


function Body() {
    const {pluginData} = usePlugin();
    
    const renderBody = () => {
        return (pluginData) ?
                (<div>
                    {pluginData.map((endpoint, index) => {
                        return (
                            <Endpoint index={index} endpointData={endpoint}/>
                        )
                    })}
                </div>) :
                (<Alert  variant={'warning'}>
                    No Configurations found. To configure mocks 
                    <Button variant="link" onClick={() => ChromeUtils.openOptionsPage()}>click</Button>
                    here
                  </Alert>)
    }

    return (
        renderBody()
    )
}

export default Body
