import { notification } from './actions.types'

let id = 0

export const setNotificationError = (message) => {
  let newId = `e${id++}`
  return async (dispatch) => {
    await dispatch(showNotificationFor({ id: newId, message, style: 'error' }))
    setTimeout(() => {
      dispatch(removeNotificationFor(newId))
    }, 4000)
  }
}

export const setNotificationSuccess = (message) => {
  let newId = `s${id++}`
  return async (dispatch) => {
    await dispatch(
      showNotificationFor({ id: newId, message, style: 'success' })
    )
    setTimeout(() => {
      dispatch(removeNotificationFor(newId))
    }, 4000)
  }
}

export const showNotificationFor = ({ message, style, id }) => {
  return {
    id: id,
    message: message,
    style: style,
    type: notification.SHOW,
  }
}

async function isNotifShown (array, id) {
  let isShown = await array.filter((notification) => notification.id === id)
  if (isShown.length !== 0) {
    return true
  } else {
    return null
  }
}

export const removeNotificationFor = (id) => {
  return async (dispatch, state) => {
    let arrayOfNotifications = await state().notification
    let isShown = await isNotifShown(arrayOfNotifications, id)
    if (isShown) {
      return dispatch({
        id,
        type: notification.REMOVE,
      })
    } else {
      return null
    }
  }
}
