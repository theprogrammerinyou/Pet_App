import {useState, useEffect, useCallback} from 'react';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {IconButton} from '../../../components/IconButton';
import {Header} from '../../../components/Header';
import {Search} from '../../../components/Search';
import {WalkerCard} from '../../../components/Card/ProfileCard';
import {StaggerContainer} from '../../../components/Containers/StaggerContainer';
import {TextWrapper} from '../../../components/Wrappers/Text';
import {apiRequest} from '../../../services/api';
import {theme} from '../../../constants/theme';

type WalkerType = {
  _id: string;
  name: string;
  price?: number;
  rating?: number;
  reviews?: number;
  location?: string;
  gender?: 'male' | 'female';
  imageUrl?: string;
};

const MOCK_WALKERS: WalkerType[] = [
  {
    _id: 'mock1',
    name: 'Nikita Dutta',
    price: 300,
    rating: 4.4,
    reviews: 2100,
    location: 'Patrika Nagar, Hyderabad',
    gender: 'female',
    imageUrl: 'https://avatar.iran.liara.run/public/girl?username=Nikita',
  },
  {
    _id: 'mock2',
    name: 'Rahul Verma',
    price: 350,
    rating: 4.7,
    reviews: 890,
    location: 'Jubilee Hills',
    gender: 'male',
    imageUrl: 'https://avatar.iran.liara.run/public/boy?username=Rahul',
  },
  {
    _id: 'mock3',
    name: 'Sneha Patel',
    price: 280,
    rating: 4.5,
    reviews: 1200,
    location: 'Banjara Hills',
    gender: 'female',
    imageUrl: 'https://avatar.iran.liara.run/public/girl?username=Sneha',
  },
];

export function Walker({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');
  const [walkers, setWalkers] = useState<WalkerType[]>(MOCK_WALKERS);
  const [loading, setLoading] = useState(true);

  const fetchWalkers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/getWalkers', {method: 'GET'});
      if (
        data.status === 'success' &&
        Array.isArray(data.walkers) &&
        data.walkers.length > 0
      ) {
        setWalkers(data.walkers);
      }
      // else keep MOCK_WALKERS (already set as initial state)
    } catch {
      // keep mock walkers on network error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWalkers();
  }, [fetchWalkers]);

  const filtered = searchValue.trim()
    ? walkers.filter(w =>
        w.name?.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : walkers;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Find a Walker" navigation={navigation} />
      <View style={styles.headerFlexContainer}>
        <Search
          searchValue={searchValue}
          width={280}
          height={52}
          onSearchValueChange={setSearchValue}
        />
        <IconButton
          containerWidth={52}
          containerHeight={52}
          backgroundColor={theme.colors.surface}
          borderColor={theme.colors.borderLight}
          imagePath={require('../../../assets/utils/filterIcon.png')}
          borderRadius={16}
          marginTop={0}
        />
      </View>
      <TextWrapper
        text="Book trusted walkers for daily exercise and happy tails."
        color={theme.colors.textSecondary}
        fontSize={theme.typography.caption}
        style={styles.subtitle}
      />
      {loading ? (
        <ActivityIndicator color={theme.colors.primary} style={styles.loader} />
      ) : (
        <StaggerContainer style={styles.walkerCardContainer}>
          {filtered.map(w => (
            <WalkerCard
              key={w._id}
              walkerName={w.name}
              walkerExp={`${w.reviews ?? 0} reviews`}
              walkerRate={`₹${w.price ?? 0}`}
              walkerDistance={w.location ?? '—'}
              imageUrl={w.imageUrl}
              onPress={() => navigation.navigate('walkerProfile', {walker: w})}
            />
          ))}
        </StaggerContainer>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing.sm,
    paddingBottom: 180,
    marginHorizontal: 24,
    backgroundColor: theme.colors.backgroundWarm,
  },
  headerFlexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  walkerCardContainer: {
    gap: 16,
  },
  loader: {marginVertical: 24},
});
