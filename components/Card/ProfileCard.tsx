import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextWrapper} from '../Wrappers/Text';

export function WalkerCard({
  walkerName,
  walkerExp,
  walkerRate,
  walkerDistance,
  onPress,
}: {
  walkerName: string;
  walkerExp: string;
  walkerRate: string;
  walkerDistance: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.walkerCardContainerStyle}>
      <TouchableOpacity onPress={onPress} style={styles.cardImgStyles}>
        <Image source={require('../../assets/walker/girlHeart.png')} />
      </TouchableOpacity>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../assets/walker/rating.png')}
          style={styles.imageStyle}
        />
        <TextWrapper text="4.4" />
        <Image
          source={require('../../assets/walker/emptyHeart.png')}
          style={styles.imageStyle}
        />
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.cardContentContainer}>
          <TextWrapper
            text={walkerName}
            style={styles.textStyle}
            color="#554D41"
          />
          <TextWrapper
            text={walkerExp}
            style={styles.textStyle}
            color="#554D41"
          />
          <TextWrapper
            text={`${walkerRate}/hr`}
            style={styles.textStyle}
            color="#554D41"
          />
          <TextWrapper
            text={walkerDistance}
            style={styles.textStyle}
            color="#554D41"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  walkerCardContainerStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: 137,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 80,
    marginRight: 20,
    marginLeft: 10,
  },
  cardImgStyles: {
    width: 75,
    height: 75,
    position: 'absolute',
    top: -50,
    zIndex: 1,
  },
  cardContentContainer: {
    marginTop: 10,
    marginLeft: -5,
  },
  textStyle: {
    marginBottom: 3,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 60,
    marginTop: -10,
  },
  imageStyle: {
    marginLeft: 5,
  },
});
