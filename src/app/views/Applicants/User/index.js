import React from 'react';
import { userPropType } from '../utils';

const User = ({ user }) => (
  <div>
    <ul>
      <li>{user.name}</li>
      <li>{user.company}</li>
      <li>{user.phone}</li>
      <li>{user.picture}</li>
      <li>{user.status}</li>
    </ul>
  </div>
);

User.propTypes = {
  user: userPropType.isRequired,
};

export default User;
