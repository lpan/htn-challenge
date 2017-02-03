import { cond, always, equals, T } from 'ramda';
import React, { PropTypes } from 'react';

import styles from './styles.css';

const getColor = cond([
  [equals('primary'), always('#0EC6FD')],
  [equals('warning'), always('#FCAD0F')],
  [T, always('#0EC6FD')],
]);

const Button = ({ type, label, onClick }) => {
  const color = getColor(type);

  return (
    <button
      style={{ backgroundColor: color }}
      className={styles.button}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
