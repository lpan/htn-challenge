import {
  assoc, uniq, flatten, map, compose, path, slice, merge, filter, contains,
  isNil, reduce, values, assocPath,
} from 'ramda';
import { createSelector } from 'reselect';
import uuid from 'uuid';
import {
  FETCH_USERS_SUCCEEDED, UPDATE_FILTERS, SET_CURRENT_USER, DEFAULTS,
  CHANGE_USER_STATUS,
} from '../constants/users';

const allUsersSelector = compose(
  values,
  path(['users', 'details']),
);

export const skillOptionsSelector = compose(
  map(opt => ({ value: opt, label: opt })),
  uniq,
  map(({ skill }) => skill),
  flatten,
  map(user => user.skills),
  allUsersSelector,
);

const rangeSelector = compose(
  ({ numItems, currentPage }) => [currentPage * numItems, (currentPage + 1) * numItems],
  path(['users', 'filters']),
);

// filter base on page
const userRangeSelector = createSelector(
  allUsersSelector,
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

export const currentUserSelector = createSelector(
  path(['users', 'details']),
  path(['users', 'current']),
  (users, id) => users[id],
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
  current: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCEEDED: {
      return assoc('details', toMap(action.payload), state);
    }

    case UPDATE_FILTERS: {
      return assoc('filters', merge(state.filters, action.payload), state);
    }

    case SET_CURRENT_USER: {
      return assoc('current', action.payload, state);
    }

    case CHANGE_USER_STATUS: {
      const { id, status } = action.payload;
      return assocPath(['details', id, 'status'], status, state);
    }

    default: {
      return state;
    }
  }
};

export default usersReducer;
