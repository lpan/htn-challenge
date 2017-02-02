import { assoc, uniq, flatten, map, compose, path, slice } from 'ramda';
import { createSelector } from 'reselect';
import { FETCH_USERS_SUCCEEDED, DEFAULTS } from '../constants/users';

export const skillOptionsSelector = compose(
  map(opt => ({ value: opt, label: opt })),
  uniq,
  map(({ skill }) => skill),
  flatten,
  map(user => user.skills),
  path(['users', 'details']),
);

const allUserSelector = path(['users', 'details']);

const userRangeSelector = compose(
  ({ numItems, currentPage }) => [currentPage * numItems, (currentPage + 1) * numItems],
  path(['users', 'filters']),
);

export const usersSelector = createSelector(
  allUserSelector,
  userRangeSelector,
  (users, [first, last]) => slice(first, last, users),
);

export const filtersSelector = path(['users', 'filters']);

const initialState = {
  // all users fetched from API
  details: [],
  // persistant filter criteria
  filters: {
    numItems: DEFAULTS.NUM_ITEMS,
    currentPage: DEFAULTS.INIT_PAGE,
    skill: '',
    status: '',
  },
};

const usersReducer = (state = initialState, action) => {
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
