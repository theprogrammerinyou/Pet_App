import {Image, View, StyleSheet} from 'react-native';
import {TextWrapper} from './Wrappers/Text';

export function Rating({ratingText = 4.4}: {ratingText: string | number}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/walker/rating.png')} />
      <TextWrapper text={ratingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});
