import React from 'react'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

function JsonEditor({id, height, placeholder, onChangeCb, width}) {
    return (
        <div>
            <JSONInput
                id = {id}
                placeholder = { placeholder }
                theme='light_mitsuketa_tribute'
                locale= { locale }
                height = {height}
                onChange = {onChangeCb}
                width = {width}
            />
        </div>
    )
}

export default JsonEditor;
