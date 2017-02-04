import { takeLatest } from 'redux-saga/effects';
import { fetchUsers, goToDetails, goToApplicants } from './users';
import { FETCH_USERS, SET_CURRENT_USER, CHANGE_USER_STATUS } from '../constants/users';

function* rootSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
  yield takeLatest(SET_CURRENT_USER, goToDetails);
  yield takeLatest(CHANGE_USER_STATUS, goToApplicants);
}

export default rootSaga;
