import { isEmpty } from 'ramda';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { usersPropType } from '../customPropTypes';
import { usersSelector } from '../../reducers/users';
import { FETCH_USERS, SET_CURRENT_USER } from '../../constants/users';

import Header from '../shared/Header';
import User from './User';
import FilterBar from './FilterBar';

import styles from './styles.css';

class Applicants extends Component {
  componentDidMount() {
    const { dispatch, users } = this.props;

    if (isEmpty(users)) {
      dispatch({ type: FETCH_USERS, payload: {} });
    }
  }

  renderUsers() {
    const { users, dispatch } = this.props;
    const onClick = (user) => () => {
      if (user) {
        dispatch({ type: SET_CURRENT_USER, payload: user.id });
      }
    };

    return users.map((user) => <User key={user.id} user={user} onClick={onClick(user)} />);
  }

  render() {
    return (
      <div>
        <Header title="Applicants" />
        <FilterBar />
        <table className={styles.table}>
          <tbody>
            <tr className={styles.row}>
              <th>Name</th>
              <th>Company</th>
              <th>Email address</th>
              <th>Status</th>
            </tr>
            {this.renderUsers()}
          </tbody>
        </table>
      </div>
    );
  }
}

Applicants.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: usersPropType.isRequired,
};

const mapStateToProps = createSelector(
  usersSelector,
  (users) => ({ users }),
);

export default connect(mapStateToProps)(Applicants);
