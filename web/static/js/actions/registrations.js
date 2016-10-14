import { pushPath } from 'redux-simple-router'
import * as actions from 'constants/actionTypes'
import { of as obsOf } from 'rxjs/observable/of'
import { browserHistory } from 'react-router'

export const signUp = (user) => ({
  type: actions.REGISTRATIONS_SIGNUP,
  url: '/api/v1/registrations',
  data: { user }
})

export const signUpSuccess = ({ jwt }) => {
  browserHistory.push('/')

  return {
    type: actions.REGISTRATIONS_SIGNUP_SUCCESS,
    jwt
  }
}

export const signUpError = ({ errors }) => obsOf({
  type: actions.REGISTRATIONS_SIGNUP_ERROR,
  errors
})

export const setError = (key, error) => ({
  type: actions.REGISTRATIONS_SET_ERROR,
  key,
  error
})
