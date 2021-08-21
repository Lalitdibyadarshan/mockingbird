import Show from '@shared/components/show-when';
import { usePlugin } from '@shared/contexts/plugin-data.context'
import { PluginDataInterface } from '@shared/interface/plugin-data.interface'
import React, { useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Col, Form, NavDropdown, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import style from './endpoint-list.module.scss';

let currentConfigCount = 0;

function EndpointList({ pluginData, setSelectedEndpoint }: { pluginData: PluginDataInterface[], setSelectedEndpoint: React.Dispatch<React.SetStateAction<{data: PluginDataInterface, index: number}>> }) {
    const { saveDataToChromeStorage, resetChanges, isChangesSavedToStorage, addNewEndpointConfig, removeEndpointConfig} = usePlugin();
    const [ searchResults, setSearchResults ] = useState<PluginDataInterface[]>(null);
    const searchRef = useRef<HTMLInputElement>();
    const updateSearchResults = () => {
        const searchTerm = searchRef.current.value;
        const filteredPluginData = pluginData.filter(data => {
            return !searchTerm ? true :
                data.url.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(() => filteredPluginData);
        // setSelectedEndpoint({data: null as PluginDataInterface, index: -1});
    };

    useEffect(() => {
        if (!searchResults) {
            setSearchResults(pluginData);
            currentConfigCount = pluginData.length;
        }
    }, [pluginData, searchResults]);

    // reset
    useEffect(() => {
        if (isChangesSavedToStorage) {
            setSelectedEndpoint({data: null as PluginDataInterface, index: -1});
            setSearchResults(pluginData);
        }
    }, [isChangesSavedToStorage, setSelectedEndpoint, setSearchResults, pluginData]);

    //add
    useEffect(() => {
        if (pluginData.length !== currentConfigCount) {
            setSearchResults(pluginData);
            currentConfigCount = pluginData.length;
        }
    }, [pluginData]);

    return (
        <>
            <div className="p-4">
                <section className={"p-3 " + style['endpoint-list-header']}>
                    <Row className="pt-2">
                        <Col>
                            <Form.Control type="text" placeholder="Search 🔎" ref={searchRef} onChange={updateSearchResults}/>
                        </Col>
                    </Row>
                    <Row className="py-2">
                        <Col>
                            <Button variant="primary" className="me-2" onClick={saveDataToChromeStorage}>Save</Button>
                            <Button variant="secondary" className="mx-2" onClick={resetChanges}>Reset</Button>
                            <Button variant="secondary" className="ms-2" onClick={addNewEndpointConfig}>New Config</Button>
                            <Badge pill bg={!isChangesSavedToStorage ? "warning" : "success"} className="ms-3">{!isChangesSavedToStorage ? 'Unsaved' : 'Saved'}</Badge>
                        </Col>
                    </Row>
                </section>
                <Row>
                    <Col className={style['endpoint-list']}>
                        {searchResults && searchResults.map((data, index) => {
                            return (
                                <>
                                    <Card key={index + data.id} className = {'mt-2 ' + style['endpoint-card']}>
                                        <Card.Body>
                                            <Card.Text className="d-flex">
                                            <NavDropdown title="⚙" id="collapsible-nav-dropdown">
                                                <NavDropdown.Item onClick={() => setSelectedEndpoint({data, index})}>Edit</NavDropdown.Item>
                                                <NavDropdown.Item onClick={() => removeEndpointConfig(data)}>Delete</NavDropdown.Item>
                                            </NavDropdown>
                                                {/* <Button variant="secondary" className="me-2" onClick={() => setSelectedEndpoint({data, index})}>🛠</Button>  */}
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={<Tooltip id={data.url}>{data.url}</Tooltip>}
                                                >
                                                    <span className={'pt-1 ' + style.clamp}>{data.url}</span>
                                                </OverlayTrigger>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                            );
                        })}
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default EndpointList
