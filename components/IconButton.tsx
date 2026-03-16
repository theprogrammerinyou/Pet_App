import {Image, StyleSheet, ImageProps, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {theme} from '../constants/theme';

export function IconButton({
  imagePath,
  backgroundColor,
  containerWidth = 48,
  containerHeight = 48,
  borderRadius = 50,
  marginTop = 0,
  borderColor = theme.colors.border,
  onPress,
}: {
  imagePath: ImageProps;
  backgroundColor?: string;
  containerWidth?: number;
  containerHeight?: number;
  borderRadius?: number;
  marginTop?: number;
  borderColor?: string;
  onPress?: () => void;
}) {
  const scale = useSharedValue(1);
  const iconSize = Math.min(containerWidth * 0.7, containerWidth - 10);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.94, {
      damping: 16,
      mass: 0.7,
      stiffness: 280,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 14,
      mass: 0.6,
      stiffness: 280,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={8}
      android_ripple={{color: 'rgba(15,23,42,0.08)', borderless: true}}>
      <Animated.View
        style={[
          {
            backgroundColor,
            borderColor,
            width: containerWidth,
            height: containerHeight,
            borderRadius,
            marginTop,
          },
          styles.imageContainer,
          animatedStyle,
        ]}>
        <Image
          source={imagePath}
          style={[styles.icon, {width: iconSize, height: iconSize}]}
          resizeMode="contain"
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    opacity: 0.98,
  },
});
