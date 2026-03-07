import {StyleSheet, View} from 'react-native';
import {TextWrapper} from './Wrappers/Text';
import {IconButton} from './IconButton';
import {theme} from '../constants/theme';

type Nav = { goBack: () => void };

export function Header({text, navigation}: {text: string; navigation?: Nav}) {
  return (
    <View style={styles.headerFlexContainer}>
      <IconButton
        containerHeight={36}
        containerWidth={36}
        imagePath={require('../assets/utils/backButton.png')}
        onPress={navigation?.goBack ? () => navigation.goBack() : undefined}
      />
      <TextWrapper fontSize={theme.typography.title} text={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
