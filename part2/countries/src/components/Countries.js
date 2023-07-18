import {useEffect, useState} from 'react'
import countriesService from '../services/countries'
import weatherService from '../services/weather'

const Languages = ({languages}) => {
  return (
    <div><ul>{Object.entries(languages).map(([k,v]) => <li key={k}>{v}</li>)}</ul></div>
  )
}

const Country = ({data}) => {
  const [weatherData, setWeatherData] = useState(null)
  useEffect(() => {
    weatherService
      .getWeather(data)
      .then(data => {
        setWeatherData(data)
      })
  }, [])

  if (!weatherData) {
    return null
  }
  return(
    <div>
      <h2>{data.name.common}</h2>
      <p>capital {data.capital[0]}</p>
      <p>area {data.area}</p>
      <h3>Languages</h3>
      <Languages languages={data.languages} />
      <img alt='' src={data.flags.png} />
      <h3>Weather in {weatherData.name}</h3>
      <p>Temperature {weatherData.main.temp}</p>
      <img alt='' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
      <p>Wind {weatherData.wind.speed}m/s</p>
    </div>
  )
}

const CountrySimplified = ({data, setFilter}) => {
  const selectCountry = () => {
    setFilter(data.name.common)
  }
  return(
    <div>
      <p>{data.name.common}<button onClick={selectCountry}>Select</button></p>
    </div>
  )
}

const Countries = ({filter, setFilter}) => {
    const [countries, setCountries] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])

    useEffect(() => {
      countriesService
        .getAll()
        .then(cs => {
          setCountries(cs)
        })
    }, [])

    useEffect(() => {
      const selected = countries
        .filter((c) => filter && c.name.common.toLowerCase().includes(filter.toLowerCase()))
      setSelectedCountries(selected)
    }, [filter, countries])
    
    if (selectedCountries.length === 0) {
      return(
        <div>
            <p>Current filter does not match any entries</p>
        </div>
      )
    }
    else if (selectedCountries.length === 1) {
      return(
        <div>
            {selectedCountries.map((country)=><Country key={country.name.official} data={country} />)}
        </div>
      )
    } else if (selectedCountries.length <= 10) {
        return(
          <div>
            {selectedCountries.map((country)=><CountrySimplified key={country.name.official} data={country} setFilter={setFilter}/>)}
          </div>
        )
    } else {
      return(
        <div><p>Too many matches, specify another filter</p></div>
      )
    }
}
export default Countries