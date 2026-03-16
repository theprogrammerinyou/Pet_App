import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StaggerContainer} from '../../../components/AnimatedView';
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
  {
    _id: 'g1',
    name: 'Paws & Claws Salon',
    rating: 4.8,
    reviews: 320,
    price: 800,
    location: 'Jubilee Hills',
    services: 'Bath, Trim, Nail',
  },
  {
    _id: 'g2',
    name: 'Fluffy Tails Grooming',
    rating: 4.6,
    reviews: 180,
    price: 650,
    location: 'Banjara Hills',
    services: 'Full grooming, Spa',
  },
  {
    _id: 'g3',
    name: 'Pet Spa Studio',
    rating: 4.9,
    reviews: 450,
    price: 1200,
    location: 'Madhapur',
    services: 'Premium care',
  },
  {
    _id: 'g4',
    name: 'Happy Paws Groomers',
    rating: 4.5,
    reviews: 95,
    price: 500,
    location: 'Secunderabad',
    services: 'Bath, Brush',
  },
];

export function PetGrooming({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');
  const filtered = searchValue.trim()
    ? MOCK_GROOMERS.filter(g =>
        g.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : MOCK_GROOMERS;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
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
        {filtered.map((g, index) => (
          <StaggerContainer key={g._id} index={index}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('groomerProfile', {groomer: g})
              }>
              <View style={styles.cardTop}>
                <View style={styles.avatar}>
                  <Image
                    source={require('../../../assets/Home/petGrooming.png')}
                    style={styles.avatarImg}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardInfo}>
                  <TextWrapper
                    text={g.name}
                    fontSize={theme.typography.subtitle}
                    fontWeight="700"
                  />
                  <TextWrapper
                    text={g.services ?? 'Grooming'}
                    color={theme.colors.textSecondary}
                    fontSize={theme.typography.caption}
                    style={styles.serviceText}
                  />
                  <View style={styles.meta}>
                    <TextWrapper
                      text={`${g.rating ?? 0} ★`}
                      fontSize={12}
                      color={theme.colors.gold}
                      fontWeight="bold"
                    />
                    <TextWrapper
                      text={`${g.reviews ?? 0} reviews`}
                      color={theme.colors.textMuted}
                      fontSize={12}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <TextWrapper
                  text={`₹${g.price ?? 0}`}
                  fontSize={theme.typography.title}
                  fontWeight="800"
                  color={theme.colors.primary}
                />
                <TextWrapper
                  text="/ session"
                  color={theme.colors.textMuted}
                  fontSize={12}
                />
              </View>
            </TouchableOpacity>
          </StaggerContainer>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing.sm,
    marginHorizontal: 24,
    paddingBottom: 180,
    backgroundColor: theme.colors.backgroundWarm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  cardList: {
    gap: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
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
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImg: {
    width: 40,
    height: 40,
  },
  cardInfo: {flex: 1},
  serviceText: {
    marginTop: 4,
  },
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
