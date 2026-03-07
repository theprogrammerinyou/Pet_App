import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextWrapper} from '../Wrappers/Text';
import {theme} from '../../constants/theme';

export function WalkerCard({
  walkerName,
  walkerExp,
  walkerRate,
  walkerDistance,
  onPress,
}: {
  walkerName: string;
  walkerExp: string;
  walkerRate: string;
  walkerDistance: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.85}>
      <View style={styles.avatarWrap}>
        <Image
          source={require('../../assets/walker/girlHeart.png')}
          style={styles.avatarImg}
          resizeMode="contain"
        />
      </View>
      <View style={styles.ratingRow}>
        <Image
          source={require('../../assets/walker/rating.png')}
          style={styles.starIcon}
          resizeMode="contain"
        />
        <TextWrapper text={walkerExp} fontSize={theme.typography.caption} color={theme.colors.text} />
      </View>
      <TextWrapper text={walkerName} fontSize={theme.typography.body} style={styles.name} color={theme.colors.text} />
      <TextWrapper text={`${walkerRate}/hr`} fontSize={theme.typography.caption} color={theme.colors.primary} />
      <TextWrapper text={walkerDistance} fontSize={theme.typography.small} color={theme.colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    ...theme.shadow.card,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.backgroundWarm,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing.sm,
  },
  avatarImg: {
    width: 44,
    height: 44,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  name: {
    marginBottom: 2,
    fontWeight: '600',
  },
});
