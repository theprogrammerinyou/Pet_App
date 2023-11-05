import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextWrapper} from '../../components/Wrapper/Text';

const {height} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const navigateToLoginOrSignup = () => {
    navigation.navigate('LoginOrSignup');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <Image source={require('./assets/paw.png')} />
          <TouchableOpacity>
            <TextWrapper style={styles.skipText} text="Skip" />
          </TouchableOpacity>
        </View>
        <View style={styles.viewStyle}>
          <Image
            style={styles.imageStyle}
            source={require('./assets/brownDog.png')}
          />
          <TextWrapper
            style={styles.headingStyle}
            text="Welcome to Paw Mantra"
          />
          <TextWrapper
            style={styles.textStyle}
            text="Your pet’s well-being is our top priority. From grooming to
            boarding, we offer comprehensive care for your furry friends."
          />
        </View>
        <TouchableOpacity onPress={navigateToLoginOrSignup}>
          <View style={styles.arrowStyle}>
            <Image source={require('./assets/rightArrow.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5C634',
    height,
  },
  skipText: {
    fontSize: 20,
    fontWeight: '400',
  },
  viewStyle: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingStyle: {fontSize: 20, fontWeight: 'bold', marginTop: 50},
  imageStyle: {
    marginLeft: 30,
    width: 300,
    height: 300,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    width: 320,
    marginTop: 20,
  },
  arrowStyle: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 50,
    width: 30,
    marginTop: 90,
  },
});

export default SplashScreen;
