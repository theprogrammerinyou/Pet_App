import {StyleSheet, View, ScrollView} from 'react-native';
import {Header} from '../Header';
import {TextWrapper} from '../Wrappers/Text';
import {Rating} from '../Rating';
import {ButtonWrapper} from '../Wrappers/Button';
import {theme} from '../../constants/theme';

type BoardingParam = {
  name?: string;
  rating?: number;
  reviews?: number;
  pricePerDay?: number;
  location?: string;
  amenities?: string;
};

export function BoardingProfile({
  navigation,
  route,
}: {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, p?: object) => void;
  };
  route?: {params?: {boarding?: BoardingParam & {_id?: string}}};
}) {
  const b = route?.params?.boarding;
  const name = b?.name ?? 'Happy Tails Boarding';
  const providerId = b?._id ?? '';
  const rating = b?.rating ?? 4.7;
  const reviews = b?.reviews ?? 210;
  const pricePerDay = b?.pricePerDay ?? 600;
  const location = b?.location ?? 'Gachibowli, Hyderabad';
  const amenities = b?.amenities ?? 'AC, Play area, 24/7 care';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Boarding Profile" navigation={navigation} />
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <TextWrapper text="🏠" fontSize={32} />
          </View>
          <View style={styles.headerInfo}>
            <TextWrapper text={name} fontSize={theme.typography.subtitle} />
            <Rating ratingText={String(rating)} />
            <TextWrapper
              text={`${reviews} reviews`}
              color={theme.colors.textMuted}
              fontSize={theme.typography.caption}
            />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <TextWrapper
          text="Location"
          fontSize={theme.typography.body}
          style={styles.label}
        />
        <TextWrapper
          text={location}
          color={theme.colors.textSecondary}
          fontSize={theme.typography.body}
        />
      </View>
      <View style={styles.section}>
        <TextWrapper
          text="Amenities"
          fontSize={theme.typography.body}
          style={styles.label}
        />
        <TextWrapper
          text={amenities}
          color={theme.colors.textSecondary}
          fontSize={theme.typography.body}
        />
      </View>
      <View style={styles.section}>
        <TextWrapper
          text="Price"
          fontSize={theme.typography.body}
          style={styles.label}
        />
        <TextWrapper
          text={`₹${pricePerDay} per day`}
          color={theme.colors.primary}
          fontSize={theme.typography.subtitle}
        />
      </View>
      <View style={styles.section}>
        <TextWrapper
          text="About"
          fontSize={theme.typography.body}
          style={styles.label}
        />
        <TextWrapper
          color={theme.colors.textSecondary}
          fontSize={theme.typography.body}
          text="A safe and loving environment for your pet while you're away. Our staff is trained in pet care and we provide regular updates and photos."
        />
      </View>
      <View style={styles.buttonWrap}>
        <ButtonWrapper
          title="Book Stay"
          onPress={() => {
            navigation?.navigate?.('BookingForm', {
              bookingType: 'boarding',
              providerId,
              providerName: name,
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.sm,
    marginHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {flex: 1},
  buttonWrap: {
    marginTop: theme.spacing.xl,
  },
});
