

// caterstation in middle
// review and rating
// promotion
// icons







import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  SafeAreaView,
  ImageBackground,
  Alert,
  StatusBar,
  Linking,
} from 'react-native';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AirbnbRating } from 'react-native-ratings';
import { black, blue, yellow, greyDark, white, Lblue } from './Colors';
import MyHeader from './MyHeader';
import { useNavigation } from '@react-navigation/native';
import { greyBg } from './Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import HeaderHome from './HeaderHome';
import { getAllHome, getHomeEvents, getHomeOffers, getHomeTestimonials, getHomeVendor } from './Hooks/api/ForyouApi';
import { getVendors } from './Hooks/api/vendorApi';
import Video from 'react-native-video';
import { getAllCities } from './Hooks/api/MyCities';
import HorizontalBar from './HorizontalBar';
import NetInfo from '@react-native-community/netinfo';
import Heading from './Heading';
import Title from './Title';

const getDataService = async () => {
  const result = await getAllHome();
  return result;
};

const getAllVendors = async () => {
  const result = await getVendors();
  return result;
};

const getDataoffers = async () => {
  const result = await getHomeOffers();
  return result;
};

const getDataTestimonials = async () => {
  const result = await getHomeTestimonials();
  return result;
};

const ForYou = () => {
  const saveUser = async (phoneNumber) => {
    try {
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      console.log('Phone number saved successfully!');
    } catch (error) {
      console.error('Error saving phone number:', error);
    }
  };

  const getData = async () => {
    const result = await getAllCities();
    setmyCities(result?.cities);
    return result;
  };

  const videoUri = require('../Images/video.mp4');
  const mock = require('../Images/mock.gif');
  const navigation = useNavigation();
  const [rating, setRating] = useState(5);
  const [isPressed, setIsPressed] = useState(false);
  const [myCities, setmyCities] = useState();

  const [myAllDataVendor, setmyAllDataVendor] = useState([]);
  const [myAllDataoffers, setmyAllDataoffers] = useState([]);
  const [myAllDataEvent, setMyAllDataEvent] = useState([]); // Corrected state setter function

  const [myAllDataTestimonials, setmyAllDataTestimonials] = useState([]);
  const getDataEvents = async () => {
    try {
        const result = await getHomeEvents();
        // console.log('Events method result:', result);
        const  data = JSON.stringify(result);
        setMyAllDataEvent(result?.events);
    } catch (error) {
      console.log(" methoid   Error ");

        // console.error('Error in getDataEvents:', error);
        // console.error('Error in getDataEvents message:', error.message);
        // console.error('Error in getDataEvents status:', error.status);
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        console.error('Error request:', error.request);
    }
  };

  const pressableStyle = {
    backgroundColor: isPressed ? '#000D52' : 'white',
  };
  const TextpressableStyle = {
    color: isPressed ? 'white' : '#000D52',
  };

  useEffect(() => {
    const checkConnectionAndFetchData = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        getData().then(result => {
          // console.log("useEffect");
        });

        getDataService().then(result => {
          // setmyAllDataService(result);
        });

        getAllVendors().then(result => {
          setmyAllDataVendor(result);
        });

        getDataoffers().then(result => {
          setmyAllDataoffers(result?.data);
        });

        getDataTestimonials().then(result => {
          setmyAllDataTestimonials(result?.data);
        }); 
        getDataEvents();
      //   getDataEvents().then(result => {
      //     console.log('Events useEffect', result); // Log the result to check the data
      //     setmyAllDataEvent(result);
      // }).catch(error => {
      //     console.log('Error fetching events:', error); // Log any error encountered
      // });
      } else {
        Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
      }
    };

    checkConnectionAndFetchData();
  }, []);

  const [services, setservice] = useState([
    { myservice: "Catering", img: require("../Images/ic.png") },
    { myservice: "DECOR", img: require("../Images/id.png") },
    { myservice: "Photography", img: require("../Images/ip.png") },
    { myservice: "Food", img: require("../Images/if.png") },
    { myservice: "Wedding Venues", img: require("../Images/iv.png") },
  ]);
  // console.log("myAllDataEvent : ",myAllDataEvent)
  const openInsta = () => {
    // Replace 'tiktok_username' with the actual username of the TikTok account
    const url = 'https://www.instagram.com/caterstation.pro?igsh=bnZlYXRtOGV1a2Fm&utm_source=qr';

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
}; 
 const openFb = () => {
    // Replace 'tiktok_username' with the actual username of the TikTok account
    const url = 'https://www.facebook.com/caterstation.pro?mibextid=LQQJ4d';

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
}; 
const openTiktok = () => {
    // Replace 'tiktok_username' with the actual username of the TikTok account
    const url = 'https://www.tiktok.com/@caterstation.pro0?_t=8p01Z0rLrYP&_r=1';

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
};
const openoutube = () => {
    // Replace 'tiktok_username' with the actual username of the TikTok account
    const url = 'https://youtube.com/@caterstationpro?si=vRSEJCkoe6zdELGb';

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
};






  return (
    <SafeAreaView style={{ flex: 1, marginBottom: responsiveHeight(9), backgroundColor:white }}>
        {/* <StatusBar
        
barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
  backgroundColor={Platform.OS === 'android' ? "#fff" : undefined}
/> */}

{/* <View style={{backgroundColor:"red", height:responsiveHeight(10)}}>
{/* <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Platform.OS === 'android' ? "#000D52" : "#000D52"}
        translucent={false}
      /> */}
{/* </View>  */}



{/* <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} /> */}
      <ScrollView showsVerticalScrollIndicator={false}  style={{ paddingBottom: responsiveHeight(15), }}>
        {/* headerView */}

        {/* <MyHeader /> */}

        <MyHeader showBackButton={false} />
        {/* <HorizontalBar backPress={() => navigation.goBack()} title="For you" /> */}
        {/* Services */}
        {/* <Image source={require("../Images/")}/> */}

        <View


          // source={require('../Images/bg.jpg')}
          style={styles.servicesBlock} >


          <FlatList

            data={services}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={(item) => {

              return (
                <Pressable onPress={() => { navigation.navigate('ServiceVendors', { myService: item.item.myservice }) }} style={styles.servicesCoverblock}>
                  <View style={styles.servicesIconCircle}>
                    <Image resizeMode='contain' style={{
                      width: responsiveWidth(10),
                      height: responsiveHeight(5),
                    }}
                      //  source={{ uri: item.item.img}}
                      source={item.item.img}


                    />
                  </View>
                  <Title numberOfLines={1} style={{color:white}} >{item.item.myservice}</Title>

                  {/* <Text style={styles.servicesColor}>{item.item.myservice}</Text> */}
                </Pressable>

              )
            }}
          />





        </View>



        <View style={{ width:responsiveWidth(100), backgroundColor:Lblue, marginTop:responsiveHeight(3),marginBottom:responsiveHeight(1)}}>
              <Image 
              // resizeMode='contain'
              source={require("../Images/banner2.jpg")}
              style={{ width:responsiveWidth(100),}}
              />
</View>
 

        {/* wedding planing tool */}
        {/* old code */}

        {/* <View style={styles.WedPlanToolBlock}>

          <Heading>Event Planing Tool</Heading>
          <View style={styles.WedPlanToolBlockCover}>


            <Pressable
             
              style={[styles.wedToolBtn]}
                onPress={() => {

               

                  console.log('pressed')
                  navigation.navigate('WeddingCard', { card: "wed" })


                }}
              >
                <Text style={{ color: blue, fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start", marginBottom: responsiveHeight(1) }}>Create your Custom E-invites</Text>
                <View style={{ flexDirection: "row",  marginLeft:responsiveWidth(1)}}>
                  <Text style={styles.wedtoolColor}>Let's get started </Text>
                  <View style={{justifyContent:"center"}}>

                    <FontAwsome name="angle-right"  color={blue} size={responsiveFontSize(1.5)} />
                  </View>
                </View>
              </Pressable>
            
            <ImageBackground
              imageStyle={{ borderRadius: 6 }}
              source={require('../Images/eventType.png')}
              style={[styles.wedToolBtn]}
            >
           
              <Pressable

               onPress={()=>{
                console.log('====================================');
                console.log("pressssseddd");
                console.log('====================================');
                navigation.navigate('Cities')}}
              >
                <Text style={{ color: blue, fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start", marginBottom: responsiveHeight(1) }}>Create your Custom Order</Text>
                <View style={{ flexDirection: "row", marginLeft: responsiveWidth(1) }}>
                  <Text style={styles.wedtoolColor}>Let's get started </Text>
                  <View style={{justifyContent:"center"}}>
                    <FontAwsome name="angle-right"color={blue} size={responsiveFontSize(1.5)} />
                  </View>
                </View>
              </Pressable>

              
            </ImageBackground>







          </View>

        </View> */}
       
        <View style={styles.WedPlanToolBlock}>

          <Heading>Event Planing Tool</Heading>
          {/* <Text style={[styles.headingText, { marginBottom: responsiveHeight(2), marginTop: responsiveHeight(1) }]}>Event Planing Tool</Text> */}
          <View style={styles.WedPlanToolBlockCover1}>
{/* 
              <View style={{paddingVertical:responsiveHeight(1),}}>
              <View style={{height:responsiveHeight(18), backgroundColor:Lblue,width:responsiveWidth(45), backgroundColor:Lblue, borderRadius:5, paddingVertical:responsiveHeight(1), position:"relative"}}>
              <Text style={{ color: white, fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start", marginBottom: responsiveHeight(1), fontWeight:"bold" }}>Custom</Text>
              <Text style={{ color: white, fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start", marginBottom: responsiveHeight(1), fontWeight:"bold" }}>Package</Text>
                <View style={{position:"absolute", right:-9}}>

                    <Image resizeMode='contain' style={{height:responsiveHeight(19.7), width:responsiveWidth(22)}} source={require("../Images/cgirl.png") }/>

                </View>
                </View>
              </View> */}
              <Pressable
               onPress={()=>navigation.navigate('Menu')} 
               style={{paddingVertical:responsiveHeight(1),}}>
              <View style={{height:responsiveHeight(18), backgroundColor:Lblue,width:responsiveWidth(45), backgroundColor:Lblue, borderRadius:5, paddingVertical:responsiveHeight(1),flexDirection:"column", position:"relative"}}>
              <Text style={{ color: white, fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(1.6), textAlign:"center"  ,fontWeight:"500" }}>Custom Package</Text>
              <Text style={{ color: white, fontSize: responsiveFontSize(1.6), paddingHorizontal: responsiveWidth(1.6), textAlign:"center" , fontWeight:"400", marginTop:responsiveHeight(1) }}>Personalise your event with our custom packages.</Text>
              {/* <Text style={{ color: white, fontSize: responsiveFontSize(1.6), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start",  fontWeight:"400" }}></Text>
              <Text style={{ color: white, fontSize: responsiveFontSize(1.6), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start",  fontWeight:"400" }}></Text>
              <Text style={{ color: white, fontSize: responsiveFontSize(1.6), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start",  fontWeight:"400" }}></Text> */}
              {/* <Text style={{ color: white, fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start", marginBottom: responsiveHeight(1), fontWeight:"bold" }}></Text> */}
                <View style={{ marginTop:responsiveHeight(.8),  justifyContent:"center", alignItems:"center"}}>

                    <Image resizeMode='contain' style={{height:responsiveHeight(9.5), width:responsiveWidth(20)}} source={require("../Images/cpkg.png") }/>

                </View>
                </View>
              </Pressable>
 {/* <View style={{paddingVertical:responsiveHeight(1),}}>
              <View style={{height:responsiveHeight(18), backgroundColor:Lblue,width:responsiveWidth(45), backgroundColor:Lblue, borderRadius:5, paddingVertical:responsiveHeight(1), position:"relative"}}>
              <Text style={{ color: white, fontSize: responsiveFontSize(2), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start",  fontWeight:"500" }}>Custom Package</Text>
              <Text style={{ color: white, fontSize: responsiveFontSize(1.6), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start",  fontWeight:"400", marginTop:responsiveHeight(1) }}>Personalise your </Text>
              <Text style={{ color: white, fontSize: responsiveFontSize(1.6), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start",  fontWeight:"400" }}>event with our</Text>
              <Text style={{ color: white, fontSize: responsiveFontSize(1.6), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start",  fontWeight:"400" }}>custom</Text>
              <Text style={{ color: white, fontSize: responsiveFontSize(1.6), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start",  fontWeight:"400" }}>packages.</Text>
                <View style={{ right:-30,top:24.5, marginTop:responsiveHeight(.8),position:"absolute"}}>

                    <Image resizeMode='contain' style={{height:responsiveHeight(14.5), width:responsiveWidth(30)}} source={require("../Images/cgirl.png") }/>

                </View>
                </View>
              </View> */}

          






          
           
          <View style={styles.WedPlanToolBlockCover}>


            <Pressable
              //  source={require('../Images/bg.jpg')}
              // style={[styles.wedToolBtn]}
              style={[styles.flipshadowcard]}
                onPress={() => {

                  // navigation.navigate('')

                  console.log('pressed')
                  navigation.navigate('WeddingCard', { card: "wed" })


                }}
              >
                <View style={{flexDirection:"row"}}>
                  <View style={{flexDirection:"column", justifyContent:"center",   width:responsiveWidth(30)}}>
                    <Text style={styles.wedtoolColor}>Build your </Text>
                  <Text style={styles.wedtoolColor}>Digital E-invites</Text>
                  </View>
                  <View style={{justifyContent:"center", alignItems:"center",  width:responsiveWidth(13) }}>
                    <Image style={{
                      height:responsiveHeight(4), width:responsiveWidth(7.5)

                      // flex: 1,
    // alignSelf: 'stretch',
                      // height:responsiveHeight(8), width:responsiveWidth(8)

                    }} source={require('../Images/einviteicon1.png')}/>
                  </View>
                </View>
                  
                {/* custom.png */}

                {/* <Text style={{ color: blue, fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start", marginBottom: responsiveHeight(1) }}>Block 1 einvite</Text> */}
                <View style={{ flexDirection: "row",  marginLeft:responsiveWidth(1)}}>
                  {/* <Text style={styles.wedtoolColor}>Let's get started </Text> */}
                  <View style={{justifyContent:"center"}}>

                    {/* <FontAwsome name="angle-right"  color={blue} size={responsiveFontSize(1.5)} /> */}
                  </View>
                </View>
              </Pressable>
            
            <View
              // imageStyle={{ borderRadius: 6 }}
              // source={require('../Images/eventType.png')}
              // style={[styles.wedToolBtn]}
              style={[styles.flipshadowcard]}

            >
              {/* Existing content */}
              <Pressable
// disabled
               onPress={()=>{
                console.log('====================================');
                console.log("pressssseddd");
                console.log('====================================');
                navigation.navigate('Cities')}}
              >
                {/* <Text style={{ color: blue, fontSize: responsiveFontSize(2.2), paddingHorizontal: responsiveWidth(1.6), justifyContent: "flex-start", marginBottom: responsiveHeight(1) }}>Block 2  Custom Order</Text> */}
               
                <View style={{flexDirection:"row"}}>

                  <View style={{flexDirection:"column", justifyContent:"center",   width:responsiveWidth(30)}}>
                  <Text style={styles.wedtoolColor}>Create your </Text>
                  <Text style={styles.wedtoolColor}>Custom Order</Text>
                  </View>
                  <View style={{justifyContent:"center", alignItems:"center",  width:responsiveWidth(13) }}>
                    <Image style={{
                      height:responsiveHeight(4), width:responsiveWidth(7.5)
                      }}
                      //  resizeMode='contain'
                       source={require('../Images/custom1.png')}/>
                  </View>
                  </View>
              </Pressable>

            </View>







          </View>
  </View>
        </View>
        {/* these were cities */}
       
        {/* <View style={{ paddingLeft: responsiveWidth(2), marginBottom:responsiveHeight(1) }}> 

  <Heading>Cities</Heading>

        </View> */}


        {/* <View style={{width:"100%" , flexDirection:"row"}}> 

                  
                  <FlatList
                data={myCities}
                horizontal
                showsHorizontalScrollIndicator={false} 
                scrollEnabled={false}
                // numColumns={3}
                renderItem={({item}) =>  {
                  
  const imgS=`https://caterstation.pro/public/city/${item.image}`
  
                  return(
                  <Pressable style={{ width: responsiveWidth(33),paddingVertical:responsiveHeight(2)
                  }}>
  
                    <TouchableOpacity
                      style={{
                      
                          justifyContent:"center", alignItems:"center",
                      
                      }}
                      onPress={() => { navigation.navigate('AllCitiesVendors', {city:item.city, id:item.id})}}
                      >
  
                       
                         
                         
                          <Image style={{    borderRadius: 60,
        height:responsiveWidth(17),
        width:responsiveWidth(17),}} source={{uri:imgS}} />
    
    <Title> {item.city}</Title>
  
  
                    </TouchableOpacity>
                    </Pressable>
                  )}
                }
              />
               
                   </View> */}



        {/* vendors */}

       <View style={[styles.venuesBlock]}>
       <View style={{ paddingLeft: responsiveWidth(2), marginBottom:responsiveHeight(1) }}> 

<Heading>Featured Vendors</Heading>

      </View>
          {/* <Text style={[styles.headingText, { marginBottom: responsiveHeight(2), marginTop: responsiveHeight(1), paddingLeft: responsiveWidth(2) }]}>Featured Vendors</Text> */}

          <View style={{ paddingLeft: responsiveWidth(2) }}>
            <FlatList
              data={myAllDataVendor}

              showsHorizontalScrollIndicator={false}
              horizontal={true}
              // keyExtractor={item => item.id} 
              renderItem={({ item }) => {
                // console.log('vendor', item)
                const imgS = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`
                const cover = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`

                // console.log('home vendor thumb', imgS)
                // console.log('home vendor cover_img', cover)

                return (<>

                  <Pressable disabled onPress={() => {
                    navigation.navigate("ForYouDetailVendor",
                      {
                        item,
                        Thumb: imgS,
                        Cover: cover,

                      }
                    )
                  }} >
                    <Image
                      style={{ height: responsiveHeight(12), width: responsiveWidth(35), borderRadius: 10, marginHorizontal: responsiveWidth(1), marginTop: responsiveHeight(1) }}
                      // source={require("../Images/1mIhm3lQp2SNRbBptLjQJgSO0EXZdY9gHrxmu7qn.jpg")}
                      source={{ uri: imgS }}
                    />
                    {/* <Text> {item.title}</Text> */}

                  </Pressable>

                </>)
              }
              }
            />
          </View>




          <View style={{ marginTop: responsiveHeight(3), justifyContent: "center", alignItems: "center" }}>

            <Pressable

              onPress={() => { navigation.navigate('MyAllVen') }}
              style={[{ borderWidth: responsiveHeight(0.2), borderRadius: 18, paddingHorizontal: responsiveWidth(10), paddingVertical: responsiveHeight(0.8), borderColor: "#D8D8D8" }, pressableStyle]} >
              <Text style={[styles.headingText, { fontWeight: 'bold', fontSize: responsiveFontSize(1.5) }, TextpressableStyle]}>View All Vendors</Text>
            </Pressable>







          </View>



        </View> 

{/* events by caterstaion */}

        <View style={[styles.venuesBlock]}>

        <View style={{ paddingLeft: responsiveWidth(2), marginBottom:responsiveHeight(1) }}> 

<Heading>Events by Caterstation</Heading>

      </View>
          {/* <Text style={[styles.headingText, { marginBottom: responsiveHeight(2), marginTop: responsiveHeight(1), paddingLeft: responsiveWidth(2) }]}>Events by Caterstation</Text> */}

          <View style={{ paddingLeft: responsiveWidth(2) }}>
          <FlatList
            data={myAllDataEvent}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            // keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique id
            renderItem={({ item }) => {
                console.log('Rendering item:', item,null,2);
                
                const imgS = `https://www.caterstation.pro/public/event/mbl_img/${item.mbl_img}`
           

              // console.log('image item:', imgS);
                // const imgS = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`;
                // const cover = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`;

                return (
                    <Pressable
                        disabled
                        onPress={() => {
                            navigation.navigate("CSEvents");
                        }}
                    >
                         <Image
                            style={{
                                height: responsiveHeight(20),
                                width: responsiveWidth(25),
                                borderRadius: 10,
                                marginHorizontal: responsiveWidth(2),
                                marginTop: responsiveHeight(1),
                            }}
                            source={{ uri: imgS }}
                        /> 
                        {/* <Text style={{textAlign:"center", color:blue, marginTop:responsiveHeight(2), marginBottom:responsiveHeight(1)}}> */}
                    <View style={{justifyContent:"center", alignItems:"center",}}>
                          

                              <Title> {item.title} </Title>

                        {/* <Text style={{fontWeight: '600',marginTop:responsiveHeight(1), color:blue }}>   {item.title}</Text> */}
                        </View>
                    </Pressable>
                );
            }}
        />
          </View>




          <View style={{ marginTop: responsiveHeight(2), justifyContent: "center", alignItems: "center" }}>

            <Pressable

              onPress={() => { navigation.navigate('CSEvents') }}
              style={[{ borderWidth: responsiveHeight(0.2), borderRadius: 18, paddingHorizontal: responsiveWidth(10), paddingVertical: responsiveHeight(0.8), borderColor: "#D8D8D8" }, pressableStyle]} >
              <Text style={[styles.headingText, { fontWeight: 'bold', fontSize: responsiveFontSize(1.5), }, TextpressableStyle]}>Events by Caterstation</Text>
            </Pressable>







          </View>



        </View> 

        {/* trending */}
        {/* <View style={{ paddingVertical: responsiveHeight(3), paddingHorizontal: responsiveWidth(2), flexDirection: "column", marginBottom: responsiveHeight(2.5), }}>
          <Text style={[styles.headingText, { marginBottom: responsiveHeight(1), paddingLeft: responsiveWidth(1) }]}>Trending Today</Text>
          <View style={{ marginTop: responsiveHeight(2), }}>
            <View style={{ paddingHorizontal: responsiveWidth(2) }}><Image style={{ width: responsiveWidth(92), borderRadius: 10, height: responsiveHeight(15), marginRight: responsiveWidth(1), }} source={require("../Images/trening1.jpg")} /></View>
            <View style={{ flexDirection: "row", paddingTop: responsiveHeight(2), justifyContent: "space-around" }}>

              <Image style={{ width: responsiveWidth(45), borderRadius: 10, height: responsiveHeight(15) }} source={require("../Images/trend2.jpg")} />
              <Image style={{ width: responsiveWidth(45), borderRadius: 10, height: responsiveHeight(15) }} source={require("../Images/trend3.jpg")} />
            </View>
          </View>

        </View> */}

        {/* recommended packages */}
        <View style={[styles.venuesBlock, { marginBottom: responsiveHeight(3) ,}]}>
          {/* <Text style={[styles.headingText, { marginBottom: responsiveHeight(1), }]}>  */}

          <View style={{ paddingLeft: responsiveWidth(2), marginBottom:responsiveHeight(1) }}> 
          <Heading>Recommended Packages</Heading>


      </View>



          {/* <Text style={[styles.headingText, { marginBottom: responsiveHeight(2), marginTop: responsiveHeight(1), paddingLeft: responsiveWidth(2) }]}>Recommended Packages </Text> */}
          <View style={{ paddingLeft: responsiveWidth(2) }}>

            <FlatList
              data={myAllDataoffers}

              showsHorizontalScrollIndicator={false}
              horizontal={true}
              // keyExtractor={item => item.id} 
              renderItem={({ item }) => {
                // console.log("my offers: " ,item)
                const imgS = `https://www.caterstation.pro/public/vendor/package/${item.image}`

                return (<>

                  <View >
                    <Image
                      style={{ height: responsiveHeight(12), width: responsiveWidth(35), borderRadius: 10, marginHorizontal: responsiveWidth(1), marginTop: responsiveHeight(1) }}
                      source={{ uri: imgS }}

                    />
                    <View style={{justifyContent:"center", alignItems:"center"}}></View>
                    <Title> {item.package_name}</Title>


                    {/* <Text style={{fontWeight: '600',marginTop:responsiveHeight(1), color:blue ,textAlign:"center"}}>{item.package_name}</Text> */}


                  </View>

                </>)
              }}
            />
          </View>
          <View style={{ marginTop: responsiveHeight(2), justifyContent: "center", alignItems: "center" }}>

            <Pressable
              //  onPressIn={handlePressIn}
              //     onPressOut={handlePressOut}
              onPress={() => { navigation.navigate("Packages") }} style={[{ borderWidth: responsiveHeight(0.2), borderRadius: 18, paddingHorizontal: responsiveWidth(10), paddingVertical: responsiveHeight(0.8), borderColor: "#D8D8D8" }, pressableStyle]} >
              <Text style={[styles.headingText, { fontWeight: 'bold', fontSize: responsiveFontSize(1.5) }, TextpressableStyle]}>View All Packages</Text>
            </Pressable>
          </View>



        </View>

        {/* features video */}

        {/* <View style={{ paddingHorizontal: responsiveWidth(1), marginBottom: responsiveHeight(3) }}> */}

        {/* <View style={{ paddingLeft: responsiveWidth(2), marginBottom:responsiveHeight(1) }}> 
          <Heading>Featured Video</Heading>


      </View> */}


          {/* <View >
            <Video
              source={videoUri}
              // Provide your video source here'
              resizeMode={"contain"}
              repeat={true}
              style={{
                width: responsiveWidth(98), // Set width to 100% for full width
                height: responsiveHeight(20),
              }}
              // Optional styles for the video player
              controls={false}      // Enable playback controls
              onError={(error) => console.error(error)} // Handle video errors
            />


          </View> */}

        {/* </View> */}

        {/* rating */}
        {/* <View style={[{ paddingHorizontal: responsiveWidth(2), justifyContent: "center", alignItems: "center" }]}>
          <Text style={[styles.headingText, { marginBottom: responsiveHeight(1), }]}> Rate Experience With Us</Text>
          <AirbnbRating
            reviews={[
              "Poor",
              "Bad",
              "Average",
              "Good",
              "Excellent",
            ]}
            count={5}
            defaultRating={rating}
            selectedColor={yellow}
            unSelectedColor={greyBg}
            size={20}
            showRating={false}
            isDisabled={true}
          // onFinishRating={(rating)=>alert(rating)}
          />
        </View> */}

        {/* reviews */}
        {/* <View style={[styles.ReviewBox]}>
          <Text style={[styles.headingText, { marginBottom: responsiveHeight(2), marginTop: responsiveHeight(1), paddingLeft: responsiveWidth(2) }]}>Review</Text>



          <FlatList
            data={myAllDataTestimonials}

            showsHorizontalScrollIndicator={false}
            horizontal={true}
            // keyExtractor={item => item.id} 
            renderItem={({ item }) => {
              //  console.log('item testimonials' , item)
              const img = `https://caterstation.pro/public/testimonial/decor/${item.decor_image}`;

              return (<>

                <View style={styles.ReviewInnerbox}>

                  <View style={styles.container}>



                    <AirbnbRating
                      reviews={[
                        "Poor",
                        "Bad",
                        "Average",
                        "Good",
                        "Excellent",
                      ]}
                      count={5}
                      //yaha hum customer ki rating kren add
                      defaultRating={5}
                      selectedColor={yellow}
                      unSelectedColor={greyBg}
                      size={10}
                      showRating={false}
                      isDisabled={true}
                    />
                  </View>


                  <Text numberOfLines={3} style={[{ fontSize: responsiveFontSize(1.5), }]}>{item.testimonial}</Text>

                  <View style={{ flexDirection: "column-reverse", flex: 1, }}>
                    <View style={{ flexDirection: "row" }}>

                      <Image source={{ uri: img }} style={{ height: responsiveHeight(4), width: responsiveWidth(8), borderRadius: 20, marginTop: responsiveHeight(.4), marginRight: responsiveWidth(2) }} />

                      <Text style={[{ fontWeight: 'bold', color: blue, fontSize: responsiveFontSize(1.8), marginTop: responsiveHeight(1.5), }]}>{item.person_name}</Text>
                    </View>

                  </View>
                </View>

              </>)
            }

            }
          />




        </View> */}

       <View style={{ width:responsiveWidth(96), flexDirection:"row", marginHorizontal:responsiveWidth(2), marginTop:responsiveHeight(2), marginBottom:responsiveHeight(5),}}>
          <View style={{width:responsiveWidth(61),}}>
          
          <Heading style={{fontWeight:"500", fontSize:responsiveFontSize(2)}}>Why Choose Caterstation?</Heading>
            
            <View style={{flexDirection:"row",marginTop:responsiveHeight(2),  }}>
              
            <Image style={{height:responsiveHeight(1), width:responsiveWidth(2), marginTop:responsiveHeight(.5), marginRight:responsiveWidth(.5)}} source={require("../Images/bullet.png")}/>
           <View style={{flexDirection:"column"}}>
            <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '400',}}>Comprehensive vendor network</Text>
            <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '400',}}>for all event needs.</Text>

           </View>
            
            </View> 
            
             <View style={{flexDirection:"row",marginTop:responsiveHeight(2),  }}>
              
            <Image style={{height:responsiveHeight(1), width:responsiveWidth(2), marginTop:responsiveHeight(.5), marginRight:responsiveWidth(1)}} source={require("../Images/bullet.png")}/>
           <View style={{flexDirection:"column"}}>
            <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '400',}}>User-friendly platform simplifies</Text>
            <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '400',}}>event planning process.</Text>

           </View>
            
            </View>
             <View style={{flexDirection:"row",marginTop:responsiveHeight(2),  }}>
              
            <Image style={{height:responsiveHeight(1), width:responsiveWidth(2), marginTop:responsiveHeight(.5), marginRight:responsiveWidth(1)}} source={require("../Images/bullet.png")}/>
           <View style={{flexDirection:"column"}}>
            <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '400',}}>Convenient one-stop solution</Text>
            <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '400',}}>for booking vendors.</Text>

           </View>
            
            </View> 
             <View style={{flexDirection:"row",marginTop:responsiveHeight(2),  }}>
              
            <Image style={{height:responsiveHeight(1), width:responsiveWidth(2), marginTop:responsiveHeight(.5), marginRight:responsiveWidth(1)}} source={require("../Images/bullet.png")}/>
           <View style={{flexDirection:"column"}}>
            <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '400',}}>Trusted, high-quality services </Text>
            <Text style={{fontSize: responsiveFontSize(1.9), fontWeight: '400',}}>ensure memorable events.</Text>

           </View>
            
            </View>
           

          </View> 
           <View style={{width:responsiveWidth(35), flexDirection:"column"}}>
            
           <View style={{
              justifyContent:"center", alignItems:"center",}} >
            <Image
            style={{
              justifyContent:"center", alignItems:"center",
              width: responsiveWidth(33), // Set width to 100% for full width
              height: responsiveHeight(28),
            }}
            source={require("../Images/mock.gif")}
             />
            {/* <Video
              source={mock}
              // Provide your video source here'
              resizeMode={"contain"}
              repeat={true}
              style={{
                width: responsiveWidth(40), // Set width to 100% for full width
                height: responsiveHeight(20),
              }}
              // Optional styles for the video player
              controls={false}      // Enable playback controls
              onError={(error) => console.error(error)} // Handle video errors
            /> */}


          </View>
          </View>

       </View>

