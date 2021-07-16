import { FormControlLabel, FormGroup, Grid, Switch } from '@material-ui/core';
import React from 'react'
import { StorageConstants } from '../../../shared/constants/StorageConstant';
import { useChromeStorage } from '../../../shared/hooks/chrome-storage';
import style from './header.module.scss';

function Header() {
    const [extensionState, setExtensionState] = useChromeStorage(StorageConstants.EXTENSION_STATE, false);

    const togglePowerButton = (e: any) => {
        if (e.target) {
            setExtensionState((e.target as HTMLInputElement).checked);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {type:"power"});
            });
        }
    }

    return (
        // <div>
        //     <label className={style.label}>
        //         <div className={style.toggle}>
        //             <input className={style['toggle-state']} onClick={togglePowerButton} type="checkbox" name="check" value="check" checked={extensionState}/>
        //             <div className={style.indicator}></div>
        //         </div>
        //     </label>
        //     <
        // </div>
        <Grid container spacing={3} justifyContent='center' alignItems='center'>
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
        </Grid>
    )
}

export default Header
