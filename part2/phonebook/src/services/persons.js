import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = (person) => {
    return(
        axios
            .post(baseUrl, person)
            .then(response => response.data)
    )
}

const getAll = () => {
    return (
        axios
        .get(baseUrl)
        .then((response) => {
            return response.data
        })
    )
}

const deletePerson = (id) => {
    return(
        axios
            .delete(`${baseUrl}/${id}`)
            .catch(()=> {console.log(`${id} could not be deleted`)})
    )
}

const updatePerson = (id, person) => {
    return(
        axios
            .put(`${baseUrl}/${id}`, person)
            .then(resp => resp.data)
    )
}

export default {create, getAll, deletePerson, updatePerson}