<View style={{marginHorizontal:responsiveWidth(2)}}>
<Heading style={{marginBottom:responsiveHeight(2)}}>Follow Us
</Heading>
<View style={{flexDirection:"row" , justifyContent:"space-evenly", alignItems:"center", marginBottom:responsiveHeight(5)}}>
 
  <Pressable 
    onPress={openFb}
  
  style={{ borderRadius: 50,
    paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: 'center',
   }}>

    <Image 
    source={require('../Images/fb.png')}
    style={{ borderRadius: 50,
    // paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),}}/>
   </Pressable>

   <Pressable 
    onPress={openInsta}
   
   style={{ borderRadius: 50,
    paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: 'center',
   }}>

    <Image 
    source={require('../Images/insta.png')}
    style={{ borderRadius: 50,
    // paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),}}/>
   </Pressable>
   <Pressable 
    onPress={openTiktok}
   
   style={{ borderRadius: 50,
    paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: 'center',
   }}>

    <Image 
    source={require('../Images/tt.png')}
    style={{ borderRadius: 50,
    // paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),}}/>
   </Pressable> 
    <Pressable 

    onPress={openoutube}


    style={{ borderRadius: 50,
    paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: 'center',
   }}>

    <Image 
    source={require('../Images/yt.png')}
    style={{ borderRadius: 50,
    // paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),}}/>
   </Pressable>

  

</View>

</View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  servicesBlock: {
    flexDirection: "row",
    height: responsiveHeight(14),
    backgroundColor: "#595B8E",
    // backgroundColor: greyBg,
    // justifyContent: "space-between",
    alignItems: "center",
    width: responsiveWidth(100)

  },
  servicesCoverblock: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red",
    width: responsiveWidth(25),
    height: responsiveHeight(13)

  },
//   flipshadowcard:{
//  borderRadius:5,  shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.3,shadowRadius: 4, elevation: 4,},
  servicesIconCircle: {
    borderRadius: 50,
    paddingTop:responsiveHeight(.5),
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: 'center',
    // marginTop: responsiveHeight(1),
    // backgroundColor:"red"
    // borderWidth: 3,
    // borderColor: yellow,

  },
  servicesColor: {
    color: blue,
    fontSize: responsiveFontSize(1.3),
    fontWeight: 'bold',
  },
  WedPlanToolBlock: {
    flexDirection: "column",
    paddingHorizontal: responsiveWidth(2),
    justifyContent: "space-around",
    paddingVertical: responsiveHeight(2),
},



  WedPlanToolBlockCover: {

    flexDirection: "column",
    justifyContent: "space-around",
    // marginVertical:responsiveHeight(2)
    height: responsiveHeight(20),



  },  WedPlanToolBlockCover1: {

    flexDirection: "row",
    justifyContent: "space-around",
    // marginVertical:responsiveHeight(2)
    height: responsiveHeight(20),

    



  },



  
  flipshadowcard:{
    justifyContent:"center",
    paddingHorizontal:responsiveWidth(2),width:responsiveWidth(45),backgroundColor:white,height:responsiveHeight(7.8),  borderRadius:5, paddingBottom:responsiveHeight(.2),  shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.3,shadowRadius: 4, elevation: 4,},
  
  
  



  
  
    wedToolBtn: {
    
     height: responsiveHeight(8),
    width: responsiveWidth(45),

    paddingVertical:responsiveHeight(1)

  },
  headingText: {
    fontWeight: 'bold', color: "#000D52", fontSize: responsiveFontSize(2)
  },
  wedtoolColor: {
    color: blue,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',

  },
  venuesBlock: {
    // paddingHorizontal:responsiveWidth(0.5),
    paddingBottom: responsiveWidth(1), marginBottom: responsiveHeight(3),
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
  },

  ReviewBox: {
    // height:responsiveHeight(20),
    width: responsiveWidth(100),


  },
  ReviewInnerbox: {
    height: responsiveHeight(20),
    width: responsiveWidth(60),
    marginHorizontal: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 8,
    // backgroundColor:"red",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    //     // Elevate the view to create a shadow effect
    // elevation: 4,
    // marginBottom: responsiveHeight(5),
    borderColor: blue,
    borderWidth: responsiveWidth(.4)

  }, container: {
    flexDirection: 'row',

    marginVertical: responsiveHeight(1),
    width: responsiveWidth(100),
  },

}
)

export default ForYou