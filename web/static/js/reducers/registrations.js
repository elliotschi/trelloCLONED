import * as actions from 'constants/actionTypes'

const initialState = {
  errors: {
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    password_confirmation: false
  },
  isLoading: {
    signUp: false
  },
  isSuccess: {
    signUp: null
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.REGISTRATIONS_SIGNUP:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          signUp: true
        }
      }

    case actions.REGISTRATIONS_SIGNUP_SUCCESS: {
      localStorage.setItem('authToken', action.jwt)
      return {
        ...state,
        isSuccess: {
          ...state.isSuccess,
          signUp: true
        },
        isLoading: {
          ...state.isLoading,
          signUp: false
        }
      }
    }

    case actions.REGISTRATIONS_SIGNUP_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          signUp: false
        },
        errors: {
          ...state.errors,
          ...action.errors
        }
      }

    case actions.REGISTRATIONS_SET_ERROR:
      return {
        errors: {
          ...state.errors,
          [action.key]: action.error
        }
      }

    default:
      return state
  }
}