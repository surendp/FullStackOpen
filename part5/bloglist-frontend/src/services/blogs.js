import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = () => ({
  headers: {
    Authorization: token,
  }
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const request = await axios
    .post(baseUrl, blog, config())

  return request.data
}

const update = async updatedBlog => {
  const request = await axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config())

  return request.data
}

const remove = async blog => {
  const request = await axios
    .delete(`${baseUrl}/${blog.id}`, config())

  return request.data
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
}