import React, { PropTypes } from 'react';
import styles from './styles.css';

const Header = ({ title }) => (
  <div className={styles.container}>
    <h1 className={styles.header}>{title}</h1>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
