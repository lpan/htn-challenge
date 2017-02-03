import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import StatusIcon from '../../shared/StatusIcon';

import { SET_CURRENT_USER } from '../../../constants/users';
import { userPropType } from '../../customPropTypes';
import styles from './styles.css';

const onClick = (dispatch, user) => () => {
  if (user) {
    dispatch({ type: SET_CURRENT_USER, payload: user.id });
    dispatch(push('/details'));
  }
};

const User = ({ user, dispatch }) => (
  <tr className={styles.row} onClick={onClick(dispatch, user)}>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(User);
