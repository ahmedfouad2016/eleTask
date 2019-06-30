/**
 * @author Ahmed Fouad
 * @email ahmed_fouad.mahmoud@hotmail.com
 * @create date 2019-06-30 13:14:17
 * @modify date 2019-06-30 13:14:17
 * @desc [description]
 * @flow
 */
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles';

type Props = {
  activeUser: {
    username: string,
    firstname: string,
    lastname: string,
  },
};

export class UserProfile extends PureComponent<Props> {
  render() {
    const { activeUser } = this.props;
    return (
      <View style={Styles.container}>
        <Text>
          {'USER NAME: '}
          {activeUser.username}
          {' '}
        </Text>
        <Text>
          {'FIRST NAME: '}
          {activeUser.firstname}
          {' '}
        </Text>
        <Text>
          {'LAST NAME: '}
          {activeUser.lastname}
          {' '}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ Users }) => ({
  activeUser: Users.activeUser,
});

export default connect(
  mapStateToProps,
  null,
)(UserProfile);
