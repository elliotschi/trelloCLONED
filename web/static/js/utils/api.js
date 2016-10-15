import { ajax } from 'rxjs/observable/dom/ajax'
import { of as obsOf } from 'rxjs/observable/of'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

const baseHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

const mapActions = (actions, resp) => actions.map(
  f => (typeof f === 'function') ? f(resp) : f
)

/*
@params:
initAction => action constant for the first action
method => http method
auth => bool indicating whether to add the jwt to the headers
success => array of success action creator
error => array of error action creator
*/
export const apiEpic = ({ initAction, method, auth, success, error }) => action$ => (
  action$.ofType(initAction)
    .switchMap(({ url, data }) => ajax({
      url,
      method,
      body: data,
      headers: auth ? {...baseHeaders, Authorization: localStorage.getItem('authToken')} : baseHeaders
    }))
    .mergeMap(({ response }) => obsOf(
      // create mutliple observables to dispatch as many actions as possible
      ...mapActions(success, response)
    ))
    .catch(({ response }) => obsOf(
      ...mapActions(error, response)
    ))
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

