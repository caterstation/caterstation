import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {blue, white} from './Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';

export const Otp = ({route}) => {
  const navigation = useNavigation();
  const {verify, phone} = route.params;
  //console.log("phone number ",phone);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollViewProps = Platform.select({
    ios: {
      contentInsetAdjustmentBehavior: 'automatic',
    },
    android: {
      keyboardShouldPersistTaps: 'handled',
    },
  });

  // const handleSubmit = async () => {
  //   setError(null); // Clear any previous errors
  //   if (otp.length !== 4) {
  //     Alert.alert("Fill in the OTP fields");
  //     return;
  //   }
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post('https://caterstation.pro/api/otp-verify', {
  //       otp: otp
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     //console.log('POST request successful:', response.data);
  //     if (verify === "Login") {
  //       navigation.replace('AfterLoginC');
  //     } else if (verify === "Reg") {
  //       navigation.navigate('Login');
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Response data:', error.response.data);
  //       console.error('Response status:', error.response.status);
  //       console.error('Response headers:', error.response.headers);
  //     } else if (error.request) {
  //       console.error('Request data:', error.request);
  //     } else {
  //       console.error('Error message:', error.message);
  //     }
  //     console.error('Config:', error.config);

  //     Alert.alert('Invalid OTP');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    setError(null); // Clear any previous errors
    if (otp.length !== 4) {
      Alert.alert('Fill in the OTP fields');
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://caterstation.pro/api/otp-verify',
        {
          phone: phone, // Include phone parameter
          otp: otp,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      //console.log('POST request successful:', response.data);
      if (verify === 'Login') {
        navigation.replace('AfterLoginC');
      } else if (verify === 'Reg') {
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Config:', error.config);

      Alert.alert('Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView {...scrollViewProps} contentContainerStyle={styles.container}>
        <View style={[{position: 'absolute', top: 0}]}>
          <Image
            style={{width: responsiveWidth(100)}}
            source={require('../Images/bg1.png')}
          />
        </View>
        <View
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              height: responsiveHeight(25),
            },
          ]}>
          <Image
            style={[{height: responsiveHeight(15), width: responsiveWidth(60)}]}
            source={require('../Images/LogoCaterStationWhite.png')}
          />
        </View>
        <View style={[styles.lowerBox]}>
          <Text style={[styles.HeadText, {marginTop: 60}]}>
            {' '}
            Confirmation Code
          </Text>
          <Text style={[styles.textLight]}>
            Please enter the verification code{' '}
          </Text>
          <View style={styles.otpContainer}>
            <OTPInputView
              style={{backgroundColor: white}}
              pinCount={4}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                setOtp(code);
                //console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
          <Pressable onPress={handleSubmit} style={[styles.BtnBlue]}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={[{color: 'white', fontSize: responsiveFontSize(1.7)}]}>
                Verify
              </Text>
            )}
          </Pressable>
          <View
            style={[
              {
                marginTop: responsiveHeight(5),
                width: responsiveWidth(100),
                height: responsiveHeight(18),
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Image source={require('../Images/groupPeople.png')} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
    position: 'relative',
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: 200,
    width: '100%',
    textAlign: 'center',
  },
  lowerBox: {
    height: responsiveHeight(75),
    width: responsiveWidth(100),
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeadText: {
    color: blue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
  },
  textLight: {
    color: blue,
    fontSize: responsiveFontSize(1.9),
  },
  BtnBlue: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.5),
    width: responsiveWidth(40),
    marginTop: responsiveHeight(3),
    backgroundColor: blue,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveWidth(70),
    height: responsiveHeight(10),
    marginVertical: responsiveHeight(3),
    marginRight: responsiveWidth(7),
  },
  underlineStyleBase: {
    width: responsiveWidth(12),
    height: responsiveHeight(7),
    borderWidth: 2,
    fontSize: 20,
    color: blue,
    borderColor: blue,
  },
  underlineStyleHighLighted: {
    borderColor: blue,
  },
});

export default Otp;
