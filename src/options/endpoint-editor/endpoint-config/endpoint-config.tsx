import { usePlugin } from '@shared/contexts/plugin-data.context';
import GlobalDictionary from '@shared/i18n/global-dictionary';
import { PluginDataInterface } from '@shared/interface/plugin-data.interface';
import React, { useEffect, useRef } from 'react'
import { Badge, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import OptionsDictionary from '../../i18n/options-dictionary';
import style from './endpoint-config.module.scss';

const CONFIGURABLE_PROPS = ['label', 'url', 'type', 'delay', 'status'];
function EndPointConfig({ endpointData }: { endpointData: PluginDataInterface }) {
    const { setIsChangesSavedToStorage, modifyEndpointConfig } = usePlugin();
    let form = {
        urlRef: useRef<HTMLInputElement>(),
        labelRef: useRef<HTMLInputElement>(),
        typeRef: useRef<HTMLSelectElement>(),
        delayRef: useRef<HTMLInputElement>(),
        statusRef: useRef<HTMLSelectElement>(),
        ignoreQueryRef: useRef<HTMLInputElement>()
    }

    useEffect(() => {
        form.urlRef.current.value = endpointData.url;
        form.labelRef.current.value = endpointData.label;
        form.typeRef.current.value = endpointData.type;
        form.delayRef.current.value = endpointData.delay && endpointData.delay.toString();
        form.statusRef.current.value = endpointData.status && endpointData.status.toString();
        form.ignoreQueryRef.current.value = endpointData.ignoreQuery && endpointData.ignoreQuery.toString();

    }, [endpointData])

    const toggleCheckbox = (e, property) => {
        e && e.stopPropagation();
        try {
            endpointData[property] = e.target.value = !JSON.parse(e.target.value);
        }
        catch {
            endpointData[property] = e.target.value = !endpointData[property];
        }
        setIsChangesSavedToStorage(false);
        modifyEndpointConfig(endpointData);
    }

    const updateEndPointData = (e) => {
        e && e.stopPropagation();
        for (let prop of CONFIGURABLE_PROPS) {
            endpointData[prop] = form[prop + 'Ref'].current.value;
        }
        setIsChangesSavedToStorage(false);
        modifyEndpointConfig(endpointData);
    }

    return (
        <div>
            <Row className="my-3">
                <Col>
                    <Form.Label>{GlobalDictionary.LABEL}</Form.Label>
                    <Form.Control type="text" placeholder="Label" defaultValue={endpointData.label} ref={form.labelRef} onChange={updateEndPointData} />
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <Form.Label>{OptionsDictionary.LABEL_URL}</Form.Label>
                    <Form.Control type="text" placeholder="URL" defaultValue={endpointData.url} ref={form.urlRef} onChange={updateEndPointData} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Label>{GlobalDictionary.LABEL_REQUEST_TYPE}</Form.Label>
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
                    <Form.Label>{GlobalDictionary.LABEL_DELAY}</Form.Label>
                    <Form.Control type="text" placeholder="Delay" defaultValue={endpointData.delay} ref={form.delayRef} onChange={updateEndPointData} />
                </Col>
                <Col md={4}>
                    <Form.Label>{GlobalDictionary.LABEL_STATUS}</Form.Label>
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
                        label={GlobalDictionary.LABEL_IGNORE_QUERY_PARAM}
                        checked={endpointData.ignoreQuery}
                        ref={form.ignoreQueryRef}
                        onClick={(e) => toggleCheckbox(e, 'ignoreQuery')}
                        className="me-2"
                        style={{ width: 'max-content', display: 'inline-block' }}
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
        </div>
    )
}

export default EndPointConfig
