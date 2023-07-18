import {useState} from 'react'
import Countries from './components/Countries'

const Filter = ({onChange, filter}) => {
  return(
    <div>find countries <input onChange={onChange} value={filter}></input></div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const modifyFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <Filter onChange={modifyFilter} value={filter} />
      <Countries filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default App