import {Image, StyleSheet, View} from 'react-native';
import {TextWrapper} from './Wrappers/Text';

export function SocialMediaSignInOrSignUp({isSignup}: {isSignup?: boolean}) {
  return (
    <View style={styles.columnContainer}>
      <View style={styles.container}>
        <View style={styles.line} />
        <View>
          <TextWrapper
            style={styles.textStyle}
            text={`or ${isSignup ? 'sign up' : 'sign in'} with`}
          />
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.socialMediaFlexContainer}>
        <View style={styles.socialMediaImageContainer}>
          <Image
            source={require('../assets/SocialMedia/googleImage.png')}
            style={styles.googleImageStyle}
          />
        </View>
        <View style={styles.socialMediaImageContainer}>
          <Image
            source={require('../assets/SocialMedia/facebookImage.png')}
            style={styles.facebookImageStyle}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', marginTop: 50},
  line: {flex: 1, height: 1, backgroundColor: 'black'},
  textStyle: {width: 120, marginLeft: 10, marginRight: 10, textAlign: 'center'},
  columnContainer: {
    flexDirection: 'column',
  },
  socialMediaFlexContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginLeft: 80,
  },
  socialMediaImageContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingStart: -10,
    width: 48,
    marginTop: 20,
    marginLeft: 20,
  },
  googleImageStyle: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  facebookImageStyle: {
    width: 30,
    height: 25,
    marginLeft: 8,
  },
});
