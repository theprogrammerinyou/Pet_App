import {View, StyleSheet, ScrollView} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {IconButton} from '../../components/IconButton';
import {useState, useCallback, useEffect} from 'react';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {Search} from '../../components/Search';
import {StaggerContainer} from '../../components/AnimatedView';
import {theme} from '../../constants/theme';
import {useAuth} from '../../context/AuthContext';
import {apiRequest} from '../../services/api';

type Pet = {_id: string; name: string; category?: string};
type Reminder = {_id: string; title: string; time?: string};

const petsServices = [
  {
    name: 'Pet Grooming',
    id: 1,
    screenName: 'petGrooming',
    icon: require('../../assets/Home/petGrooming.png'),
  },
  {
    name: 'Pet Walking',
    id: 2,
    screenName: 'petWalker',
    icon: require('../../assets/Home/petWalking.png'),
  },
  {
    name: 'Pet Boarding',
    id: 3,
    screenName: 'petBoarding',
    icon: require('../../assets/Home/petBoarding.png'),
  },
  {
    name: 'Vet Care',
    id: 4,
    screenName: 'veterinary',
    icon: require('../../assets/Home/veterinary.png'),
  },
];

const petsShop = [
  {name: 'Food', icon: require('../../assets/Home/food.png')},
  {name: 'Accessories', icon: require('../../assets/Home/accessories.png')},
];

