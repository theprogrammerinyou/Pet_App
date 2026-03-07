import {Platform} from 'react-native';

// Use your machine IP for Android emulator, or localhost for iOS simulator / device with same network
const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === 'android' ? 'http://10.0.2.2:3500' : 'http://localhost:3500';
  }
  return 'https://your-api.com'; // Replace with production API URL
};

export const API_BASE_URL = getBaseUrl();
