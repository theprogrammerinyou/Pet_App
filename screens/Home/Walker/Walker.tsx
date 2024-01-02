import {useState} from 'react';
import {ScrollView, StyleSheet, View, Platform} from 'react-native';
import {IconButton} from '../../../components/IconButton';
import {Header} from '../../../components/Header';
import {Search} from '../../../components/Search';
import {WalkerCard} from '../../../components/Card/ProfileCard';

export function Walker({navigation}: {navigation: any}) {
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
          height={40}
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
      <View style={styles.walkerCardContainer}>
        {Array.from({length: 10}).map((_, index) => (
          <WalkerCard
            key={index}
            onPress={() => navigation.navigate('walkerProfile')}
            walkerName="Nikita Dutta"
            walkerExp="4 yrs"
            walkerRate="₹300"
            walkerDistance="11 km"
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: Platform.OS === 'ios' ? 0 : 50,
    marginLeft: 20,
    marginRight: 20,
  },
  headerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  walkerCardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
