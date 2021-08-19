import JsonEditor from '@shared/components/json-editor/json-editor'
import { PluginDataInterface } from '@shared/interface/plugin-data.interface';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import EndPointConfig from './endpoint-config/endpoint-config';

function EndPointEditor({endpointData, index}: {endpointData: PluginDataInterface, index: number}) {
    const [mockData, setMockData] = useState({} as object)

    return (
        <Container>
            <Row>
                <Col md="5">
                    <EndPointConfig endpointData={endpointData} index={index}/>
                </Col>
                <Col md="7">
                    <JsonEditor 
                        id ="mb-mock-json" 
                        height="100vh"
                        placeholder = {endpointData.mockData[0].data}
                        onChangeCb = {(content) => {
                            console.log(content)
                    }}/>
                </Col>
            </Row>
        </Container>
    )
}

export default EndPointEditor;
