import JsonEditor from '@shared/components/json-editor/json-editor'
import React from 'react'
import { Modal } from 'react-bootstrap'

function EndpointJsonEditor({jsonData, showModal, setShowModal, updateMockDataResponse}) {
    return (
        <div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {jsonData.alias}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <JsonEditor
                    id="mb-mock-json"
                    height="100%"
                    width="100%"
                    placeholder={jsonData.data}
                    onChangeCb={(content) => {
                        updateMockDataResponse(content['jsObject'])
                    }} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EndpointJsonEditor
