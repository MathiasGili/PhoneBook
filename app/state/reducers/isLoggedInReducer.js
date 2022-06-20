import { SET_IS_LOGGED_IN_TRUE, SET_IS_LOGGED_IN_FALSE } from './../actions/actionsType'

const initialState = false;

const isLoggedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN_TRUE:
      return true;
    case SET_IS_LOGGED_IN_FALSE:
      return false;
    default:
      return state;
  }
};

export default isLoggedInReducer;
