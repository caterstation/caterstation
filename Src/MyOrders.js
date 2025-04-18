import React, { useState } from 'react';
import { View, Text ,StyleSheet, TextInput , Pressable,ScrollView, Image} from 'react-native'

import { black, greyBg, white } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const FirstRoute = () => (
    <ScrollView style={[styles.scene, { backgroundColor: '#ffffff' }]}>
      <View style={[styles.shadowcard,
          {
           flexDirection: "row", paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), width: responsiveWidth(94),

          }]}>

            <View style={{ flexDirection: "row", width: responsiveWidth(100), paddingLeft: responsiveWidth(2) }}>
              <View style={{ width: responsiveWidth(15), backgroundColor: "green " }}>
                <Image style={{ height: responsiveHeight(6), width: responsiveWidth(12) }} source={require('../Images/food1.jpg')} />
              </View>
              <View style={{ flexDirection: "column", }}>
                {/* <View style={{justifyContent:"space-between", flexDirection:"row" }}> */}
                <Text style={{ fontWeight: 'bold', color: black }} >One Dish with mutton</Text>
                <View><Text>Alnafora</Text></View>

                <Text style={{ fontWeight: 'bold', color: black }} >Rs: 2000</Text>
               
              </View>


            </View>

          </View>
    </ScrollView>
   );
   
   const SecondRoute = () => (
    <ScrollView style={[styles.scene, { backgroundColor: '#ffffff' }]}>
    <View style={[styles.shadowcard,
        {
         flexDirection: "row", paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), width: responsiveWidth(94),

        }]}>

          <View style={{ flexDirection: "row", width: responsiveWidth(100), paddingLeft: responsiveWidth(2) }}>
            <View style={{ width: responsiveWidth(15), backgroundColor: "green " }}>
              <Image style={{ height: responsiveHeight(6), width: responsiveWidth(12) }} source={require('../Images/food1.jpg')} />
            </View>
            <View style={{ flexDirection: "column", }}>
              {/* <View style={{justifyContent:"space-between", flexDirection:"row" }}> */}
              <Text style={{ fontWeight: 'bold', color: black }} >One Dish with mutton</Text>
              <View><Text>Alnafora</Text></View>

              <Text style={{ fontWeight: 'bold', color: black }} >Rs: 2000</Text>
             
            </View>


          </View>

        </View>
  </ScrollView>
   );
   
   const ThirdRoute = () => (
    <ScrollView style={[styles.scene, { backgroundColor: '#ffffff' }]}>
    <View style={[styles.shadowcard,
        {
         flexDirection: "row", paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), width: responsiveWidth(94),

        }]}>

          <View style={{ flexDirection: "row", width: responsiveWidth(100), paddingLeft: responsiveWidth(2) }}>
            <View style={{ width: responsiveWidth(15), backgroundColor: "green " }}>
              <Image style={{ height: responsiveHeight(6), width: responsiveWidth(12) }} source={require('../Images/food1.jpg')} />
            </View>
            <View style={{ flexDirection: "column", }}>
              {/* <View style={{justifyContent:"space-between", flexDirection:"row" }}> */}
              <Text style={{ fontWeight: 'bold', color: black }} >One Dish with mutton</Text>
              <View><Text>Alnafora</Text></View>

              <Text style={{ fontWeight: 'bold', color: black }} >Rs: 2000</Text>
             
            </View>


          </View>

        </View>
  </ScrollView>
   );
   
   const renderScene = SceneMap({
     upcoming: FirstRoute,
     completed: SecondRoute,
     cancelled: ThirdRoute,
   });
   

const MyOrders = () => {

    const [index, setIndex] = useState(0);
  const [routes] = useState([
     { key: 'upcoming', title: 'Upcoming' },
     { key: 'completed', title: 'Completed' },
     { key: 'cancelled', title: 'Cancelled' },
  ]);
 
  const renderLabel = ({ route }) => (
     <Text style={styles.tabLabel}>{route.title}</Text>
  );
 
  const renderTabBar = (props) => (
     <TabBar
       {...props}
       indicatorStyle={styles.indicator}
       style={styles.tabbar}
       renderLabel={renderLabel}
     />
  );

  return (
    <View style={{flex:1,backgroundColor:white}}>
    <View
      style={{ flexDirection: "row", width: responsiveWidth(100), paddingVertical: responsiveHeight(2), paddingHorizontal: responsiveWidth(5), alignItems: "center", borderBottomColor: greyBg, borderBottomWidth: 1 ,}}>
      <FontAwsome name="angle-left" color={"black"} size={20} />

      <Text style={{ marginLeft: responsiveWidth(28), color: black, fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>My Orders</Text>
    </View>
    <View style={{marginHorizontal:responsiveWidth(3), marginTop:responsiveHeight(1), height:responsiveHeight(90)}}>

   
    <TabView
       navigationState={{ index, routes }}
       renderScene={renderScene}
       onIndexChange={setIndex}
       initialLayout={{ width: '100%' }}
       renderTabBar={renderTabBar}
     /> 

        </View>
        </View>
  )
}
const styles = StyleSheet.create({
    scene: {
       flex: 1,
       
    },
    tabbar: {
       backgroundColor: '#ffffff',
       marginBottom:responsiveHeight(2)
    },
    tabLabel: {
       color: '#000000',
       // backgroundColor:"red"
       // marginTop:20
    },
    indicator: {
       backgroundColor: black,
       height: 2,
    },
    shadowcard: {
        // marginHorizontal: responsiveWidth(2),
        marginVertical: responsiveHeight(1),
        borderRadius: 5, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Elevate the view to create a shadow effect
        elevation: 4,
      },
   });

export default MyOrders