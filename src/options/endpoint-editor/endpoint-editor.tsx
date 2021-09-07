import { usePlugin } from '@shared/contexts/plugin-data.context';
import { MockDataInterface, PluginDataInterface } from '@shared/interface/plugin-data.interface';
import React from 'react'
import { Col, Container, FormLabel, Row } from 'react-bootstrap';
import OptionsDictionary from '../i18n/options-dictionary';
import EndPointConfig from './endpoint-config/endpoint-config';
import style from './endpoint-editor.module.scss';
import EndpointMocks from './endpoint-mocks/endpoint-mocks';

function EndPointEditor({endpointData}: {endpointData: PluginDataInterface}) {
    const { modifyEndpointConfig } = usePlugin();
    const addNewMockResponse = () => {
        endpointData.mockData.push({
            alias: 'new mock ' + (endpointData.mockData.length + 1),
            data: {
                status: endpointData.status
            }
        } as MockDataInterface);
        modifyEndpointConfig(endpointData);
    }

    const updateNewMockResponse = (dataIndex, data) => {
        endpointData.mockData[dataIndex] = data
        modifyEndpointConfig(endpointData);
    }

    const removeMockResponse = (dataIndex: number) => {
        endpointData.mockData.splice(dataIndex, 1);
        modifyEndpointConfig(endpointData);
    }

    return (
        <Container className="py-4">
            <div className={style['endpoint-editor']}>
                <Row>
                    <Col md="12" className="px-5">
                        <EndPointConfig endpointData={endpointData}/>
                    </Col>
                </Row>
                <Row className="px-5 mt-5 h-50">
                    <Col md={6} className={"pt-3 " + style['endpoint-editor__mock']}>
                        <Row className={'align-items-center ' + style['endpoint-editor__mock-header']}>
                            <button className={'col-md-1 ' + style['endpoint-editor__add-mock']} onClick={ () => addNewMockResponse() }>+</button>
                            <FormLabel className="pt-2 col-md-6">{OptionsDictionary.TEXT_MOCKS_CONFIGURATION}</FormLabel>
                        </Row>
                        <section className={style['endpoint-editor__mock-body']}>
                            {endpointData.mockData.map((data, index) => {
                                return (<EndpointMocks key={index+data.alias} mockData={data} index={index} removeMockResponse={() => removeMockResponse(index)} updateNewMockResponse={updateNewMockResponse}></EndpointMocks>);
                            })}
                        </section>
                    </Col>
                    
               </Row>
            </div>
        </Container>
    )
}

export default EndPointEditor;
