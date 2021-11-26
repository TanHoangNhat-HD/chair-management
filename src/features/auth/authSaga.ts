import { call, delay, fork, put, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { login, loginFailed, LoginPayload, loginSuccess, logout } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    /**
     * Call API
     */
    localStorage.setItem('access_token', 'token');
    yield put(loginSuccess({ id: 1, name: 'TanHN' }));
  } catch (error) {
    yield put(loginFailed);
  }
}

function* handleLogout() {
  yield delay(100);
  localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
