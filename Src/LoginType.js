import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  Image, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { blue, greyBg } from './Colors';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'


const LoginType = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={[{ position: "absolute", top: 0, }]}>

                <Image style={{ width: responsiveWidth(100) }} source={require('../Images/bg1.png')} />

            </View>
            <View style={[{justifyContent:"center",alignItems:"center", height:responsiveHeight(25), }]}>

<Image style={[{height:responsiveHeight(15),width: responsiveWidth(60) , }]} source={require('../Images/LogoCaterStationWhite.png')}/>

  </View>

            <View style={[styles.lowerBox]}>

                <Text style={[styles.HeadText,{marginTop:60}]}>Welcome to CaterStation</Text>
                <Text style={[styles.textLight]}>Choose from which account you want to visit</Text>
                 {/* add user type  customer */}
                <Pressable onPress={()=>{navigation.navigate("Login")}} style={[styles.BtnBlue,]}>
                <Text style={[{color:"white", fontSize:responsiveFontSize(1.7)}]}>Join To Book Event</Text>

                </Pressable>
                <Text  style={[styles.txtBlue,{marginVertical:10, fontWeight:"bold"}]}>OR</Text>
                 {/* add user type  vendor */}

                <Pressable
                        disabled={true}
                        onPress={()=>{navigation.navigate("Login")}}
                style={[styles.BtnWhite]}>

                <Text  style={[styles.txtBlue]}>Are You a Vendor</Text>
                

                </Pressable>
                <View  style={[{marginTop:responsiveHeight(5),width: responsiveWidth(100), height:responsiveHeight(18), justifyContent:"center", alignItems:"center"}]} >
                <Image
                      source={require("../Images/groupPeople.png")}
                />
                </View>
               
                <Pressable  onPress={()=>{navigation.navigate("Home")}} style={[{marginTop:30, paddingHorizontal:20, paddingVertical:20, marginBottom: 80,}]}>
                <Text  style={[{ fontWeight:"bold",color:blue, fontSize:responsiveFontSize(2),textAlign:"center",}]}>Continue Without Signup </Text>

                </Pressable>


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
   
    lowerBox: {
        height:responsiveHeight(75),
        width: responsiveWidth(100),
        position: "absolute",
        
        bottom:0,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent:"center",
        alignItems:"center"
    },
    HeadText:{
        color:blue,
        fontWeight:"bold",
        fontSize:responsiveFontSize(2.5)
    },
    textLight:{
        color:blue,
        fontSize:responsiveFontSize(1.9),  
    },
    BtnBlue:{
        // paddingHorizontal:responsiveWidth(2),
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:responsiveHeight(1.5),
         width: responsiveWidth(40),
        marginTop:responsiveHeight(3),
        backgroundColor:blue,
    },
    BtnWhite:{
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:responsiveHeight(1.5),
         width: responsiveWidth(40),
        // marginTop:responsiveHeight(1),
        // borderColor:greyBg,
        // borderWidth:2,
         backgroundColor:"white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
            // Elevate the view to create a shadow effect
        elevation: 4,},
        txtBlue:{
            color:blue,
            fontSize:responsiveFontSize(1.7),
            textAlign:"center",
        }
    
});

export default LoginType