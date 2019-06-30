// @flow
import React from 'react';
import FullButton from './FullButton';
import TransparentButton from './TransparentButton';

type Props = {
  title: String,
  onPress: () => void,
  style?: any,
  textStyle?: any,
  type?: 'transparent' | 'full',
};

const Button = (props: Props) => {
  const { type } = props;
  if (type === 'transparent') return <TransparentButton {...props} />;
  return <FullButton {...props} />;
};

Button.defaultProps = {
  style: {},
  textStyle: {},
  type: 'full',
};

export default Button;
