import * as actionTypes from 'constants/actionTypes'
import * as sessionsActions from 'actions/sessions'
import { push } from 'react-router-redux'
import { apiEpic } from 'utils/api'

const signIn = apiEpic({
  initAction: actionTypes.SESSIONS_SIGNIN,
  method: 'POST',
  success: [
    sessionsActions.signInSuccess,
    sessionsActions.setCurrentUser,
    push('/')
  ],
  error: [
    sessionsActions.signInError
  ]
})

const signOut = apiEpic({
  initAction: actionTypes.SESSIONS_SIGNOUT,
  method: 'DELETE',
  success: [
    sessionsActions.signOutSuccess,
    push('/')
  ],
  error: [
    sessionsActions.signOutError
  ],
  auth: true
})

const getCurrentUser = apiEpic({
  initAction: actionTypes.SESSIONS_GET_CURRENT_USER,
  method: 'GET',
  success: [
    sessionsActions.getCurrentUserSuccess,
    sessionsActions.setCurrentUser
  ],
  error: [
    sessionsActions.getCurrentUserError,
    push('/sign_in')
  ],
  auth: true
})

export default [signIn, signOut, getCurrentUser]