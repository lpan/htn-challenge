import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import App from './App';
import Applicants from './views/Applicants';
import Applicant from './views/Applicant';

const Routes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="applicants" />
    <Route path="/" component={App}>
      <Route path="/applicants" component={Applicants} />
      <Route path="/applicant/:appId" component={Applicant} />
    </Route>
  </Router>
);

export default Routes;
