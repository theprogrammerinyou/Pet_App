import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header} from '../../../components/Header';
import {Search} from '../../../components/Search';
import {IconButton} from '../../../components/IconButton';
import {TextWrapper} from '../../../components/Wrappers/Text';
import {theme} from '../../../constants/theme';

type Groomer = {
  _id: string;
  name: string;
  rating?: number;
  reviews?: number;
  price?: number;
  location?: string;
  services?: string;
};

const MOCK_GROOMERS: Groomer[] = [
  { _id: 'g1', name: 'Paws & Claws Salon', rating: 4.8, reviews: 320, price: 800, location: 'Jubilee Hills', services: 'Bath, Trim, Nail' },
  { _id: 'g2', name: 'Fluffy Tails Grooming', rating: 4.6, reviews: 180, price: 650, location: 'Banjara Hills', services: 'Full grooming, Spa' },
  { _id: 'g3', name: 'Pet Spa Studio', rating: 4.9, reviews: 450, price: 1200, location: 'Madhapur', services: 'Premium care' },
  { _id: 'g4', name: 'Happy Paws Groomers', rating: 4.5, reviews: 95, price: 500, location: 'Secunderabad', services: 'Bath, Brush' },
];

export function PetGrooming({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');
  const filtered = searchValue.trim()
    ? MOCK_GROOMERS.filter((g) =>
        g.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : MOCK_GROOMERS;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Header text="Pet Grooming" navigation={navigation} />
      <View style={styles.searchRow}>
        <Search
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          height={40}
          width={280}
        />
        <IconButton
          containerWidth={45}
          containerHeight={40}
          borderColor={theme.colors.border}
          imagePath={require('../../../assets/utils/filterIcon.png')}
          borderRadius={12}
          marginTop={0}
        />
      </View>
      <TextWrapper
        text="Book a grooming session for your pet. Bath, trim, nail clipping and more."
        color={theme.colors.textSecondary}
        fontSize={theme.typography.caption}
        style={styles.subtitle}
      />
      <View style={styles.cardList}>
        {filtered.map((g) => (
          <TouchableOpacity
            key={g._id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('groomerProfile', {groomer: g})}>
            <View style={styles.cardLeft}>
              <View style={styles.avatar}>
                <Image
                  source={require('../../../assets/Home/petGrooming.png')}
                  style={styles.avatarImg}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.cardInfo}>
                <TextWrapper text={g.name} fontSize={theme.typography.body} />
                <TextWrapper
                  text={g.services ?? 'Grooming'}
                  color={theme.colors.textSecondary}
                  fontSize={theme.typography.caption}
                />
                <View style={styles.meta}>
                  <TextWrapper text={`${g.rating ?? 0} ★`} fontSize={12} />
                  <TextWrapper text={`${g.reviews ?? 0} reviews`} color={theme.colors.textMuted} fontSize={12} />
                </View>
              </View>
            </View>
            <View style={styles.cardRight}>
              <TextWrapper text={`₹${g.price ?? 0}`} fontSize={theme.typography.caption} />
              <TextWrapper text="Session" color={theme.colors.textMuted} fontSize={10} />
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
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: theme.colors.backgroundWarm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: theme.spacing.lg,
  },
  cardList: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    ...theme.shadow.card,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.backgroundWarm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImg: {
    width: 40,
    height: 40,
  },
  cardInfo: { flex: 1 },
  meta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  cardRight: { alignItems: 'flex-end' },
});
