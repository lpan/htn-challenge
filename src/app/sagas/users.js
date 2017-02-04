import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { getUsers } from '../api';
import { FETCH_USERS_SUCCEEDED, FETCH_USERS_FAILED } from '../constants/users';

export function* fetchUsers({ payload }) {
  try {
    const data = yield call(getUsers, payload.options);
    yield put({ type: FETCH_USERS_SUCCEEDED, payload: data });
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILED, error });
  }
}

export function* goToDetails() {
  yield put(push('/details'));
}

export function* goToApplicants() {
  yield put(push('/applicants'));
}
