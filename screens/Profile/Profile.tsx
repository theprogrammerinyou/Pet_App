import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {useAuth} from '../../context/AuthContext';
import {theme} from '../../constants/theme';

const MENU_ITEMS = [
  {
    id: 'edit',
    label: 'Edit Profile',
    icon: '👤',
    screen: 'EditProfile' as const,
  },
  {id: 'pets', label: 'My Pets', icon: '🐾', screen: 'MyPets' as const},
  {id: 'notifications', label: 'Notifications', icon: '🔔', screen: null},
  {id: 'help', label: 'Help & Support', icon: '❓', screen: null},
  {id: 'about', label: 'About Paw Mantra', icon: 'ℹ️', screen: null},
];

export function Profile({navigation}: {navigation: any}) {
  const {user, logout} = useAuth();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <TextWrapper
            text={user?.fullName?.charAt(0)?.toUpperCase() ?? '?'}
            fontSize={36}
            color={theme.colors.surface}
          />
        </View>
        <TextWrapper
          text={user?.fullName ?? 'Pet Parent'}
          fontSize={theme.typography.title}
          style={styles.name}
        />
        <TextWrapper
          text={user?.emailId ?? ''}
          color={theme.colors.textSecondary}
          fontSize={theme.typography.caption}
        />
      </View>

      <View style={styles.section}>
        <TextWrapper
          text="Your Account"
          fontSize={theme.typography.subtitle}
          style={styles.sectionTitle}
        />
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuRow,
              index === MENU_ITEMS.length - 1 && styles.menuRowLast,
            ]}
            activeOpacity={0.7}
            onPress={() => item.screen && navigation.navigate(item.screen)}>
            <TextWrapper text={item.icon} fontSize={20} />
            <TextWrapper
              text={item.label}
              style={styles.menuLabel}
              fontSize={theme.typography.body}
            />
            <TextWrapper
              text="›"
              color={theme.colors.textMuted}
              fontSize={20}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutSection}>
        <ButtonWrapper
          title="Log Out"
          onPress={logout}
          backgroundColor={theme.colors.surface}
          color={theme.colors.error}
        />
      </View>

      <TextWrapper
        text="Paw Mantra v1.0"
        color={theme.colors.textMuted}
        fontSize={theme.typography.small}
        style={styles.footer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing.sm,
    marginHorizontal: 24,
    paddingBottom: 120,
    backgroundColor: theme.colors.backgroundWarm,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadow.button,
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadow.card,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    gap: 12,
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    flex: 1,
  },
  logoutSection: {
    marginTop: theme.spacing.sm,
  },
  footer: {
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
});
