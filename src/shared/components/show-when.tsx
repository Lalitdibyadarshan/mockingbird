import React from 'react'

function Show({children, when}) {
    return (
        <>
            {when && children}
        </>
    )
}

export default Show;
