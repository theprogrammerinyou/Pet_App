import {Text} from 'react-native';

export function TextWrapper({
  text,
  style,
  color = '#000',
  fontSize = 16,
}: {
  text: string;
  color?: string;
  style?: any;
  fontSize?: number;
}) {
  return <Text style={[style, {color, fontSize}]}>{text}</Text>;
}
