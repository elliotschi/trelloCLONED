import * as actionTypes from 'constants/actionTypes'
import * as registrationsActions from 'actions/registrations'
import { setCurrentUser } from 'actions/sessions'
import { apiEpic } from 'utils/api'
import { push } from 'react-router-redux'

const signUp = apiEpic({
  initAction: actionTypes.REGISTRATIONS_SIGNUP,
  method: 'POST',
  success: [
    registrationsActions.signUpSuccess,
    setCurrentUser,
    push('/')
  ],
  error: [
    registrationsActions.signUpError
  ]
})

export default [signUp]