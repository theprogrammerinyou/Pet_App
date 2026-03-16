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

export function AddPet({navigation}: {navigation: any}) {
  const {user, getAuthHeaders} = useAuth();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [breed, setBreed] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!user?._id || user._id === 'guest') {
      setError('Sign in to add pets');
      return;
    }
    if (!name.trim()) {
      setError('Pet name is required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/addPet', {
        method: 'POST',
        body: JSON.stringify({
          userId: user._id,
          name: name.trim(),
          category: category.trim() || undefined,
          breed: breed.trim() || undefined,
        }),
        getAuthHeaders: getAuthHeaders,
      });
      if (data.status === 'success') {
        navigation.goBack();
      } else {
        setError(data.message ?? 'Failed to add pet');
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
        <Header text="Add Pet" navigation={navigation} />
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
          placeholder="Pet name *"
          value={name}
          onChangeText={setName}
        />
        <InputWrapper
          placeholder="Category (e.g. Dog, Cat)"
          value={category}
          onChangeText={setCategory}
        />
        <InputWrapper
          placeholder="Breed"
          value={breed}
          onChangeText={setBreed}
        />
        {loading ? (
          <ActivityIndicator
            color={theme.colors.primary}
            style={styles.loader}
          />
        ) : (
          <ButtonWrapper title="Add Pet" onPress={handleAdd} />
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
