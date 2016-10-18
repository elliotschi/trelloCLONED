import React from 'react'
import { connect } from 'react-redux'
// import { routeActions } from 'redux-simple-router'
import { browserHistory } from 'react-router'
import { getCurrentUser } from 'actions/sessions'
import Header from 'layouts/Header'

class Authenticated extends React.Component {
  componentDidMount() {
    const { getCurrentUser, routePush, currentUser } = this.props
    const authToken = localStorage.getItem('authToken')

    if (authToken && !currentUser) {
      // set current user manually
      getCurrentUser()
    } else if (!authToken) {
      browserHistory.push('/sign_in')
    }
  }

  render() {
    const { currentUser } = this.props

    if (!currentUser) return null

    return (
      <div className="application-container">
        <Header
          currentUser={currentUser}
        />

        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ session: { currentUser } }) => ({
  currentUser
})

export default connect(mapStateToProps, { getCurrentUser })(Authenticated)
