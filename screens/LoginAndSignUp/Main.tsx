import {View, Text, StyleSheet} from 'react-native';

export function Main() {
  return (
    <View style={styles.headingStyle}>
      <Text>Main</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headingStyle: {
    flex: 1,
    fontSize: 36,
    fontWeight: 'bold',
    width: 169,
    height: 90,
  },
});
