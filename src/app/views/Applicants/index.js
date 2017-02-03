import { isEmpty } from 'ramda';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { usersPropType } from '../customPropTypes';
import { usersSelector } from '../../reducers/users';
import { FETCH_USERS } from '../../constants/users';

import Header from '../shared/Header';
import User from './User';
import FilterBar from './FilterBar';

import styles from './styles.css';
import userStyles from './User/styles.css';

class Applicants extends Component {
  componentDidMount() {
    const { dispatch, users } = this.props;

    if (isEmpty(users)) {
      dispatch({ type: FETCH_USERS, payload: {} });
    }
  }

  renderUsers() {
    const { users } = this.props;
    return users.map((user) => <User key={user.id} user={user} />);
  }

  render() {
    return (
      <div>
        <Header title="Applicants" />
        <FilterBar />
        <table className={styles.table}>
          <tbody>
            <tr className={userStyles.row}>
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
