import {
  assoc, uniq, flatten, map, compose, path, slice, merge, filter, contains,
  isNil,
} from 'ramda';
import { createSelector } from 'reselect';
import { FETCH_USERS_SUCCEEDED, UPDATE_FILTERS, DEFAULTS } from '../constants/users';

export const skillOptionsSelector = compose(
  map(opt => ({ value: opt, label: opt })),
  uniq,
  map(({ skill }) => skill),
  flatten,
  map(user => user.skills),
  path(['users', 'details']),
);

const allUserSelector = path(['users', 'details']);

const rangeSelector = compose(
  ({ numItems, currentPage }) => [currentPage * numItems, (currentPage + 1) * numItems],
  path(['users', 'filters']),
);

// filter base on page
const userRangeSelector = createSelector(
  allUserSelector,
  rangeSelector,
  (users, [first, last]) => slice(first, last, users),
);

const hasSkill = ({ skill }, userSkills) =>
  isNil(skill) || contains(skill, map(skills => skills.skill, userSkills));

const hasStatus = ({ status }, userStatus) =>
  isNil(status) || status === userStatus;

const filterUsers = (filters) => filter(user => {
  const { skills, status } = user;

  return hasSkill(filters, skills) && hasStatus(filters, status);
});

export const filtersSelector = path(['users', 'filters']);

export const usersSelector = createSelector(
  filtersSelector,
  userRangeSelector,
  (filters, users) => filterUsers(filters)(users),
);

const initialState = {
  // all users fetched from API
  details: [],
  // persistant filter criteria
  filters: {
    numItems: DEFAULTS.NUM_ITEMS,
    currentPage: DEFAULTS.INIT_PAGE,
    skill: null,
    status: null,
  },
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCEEDED: {
      return assoc('details', action.payload, state);
    }

    case UPDATE_FILTERS: {
      return assoc('filters', merge(state.filters, action.payload), state);
    }

    default: {
      return state;
    }
  }
};

export default usersReducer;
