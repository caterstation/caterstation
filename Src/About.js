import { View, Text ,StyleSheet, TextInput , Pressable,ScrollView, Image} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { black, blue, greyBg, greyDark, lightgrey, white } from './Colors';
import { useNavigation } from '@react-navigation/native'
import HorizontalBar from './HorizontalBar'



const About = () => {
   const navigation=useNavigation();

  return (
    <ScrollView style={{flex:1, backgroundColor:e=white, paddingHorizontal:responsiveWidth(2)}}>
                <HorizontalBar backPress={() => navigation.goBack()} title="About Us" />

          <View style={{marginTop:responsiveHeight(1)}}>
          <Text style={{textAlign:"justify", color:black, fontSize:responsiveFontSize(1.5)}}>
          At CaterStation, we have brought together an extensive network of vendors, including venues, caterers, event planners, photographers, and DJs, all in one place. With our user-friendly website and mobile app, you can easily browse through our extensive vendor network, compare prices and services, and book your preferred vendor in just a few clicks.     </Text>
            <View style={{flexDirection:"row", marginTop: responsiveHeight(1),}}>
            <View style={{width:responsiveWidth(40)}}>










            <Image style={{width:responsiveWidth(38), height:responsiveHeight(25),}} source={require('../Images/father.png')}/>
            <Text style={{ color:black, fontSize:responsiveFontSize(1.5), fontWeight: 'bold',marginTop:responsiveHeight(1)}}>CH. Faryad Ahmed</Text>
            </View>
            <View style={{width:responsiveWidth(55)}}>
            <Text  style={{fontWeight: 'bold',color:black, fontSize:responsiveFontSize(2)}}>Chairman’s Message:</Text>
            <Text style={{textAlign:"justify", color:black, fontSize:responsiveFontSize(1.5)}}>
            As the chairman of Al-Nafoura group we started all of our businesses knowing that we need to add value to our country. Similarly , we are now starting the project of CaterStation, keeping in mind our new generation, young work force and a huge growth that Pakistan has shown over the past few years in IT sector. Digitalisation is the future and we will continue providing opportunities to our young, innovative generation to induce our part in contributing to the national economy.  </Text>
                    {/* <Image source={require('../Images/father.png')}/> */}
                    </View>
            </View>
            <View style={{flexDirection:"row", marginTop: responsiveHeight(1),paddingBottom:responsiveHeight(10)}}>
            
            <View style={{width:responsiveWidth(55)}}>
                <Text  style={{fontWeight: 'bold',color:black, fontSize:responsiveFontSize(2)}}>CEO’s Message:</Text>
            <Text style={{textAlign:"justify", color:black, fontSize:responsiveFontSize(1.5), width:responsiveWidth(55)}}>
            It gives me great pride to lead CaterStation, A one of its kind of an online platform in Pakistan which is created keeping in mind the huge potential of growth of the Event Management industry in Pakistan. We remain committed to make CaterStation an attractive and easily accessible platform for both of our worthy clients and companies on-board. The outlook for CaterStation is very positive and we look forward to continue delivering maximum growth for all of our key stakeholders.    </Text>
                    {/* <Image source={require('../Images/father.png')}/> */}
                    </View>
                    <View style={{width:responsiveWidth(40), marginLeft:responsiveWidth(1.5)}}>

            <Image style={{width:responsiveWidth(40), height:responsiveHeight(25),}} source={require('../Images/sirD.jpg')}/>
            <Text style={{ color:black, fontSize:responsiveFontSize(1.5), fontWeight: 'bold',marginTop:responsiveHeight(1)}}>Dawood Ahmed</Text>

            </View>
            </View>
          </View>
    
    </ScrollView>
  )
}

export default About