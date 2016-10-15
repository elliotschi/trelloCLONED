import * as actions from 'constants/actionTypes'
import { push } from 'react-router-redux'

export const fetchBoards = () => ({
  type: actions.BOARDS_FETCH_BOARDS,
  url: '/api/v1/boards'
})

export const fetchBoardsSuccess = ({ owned_boards }) => ({
  type: actions.BOARDS_FETCH_BOARDS_SUCCESS,
  ownedBoards: owned_boards
})

export const fetchBoardsError = () => ({
  type: actions.BOARDS_FETCH_BOARDS_ERROR
})

export const createBoard = (board) => ({
  type: actions.BOARDS_CREATE_BOARD,
  data: { board },
  url: '/api/v1/boards'
})

export const createBoardSuccess = ({ board }) => ({
  type: actions.BOARDS_CREATE_BOARD_SUCCESS,
  board
})

export const redirectToBoard = ({ board: { id }}) => (
  push(`/boards/${id}`)
)

export const createBoardError = ({ errors }) => ({
  type: actions.BOARDS_CREATE_BOARD_ERROR,
  errors
})

export const showForm = (show) => ({
  type: actions.BOARDS_SHOW_FORM,
  show
})

