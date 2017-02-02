import React, { Component } from 'react';
import Select from 'react-select';
import { optionsPropType } from '../utils';
import * as options from './options';
import styles from './styles.css';

class FilterBar extends Component {
  constructor() {
    super();

    this.state = {
      skill: '',
      status: '',
    };

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(type) {
    return (value) => { this.setState({ [type]: value }); };
  }

  render() {
    const { skills } = this.props;

    return (
      <div className={styles.container}>
        <Select
          name="skill"
          value={this.state.skill}
          onChange={this.updateValue('skill')}
          options={skills}
          className={styles.item}
          placeholder="Filter by skill"
        />
        <Select
          name="status"
          value={this.state.status}
          onChange={this.updateValue('status')}
          options={options.status}
          placeholder="Filter by Status"
          className={styles.item}
        />
      </div>
    );
  }
}

FilterBar.propTypes = {
  skills: optionsPropType.isRequired,
};

export default FilterBar;
