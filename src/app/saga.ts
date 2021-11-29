import authSaga from 'features/auth/authSaga';
import chairSaga from 'features/chair/chairSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), chairSaga()]);
}
