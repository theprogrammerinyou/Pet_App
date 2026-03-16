import {View, StyleSheet} from 'react-native';
import {Header} from '../components/Header';
import {TextWrapper} from '../components/Wrappers/Text';
import {theme} from '../constants/theme';

export function ComingSoon({route}: {route?: {params?: {title?: string}}}) {
  const title = route?.params?.title ?? 'Coming Soon';
  return (
    <View style={styles.container}>
      <Header text={title} />
      <TextWrapper
        text="We're working on this feature. Stay tuned!"
        color={theme.colors.textSecondary}
        style={styles.subtitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
  // title style removed, Header provides title spacing
  subtitle: {
    textAlign: 'center',
  },
});
