import React from 'react'
import User from './User'
import cx from 'classnames'

class BoardUsers extends React.Component {
  renderUsers = () => this.props.users.map(({ id, email }) => {
    const connected = this.props.connectedUsers.filter((cu => cu.id === id)).length > 0

    const classes = cx({ connected })

    return <User key={id} classes={classes} email={email} />
  })
}

export default BoardUsers