import React, { Component } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {
  Card, CardTitle, CardContent, CardImage,
} from 'react-native-material-cards';
import { tweetsRequest, tweetsLoadMore, tweetsRefresh } from '../../Redux/TweetsRedux';

export class index extends Component<null, null> {
  componentDidMount() {
    const { getTweets } = this.props;
    getTweets();
  }

  renderItem = ({ item }) => (
    <Card>
      <CardImage source={{ uri: item.user.banner }} title="#React Native" />
      <CardTitle
        title={item.user.name}
        subtitle={item.user.desc}
        avatarSource={{ uri: item.user.img }}
      />
      <CardContent text={item.desc} />
    </Card>
  );

  keyExtractor = (item, count) => `card_${item.id}_${count}`;

  renderFooter = () => {
    const { isFetching } = this.props;
    if (!isFetching) return null;
    return <ActivityIndicator size="large" style={{ color: '#000' }} />;
  };

  handleLoadMore = () => {
    const { getMoreTweets } = this.props;
    getMoreTweets();
  };

  hanleRefresh = () => {
    const { refreshTweets } = this.props;
    refreshTweets();
  };

  render() {
    const { tweets, refreshing, message } = this.props;
    console.log(message);

    return (
      <FlatList
        data={tweets}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        onRefresh={this.hanleRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.4}
        onEndReached={this.handleLoadMore}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const mapStateToProps = ({ Tweets }) => ({
  tweets: Tweets.tweets,
  isFetching: Tweets.isFetching,
  refreshing: Tweets.refreshing,
  message: Tweets.message,
});

const mapDispatchToProps = dispatch => ({
  getTweets: () => dispatch(tweetsRequest()),
  getMoreTweets: () => dispatch(tweetsLoadMore()),
  refreshTweets: () => dispatch(tweetsRefresh()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
