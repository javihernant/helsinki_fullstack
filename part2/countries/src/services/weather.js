import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const getWeather = (country) => {
    return (
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.area}&units=metric&appid=${api_key}`)
            .then((response) => response.data)
            .catch((err)=>{console.log('Error at retrieving weather data', err)})
    )
}

export default {getWeather}