import React from 'react'
import Person from './Person'
function Persons({ persons, setPersons }) {
    return (
        <ul>
            {persons.map((person, index) => <Person persons={persons} setPersons={setPersons} key={person.id} name={person.name} number={person.number} id={person.id} />)}
        </ul>
    )
}

export default Persons