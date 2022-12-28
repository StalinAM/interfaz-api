import React, { useState } from 'react'
import personServer from '../services/personServer'

function Person({ name, number, id, setPersons, persons }) {
    const handleClick = () => {
        if (window.confirm(`Delete ${name} ?`)) {
            personServer.deletePer(id)
            setPersons(persons.filter(item => item.id !== id))
        }
    }
    return (
        <>
            <li>{name} {number} <button onClick={handleClick} >delete</button></li>
        </>
    )
}

export default Person