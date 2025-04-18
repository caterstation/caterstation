import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import LoginType from './LoginType';
import Otp from './Otp';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthNav = () => {
  const Stack = createStackNavigator();
  const [isPhoneNumberExists, setIsPhoneNumberExists] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkPhoneNumber = async () => {
      try {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (phoneNumber) {
          setIsPhoneNumberExists(true);
        }
      } catch (error) {
        console.error('Error retrieving phone number:', error);
      }
    };

    checkPhoneNumber();
  }, []);

  // useEffect(() => {
  //   if (isPhoneNumberExists) {
  //     navigation.navigate('Home');

  //   } else {
  //     navigation.navigate('SplashScreen');

  //   }
  // }, [isPhoneNumberExists, navigation]);

  return (
    <Stack.Navigator>
    
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="LoginType" component={LoginType} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default AuthNav;
