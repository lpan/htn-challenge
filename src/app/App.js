import React, { PropTypes } from 'react';

const App = ({ children }) => (
  <div>
    <p>lmao</p>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
