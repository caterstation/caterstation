import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  Image, Pressable,TextInput,TouchableOpacity ,Alert} from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { blue, greyBg } from './Colors';


const LogInVendor = () => {
    const navigation = useNavigation();
    const [reg,setreg]=useState();
    // const [phoneInput, setphoneInput]=useState();
  
   
  
  
    // console.warn("lenght of number" + reg.length)
    return (
        <View style={styles.container}>
            <View style={[{ position: "absolute", top: 0, }]}>
  
                <Image style={{ width: 390 }} source={require('../Images/bg_Splash.png')} />
  
            </View>
            <View style={[{justifyContent:"center",alignItems:"center", height:145,}]}>
  
                 <Image style={[{height:100,width:200 , }]} source={require('../Images/LogoCaterStationWhite.png')}/>
  
                 </View>
  
            <View style={[styles.lowerBox]}>
  
                <Text style={[styles.HeadText,{marginTop:60}]}>LOGIN VENDOR</Text>
                <Text style={[styles.textLight]}>Enter your mobile number or password for login</Text>
                
             
  
  
  
  
  
                <TextInput 
                style={[styles.regNumTextInput]} 
                placeholder='Enter your number here'
                 keyboardType='phone-pad'
                 value={reg}
                 maxLength={11}
                 onChangeText={(text)=>setreg(text)}
  
                />
               
               
               <Pressable onPress={()=>{navigation.navigate("Home")}} style={[styles.BtnBlue,]}>
                  <Text style={[{color:"white", textAlign:"center", fontWeight:"bold"}]}>Login Vendor</Text>
  
                  </Pressable>
                  <Text  style={[styles.txtBlue,{marginVertical:10, fontWeight:"bold"}]}>You don’t have an account?</Text>
                  <Pressable onPress={()=> navigation.navigate('RegVendor')} style={[styles.BtnWhite]}>
  
                  <Text  style={[styles.txtBlue]}>Register Vendor</Text>
  
                  </Pressable>    
                <Image
                      style={[{marginTop:70}]}  source={require("../Images/groupPeople.png")}
                />
                {/* <Pressable onPress={()=>{navigation.navigate("Login")}} style={[{ paddingHorizontal:20, paddingVertical:20,}]}>
                <Text  style={[{ fontWeight:"bold",color:blue, fontSize:16,textAlign:"center",}]}>Already register? Login</Text>
  
                </Pressable> */}
  
  
            </View>
  
  
  
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
  
        backgroundColor: blue,
        position: "relative"
        ,
    },
    text: {
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',
        //  backgroundColor:"red",
        position: "absolute",
        top: 200,
        width: "100%",
        textAlign: "center"
  
    },
    lowerBox: {
        height: 570,
        width: "100%",
        position: "absolute",
        top: 150,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent:"center",
        alignItems:"center"
    },
    HeadText:{
        color:blue,
        fontWeight:"bold",
        fontSize:22
    },
    textLight:{
        color:blue,
        fontSize:16,  
    },
    BtnBlue:{
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:blue, width:"55%",
        marginTop:15,
      
    },
    BtnWhite:{
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:"white",
         width:"55%",
         marginLeft:5,
        // borderColor:greyBg,
        // borderWidth:2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
            // Elevate the view to create a shadow effect
        elevation: 4,},
        txtBlue:{
            color:blue,
            fontSize:14,
            textAlign:"center",
            fontWeight:"bold"
        }, 
        regNumTextInput:{
          // height:20,
          // backgroundColor:"pink",
          // borderColor:"red",
          // borderWidth:2,
          width:"60%",
          marginTop: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
              // Elevate the view to create a shadow effect
          elevation: 4,
          paddingHorizontal:20,
          paddingTop:22,
          paddingBottom:18,
          fontSize:18,
          // marginTop:50
        },
        error: {
          color: 'red',
          marginBottom: 10,
       },
    
  });
  

export default LogInVendor