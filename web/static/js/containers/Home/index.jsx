import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { docTitle } from 'utils'
import * as boardActions from 'actions/boards'
import BoardCard from 'components/BoardCard'
import BoardForm from 'components/BoardForm'

class HomeIndex extends React.Component {
  componentDidMount() {
    docTitle('Boards')

    this.props.dispatch(boardActions.fetchBoards())
  }

  renderOwnedBoards = () => {
    const { isLoading, ownedBoards } = this.props

    let content = false

    const iconClasses = cx({
      fa: true,
      'fa-user': !isLoading.fetchBoards,
      'fa-spinner': isLoading.fetchBoards,
      'fa-spin': isLoading.fetchBoards
    })

    if (!isLoading.fetchBoards) {
      content = (
        <div className="boards-wrapper">
          {this.renderBoards(ownedBoards)}
          {this.renderAddNewBoard()}
        </div>
      )
    }

    return (
      <section>
        <header className="view-header">
          <h3>
            <i className={iconClasses} />
            My Boards
          </h3>
        </header>
        {content}
      </section>
    )
  }

  renderBoards = (boards) => boards.map(
    board => (
      <BoardCard
        key={`board ${board.id}`}
        dispatch={this.props.dispatch}
        {...board}
      />
    )
  )

  renderAddNewBoard = () => {
    const { showForm, dispatch, formErrors } = this.this.props

    if (!showForm) return this.renderAddButton()

    return (
      <BoardForm
        dispatch={dispatch}
        errors={formErrors}
        onCancelClick={this.handleCancelClick}
      />
    )
  }

  renderAddButton = () => {
    <div
      className="board add-new"
      onClick={this.handleAddNewClick}
    >
      <div className="inner">
        <a id="add_new_board">
          Add new board...
        </a>
      </div>
    </div>
  }

  handleAddNewClick = () => {
    this.props.dispatch(boardActions.showForm(true))
  }

  handleCancelClick = () => {
    this.props.dispatch(boardActions.showForm(false))
  }

  render() {
    return (
      <div className="view-container boards index">
        {this.renderOwnedBoards}
      </div>
    )
  }
}

const mapStateToProps = ({ boards }) => boards

export default connect(mapStateToProps)(HomeIndex)