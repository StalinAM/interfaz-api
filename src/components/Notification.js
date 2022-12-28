import React from 'react'

function Notification({ message }) {

    if (message === null) {
        return null
    }
    return (
        <p className='error' style={message.includes("added") ? { color: "red" } : { color: 'green' }} >{message}</p>
    )
}

export default Notification