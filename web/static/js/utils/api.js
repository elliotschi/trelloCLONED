import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

const baseHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

/*
@params:
initAction => action constant for the first action
method => http method
auth => bool indicating whether to add the jwt to the headers
success => success action creator
error => error action creator
*/
export const apiEpic = ({ initAction, method, auth, success, error }) => action$ => (
  action$.ofType(initAction)
    .switchMap(({ url, data }) => ajax({
      url,
      method,
      body: data,
      headers: auth ? {...baseHeaders, Authorization: localStorage.getItem('authToken')} : baseHeaders
    }))
    .map(({ response }) => success(response))
    .catch(({ response }) => error(response))
)

// function sets isLoading flags in the redux state
export const isLoading = (state, key) => ({
  ...state,
  isLoading: {
    ...state.isLoading,
    [key]: true
  }
})

// function sets isLoading to false and isSuccess to true
export const isSuccess = (state, key, data) => ({
  ...state,
  isLoading: {
    [key]: false
  },
  isSuccess: {
    [key]: true
  },
  ...data
})

