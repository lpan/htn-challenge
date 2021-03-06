import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import { isNil, map } from 'ramda';

import { BarChart } from 'react-d3';

import { userPropType } from '../customPropTypes';
import { currentUserSelector } from '../../reducers/users';
import { CHANGE_USER_STATUS, ACCEPTED, REJECTED } from '../../constants/users';

import styles from './styles.css';

import Header from '../shared/Header';
import Info from './Info';
import Button from '../shared/Button';
import StatusIcon from '../shared/StatusIcon';

const changeStatus = (id, status) => ({
  type: CHANGE_USER_STATUS,
  payload: { id, status },
});

// transform skill to treemap data
const toData = (skills) => ([{
  name: 'Skills',
  values: map(({ skill, rating }) => ({ x: skill, y: rating }), skills),
}]);

class Details extends Component {
  componentWillMount() {
    const { user, dispatch } = this.props;
    if (isNil(user)) {
      dispatch(push('/applicants'));
    }
  }

  renderButtons() {
    const { user, dispatch } = this.props;

    const accept = () => { dispatch(changeStatus(user.id, ACCEPTED)); };
    const reject = () => { dispatch(changeStatus(user.id, REJECTED)); };

    return (
      <div className={styles.buttons}>
        <Button
          onClick={accept}
          label="Accept"
          type="primary"
        />
        <Button
          onClick={reject}
          label="Reject"
          type="warning"
        />
      </div>
    );
  }

  renderInfo() {
    const { company, phone, email, status } = this.props.user;
    return (
      <ul className={styles.info}>
        <Info type="company" value={company} />
        <Info type="phone" value={phone} />
        <Info type="email" value={email} />
        <StatusIcon status={status} />
      </ul>
    );
  }

  renderSkills() {
    const { skills } = this.props.user;
    return (
      <BarChart
        data={toData(skills)}
        width={400}
        height={250}
        fill="#3182bd"
      />
    );
  }

  render() {
    const { user } = this.props;

    // react-router push is async
    if (isNil(user)) {
      return (<div />);
    }

    return (
      <div className={styles.wrapper}>
        <Header title={user.name} />

        <div className={styles.container}>

          <div>
            <img src={user.picture} alt="" className={styles.picture} />
          </div>

          <div>
            {this.renderInfo()}
          </div>

          <div className={styles.skills}>
            <h3>Skills</h3>
            {this.renderSkills()}
          </div>

        </div>

        {this.renderButtons()}
      </div>
    );
  }
}

Details.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: userPropType.isRequired,
};

const mapStateToProps = createSelector(
  currentUserSelector,
  user => ({ user }),
);

export default connect(mapStateToProps)(Details);
