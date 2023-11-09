import {StyleSheet, TextInput} from 'react-native';

export function InputWrapper({
  placeholder,
  onChangeText,
  value,
  type,
  style,
  borderColor,
}: {
  placeholder?: string;
  onChangeText: (e: any) => void;
  value: string;
  type?: string;
  style?: any;
  borderColor?: string;
}) {
  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      style={[style, {borderColor}, styles.inputStyle]}
      secureTextEntry={type === 'password'}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 5,
    borderWidth: 2,
    paddingStart: 20,
  },
});
