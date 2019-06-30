import twitter from 'react-native-simple-twitter';

const tokens = {
  consumerKey: 'gWiJM2AwxuCgPdR4uAPG1ko2O',
  consumerSecret: 'tjpHy0O6vAvrxkWYW3jZZ4WcMosrSipOG3xTe4WwdOu5oG574B',
  accessToken: '2299483375-1ljtCtPWVxOZ1xAHQAADMj1epZPPVCO3fzx0NFk',
  accessTokenSecret: 'JicXSWl741ZhoWXulCGUkg6iOQo0YFAQG0A2nPC60k3fJ',
};
twitter.setConsumerKey(tokens.consumerKey, tokens.consumerSecret);
twitter.setAccessToken(tokens.accessToken, tokens.accessTokenSecret);

export default twitter;
