import React, { PropTypes } from 'react'
import User from 'components/User'
import Input from 'components/Input'
import cx from 'classnames'
import PageClick from 'react-page-click'
import * as actions from 'actions/current_board'

class BoardMembers extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: ''
    }
  }

  renderUsers = () => this.props.members.map(({ email, id }) => {
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
          onClick={this.handleClick(true)}
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

    const { email } = this.state

    return (
      <PageClick onClick={this.handleClick(false)}>
        <ul className="drop-down active">
          <li>
            <form onSubmit={this.handleSubmit}>
              <h4>Add new members</h4>
              {this.renderError()}
              <Input
                initialValue={email}
                onBlur={(email) => this.setState({ email })}
                inputProps={{
                  required: true,
                  type: 'email',
                  placeholder: 'Member email'
                }}
              />
              <button type="submit">
                Add member
              </button> or 
              <a
                onClick={this.handleClick(false)}
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

  renderError = () => {
    const { error } = this.props

    if (!error) return false

    return (
      <div className="error">
        {error} 
      </div>
    )
  }

  handleClick = (show) => (e) => {
    this.props.dispatch(actions.showMembersForm(show))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email } = this.state
    const { dispatch, channel } = this.props

    dispatch(actions.addNewMember(channel, email))
  }

  render() {
    return (
      <ul className="board-users">
        {this.renderUsers()}
        {this.renderAddNewUser}
      </ul>
    )
  }
}

export default BoardMembers
