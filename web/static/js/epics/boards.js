import * as actionTypes from 'constants/actionTypes'
import * as boardActions from 'actions/boards'
import { apiEpic } from 'utils/api'
import { push } from 'react-router-redux'

const fetchBoards = apiEpic({
  initAction: actionTypes.BOARDS_FETCH_BOARDS,
  method: 'GET',
  success: [
    boardActions.fetchBoardsSuccess
  ],
  error: [
    boardActions.fetchBoardsError
  ],
  auth: true
})

const createBoard = apiEpic({
  initAction: actionTypes.BOARDS_CREATE_BOARD,
  method: 'POST',
  success: [
    boardActions.createBoardSuccess,
    boardActions.redirectToBoard
  ],
  error: [
    boardActions.createBoardError
  ],
  auth: true
})

export default [fetchBoards, createBoard]
