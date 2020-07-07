import React, { useState, useEffect } from 'react'
import {
  getAll,
  create,
  update,
  remove,
} from './services/personService'

const Notification = ({ message, isErrorMessage }) => {
  if (!message) {
    return null
  }

  return (
    <h4 className={isErrorMessage ? 'notification error' : 'notification success'}>
      {message}
    </h4>
  )
}

const Filter = ({ searchTerm, handleChangeSearchTerm }) => (
  <form onSubmit={event => event.preventDefault()}>
    <div>
      Filter shown with
      <input
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
    </div>
  </form>
)

const Person = ({ person, handleDelete }) => (
  <div>
    {`${person.name} ${person.number}`}
    <button
      onClick={() => handleDelete(person)}
    >
      {'delete'}
    </button>
  </div>
)

const Persons = ({ persons, searchTerm, handleDelete }) => {
  const filteredPersons = persons.filter(person =>
    person
    .name
    .toLowerCase()
    .includes(searchTerm.trim().toLowerCase())
  )

  return (
    <div>
      {filteredPersons.map(person =>
        <Person
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

const PersonForm = ({
  name,
  number,
  handleSubmit,
  handleChangeSetName,
  handleChangeSetNumber,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name:
      <input
        value={name}
        onChange={handleChangeSetName}
      />
    </div>
    <div>
      number:
      <input
        value={number}
        onChange={handleChangeSetNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ notification, setNotification ] = useState({
    message: null,
    isError: false,
  })

  useEffect(() => {
    getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const createNotification = (message, isError) => {
    setNotification({
      message,
      isError,
    })

    setTimeout(() => {
      setNotification({
        message: null,
        isError: false,
      })
    }, 5000)
  }

  const createNewPerson = (trimName, trimNumber) => {
    create({
      name: trimName,
      number: trimNumber,
    })
    .then(data => {
      setPersons([
        ...persons,
        data,
      ])

      createNotification(`Added ${data.name}`)
    })

    clearForm()
  }

  const updatePerson = (trimName, trimNumber, existingPerson) => {
    if(window.confirm(`${trimName} is already added to phonebook, replace the old number with a new one?`)) {
      update({
        ...existingPerson,
        number: trimNumber
      })
      .then(data => {
        setPersons(
          persons.map(person => {
            if (person.id === data.id) {
              return data
            }
            return person
          })
        )
      })
      .catch(error => {
        createNotification(
          `Information of ${existingPerson.name} has already been removed from server`,
          true
        )

        setPersons(
          persons.filter(person => person.id !== existingPerson.id)
        )
      })

      clearForm()
    }
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleSubmit = event => {
    event.preventDefault()
    const trimName = newName.trim()
    const trimNumber = newNumber.trim()
    const existingPerson = alreadyExists(trimName)

    // check if the name and the number are valid 
    if (trimName < 1 || trimNumber.length < 1) {
      createNotification(`Please input valid name and phone number`, true)
    }

    // Create a new person in the database
    // if the person doesnot exist already
    if (!existingPerson && trimNumber.length) {
      createNewPerson(trimName, trimNumber)
    }

    // Update the person's phone number in the database
    // if the person exists already
    if (existingPerson && trimNumber.length){
      updatePerson(trimName, trimNumber, existingPerson)
    }
  }

  const handleDelete = deletePerson => {
    if(window.confirm(`Delete ${deletePerson.name}`)) {
      remove(deletePerson.id)
        .then(data => {
          setPersons(persons.filter(person => person.id !== deletePerson.id))
        })
        .catch(error => {
          createNotification(
            `Information of ${deletePerson.name} has already been removed from server`,
            true
          )
          setPersons(persons.filter(person => person.id !== deletePerson.id))
        })
    }
  }

  const alreadyExists = name => {
    const person = persons.find(person => person.name === name)
    return person
  }

  const handleChangeSearchTerm = event => {
    setSearchTerm(event.target.value)
  }

  const handleChangeSetName = event => {
    setNewName(event.target.value)
  }

  const handleChangeSetNumber = event => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        isErrorMessage={notification.isError}
      />
      <Filter searchTerm={searchTerm} handleChangeSearchTerm={handleChangeSearchTerm} />
  
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleSubmit={handleSubmit}
        handleChangeSetName={handleChangeSetName}
        handleChangeSetNumber={handleChangeSetNumber}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App