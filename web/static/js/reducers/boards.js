import * as actions from 'constants/actionTypes'
import { isLoading, isSuccess } from 'utils/api'

const initialState = {
  isLoading: {
    fetchBoards: true,
    createBoard: null
  },
  ownedBoards: [],
  showForm: false,
  formErrors: {
    name: false
  },
  errors: {
    fetchBoards: false,
    createBoards: false
  },
  isSuccess: {
    fetchBoards: null,
    createBoards: null
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.BOARDS_FETCH_BOARDS:
      return isLoading(state, 'fetchBoards')

    case actions.BOARDS_FETCH_BOARDS_SUCCESS:
      return isSuccess(state, 'fetchBoards', {
        ownedBoards: action.ownedBoards
      })

    case actions.BOARDS_FETCH_BOARDS_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          fetchBoards: false
        },
        errors: {
          ...state.errors,
          fetchBoards: true
        }
      }

    case actions.BOARDS_SHOW_FORM:
      return {
        ...state,
        showForm: true
      }

    case actions.BOARDS_CREATE_BOARD:
      return isLoading(state, 'createBoard')

    case actions.BOARDS_CREATE_BOARD_SUCCESS:
      return isSuccess(state, 'createBoard', {
        ownedBoards: [action.board, ...ownedBoards]
      })

    case actions.BOARDS_CREATE_BOARD_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          createBoard: false
        },
        formErrors: action.errors,
        errors: {
          ...state.errors,
          createBoards: true
        }
      }

    default:
      return initialState
  }
}