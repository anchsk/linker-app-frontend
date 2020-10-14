import axios from 'axios'

import authHeader from '../helpers/auth-header'

const baseUrl = '/api/links'

let config = () => {
  let auth = authHeader()
  return {
    headers: auth,
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)/* .catch(err => {
    if (err.response.status === 429) {
      console.log(err.response.statusText)
    }
  }) */
}

const getById = async (linkId) => {
  const request = await axios.get(`${baseUrl}/${linkId}`)
  return request.data
}

const create = async (newLink) => {
  const response = await axios.post(baseUrl, newLink, config())
  return response.data
}

const update = async (updatedLink) => {
  const response = await axios.put(
    `${baseUrl}/${updatedLink.id}`,
    updatedLink,
    config()
  )
  return response.data
}

const deleteById = async (idToRemove) => {
  const deleteUrl = baseUrl + `/${idToRemove}`
  const response = await axios.delete(deleteUrl, config())
  //console.log('deleteLink, response', response)
  return response.status
}

export default { create, deleteById, getAll, getById, update }
