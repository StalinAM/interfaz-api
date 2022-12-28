import React from 'react'
import Persons from './Persons';

function Filter({ findPerson, handleFindPerson }) {
    return (
        <>
            <div>filter shown with <input value={findPerson} onChange={handleFindPerson} /></div>
        </>
    )
}

export default Filter