/**
 * @author Ahmed Fouad
 * @email ahmed_fouad.mahmoud@hotmail.com
 * @create date 2019-06-30 01:37:30
 * @modify date 2019-06-30 01:37:30
 * @desc Sign In Screen
 * @flow
 */

import React, { PureComponent } from 'react';
import SignIn from '../Containers/SignIn';

type Props = {
  navigation: any,
};

export default class SignInScreen extends PureComponent<Props> {
  onSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  onSignIn = () => {
    const { navigation } = this.props;
    navigation.navigate('App');
  };

  render() {
    return <SignIn onSignUp={this.onSignUp} onSignIn={this.onSignIn} />;
  }
}
