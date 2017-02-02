import React from 'react';

import StatusIcon from './StatusIcon';

import { userPropType } from '../utils';
import styles from './styles.css';

const User = ({ user }) => (
  <tr className={styles.row}>
    <td>{user.name}</td>
    <td>{user.company}</td>
    <td>{user.email}</td>
    <td>
      <StatusIcon status={user.status} />
    </td>
  </tr>
);

User.propTypes = {
  user: userPropType.isRequired,
};

export default User;
