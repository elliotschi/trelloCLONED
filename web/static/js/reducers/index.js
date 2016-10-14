import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import registrations from './registrations'

const session = () => ({currentUser: null, socket: null, error: null})

export default combineReducers({
  routing: routerReducer,
  session,
  registrations
})
