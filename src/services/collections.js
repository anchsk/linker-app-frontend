import axios from 'axios'

import authHeader from '../helpers/auth-header'

const baseUrl = '/api/collections'

let config = () => {
  let auth = authHeader()
  return {
    headers: auth,
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const getById = async (collectionId) => {
  const request = await axios.get(`${baseUrl}/${collectionId}`)
  return request.data
}

const create = async (newCollection) => {
  const response = await axios.post(baseUrl, newCollection, config())
  return response.data
}

const update = async (collectionId, updatedCollection) => {
  const response = await axios.put(
    `${baseUrl}/${collectionId}`,
    updatedCollection,
    config()
  )
  return response.data
}

const deleteById = async (collectionId) => {
  const response = await axios.delete(`${baseUrl}/${collectionId}`, config())
  return response.status
}

const updateLinksInCollection = async (updatedCollection) => {
  const response = await axios.put(
    `${baseUrl}/${updatedCollection.id}/links`,
    updatedCollection,
    config()
  )
  return response.data
}

export default {
  create,
  deleteById,
  getAll,
  getById,
  update,
  updateLinksInCollection,
}
