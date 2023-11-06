import {Text} from 'react-native';

export function TextWrapper({
  text,
  style,
  color = '#000',
}: {
  text: string;
  color?: string;
  style?: any;
}) {
  return <Text style={[style, {color}]}>{text}</Text>;
}
