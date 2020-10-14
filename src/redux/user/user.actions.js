import collections from '../../services/collections'
import links from '../../services/links'
import users from '../../services/users'
import { setFormSuccess } from '../ui/ui.actions'

import {
  ADD_LINKS_TO_COLLECTION,
  ADD_NEW_LINK,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  DELETE_LINK,
  GET_USER_DATA,
  REMOVE_LINK_FROM_COLLECTION,
} from './actions.types'

export const getUserData = (id) => {
  return async (dispatch) => {
    const user = await users.findById(id)
    dispatch({
      type: GET_USER_DATA,
      user: {
        collections: user.collections,
        liked: [],
        links: user.links,
      },
    })
  }
}

export const addNewLink = (link) => {
  return async (dispatch) => {
    const createdLink = await links.create({
      description: link.description,
      title: link.title,
      url: link.url,
    })
    dispatch({
      createdLink,
      type: ADD_NEW_LINK,
    })
    dispatch(setFormSuccess())
  }
}

export const deleteOneLink = (linkId) => {
  return async (dispatch) => {
    await links.deleteById(linkId)
    dispatch({
      linkId,
      type: DELETE_LINK,
    })
  }
}

export const addNewCollection = (collectionName) => {
  return async (dispatch) => {
    const createdCollection = await collections.create({
      name: collectionName,
    })
    dispatch({
      createdCollection,
      type: CREATE_COLLECTION,
    })
  }
}

export const addLinksToCollection = (modifiedCollection) => {
  return async (dispatch) => {
    let updatedCollection = await collections.updateLinksInCollection(
      modifiedCollection
    )
    dispatch({ type: ADD_LINKS_TO_COLLECTION, updatedCollection })
  }
}

export const removeLinkFromCollection = (collectionId, linkId) => {
  return async (dispatch, state) => {
    const collection = state().user.collections.filter(
      (col) => col.id === collectionId
    )[0]

    let modifiedCollection = {
      ...collection,
      links: collection.links.filter((id) => id !== linkId),
    }

    let updatedCollection = await collections.updateLinksInCollection(
      modifiedCollection
    )
    // eslint-disable-next-line
    dispatch({ type: REMOVE_LINK_FROM_COLLECTION, linkId, updatedCollection })
  }
}

export const deleteCollection = (collectionId) => {
  return async (dispatch) => {
    await collections.deleteById(collectionId)
    dispatch({
      collectionId,
      type: DELETE_COLLECTION,
    })
  }
}
