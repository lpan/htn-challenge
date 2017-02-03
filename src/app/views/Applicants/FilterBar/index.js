import React, { PropTypes } from 'react';
import Select from 'react-select';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  skillOptionsSelector, filtersSelector, pageNumOptionsSelector,
} from '../../../reducers/users';
import { UPDATE_FILTERS, STATUS_OPTIONS, NUM_ITEMS_OPTIONS } from '../../../constants/users';
import { optionsPropType } from '../../customPropTypes';

import styles from './styles.css';

const updateValue = (type, dispatch) => (opt) => {
  let value;
  if (opt) {
    value = opt.value;
  } else {
    value = null;
  }

  dispatch({ type: UPDATE_FILTERS, payload: { [type]: value } });
};

const FilterBar = ({ skillOptions, pageNumOptions, filters, dispatch }) => (
  <div className={styles.container}>
    <Select
      name="skill"
      value={filters.skill}
      onChange={updateValue('skill', dispatch)}
      options={skillOptions}
      className={styles.item}
      placeholder="Filter by skill"
    />
    <Select
      name="status"
      value={filters.status}
      onChange={updateValue('status', dispatch)}
      options={STATUS_OPTIONS}
      placeholder="Filter by Status"
      className={styles.item}
    />
    <Select
      name="number-items"
      value={filters.numItems}
      onChange={updateValue('numItems', dispatch)}
      options={NUM_ITEMS_OPTIONS}
      placeholder="# of Entries"
      className={styles.item}
      clearable={false}
    />
    <Select
      name="page-number"
      value={filters.currentPage}
      onChange={updateValue('currentPage', dispatch)}
      options={pageNumOptions}
      placeholder="Page number"
      className={styles.item}
      clearable={false}
    />
  </div>
);

FilterBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  skillOptions: optionsPropType.isRequired,
  pageNumOptions: optionsPropType.isRequired,
  filters: PropTypes.shape({
    numItems: PropTypes.number,
    currentPage: PropTypes.number,
    skill: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = createSelector(
  skillOptionsSelector,
  filtersSelector,
  pageNumOptionsSelector,
  (skillOptions, filters, pageNumOptions) => ({ skillOptions, filters, pageNumOptions }),
);

export default connect(mapStateToProps)(FilterBar);
