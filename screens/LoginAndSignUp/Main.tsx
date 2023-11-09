import {View, StyleSheet, Image} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {ButtonWrapper} from '../../components/Wrappers/Button';

export function Main({navigation}: {navigation: any}) {
  return (
    <View style={styles.containerStyle}>
      <View>
        <Image source={require('../../assets/Splash/paw.png')} />
      </View>
      <View style={styles.flexContainer}>
        <TextWrapper text="Hello,     Pet Parent" style={styles.textStyle} />
        <Image
          style={styles.imageStyle}
          source={require('../../assets/Splash/coupleWithPet.png')}
        />
        <ButtonWrapper
          title="Sign in"
          onPress={() => navigation.navigate('login')}
          style={styles.signUpStyle}
        />
        <ButtonWrapper
          title="Create an Account"
          color="#000"
          style={styles.createAccountStyle}
          backgroundColor="#fff"
          onPress={() => navigation.navigate('signup')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 30,
    marginTop: 30,
  },
  flexContainer: {
    marginTop: 30,
    display: 'flex',
  },
  textStyle: {
    fontSize: 36,
    color: '#000',
    width: 180,
    height: 90,
  },
  imageStyle: {
    marginTop: 50,
    marginLeft: 50,
    width: 300,
    height: 350,
  },
  viewStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpStyle: {
    marginTop: 50,
  },
  createAccountStyle: {
    marginTop: 20,
  },
});
