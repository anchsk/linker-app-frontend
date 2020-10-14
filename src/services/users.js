import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const findById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const findByUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/?username=${username}`)
  return response.data
}

export default { findById, findByUsername, getAll }
