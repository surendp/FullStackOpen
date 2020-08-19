import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = userId => {
  const request = axios.get(`${baseUrl}/${userId}`)
  return request.then(response => response.data)
}

const create = (name, username, password) => {
  const request = axios.post(baseUrl, {
    name,
    username,
    password
  })
  return request.then(response => response.data)
}

export default {
  getAll,
  getOne,
  create
}