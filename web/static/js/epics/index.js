import { combineEpics } from 'redux-observable'
import registrations from './registrations'
import sessions from './sessions'
import boards from './boards'

export default combineEpics(
  ...registrations,
  ...sessions,
  ...boards
)