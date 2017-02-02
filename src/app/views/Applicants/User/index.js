import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Icon from 'react-icons/lib/fa/info-circle';
import StatusIcon from './StatusIcon';

import { SET_CURRENT_USER } from '../../../constants/user';
import { userPropType } from '../utils';
import styles from './styles.css';

const onClick = (dispatch, user) => () => {
  if (user) {
    dispatch(push('/details'));
    dispatch({ type: SET_CURRENT_USER, payload: user });
  }
};

const User = ({ user, dispatch }) => (
  <tr className={styles.row}>
    <td>
      <Icon
        onClick={onClick(dispatch, user)}
        className={styles.icon}
      />
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(User);
