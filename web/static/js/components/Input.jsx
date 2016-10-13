import React, { PropTypes } from 'react'
import fromEvent from 'rxjs/observable/fromEvent'
import 'rxjs/operator/map'
import 'rxjs/operator/catch'

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.initialValue || '',
      error: props.error || false
    }
  }

  componentWillMount() {
    const { validate, onError, onBlur } = this.props

    this.onBlur$ = fromEvent(this.input, 'blur')
      .map(e => {
        if (e.target.checkValidity()) {
          return e.target.value
        } else {
          throw new Error()
        }
      })
      .map(val => {
        if (validate(val)) {
          return val
        } else {
          throw new Error()
        }
      })
      .catch((err, stream) => {
        this.setState({ err: true })
        onError()
      })
      .subscribe(
        (value) => {
          this.setState({ error: false })
          onBlur(value)
        },
        console.error
      )
  }

  componentWillUnmount() {
    this.onBlur$.unsubscribe()
  }

  componentWillReceiveProps({ error, value }) {
    if (error) {
      this.state({ error })
    }

    if (value) {
      this.setState({ value })
    }
  }

  static propTypes = {
    format: PropTypes.func,
    initialValue: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    validate: PropTypes.func,
    inputProps: PropTypes.obj
  }

  static defaultProps = {
    format: val => val,
    placeholder: '',
    validate: () => true
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { inputProps } = this.props
    return (
      <input
        onChange={this.handleChange}
        ref={node => { this.input = node }}
        {...inputProps}
      />
    )
  }
}

export default Input