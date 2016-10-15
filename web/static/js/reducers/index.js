import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import registrations from './registrations'
import session from './session'
import boards from './boards'

export default combineReducers({
  routing: routerReducer,
  session,
  registrations,
  boards
})
