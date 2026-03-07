import {useState, useEffect, useCallback} from 'react';
import {ScrollView, StyleSheet, View, Platform, ActivityIndicator} from 'react-native';
import {IconButton} from '../../../components/IconButton';
import {Header} from '../../../components/Header';
import {Search} from '../../../components/Search';
import {WalkerCard} from '../../../components/Card/ProfileCard';
import {apiRequest} from '../../../services/api';
import {theme} from '../../../constants/theme';

type WalkerType = { _id: string; name: string; price?: number; rating?: number; reviews?: number; location?: string };

const MOCK_WALKERS: WalkerType[] = [
  { _id: 'mock1', name: 'Nikita Dutta', price: 300, rating: 4.4, reviews: 2100, location: 'Patrika Nagar, Hyderabad' },
  { _id: 'mock2', name: 'Rahul Verma', price: 350, rating: 4.7, reviews: 890, location: 'Jubilee Hills' },
  { _id: 'mock3', name: 'Sneha Patel', price: 280, rating: 4.5, reviews: 1200, location: 'Banjara Hills' },
];

export function Walker({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');
  const [walkers, setWalkers] = useState<WalkerType[]>(MOCK_WALKERS);
  const [loading, setLoading] = useState(true);

  const fetchWalkers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/getWalkers', { method: 'GET' });
      if (data.status === 'success' && Array.isArray(data.walkers) && data.walkers.length > 0) {
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
    ? walkers.filter((w) => w.name?.toLowerCase().includes(searchValue.toLowerCase()))
    : walkers;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Walker" navigation={navigation} />
      <View style={styles.headerFlexContainer}>
        <Search
          searchValue={searchValue}
          width={280}
          height={40}
          onSearchValueChange={setSearchValue}
        />
        <IconButton
          containerWidth={45}
          containerHeight={40}
          borderColor={theme.colors.border}
          imagePath={require('../../../assets/utils/filterIcon.png')}
          borderRadius={12}
          marginTop={18}
        />
      </View>
      {loading ? (
        <ActivityIndicator color={theme.colors.primary} style={styles.loader} />
      ) : (
        <View style={styles.walkerCardContainer}>
          {filtered.map((w) => (
            <WalkerCard
              key={w._id}
              onPress={() => navigation.navigate('walkerProfile', {walker: w})}
              walkerName={w.name ?? 'Walker'}
              walkerExp={`${w.rating ?? 0} ★`}
              walkerRate={`₹${w.price ?? 0}`}
              walkerDistance={w.location?.split(',')[0] ?? '—'}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: Platform.OS === 'ios' ? 0 : 50,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: theme.colors.backgroundWarm,
  },
  headerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  walkerCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 100,
  },
  loader: { marginVertical: 24 },
});
