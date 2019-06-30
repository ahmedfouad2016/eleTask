import { combineReducers } from 'redux';
import { reducer as UsersRedux } from './UserRedux';
import { reducer as TweetsRedux } from './TweetsRedux';

export default combineReducers({
  Users: UsersRedux,
  Tweets: TweetsRedux,
});
