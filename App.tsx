/* eslint-disable react/no-unstable-nested-components */
/**
 * Pet App – Paw Mantra
 * @format
 */

import React from 'react';
import {
  Image,
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthProvider, useAuth} from './context/AuthContext';
import {theme} from './constants/theme';

import SplashScreen from './screens/SplashScreens/SplashScreen';
import {Main} from './screens/LoginAndSignUp/Main';
import {Login} from './screens/LoginAndSignUp/Signin';
import {Signup} from './screens/LoginAndSignUp/Signup';
import {MobileVerification} from './screens/LoginAndSignUp/MobileVerification';
import {EditNumber} from './screens/LoginAndSignUp/EditNumber';
import {Home} from './screens/Home/Home';
import {Community} from './screens/Community/Community';
import {Location} from './screens/Track/Location';
import {Doctor} from './screens/Doctor/Doctor';
import {Profile} from './screens/Profile/Profile';
import {EditProfile} from './screens/Profile/EditProfile';
import {MyPets} from './screens/Profile/MyPets';
import {AddPet} from './screens/Profile/AddPet';
import {Walker} from './screens/Home/Walker/Walker';
import {PetGrooming} from './screens/Home/Grooming/PetGrooming';
import {PetBoarding} from './screens/Home/Boarding/PetBoarding';
import {AddReminder} from './screens/Home/AddReminder';
import {WalkerProfile} from './components/Profile/WalkerProfile';
import {GroomerProfile} from './components/Profile/GroomerProfile';
import {BoardingProfile} from './components/Profile/BoardingProfile';
import {BookingForm} from './screens/BookingForm';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="homeTab" component={Home} />
      <Stack.Screen name="petWalker" component={Walker} />
      <Stack.Screen name="petGrooming" component={PetGrooming} />
      <Stack.Screen name="petBoarding" component={PetBoarding} />
      <Stack.Screen name="veterinary" component={Doctor} />
      <Stack.Screen name="walkerProfile" component={WalkerProfile} />
      <Stack.Screen name="groomerProfile" component={GroomerProfile} />
      <Stack.Screen name="boardingProfile" component={BoardingProfile} />
      <Stack.Screen name="BookingForm" component={BookingForm} />
      <Stack.Screen name="AddReminder" component={AddReminder} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileMain" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyPets" component={MyPets} />
      <Stack.Screen name="AddPet" component={AddPet} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="splashScreen">
      <Stack.Screen name="splashScreen" component={SplashScreen} />
      <Stack.Screen name="loginOrSignup" component={Main} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="mobileVerification" component={MobileVerification} />
      <Stack.Screen name="editNumber" component={EditNumber} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          height: Platform.OS === 'ios' ? 96 : 76,
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,
          paddingTop: 12,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.08,
          shadowRadius: 8,
          borderTopWidth: 1,
          borderTopColor: theme.colors.borderLight,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}>
      <Tabs.Screen
        name="home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('./assets/TabBar/focussedHome.png')
                  : require('./assets/TabBar/home.png')
              }
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        component={Community}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('./assets/TabBar/focussedCommunity.png')
                  : require('./assets/TabBar/community.png')
              }
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        component={Location}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('./assets/TabBar/focussedLocation.png')
                  : require('./assets/TabBar/location.png')
              }
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="doctor"
        component={Doctor}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('./assets/TabBar/focussedDoctor.png')
                  : require('./assets/TabBar/doctor.png')
              }
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('./assets/TabBar/focussedProfile.png')
                  : require('./assets/TabBar/profile.png')
              }
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function RootNavigator() {
  const {isSignedIn, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return isSignedIn ? <MainTabs /> : <AuthStack />;
}

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.flex}>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  tabIcon: {
    width: 28,
    height: 28,
  },
});

export default App;
