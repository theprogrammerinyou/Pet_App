import {StyleSheet, TouchableOpacity} from 'react-native';
import {TextWrapper} from './Text';
export function ButtonWrapper({
  onPress,
  title,
  blackText,
  style,
  backgroundColor = '#CB93A5',
}: {
  onPress: () => void;
  title: string;
  blackText?: boolean;
  style?: any;
  backgroundColor?: string;
}) {
  return (
    <TouchableOpacity
      onPressIn={onPress}
      style={[style, {backgroundColor}, styles.buttonStyle]}>
      <TextWrapper text={title} color={blackText ? '#000' : '#fff'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 12,
    width: 350,
    height: 36,
    textAlign: 'center',
    borderColor: '#CB93A5',
    display: 'flex',
    borderWidth: 2,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
