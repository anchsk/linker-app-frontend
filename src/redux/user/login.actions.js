/* User */

import loginService from '../../services/login'
import {
  setNotificationError,
  setNotificationSuccess,
} from '../notifications/notifications.actions'

import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from './actions.types'

export const loginWithCredentials = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({ password, username })
      window.localStorage.setItem('user', JSON.stringify(loggedUser))
      dispatch(loginSuccess())
      dispatch(setNotificationSuccess(`Hello ${loggedUser.name} :)`))
    } catch (err) {
      dispatch({
        type: LOGIN_FAILURE,
        user: {
          isLoggedIn: false,
        },
      })
      if (err.message === 'Request failed with status code 401') {
        dispatch(setNotificationError('Wrong username or password'))
      } else {
        dispatch(
          setNotificationError(
            `${err.message} (Server error. Please, try later. Sorry!)`
          )
        )
      }
    }
  }
}
export const loginSuccess = () => {
  return async (dispatch) => {
    let userInLocalStorage = await JSON.parse(
      window.localStorage.getItem('user')
    )
    dispatch({
      type: LOGIN_SUCCESS,
      user: {
        id: userInLocalStorage.id,
        isLoggedIn: true,
        name: userInLocalStorage.name,
        token: userInLocalStorage.token,
        username: userInLocalStorage.username,
      },
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('user')
    dispatch({
      type: LOGOUT,
    })
  }
}
