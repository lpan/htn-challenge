import React, { PropTypes } from 'react';
import { cond, equals, always } from 'ramda';

import Accepted from 'react-icons/lib/fa/check';
import Rejected from 'react-icons/lib/fa/times-circle';
import Review from 'react-icons/lib/fa/clock-o';

import { STATUS } from '../../../constants/users';

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
      <Icon />
      <span className={styles.text}>
        {STATUS[status]}
      </span>
    </div>
  );
};

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusIcon;
