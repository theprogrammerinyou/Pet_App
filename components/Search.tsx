import React from 'react';
import {InputWrapper} from './Wrappers/Input';
import {StyleSheet} from 'react-native';

export function Search({
  searchValue,
  onSearchValueChange,
  width,
  height,
}: {
  searchValue: string;
  height?: number;
  width?: number;
  onSearchValueChange: (e: string) => void;
}) {
  return (
    <InputWrapper
      placeholder="Search"
      value={searchValue}
      style={[{width, height}, styles.inputStyle]}
      borderColor="rgba(0, 0, 0, 0.20)"
      onChangeText={e => onSearchValueChange(e?.target?.value)}
    />
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    marginLeft: 10,
  },
});
