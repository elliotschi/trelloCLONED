import 'rxjs/operator/map'
import 'rxjs/operator/catch'
import * as actionTypes from 'constants/actionTypes'
import * as registrationsActions from 'actions/registrations'
import { ajax } from 'rxjs/observable/dom/ajax'

const signUp = action$ => (
  action$.ofType(actionTypes.REGISTRATIONS_SIGNUP)
    .map(({ url, data }) => ajax({
      url,
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }))
    .map(({ response: { jwt } }) => registrationsActions.signUpSuccess({
      jwt
    }))
    .catch(({ response }) => {
      registrationsActions.signUpError({ errors: response.errors })
    })
)

export default [signUp]