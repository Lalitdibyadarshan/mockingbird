import Show from '@shared/components/show-when';
import { usePlugin } from '@shared/contexts/plugin-data.context';
import { PluginDataInterface } from '@shared/interface/plugin-data.interface';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import style from './app.module.scss';
import EndPointEditor from './endpoint-editor/endpoint-editor';
import EndpointList from './endpoint-list/endpoint-list';

function App() {
    const {pluginData} = usePlugin();
    const [ selectedEndpoint, setSelectedEndpoint] = useState({} as {data: PluginDataInterface, index: number});

    return (
        <>  
            <Show when={Array.isArray(pluginData) && pluginData.length > 0}>
                <div style={{height: '100vh'}}>
                    <Row style={{height: '100%'}}>
                        <Col md={4} className={'p-0 ' + style['endpoint-list']}>
                            <EndpointList pluginData={pluginData} setSelectedEndpoint={setSelectedEndpoint}></EndpointList>
                        </Col>
                        <Show when={selectedEndpoint.data && selectedEndpoint.index !== undefined}>
                            <Col md={8} className="p-0">
                                <EndPointEditor endpointData={selectedEndpoint.data} index={selectedEndpoint.index}></EndPointEditor>
                            </Col>
                        </Show>
                    </Row>
                </div>
            </Show>
        </>
    );
}

export default App;
