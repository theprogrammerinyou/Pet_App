import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import {TextWrapper} from '../../components/Wrappers/Text';
import {IconButton} from '../../components/IconButton';
import {useState} from 'react';
import {ButtonWrapper} from '../../components/Wrappers/Button';
import {Search} from '../../components/Search';

const myPets = [
  {
    icon: {uri: require('../../assets/Home/dog.png')},
  },
  {
    icon: {uri: require('../../assets/Home/cat.png')},
  },
  {
    icon: {uri: require('../../assets/Home/addIcon.png')},
  },
];

const petsServices = [
  {
    name: 'Pet Grooming',
    id: 1,
    screenName: 'petGrooming',
    icon: {uri: require('../../assets/Home/petGrooming.png')},
  },
  {
    name: 'Pet Walker',
    id: 2,
    screenName: 'petWalker',
    icon: {uri: require('../../assets/Home/petWalking.png')},
  },
  {
    name: 'Pet Boarding',
    id: 3,
    screenName: 'petBoarding',
    icon: {uri: require('../../assets/Home/petBoarding.png')},
  },
  {
    name: 'Veterinary',
    id: 4,
    screenName: 'veterinary',
    icon: {uri: require('../../assets/Home/veterinary.png')},
  },
];

const petsShop = [
  {
    name: 'Food',
    icon: {uri: require('../../assets/Home/food.png')},
  },
  {
    name: 'Accessories',
    icon: {uri: require('../../assets/Home/accessories.png')},
  },
];

const reminders = [
  {
    name: 'Reminder 1',
    id: 1,
  },
  {
    name: 'Reminder 2',
    id: 2,
  },
  {
    name: 'Reminder 3',
    id: 3,
  },
  {
    name: 'Reminder 4',
    id: 4,
  },
  {
    name: 'Reminder 5',
    id: 5,
  },
  {
    name: 'Reminder 6',
    id: 6,
  },
  {
    name: 'Reminder 7',
    id: 7,
  },
];

export function Home({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');

  const onSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerFlexContainer}>
        <IconButton imagePath={require('../../assets/Home/hamburger.png')} />
        <TextWrapper fontSize={24} text="Pet Care" />
        <IconButton imagePath={require('../../assets/Home/notification.png')} />
      </View>
      <View style={styles.searchAndFilterContainer}>
        <Search
          searchValue={searchValue}
          width={280}
          height={45}
          onSearchValueChange={onSearchValueChange}
        />
        <IconButton
          borderColor="rgba(0, 0, 0, 0.20)"
          imagePath={require('../../assets/utils/filterIcon.png')}
          borderRadius={12}
          marginTop={18}
        />
      </View>
      <View style={styles.marginContainer}>
        <TextWrapper fontSize={24} text="My Pets" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.petsContainer}>
          {myPets.map(({icon}, index) => (
            <IconButton
              key={index}
              imagePath={icon.uri}
              containerWidth={80}
              containerHeight={80}
              backgroundColor="#CB93A5"
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.marginContainer}>
        <TextWrapper fontSize={24} text="Services" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesContainer}>
          {petsServices.map(({name, screenName, icon}, index) => (
            <View key={index}>
              <IconButton
                imagePath={icon.uri}
                containerWidth={80}
                containerHeight={80}
                borderRadius={12}
                onPress={() => navigation.navigate(screenName)}
                borderColor="#CB93A5"
              />
              <TextWrapper text={name} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.marginContainer}>
        <TextWrapper fontSize={24} text="Shop" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.petsContainer}>
          {petsShop.map(({icon}, index) => (
            <IconButton
              key={index}
              imagePath={icon.uri}
              containerWidth={80}
              containerHeight={80}
              backgroundColor="#CB93A5"
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.marginContainer}>
        <View style={styles.addRemainderStyle}>
          <TextWrapper
            style={styles.remainderTextStyle}
            fontSize={24}
            text="Reminders"
          />
          <ButtonWrapper
            onPress={() => {}}
            width={153}
            height={50}
            title="Add Remainder"
            backgroundColor="#fff"
            color="#CB93A5"
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.remaindersContainer}>
          {reminders.map(rem => (
            <TextWrapper style={styles.remStyle} key={rem.id} text={rem.name} />
          ))}
        </ScrollView>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  marginContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  petsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  servicesContainer: {
    marginTop: 20,
    gap: 20,
  },
  remaindersContainer: {
    flexDirection: 'column',
    marginBottom: 100,
  },
  addRemainderStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remStyle: {
    margin: 10,
  },
  remainderTextStyle: {
    marginTop: 20,
  },
});
