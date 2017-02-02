import { assoc, path } from 'ramda';
import { SET_CURRENT_USER, RESET_CURRENT_USER } from '../constants/user';

const initialState = {
  current: {},
};

export const currentUserSelector = path(['user', 'current']);

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return assoc('current', action.payload, state);
    }

    case RESET_CURRENT_USER: {
      return assoc('current', {}, state);
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
