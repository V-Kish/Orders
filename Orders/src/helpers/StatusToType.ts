import React from 'react'

const types = ['new', 'accept', 'wait', 'reject', 'done']
export const statusToType = (status:number) => {
    return types[status-1]
}