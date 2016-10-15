import * as actionTypes from 'constants/actionTypes'
import * as sessionsActions from 'actions/sessions'
import { push } from 'react-router-redux'
import { apiEpic } from 'utils/api'
import { bindCallback } from 'rxjs/observable/bindCallback'
import { Socket } from 'phoenix'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

const signIn = apiEpic({
  initAction: actionTypes.SESSIONS_SIGNIN,
  method: 'POST',
  success: [
    sessionsActions.signInSuccess,
    sessionsActions.setCurrentUser,
    push('/')
  ],
  error: [
    sessionsActions.signInError
  ]
})

const signOut = apiEpic({
  initAction: actionTypes.SESSIONS_SIGNOUT,
  method: 'DELETE',
  success: [
    sessionsActions.signOutSuccess,
    push('/')
  ],
  error: [
    sessionsActions.signOutError
  ],
  auth: true
})

const getCurrentUser = apiEpic({
  initAction: actionTypes.SESSIONS_GET_CURRENT_USER,
  method: 'GET',
  success: [
    sessionsActions.getCurrentUserSuccess,
    sessionsActions.setCurrentUser
  ],
  error: [
    sessionsActions.getCurrentUserError,
    push('/sign_in')
  ],
  auth: true
})

const connectWebSocket = action$ => {
  let socket, channel
  return action$.ofType(actionTypes.CURRENT_USER)
    .map(({ currentUser }) => {
      const user = currentUser
      socket = new Socket('/socket', {
        params: {
          token: localStorage.getItem('authToken')
        }
      })

      socket.connect()

      channel = socket.channel(`users:${user.id}`)
      const boundFn = bindCallback(channel.join().receive.bind(channel))

      return boundFn('ok')
    })
    .map(() => sessionsActions.socketConnected(socket, channel))
    .catch(console.error)
}

export default [signIn, signOut, getCurrentUser, connectWebSocket]