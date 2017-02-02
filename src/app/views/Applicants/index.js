import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { usersPropType } from './utils';

import User from './User';
import FilterBar from './FilterBar';

class Applicants extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'FETCH_USERS', payload: {} });
  }

  renderUsers() {
    const { users } = this.props;
    return users.map((user) => <User key={user.email} user={user} />);
  }

  render() {
    return (
      <div>
        <FilterBar />
        <div>
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}

Applicants.defaultProps = {
  users: [],
};

Applicants.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: usersPropType,
};

const mapStateToProps = (state) => ({
  users: state.users.details,
});

export default connect(mapStateToProps)(Applicants);
