/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Image, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import {Walker} from './screens/Home/Walker/Walker';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WalkerProfile} from './components/Profile/WalkerProfile';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs(): JSX.Element {
  const isSignedIn = true;
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isSignedIn && (
        <>
          <Stack.Screen name="splashScreen" component={SplashScreen} />
          <Stack.Screen name="loginOrSignup" component={Main} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen
            name="mobileVerification"
            component={MobileVerification}
          />
          <Stack.Screen name="editNumber" component={EditNumber} />
        </>
      )}
      <Stack.Screen name="homeTab" component={Home} />
      <Stack.Screen name="petWalker" component={Walker} />
      <Stack.Screen name="walkerProfile" component={WalkerProfile} />
    </Stack.Navigator>
  );
}

function App(): JSX.Element {
  const isSignedIn = true;
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabel() {
            return null;
          },
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: '#F9F9F9',
            height: Platform.OS === 'ios' ? 100 : 70,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            elevation: 0,
          },
        }}>
        {isSignedIn && (
          <>
            <Tabs.Screen
              name="home"
              component={HomeTabs}
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? require('./assets/TabBar/focussedHome.png')
                        : require('./assets/TabBar/home.png')
                    }
                  />
                ),
              }}
            />
            <Tabs.Screen
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? require('./assets/TabBar/focussedCommunity.png')
                        : require('./assets/TabBar/community.png')
                    }
                  />
                ),
              }}
              name="community"
              component={Community}
            />
            <Tabs.Screen
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? require('./assets/TabBar/focussedLocation.png')
                        : require('./assets/TabBar/location.png')
                    }
                  />
                ),
              }}
              name="location"
              component={Location}
            />
            <Tabs.Screen
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? require('./assets/TabBar/focussedDoctor.png')
                        : require('./assets/TabBar/doctor.png')
                    }
                  />
                ),
              }}
              name="doctor"
              component={Doctor}
            />
            <Tabs.Screen
              options={{
                tabBarIcon: ({focused}) => (
                  <Image
                    source={
                      focused
                        ? require('./assets/TabBar/focussedProfile.png')
                        : require('./assets/TabBar/profile.png')
                    }
                  />
                ),
              }}
              name="profile"
              component={Profile}
            />
          </>
        )}
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default App;
