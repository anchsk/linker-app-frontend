import {
  FORM_ADD_LINK_IS_LOADING,
  FORM_ADD_LINK_RESET,
  FORM_ADD_LINK_SUCCESS,
} from './actions.types'

const initialState = {
  addLinkForm: {
    isLoaded: false,
    isLoading: false,
  },
}

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case FORM_ADD_LINK_IS_LOADING:
      return {
        ...state,
        addLinkForm: {
          isLoaded: false,
          isLoading: true,
        },
      }
    case FORM_ADD_LINK_SUCCESS:
      return {
        ...state,
        addLinkForm: {
          isLoaded: true,
          isLoading: false,
        },
      }
    case FORM_ADD_LINK_RESET:
      return initialState
    default:
      return state
  }
}

export default uiReducer
