import Show from '@shared/components/show-when';
import { MockDataInterface } from '@shared/interface/plugin-data.interface';
import React, { useRef, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import EndpointJsonEditor from './endpoint-Json-editor/endpoint-json-editor';

function EndpointMocks({ mockData, index, removeMockResponse, updateNewMockResponse }: { mockData: MockDataInterface, index: number, removeMockResponse: (index) => void, updateNewMockResponse: (index, data) => void }) {
    const [showModal, setShowModal] = useState(false);
    const aliasRef = useRef<HTMLInputElement>();

    const updateMockDataResponse = (newJson) => {
        mockData.data = newJson;
        updateNewMockResponse(index, mockData);
    }

    const updateMockDataAlias = () => {
        mockData.alias = aliasRef.current.value;
        updateNewMockResponse(index, mockData);
    }

    return (
        <div className="my-2 px-2 d-flex">
            <FormControl
                type="text"
                placeholder={'Mock alias name'}
                aria-label={mockData.alias}
                defaultValue={mockData.alias}
                ref={aliasRef}
                onChange={() => updateMockDataAlias()}
            />
            <Button variant="secondary" className="m-1"onClick={() => setShowModal(true)}>
                <span className="fw-bold">{'</>'}</span>
            </Button>
            <Button variant="danger" className="m-1" onClick={() => removeMockResponse(index)}>🗑</Button>

            <Show when={showModal}>
                <EndpointJsonEditor jsonData={mockData} showModal={showModal} setShowModal={setShowModal} updateMockDataResponse={updateMockDataResponse}></EndpointJsonEditor>
            </Show>
        </div>
    )
}

export default EndpointMocks
