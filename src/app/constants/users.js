import { map, keys, compose } from 'ramda';

const makeOptions = dict => compose(
  map(key => ({ value: key, label: dict[key] })),
  keys,
)(dict);

export const FETCH_USERS = 'FETCH_USERS';

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
