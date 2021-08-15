import { usePlugin } from '@shared/contexts/plugin-data.context';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { MessageActions } from '../../../shared/enums/MessageActions';
import { ChromeUtils } from '../../../shared/utils/chrome-utils';
import style from './header.module.scss';

function Header() {
    const { saveDataToChromeStorage, extensionState, setExtensionState } = usePlugin();

    const togglePowerButton = (e: any) => {
        e.target && setExtensionState(!extensionState);
    }

    const reloadPage = () => {
        ChromeUtils.sendTabMessage({type: MessageActions.RELOAD});
    }

    return (
        <>
            <Container className={`py-3 my-0 mx-0 ${style.header}`}>
                <Row>
                    <Col>
                        <Button variant={extensionState ? "primary" : "outline-primary"} className="me-3" onClick={togglePowerButton}>{
                            extensionState ? 'On' : 'Off'
                        }</Button>
                        <Button variant="outline-secondary" className="me-3" onClick={reloadPage}>Reload</Button>
                        <Button variant="outline-secondary" className="me-3" onClick={() => saveDataToChromeStorage()}>Save</Button>
                        <Button variant="outline-secondary" onClick={() => ChromeUtils.openOptionsPage()}>Config</Button>
                    </Col>
                </Row>
            </Container>
    </>
    )
}

export default Header
