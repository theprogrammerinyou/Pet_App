import React, {useEffect} from 'react';
import {ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
  duration?: number;
  stagger?: boolean;
};

export function FadeInView({children, style, delay = 0, duration = 400}: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {duration, easing: Easing.out(Easing.cubic)}),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, {duration, easing: Easing.out(Easing.cubic)}),
    );
  }, [delay, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}

export function StaggerContainer({
  children,
  style,
  index = 0,
  step = 80,
}: Props & {index?: number; step?: number}) {
  return (
    <FadeInView delay={index * step} duration={380} style={style}>
      {children}
    </FadeInView>
  );
}
