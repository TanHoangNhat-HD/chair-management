import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import chairApi from 'api/chairApi';
import { Chair, ListParams, ListResponse } from 'models';
import { chairActions } from './chairSlice';

function* fetchChairList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Chair> = yield call(chairApi.getAll, action.payload);
    yield put(chairActions.fetchChairListSuccess(response));
  } catch (error) {
    yield put(chairActions.fetchChairListFail());
  }
}

export default function* chairSaga() {
  yield takeLatest(chairActions.fetchChairList, fetchChairList);
}
