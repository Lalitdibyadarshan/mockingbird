// import { Button, FormControlLabel, FormGroup, Grid, Switch } from '@material-ui/core';
// import SaveIcon from '@material-ui/icons/Save';
import React from 'react'
import { Button } from 'react-bootstrap';
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
        <div className={style.header}>
            <Button variant="outline-primary" onClick={togglePowerButton}>{
                extensionState ? 'On' : 'Off'
            }</Button>
            <Button variant="outline-secondary" onClick={reloadPage}>reload</Button>
            {/* <Grid container spacing={3} 
                justifyContent='space-between'
                alignItems='center'
                    >
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick = {reloadPage}
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
                <FormGroup row>
                    <FormControlLabel
                        control={<Switch
                            checked={extensionState}
                            onChange={togglePowerButton}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'Mocking bird power button' }}
                        />}
                        label={extensionState ? 'On' : 'Off'}
                    />
                </FormGroup>
            </Grid> */}
        </div>
    )
}

export default Header
