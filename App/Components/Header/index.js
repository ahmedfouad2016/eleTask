import React from 'react';
import { Button } from '../index';
import Styles from './Styles';

type Props = {
  navigation: any,
};

const Header = (props: Props) => (
  <Button
    title="MENU"
    type="transparent"
    textStyle={Styles.text}
    onPress={() => props.navigation.toggleDrawer()}
  />
);

export default Header;
