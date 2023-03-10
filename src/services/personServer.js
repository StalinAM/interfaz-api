import axios from 'axios'
const baseUrl = 'https://kind-red-turtle-tie.cyclic.app/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request
}

const deletePer = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

export default { getAll, create, update, deletePer }