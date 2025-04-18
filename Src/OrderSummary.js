import { View, Text ,Image,ScrollView,TextInput, Pressable,StyleSheet, SafeAreaView, Modal} from 'react-native'
import React, { useState } from 'react'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { black, greyBg, white , lightgrey, blue} from './Colors';
import HorizontalBar from './HorizontalBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';




const OrderSummary = ({route}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const {


      city,
      event_date,
      event_duration,
      event_location,
      event_time,
      event_type,
      full_name,
      num_of_guests,
      required_services,
      venue_type,
      phone,
      vendor_id,
      vendor,

    }=route.params;

  return (
    <SafeAreaView  style={{backgroundColor:white, flex:1}}>
    <ScrollView>
      



    <HorizontalBar backPress={() => navigation.goBack()} title="Order Summary" /> 

    <View style={{width:responsiveWidth(90), marginHorizontal:responsiveWidth(5), backgroundColor:lightgrey, flexDirection:"column", paddingTop:responsiveHeight(1), paddingBottom:responsiveHeight(2),paddingLeft:responsiveWidth(2), marginVertical: responsiveHeight(2),}}>
              
    <View style={{flexDirection:"row", justifyContent:"space-between", width:responsiveWidth(60),marginTop:responsiveHeight(1.2) }}>
              
                <View style={{width:responsiveWidth(15),  justifyContent:"center", alignItems:"center", }}>
                    {/* <Text style={{borderRadius: 30,backgroundColor:"green",fontSize:responsiveFontSize(7), width:responsiveWidth(15), height:responsiveHeight(9),textAlign:"center", paddingBottom:responsiveHeight(0.5)}}>D</Text> */}
                    {/* <Image style={{width:responsiveWidth(15), height:responsiveHeight(8), borderRadius:50}} source={require('../Images/sofa.jpg')}/> */}
          <FontAwesome5 name="shopping-cart" color={'#383838'} size={55} />

                    </View>
                              <View style={{width:responsiveWidth(65),  paddingTop:responsiveHeight(1.5), paddingLeft:responsiveWidth(5)}}>
                              <Text style={{color:black,  fontSize:responsiveFontSize(2.2), fontWeight: 'bold',}}>{full_name}</Text>
                              {/* <Text style={{color:black, fontSize:responsiveFontSize(1.8) , fontWeight: 'bold', }}>Order id #984589</Text> */}


                              </View>
                             
                             
                             
                             
                              
                             
                          </View>
                        


                    </View>



                    <View style={{paddingHorizontal:responsiveWidth(5),}}>
                    <Text style={{color:black, fontWeight:"bold", fontSize:responsiveFontSize(2), marginBottom:responsiveHeight(1),}}>Order Summary</Text>

                    <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>Event Type</Text>
                        <Text style={styles.txt}>{event_type}</Text>
                    </View>
                    <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>Event Duration</Text>
                        <Text style={styles.txt}>{event_duration}</Text>
                    </View>
                    <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>Event Date</Text>
                        <Text style={styles.txt}>{event_date}</Text>
                    </View>
                    <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>Event Time</Text>
                        <Text style={styles.txt}>{event_time}</Text>
                    </View>
                    <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>Expected Persons</Text>
                        <Text style={styles.txt}>{num_of_guests}</Text>
                    </View>
                    <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>Event Location </Text>
                        <Text style={styles.txt}>{event_location}</Text>
                    </View>
                    <View style={{justifyContent:"center",alignItems:"center", marginTop:responsiveHeight(3), marginBottom:responsiveHeight(5)}}>
                        <Pressable  onPress={() => setModalVisible(true)} style={{paddingHorizontal:responsiveWidth(15), paddingVertical:responsiveHeight(1.5), backgroundColor:blue}}><Text style={{color:white}}>Submit Order</Text></Pressable>

                    </View>
                    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width:responsiveWidth(90),justifyContent:"center",alignItems:"center", marginTop:responsiveHeight(3), backgroundColor:blue}}>
                        <Image source={require('../Images/Vector.png')}/>
                       
                        <Text style={{color:"white", marginTop:responsiveHeight(3), fontWeight: 'bold',}}>Order Confirm</Text>
                        <Text style={{color:"white",paddingHorizontal:responsiveWidth(5),textAlign:"center",marginTop:responsiveHeight(3), fontSize: responsiveFontSize(2),}}>
                        Thankyou! Team CaterStation will contact you soon!</Text>
            {/* <Image style={{marginTop:responsiveHeight(3)}} source={require('../Images/logos_whatsapp-icon.png')}/>  */}
            <Pressable
              style={{paddingVertical:responsiveHeight(1), paddingHorizontal:responsiveWidth(20), backgroundColor:white,marginTop:responsiveHeight(6)}}
              onPress={() => {setModalVisible(!modalVisible), navigation.navigate("ForYou")}}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
            </View>
           
           
          </View>
        </View>
      </Modal>

                    </View>


    </ScrollView>
    
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    txt:{
        color:black,
        fontSize: responsiveFontSize(1.8),
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        // margin: 20,
        backgroundColor: blue,
        height:responsiveHeight(35),
        width:responsiveWidth(90),
        
      },
      button: {
       
        paddingHorizontal: responsiveWidth(5),
        paddingVertical:responsiveHeight(2)
        
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor:blue ,
      },
      textStyle: {
        color: blue,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});

export default OrderSummary 