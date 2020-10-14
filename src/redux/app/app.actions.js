import collections from '../../services/collections'
import links from '../../services/links'
import tags from '../../services/tags'

import {
  GET_ALL_TAGS,
  GET_INITIAL_COLLECTIONS,
  GET_INITIAL_LINKS,
  UPDATE_TAGS,
} from './action.types'

export const getInitialLinks = () => {
  return async (dispatch) => {
    const initialLinks = await links.getAll()
    dispatch({
      links: initialLinks,
      type: GET_INITIAL_LINKS,
    })
  }
}

export const getInitialCollections = () => {
  return async (dispatch) => {
    const initialCollections = await collections.getAll()
    dispatch({
      collections: initialCollections,
      type: GET_INITIAL_COLLECTIONS,
    })
  }
}

export const getAllTags = () => {
  return async (dispatch) => {
    const allTags = await tags.getAll()
    dispatch({
      tags: allTags,
      type: GET_ALL_TAGS,
    })
  }
}

export const addNewTags = (newTags) => {
  return (dispatch) =>
    dispatch({
      newTags,
      type: UPDATE_TAGS,
    })
}
