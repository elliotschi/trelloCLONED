import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Input from 'components/Input'
import { signIn, setError } from 'actions/sessions'

class SessionsNew extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      password: ''
    }
  }

  baseInputProps = {
    required: true
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { signIn } = this.props

    signIn(this.state)
  }

  handleBlur = field => value => {
    this.setState({ [field]: value })
  }

  handleError = field => () => {
    setError(field, true)
  }

  errorFlash = () => {
    // const { email, password } = this.state
    const { error } = this.props

    if (error) {
      return (
        <div className="error">
          {error}
        </div>
      )
    }
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="view-container sessions new">
        <main>
          <header>
            <div className="logo" />
          </header>
          <form onSubmit={this.handleSubmit}>
            {this.errorFlash()}
            <div className="field">
              <Input
                initialValue={email}
                onBlur={this.handleBlur('email')}
                onError={this.handleError('email')}
                inputProps={{...this.baseInputProps, placeholder: 'email', type: 'email'}}
              />
            </div>
            <div className="field">
              <Input
                initialValue={password}
                onBlur={this.handleBlur('password')}
                onError={this.handleError('password')}
                inputProps={{...this.baseInputProps, placeholder: 'password', type: 'password'}}
              />
            </div>
            <button type="submit">Sign n</button>
          </form>
          <Link to="/sign_up">Sign up</Link>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => state.session

export default connect(mapStateToProps, { signIn, setError })(SessionsNew)