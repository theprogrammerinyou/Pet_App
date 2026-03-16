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

type Boarding = {
  _id: string;
  name: string;
  rating?: number;
  reviews?: number;
  pricePerDay?: number;
  location?: string;
  amenities?: string;
};

const MOCK_BOARDING: Boarding[] = [
  {
    _id: 'b1',
    name: 'Happy Tails Boarding',
    rating: 4.7,
    reviews: 210,
    pricePerDay: 600,
    location: 'Gachibowli',
    amenities: 'AC, Play area',
  },
  {
    _id: 'b2',
    name: 'Pet Paradise Stay',
    rating: 4.9,
    reviews: 380,
    pricePerDay: 900,
    location: 'Jubilee Hills',
    amenities: '24/7 care, Cam',
  },
  {
    _id: 'b3',
    name: 'Paw Haven',
    rating: 4.5,
    reviews: 120,
    pricePerDay: 450,
    location: 'Secunderabad',
    amenities: 'Outdoor space',
  },
  {
    _id: 'b4',
    name: 'Comfy Kennels',
    rating: 4.6,
    reviews: 95,
    pricePerDay: 550,
    location: 'Madhapur',
    amenities: 'Vet on call',
  },
];

export function PetBoarding({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');
  const filtered = searchValue.trim()
    ? MOCK_BOARDING.filter(b =>
        b.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : MOCK_BOARDING;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Header text="Pet Boarding" navigation={navigation} />
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
        text="Safe and comfortable boarding for your pet when you're away."
        color={theme.colors.textSecondary}
        fontSize={theme.typography.caption}
        style={styles.subtitle}
      />
      <View style={styles.cardList}>
        {filtered.map((b, index) => (
          <StaggerContainer key={b._id} index={index}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('boardingProfile', {boarding: b})
              }>
              <View style={styles.cardTop}>
                <View style={styles.avatar}>
                  <Image
                    source={require('../../../assets/Home/petBoarding.png')}
                    style={styles.avatarImg}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardInfo}>
                  <TextWrapper
                    text={b.name}
                    fontSize={theme.typography.subtitle}
                    fontWeight="700"
                  />
                  <TextWrapper
                    text={b.amenities ?? 'Boarding'}
                    color={theme.colors.textSecondary}
                    fontSize={theme.typography.caption}
                    style={styles.serviceText}
                  />
                  <View style={styles.meta}>
                    <TextWrapper
                      text={`${b.rating ?? 0} ★`}
                      fontSize={12}
                      color={theme.colors.gold}
                      fontWeight="bold"
                    />
                    <TextWrapper
                      text={b.location ?? '—'}
                      color={theme.colors.textMuted}
                      fontSize={12}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <TextWrapper
                  text={`₹${b.pricePerDay ?? 0}`}
                  fontSize={theme.typography.title}
                  fontWeight="800"
                  color={theme.colors.primary}
                />
                <TextWrapper
                  text="/ day"
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
