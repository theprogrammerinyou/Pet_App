import {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton} from '../../../components/IconButton';
import {Header} from '../../../components/Header';
import {Search} from '../../../components/Search';

export function Walker() {
  const [searchValue, setSearchValue] = useState('');
  const onSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Walker" />
      <View style={styles.headerFlexContainer}>
        <Search
          searchValue={searchValue}
          width={280}
          onSearchValueChange={onSearchValueChange}
        />
        <IconButton
          containerWidth={45}
          containerHeight={40}
          borderColor="rgba(0, 0, 0, 0.20)"
          imagePath={require('../../../assets/utils/filterIcon.png')}
          borderRadius={12}
          marginTop={18}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  headerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
