import React from 'react'
import { HttpType } from '@shared/enums/http-type.enum'
import Endpoint from './endpoint/endpoint'


function Body() {

    const data = [{
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        isEnabled: true,
        status: 200,
        delay: 3000,
        allPath: true,
        allQuery: true,
        type: HttpType.GET,
        mock: true,
        selectedMock: 'main',
        mockData: [{
            alias: 'main',
            data: { type: 'mocked' }
        },{
            alias: 'secondary',
            data: { type: 'secondary' }
        }],
        header: {}
    },
    {
        url: 'https://jsonplaceholder.typicode.com/todos/2',
        isEnabled: true,
        status: 400,
        delay: 1000,
        allPath: true,
        allQuery: true,
        type: HttpType.POST,
        mock: true,
        selectedMock: 'secondary',
        mockData: [{
            alias: 'main',
            data: { type: 'mocked' }
        },{
            alias: 'secondary',
            data: { type: 'secondary' }
        }],
        header: {}
    }]
    return (
        <div>
            {data.map((endpoint, index) => {
                return (
                    <Endpoint index={index} endpoint={endpoint}/>
                )
            })}
        </div>
    )
}

export default Body
