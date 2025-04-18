import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { black, blue, greyBg, greyDark, lightgrey, white } from './Colors';
import PhoneInput from "react-native-phone-number-input";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { userLogin } from './redux/MyUserSlice';
import { checkConnected } from './Hooks/api/AllEventsApi';

const Login = ({route}) => {
 

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [checkValidNum, setcheckValidNum] = useState(false);
  const [phone, setphoneInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const savePhoneNumber = async (phoneNumber) => {
    try {
      await AsyncStorage.setItem('phoneNumber', phone);
      console.log('Phone number saved successfully!');
    } catch (error) {
      console.error('Error saving phone number:', error);
    }
  };
console.log('====================================');
// console.log("checkConnected : ",checkConnected());
console.log('====================================');

  const removePhoneNumber = async () => {

    if (checkConnected) {
      try {
        await AsyncStorage.removeItem('phoneNumber',);
        await AsyncStorage.removeItem('userInfo',);

        console.log('Phone number removed successfully!');

        dispatch(userLogin(''));
        // Reset the navigation stack and navigate to the 'Login' screen
      
    } catch (error) {
        console.error('Error removing phone number:', error);
        console.error('Error',error.response.data.message);

    }
    }
    else{
      Alert.alert("No internet connection")
    }
    
};

  const handleCheckNum = (txt) => {
    var regex = /^\+(?:[0-9] ?){6,25}[0-9]$/;
    setphoneInput(txt);
    if (regex.test(txt)) {
      setcheckValidNum(false);
    } else {
      setcheckValidNum(true);
      setphoneInput(txt);
    }
  };

  const handleSubmit = async () => {
    if (phone == '') {
      Alert.alert("Please enter number, it's empty");
      return;
    }
    const connection = await checkConnected(); 
 if(connection) {
  setIsLoading(true);

    try {
      const response = await axios.post('https://caterstation.pro/api/login', { phone }, { headers: { 'Content-Type': 'application/json' } });
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user, null, 2));
      dispatch(userLogin(response.data.user));
      savePhoneNumber();
      console.log('====================================');
      // console.log("suucessful :: " , message);
      console.log('====================================');
      navigation.navigate("Otp", { verify: "Login" , phone:phone});
    } catch (error) {
      Alert.alert('Invalid or empty field from login');
      console.log('Error in POST request:', error);
    } finally {
      setIsLoading(false);
    }


  }
  else{
    Alert.alert("No Internet connection")
  }
  };

  const scrollViewProps = Platform.select({
    ios: { contentInsetAdjustmentBehavior: 'automatic' },
    android: { keyboardShouldPersistTaps: 'handled' },
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView {...scrollViewProps} contentContainerStyle={styles.container}>
        <View style={[{ position: "absolute", top: 0, }]}>
          <Image style={{ width: responsiveWidth(100) }} source={require('../Images/bg1.png')} />
        </View>
        <View style={[{ justifyContent: "center", alignItems: "center", height: responsiveHeight(25), }]}>
          <Image style={[{ height: responsiveHeight(15), width: responsiveWidth(60), }]} source={require('../Images/LogoCaterStationWhite.png')} />
        </View>
        <View style={[styles.lowerBox]}>
          <Text style={[styles.HeadText]}>Login</Text>
          <Text style={[styles.textLight]}>Enter your mobile number for Login</Text>
          <View>
            <PhoneInput
              defaultValue='PK'
              defaultCode="PK"
              layout="first"
              countryCodes={{ PK: 'Pakistan' }}
              value={phone}
              onChangeText={(txt) => handleCheckNum(txt)}
              containerStyle={{
                color: 'black', height: responsiveHeight(7), width: responsiveWidth(70), marginTop: responsiveHeight(7), backgroundColor: '#f8f9f9', paddingLeft: responsiveWidth(1),
                shadowColor: "#cccccc", marginTop: responsiveHeight(3), marginBottom: responsiveWidth(1), elevation: 1.6,
              }}
              textInputProps={{
                placeholder: 'Enter your number.',
                placeholderTextColor: "grey",
                style: { fontSize: responsiveFontSize(1.7), backgroundColor: 'transparent', color: 'black', height: responsiveHeight(7), width: responsiveWidth(40), },
              }}
              textInputStyle={{ padding: 0, color: 'black', }}
              onChangeFormattedText={(text) => {
                handleCheckNum(text);
              }}
              codeTextStyle={{
                color: 'black', fontSize: responsiveFontSize(1.7), height: responsiveHeight(7), width: responsiveWidth(12.5), textAlign: "center",
                paddingTop: (responsiveHeight(6.8) - responsiveFontSize(1.7)) / 2,
              }}
              flagButtonStyle={{ paddingLeft: 20, width: responsiveWidth(6.5), }}
            />
          </View>
          {checkValidNum && <Text style={{ fontSize: responsiveFontSize(1.5), color: "red", fontWeight: 'bold', width: responsiveWidth(70), flexDirection: 'row' }}>Wrong Phone Number Format</Text>}
          <Pressable
            onPress={handleSubmit}
            style={[styles.BtnBlue]}>
            {isLoading ? <ActivityIndicator color="white" /> : <Text style={[{ color: "white", fontSize: responsiveFontSize(1.7) }]}>Login</Text>}
          </Pressable>
          <View style={[{ width: responsiveWidth(100), justifyContent: "center", alignItems: "center", marginTop: responsiveHeight(5), }]} >
            <Pressable style={{ flexDirection: "row", paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1) }} onPress={() => { navigation.navigate('Register') }}>
              <Text style={{ color: greyDark, fontWeight: 'bold', fontSize: responsiveFontSize(1.7) }}>Don't have Account?</Text>
              <Text style={{ color: blue, fontWeight: 'bold', fontSize: responsiveFontSize(1.7) }}> Register Now</Text>
            </Pressable>
          </View> 
          
          
          
          <View style={[{ width: responsiveWidth(100), justifyContent: "center", alignItems: "center", marginTop: responsiveHeight(5), }]} >
            <Pressable style={{ flexDirection: "row", paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1) }} onPress={() => { 
              removePhoneNumber();
              navigation.replace('AfterLoginC'); }}>
              <Text style={{ color: greyDark, fontWeight: 'bold', fontSize: responsiveFontSize(1.7) }}>Open without login</Text>
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
    backgroundColor: "white",
    position: "relative"
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: 'bold',
    position: "absolute",
    top: 200,
    width: "100%",
    textAlign: "center"
  },
  lowerBox: {
    height: responsiveHeight(75),
    width: responsiveWidth(100),
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  HeadText: {
    color: blue,
    fontWeight: "bold",
    fontSize: responsiveFontSize(3)
  },
  textLight: {
    color: blue,
    fontSize: responsiveFontSize(2)
  },
  BtnBlue: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.5),
    width: responsiveWidth(40),
    marginTop: responsiveHeight(3),
    backgroundColor: blue,
  },
  BtnWhite: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.5),
    width: responsiveWidth(40),
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  txtBlue: {
    color: blue,
    fontSize: responsiveFontSize(1.7),
    textAlign: "center",
  },
  regNumTextInput: {
    width: "60%",
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    fontSize: 16,
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
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Login;
