import * as actions from 'actions/actionTypes'

const initialState = {
  currentUser: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      }

    default:
      return state
  }
}