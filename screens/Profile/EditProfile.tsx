import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {Header} from '../../components/Header';
import {TextWrapper} from '../../components/Wrappers/Text';
import {InputWrapper} from '../../components/Wrappers/Input';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {useAuth} from '../../context/AuthContext';
import {theme} from '../../constants/theme';
import {apiRequest} from '../../services/api';

export function EditProfile({navigation}: {navigation: any}) {
  const {user, getAuthHeaders, refreshUser} = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [contactNumber, setContactNumber] = useState(user?.contactNumber ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFullName(user?.fullName ?? '');
    setContactNumber(user?.contactNumber ?? '');
  }, [user]);

  const handleSave = async () => {
    if (!user?._id || user._id === 'guest') {
      setError('Guest cannot update profile');
      return;
    }
    if (!fullName.trim()) {
      setError('Name is required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/updateUser', {
        method: 'PATCH',
        body: JSON.stringify({
          fullName: fullName.trim(),
          contactNumber: contactNumber.trim(),
        }),
        getAuthHeaders: getAuthHeaders,
      });
      if (data.status === 'success') {
        await refreshUser();
        navigation.goBack();
      } else {
        setError(data.message ?? 'Update failed');
      }
    } catch (e: any) {
      setError(e?.message ?? 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <Header text="Edit Profile" navigation={navigation} />
        {error ? (
          <View style={styles.errorBox}>
            <TextWrapper
              text={error}
              color={theme.colors.error}
              fontSize={14}
            />
          </View>
        ) : null}
        <InputWrapper
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <InputWrapper
          placeholder="Email (read-only)"
          value={user?.emailId ?? ''}
          onChangeText={() => {}}
        />
        <InputWrapper
          placeholder="Phone Number"
          value={contactNumber}
          onChangeText={setContactNumber}
        />
        {loading ? (
          <ActivityIndicator
            color={theme.colors.primary}
            style={styles.loader}
          />
        ) : (
          <ButtonWrapper title="Save" onPress={handleSave} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    paddingTop: theme.spacing.sm,
    marginHorizontal: theme.spacing.lg,
    paddingBottom: 40,
  },
  // header spacing moved into Header component

  errorBox: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'rgba(198, 40, 40, 0.1)',
    borderRadius: 8,
  },
  loader: {marginTop: 24},
});
