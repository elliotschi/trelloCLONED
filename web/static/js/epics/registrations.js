import * as actionTypes from 'constants/actionTypes'
import * as registrationsActions from 'actions/registrations'
import { setCurrentUser } from 'actions/sessions'
import { apiEpic } from 'utils/api'

const signUp = apiEpic({
  initAction: actionTypes.REGISTRATIONS_SIGNUP,
  method: 'POST',
  success: (response) => {
    registrationsActions.signUpSuccess(response)
    setCurrentUser(response)
  },
  error: registrationsActions.signUpError
})

export default [signUp]