import React, {useEffect} from 'react';
import {ViewProps, View, Animated, Easing} from 'react-native';

interface StaggerContainerProps extends ViewProps {
  children: React.ReactNode;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  staggerDelay = 50,
  style,
  ...rest
}: StaggerContainerProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <View style={style} {...rest}>
      {childrenArray.map((child, index) => {
        return (
          <StaggerItem key={index} index={index} staggerDelay={staggerDelay}>
            {child}
          </StaggerItem>
        );
      })}
    </View>
  );
}

const StaggerItem = ({
  children,
  index,
  staggerDelay,
}: {
  children: React.ReactNode;
  index: number;
  staggerDelay: number;
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.98, 1],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 340,
      delay: index * staggerDelay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [animatedValue, index, staggerDelay]);

  return (
    <Animated.View style={{opacity, transform: [{translateY}, {scale}]}}>
      {children}
    </Animated.View>
  );
};
