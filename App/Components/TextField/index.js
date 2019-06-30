// @flow
import React from 'react';
import { TextField } from 'react-native-material-textfield';

type Props = {
  label: string,
  value?: string,
  keyboardType?: string,
  textContentType?: string,
  password?: boolean,
  onChange: (text: string) => void,
  error?: string,
};

const TextFieldComponent = (props: Props) => {
  const {
    label, onChange, value, textContentType, password, keyboardType, error,
  } = props;
  return (
    <TextField
      textContentType={textContentType}
      keyboardType={keyboardType}
      label={label}
      value={value}
      error={error}
      secureTextEntry={password}
      onChangeText={text => onChange(text)}
    />
  );
};
TextFieldComponent.defaultProps = {
  password: false,
  value: '',
  keyboardType: 'default',
  textContentType: 'none',
  error: '',
};
export default TextFieldComponent;
