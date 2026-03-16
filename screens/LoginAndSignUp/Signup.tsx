import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {InputWrapper} from '../../components/Wrappers/Input';
import {useState} from 'react';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {SocialMediaSignInOrSignUp} from '../../components/SocialMediaSignInorSignUp';
import {useAuth} from '../../context/AuthContext';
import {theme} from '../../constants/theme';

export function Signup({navigation}: {navigation: any}) {
  const {signup} = useAuth();
  const [userDetails, setuserDetails] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onUserDataChange = ({value, type}: {value: string; type: string}) => {
    setError(null);
    setuserDetails(prev => ({...prev, [type]: value}));
  };

  const handleSignUp = async () => {
    if (!userDetails.fullName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!userDetails.email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (userDetails.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    const result = await signup({
      fullName: userDetails.fullName.trim(),
      emailId: userDetails.email.trim(),
      password: userDetails.password,
      contactNumber: userDetails.phoneNumber || '0',
    });
    setLoading(false);
    if (result.success) {
      // Auth state update will switch to main app (MainTabs)
    } else {
      setError(result.error || 'Sign up failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('loginOrSignup')}>
            <View style={styles.backButtonStyle}>
              <Image source={require('../../assets/utils/backButton.png')} />
            </View>
          </TouchableOpacity>
          <View>
            <TextWrapper style={styles.headingStyle} text="Hi!" />
            <TextWrapper
              text="Create an account"
              color={theme.colors.textSecondary}
            />
          </View>
          {error ? (
            <View style={styles.errorBox}>
              <TextWrapper
                text={error}
                color={theme.colors.error}
                fontSize={14}
              />
            </View>
          ) : null}
          <View style={styles.inputContainerStyle}>
            <InputWrapper
              placeholder="Full Name"
              onChangeText={text =>
                onUserDataChange({value: text, type: 'fullName'})
              }
              value={userDetails.fullName}
            />
            <InputWrapper
              placeholder="E-mail"
              onChangeText={text =>
                onUserDataChange({value: text, type: 'email'})
              }
              value={userDetails.email}
            />
            <InputWrapper
              placeholder="Phone Number"
              onChangeText={text =>
                onUserDataChange({value: text, type: 'phoneNumber'})
              }
              value={userDetails.phoneNumber}
            />
            <InputWrapper
              placeholder="Password (min 6 characters)"
              onChangeText={text =>
                onUserDataChange({value: text, type: 'password'})
              }
              type="password"
              value={userDetails.password}
            />
            <InputWrapper
              placeholder="Confirm Password"
              onChangeText={text =>
                onUserDataChange({value: text, type: 'confirmPassword'})
              }
              type="password"
              value={userDetails.confirmPassword}
            />
            {loading ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.primary}
                style={styles.loader}
              />
            ) : (
              <ButtonWrapper onPress={handleSignUp} title="Sign up" />
            )}
            <SocialMediaSignInOrSignUp isSignup />
            <View style={styles.signUpContainer}>
              <TextWrapper text="Already have an account?" />
              <TouchableOpacity
                style={styles.signUpText}
                onPress={() => navigation.navigate('login')}>
                <TextWrapper text="Sign in" color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  scrollContent: {flexGrow: 1},
  container: {
    margin: 30,
  },
  errorBox: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(198, 40, 40, 0.1)',
    borderRadius: 8,
  },
  loader: {marginTop: 24},
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
