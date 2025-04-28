import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {blue, yellow} from './Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {userLogin} from './redux/MyUserSlice';

const SplashScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const SplashUri = require('../Images/Splash.gif');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPhoneNumber = async () => {
      try {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        const userInfoo = await AsyncStorage.getItem('userInfo');
        const jsonObject = JSON.parse(userInfoo);
        //console.log(' user info in async storage : ' ,jsonObject)

        if (phoneNumber) {
          // Phone number exists, navigate to Home screen after 5 seconds
          setTimeout(() => {
            dispatch(userLogin(jsonObject));

            navigation.replace('AfterLoginC');
          }, 5000);
        } else {
          // Phone number doesn't exist, navigate to Login screen after 10 seconds
          setTimeout(() => {
            navigation.replace('AuthNav');
          }, 5000);
        }
      } catch (error) {
        // console.error('Error retrieving phone number:', error);
        // Navigate to Login screen in case of error after 8 seconds
        setTimeout(() => {
          navigation.navigate('Login');
        }, 5000);
      }
    };

    checkPhoneNumber(); // Call the function when component mounts

    // Clean up function to prevent memory leaks
    return () => {
      clearTimeout(); // Clear any existing setTimeout
    };
  }, [navigation,dispatch]); // Dependency on navigation to avoid linting warnings

  return (
    <View
      style={{flex: 1, backgroundColor: blue, height: responsiveHeight(900)}}>
              <Image source={SplashUri}  style={{
          width: responsiveWidth(100), // Set width to 100% for full width
          height: responsiveHeight(100),
        }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    position: 'relative',
  },
  text: {
    fontSize: responsiveFontSize(3),
    color: yellow,
    fontWeight: 'bold',
    top: -150,
    textAlign: 'center',
  },
});

export default SplashScreen;
