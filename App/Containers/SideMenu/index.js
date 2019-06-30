/**
 * @author Ahmed Fouad
 * @email ahmed_fouad.mahmoud@hotmail.com
 * @create date 2019-06-30 14:17:56
 * @modify date 2019-06-30 14:17:56
 * @desc [description]
 * @flow
 */
import React, { PureComponent } from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { ScrollView, View } from 'react-native';
import Styles from './Styles';
import { Button } from '../../Components';

type Props = {
  navigation: any,
};

export default class SideMenu extends PureComponent<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <SafeAreaView style={Styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} />
          <View style={Styles.btn}>
            <Button title="Logout" onPress={() => navigation.navigate('Auth')} />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
