import { combineEpics } from 'redux-observable'
import registrations from './registrations'

export default combineEpics(
  ...registrations
)