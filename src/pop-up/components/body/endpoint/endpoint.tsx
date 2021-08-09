import React from 'react'
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Show from '@shared/components/show-when';
import { PluginDataInterface } from '@shared/interface/plugin-data.interface';
import Form from 'react-bootstrap/Form';

function Endpoint({ index, endpoint }: { index: number, endpoint: PluginDataInterface }) {
    return (
        <Accordion>
            <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>
                    <Container>
                        <Row className="align-items-center">
                            <Col md={1}>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={endpoint.isEnabled} />
                                </div>
                            </Col>
                            <Col md={11}>
                                <Row className="mb-3">
                                    <Col>
                                        <span className="fw-bold" style={{color: '#d2691e'}}>
                                            {endpoint.url}
                                        </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Show when={endpoint.isEnabled}>
                                            <Show when={endpoint.type}>
                                                <Badge pill bg="secondary" className="mx-1">{endpoint.type}</Badge>
                                            </Show>
                                            <Show when={endpoint.delay}>
                                                <Badge pill bg="secondary" className="mx-1">{'delay: ' + endpoint.delay + 'ms'}</Badge>
                                            </Show>
                                            <Show when={endpoint.status && ['4', '5'].includes(endpoint.status.toString()[0])}>
                                                <Badge pill bg="danger" className="mx-1">{endpoint.status}</Badge>
                                            </Show>
                                            <Show when={endpoint.status && ['2'].includes(endpoint.status.toString()[0])}>
                                                <Badge pill bg="success" className="mx-1">{endpoint.status}</Badge>
                                            </Show>
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
                                <Form.Label>Request Type</Form.Label>
                                <Form.Select aria-label="Request Type" defaultValue={endpoint.type}>
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
                                <Form.Label>Delay</Form.Label>
                                <Form.Control type="text" placeholder="Delay" defaultValue={endpoint.delay} />
                            </Col>
                            <Col md={2}>
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Response Status" defaultValue={endpoint.status}>
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
                                <Form.Label>Select Mock</Form.Label>
                                <Form.Select aria-label="Select Mock" defaultValue={endpoint.selectedMock}>
                                    {
                                        endpoint.mockData.map(mock => {
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
                                <Form.Label>Request Header</Form.Label>
                                <Form.Select defaultValue="2">
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
                                <Form.Label>Response Header</Form.Label>
                                <Form.Select defaultValue="1">
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
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Endpoint
