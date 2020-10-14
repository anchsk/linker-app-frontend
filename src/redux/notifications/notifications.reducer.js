import { notification } from './actions.types'

const initialState = []

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notification.SHOW:
      return [...state].concat({
        id: action.id,
        message: action.message,
        style: action.style,
      })
    case notification.REMOVE:
      return state.filter((notification) => notification.id !== action.id)

    default:
      return state
  }
}

export default notificationReducer
