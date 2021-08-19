import { usePlugin } from '@shared/contexts/plugin-data.context';
import { PluginDataInterface } from '@shared/interface/plugin-data.interface';
import React, { useRef } from 'react'
import { Badge, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

const CONFIGURABLE_PROPS = ['type', 'delay', 'status'];
function EndPointConfig({ endpointData, index }: { endpointData: PluginDataInterface, index: number }) {
    const {setIsChangesSavedToStorage, modifyEndpointData} = usePlugin();
    let form = {
        typeRef: useRef(),
        delayRef: useRef(),
        statusRef: useRef(),
        ignoreQueryRef: useRef()
    }

    const toggleCheckbox = (e, property) => {
        e && e.stopPropagation();
        try {
            endpointData[property] = e.target.value = !JSON.parse(e.target.value);
        }
        catch {
            endpointData[property] = e.target.value = !endpointData[property];
        }
        setIsChangesSavedToStorage(false);
        modifyEndpointData(endpointData, index);
    }

    const updateEndPointData = (e) => {
        e && e.stopPropagation();
        for(let prop of CONFIGURABLE_PROPS) {
            endpointData[prop] = form[prop + 'Ref'].current.value;
        }
        setIsChangesSavedToStorage(false);
        modifyEndpointData(endpointData, index);
    }

    return (
        <div>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Label>Request Type</Form.Label>
                        <Form.Select aria-label="Request Type" defaultValue={endpointData.type} ref={form.typeRef} onChange={updateEndPointData}>
                            {
                                ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'].map(type => {
                                    return (
                                        <option value={type}>{type}</option>
                                    );
                                })
                            }
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Label>Delay</Form.Label>
                        <Form.Control type="text" placeholder="Delay" defaultValue={endpointData.delay} ref={form.delayRef} onChange={updateEndPointData} />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Status</Form.Label>
                        <Form.Select aria-label="Response Status" defaultValue={endpointData.status} ref={form.statusRef} onChange={updateEndPointData}>
                            {
                                [200, 400, 404, 401, 403, 500].map(status => {
                                    return (
                                        <option value={status}>{status}</option>
                                    );
                                })
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="my-2">
                            <Col>
                                <Form.Check 
                                    type='checkbox'
                                    id={`ignore-query`}
                                    label={`Ignore query params `}
                                    checked={endpointData.ignoreQuery}
                                    ref={form.ignoreQueryRef}
                                    onClick={(e) => toggleCheckbox(e, 'ignoreQuery')}
                                    className="me-2"
                                    style={{width: 'max-content', display: 'inline-block'}}
                                />
                                <OverlayTrigger
                                    placement={'top'}
                                    overlay={
                                        <Tooltip id={`tooltip-ignore-query`}>
                                            {'Query params will be ignored while matching the mock URLs'}
                                        </Tooltip>
                                    }
                                >
                                    <Badge pill bg="primary">
                                        i
                                    </Badge>
                                </OverlayTrigger>
                            </Col>
                        </Row>
        </div>
    )
}

export default EndPointConfig
