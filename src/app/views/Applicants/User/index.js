import React, { PropTypes } from 'react';

import StatusIcon from '../../shared/StatusIcon';

import { userPropType } from '../../customPropTypes';
import styles from './styles.css';

const User = ({ user, onClick }) => (
  <tr className={styles.row} onClick={onClick}>
    <td>
      {user.name}
    </td>
    <td>{user.company}</td>
    <td>{user.email}</td>
    <td>
      <StatusIcon status={user.status} />
    </td>
  </tr>
);

User.propTypes = {
  user: userPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default User;
