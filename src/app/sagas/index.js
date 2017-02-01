import { takeLatest } from 'redux-saga/effects';
import { fetchUsers } from './users';

function* rootSaga() {
  yield takeLatest('FETCH_USERS', fetchUsers);
}

export default rootSaga;
