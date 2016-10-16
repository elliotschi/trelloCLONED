import React, { PropTypes } from 'react'
import PageClick from 'react-page-click'
import * as boardActions from 'actions/boards'
import Input from 'components/Input'

class BoardForm extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      name: ''
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    errors: PropTypes.object
  }

  componentDidMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.dispatch(boardActions.createBoard(this.state))
  }

  handleCancelClick = (e) => {
    e.preventDefault()

    this.props.onCancelClick()
  }

  render() {
    const { formErrors } = this.props
    const { name } = this.state

    return (
      <PageClick onClick={this.handleCancelClick}>
        <div className="board form">
          <div className="inner">
            <h4>New Board</h4>
            <form
              id="new_board_form"
              onSubmit={this.handleSubmit}
            >
              <Input
                initialValue={name}
                onBlur={(name) => this.setState({ name })}
                error={formErrors.name}
                inputProps={{
                  required: true,
                  type: 'text',
                  placeholder: 'Board name',
                  id: 'board_name'
                }}
              />
              <button type="submit">Create Board</button>
               or 
              <a href="#" onClick={this.handleCancelClick}>
                cancel
              </a>
            </form>
          </div>
        </div>
      </PageClick>
    )
  }
}