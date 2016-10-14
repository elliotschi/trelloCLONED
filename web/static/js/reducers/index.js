import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import registrations from './registrations'
import session from './session'

export default combineReducers({
  routing: routerReducer,
  session,
  registrations
})
