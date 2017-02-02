import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { usersPropType, optionsPropType } from './utils';
import { skillOptionsSelector } from '../../reducers/users';
import { FETCH_USERS } from '../../constants/user';
import User from './User';
import FilterBar from './FilterBar';

import styles from './styles.css';
import userStyles from './User/styles.css';

class Applicants extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: FETCH_USERS, payload: {} });
  }

  renderUsers() {
    const { users } = this.props;
    return users.map((user) => <User key={user.email} user={user} />);
  }

  render() {
    const { skills } = this.props;

    return (
      <div>
        <h1 className={styles.header}>Applicants</h1>
        <hr className={styles.divider} />
        <FilterBar skills={skills} />
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

Applicants.defaultProps = {
  users: [],
  skills: [],
};

Applicants.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: usersPropType,
  skills: optionsPropType,
};

const mapStateToProps = createSelector(
  skillOptionsSelector,
  state => state.users.details,
  (skills, users) => ({ skills, users }),
);

export default connect(mapStateToProps)(Applicants);
