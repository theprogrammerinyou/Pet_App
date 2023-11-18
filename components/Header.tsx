import {StyleSheet, View} from 'react-native';
import {TextWrapper} from './Wrappers/Text';
import {IconButton} from './IconButton';

export function Header({text}: {text: string}) {
  return (
    <View style={styles.headerFlexContainer}>
      <IconButton
        containerHeight={30}
        containerWidth={30}
        imagePath={require('../assets/utils/backButton.png')}
      />
      <TextWrapper fontSize={24} text={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 70,
  },
});
