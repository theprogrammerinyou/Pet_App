import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import {TextWrapper} from '../../components/Wrappers/Text';
import {theme} from '../../constants/theme';

const {height} = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function SplashScreen({navigation}: {navigation: any}) {
  const pawOpacity = useSharedValue(0);
  const pawScale = useSharedValue(0.8);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);
  const skipOpacity = useSharedValue(0);

  useEffect(() => {
    pawOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    pawScale.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.back(1.2)),
    });
    contentOpacity.value = withDelay(300, withTiming(1, {duration: 600}));
    contentTranslateY.value = withDelay(
      300,
      withTiming(0, {duration: 500, easing: Easing.out(Easing.cubic)}),
    );
    skipOpacity.value = withDelay(200, withTiming(1, {duration: 400}));
  }, [contentOpacity, contentTranslateY, pawOpacity, pawScale, skipOpacity]);

  const pawAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pawOpacity.value,
    transform: [{scale: pawScale.value}],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{translateY: contentTranslateY.value}],
  }));

  const skipAnimatedStyle = useAnimatedStyle(() => ({
    opacity: skipOpacity.value,
  }));

  return (
    <SafeAreaView
      style={[styles.safe, {backgroundColor: theme.colors.primary}]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Animated.View style={pawAnimatedStyle}>
            <Image
              source={require('../../assets/Splash/paw.png')}
              style={styles.pawImg}
            />
          </Animated.View>
          <AnimatedTouchable
            style={[styles.skipBtn, skipAnimatedStyle]}
            onPress={() => navigation.navigate('loginOrSignup')}
            activeOpacity={0.8}>
            <TextWrapper style={styles.skipText} text="Skip" />
          </AnimatedTouchable>
        </View>
        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          <Image
            style={styles.dogImage}
            source={require('../../assets/Splash/brownDog.png')}
          />
          <TextWrapper style={styles.heading} text="Welcome to Paw Mantra" />
          <TextWrapper
            style={styles.subtext}
            text="Your pet's well-being is our top priority. From grooming to boarding, we offer comprehensive care for your furry friends."
            color="rgba(0,0,0,0.85)"
          />
        </Animated.View>
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => navigation.navigate('loginOrSignup')}
          activeOpacity={0.8}>
          <Image source={require('../../assets/Splash/rightArrow.png')} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  container: {flex: 1},
  scrollContent: {minHeight: height, paddingBottom: 40},
  header: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pawImg: {width: 48, height: 48},
  skipBtn: {padding: 8},
  skipText: {fontSize: 18, fontWeight: '600'},
  content: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 24,
  },
  dogImage: {width: 280, height: 280, marginBottom: 16},
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  arrowBtn: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 14,
    marginRight: 24,
    marginTop: 32,
  },
});
