import {StyleSheet, View, SafeAreaView} from 'react-native';
import {TextWrapper} from './Wrappers/Text';
import {IconButton} from './IconButton';
import {theme} from '../constants/theme';

type Nav = {goBack: () => void};

export function Header({text, navigation}: {text: string; navigation?: Nav}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerContainer}>
        {navigation?.goBack && (
          <View style={styles.backWrapper}>
            <IconButton
              containerHeight={40}
              containerWidth={40}
              borderRadius={20}
              backgroundColor={theme.colors.surface}
              borderColor={theme.colors.borderLight}
              imagePath={require('../assets/utils/backButton.png')}
              onPress={() => navigation.goBack()}
              marginTop={0}
            />
          </View>
        )}
        <TextWrapper
          fontSize={20}
          fontWeight="700"
          color={theme.colors.text}
          text={text}
          style={styles.titleText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minHeight: 56,
  },
  backWrapper: {
    position: 'absolute',
    left: theme.spacing.md,
  },
  titleText: {
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});
