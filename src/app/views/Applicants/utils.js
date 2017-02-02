import { PropTypes } from 'react';

export const optionPropType = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.string,
});

export const optionsPropType = PropTypes.arrayOf(optionPropType);

export const userPropType = PropTypes.shape({
  company: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  name: PropTypes.string,
  phone: PropTypes.string,
  picture: PropTypes.string,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      skill: PropTypes.string,
      rating: PropTypes.number,
    }),
  ),
  status: PropTypes.string,
});

export const usersPropType = PropTypes.arrayOf(userPropType);
