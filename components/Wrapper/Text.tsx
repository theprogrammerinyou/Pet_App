import {Text, Platform, StyleSheet} from 'react-native';

export function TextWrapper({text, style}: {text: string; style?: any}) {
  return <Text style={[style, styles.textStyle]}>{text}</Text>;
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: Platform.OS === 'android' ? 22 : 18,
    color: Platform.OS === 'android' ? '#000' : '#000',
  },
});
