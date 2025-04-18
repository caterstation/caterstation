import React, { useState } from 'react';
import { View, Text ,StyleSheet, TextInput , Pressable,ScrollView, Image} from 'react-native'

import { black, blue, greyBg, white } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import HorizontalBar from './HorizontalBar';
import { useNavigation } from '@react-navigation/native';


const TermsCondition = () => {
   const navigation=useNavigation();

  return (
    <ScrollView style={{flex:1,backgroundColor:white,marginBottom:responsiveHeight(10)}}>
           <HorizontalBar backPress={() => navigation.goBack()} title="Terms and Conditions" />

    <View style={{marginHorizontal:responsiveWidth(1), marginTop:responsiveHeight(2), width:responsiveWidth(100)}}>
        <View style={{width:responsiveWidth(95)}}>
        <Text style={styles.headtxt}>User Registration Policy</Text>
        <Text style={styles.txt}>Unregistered users cannot place orders, per our policy; they may only view pricing and packages. They must Sign up for account on either app or website then login with their credentials and place a complete order from the beginning to the end.</Text>
        </View>
        <View style={{width:responsiveWidth(92)}}>

        <Text style={styles.headtxt}>General Terms and Conditions</Text>
        <View style={{flexDirection: 'row',width:responsiveWidth(92)}}>
                <View  style={{marginTop:responsiveHeight(.9), marginRight:responsiveWidth(3),}}>
                    <View style={{paddingHorizontal:responsiveWidth(1), paddingVertical:responsiveHeight(.5), backgroundColor:blue, borderRadius:10,}}></View>
                    </View>
                    <View style={{width:responsiveWidth(92)}}>
                <Text style={styles.txt}>Caterstation is a digital Platform offers service to book events online.</Text>
                </View>
        </View>
        <View style={{flexDirection: 'row',width:responsiveWidth(92)}}>
                <View  style={{marginTop:responsiveHeight(.9), marginRight:responsiveWidth(3)}}><View style={{paddingHorizontal:responsiveWidth(1), paddingVertical:responsiveHeight(.5), backgroundColor:blue, borderRadius:10,}}></View></View>
                <Text style={styles.txt}>
    Caterstation allows its users to book from halls, marquees, farmhouses, and corporate events online through its application.</Text>

        </View>
        <View style={{flexDirection: 'row',width:responsiveWidth(92)}}>
                <View  style={{marginTop:responsiveHeight(.9), marginRight:responsiveWidth(3)}}><View style={{paddingHorizontal:responsiveWidth(1), paddingVertical:responsiveHeight(.5), backgroundColor:blue, borderRadius:10,}}></View></View>
                <Text style={styles.txt}>

                Caterstation provides you with an easy way to book your events displayed on the Platform.

                </Text>

        </View>
        <View style={{flexDirection: 'row',width:responsiveWidth(92)}}>
                <View  style={{marginTop:responsiveHeight(.9), marginRight:responsiveWidth(3)}}><View style={{paddingHorizontal:responsiveWidth(1), paddingVertical:responsiveHeight(.5), backgroundColor:blue, borderRadius:10,}}></View></View>
                <Text style={styles.txt}>

                The purpose of this site and app is to provide a simple and convenient service to consumers, linking them to event organizers that provide them with exquisite and reliable management services.

                </Text>

        </View>
        <View style={{flexDirection: 'row',width:responsiveWidth(92)}}>
                <View  style={{marginTop:responsiveHeight(.9), marginRight:responsiveWidth(3)}}><View style={{paddingHorizontal:responsiveWidth(1), paddingVertical:responsiveHeight(.5), backgroundColor:blue, borderRadius:10,}}></View></View>
                <Text style={styles.txt}>

                It is important for consumers to understand that Caterstation does not in any way independently verify the products of vendors, the quality of their products, or that a vendor is in compliance with applicable laws and regulations pertaining to food processing as the vendor is solely liable for such responsibility.

                </Text>

        </View>
        <View style={{flexDirection: 'row',width:responsiveWidth(92)}}>
                <View  style={{marginTop:responsiveHeight(.9), marginRight:responsiveWidth(3)}}><View style={{paddingHorizontal:responsiveWidth(1), paddingVertical:responsiveHeight(.5), backgroundColor:blue, borderRadius:10,}}></View></View>
                <Text style={styles.txt}>

                Users (Customers) must make themselves comfortable through information provided by us on the Platform and website or as requested by buyers directly from the vendors as to the quality and reliability, as well as to their compliance with applicable laws and regulations. Caterstation does not in any way guarantee the quality of any food or product or that any food complies with the applicable laws and regulations.

                </Text>

        </View>



        </View>
        <View style={{width:responsiveWidth(92)}}>

<Text style={styles.headtxt}> Refund & Cancellation Policy</Text>
<View style={{flexDirection: 'row',width:responsiveWidth(92)}}>
        <View  style={{marginTop:responsiveHeight(.9), marginRight:responsiveWidth(3),}}>
            <View style={{paddingHorizontal:responsiveWidth(1), paddingVertical:responsiveHeight(.5), backgroundColor:blue, borderRadius:10,}}></View>
            </View>
            <View style={{width:responsiveWidth(92)}}>
        <Text style={styles.txt}>Cancel events at least 15 days before the event. The pre-booking amount will be refundable within 48 hours of the booking time, otherwise, there will be no money Payback. In case of cancellation, 3% of CaterStation on overall service amount will be non-refundable.</Text>
        </View>
        </View>
</View>
</View>

</ScrollView>
  )
}
const styles=StyleSheet.create({

    headtxt:{ color:black, fontSize:responsiveFontSize(2.2), fontWeight: 'bold',marginBottom:responsiveHeight(1)},
    txt:{color:black, fontSize:responsiveFontSize(1.8), textAlign:"justify",marginBottom:responsiveHeight(2)}
});


export default TermsCondition