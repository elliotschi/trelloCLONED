import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

class Authenticated extends React.Component {
  componentDidMount() {
    const { dispatch, currentUser } = this.props

    if (localStorage.getItem('authToken')) {
      dispatch(Actions.currentUser())
    } else {
      dispatch(routeActions.push('/sign_up'))
    }
  }

  render() {
    return (
      <div>Authenticated Container</div>
    )
  }
}

const mapStateToProps = ({ session: { currentUser }}) => ({
  currentUser
})

export default connect(mapStateToProps)(Authenticated)