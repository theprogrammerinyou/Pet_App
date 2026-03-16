import {StyleSheet, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {TextWrapper} from './Text';
import {theme} from '../../constants/theme';

const {shadow} = theme;

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
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View
      style={[animatedStyle, styles.buttonContainer, shadow.button]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.96, {
            damping: 16,
            mass: 0.7,
            stiffness: 260,
          });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, {
            damping: 14,
            mass: 0.6,
            stiffness: 260,
          });
        }}
        hitSlop={8}
        android_ripple={{color: 'rgba(255,255,255,0.24)'}}
        style={[style, {backgroundColor, width, height}, styles.buttonStyle]}>
        <TextWrapper
          text={title}
          color={color}
          fontWeight="bold"
          fontSize={16}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: theme.borderRadius.xl,
    marginTop: 20,
    overflow: 'hidden',
  },
  buttonStyle: {
    borderRadius: theme.borderRadius.xl,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
