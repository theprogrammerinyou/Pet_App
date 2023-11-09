import {StyleSheet, TouchableOpacity} from 'react-native';
import {TextWrapper} from './Text';
export function ButtonWrapper({
  onPress,
  title,
  style,
  width = 350,
  height = 36,
  color = '#fff',
  backgroundColor = '#CB93A5',
}: {
  onPress: () => void;
  title: string;
  blackText?: boolean;
  style?: any;
  height?: number;
  width?: number;
  backgroundColor?: string;
  color?: string;
}) {
  return (
    <TouchableOpacity
      onPressIn={onPress}
      style={[style, {backgroundColor, width, height}, styles.buttonStyle]}>
      <TextWrapper text={title} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 12,
    textAlign: 'center',
    borderColor: '#CB93A5',
    display: 'flex',
    borderWidth: 2,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
