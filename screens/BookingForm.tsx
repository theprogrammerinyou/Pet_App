import {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextWrapper} from '../components/Wrappers/Text';
import {InputWrapper} from '../components/Wrappers/Input';
import {ButtonWrapper} from '../components/Wrappers/Button';
import {Header} from '../components/Header';
import {useAuth} from '../context/AuthContext';
import {apiRequest} from '../services/api';
import {theme} from '../constants/theme';

type Pet = { _id: string; name: string; category?: string };

export function BookingForm({navigation, route}: {navigation: any; route: any}) {
  const {user, getAuthHeaders} = useAuth();
  const params = route?.params ?? {};
  const bookingType = params.bookingType ?? 'walk';
  const providerId = params.providerId ?? '';
  const providerName = params.providerName ?? '';

  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [petId, setPetId] = useState('');
  const [petName, setPetName] = useState('');
  const [notes, setNotes] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = useCallback(async () => {
    if (!user?._id || user._id === 'guest') {
      setPets([]);
      setLoadingPets(false);
      return;
    }
    setLoadingPets(true);
    try {
      const data = await apiRequest('/getPetsByUser', {
        method: 'POST',
        body: JSON.stringify({}),
        getAuthHeaders: getAuthHeaders,
      });
      if (data.status === 'success' && Array.isArray(data.pets)) {
        setPets(data.pets);
        if (data.pets.length > 0 && !petId) {
          setPetId(data.pets[0]._id);
          setPetName(data.pets[0].name);
        }
      }
    } catch {
      setPets([]);
    } finally {
      setLoadingPets(false);
    }
  }, [user?._id, getAuthHeaders]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  useEffect(() => {
    const d = new Date();
    setDate(d.toISOString().split('T')[0]);
  }, []);

  const handleSubmit = async () => {
    if (!user?._id || user._id === 'guest') {
      setError('Please sign in to book.');
      return;
    }
    if (!date.trim()) {
      setError('Please enter a date.');
      return;
    }
    if (!time.trim()) {
      setError('Please enter a time.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const data = await apiRequest('/addBooking', {
        method: 'POST',
        body: JSON.stringify({
          bookingType,
          providerId,
          providerName,
          date: date.trim(),
          time: time.trim(),
          petId: petId || undefined,
          petName: petName || undefined,
          notes: notes.trim() || undefined,
        }),
        getAuthHeaders: getAuthHeaders,
      });
      if (data.status === 'success') {
        Alert.alert(
          'Booking Confirmed',
          'Your booking has been saved. The provider will confirm shortly.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        setError(data.message ?? 'Booking failed');
      }
    } catch (e: any) {
      setError(e?.message ?? 'Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header text="Book Appointment" navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <TextWrapper
          text={`Booking with ${providerName}`}
          fontSize={theme.typography.caption}
          color={theme.colors.textSecondary}
          style={styles.subtitle}
        />

        <TextWrapper text="Date" fontSize={theme.typography.body} style={styles.label} />
        <InputWrapper
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        <TextWrapper text="Time" fontSize={theme.typography.body} style={styles.label} />
        <InputWrapper
          placeholder="e.g. 09:00"
          value={time}
          onChangeText={setTime}
          style={styles.input}
        />

        <TextWrapper text="Pet" fontSize={theme.typography.body} style={styles.label} />
        {loadingPets ? (
          <ActivityIndicator size="small" color={theme.colors.primary} style={styles.petLoader} />
        ) : pets.length === 0 ? (
          <View style={styles.petRow}>
            <InputWrapper
              placeholder="Pet name (optional)"
              value={petName}
              onChangeText={setPetName}
              style={styles.input}
            />
          </View>
        ) : (
          <View style={styles.petList}>
            {pets.map((p) => (
              <TouchableOpacity
                key={p._id}
                style={[styles.petChip, petId === p._id && styles.petChipActive]}
                onPress={() => {
                  setPetId(p._id);
                  setPetName(p.name);
                }}>
                <TextWrapper
                  text={p.name}
                  fontSize={theme.typography.body}
                  color={petId === p._id ? theme.colors.surface : theme.colors.text}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TextWrapper text="Notes (optional)" fontSize={theme.typography.body} style={styles.label} />
        <InputWrapper
          placeholder="Any special requests..."
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, styles.notesInput]}
        />

        {error ? (
          <TextWrapper text={error} color={theme.colors.error} fontSize={theme.typography.caption} style={styles.err} />
        ) : null}

        <ButtonWrapper
          title={submitting ? 'Booking...' : 'Confirm Booking'}
          onPress={handleSubmit}
          style={styles.btn}
          backgroundColor={theme.colors.primary}
        />
        {submitting && <ActivityIndicator color={theme.colors.primary} style={styles.loader} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundWarm,
  },
  scroll: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 100,
  },
  subtitle: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  notesInput: {
    minHeight: 80,
    paddingTop: 12,
  },
  petLoader: {
    marginVertical: theme.spacing.sm,
  },
  petRow: {
    marginTop: 4,
  },
  petList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: 4,
  },
  petChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  petChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  err: {
    marginTop: theme.spacing.sm,
  },
  btn: {
    marginTop: theme.spacing.xl,
  },
  loader: {
    marginTop: theme.spacing.sm,
  },
});
