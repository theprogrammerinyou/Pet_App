import {View, StyleSheet, Platform} from 'react-native';
import {TextWrapper} from '../components/Wrappers/Text';
import {theme} from '../constants/theme';

export function ComingSoon({route}: {route?: {params?: {title?: string}}}) {
  const title = route?.params?.title ?? 'Coming Soon';
  return (
    <View style={styles.container}>
      <TextWrapper text={title} fontSize={theme.typography.title} style={styles.title} />
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
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    padding: theme.spacing.lg,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
  },
});
