import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header} from '../../components/Header';
import {Search} from '../../components/Search';
import {TextWrapper} from '../../components/Wrappers/Text';
import {theme} from '../../constants/theme';

const MOCK_VETS = [
  { id: '1', name: 'Dr. Priya Sharma', spec: 'General & Surgery', exp: '12 yrs', rating: '4.8', fee: '₹500', distance: '2 km' },
  { id: '2', name: 'Dr. Rajesh Kumar', spec: 'Dental & Skin', exp: '8 yrs', rating: '4.6', fee: '₹450', distance: '5 km' },
  { id: '3', name: 'Dr. Anitha Reddy', spec: 'Emergency Care', exp: '15 yrs', rating: '4.9', fee: '₹600', distance: '3 km' },
];

export function Doctor({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Header text="Find a Vet" navigation={navigation} />
      <View style={styles.searchRow}>
        <Search
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          height={40}
          width={280}
        />
      </View>
      <TextWrapper
        text="Book appointments with trusted veterinarians near you."
        color={theme.colors.textSecondary}
        fontSize={theme.typography.caption}
        style={styles.subtitle}
      />
      <View style={styles.cardList}>
        {MOCK_VETS.map((vet) => (
          <TouchableOpacity key={vet.id} style={styles.card} activeOpacity={0.8}>
            <View style={styles.cardLeft}>
              <View style={styles.avatar}>
                <Image
                  source={require('../../assets/Home/veterinary.png')}
                  style={styles.avatarImg}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.cardInfo}>
                <TextWrapper text={vet.name} fontSize={theme.typography.body} />
                <TextWrapper
                  text={vet.spec}
                  color={theme.colors.textSecondary}
                  fontSize={theme.typography.caption}
                />
                <View style={styles.meta}>
                  <TextWrapper text={`${vet.rating} ★`} fontSize={12} />
                  <TextWrapper text={`${vet.distance}`} color={theme.colors.textMuted} fontSize={12} />
                </View>
              </View>
            </View>
            <View style={styles.cardRight}>
              <TextWrapper text={vet.fee} fontSize={theme.typography.caption} />
              <TextWrapper text="Consultation" color={theme.colors.textMuted} fontSize={10} />
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
  cardInfo: {
    flex: 1,
  },
  meta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
});
