import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Input from 'components/Input'
import { signUp, setError } from 'actions/registrations'

class RegistrationsNew extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  baseInputProps = {
    required: true
  }

  componentDidMount() {

  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { signUp } = this.props

    signUp(this.state)
  }

  handleBlur = field => value => {
    this.setState({ [field]: value })
  }

  handleError = field => () => {
    this.props.setError(field, true)
  }

  render() {
    const {
      first_name, last_name,
      email, password,
      password_confirmation
    } = this.state
    const { errors } = this.props

    return (
      <div className="view-container registrations new">
        <main>
          <header>
            <div className="logo" />
          </header>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <Input
                initialValue={first_name}
                onBlur={this.handleBlur('first_name')}
                onError={this.handleError('first_name')}
                inputProps={{...this.baseInputProps, type: 'text', placeholder: 'first name'}}
                error={errors.first_name}
              />
            </div>
            <div className="field">
              <Input
                initialValue={last_name}
                onBlur={this.handleBlur('last_name')}
                onError={this.handleError('last_name')}
                inputProps={{...this.baseInputProps, type: 'text', placeholder: 'last name'}}
                error={errors.last_name}
              />
            </div>
            <div className="field">
              <Input
                initialValue={email}
                onBlur={this.handleBlur('email')}
                onError={this.handleError('email')}
                inputProps={{...this.baseInputProps, type: 'email', placeholder: 'email'}}
                error={errors.email}
              />
            </div>
            <div className="field">
              <Input
                initialValue={password}
                onBlur={this.handleBlur('password')}
                onError={this.handleError('password')}
                inputProps={{...this.baseInputProps, type: 'password', placeholder: 'password'}}
                error={errors.password}
              />
            </div>
            <div className="field">
              <Input
                initialValue={password_confirmation}
                onBlur={this.handleBlur('password_confirmation')}
                onError={this.handleError('password_confirmation')}
                inputProps={{...this.baseInputProps, type: 'password', placeholder: 'confirm your password'}}
                error={errors.password_confirmation}
              />
            </div>
            <button type="submit">Sign up</button>
          </form>
          <Link to="/sign_in">Sign in</Link>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ registrations: { errors }}) => ({
  errors
})

export default connect(mapStateToProps, { signUp, setError })(RegistrationsNew)