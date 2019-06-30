// @flow

type State = {
  tweets: Array<{
    id: number,
    desc: string,
    user: {
      name: string,
      img: string,
      desc: string,
      banner: string,
    },
  }>,
  maxId: number,
  message: string,
  isFetching: boolean,
  refreshing: boolean,
};

type Action =
  | { type: 'TWEETS_SUCCESS', data: Array<any>, maxId: number }
  | { type: 'TWEETS_FAILED', message: string }
  | { type: 'TWEETS_REQUEST' }
  | { type: 'TWEETS_LOAD_MORE_SUCCESS' }
  | { type: 'TWEETS_REFRESH' };

type ThunkAction = (dispatch: any, getState: any, twitter: any) => any;

const Types = {
  TWEETS_SUCCESS: 'TWEETS_SUCCESS',
  TWEETS_FAILED: 'TWEETS_FAILED',
  TWEETS_REQUEST: 'TWEETS_REQUEST',
  TWEETS_LOAD_MORE_SUCCESS: 'TWEETS_LOAD_MORE_SUCCESS',
  TWEETS_REFRESH: 'TWEETS_REFRESH',
};

const query = 'react native';

export function tweetsRequest(): ThunkAction {
  return (dispatch, getState, twitter) => {
    dispatch({ type: Types.TWEETS_REQUEST });
    return twitter
      .get('search/tweets.json', { q: query, count: 5 })
      .then((res) => {
        let maxId = res.search_metadata.max_id;
        const data = res.statuses.map((value) => {
          const tweet = {};
          tweet.desc = value.text;
          tweet.id = value.id;
          tweet.user = {
            name: value.user.name,
            desc: value.user.description,
            img: value.user.profile_image_url_https,
            banner: value.user.profile_banner_url,
          };
          if (value.id < maxId) maxId = value.id;
          return tweet;
        });
        dispatch({ type: Types.TWEETS_SUCCESS, data, maxId });
        console.log(res);
      })
      .catch(err => dispatch({ type: Types.TWEETS_FAILED, message: err.message }));
  };
}

export function tweetsLoadMore(): ThunkAction {
  return (dispatch, getState, twitter) => {
    dispatch({ type: Types.TWEETS_REQUEST });
    const { Tweets } = getState();
    console.log(Tweets);

    return twitter
      .get('search/tweets.json', { q: query, count: 5, max_id: Tweets.maxId })
      .then((res) => {
        let maxId = res.search_metadata.max_id;
        const data = res.statuses.map((value) => {
          const tweet = {};
          tweet.desc = value.text;
          tweet.id = value.id;
          tweet.user = {
            name: value.user.name,
            desc: value.user.description,
            img: value.user.profile_image_url_https,
            banner: value.user.profile_banner_url,
          };
          if (value.id < maxId) maxId = value.id;
          return tweet;
        });
        dispatch({ type: Types.TWEETS_LOAD_MORE_SUCCESS, data, maxId });
        console.log(res);
      })
      .catch(err => dispatch({ type: Types.TWEETS_FAILED, message: err.message }));
  };
}

export function tweetsRefresh(): ThunkAction {
  return (dispatch) => {
    dispatch({ type: Types.TWEETS_REFRESH });
    dispatch(tweetsRequest());
  };
}

const initialState: State = {
  tweets: [],
  maxId: 0,
  message: '',
  isFetching: false,
  refreshing: false,
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case Types.TWEETS_SUCCESS:
      return {
        ...state,
        tweets: [...action.data],
        maxId: action.maxId,
        isFetching: false,
        refreshing: false,
      };

    case Types.TWEETS_LOAD_MORE_SUCCESS:
      return {
        ...state,
        tweets: [...state.tweets, ...action.data],
        maxId: action.maxId,
        isFetching: false,
      };

    case Types.TWEETS_REQUEST:
      return { ...state, isFetching: true, message: '' };

    case Types.TWEETS_REFRESH:
      return { ...state, refreshing: true, message: '' };

    case Types.TWEETS_FAILED:
      return {
        ...state,
        isFetching: false,
        refreshing: false,
        message: action.message,
      };

    default:
      return state;
  }
};
