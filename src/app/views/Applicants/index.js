import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { userPropType } from '../../utils/customPropTypes';

const renderUsers = (users) => users.map((user) => <p key={user.email}>{user.name}</p>);

class Applicants extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'FETCH_USERS', payload: {} });
  }

  render() {
    const { users } = this.props;
    return (
      <div>{renderUsers(users)}</div>
    );
  }
}

Applicants.defaultProps = {
  users: [],
};

Applicants.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: userPropType,
};

const mapStateToProps = (state) => ({
  users: state.users.details,
});

export default connect(mapStateToProps)(Applicants);
