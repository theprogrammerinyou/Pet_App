import {StyleSheet, View, Image, ImageProps, ScrollView} from 'react-native';
import {Header} from '../Header';
import {TextWrapper} from '../Wrappers/Text';
import {Rating} from '../Rating';
import {ButtonWrapper} from '../Wrappers/Button';
import {theme} from '../../constants/theme';

type Nav = {goBack: () => void};
type WalkerParam = {
  name?: string;
  rating?: number;
  reviews?: number;
  price?: number;
  location?: string;
  about?: string;
  timings?: string;
};

export function WalkerProfile({
  walkerName = 'Nikita Dutta',
  imagePath = require('../../assets/walkerProfile/young-woman-crossing-her-fingers.png'),
  walkerGender = 'Female',
  walkerAge = '27',
  walkerRating = '4.4',
  walkerReviews = '2100',
  navigation,
  route,
}: {
  walkerReviews?: string;
  walkerRating?: string;
  walkerAge?: string;
  walkerName?: string;
  imagePath?: ImageProps;
  walkerGender?: string;
  navigation?: Nav & {navigate: (screen: string, p?: object) => void};
  route?: {params?: {walker?: WalkerParam & {_id?: string}}};
}) {
  const params = route?.params?.walker;
  const name = params?.name ?? walkerName;
  const providerId = params?._id ?? '';
  const rating = params?.rating ?? (parseFloat(walkerRating) || 4.4);
  const reviews = params?.reviews ?? (parseInt(walkerReviews, 10) || 2100);
  const price = params?.price ?? 500;
  const location = params?.location ?? 'Patrika Nagar, Hyderabad';
  const about =
    params?.about ??
    'Lorem ipsum dolor sit amet consectetur. Etiam amet nibh magna rutrum duis arcu sollicitudin a ac. Egestas lobortis aenean arcu pharetra semper read more...';
  const timings = params?.timings ?? 'Mon - Sat      07:00 AM - 09:00 PM';
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Walker Profile" navigation={navigation} />
      {/* walker header */}
      <View style={[styles.flexContainer, styles.spaceEvenly]}>
        <Image source={imagePath} />
        <View style={styles.walkerDetailsContainer}>
          <TextWrapper text={name} />
          <TextWrapper text={walkerGender} />
          <TextWrapper text={`${walkerAge} yrs`} />
          <Rating ratingText={String(rating)} />
          <TextWrapper text={`(${reviews} Reviews)`} color="rgba(0,0,0,0.45)" />
        </View>
      </View>
      {/* walker details */}
      <View style={[styles.flexContainer, styles.w150]}>
        <Image source={require('../../assets/walkerProfile/location.png')} />
        <TextWrapper style={styles.locationTextStyle} text={location} />
      </View>
      {/* walker fees, experience, rating */}
      <View style={[styles.flexContainer, styles.spaceEvenly]}>
        <View style={styles.detailsContainer}>
          <TextWrapper text="Fee" />
          <TextWrapper text={`${price}/hr`} />
        </View>
        <View style={styles.detailsContainer}>
          <TextWrapper text="Experience" />
          <TextWrapper text="5 yrs" />
        </View>
        <View style={styles.detailsContainer}>
          <TextWrapper text="Reviews" />
          <Rating ratingText={String(rating)} />
        </View>
      </View>
      {/* walker about */}
      <View style={styles.aboutContainer}>
        <TextWrapper text="About" fontSize={20} />
        <TextWrapper color="rgba(0, 0, 0, 0.70)" text={about} />
      </View>
      {/* timings container */}
      <View style={styles.aboutContainer}>
        <TextWrapper text="Working Time" fontSize={20} />
        <TextWrapper color="rgba(0, 0, 0, 0.70)" text={timings} />
      </View>
      {/* appointment container */}
      <View style={styles.aboutContainer}>
        <View style={[styles.flexContainer, styles.spaceBetween]}>
          <TextWrapper fontSize={20} text="Make Appointment" />
          <TextWrapper color="rgba(0, 0, 0, 0.70)" text="<November>" />
        </View>
        <ScrollView contentContainerStyle={styles.flexContainer} horizontal>
          <View style={styles.dateContainer}>
            <TextWrapper text="Sun" />
            <TextWrapper text="10" />
          </View>
          <View style={styles.dateContainer}>
            <TextWrapper text="Mon" />
            <TextWrapper text="11" />
          </View>
          <View style={styles.dateContainer}>
            <TextWrapper text="Tue" />
            <TextWrapper text="12" />
          </View>
          <View style={styles.dateContainer}>
            <TextWrapper text="Wed" />
            <TextWrapper text="13" />
          </View>
          <View style={styles.dateContainer}>
            <TextWrapper text="Thu" />
            <TextWrapper text="14" />
          </View>
          <View style={styles.dateContainer}>
            <TextWrapper text="Fri" />
            <TextWrapper text="15" />
          </View>
          <View style={styles.dateContainer}>
            <TextWrapper text="Sat" />
            <TextWrapper text="16" />
          </View>
        </ScrollView>
        <ButtonWrapper
          title="Book Now"
          onPress={() => {
            navigation?.navigate?.('BookingForm', {
              bookingType: 'walk',
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
  },
  walkerDetailsContainer: {
    gap: 10,
  },
  flexContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  w150: {
    width: 150,
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  locationTextStyle: {
    marginTop: 20,
    letterSpacing: 0.5,
  },
  detailsContainer: {
    width: 103,
    height: 70,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutContainer: {
    gap: 10,
    marginTop: 20,
  },
  dateContainer: {
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
