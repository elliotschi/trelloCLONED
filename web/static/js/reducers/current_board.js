import * as actions from 'constants/actionTypes'

const initialState = {
  channel: null,
  isLoading: true,
  error: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.CURRENT_BOARD_GET:
      return {
        ...state,
        isLoading: true
      }

    case actions.CURRENT_BOARD_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.board
      }

    case actions.CURRENT_BOARD_GET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      }

    case actions.CURRENT_BOARD_CONNECTED_TO_CHANNEL:
      return {
        ...state,
        channel: action.channel
      }

    default:
      return state
  }
}
