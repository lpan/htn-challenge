import React, { PropTypes } from 'react';
import { cond, equals, always } from 'ramda';

import Phone from 'react-icons/lib/fa/phone';
import Company from 'react-icons/lib/fa/building-o';
import Email from 'react-icons/lib/fa/envelope-o';
import Status from 'react-icons/lib/fa/info';

import styles from './styles.css';

const getIcon = cond([
  [equals('phone'), always(Phone)],
  [equals('company'), always(Company)],
  [equals('email'), always(Email)],
  [equals('status'), always(Status)],
]);

const Info = ({ type, value }) => {
  const Icon = getIcon(type);

  return (
    <div className={styles.container}>
      <Icon />
      <span className={styles.text}>
        {value}
      </span>
    </div>
  );
};

Info.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Info;
