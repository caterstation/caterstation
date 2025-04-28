import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  // TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MyHeader from './MyHeader';
import ViewAllBtn from './ViewAllBtn';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black, blue, greyBg, white} from './Colors';
import BackArrow from './BackArrow';
import {getAllEvents} from './Hooks/api/AllEventsApi';
import ImgHbar from './ImgHbar';

const CitiesEventType = ({route}) => {
  const navigation = useNavigation();
  const [event, setevents] = useState();
  const {city} = route.params;
  const myCity = city;
  //console.log("city : : ",city)

  const EventWeding = [
    {id: 1, eventName: 'Engagment'},
    {id: 2, eventName: 'Mayoun'},
    {id: 3, eventName: 'Nikkah'},
    {id: 4, eventName: 'Shendi'},
    {id: 5, eventName: 'Barat'},
    {id: 6, eventName: 'Mehndi'},
    {id: 7, eventName: 'Reception'},
    // { id: 8, eventName:"" },
    // ... more data points
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await getAllEvents();
      //console.log('====================================');
      //console.log(result);
      //console.log('====================================');
      setevents(result?.event_types);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [pressedId, setPressedId] = useState(null);

  return (
    <SafeAreaView style={{backgroundColor: white, flex: 1}}>
      <View>
        <View
          style={{
            height: responsiveHeight(10),
            width: responsiveWidth(100),
            marginBottom: responsiveHeight(2),
          }}>
          <ImgHbar
            backPress={() => navigation.goBack()}
            title="Event Type"
            headerImage={require('../Images/eventType.png')}
          />
        </View>

        <View
          style={{
            paddingHorizontal: responsiveWidth(2),
            paddingVertical: responsiveHeight(2),
            width: responsiveWidth(100),
          }}>
          <FlatList
            data={event}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({item}) => {
              //console.log('====================================');
              // //console.log("eventsssssss  : ",item);
              //console.log('====================================');
              const eventType = item.name;
              // //console.log("events type : ",item.name);
              const isPressed = pressedId === eventType;

              const BlueIcons = {
                'Baat Paki': require('../Images/baatpakiB.png'),
                'Casual Events': require('../Images/CasualB.png'),
                'Corporate Events': require('../Images/CorporateB.png'),
                Mehndi: require('../Images/MehndiB.png'),
                Nikkah: require('../Images/NikkahB.png'),
                Baraat: require('../Images/BaraatB.png'),
                Walima: require('../Images/WalimaB.png'),
                Birthday: require('../Images/BirthdayB.png'),
                'Bridal Shower': require('../Images/BridalShowerB.png'),
                Mayoun: require('../Images/MayounB.png'),
                Dholki: require('../Images/DholkiB.png'),
                'Qawali Night': require('../Images/QawaliNightB.png'),
                Millad: require('../Images/MilladB.png'),
                Concerts: require('../Images/ConcertsB.png'),
                'DJ Night': require('../Images/DJNightB.png'),
                'Educational EXPO': require('../Images/EducationaExB.png'),
                'Industrial EXPO': require('../Images/IndustrialB.png'),
                'Baby Shower': require('../Images/BabyShowerB.png'),
              };
              const WhiteIcons = {
                'Baat Paki': require('../Images/Baatpakki.png'),
                'Casual Events': require('../Images/Casual.png'),
                'Corporate Events': require('../Images/Corporate.png'),
                Mehndi: require('../Images/Mehndi.png'),
                Nikkah: require('../Images/Nikkah.png'),
                Baraat: require('../Images/Baraat.png'),
                Walima: require('../Images/Walima.png'),
                Birthday: require('../Images/Birthday.png'),
                'Bridal Shower': require('../Images/BridalShower.png'),
                Mayoun: require('../Images/Mayoun.png'),
                Dholki: require('../Images/Dholki.png'),
                'Qawali Night': require('../Images/QawaliNight.png'),
                Millad: require('../Images/Millad.png'),
                Concerts: require('../Images/Concert.png'),
                'DJ Night': require('../Images/DJN.png'),
                'Educational EXPO': require('../Images/EducationalEXPO.png'),
                'Industrial EXPO': require('../Images/IndustrialEXPO.png'),
                'Baby Shower': require('../Images/BabyShower.png'),
              };

              // const iconSource = BlueIcons[eventType] || require('../Images/conf.png'); // Provide a default icon
              const iconSource = BlueIcons[eventType]; // Provide a default icon
              const WhiteiconSource = WhiteIcons[eventType]; // Provide a default icon
              // const WhiteiconSource =WhiteIcons[eventType] || require('../Images/conf.png'); // Provide a default icon

              //console.log('====================================');
              //console.log("WhiteIcons ", WhiteIcons);
              //console.log('====================================');

              return (
                <TouchableOpacity
                  onPress={() => {
                    setPressedId(eventType);
                    navigation.navigate('UserEventDetail', {
                      event_type: eventType,
                      city: myCity,
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    width: responsiveWidth(44),
                    marginRight: responsiveWidth(7.5),
                    marginBottom: responsiveHeight(2),
                    backgroundColor: isPressed ? blue : white,
                    // borderRadius: 5,
                    paddingVertical: responsiveHeight(1),
                    borderWidth: 2,
                    borderColor: blue,
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      resizeMode="contain"
                      style={{marginHorizontal: responsiveWidth(2)}}
                      source={isPressed ? WhiteiconSource : iconSource}
                      // source={isPressed ? require('../Images/icon.png') : iconSource}
                    />
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontWeight: '600',
                        fontSize: responsiveFontSize(1.85),
                        color: isPressed ? white : blue,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>

                // <TouchableOpacity onPress={()=>{navigation.navigate('UserEventDetail',{

                //   event_type:eventType,
                //   city:myCity
                // })}} style={{flexDirection:"row",width:responsiveWidth(44),   marginRight:responsiveWidth(7.5), marginBottom: responsiveHeight(2), backgroundColor:white, borderRadius:5, paddingVertical:responsiveHeight(1), borderWidth:2}}>
                //   <View style={{justifyContent:"center", alignItems:"center"}}>
                //       <Image resizeMode='contain' style={{ marginHorizontal: responsiveWidth(1.5),}} source={require('../Images/iconblue.png')}/>
                //   </View>

                //     {/* <Image style={{ marginTop: responsiveHeight(1),marginRight: responsiveWidth(1.5),}} source={require('../Images/checkbox.png')}/> */}
                // <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: responsiveFontSize(2),color:blue}}>{item.name}</Text>
                // </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  questionTxt: {
    color: 'black',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  questionHeadingTxt: {
    color: 'black',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
  },
});

export default CitiesEventType;
