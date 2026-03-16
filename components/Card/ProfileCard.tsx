import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextWrapper} from '../Wrappers/Text';
import {theme} from '../../constants/theme';

export function WalkerCard({
  walkerName,
  walkerExp,
  walkerRate,
  walkerDistance,
  imageUrl,
  onPress,
}: {
  walkerName: string;
  walkerExp: string;
  walkerRate: string;
  walkerDistance: string;
  imageUrl?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.85}>
      <View style={styles.cardTop}>
        <View style={styles.avatarWrap}>
          <Image
            source={
              imageUrl
                ? {uri: imageUrl}
                : require('../../assets/walker/girlHeart.png')
            }
            style={styles.avatarImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.cardInfo}>
          <TextWrapper
            text={walkerName}
            fontSize={theme.typography.subtitle}
            fontWeight="700"
          />
          <View style={styles.meta}>
            <TextWrapper
              text={walkerExp}
              fontSize={12}
              color={theme.colors.gold}
              fontWeight="bold"
            />
            <TextWrapper
              text={walkerDistance}
              fontSize={12}
              color={theme.colors.textMuted}
            />
          </View>
        </View>
      </View>
      <View style={styles.cardBottom}>
        <TextWrapper
          text={walkerRate}
          fontSize={theme.typography.title}
          fontWeight="800"
          color={theme.colors.primary}
        />
        <TextWrapper
          text="/ hour"
          color={theme.colors.textMuted}
          fontSize={12}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadow.glass,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImg: {
    width: 44,
    height: 44,
  },
  cardInfo: {flex: 1},
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
});
