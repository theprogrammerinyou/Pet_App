import {Image, StyleSheet, ImageProps, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export function IconButton({
  imagePath,
  backgroundColor,
  containerWidth = 48,
  containerHeight = 48,
  borderRadius = 50,
  marginTop = 0,
  borderColor = '#CB93A5',
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.92, {
      damping: 10,
      stiffness: 400,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 400,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
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
          style={{
            width: Math.min(containerWidth * 0.7, containerWidth - 10),
            height: Math.min(containerHeight * 0.7, containerHeight - 10),
          }}
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
    borderWidth: 1,
  },
});
