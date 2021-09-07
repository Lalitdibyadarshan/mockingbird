import { usePlugin } from '@shared/contexts/plugin-data.context';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { MessageActions } from '../../../shared/enums/MessageActions';
import { ChromeUtils } from '../../../shared/utils/chrome-utils';
import style from './header.module.scss';
import { saveAs } from 'file-saver';
import { Form } from 'react-bootstrap';
import PopUpDictionary from '../../i18n/popup-dictionary';

function Header() {
    const { saveDataToChromeStorage, extensionState, setExtensionState, pluginData, importExternalData } = usePlugin();

    const togglePowerButton = (e: any) => {
        e.target && setExtensionState(!extensionState);
    }

    const reloadPage = () => {
        ChromeUtils.sendTabMessage({type: MessageActions.RELOAD});
    }

    const exportData = () => {
        var file = new File([JSON.stringify(pluginData)], "mocking-bird-data.txt", {type: "text/plain;charset=utf-8"});
        saveAs(file);
    }

    const importData = (e) => {
        try {
            let files = e.target.files;
            if (!files.length) {
                alert(PopUpDictionary.ALERT_NO_FILES_SELECTED);
                return;
            }
            let file = files[0];
            let reader = new FileReader();
            reader.onload = (event) => {
                importExternalData(JSON.parse(JSON.parse(JSON.stringify(event.target.result))));
            };
            reader.readAsText(file);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Container className={`py-3 my-0 mx-0 ${style.header}`}>
                <Row>
                    <Col>
                        <Button variant={extensionState ? "primary" : "outline-primary"} className="me-3" onClick={togglePowerButton}>{
                            extensionState ? PopUpDictionary.BTN_ON : PopUpDictionary.BTN_OFF
                        }</Button>
                        <Button variant="secondary" className="me-3" onClick={reloadPage}>{PopUpDictionary.BTN_RELOAD}</Button>
                        <Button variant="secondary" className="me-3" onClick={() => saveDataToChromeStorage()}>{PopUpDictionary.BTN_SAVE}</Button>
                        <Button variant="secondary" className="me-3" onClick={() => ChromeUtils.openOptionsPage()}>{PopUpDictionary.BTN_CONFIG}</Button>
                        <Button variant="secondary" className="me-3" onClick={() => exportData()}>{PopUpDictionary.BTN_EXPORT}</Button>
                        <Form.Group controlId="import" className="me-3 d-inline-block">
                            <Form.Label className="btn btn-secondary m-0" >{PopUpDictionary.BTN_IMPORT}</Form.Label>
                            <Form.Control className="d-none" type="file" onChange={(e) => importData(e)}/>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
    </>
    )
}

export default Header
