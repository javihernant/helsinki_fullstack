import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'


const getAll = () => {
    return (
        axios
            .get(`${baseUrl}/all`)
            .then((response) => response.data)
            .catch((err)=>{console.log('Error at retrieving data from api', err)})
    )
}



export default {getAll}