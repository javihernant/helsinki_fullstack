import { useEffect, useState } from 'react'
import personsService from './services/persons'

const Person = ({name, number, id, handleDeletion}) => {
  return(
    <li>{name} {number} <button onClick={handleDeletion}>Delete</button></li>
  )
}

const NumberDisplay = ({filter, persons, setPersons}) => {
  
  const handleDeletion = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      personsService
        .deletePerson(person.id)
        .then(()=> {
          setPersons(persons.filter((p)=>p.id !== person.id))
        })
    }

  }

  const getPersons = () => {
    return (
      persons
        .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((p)=> <Person key={p.name} name={p.name} number={p.number} id={p.id} handleDeletion={()=>handleDeletion(p)}/>)
    )
  }

  return (
    <div>
      <ul>{getPersons()}</ul>
    </div>
  )
}

const Filter = ({handleFilterChange, value}) => {
  return (
    <div>Filter: <input onChange={handleFilterChange} value={value} /></div>
  )
}

const AddContact = ({addNumber, handleNameChange, newName, handleNumberChange, newNumber}) => {
  return (
    <form onSubmit={addNumber}>
        <div>
          <div>name: <input onChange={handleNameChange} value={newName} /></div>
          <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  
  const notificationStyle = { 
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({message}) => {
  if (message === null) {
    return null
  }
  
  const notificationStyle = { 
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessg, setErrorMessg] = useState(null)

  useEffect(()=>{
    personsService.getAll()
      .then((persons) => {
        setPersons(persons)
        console.log(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    var newPerson = {
      name: newName,
      number: newNumber,
    }
    var foundPerson = persons.find(p => p.name.toLowerCase() === newName)
    if (!foundPerson) {
      personsService
        .create(newPerson)
        .then((person)=> {
          setPersons(persons.concat(person))
          setNotification(`${newName} was added`)
          setTimeout(() => {setNotification(null)}, 5000)
        })
        .catch(err => {
          setErrorMessg(err.response.data.error)
          setTimeout(() => {setErrorMessg(null)}, 5000)
        })
      
    } else {
      if (foundPerson.number === newNumber) {
        alert(`${newName} is already in phonebook`)
      } else {
        console.log(foundPerson)
        if (window.confirm(`Modify ${newName}'s number?`)) {
          personsService
          .updatePerson(foundPerson.id, newPerson)
          .then(updatedP => {
            setPersons(persons.map(p=> p.name !== foundPerson.name ? p : updatedP))
            setNotification(`${newName}'s number was modified`)
            setTimeout(() => {setNotification(null)}, 5000)
          })
          .catch(err => {
            setErrorMessg(err.response.data.error)
            setTimeout(() => {setErrorMessg(null)}, 5000)
          })
        }
        
      }
    }
    
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <ErrorMessage message={errorMessg}/>
      <Filter handleFilterChange={handleFilterChange} value={filter}/>
      <h3>Add new contact</h3>
      <AddContact addNumber={addNumber} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      <h3>Numbers</h3>
      <NumberDisplay filter={filter} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App