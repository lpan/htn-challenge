import { assoc, uniq, flatten, map, compose, path, toLower } from 'ramda';
import { FETCH_USERS_SUCCEEDED } from '../constants/user';

export const skillOptionsSelector = compose(
  map(opt => ({ value: toLower(opt), label: opt })),
  uniq,
  map(({ skill }) => skill),
  flatten,
  map(user => user.skills),
  path(['users', 'details']),
);

const usersReducer = (state = { details: [] }, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCEEDED: {
      return assoc('details', action.payload, state);
    }

    default: {
      return state;
    }
  }
};

export default usersReducer;
