import React, { PropTypes } from 'react'
import User from 'components/User'
import Input from 'components/Input'
import cx from 'classnames'
import PageClick from 'react-page-click'
import * as actions from 'actions/current_board'

class BoardMembers extends React.Component {
  renderUsers = () => this.props.members.map(({ email, id}) => {
    const connected = this.props.connectedUsers.filter(user => user === id).length > 0

    const classes = cx({
      connected
    })

    return <User classes={classes} email={email} />
  })

  renderAddNewUser = () => {
    if (!this.props.currentUserIsOwner) return false

    return (
      <li>
        <a
          onClick={this.handleAddNewClick}
          className="add-new"
          href="#"
        >
          <i className="fa fa-plus" />
          {this.renderForm()}
        </a>
      </li>
    )
  }

  renderForm = () => {
    if (!this.props.show) return false

    return (
      <PageClick onClick={this.handleCancelClick}>
        <ul className="drop-down active">
          <li>
            <form onSubmit={this.handleSubmit}>
              <h4>Add new members</h4>
              {this.renderError()}
              <Input />
              <button type="submit">
                Add member
              </button> or 
              <a
                onClick={this.handleCancelClick}
                href="#"
              >
                cancel
              </a>
            </form>
          </li>
        </ul>
      </PageClick>
    )
  }
}

export default BoardMembers
