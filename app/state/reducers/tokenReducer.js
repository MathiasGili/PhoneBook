import { SET_TOKEN, REMOVE_TOKEN } from './../actions/actionsType'

const initialState = '';

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    case REMOVE_TOKEN:
      return '';
    default:
      return state;
  }
};

export default tokenReducer;
