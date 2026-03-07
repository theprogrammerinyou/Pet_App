import {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {InputWrapper} from '../../components/Wrappers/Input';
import {ButtonWrapper} from '../../components/Wrappers/Button';

export function EditNumber({navigation}: {navigation: any}) {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleMobileNumberChange = (value: string) => {
    setMobileNumber(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('mobileVerification')}>
        <View style={styles.backButtonStyle}>
          <Image source={require('../../assets/utils/backButton.png')} />
        </View>
      </TouchableOpacity>
      <TextWrapper
        style={styles.headingStyle}
        fontSize={26}
        text="Edit Number"
      />
      <View style={styles.flexContainerStyle}>
        <View style={styles.openLockContainer}>
          <Image
            source={require('../../assets/LoginAndSignup/openLock.png')}
            style={styles.openLockStyle}
          />
        </View>
        <TextWrapper fontSize={20} text="Mobile Number" />
        <InputWrapper
          value={mobileNumber}
          style={styles.mobileNumberInputStyle}
          onChangeText={e => handleMobileNumberChange(e?.target?.value)}
          placeholder="+91 9166365861"
        />
      </View>
      <View style={styles.buttonStyle}>
        <ButtonWrapper
          onPress={() => navigation.navigate('mobileVerification')}
          title="Send OTP"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
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
    marginTop: 20,
    marginLeft: 5,
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
  openLockStyle: {
    width: 50,
    height: 68,
  },
  flexContainerStyle: {
    alignItems: 'center',
    marginTop: 50,
  },
  mobileNumberInputStyle: {
    width: 200,
    textAlign: 'center',
  },
  buttonStyle: {
    marginTop: 100,
    marginLeft: 10,
  },
});
