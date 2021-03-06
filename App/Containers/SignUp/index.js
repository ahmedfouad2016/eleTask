/**
 * @author Ahmed Fouad
 * @email ahmed_fouad.mahmoud@hotmail.com
 * @create date 2019-06-30 01:49:27
 * @modify date 2019-06-30 01:49:27
 * @desc [description]
 * @flow
 */
import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TextField, Button } from '../../Components';
import Styles from './Styles';
import { addUserAction } from '../../Redux/UserRedux';
import Helper from '../../Config/Helper';

type State = {
  username: string,
  password: string,
  firstname: string,
  lastname: string,
  confirmPassword: string,
  errors: {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    confirmPassword: string,
  },
};

type Props = {
  onSignUp: () => void,
  addUser: (user: any) => void,
  users: Array<any>,
};

class SignUp extends Component<Props, State> {
  state = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    errors: {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
    },
  };

  emptyMsg = 'This Field is Required';

  usernameMsg = 'This User Name Exist';

  passwordMsg = 'Confirm Paasword not match with Password';

  checkUserName = (username: string) => {
    const { users } = this.props;
    if (users && users.length > 0) {
      return users.find(user => user.username.toUpperCase() === username.toUpperCase());
    }
    return undefined;
  };

  validation = async () => {
    // first check length
    const form = { ...this.state };
    const errors = { ...form.errors };
    let isValid = true;
    delete form.errors;
    Object.entries(form).forEach(([key, value]) => {
      if (value === '') {
        errors[key] = this.emptyMsg;
        isValid = false;
      }
    });
    this.setState({
      errors,
    });
    const { username, confirmPassword, password } = this.state;
    // check username is exist if length check valid
    if (!(isValid && this.checkUserName(username) === undefined)) {
      errors.username = this.usernameMsg;
      this.setState({ errors });
      return;
    }

    // check password
    if (confirmPassword !== password) {
      errors.confirmPassword = this.passwordMsg;
      this.setState({ errors });
      return;
    }
    const { onSignUp, addUser } = this.props;
    await Helper.SetUser(username, password);
    await addUser({
      ...form,
      password: '***',
    });
    onSignUp();
  };

  signUp = async () => {
    await this.validation();
  };

  render() {
    const {
      username, password, firstname, lastname, confirmPassword, errors,
    } = this.state;
    return (
      <ScrollView>
        <KeyboardAvoidingView style={Styles.container} behavior="padding" enabled>
          <TextField
            label="First Name"
            textContentType="name"
            value={firstname}
            error={errors.firstname}
            onChange={text => this.setState({ firstname: text, errors: { ...errors, firstname: '' } })
            }
          />
          <TextField
            label="Last Name"
            textContentType="familyName"
            value={lastname}
            error={errors.lastname}
            onChange={text => this.setState({ lastname: text, errors: { ...errors, lastname: '' } })
            }
          />
          <TextField
            label="User Name"
            textContentType="username"
            value={username}
            error={errors.username}
            onChange={text => this.setState({ username: text, errors: { ...errors, username: '' } })
            }
          />
          <TextField
            label="Password"
            textContentType="password"
            password
            error={errors.password}
            value={password}
            onChange={text => this.setState({ password: text, errors: { ...errors, password: '' } })
            }
          />
          <TextField
            label="Confirm Password"
            textContentType="password"
            password
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={text => this.setState({ confirmPassword: text, errors: { ...errors, confirmPassword: '' } })
            }
          />
          <Button title="Sign Up" style={Styles.btn} onPress={this.signUp} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUserAction(user)),
});

const mapStateToProps = ({ Users }) => ({
  users: Users.users,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
)(SignUp);
