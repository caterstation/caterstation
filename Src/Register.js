import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {black, blue, greyBg, greyDark, lightgrey, white} from './Colors';
import PhoneInput from 'react-native-phone-number-input';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ChangePassword from './ChangePassword';
import axios from 'axios';
import {checkConnected} from './Hooks/api/AllEventsApi';

const Register = () => {
  const navigation = useNavigation();
  const [checkValidEmail, setcheckValidEmail] = useState(false);
  const [checkValidPass, setcheckValidPass] = useState(false);
  const [checkValidNum, setcheckValidNum] = useState(false);
  const [phone, setphoneInput] = useState('');
  const [email, setEmail] = useState();
  const [passwordLength, setPasswordLength] = useState(true);

  const [password, setPassword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState('');

  const scrollViewProps = Platform.select({
    ios: {
      contentInsetAdjustmentBehavior: 'automatic',
    },
    android: {
      keyboardShouldPersistTaps: 'handled',
    },
  });

  const handleCheckNum = txt => {
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    //console.log('txt', txt)
    setphoneInput(txt);
    if (regex.test(txt)) {
      setcheckValidNum(false);
      //console.log("num :  "+ checkValidNum)
    } else {
      setcheckValidNum(true);
      //console.log( " else num :  "+ checkValidNum)
      //console.log( " else phonenum :  "+ phone)

      // setbadNum(false)
    }
  };

  const handleCheckEmail = txt => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(txt);

    if (regex.test(txt)) {
      setcheckValidEmail(false);
      //console.log("email :  "+ checkValidEmail)
    } else {
      setcheckValidEmail(true);
      //console.log(" else email :  "+ checkValidEmail)

      // setbadEmail(false)
    }
  };

  const [block, setblock] = useState(false);

  const validatePassword = input => {
    let newSuggestions = [];

    if (input.length < 8) {
      newSuggestions.push('Password should be at least 8 characters long');
    }
    if (!/\d/.test(input)) {
      newSuggestions.push('Add at least one number');
    }

    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push('Include both upper and lower case letters');
    }

    if (!/[^A-Za-z0-9]/.test(input)) {
      newSuggestions.push('Include at least one special character');
    }

    setSuggestions(newSuggestions);

    // Determine password strength based on suggestions
    if (newSuggestions.length === 0) {
      setStrength('Very Strong');
    } else if (newSuggestions.length <= 1) {
      setStrength('Strong');
    } else if (newSuggestions.length <= 2) {
      setStrength('Moderate');
    } else if (newSuggestions.length <= 3) {
      setStrength('Weak');
    } else {
      setStrength('Too Weak');
    }
  };

  //  const handleCheckPass=(txt)=>{
  //   // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_@$!%*?&])[A-Za-z\d.,_@$!%*?&]{7,}$/;
  //   setPassword(txt);

  const allValidation = () => {
    //console.log("check num :  "+checkValidNum+"    check email :  "+ checkValidEmail +"    check pass : "+ password + "pass length : "+ password.length)

    if (password.length < 7) {
      setPasswordLength(false);
    } else {
      setPasswordLength(true);
    }

    if (
      checkValidEmail == false &&
      checkValidNum == false &&
      password.length == 0
    ) {
      //console.log(" empty=   check num :  "+checkValidNum+"    check email :  "+ checkValidEmail +"    check pass : "+ password + "pass length : "+ password.length)

      Alert.alert(
        'Error',
        'Please enter valid email, password and mobile number',
        [{text: 'OK'}],
      );
    }
    if (password.length < 7) {
      // //console.log(" empty=   check num :  "+checkValidNum+"    check email :  "+ checkValidEmail +"    check pass : "+ password + "pass length : "+ password.length)

      Alert.alert('Error', 'Password should be at least 8 characters long', [
        {text: 'OK'},
      ]);
    }
    if (
      checkValidEmail == false &&
      checkValidNum == false &&
      password.length > 7
    ) {
      //console.log(" if condition working=   check num :  "+checkValidNum+"    check email :  "+ checkValidEmail +"    check pass : "+ password + "pass length : "+ password.length)
      // //console.log("no error")
      // navigation.navigate("Otp")
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // //console.log('entered number', phone);

  const handleSubmit = async () => {
    // setIsLoading(true);
    setError(null); // Clear any previous errors

    const connection = await checkConnected();
    if (connection) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'https://caterstation.pro/api/register',
          {
            email,
            phone, // Assuming phone is the correct state variable name
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        //console.log('POST request successful:', response.data);
        // navigation.navigate("Otp")
        // navigation.navigate("Otp",{verify:"Reg",phone:phone})
        navigation.navigate('Otp', {verify: 'Reg', phone: phone});

        // Handle successful response
      } catch (error) {
        Alert.alert('User already existed');
        console.error('Error:', error);
        console.error('Error in POST request:', error.response.data);
        setError(error.response?.data?.message || 'An error occurred.');
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('No Internet connection');
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
          <Text style={[styles.HeadText]}>REGISTER</Text>
          <Text style={[styles.textLight]}>
            Enter your mobile number for registration
          </Text>

          <View>
            <PhoneInput
              defaultValue={phone}
              defaultCode="PK"
              layout="first"
              value={phone}
              onChange={txt => handleCheckNum(txt)}
              // onChangeText={(txt)=>setphoneInput(txt)}
              containerStyle={{
                color: 'black',
                height: responsiveHeight(7),
                width: responsiveWidth(70),
                marginTop: responsiveHeight(7),
                backgroundColor: '#f8f9f9',
                paddingLeft: responsiveWidth(1),
                // borderWidth: 2, borderColor:greyBg, borderRadius:1.9,
                shadowColor: '#cccccc',
                marginTop: responsiveHeight(3),
                marginBottom: responsiveWidth(1),
                elevation: 1.6,
              }}
              textInputProps={{
                keyboardType: 'numeric',
                // maxLength:11,
                placeholder: '3001234567',
                placeholderTextColor: 'black',

                style: {
                  fontSize: responsiveFontSize(1.7),
                  backgroundColor: 'transparent',
                  color: 'black',
                  height: responsiveHeight(6.8),
                  width: responsiveWidth(40),
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}
              textInputStyle={{padding: 0, color: 'black'}}
              onChangeFormattedText={text => {
                handleCheckNum(text);
              }}
              // withShadow
              // autoFocus
              codeTextStyle={{
                color: 'black',
                fontSize: responsiveFontSize(1.7),
                height: responsiveHeight(6.5),
                width: responsiveWidth(12.5),
                textAlign: 'center',
                paddingTop: responsiveHeight(2.2),
              }}
              flagButtonStyle={{
                width: 25,
                paddingLeft: 20,
                width: responsiveWidth(6.5),
              }}
            />
          </View>

          {checkValidNum ? (
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                color: 'red',
                fontWeight: 'bold',
                width: responsiveWidth(70),
                flexDirection: 'row',
              }}>
              Wrong Phone Number Format
            </Text>
          ) : null}

          <View
            style={{
              marginTop: responsiveHeight(4),

              width: responsiveWidth(70),
              height: responsiveHeight(6.8),
              borderRadius: 1.9,
              paddingBottom: responsiveHeight(0.4),

              backgroundColor: '#f8f9f9',
              shadowColor: '#cccccc',
              marginTop: responsiveHeight(3),
              marginBottom: responsiveWidth(1),
              elevation: 1.6,
            }}>
            <TextInput
              style={{
                width: responsiveWidth(70),
                height: responsiveHeight(6.5),
                paddingLeft: responsiveWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
                color: black,
                //paddingBottom:responsiveHeight(2)
              }}
              placeholder="Enter your Email"
              //  keyboardType='phone-pad'
              placeholderTextColor={black}
              value={email}
              onChangeText={txt => handleCheckEmail(txt)}
              //  onChangeText={(txt)=>setEmail(txt)}
              //  maxLength={11}
              //  onChangeText={(text)=>setreg(text)}
            />
          </View>
          {checkValidEmail ? (
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                color: 'red',
                fontWeight: 'bold',
                width: responsiveWidth(70),
                flexDirection: 'row',
              }}>
              Wrong Email Format
            </Text>
          ) : null}

          <View
            style={{
              // marginTop:responsiveHeight(3),

              width: responsiveWidth(70),
              height: responsiveHeight(6.8),
              borderRadius: 1.9,
              backgroundColor: '#f8f9f9',

              shadowColor: '#cccccc',
              marginTop: responsiveHeight(3),
              marginBottom: responsiveWidth(4),
              elevation: 1.6,
            }}>
            <TextInput
              style={{
                width: responsiveWidth(70),
                height: responsiveHeight(6.5),
                paddingLeft: responsiveWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
                color: black,
                // paddingBottom:responsiveHeight(2)
              }}
              placeholder="Enter your Password"
              placeholderTextColor={black}
              value={password}
              onChangeText={text => {
                // handleCheckPass(txt)

                setPassword(text);
                validatePassword(text);
              }}
            />

            <Text style={styles.strengthText}>
              Password Strength: {strength}
            </Text>
            {/* {password?<Text style={styles.error}>Password should be</Text>:null} */}
          </View>

          <Pressable
            onPress={() => {
              allValidation(), handleSubmit();
            }}
            style={[styles.BtnBlue]}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={[{color: 'white', fontSize: responsiveFontSize(1.7)}]}>
                Register
              </Text>
            )}
          </Pressable>

          <View
            style={[
              {
                width: responsiveWidth(100),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveHeight(5),
              },
            ]}>
            {/* <Image
                      source={require("../Images/groupPeople.png")}
                /> */}

            <Pressable
              style={{
                flexDirection: 'row',
                paddingHorizontal: responsiveWidth(3),
                paddingVertical: responsiveHeight(1),
              }}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text
                style={{
                  color: greyDark,
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(1.7),
                }}>
                Already Have Account?
              </Text>
              <Text
                style={{
                  color: blue,
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(1.7),
                }}>
                {' '}
                Login Now
              </Text>
            </Pressable>
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
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    //  backgroundColor:"red",
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
    // backgroundColor: "red",
  },
  HeadText: {
    color: blue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  textLight: {
    color: blue,
    fontSize: responsiveFontSize(2),
  },
  BtnBlue: {
    // paddingHorizontal:responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.5),
    width: responsiveWidth(40),
    marginTop: responsiveHeight(3),
    backgroundColor: blue,
  },
  BtnWhite: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.5),
    width: responsiveWidth(40),
    // marginTop:responsiveHeight(1),
    // borderColor:greyBg,
    // borderWidth:2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevate the view to create a shadow effect
    elevation: 4,
  },
  txtBlue: {
    color: blue,
    fontSize: responsiveFontSize(1.7),
    textAlign: 'center',
  },
  regNumTextInput: {
    width: '60%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevate the view to create a shadow effect
    elevation: 4,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    fontSize: 16,
    // marginTop:50
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  strengthText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
    color: blue,
    marginTop: responsiveHeight(1),
  },
  suggestionsText: {
    color: 'red',
  },
  strengthMeter: {
    width: responsiveWidth(60),
    height: responsiveHeight(1),
    backgroundColor: '#ccc',
    // marginTop: responsiveHeight(1),
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Register;
