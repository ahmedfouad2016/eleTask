import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import TweetsScreen from './TweetsScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const TweetsStack = createStackNavigator({
  Tweets: TweetsScreen,
});

const AppStack = createDrawerNavigator({
  Tweets: TweetsStack,
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);
