// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet,  Image, Pressable,TextInput,TouchableOpacity ,Alert} from 'react-native';

// import { useNavigation } from '@react-navigation/native'
// import { blue, greyBg, white } from './Colors';
// import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
// import OTPInputView from '@twotalltotems/react-native-otp-input'

// import axios from 'axios';


// export const OtpLogin = () => {
//   const navigation = useNavigation();
//   const [reg,setreg]=useState();
//   const [otp, setOtp] = useState('');
//   const [values, setValues] = useState(Array(4).fill(''));
  
//  const [isLoading, setIsLoading] = useState(false);
//  const [error, setError] = useState(null);

//  const handleSubmit = async () => {
//    setIsLoading(true);
//    setError(null); // Clear any previous errors
 
//    try {
//      const response = await axios.post('https://caterstation.pro/api/otp-verify', {
//        values
//      }, {
//        headers: {
//          'Content-Type': 'application/json',
//        },
//      });
 
//      console.log('POST request successful:', response.data);
//      navigation.navigate('Home');
//      // Handle successful response
//    } catch (error) {
//      console.error(' im catch section Error in POST request:', error);
//      console.error('Error in POST request:', error.response.data);
//      setError(error.response?.data?.message || 'An error occurred.');
//    } finally {
//      setIsLoading(false);
//    }
//  };
 
//   return (
   
//       <View style={styles.container}>
//           <View style={[{ position: "absolute", top: 0, }]}>

//           <Image style={{ width: responsiveWidth(100) }} source={require('../Images/bg1.png')} />


//           </View>
//           <View style={[{justifyContent:"center",alignItems:"center", height:responsiveHeight(25), }]}>

// <Image style={[{height:responsiveHeight(15),width: responsiveWidth(60) , }]} source={require('../Images/LogoCaterStationWhite.png')}/>

//  </View>

//           <View style={[styles.lowerBox]}>

//               <Text style={[styles.HeadText,{marginTop:60}]}> Confirmation Code</Text>
//               <Text style={[styles.textLight]}>Please enter the verification code </Text>
              
           





//               <View style={styles.otpContainer}>
//               <OTPInputView
//    style={{backgroundColor: white,}}
//    pinCount={4}
//    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
//    // onCodeChanged = {code => { this.setState({code})}}
//    autoFocusOnLoad
//    codeInputFieldStyle={styles.underlineStyleBase}
//    codeInputHighlightStyle={styles.underlineStyleHighLighted}
//    onCodeFilled = {(code => {
//      setValues(code)
//        console.log(`Code is ${code}, you are good to go!`)
//    })}
// />
//       </View>
             
             
//       <Pressable onPress={()=>{handleSubmit()}} style={[styles.BtnBlue,]}>
//                <Text style={[{color:"white", fontSize:responsiveFontSize(1.7)}]}>Verify</Text>

//                </Pressable>
//                {/* <Text  style={[styles.txtBlue,{marginVertical:responsiveHeight(2.5), fontWeight:"bold"}]}>Didn’t receive code?</Text> */}
//                 {/* add user type  vendor */}

//                {/* <Pressable
//                        // onPress={()=>{navigation.navigate("Register")}}
//                style={[styles.BtnWhite]}>

//                <Text  style={[styles.txtBlue]}>Resend</Text>

//                </Pressable> */}
//                <View  style={[{marginTop:responsiveHeight(5),width: responsiveWidth(100), height:responsiveHeight(18), justifyContent:"center", alignItems:"center"}]} >
//                <Image
//                      source={require("../Images/groupPeople.png")}
//                />
//                </View>


//           </View>



//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,

//       backgroundColor: blue,
//       position: "relative"
//       ,
//   },
//   text: {
//       fontSize: responsiveFontSize(1.8),
//       color: "white",
//       fontWeight: 'bold',
//       //  backgroundColor:"red",
//       position: "absolute",
//       top: 200,
//       width: "100%",
//       textAlign: "center"

//   },
//   lowerBox: {
//    height:responsiveHeight(75),
//    width: responsiveWidth(100),
//    position: "absolute",
   
//    bottom:0,
//    backgroundColor: "white",
//    borderTopLeftRadius: 30,
//    borderTopRightRadius: 30,
//    justifyContent:"center",
//    alignItems:"center"
// },
// HeadText:{
//    color:blue,
//    fontWeight:"bold",
//    fontSize:responsiveFontSize(2.5)
// },
// textLight:{
//    color:blue,
//    fontSize:responsiveFontSize(1.9),  
// },
// BtnBlue:{
//    // paddingHorizontal:responsiveWidth(2),
//    justifyContent:"center",
//    alignItems:"center",
//    paddingVertical:responsiveHeight(1.5),
//     width: responsiveWidth(40),
//    marginTop:responsiveHeight(3),
//    backgroundColor:blue,
// },
// BtnWhite:{
//    justifyContent:"center",
//    alignItems:"center",
//    paddingVertical:responsiveHeight(1.5),
//     width: responsiveWidth(40),
//    // marginTop:responsiveHeight(1),
//    // borderColor:greyBg,
//    // borderWidth:2,
//     backgroundColor:"white",
//    shadowColor: '#000',
//    shadowOffset: { width: 0, height: 2 },
//    shadowOpacity: 0.3,
//    shadowRadius: 4,
//        // Elevate the view to create a shadow effect
//    elevation: 4,},
//    txtBlue:{
//        color:blue,
//        fontSize:responsiveFontSize(1.7),
//        textAlign:"center",
//    },



 
//       error: {
//         color: 'red',
//         marginBottom: 10,
//      },
//      otpContainer: {
//        flexDirection: 'row',
//        justifyContent: 'space-between',
//        alignItems: 'center',
//        width:responsiveWidth(70),
//        height:responsiveHeight(10),
//        // backgroundColor:"red",
//        marginVertical:responsiveHeight(3),
//        marginRight:responsiveWidth(7)

//     },
//     otpInput: {
//        borderWidth: 1,
//        borderColor: 'gray',
//        width: responsiveWidth(10),
//        height: responsiveHeight(6),
//        textAlign: 'center',
//        marginRight: responsiveWidth(.1),
//     },
//     borderStyleBase: {
//        width: responsiveWidth(12),
//        height: responsiveHeight(7),
//        borderColor: blue,
//      },
   
//      borderStyleHighLighted: {
//        borderColor: greyBg,
//      },
   
//      underlineStyleBase: {
//        width: responsiveWidth(12),
//        height: responsiveHeight(7),
//        // borderWidth: 0,
//        borderWidth: 2,
//        fontSize:20,
//        color:blue,
//        borderColor: blue,
   
//      },
   
//      underlineStyleHighLighted: {
//        borderColor: blue,
       
//      },
   
   
  
// });


// export default OtpLogin


import { View, Text } from 'react-native'
import React from 'react'

const OtpLogin = () => {
  return (
    <View>
      <Text>OtpLogin</Text>
    </View>
  )
}

export default OtpLogin