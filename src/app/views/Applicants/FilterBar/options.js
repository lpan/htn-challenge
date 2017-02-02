import { map, mergeAll, compose } from 'ramda';

export const status = [
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'in_review', label: 'In review' },
];

export const mapValue = compose(
  mergeAll,
  map(({ value, label }) => ({ [value]: label })),
);
