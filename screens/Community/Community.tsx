import {ScrollView, StyleSheet, Platform} from 'react-native';
import {useState} from 'react';
import {Search} from '../../components/Search';
import {Header} from '../../components/Header';

export function Community() {
  const [searchValue, setSearchValue] = useState('');

  const onSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Pet Community" />
      <Search
        height={40}
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 20,
    marginRight: 20,
  },
  headerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 70,
  },
});
