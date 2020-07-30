import { put, all, takeLatest, takeEvery, delay } from 'redux-saga/effects'
import axios from 'axios';

import { fetchUsersSucceedAction, fetchUsersFailedAction, fetchMoreEndAction } from '../actions';
import { actions, GITHUB_API } from '../utils/constants';
import { IPayloadItems } from '../utils/interfaces';

interface IPayload {
  payload: IPayloadItems,
  type: ReturnType<typeof fetchGithubUsers>
};

function* fetchGithubUsers({ payload }:IPayload) {
  const { search, page, postPerPage } = payload;

  try {
    const { data } = yield axios(`${GITHUB_API}?q=${search}&per_page=${postPerPage}&page=${page}`)

    yield put(fetchUsersSucceedAction(data.items))
  } catch (e) {
    yield put(fetchUsersFailedAction(e.message))
  }
}

function* fetchMoreUsersSaga() {
  yield delay(1500);
  yield put(fetchMoreEndAction());
}

export function* rootSaga() {
  yield all([
    yield takeEvery(actions.FETCH_GITHUB_USERS, fetchGithubUsers),
    yield takeLatest(actions.FETCH_MORE_BEGIN, fetchMoreUsersSaga),
  ]);
}

export default rootSaga;
