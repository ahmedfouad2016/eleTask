/**
 * @author Ahmed Fouad
 * @email ahmed_fouad.mahmoud@hotmail.com
 * @create date 2019-06-30 04:21:40
 * @modify date 2019-06-30 04:21:40
 * @desc [description]
 * @flow
 */
import React, { PureComponent } from 'react';
import SignUp from '../Containers/SignUp';

type Props = {
  navigation: any,
};

export default class SignUpScreen extends PureComponent<Props> {
  onSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('App');
  };

  render() {
    return <SignUp onSignUp={this.onSignUp} />;
  }
}
