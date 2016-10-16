import React from 'react'
import { connect } from 'react-redux'

import * as actions from 'actions/current_board'
import { docTitle } from 'utils'
import BoardMembers from 'components/BoardMembers'

class BoardsShow extends React.Component {
  componentDidMount() {
    const {
      socket,
      params: { id },
      dispatch
    } = this.props

    if (!socket) return false

    dispatch(actions.getCurrentBoard(socket, id))
  }

  componentWillUnmount() {
    const { dispatch, currentBoard: { channel } } = this.props
    dispatch(actions.leaveChannel(channel))
  }

  renderMembers = () => {  //eslint-disable-line
    const {
      currentBoard: {
        connectedUsers, showUsersForm,
        channel, error, members
      },
      dispatch
    } = this.props

    const currentUserIsOwner = this.props.currentBoard.user.id === this.props.currentUser.id

    return (
      <BoardMembers
        dispatch={dispatch}
        channel={channel}
        currentUserIsOwner={currentUserIsOwner}
        members={members}
        connectedUsers={connectedUsers}
        error={error}
        show={showUsersForm}
      />
    )
  }

  render() {
    const { isLoading, name } = this.props.currentBoard

    if (isLoading) {
      return (
        <div className="view-container boards show">
          <i className="fa fa-spinner fa-spin" />
        </div>
      )
    }

    return (
      <div className="view-container boards show">
        <header className="view-header">
          <h3>
            {name}
          </h3>
          {this.renderMembers()}
        </header>
        <div className="canvas-wrapper">
          <div className="canvas">
            <div className="lists-wrapper">
              {this.renderAddNewList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentBoard, session: { socket, currentUser } }) => ({
  currentBoard,
  socket,
  currentUser
})

export default connect(mapStateToProps)(BoardsShow)
