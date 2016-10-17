import * as actionTypes from 'constants/actionTypes'
import * as currentBoardActions from 'actions/current_board'
import { bindCallback } from 'rxjs/observable/bindCallback'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { of as obsOf } from 'rxjs/observable/of'

// @TODO: use publish to account for multiple events
const getCurrentBoard = action$ => (
  action$.ofType(actionTypes.CURRENT_BOARD_GET)
    .map(({ socket, boardId }) => {
      const channel = socket.channel(`boards:${boardId}`)

      const boundFn = bindCallback(channel.join().receive)
      return boundFn('ok')
      // channel.on('members:added', ({ user }) => dispatch user)
      // channel.on('user:joined', ({ user })) => dispatch user
      // channel.on('user:left', ({ users })) => dispatch new users
    })
    .map((response) => obsOf(
      currentBoardActions.getCurrentBoardSuccess(response),
      currentBoardActions.connectedToChannel(response)
    ))
    .catch(() => currentBoardActions.getCurrentBoardError)
)

const addNewMember = action$ => (
  action$.ofType(actionTypes.CURRENT_BOARD_ADD_NEW_MEMBER)
    .map(({ channel, email }) => {
      const boundFn = channel.push('members:add', { email }).receive
      return boundFn('error')
    })
    .map(currentBoardActions.addNewMemberError)
    .do(currentBoardActions.addNewMemberSuccess)
)

export default [getCurrentBoard, addNewMember]
