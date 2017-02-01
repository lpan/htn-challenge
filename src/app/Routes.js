import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import { history } from './store';
import App from './App';
import Applicants from './views/Applicants';
import Applicant from './views/Applicant';

const Routes = () => (
  <Router history={history}>
    <Redirect from="/" to="applicants" />
    <Route path="/" component={App}>
      <Route path="/applicants" component={Applicants} />
      <Route path="/applicant/:appId" component={Applicant} />
    </Route>
  </Router>
);

export default Routes;
