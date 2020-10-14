import {
  FORM_ADD_LINK_IS_LOADING,
  FORM_ADD_LINK_RESET,
  FORM_ADD_LINK_SUCCESS,
} from './actions.types'

export const setFormIsLoading = () => {
 return async dispatch => {
  dispatch({
   type: FORM_ADD_LINK_IS_LOADING
  })
 }
}

export const setFormSuccess = () => {
 return async dispatch => {
  dispatch({
   type: FORM_ADD_LINK_SUCCESS
  })
 }
}

export const setFormReset = () => {
 return async dispatch => {
  dispatch({
   type: FORM_ADD_LINK_RESET
  })
 }
}