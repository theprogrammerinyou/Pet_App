import {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {theme} from '../../constants/theme';

type Session = {
  id: string;
  type: 'walk' | 'boarding';
  petName: string;
  providerName: string;
  status: 'active' | 'completed';
  time?: string;
};

const MOCK_SESSIONS: Session[] = [
  { id: '1', type: 'walk', petName: 'Bruno', providerName: 'Nikita D.', status: 'completed', time: 'Today, 9:00 AM' },
  { id: '2', type: 'boarding', petName: 'Max', providerName: 'Happy Tails', status: 'completed', time: 'Yesterday' },
];

export function Location({navigation}: {navigation: any}) {
  const [sessions] = useState<Session[]>(MOCK_SESSIONS);
  const activeSession = sessions.find((s) => s.status === 'active');

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TextWrapper
          text="Track Your Pet"
          fontSize={theme.typography.title}
          style={styles.title}
        />
        <TextWrapper
          text="When your pet is with a walker or at boarding, see their live location here."
          color={theme.colors.textSecondary}
          fontSize={theme.typography.body}
          style={styles.description}
        />
      </View>

      {activeSession ? (
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapInner}>
            <TextWrapper text="🗺️" fontSize={48} />
            <TextWrapper
              text="Live map view"
              color={theme.colors.textMuted}
              fontSize={theme.typography.caption}
              style={{ marginTop: 8 }}
            />
            <TextWrapper
              text={`${activeSession.petName} with ${activeSession.providerName}`}
              fontSize={theme.typography.caption}
              style={{ marginTop: 4 }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.noActive}>
          <View style={styles.iconCircle}>
            <TextWrapper text="📍" fontSize={48} />
          </View>
          <TextWrapper
            text="No active session"
            fontSize={theme.typography.body}
            color={theme.colors.textSecondary}
            style={styles.noActiveText}
          />
          <TextWrapper
            text="Book a walk or boarding to see live tracking here."
            color={theme.colors.textMuted}
            fontSize={theme.typography.caption}
            style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}
          />
          <ButtonWrapper
            title="Book a Walker"
            onPress={() => navigation.getParent()?.navigate('home', { screen: 'petWalker' })}
            style={styles.button}
          />
        </View>
      )}

      <View style={styles.section}>
        <TextWrapper
          text="Recent activity"
          fontSize={theme.typography.subtitle}
          style={styles.sectionTitle}
        />
        {sessions.map((s) => (
          <TouchableOpacity key={s.id} style={styles.sessionCard} activeOpacity={0.8}>
            <View style={styles.sessionLeft}>
              <View style={styles.sessionIcon}>
                <TextWrapper text={s.type === 'walk' ? '🚶' : '🏠'} fontSize={20} />
              </View>
              <View>
                <TextWrapper text={`${s.petName} · ${s.providerName}`} fontSize={theme.typography.body} />
                <TextWrapper
                  text={s.time ?? '—'}
                  color={theme.colors.textMuted}
                  fontSize={theme.typography.small}
                />
              </View>
            </View>
            <View style={[styles.badge, s.status === 'active' && styles.badgeActive]}>
              <TextWrapper
                text={s.status === 'active' ? 'Live' : 'Done'}
                fontSize={theme.typography.small}
                color={s.status === 'active' ? theme.colors.surface : theme.colors.textMuted}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: Platform.OS === 'ios' ? 56 : 24,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 100,
    backgroundColor: theme.colors.backgroundWarm,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  description: {
    lineHeight: 24,
  },
  noActive: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  noActiveText: {
    marginTop: theme.spacing.md,
    marginBottom: 4,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    minWidth: 200,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  mapInner: {
    alignItems: 'center',
  },
  section: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    ...theme.shadow.card,
  },
  sessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.borderLight,
  },
  badgeActive: {
    backgroundColor: theme.colors.primary,
  },
});
