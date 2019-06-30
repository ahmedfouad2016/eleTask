/**
 * @author Ahmed Fouad
 * @email ahmed_fouad.mahmoud@hotmail.com
 * @create date 2019-06-30 04:46:35
 * @modify date 2019-06-30 04:46:35
 * @desc [description]
 * @flow
 */

type User = {
  +username: string,
  +password: string,
  +firstname: string,
  +lastname: string,
};

type State = {
  +users: Array<User>,
  +activeUser: User,
};

type Action =
  | { type: 'ADD_USER', user: User }
  | { type: 'ADD_ACTIVE_USER', user: User }
  | { type: 'USER_LOGIN', login: boolean };

export const Types = {
  ADD_USER: 'ADD_USER',
  ADD_ACTIVE_USER: 'ADD_ACTIVE_USER',
  USER_LOGIN: 'USER_LOGIN',
};

export function addUserAction(user: User) {
  return (dispatch) => {
    dispatch({ type: Types.ADD_USER, user });
  };
}

const initialState: State = {
  users: [],
  activeUser: {},
  login: false,
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case Types.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user],
        activeUser: action.user,
        login: true,
      };

    case Types.ADD_ACTIVE_USER:
      return { ...state, activeUser: action.user, login: true };

    case Types.USER_LOGIN:
      return { ...state, login: action.login };

    default:
      return state;
  }
};
