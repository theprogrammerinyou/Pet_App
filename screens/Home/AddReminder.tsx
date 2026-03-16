import {useState} from 'react';
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

export function AddReminder({navigation}: {navigation: any}) {
  const {user, getAuthHeaders} = useAuth();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [time, setTime] = useState('09:00');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!user?._id || user._id === 'guest') {
      setError('Sign in to add reminders');
      return;
    }
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/addReminder', {
        method: 'POST',
        body: JSON.stringify({
          userId: user._id,
          title: title.trim(),
          notes: notes.trim() || '',
          date: new Date().toISOString(),
          time: time.trim() || '09:00',
          repeat: 'none',
        }),
        getAuthHeaders: getAuthHeaders,
      });
      if (data.status === 'success') {
        navigation.goBack();
      } else {
        setError(data.message ?? 'Failed to add reminder');
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
        <Header text="Add Reminder" navigation={navigation} />
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
          placeholder="Title *"
          value={title}
          onChangeText={setTitle}
        />
        <InputWrapper
          placeholder="Time (e.g. 09:00)"
          value={time}
          onChangeText={setTime}
        />
        <InputWrapper
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
        />
        {loading ? (
          <ActivityIndicator
            color={theme.colors.primary}
            style={styles.loader}
          />
        ) : (
          <ButtonWrapper title="Add Reminder" onPress={handleAdd} />
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
