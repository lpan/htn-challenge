import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';

console.log(styles);

ReactDOM.render(
  <p className={styles.text}>Hello</p>,
  document.getElementById('app')
);
