import * as actions from 'constants/actionTypes'
import { of as obsOf } from 'rxjs/observable/of'
import { browserHistory } from 'react-router'

// sign in action creators
export const signIn = (session) => ({
  type: actions.SESSIONS_SIGNIN,
  url: '/api/v1/sessions',
  data: { session }
})

export const signInSuccess = ({ jwt }) => {
  return {
    type: actions.SESSIONS_SIGNIN_SUCCESS,
    jwt
  }
}

export const signInError = ({ errors }) => obsOf({
  type: actions.SESSIONS_SIGNIN_ERROR,
  errors
})

// sign outaction creators
export const signOut = () => ({
  type: actions.SESSIONS_SIGNOUT,
  url: '/api/v1/sessions'
})
 
export const signOutSuccess = () => ({
  type: actions.SESSIONS_SIGNOUT_SUCCESS
})

export const signOutError = () => ({
  type: actions.SESSIONS_SIGNOUT_ERROR
})

export const setError = (key, error) => ({
  type: actions.SESSIONS_SET_ERROR,
  key,
  error
})

export const setCurrentUser = ({ user }) => ({
  type: actions.CURRENT_USER,
  currentUser: user
})

export const getCurrentUser = () => ({
  type: actions.SESSIONS_GET_CURRENT_USER,
  url: '/api/v1/current_user'
})

export const getCurrentUserSuccess = () => ({
  type: actions.SESSIONS_GET_CURRENT_USER_SUCCESS
})

export const getCurrentUserError = () => {
  // browserHistory.push('/sign_in')

  return obsOf({
    type: actions.SESSIONS_GET_CURRENT_USER_ERROR
  })
}
