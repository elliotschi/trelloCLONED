import React, { PropTypes } from 'react'
import ReactGravatar from 'react-gravatar'

const User = ({ classes, email }) => (
  <li className={classes}>
    <ReactGravatar
      https
      className="react-gravatar"
      email={email}
    />
  </li>
)

User.propTypes = {
  classes: PropTypes.object,
  email: PropTypes.string
}

export default User
