import axios from 'axios'

const baseUrl = '/api/tags'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const findById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { findById, getAll }