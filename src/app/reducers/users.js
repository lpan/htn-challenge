import {
  assoc, uniq, flatten, map, compose, path, slice, merge, filter, contains,
  isNil, reduce, values,
} from 'ramda';
import { createSelector } from 'reselect';
import uuid from 'uuid';
import { FETCH_USERS_SUCCEEDED, UPDATE_FILTERS, DEFAULTS } from '../constants/users';

const allUserSelector = compose(
  values,
  path(['users', 'details']),
);

export const skillOptionsSelector = compose(
  map(opt => ({ value: opt, label: opt })),
  uniq,
  map(({ skill }) => skill),
  flatten,
  map(user => user.skills),
  allUserSelector,
);

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

// convert list of users to map of users for faster lookups
const toMap = reduce((accum, current) => {
  const id = uuid();
  return assoc(id, assoc('id', id, current), accum);
}, {});

const initialState = {
  // all users fetched from API
  details: {},
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
      return assoc('details', toMap(action.payload), state);
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
