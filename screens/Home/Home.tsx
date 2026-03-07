import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {IconButton} from '../../components/IconButton';
import {useState, useCallback, useEffect} from 'react';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {Search} from '../../components/Search';
import {StaggerContainer} from '../../components/AnimatedView';
import {theme} from '../../constants/theme';
import {useAuth} from '../../context/AuthContext';
import {apiRequest} from '../../services/api';

type Pet = { _id: string; name: string; category?: string };
type Reminder = { _id: string; title: string; time?: string };

const petsServices = [
  { name: 'Pet Grooming', id: 1, screenName: 'petGrooming', icon: require('../../assets/Home/petGrooming.png') },
  { name: 'Pet Walker', id: 2, screenName: 'petWalker', icon: require('../../assets/Home/petWalking.png') },
  { name: 'Pet Boarding', id: 3, screenName: 'petBoarding', icon: require('../../assets/Home/petBoarding.png') },
  { name: 'Veterinary', id: 4, screenName: 'veterinary', icon: require('../../assets/Home/veterinary.png') },
];

const petsShop = [
  { name: 'Food', icon: require('../../assets/Home/food.png') },
  { name: 'Accessories', icon: require('../../assets/Home/accessories.png') },
];

export function Home({navigation}: {navigation: any}) {
  const {user, getAuthHeaders} = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [petsLoading, setPetsLoading] = useState(false);
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
        body: JSON.stringify({ userId: user._id }),
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
        body: JSON.stringify({ userId: user._id }),
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
    return () => { unsub?.(); };
  }, [navigation, fetchReminders, fetchPets]);

  const goToAddPet = () => {
    (navigation.getParent?.() as any)?.navigate?.('profile', { screen: 'AddPet' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <StaggerContainer index={0}>
        <View style={styles.headerFlexContainer}>
          <IconButton
            imagePath={require('../../assets/Home/hamburger.png')}
            containerWidth={40}
            containerHeight={40}
          />
          <TextWrapper fontSize={18} text="Pet Care" />
          <IconButton
            imagePath={require('../../assets/Home/notification.png')}
            containerWidth={40}
            containerHeight={40}
          />
        </View>
      </StaggerContainer>
      <StaggerContainer index={1}>
        <View style={styles.searchAndFilterContainer}>
          <Search
            searchValue={searchValue}
            width={260}
            height={40}
            onSearchValueChange={setSearchValue}
          />
          <IconButton
            borderColor={theme.colors.border}
            imagePath={require('../../assets/utils/filterIcon.png')}
            containerWidth={40}
            containerHeight={40}
            borderRadius={10}
            marginTop={0}
          />
        </View>
      </StaggerContainer>
      <StaggerContainer index={2}>
      <View style={styles.marginContainer}>
        <TextWrapper fontSize={16} text="My Pets" style={styles.sectionTitle} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.petsContainer}>
          {pets.slice(0, 3).map((pet) => (
            <IconButton
              key={pet._id}
              imagePath={require('../../assets/Home/dog.png')}
              containerWidth={52}
              containerHeight={52}
              backgroundColor={theme.colors.primary}
            />
          ))}
          <IconButton
            imagePath={require('../../assets/Home/addIcon.png')}
            containerWidth={52}
            containerHeight={52}
            backgroundColor={theme.colors.primary}
            onPress={goToAddPet}
          />
        </ScrollView>
      </View>
      </StaggerContainer>
      <StaggerContainer index={3}>
      <View style={styles.marginContainer}>
        <TextWrapper fontSize={16} text="Services" style={styles.sectionTitle} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesContainer}>
          {petsServices.map(({name, screenName, icon}, index) => (
            <View key={index} style={styles.serviceItem}>
              <IconButton
                imagePath={icon}
                containerWidth={52}
                containerHeight={52}
                borderRadius={12}
                onPress={() => navigation.navigate(screenName)}
                borderColor={theme.colors.primary}
              />
              <TextWrapper text={name} fontSize={12} color={theme.colors.textSecondary} />
            </View>
          ))}
        </ScrollView>
      </View>
      </StaggerContainer>
      <StaggerContainer index={4}>
      <View style={styles.marginContainer}>
        <TextWrapper fontSize={16} text="Shop" style={styles.sectionTitle} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.petsContainer}>
          {petsShop.map(({name, icon}, index) => (
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
            title="Add Reminder"
            backgroundColor={theme.colors.surface}
            color={theme.colors.primary}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.remaindersContainer}>
          {reminders.length === 0 && !remindersLoading ? (
            <TextWrapper style={styles.remStyle} text="No reminders yet" color={theme.colors.textMuted} />
          ) : (
            reminders.map((rem) => (
              <TextWrapper style={styles.remStyle} key={rem._id} text={rem.title} />
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
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 120,
    backgroundColor: theme.colors.backgroundWarm,
  },
  sectionTitle: {
    marginBottom: 4,
    fontWeight: '600',
  },
  serviceItem: {
    alignItems: 'center',
    gap: 4,
  },
  headerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  marginContainer: {
    marginTop: 14,
    marginLeft: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginRight: 10,
    ...theme.shadow.card,
  },
  petsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
  },
  servicesContainer: {
    marginTop: 10,
    gap: 14,
  },
  remaindersContainer: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  addRemainderStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remStyle: {
    margin: 10,
  },
  remainderTextStyle: {
    marginTop: 8,
  },
});
