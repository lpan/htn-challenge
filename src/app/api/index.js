import { get } from './request';
import { USERS_URL } from './constants';

export const getUsers = (options) => get(USERS_URL, options);
