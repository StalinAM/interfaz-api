import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonServer from "./services/personServer";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findPerson, setFindPerson] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    PersonServer.getAll().then((response) => {
      setPersons(response.data);
    });
  }, [persons]);

  const handleFindPerson = (e) => {
    setFindPerson(e.target.value);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const filterPersons = (nameSerch) =>
    persons
      .filter((person) =>
        person.name.toLowerCase().includes(nameSerch.toLowerCase())
      )
      .map((per) => per);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (filterPersons(personObject.name).length !== 1) {
      setNewName("");
      setNewNumber("");
      PersonServer.create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setErrorMessage(`Added ${personObject.name}`);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    } else {
      if (window.confirm(`Update ${newName}`)) {
        PersonServer.update(
          filterPersons(personObject.name)[0].id,
          personObject
        )
          .then((response) => {
            console.log(response);
            setPersons(
              persons.map((per) =>
                per.id !== filterPersons(personObject.name)[0].id
                  ? per
                  : response.data
              )
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Information of '${personObject.name}' has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);
          });
        setErrorMessage(`Update ${personObject.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
        setNewName("");
        setNewNumber("");
      }
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter findPerson={findPerson} handleFindPerson={handleFindPerson} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {findPerson ? (
        <Persons setPersons={setPersons} persons={filterPersons(findPerson)} />
      ) : (
        <Persons setPersons={setPersons} persons={persons} />
      )}
    </div>
  );
};

export default App;
