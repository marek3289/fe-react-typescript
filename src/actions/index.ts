import { actions } from '../utils/constants';

export function fetchUsersAction(payload) {
  return { type: actions.FETCH_GITHUB_USERS, payload };
}

export function fetchUsersSucceedAction(payload) {
  console.log(payload)
  return { type: actions.FETCH_GITHUB_USERS_SUCCESS, payload };
}

export function fetchUsersFailedAction(payload) {
  return { type: actions.FETCH_GITHUB_USERS_FAILURE, payload };
}

export function fetchMoreUsersAction() {
  return { type: actions.FETCH_MORE_BEGIN };
}

export function fetchMoreEndAction() {
  return { type: actions.FETCH_MORE_END };
}

export function resetStateAction() {
  return { type: actions.RESET_STATE };
}
