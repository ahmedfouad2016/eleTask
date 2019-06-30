import { combineReducers } from 'redux';
import { reducer as UsersRedux } from './UserRedux';

export default combineReducers({
  Users: UsersRedux,
});
