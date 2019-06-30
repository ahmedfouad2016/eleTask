// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { TextField, Button } from '../../Components';
import Styles from './Styles';
import { Types } from '../../Redux/UserRedux';
import Helper from '../../Config/Helper';

type State = {
  username: string,
  password: string,
  errors: {
    username: string,
    password: string,
  },
};

type Props = {
  onSignUp: () => void,
  onSignIn: () => void,
  users: Array<any>,
  addActiveUser: (user: any) => void,
};

class SignIn extends Component<Props, State> {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
    },
  };

  emptyMsg = 'This Field is Required';

  usernameMsg = 'Wrong User Name';

  passwordMsg = 'Wrong Password';

  checkUserName = (username: string) => {
    const { users } = this.props;
    return users.find(user => user.username.toUpperCase() === username.toUpperCase());
  };

  SignIn = async () => {
    const { username, password } = this.state;
    const errors = {};
    let isValid = true;
    if (username.length === 0) {
      errors.username = this.emptyMsg;
      isValid = false;
    }
    if (password.length === 0) {
      errors.password = this.emptyMsg;
      isValid = false;
    }
    this.setState({ errors });
    if (!isValid) return;
    const user = this.checkUserName(username);
    if (user === undefined) {
      errors.username = this.usernameMsg;
      return;
    }
    const usersData = await Helper.GetUser(username);
    if (usersData.password !== password) {
      errors.password = this.passwordMsg;
      this.setState({ errors });
      return;
    }

    const { onSignIn, addActiveUser } = this.props;
    addActiveUser(user);
    onSignIn();
  };

  render() {
    const { username, password, errors } = this.state;
    const { onSignUp } = this.props;
    return (
      <View style={Styles.container}>
        <TextField
          label="User Name"
          textContentType="username"
          value={username}
          error={errors.username}
          onChange={text => this.setState({ username: text, errors: { ...errors, username: '' } })}
        />
        <TextField
          label="Password"
          textContentType="password"
          password
          value={password}
          error={errors.password}
          onChange={text => this.setState({ password: text, errors: { ...errors, password: '' } })}
        />
        <Button title="Log in" style={Styles.btn} onPress={this.SignIn} />
        <Button
          title="Register ?"
          textStyle={Styles.link}
          type="transparent"
          onPress={() => onSignUp()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ Users }) => ({
  users: Users.users,
});

const mapDispatchToProps = dispatch => ({
  addActiveUser: user => dispatch({ type: Types.ADD_ACTIVE_USER, user }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
)(SignIn);
