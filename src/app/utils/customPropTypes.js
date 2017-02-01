import { PropTypes } from 'react';

export const userPropType = PropTypes.arrayOf(
  PropTypes.shape({
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
  }),
);
