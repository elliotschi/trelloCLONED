import { combineEpics } from 'redux-observable'
import registrations from './registrations'
import sessions from './sessions'

export default combineEpics(
  ...registrations,
  ...sessions
)