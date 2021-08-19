import { usePlugin } from '@shared/contexts/plugin-data.context'
import { PluginDataInterface } from '@shared/interface/plugin-data.interface'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import style from './endpoint-list.module.scss';

function EndpointList({ pluginData, setSelectedEndpoint }: { pluginData: PluginDataInterface[], setSelectedEndpoint: React.Dispatch<React.SetStateAction<{data: PluginDataInterface, index: number}>> }) {
    const { saveDataToChromeStorage, resetChanges, isChangesSavedToStorage} = usePlugin();
    const [ searchResults, setSearchResults ] = useState<PluginDataInterface[]>(null);
    const searchRef = useRef<HTMLInputElement>();
    const updateSearchResults = () => {
        const searchTerm = searchRef.current.value;
        const filteredPluginData = pluginData.filter(data => {
            return !searchTerm ? true : data.url.includes(searchTerm);
        });
        setSearchResults(filteredPluginData);
    };

    useEffect(() => {
        if (!searchResults) {
            setSearchResults(pluginData);
        }
    }, [pluginData, searchResults]);

    useEffect(() => {
        if (isChangesSavedToStorage) {
            setSelectedEndpoint({data: null as PluginDataInterface, index: -1});
            setSearchResults(pluginData);
        }
    }, [isChangesSavedToStorage, setSelectedEndpoint, setSearchResults, pluginData]);

    return (
        <>
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Form.Control type="text" placeholder="Search 🔎" ref={searchRef} onClick={updateSearchResults}/>
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col>
                        <Button variant="primary" className="me-2" onClick={saveDataToChromeStorage}>Save</Button>
                        <Button variant="secondary" className="mx-2" onClick={resetChanges}>Reset</Button>
                        <Button variant="secondary" className="ms-2">New Config</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {searchResults && searchResults.map((data, index) => {
                            return (
                                <>
                                    <Card key={index}>
                                        <Card.Body>
                                            <Card.Text className="d-flex">
                                                <Button variant="secondary" className="me-2" onClick={() => setSelectedEndpoint({data, index})}>🛠</Button> 
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={<Tooltip id={data.url}>{data.url}</Tooltip>}
                                                >
                                                    <span className={style.clamp}>{data.url}</span>
                                                </OverlayTrigger>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                            );
                        })}
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default EndpointList
