import * as actions from 'constants/actionTypes'

const initialState = {
  channel: null,
  isLoading: true,
  error: false,
  connectedUsers: [],
  showForm: false,
  showUsersForm: false,
  editingListId: null,
  addingNewCardInListId: null
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

    case actions.CURRENT_BOARD_SHOW_MEMBERS_FORM:
      return {
        ...state,
        showUsersForm: action.show,
        error: false
      }

    case actions.CURRENT_BOARD_ADD_NEW_MEMBER_ERROR:
      return {
        ...state,
        error: action.error
      }

    case actions.CURRENT_BOARD_NEW_MEMBER_ADDED:
      return {
        ...state,
        members: [...members, action.user],
        showUsersForm: false
      }

    default:
      return state
  }
}
