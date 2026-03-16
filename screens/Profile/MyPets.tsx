import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Header} from '../../components/Header';
import {TextWrapper} from '../../components/Wrappers/Text';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {useAuth} from '../../context/AuthContext';
import {theme} from '../../constants/theme';
import {apiRequest} from '../../services/api';

type Pet = {_id: string; name: string; category?: string; breed?: string};

export function MyPets({navigation}: {navigation: any}) {
  const {user, getAuthHeaders} = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = useCallback(async () => {
    if (!user?._id || user._id === 'guest') {
      setPets([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await apiRequest('/getPetsByUser', {
        method: 'POST',
        body: JSON.stringify({userId: user._id}),
        getAuthHeaders: getAuthHeaders,
      });
      if (data.status === 'success' && Array.isArray(data.pets)) {
        setPets(data.pets);
      } else {
        setPets([]);
      }
      setError(null);
    } catch {
      setError('Failed to load pets');
      setPets([]);
    } finally {
      setLoading(false);
    }
  }, [user?._id, getAuthHeaders]);

  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [fetchPets]),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="My Pets" navigation={navigation} />
      {user?._id === 'guest' ? (
        <TextWrapper
          text="Sign in to manage pets"
          color={theme.colors.textSecondary}
          style={styles.msg}
        />
      ) : loading ? (
        <ActivityIndicator color={theme.colors.primary} style={styles.loader} />
      ) : error ? (
        <TextWrapper
          text={error}
          color={theme.colors.error}
          style={styles.msg}
        />
      ) : pets.length === 0 ? (
        <View style={styles.empty}>
          <TextWrapper
            text="No pets yet"
            color={theme.colors.textSecondary}
            style={styles.msg}
          />
          <ButtonWrapper
            title="Add Pet"
            onPress={() => navigation.navigate('AddPet')}
            style={styles.addBtn}
          />
        </View>
      ) : (
        <>
          {pets.map(pet => (
            <View key={pet._id} style={styles.card}>
              <View style={styles.avatar}>
                <TextWrapper text="🐾" fontSize={24} />
              </View>
              <View style={styles.cardBody}>
                <TextWrapper text={pet.name} fontSize={16} />
                {pet.category || pet.breed ? (
                  <TextWrapper
                    text={
                      [pet.category, pet.breed].filter(Boolean).join(' · ') ||
                      ''
                    }
                    color={theme.colors.textSecondary}
                    fontSize={14}
                  />
                ) : null}
              </View>
            </View>
          ))}
          <ButtonWrapper
            title="Add Pet"
            onPress={() => navigation.navigate('AddPet')}
            style={styles.addBtn}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.sm,
    marginHorizontal: theme.spacing.lg,
    paddingBottom: 100,
  },
  // header spacing moved into Header component
  msg: {marginVertical: 12},
  loader: {marginVertical: 24},
  empty: {marginTop: 24},
  addBtn: {marginTop: 24},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardBody: {flex: 1},
});
