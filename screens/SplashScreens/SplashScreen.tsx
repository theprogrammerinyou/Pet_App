import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {height} = Dimensions.get('window');

const SplashScreen = ({navigation}: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.flexContainer}>
            <Image source={require('../../assets/Splash/paw.png')} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('loginOrSignup');
              }}>
              <TextWrapper style={styles.skipText} text="Skip" />
            </TouchableOpacity>
          </View>
          <View style={styles.viewStyle}>
            <Image
              style={styles.imageStyle}
              source={require('../../assets/Splash/brownDog.png')}
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('loginOrSignup');
            }}>
            <View style={styles.arrowStyle}>
              <Image source={require('../../assets/Splash/rightArrow.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5C634',
    height,
  },
  contentContainer: {
    marginTop: 20,
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
    marginTop: 60,
  },
});

export default SplashScreen;
