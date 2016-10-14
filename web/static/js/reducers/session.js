import * as actions from 'constants/actionTypes'
import { isLoading, isSuccess } from 'utils/api'
import { browserHistory } from 'react-router'

const initialState = {
  currentUser: null,
  error: null,
  isLoading: {
    signIn: false,
    signOut: false
  },
  isSuccess: {
    signIn: false
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        error: null
      }

    case actions.SESSIONS_SIGNIN:
      return isLoading(state, 'signIn')

    case actions.SESSIONS_SIGNIN_SUCCESS: {
      localStorage.setItem('authToken', action.jwt)

      return isSuccess(state, 'signIn')
    }

    case actions.SESSIONS_SIGNIN_ERROR:
      return {
        ...state,
        error: action.error
      }

    case actions.SESSIONS_SIGNOUT:
      return isLoading(state, 'signOut')

    case actions.SESSIONS_SIGNOUT_SUCCESS:
      localStorage.removeItem('authToken')
      return initialState

    case actions.SESSIONS_SIGNOUT_ERROR:
      return {
        ...state,
        error: 'sign out error'
      }

    default:
      return state
  }
}
