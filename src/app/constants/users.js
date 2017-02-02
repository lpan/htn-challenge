import { map, keys, compose, toString } from 'ramda';

const makeOptions = dict => compose(
  map(key => ({ value: key, label: dict[key] })),
  keys,
)(dict);

export const FETCH_USERS = 'FETCH_USERS';

export const UPDATE_FILTERS = 'UPDATE_FLITERS';

export const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';

export const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

export const DEFAULTS = {
  // default number of items per page
  NUM_ITEMS: 50,
  // initial page,
  INIT_PAGE: 0,
};

export const STATUS = {
  rejected: 'Rejected',
  accepted: 'Accepted',
  in_review: 'In Review',
};

export const STATUS_OPTIONS = makeOptions(STATUS);

const NUM_ITEMS = [50, 100, 150, 200];

export const NUM_ITEMS_OPTIONS = map(n => ({ value: n, label: toString(n) }), NUM_ITEMS);
