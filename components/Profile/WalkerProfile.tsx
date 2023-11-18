import {StyleSheet, View, Platform, Image, ImageProps} from 'react-native';
import {Header} from '../Header';
import {TextWrapper} from '../Wrappers/Text';

export function WalkerProfile({
  walkerName,
  imagePath,
  walkerGender,
  walkerAge,
  walkerRating,
  walkerReviews,
}: {
  walkerReviews: string;
  walkerRating: string;
  walkerAge: string;
  walkerName: string;
  imagePath: ImageProps;
  walkerGender: string;
}) {
  return (
    <View style={styles.container}>
      <Header text="Walker Profile" />
      <View style={styles.walkerProfileContainer}>
        <Image source={imagePath} />
        <View style={styles.walkerDetailsContainer}>
          <TextWrapper text={walkerName} />
          <TextWrapper text={walkerGender} />
          <TextWrapper text={`${walkerAge} yrs`} />
          <TextWrapper text={walkerRating} />
          <TextWrapper
            text={`(${walkerReviews} Reviews)`}
            color="rgba(0,0,0,0.45)"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 20,
    marginRight: 20,
  },
  walkerProfileContainer: {},
  walkerDetailsContainer: {},
});
