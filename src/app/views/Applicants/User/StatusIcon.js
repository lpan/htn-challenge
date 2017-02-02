import React, { PropTypes } from 'react';
import { cond, equals, always } from 'ramda';

import Accepted from 'react-icons/lib/fa/check';
import Rejected from 'react-icons/lib/fa/times-circle';
import Review from 'react-icons/lib/fa/clock-o';

import { mapValue, status as statusOptions } from '../FilterBar/options';

import styles from './styles.css';

const getIcon = cond([
  [equals('accepted'), always(Accepted)],
  [equals('rejected'), always(Rejected)],
  [equals('in_review'), always(Review)],
]);

const StatusIcon = ({ status }) => {
  const Icon = getIcon(status);
  return (
    <div>
      <span className={styles.text}>
        {mapValue(statusOptions)[status]}
      </span>
      <Icon />
    </div>
  );
};

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusIcon;
