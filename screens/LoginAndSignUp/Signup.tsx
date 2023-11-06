import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {InputWrapper} from '../../components/Wrappers/Input';
import {useState} from 'react';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {SocialMediaSignInOrSignUp} from '../../components/SocialMediaSignInorSignUp';

export function Signup({navigation}: {navigation: any}) {
  const [userDetails, setuserDetails] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    confirmPassword: '',
  });

  const onUserDataChange = ({value, type}: {value: string; type: string}) => {
    setuserDetails({...userDetails, [type]: value});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('loginOrSignup')}>
        <View style={styles.backButtonStyle}>
          <Image source={require('../../assets/backButton.png')} />
        </View>
      </TouchableOpacity>
      <View>
        <TextWrapper style={styles.headingStyle} text="Hi!" />
        <TextWrapper text="Create an account" />
      </View>
      <View style={styles.inputContainerStyle}>
        <InputWrapper
          placeholder="Full Name"
          onChangeText={e =>
            onUserDataChange({value: e?.target?.value, type: 'fullName'})
          }
          value={userDetails.fullName}
        />
        <InputWrapper
          placeholder="E-mail"
          onChangeText={e =>
            onUserDataChange({value: e?.target?.value, type: 'email'})
          }
          value={userDetails.email}
        />
        <InputWrapper
          placeholder="Phone Number"
          onChangeText={e =>
            onUserDataChange({value: e?.target?.value, type: 'phoneNumber'})
          }
          value={userDetails.phoneNumber}
        />
        <InputWrapper
          placeholder="Password"
          onChangeText={e =>
            onUserDataChange({value: e?.target?.value, type: 'password'})
          }
          type="password"
          value={userDetails.password}
        />
        <InputWrapper
          placeholder="Confirm Password"
          onChangeText={e =>
            onUserDataChange({value: e?.target?.value, type: 'confirmPassword'})
          }
          type="password"
          value={userDetails.confirmPassword}
        />
        <ButtonWrapper
          onPress={() => navigation.navigate('')}
          title="Sign up"
        />
        <SocialMediaSignInOrSignUp isSignup />
        <View style={styles.signUpContainer}>
          <TextWrapper text="Already have an account?" />
          <TouchableOpacity
            style={styles.signUpText}
            onPress={() => navigation.navigate('')}>
            <TextWrapper text="Sign in" color="#CB93A5" />
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
