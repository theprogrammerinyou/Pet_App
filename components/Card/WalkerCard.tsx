import {StyleSheet, View} from 'react-native';
import {TextWrapper} from '../Wrappers/Text';

export function WalkerCard({
  walkerName,
  walkerExp,
  walkerRate,
  walkerDistance,
}: {
  walkerName: string;
  walkerExp: string;
  walkerRate: string;
  walkerDistance: string;
}) {
  return (
    <View style={styles.walkerCardContainerStyle}>
      <TextWrapper text={walkerName} />
      <TextWrapper text={walkerExp} />
      <TextWrapper text={`${walkerRate}/hr`} />
      <TextWrapper text={walkerDistance} />
    </View>
  );
}

const styles = StyleSheet.create({
  walkerCardContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
    height: 121,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
