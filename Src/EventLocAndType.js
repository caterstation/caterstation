import React, { useState , useEffect} from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image, ScrollView, Pressable, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import AntDesign from "react-native-vector-icons/AntDesign"
import { black, blue, greyBg, lightgrey, yellow } from './Colors';
import MyHeader from './MyHeader';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';
import { getEventType, getLocation, getPackage } from './Hooks/api/packagesApi';
import { getAllEvents } from './Hooks/api/AllEventsApi';
// import { getAllEvents } from './Hooks/api/AllEventsApi';



const EventLocAndType = ({route}) => {
  const navigation = useNavigation();
  const { myAllLocation } = route.params;

  const [packages, setPackages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.caterstation.pro/api/packages');
      const data = await response.json();
      const filteredPackages = data.packages.filter(
        (item) => item.location === myAllLocation.toString()
      );
      setPackages(filteredPackages);
      console.log('filter', filteredPackages)
    };

    fetchData();
  }, []);
   
  
    return (
      <View style={{flex:1}}>
          <View style={{flexDirection:"row",width:responsiveWidth(100), paddingVertical:responsiveHeight(2), paddingHorizontal:responsiveWidth(5), alignItems:"center", borderBottomColor:greyBg, borderBottomWidth:1, marginBottom:responsiveHeight(1)}}>
      <Pressable  onPress={()=>{ navigation.goBack()}}>
            <Text style={{color:black,fontSize:responsiveFontSize(3), fontWeight:"bold", paddingHorizontal:responsiveWidth(2),paddingVertical:responsiveHeight(2)}}>x</Text>
      </Pressable>



      <Text style={{marginLeft:responsiveWidth(28), color:black, fontSize: responsiveFontSize(2.5), fontWeight:"bold"}}>{myAllLocation}</Text>
    </View>
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id.toString()} // Use a unique key for each item
          // renderItem={renderItem}
          renderItem={(item)=>{
            
const imgS=`https://www.caterstation.pro/public/vendor/package/${item.item.image}`
console.log("imgS",imgS)

            console.log('item from flatlist', item)
            return(
              <View style={[styles.MainContainer, styles.shadowcard,
                // {backgroundColor:"red"}
                
                ]}>
                {/* image view */}
                
       
                <Pressable style={{ width:responsiveWidth(90), }} >
                  {/* img */}
                  <Image
                    source={{uri:imgS}}
                    
                    style={{ width:"99%", height:responsiveHeight(20), borderRadius: 10, }}
                  />
                </Pressable>
                
                <View style={{ paddingHorizontal: responsiveWidth(2) }}>
                  
                  <View style={[styles.Row, styles.JustifyContent_spaceBetween, { marginTop: responsiveHeight(1) }]}>
                   {/* passaing data from button view detail */}
                    <Pressable
                    //  onPress={() => navigation.navigate("PackageDetails")}
                     
                     
                     ><Text style={styles.EventHeading}>{item.item.package_name}</Text></Pressable>
                   
                    <View style={[styles.Row, styles.JustifyContent_center, styles.AlignItemsCenter]}>
                      <AntDesign name="star" color="gold" size={12} />
                      <Text style={styles.EventPRiceHeading}>4</Text>
                      <Text style={styles.EventReviewCountHeading}>(200)</Text>
                    </View>
                  </View>
    
    
                  {/* detail body */}
                  <View>
                    <View> 
    
                      <Text style={[styles.EventPRice,]}>PKR {item.item.price} 
                      </Text>
                    </View>
      
                    <View style={[styles.Row, styles.JustifyContent_spaceBetween, { marginTop: 5,   marginBottom: 10,}]}>
                      {/* Wedding Event title */}
                      <View style={{ position: "relative" }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('PkgFilterdetail',
                     {
                      item,
                      img:'https://www.caterstation.pro/public/vendor/package/'
                      // Myitem:item.price
    
                    }
                    )}} style={styles.btnViewDetail}>
                         
                          <Text style={{ color:black, fontSize: responsiveFontSize(1.5),  }}>View Detail</Text>
    
    
                        </TouchableOpacity></View>
                      {/* Wedding Event reviews */}
                      <View style={[styles.JustifyContent_center, styles.AlignItemsCenter]}>
                        <FontAwsome name="whatsapp" color={"#25D366"} size={25} />
    
                      </View>
                    </View>
                  </View>
                </View>
              </View>

            )}}

        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  MainContainer: {
    marginHorizontal:responsiveWidth(2.5),
    // borderRadius:50,
    marginBottom: responsiveHeight(2),
    // borderRadius:30,
    width:responsiveWidth(95)

  },
  Row: {
    flexDirection: "row",
  },
  Column: {
    flexDirection: "column"
  },
  JustifyContent_spaceBetween: {
    justifyContent: "space-between",
  },
  JustifyContent_center: {
    justifyContent: "center",

  },
  AlignItemsCenter: {
    alignItems: "center",
  },
  EventHeading: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
    color: "black"
  },
  EventPRiceHeading: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.5),
    color: "black",
    marginLeft: responsiveWidth(1)

  },
  EventPRice: {
    // fontWeight:"600",
    fontSize: responsiveFontSize(1.5),
    color: "grey",
    // marginLeft:5
    marginTop: responsiveHeight(.5)

  },
  EventReviewCountHeading: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.5),
    color: greyBg,
    marginLeft: responsiveWidth(1)

  },
  btnViewDetail: {
    backgroundColor: lightgrey,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(.8),
    borderRadius: 20,
    borderWidth:2,
    marginVertical: responsiveHeight(1),
    flexDirection: "row",

  },
  shadowcard: {
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android elevation (for consistent shadow on Android)
    elevation: 5,
    // Additional styles
    backgroundColor: '#fff', // Example background color
    // padding: 20, // Example padding
    paddingHorizontal:responsiveWidth(3),
    paddingVertical:responsiveHeight(1.5)
  },
  
  buttonfiltershadowcard: {

    // // paddingHorizontal: 15,
    // paddingVertical: responsiveHeight(2),

    // borderRadius: 10,
    // shadowColor: '#BEBEBE',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // // Elevate the view to create a shadow effect
    // elevation: 4,
    // marginVertical:responsiveHeight(2)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android elevation (for consistent shadow on Android)
    elevation: 5,
    // Additional styles
    backgroundColor: '#fff', // Example background color
    // padding: 20, // Example padding
    paddingHorizontal:responsiveWidth(3),
    paddingVertical:responsiveHeight(1.5)
  },
  ModalBox: {
    height: responsiveHeight(35),
    marginHorizontal:responsiveWidth(2)

  },
 
  bottomBtn: {

    backgroundColor: blue,
    paddingHorizontal: responsiveWidth(15),
    paddingBottom: responsiveHeight(1),
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 5,
    marginBottom: responsiveHeight(2),
    paddingTop:responsiveHeight(.8)
  },

  bottomRow: {

    flexDirection: "column-reverse",

    alignItems: "center",
  },

  // ____________________checkbox___________________________
  Checkcontainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
  },
  checkboxContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal:responsiveWidth(1),
     flexDirection: "row",
     marginVertical:responsiveHeight(.7)
  },
  checkbox: {
    width: responsiveWidth(4.2),
    height: responsiveHeight(2.3),
    borderRadius: 2,
    borderWidth: 2,
    borderColor: yellow,
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsiveWidth(2),
    marginTop:responsiveHeight(.3)



  },
  checked: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
     marginTop: responsiveHeight(.2),
    textAlign: "center",
    fontSize: responsiveFontSize(1.5),

  },

});

export default EventLocAndType