export function Home({navigation}: {navigation: any}) {
  const {user, getAuthHeaders} = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [_, setPetsLoading] = useState(false);
  const [remindersLoading, setRemindersLoading] = useState(false);

  const fetchPets = useCallback(async () => {
    if (!user?._id || user._id === 'guest') {
      setPets([]);
      return;
    }
    setPetsLoading(true);
    try {
      const data = await apiRequest('/getPetsByUser', {
        method: 'POST',
        body: JSON.stringify({userId: user._id}),
        getAuthHeaders: getAuthHeaders,
      });
      if (data.status === 'success' && Array.isArray(data.pets)) {
        setPets(data.pets);
      }
    } catch {
      setPets([]);
    } finally {
      setPetsLoading(false);
    }
  }, [user?._id, getAuthHeaders]);

  const fetchReminders = useCallback(async () => {
    if (!user?._id || user._id === 'guest') {
      setReminders([]);
      return;
    }
    setRemindersLoading(true);
    try {
      const data = await apiRequest('/getReminders', {
        method: 'POST',
        body: JSON.stringify({userId: user._id}),
        getAuthHeaders: getAuthHeaders,
      });
      if (data.status === 'success' && Array.isArray(data.reminders)) {
        setReminders(data.reminders);
      }
    } catch {
      setReminders([]);
    } finally {
      setRemindersLoading(false);
    }
  }, [user?._id, getAuthHeaders]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  useEffect(() => {
    const unsub = navigation.addListener?.('focus', () => {
      fetchReminders();
      fetchPets();
    });
    return () => {
      unsub?.();
    };
  }, [navigation, fetchReminders, fetchPets]);

  const goToAddPet = () => {
    (navigation.getParent?.() as any)?.navigate?.('profile', {
      screen: 'AddPet',
    });
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const firstName = user?.fullName?.trim()?.split(' ')[0] || 'Guest';

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <StaggerContainer index={0}>
        <View style={styles.heroContainer}>
          <View>
            <TextWrapper
              fontSize={22}
              fontWeight="700"
              text={`${greeting}, ${firstName}!`}
            />
            <TextWrapper
              fontSize={theme.typography.body}
              color={theme.colors.textSecondary}
              text="Ready to spoil your pets today?"
              style={styles.heroSubtext}
            />
          </View>
          <IconButton
            imagePath={require('../../assets/Home/notification.png')}
            containerWidth={48}
            containerHeight={48}
            backgroundColor={theme.colors.surface}
            borderColor={theme.colors.borderLight}
            borderRadius={24}
          />
        </View>
      </StaggerContainer>
      <StaggerContainer index={1}>
        <View style={styles.searchAndFilterContainer}>
          <Search
            searchValue={searchValue}
            width={280}
            height={52}
            onSearchValueChange={setSearchValue}
          />
          <IconButton
            backgroundColor={theme.colors.surface}
            borderColor={theme.colors.borderLight}
            imagePath={require('../../assets/utils/filterIcon.png')}
            containerWidth={52}
            containerHeight={52}
            borderRadius={16}
            marginTop={0}
          />
        </View>
      </StaggerContainer>
      <StaggerContainer index={2}>
        <View style={styles.marginContainer}>
          <TextWrapper
            fontSize={20}
            fontWeight="700"
            text="My Pets"
            style={styles.sectionTitle}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.petsContainer}>
            {pets.slice(0, 3).map(pet => (
              <View key={pet._id} style={styles.petCardWrapper}>
                <IconButton
                  imagePath={require('../../assets/Home/dog.png')}
                  containerWidth={80}
                  containerHeight={80}
                  borderRadius={40}
                  backgroundColor={theme.colors.primaryLight}
                  borderColor="transparent"
                />
                <TextWrapper
                  text={pet.name}
                  fontSize={14}
                  fontWeight="600"
                  style={styles.petCardText}
                />
              </View>
            ))}
            <View style={styles.petCardWrapper}>
              <IconButton
                imagePath={require('../../assets/Home/addIcon.png')}
                containerWidth={80}
                containerHeight={80}
                borderRadius={40}
                backgroundColor={theme.colors.surface}
                borderColor={theme.colors.border}
                onPress={goToAddPet}
              />
              <TextWrapper
                text="Add Pet"
                fontSize={14}
                color={theme.colors.textSecondary}
                style={styles.petCardText}
              />
            </View>
          </ScrollView>
        </View>
      </StaggerContainer>
      <StaggerContainer index={3}>
        <View style={styles.marginContainer}>
          <TextWrapper
            fontSize={20}
            fontWeight="700"
            text="Services"
            style={styles.sectionTitle}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}>
            {petsServices.map(({name, screenName, icon}, index) => (
              <View key={index} style={styles.serviceItem}>
                <IconButton
                  imagePath={icon}
                  containerWidth={72}
                  containerHeight={72}
                  borderRadius={24}
                  backgroundColor={theme.colors.surface}
                  onPress={() => navigation.navigate(screenName)}
                  borderColor={theme.colors.borderLight}
                />
                <TextWrapper
                  text={name}
                  fontSize={14}
                  fontWeight="500"
                  color={theme.colors.textSecondary}
                  style={styles.serviceLabel}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </StaggerContainer>
      <StaggerContainer index={4}>
        <View style={styles.marginContainer}>
          <TextWrapper
            fontSize={16}
            text="Pet Shop"
            style={styles.sectionTitle}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.petsContainer}>
            {petsShop.map(({icon}, index) => (
              <IconButton
                key={index}
                imagePath={icon}
                containerWidth={52}
                containerHeight={52}
                backgroundColor={theme.colors.primary}
              />
            ))}
          </ScrollView>
        </View>
      </StaggerContainer>
      <StaggerContainer index={5}>
        <View style={styles.marginContainer}>
          <View style={styles.addRemainderStyle}>
            <TextWrapper
              style={styles.remainderTextStyle}
              fontSize={16}
              text="Reminders"
            />
            <ButtonWrapper
              onPress={() => navigation.navigate('AddReminder')}
              width={130}
              height={40}
              title="New Reminder"
              backgroundColor={theme.colors.surface}
              color={theme.colors.primary}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.remaindersContainer}>
            {reminders.length === 0 && !remindersLoading ? (
              <TextWrapper
                style={styles.remStyle}
                text="No reminders yet. Create one to stay on schedule."
                color={theme.colors.textMuted}
              />
            ) : (
              reminders.map(rem => (
                <TextWrapper
                  style={styles.remStyle}
                  key={rem._id}
                  text={rem.title}
                />
              ))
            )}
          </ScrollView>
        </View>
      </StaggerContainer>
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
  heroContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroSubtext: {
    marginTop: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  serviceItem: {
    alignItems: 'center',
    gap: 12,
  },
  serviceLabel: {
    width: 92,
    textAlign: 'center',
    lineHeight: 18,
  },
  petCardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  petCardText: {
    marginTop: 8,
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
    marginBottom: 4,
  },
  marginContainer: {
    marginTop: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadow.card,
  },
  petsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
  },
  servicesContainer: {
    marginTop: 12,
    gap: 14,
  },
  remaindersContainer: {
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 4,
  },
  addRemainderStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remStyle: {
    marginVertical: 6,
  },
  remainderTextStyle: {
    marginTop: 8,
  },
});
