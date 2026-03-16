import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StaggerContainer} from '../../components/AnimatedView';
import {Header} from '../../components/Header';
import {Search} from '../../components/Search';
import {TextWrapper} from '../../components/Wrappers/Text';
import {theme} from '../../constants/theme';

const MOCK_VETS = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    spec: 'General & Surgery',
    exp: '12 yrs',
    rating: '4.8',
    fee: '₹500',
    distance: '2 km',
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    spec: 'Dental & Skin',
    exp: '8 yrs',
    rating: '4.6',
    fee: '₹450',
    distance: '5 km',
  },
  {
    id: '3',
    name: 'Dr. Anitha Reddy',
    spec: 'Emergency Care',
    exp: '15 yrs',
    rating: '4.9',
    fee: '₹600',
    distance: '3 km',
  },
];

export function Doctor({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
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
        {MOCK_VETS.map((vet, index) => (
          <StaggerContainer key={vet.id} index={index}>
            <TouchableOpacity style={styles.card} activeOpacity={0.8}>
              <View style={styles.cardTop}>
                <View style={styles.avatar}>
                  <Image
                    source={require('../../assets/Home/veterinary.png')}
                    style={styles.avatarImg}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardInfo}>
                  <TextWrapper
                    text={vet.name}
                    fontSize={theme.typography.subtitle}
                    fontWeight="700"
                  />
                  <TextWrapper
                    text={vet.spec}
                    color={theme.colors.textSecondary}
                    fontSize={theme.typography.caption}
                    style={styles.specText}
                  />
                  <View style={styles.meta}>
                    <TextWrapper
                      text={`${vet.rating} ★`}
                      fontSize={12}
                      color={theme.colors.gold}
                      fontWeight="bold"
                    />
                    <TextWrapper
                      text={`${vet.distance}`}
                      color={theme.colors.textMuted}
                      fontSize={12}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <TextWrapper
                  text={vet.fee}
                  fontSize={theme.typography.title}
                  fontWeight="800"
                  color={theme.colors.primary}
                />
                <TextWrapper
                  text="/ consultation"
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
  specText: {
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
