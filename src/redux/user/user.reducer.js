import {
  ADD_LINKS_TO_COLLECTION,
  ADD_NEW_LINK,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  DELETE_LINK,
  GET_USER_DATA,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REMOVE_LINK_FROM_COLLECTION,
} from './actions.types'


let userInLocalStorage = JSON.parse(window.localStorage.getItem('user'))
let initialState = userInLocalStorage
  ? {
      id: userInLocalStorage.id,
      isLoggedIn: true,
      name: userInLocalStorage.name,
      token: userInLocalStorage.token,
      username: userInLocalStorage.username,
    }
  : { isLoggedIn: false }

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        id: action.user.id,
        isLoggedIn: action.user.isLoggedIn,
        name: action.user.name,
        token: action.user.token,
        username: action.user.username,
      }

    case LOGIN_FAILURE:
      return { isLoggedIn: false }

    case GET_USER_DATA:
      return {
        ...state,
        collections: action.user.collections,
        liked: action.user.liked,
        links: action.user.links,
      }

    case LOGOUT:
      return { isLoggedIn: false }

    case ADD_NEW_LINK:
      return {
        ...state,
        links: [...state.links, action.createdLink],
      }

    case CREATE_COLLECTION:
      return {
        ...state,
        collections: state.collections.concat(action.createdCollection),
      }

    case ADD_LINKS_TO_COLLECTION:
      return {
        ...state,
        //replace old collection in collections with updated collection
        collections: state.collections.map((col) =>
          col.id === action.updatedCollection.id
            ? action.updatedCollection
            : col
        ),
        //update reference to new collection in links
        links: state.links.map((link) =>
          action.updatedCollection.links.includes(link.id)
            ? {
                ...link,
                collections: link.collections.concat(
                  action.updatedCollection.id
                ),
              }
            : link
        ),
      }

    case REMOVE_LINK_FROM_COLLECTION:
      return {
        ...state,
        collections: state.collections.map((col) =>
          col.id === action.updatedCollection.id
            ? action.updatedCollection
            : col
        ),
        links: state.links.map(link => link.id === action.linkId
          ? {
            ...link,
            collections: link.collections.filter(col => col !== action.updatedCollection.id)
          }
          : link)
      }

    case DELETE_LINK:
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection.links.includes(action.linkId)
            ? {
                ...collection,
                links: collection.links.filter((id) => id !== action.linkId),
              }
            : collection
        ),
        links: state.links.filter((link) => link.id !== action.linkId),
      }

    case DELETE_COLLECTION:
      return {
        ...state,
        collections: state.collections.filter(
          (col) => col.id !== action.collectionId
        ),
        links: state.links.map((link) =>
          link.collections.includes(action.collectionId)
            ? {
                ...link,
                collections: link.collections.filter(
                  (id) => id !== action.collectionId
                ),
              }
            : link
        ),
      }

    default:
      return state
  }
}

export default userReducer
