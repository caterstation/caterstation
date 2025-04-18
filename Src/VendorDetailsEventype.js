
// not using this is extra file




import React, { useState } from 'react';
import { View, Text ,StyleSheet, Image, Pressable, ScrollView} from 'react-native'
import { black, blue, greyBg, white } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo'
import MyHeader from './MyHeader';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'



const VendorDetailsEventype = () => {
  const navigation=useNavigation();
  
  return (
    <View style={{flex:1,   backgroundColor: '#ffffff',}}>
 
 
 
 
    <MyHeader/>
    <View style={{height:responsiveHeight(35),width:responsiveWidth(100) }}>
 
 <View  style={{position:"relative",}}>
    <View  >
        <Image style={{height:responsiveHeight(22), width:responsiveWidth(100)}} source={require('../Images/sofa.jpg')}/>

    </View>
    </View>
    <View style={{ top:responsiveHeight(15),position:"absolute", borderColor:greyBg, borderBottomWidth: 1,borderBottomColor: greyBg, width:responsiveWidth(100), justifyContent:"center", alignItems:"center", }}>
       
       <Image style={{height:responsiveHeight(11), width:responsiveWidth(23), borderRadius:50,  }} source={require('../Images/couple.png')}/>
     
     
     <Text  style={{marginTop: responsiveHeight(1), letterSpacing:1,fontSize:responsiveFontSize(1.8)}}>Divine Events & Catering</Text>
     <View style={{ flexDirection:"row", width:responsiveWidth(100), justifyContent:"center", alignItems:"center" ,marginBottom: responsiveHeight(1.2),}}>
    

     <Entypo name="location-pin"  color={black} size={14} />
     <Text  style={{letterSpacing:1.5, fontSize:responsiveFontSize(1.8)}} > Allama Iqbal town,Lahore</Text>

     </View>
     
 
                        
  
</View>

 </View>
     
  <View>
    {/* row */}
    <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:responsiveWidth(8), marginTop: responsiveHeight(7),}}>
      <View>
        <Text style={{fontSize: responsiveFontSize(1.8),fontWeight:"bold", color:black}}>Wedding Event</Text>
      </View>
      
      <View>
        <Text style={{fontSize: responsiveFontSize(1.8),fontWeight:"bold", color:black}}>Price: 10k</Text>
      </View>
      

    </View>
    <View style={{justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(3)}}>
    <Text style={{fontSize: responsiveFontSize(1.8),fontWeight:"bold", color:black}}>Description</Text>
    </View>
    <View style={{marginHorizontal:responsiveWidth(5)}}>
    <Text style={{fontSize: responsiveFontSize(1.8), color:black, marginTop:responsiveHeight(1.5),textAlign:"justify"}}>Lorem Ipsum is a simply dummy text of the printing and typesettings industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took galley of type and scrambled it to make a type specimen book. It has survived not to text,Lorem Ipsum is a simply dummy text of the printing and typesettings industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took galley of type and scrambled .Lorem Ipsum is a simply dummy text of the printing and typesettings industry.it to make a type specimen book. It has survived not to text  </Text>

    </View>
    <View style={{justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(5)}}>
    <Pressable onPress={()=>{navigation.navigate('OrderSummary')}} style={{paddingHorizontal:responsiveWidth(15), paddingVertical:responsiveHeight(1), backgroundColor:blue}}>

          <Text style={{color:white, fontSize:responsiveFontSize(1.8)}}> Select</Text>
</Pressable>
      
    </View>

  </View>
 
</View>
 
);    
};

const styles = StyleSheet.create({

});
export default VendorDetailsEventype