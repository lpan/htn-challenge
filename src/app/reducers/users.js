import { assoc } from 'ramda';

const initialState = {
  details: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_SUCCEEDED': {
      return assoc('details', action.payload, state);
    }

    default: {
      return state;
    }
  }
};

export default usersReducer;
