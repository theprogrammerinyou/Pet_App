import {Text} from 'react-native';

export function TextWrapper({
  text,
  style,
  color = '#000',
  fontSize = 16,
  fontWeight = '400',
}: {
  text: string | number;
  color?: string;
  style?: any;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}) {
  return <Text style={[style, {color, fontSize, fontWeight}]}>{text}</Text>;
}
