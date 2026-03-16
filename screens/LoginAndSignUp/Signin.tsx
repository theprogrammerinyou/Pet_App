import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {InputWrapper} from '../../components/Wrappers/Input';
import {useState} from 'react';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {SocialMediaSignInOrSignUp} from '../../components/SocialMediaSignInorSignUp';
import {useAuth} from '../../context/AuthContext';
import {theme} from '../../constants/theme';

export function Login({navigation}: {navigation: any}) {
  const {login} = useAuth();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onUserDataChange = ({value, type}: {value: string; type: string}) => {
    setError(null);
    setUserData(prev => ({...prev, [type]: value}));
  };

  const handleSignIn = async () => {
    if (!userData.email.trim() || !userData.password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    setError(null);
    const result = await login(userData.email.trim(), userData.password);
    setLoading(false);
    if (result.success) {
      // Auth state update will switch to main app (MainTabs)
    } else {
      setError(result.error || 'Sign in failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('loginOrSignup')}>
          <View style={styles.backButtonStyle}>
            <Image source={require('../../assets/utils/backButton.png')} />
          </View>
        </TouchableOpacity>
        <View>
          <TextWrapper style={styles.headingStyle} text="Welcome!" />
          <TextWrapper
            text="Sign in to continue"
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
            placeholder="E-mail"
            onChangeText={text =>
              onUserDataChange({value: text, type: 'email'})
            }
            value={userData.email}
          />
          <InputWrapper
            placeholder="Password"
            onChangeText={text =>
              onUserDataChange({value: text, type: 'password'})
            }
            type="password"
            value={userData.password}
          />
          <TouchableOpacity style={styles.forgotPasswordStyle}>
            <TextWrapper text="Forgot Password?" color={theme.colors.primary} />
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.primary}
              style={styles.loader}
            />
          ) : (
            <ButtonWrapper onPress={handleSignIn} title="Sign in" />
          )}
          <SocialMediaSignInOrSignUp />
          <View style={styles.signUpContainer}>
            <TextWrapper text="Don't have an account?" />
            <TouchableOpacity
              style={styles.signUpText}
              onPress={() => navigation.navigate('signup')}>
              <TextWrapper text="Sign up" color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
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
