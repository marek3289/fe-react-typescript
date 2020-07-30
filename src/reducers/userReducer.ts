import { actions } from '../utils/constants';
import { IState } from '../utils/interfaces';

const initialState = { userList: [], page: 1, isLoading: false, error: ''};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.FETCH_GITHUB_USERS:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case actions.FETCH_GITHUB_USERS_SUCCESS:
      return {
        ...state,
        userList: [...state.userList, ...action.payload].filter((v,i,a) => a.findIndex(t => (t.login === v.login)) === i),
        isLoading: false,
        error: ''
      };
    case actions.FETCH_GITHUB_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case actions.FETCH_MORE_BEGIN:
      return {
        ...state,
        page: state.page + 1,
        isLoading: true,
      };
    case actions.FETCH_MORE_END:
      return {
        ...state,
        isLoading: false,
      };
    case actions.RESET_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default userReducer;
