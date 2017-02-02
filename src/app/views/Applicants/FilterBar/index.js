import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { skillOptionsSelector, filtersSelector } from '../../../reducers/users';
import { STATUS_OPTIONS } from '../../../constants/users';
import { optionsPropType } from '../utils';
import styles from './styles.css';

class FilterBar extends Component {
  updateValue(type) {
    return (value) => { this.setState({ [type]: value }); };
  }

  render() {
    const { skillOptions, filters } = this.props;
    console.log(STATUS_OPTIONS);

    return (
      <div className={styles.container}>
        <Select
          name="skill"
          value={filters.skill}
          onChange={this.updateValue('skill')}
          options={skillOptions}
          className={styles.item}
          placeholder="Filter by skill"
        />
        <Select
          name="status"
          value={filters.status}
          onChange={this.updateValue('status')}
          options={STATUS_OPTIONS}
          placeholder="Filter by Status"
          className={styles.item}
        />
        <Select
          name="number-items"
          value={filters.numItems}
          onChange={this.updateValue('status')}
          placeholder="Entries per Page"
          className={styles.item}
        />
      </div>
    );
  }
}

FilterBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  skillOptions: optionsPropType.isRequired,
  filters: PropTypes.shape({
    numItems: PropTypes.number,
    skill: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = createSelector(
  skillOptionsSelector,
  filtersSelector,
  (skillOptions, filters) => ({ skillOptions, filters }),
);

export default connect(mapStateToProps)(FilterBar);
