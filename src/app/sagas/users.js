import { call, put } from 'redux-saga/effects';
import { getUsers } from '../api';

export function* fetchUsers({ payload }) {
  try {
    const data = yield call(getUsers, payload.options);
    yield put({ type: 'FETCH_USERS_SUCCEEDED', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_USERS_FAILED', error });
  }
}
