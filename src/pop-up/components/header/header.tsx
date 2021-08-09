import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { MessageActions } from '../../../shared/enums/MessageActions';
import { StorageKey } from '../../../shared/enums/storage-key.enum';
import { useChromeStorage } from '../../../shared/hooks/chrome-storage';
import { ChromeUtils } from '../../../shared/utils/chrome-utils';
import style from './header.module.scss';

function Header() {
    const [extensionState, setExtensionState] = useChromeStorage(StorageKey.EXTENSION_STATE, false);

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
                        <Button variant="outline-secondary" onClick={reloadPage}>Reload</Button>
                    </Col>
                </Row>
            </Container>
            
      
    </>
    )
}

export default Header
