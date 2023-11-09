import {
  Image,
  View,
  StyleSheet,
  ImageProps,
  TouchableOpacity,
} from 'react-native';

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
  return (
    <TouchableOpacity onPress={onPress}>
      <View
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
        ]}>
        <Image source={imagePath} />
      </View>
    </TouchableOpacity>
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
