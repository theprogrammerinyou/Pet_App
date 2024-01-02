import {
  StyleSheet,
  View,
  Platform,
  Image,
  ImageProps,
  ScrollView,
} from 'react-native';
import {Header} from '../Header';
import {TextWrapper} from '../Wrappers/Text';
import {Rating} from '../Rating';
import {ButtonWrapper} from '../Wrappers/Button';

export function WalkerProfile({
  walkerName = 'Nikita Dutta',
  imagePath = require('../../assets/walkerProfile/young-woman-crossing-her-fingers.png'),
  walkerGender = 'Female',
  walkerAge = '27',
  walkerRating = '4.4',
  walkerReviews = '2100',
}: {
  walkerReviews: string;
  walkerRating: string;
  walkerAge: string;
  walkerName: string;
  imagePath: ImageProps;
  walkerGender: string;
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Walker Profile" />
      {/* walker header */}
      <View style={[styles.flexContainer, styles.spaceEvenly]}>
        <Image source={imagePath} />
        <View style={styles.walkerDetailsContainer}>
          <TextWrapper text={walkerName} />
          <TextWrapper text={walkerGender} />
          <TextWrapper text={`${walkerAge} yrs`} />
          <Rating ratingText={walkerRating} />
          <TextWrapper
            text={`(${walkerReviews} Reviews)`}
            color="rgba(0,0,0,0.45)"
          />
        </View>
      </View>
      {/* walker details */}
      <View style={[styles.flexContainer, styles.w150]}>
        <Image source={require('../../assets/walkerProfile/location.png')} />
        <TextWrapper
          style={styles.locationTextStyle}
          text="Patrika Nagar, Hyderabad"
        />
      </View>
      {/* walker fees, experience, rating */}
      <View style={[styles.flexContainer, styles.spaceEvenly]}>
        <View style={styles.detailsContainer}>
          <TextWrapper text="Fee" />
          <TextWrapper text="500/hr" />
        </View>
        <View style={styles.detailsContainer}>
          <TextWrapper text="Experience" />
          <TextWrapper text="5 yrs" />
        </View>
        <View style={styles.detailsContainer}>
          <TextWrapper text="Reviews" />
          <Rating ratingText={walkerRating} />
        </View>
      </View>
      {/* walker about */}
      <View style={styles.aboutContainer}>
        <TextWrapper text="About" fontSize={20} />
        <TextWrapper
          color="rgba(0, 0, 0, 0.70)"
          text="Lorem ipsum dolor sit amet consectetur. Etiam amet nibh magna rutrum duis arcu sollicitudin a ac. Egestas lobortis aenean arcu pharetra semper read more..."
        />
      </View>
      {/* timings container */}
      <View style={styles.aboutContainer}>
        <TextWrapper text="Working Time" fontSize={20} />
        <TextWrapper
          color="rgba(0, 0, 0, 0.70)"
          text="Mon - Sat &nbsp; &nbsp; &nbsp; 07:00 AM - 09:00 PM"
        />
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
        <ButtonWrapper title="Book Now" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 20,
    marginRight: 20,
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
