// @flow
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Styles from './Styles';

type Props = {
  title: String,
  onPress: () => void,
  style?: any,
  textStyle?: any,
};

const TransparentButton = (props: Props) => {
  const {
    title, onPress, style, textStyle,
  } = props;
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
      <Text style={[Styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

TransparentButton.defaultProps = {
  style: {},
  textStyle: {},
};

export default TransparentButton;
