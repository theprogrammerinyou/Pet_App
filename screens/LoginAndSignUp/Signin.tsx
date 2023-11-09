import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {InputWrapper} from '../../components/Wrappers/Input';
import {useState} from 'react';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {SocialMediaSignInOrSignUp} from '../../components/SocialMediaSignInorSignUp';

export function Login({navigation}: {navigation: any}) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const onUserDataChange = ({value, type}: {value: string; type: string}) => {
    setUserData({...userData, [type]: value});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('loginOrSignup')}>
        <View style={styles.backButtonStyle}>
          <Image source={require('../../assets/utils/backButton.png')} />
        </View>
      </TouchableOpacity>
      <View>
        <TextWrapper style={styles.headingStyle} text="Welcome!" />
        <TextWrapper text="Sign in to continue" />
      </View>
      <View style={styles.inputContainerStyle}>
        <InputWrapper
          placeholder="E-mail"
          onChangeText={e =>
            onUserDataChange({value: e?.target?.value, type: 'email'})
          }
          value={userData.email}
        />
        <InputWrapper
          placeholder="Password"
          onChangeText={e =>
            onUserDataChange({value: e?.target?.value, type: 'password'})
          }
          type="password"
          value={userData.email}
        />
        <TouchableOpacity style={styles.forgotPasswordStyle}>
          <TextWrapper text="Forgot Password?" />
        </TouchableOpacity>
        <ButtonWrapper
          onPress={() => navigation.navigate('home')}
          title="Sign in"
        />
        <SocialMediaSignInOrSignUp />
        <View style={styles.signUpContainer}>
          <TextWrapper text="Don't have an account?" />
          <TouchableOpacity
            style={styles.signUpText}
            onPress={() => navigation.navigate('signup')}>
            <TextWrapper text="Sign up" color="#CB93A5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  backButtonStyle: {
    borderRadius: 50,
    borderColor: '#CB93A5',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headingStyle: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainerStyle: {
    paddingVertical: 30,
    marginTop: 100,
  },
  forgotPasswordStyle: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  signUpContainer: {
    marginTop: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signUpText: {
    marginLeft: 5,
  },
});
