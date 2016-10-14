import * as actionTypes from 'constants/actionTypes'
import * as sessionsActions from 'actions/sessions'
import { apiEpic } from 'utils/api'

const signIn = apiEpic({
  initAction: actionTypes.SESSIONS_SIGNIN,
  method: 'POST',
  success: (response) => {
    sessionsActions.signInSuccess(response)
    sessionsActions.setCurrentUser(response)
  },
  error: sessionsActions.signInError
})

const signOut = apiEpic({
  initAction: actionTypes.SESSIONS_SIGNOUT,
  method: 'DELETE',
  success: sessionsActions.signOutSuccess,
  error: sessionsActions.signOutError
})

const getCurrentUser = apiEpic({
  initAction: actionTypes.SESSIONS_GET_CURRENT_USER,
  method: 'GET',
  success: (response) => {
    sessionsActions.getCurrentUserSuccess()
    sessionActions.setCurrentUser(response)
  },
  error: sessionsActions.getCurrentUserError
})

export default [signIn, signOut, getCurrentUser]