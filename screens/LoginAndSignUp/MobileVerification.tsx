import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {InputWrapper} from '../../components/Wrappers/Input';
import {useState} from 'react';
import {ButtonWrapper} from '../../components/Wrappers/Button';

export function MobileVerification({navigation}: {navigation: any}) {
  const [otp, setOTP] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  });

  const onOTPEntered = ({value, index}: {value: string; index: number}) => {
    setOTP({...otp, [index]: value});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <View style={styles.backButtonStyle}>
          <Image source={require('../../assets/utils/backButton.png')} />
        </View>
      </TouchableOpacity>
      <TextWrapper
        style={styles.headingStyle}
        fontSize={26}
        text="Verification"
      />
      <View style={styles.flexContainerStyle}>
        <View style={styles.openLockContainer}>
          <Image
            source={require('../../assets/LoginAndSignup/openLock.png')}
            style={styles.openLockStyle}
          />
        </View>
        <TextWrapper fontSize={24} text="Verification Code" />
        <TextWrapper
          color="rgba(92, 87, 79, 0.70)"
          style={styles.textStyle}
          text="Enter the 6 digit code sent on your registered mobile number"
        />
        <View style={styles.phoneNumberStyle}>
          <TextWrapper text="+91 9166365861" />
          <TouchableOpacity onPress={() => navigation.navigate('editNumber')}>
            <TextWrapper color="#CB93A5" text="Edit" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.otpContainerStyle}>
        {Object.keys(otp).map((_: any, index: number) => (
          <View key={index}>
            <InputWrapper
              value={otp[index]}
              onChangeText={e => onOTPEntered({value: e?.target?.value, index})}
              style={styles.otpInputStyle}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.resendOTPStyle}>
        <TextWrapper text="Resend OTP" color="#CB93A5" />
      </TouchableOpacity>
      <ButtonWrapper
        onPress={() => navigation.navigate('home')}
        title="Submit"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  openLockContainer: {
    width: 100,
    height: 100,
    borderRadius: 18,
    marginTop: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(92, 87, 79, 0.50)',
    alignItems: 'center',
    marginBottom: 20,
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  openLockStyle: {
    width: 50,
    height: 68,
  },
  textStyle: {
    width: 250,
    marginTop: 20,
    textAlign: 'center',
  },
  flexContainerStyle: {
    alignItems: 'center',
    marginTop: 50,
  },
  phoneNumberStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 5,
  },
  otpInputStyle: {
    width: 50,
    height: 50,
    borderColor: 'rgba(92, 87, 79, 0.50)',
    borderWidth: 1,
  },
  otpContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  resendOTPStyle: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
});
