import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import React from 'react';
import TweetsScreen from './TweetsScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import UserProfileScreen from './UserProfileScreen';
import SideMenu from '../Containers/SideMenu';
import Header from '../Components/Header';

const ProfileStack = createStackNavigator(
  {
    Profile: UserProfileScreen,
  },
  {
    defaultNavigationOptions: props => ({
      headerLeft: <Header {...props} />,
    }),
  },
);

const TweetsStack = createStackNavigator(
  {
    Tweets: TweetsScreen,
  },
  {
    defaultNavigationOptions: props => ({
      headerLeft: <Header {...props} />,
    }),
  },
);

const AppStack = createDrawerNavigator(
  {
    Tweets: TweetsStack,
    Profile: ProfileStack,
  },
  {
    contentComponent: SideMenu,
  },
);

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
