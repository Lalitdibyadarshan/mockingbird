import React from 'react'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

function JsonEditor({id, height, placeholder, onChangeCb}) {
    return (
        <div>
            <JSONInput
                id = {id}
                placeholder = { placeholder }
                theme='dark'
                locale= { locale }
                height = {height}
                onChange = {onChangeCb}
            />
        </div>
    )
}

export default JsonEditor;
