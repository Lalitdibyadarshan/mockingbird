import React, { useState, useRef } from 'react'
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Show from '@shared/components/show-when';
import { PluginDataInterface } from '@shared/interface/plugin-data.interface';
import Form from 'react-bootstrap/Form';
import { usePlugin } from '@shared/contexts/plugin-data.context';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import GlobalDictionary from '@shared/i18n/global-dictionary';
import PopUpDictionary from '../../../i18n/popup-dictionary';

const CONFIGURABLE_PROPS = ['type', 'delay', 'status', 'selectedMock'];

function Endpoint({ index, endpointData }: { index: number, endpointData: PluginDataInterface }) {
    const {modifyEndpointConfig, extensionState, isChangesSavedToStorage, setIsChangesSavedToStorage} = usePlugin();

    const [isUnsaved, setUnsaved] = useState(false);
    let form = {
        isEnabledRef: useRef(),
        typeRef: useRef(),
        delayRef: useRef(),
        statusRef: useRef(),
        selectedMockRef: useRef(),
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
        setUnsaved(true);
        setIsChangesSavedToStorage(false);
        modifyEndpointConfig(endpointData);
    }

    const updateEndPointData = (e) => {
        e && e.stopPropagation();
        detectChanges();
        for(let prop of CONFIGURABLE_PROPS) {
            endpointData[prop] = form[prop + 'Ref'].current.value;
        }
        modifyEndpointConfig(endpointData);
    }

    const detectChanges = () => {
        for(let prop of CONFIGURABLE_PROPS) {
            if (endpointData[prop] === form[prop + 'Ref'].current.value) {
                setUnsaved(true);
                setIsChangesSavedToStorage(false);
                return;
            }
        }
    }

    return (
        <Accordion>
            <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>
                    <Container>
                        <Row className="align-items-center">
                            <Col md={1}>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={endpointData.isEnabled} onClick={(e) => toggleCheckbox(e, 'isEnabled')} disabled={!extensionState}/>
                                </div>
                            </Col>
                            <Col md={11}>
                                <Row className="mb-3">
                                    <Col>
                                        <span className="fw-bold" style={{color: '#d2691e'}}>
                                            {endpointData.url}
                                        </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Show when={endpointData.type}>
                                            <Badge pill bg="secondary" className="mx-1">{endpointData.type}</Badge>
                                        </Show>
                                        <Show when={endpointData.delay !== undefined}>
                                            <Badge pill bg="secondary" className="mx-1">{'delay: ' + endpointData.delay + 'ms'}</Badge>
                                        </Show>
                                        <Show when={endpointData.status && ['4', '5'].includes(endpointData.status.toString()[0])}>
                                            <Badge pill bg="danger" className="mx-1">{endpointData.status}</Badge>
                                        </Show>
                                        <Show when={endpointData.status && ['2'].includes(endpointData.status.toString()[0])}>
                                            <Badge pill bg="success" className="mx-1">{endpointData.status}</Badge>
                                        </Show>
                                        <Show when={isUnsaved && !isChangesSavedToStorage}>
                                            <Badge pill bg="warning" className="mx-1">{PopUpDictionary.TEXT_UNSAVED}</Badge>
                                        </Show>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row className="mb-3">
                            <Col md={2}>
                                <Form.Label>{GlobalDictionary.LABEL_REQUEST_TYPE}</Form.Label>
                                <Form.Select aria-label="Request Type" defaultValue={endpointData.type} ref={form.typeRef} onChange={updateEndPointData} disabled={!extensionState}>
                                    {
                                        ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'].map(type => {
                                            return (
                                                <option value={type}>{type}</option>
                                            );
                                        })
                                    }
                                </Form.Select>
                            </Col>
                            <Col md={2}>
                                <Form.Label>{GlobalDictionary.LABEL_DELAY}</Form.Label>
                                <Form.Control type="text" placeholder="Delay" defaultValue={endpointData.delay} ref={form.delayRef} onChange={updateEndPointData} disabled={!extensionState}/>
                            </Col>
                            <Col md={2}>
                                <Form.Label>{GlobalDictionary.LABEL_STATUS}</Form.Label>
                                <Form.Select aria-label="Response Status" defaultValue={endpointData.status} ref={form.statusRef} onChange={updateEndPointData} disabled={!extensionState}>
                                    {
                                        [200, 400, 404, 401, 403, 500].map(status => {
                                            return (
                                                <option value={status}>{status}</option>
                                            );
                                        })
                                    }
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label>{GlobalDictionary.LABEL_SELECT_MOCK}</Form.Label>
                                <Form.Select aria-label="Select Mock" defaultValue={endpointData.selectedMock} ref={form.selectedMockRef} onChange={updateEndPointData} disabled={!extensionState}>
                                    {
                                        endpointData.mockData.map(mock => {
                                            return (
                                                <option value={mock.alias}>{mock.alias}</option>
                                            );
                                        })
                                    }
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Label>{GlobalDictionary.LABEL_REQUEST_HEADER}</Form.Label>
                                <Form.Select defaultValue="2" disabled={!extensionState}>
                                    <option></option>
                                    <option value="1">200</option>
                                    <option value="2">400</option>
                                    <option value="3">404</option>
                                    <option value="4">401</option>
                                    <option value="5">403</option>
                                    <option value="6">500</option>
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label>{GlobalDictionary.LABEL_RESPONSE_HEADER}</Form.Label>
                                <Form.Select defaultValue="1" disabled={!extensionState}>
                                    <option></option>
                                    <option value="1">200</option>
                                    <option value="2">400</option>
                                    <option value="3">404</option>
                                    <option value="4">401</option>
                                    <option value="5">403</option>
                                    <option value="6">500</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col>
                                <Form.Check 
                                    type='checkbox'
                                    id={`ignore-query`}
                                    label={GlobalDictionary.LABEL_IGNORE_QUERY_PARAM}
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
                                            {GlobalDictionary.TOOLTIP_QUERY_PARAMS}
                                        </Tooltip>
                                    }
                                >
                                    <Badge pill bg="primary">
                                        i
                                    </Badge>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Endpoint
