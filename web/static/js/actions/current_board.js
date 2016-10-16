import * as actions from 'constants/actionTypes'

export const getCurrentBoard = (socket, boardId) => ({
  type: actions.CURRENT_BOARD_GET,
  socket,
  boardId
})

export const getCurrentBoardSuccess = ({ board }) => ({
  type: actions.CURRENT_BOARD_GET_SUCCESS,
  board
})

export const getCurrentBoardError = ({ error }) => ({
  type: actions.CURRENT_BOARD_GET_ERROR,
  error
})

export const connectedToChannel = ({ channel }) => ({
  type: actions.CURRENT_BOARD_CONNECTED_TO_CHANNEL,
  channel
})

export const showMembersForm = show => ({
  type: actions.CURRENT_BOARD_SHOW_MEMBERS_FORM,
  show
})

export const addNewMember = (channel, email) => ({
  type: actions.CURRENT_BOARD_ADD_NEW_MEMBER,
  channel,
  email
})

export const addNewMemberSuccess = () => ({
  type: actions.CURRENT_BOARD_ADD_NEW_MEMBER_SUCCESS
})

export const addNewMemberError = ({ error }) => ({
  type: actions.CURRENT_BOARD_ADD_NEW_MEMBER_ERROR,
  error
})
