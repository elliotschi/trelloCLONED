import * as actionTypes from 'constants/actionTypes'
import * as currentBoardActions from 'actions/current_board'
import { bindCallback } from 'rxjs/observable/bindCallback'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { of as obsOf } from 'rxjs/observable/of'

const getCurrentBoard = action$ => (
  action$.ofType(actionTypes.CURRENT_BOARD_GET)
    .map(({ socket, boardId }) => {
      const channel = socket.channel(`boards:${boardId}`)

      const boundFn = bindCallback(channel.join().receive)
      return boundFn('ok')
    })
    .map((response) => obsOf(
      currentBoardActions.getCurrentBoardSuccess(response),
      currentBoardActions.connectedToChannel(response)
    ))
    .catch(() => currentBoardActions.getCurrentBoardError)
)

export default [getCurrentBoard]
