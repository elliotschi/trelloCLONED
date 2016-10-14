import React from 'react'
import { Link } from 'react-router'
import * as actions from 'actions/sessions'
import ReactGravatar from 'react-gravatar'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  renderCurrentUser = () => {
    const { currentUser: { first_name, last_name, email } } = this.props

    if (!currentUser) return null

    const fullName = [first_name, last_name]

    return (
      <a className="current-user">
        <ReactGravatar email={email} />
        {fullName}
      </a>
    )
  }

  renderSignOutLink = () => {
    if (!this.props.currentUser) return null

    return (
      <a href="#" onClick={handleSignOutClick}>
        <i className="fa fa-sign-out" />
        Sign out
      </a>
    )
  }

  handleSignOutClick = (e) => {
    e.preventDefault()

    this.props.dispatch(actions.signOut())
  }

  render() {
    return (
      <header className="main-header">
        <nav>
          <ul>
            <li>
              <Link to="/">
                <i className="fa fa-columns" />
                Boards
              </Link>
            </li>
          </ul>
        </nav>

        <ul>
          <li>
            {this.renderCurrentUser()}
          </li>
          <li>
            {this.renderSignOutLink()}
          </li>
        </ul>
      </header>
    )
  }
}

export default Header