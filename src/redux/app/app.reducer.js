import { GET_ALL_TAGS, GET_INITIAL_COLLECTIONS, GET_INITIAL_LINKS, UPDATE_TAGS } from './action.types'

const initialState = {
  collections: [],
  links: [],
  tags: [],
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INITIAL_LINKS:
      return {
        ...state,
        links: action.links,
      }
    case GET_INITIAL_COLLECTIONS:
      return {
        ...state,
        collections: action.collections,
      }
    case GET_ALL_TAGS:
      return {
        ...state,
        tags: action.tags,
      }
    case UPDATE_TAGS:
      return {
        ...state,
        tags: state.tags.concat(action.newTags),
      }
    default:
      return state
  }
}
export default appReducer
