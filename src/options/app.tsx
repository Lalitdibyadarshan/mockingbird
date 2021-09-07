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
                <div>
                    <Row className={style['main-container']}>
                        <Col md={4} className={'p-0 '}>
                            <EndpointList pluginData={pluginData} setSelectedEndpoint={setSelectedEndpoint}></EndpointList>
                        </Col>
                        <Show when={selectedEndpoint.data}>
                            <Col md={8} className="p-0">
                                <EndPointEditor endpointData={selectedEndpoint.data}></EndPointEditor>
                            </Col>
                        </Show>
                    </Row>
                </div>
        </>
    );
}

export default App;
