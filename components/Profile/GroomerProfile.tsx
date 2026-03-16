import {StyleSheet, View, ScrollView} from 'react-native';
import {Header} from '../Header';
import {TextWrapper} from '../Wrappers/Text';
import {Rating} from '../Rating';
import {ButtonWrapper} from '../Wrappers/Button';
import {theme} from '../../constants/theme';

type GroomerParam = {
  name?: string;
  rating?: number;
  reviews?: number;
  price?: number;
  location?: string;
  services?: string;
};

export function GroomerProfile({
  navigation,
  route,
}: {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, p?: object) => void;
  };
  route?: {params?: {groomer?: GroomerParam & {_id?: string}}};
}) {
  const g = route?.params?.groomer;
  const name = g?.name ?? 'Paws & Claws Salon';
  const providerId = g?._id ?? '';
  const rating = g?.rating ?? 4.8;
  const reviews = g?.reviews ?? 320;
  const price = g?.price ?? 800;
  const location = g?.location ?? 'Jubilee Hills, Hyderabad';
  const services = g?.services ?? 'Bath, Trim, Nail clipping';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Groomer Profile" navigation={navigation} />
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <TextWrapper text="✂️" fontSize={32} />
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
          text="Services"
          fontSize={theme.typography.body}
          style={styles.label}
        />
        <TextWrapper
          text={services}
          color={theme.colors.textSecondary}
          fontSize={theme.typography.body}
        />
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
          text="Price"
          fontSize={theme.typography.body}
          style={styles.label}
        />
        <TextWrapper
          text={`₹${price} per session`}
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
          text="Professional pet grooming with care. We use safe, pet-friendly products and offer a stress-free experience for your furry friend."
        />
      </View>
      <View style={styles.buttonWrap}>
        <ButtonWrapper
          title="Book Appointment"
          onPress={() => {
            navigation?.navigate?.('BookingForm', {
              bookingType: 'grooming',
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
