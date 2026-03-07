import {StyleSheet, Pressable} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {TextWrapper} from './Text';
import {theme} from '../../constants/theme';

const { shadow } = theme;

export function ButtonWrapper({
  onPress,
  title,
  style,
  width = 350,
  height = 36,
  color = '#fff',
  backgroundColor = theme.colors.primary,
}: {
  onPress?: () => void;
  title: string;
  blackText?: boolean;
  style?: any;
  height?: number;
  width?: number;
  backgroundColor?: string;
  color?: string;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.96, { damping: 15 }); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        style={[style, { backgroundColor, width, height }, styles.buttonStyle, shadow.button]}>
        <TextWrapper text={title} color={color} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: theme.borderRadius.md,
    textAlign: 'center',
    borderColor: theme.colors.primary,
    display: 'flex',
    borderWidth: 2,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
