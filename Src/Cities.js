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
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {black} from './Colors';
import {myAxiosGetReq} from './Axios/MyAxiosReq';
import {getAllCities} from './Hooks/api/MyCities';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackArrow from './BackArrow';
import ImgHbar from './ImgHbar';

const Cities = () => {
  const navigation = useNavigation();
  const [myCities, setmyCities] = useState();
  const handlePress = city => {
    if (city === 'Lahore') {
      // navigation.navigate('UserEventDetail : ', {city:"Lahore"});
      // navigation.navigate('Navigation', {
      //   screen: 'UserEventDetail',
      //   params: {city:city},
      // });

      navigation.navigate('CitiesEventType', {city: city});
    } else {
      Alert.alert('Coming Soon!', `No vendor available in ${city}`);
    }
  };
  useEffect(() => {
    getData().then(result => {
      console.log(' useEffect', result);
    });

    // //console.log("result",myCities);
  }, []);
  const getData = async () => {
    const result = await getAllCities();
    setmyCities(result?.cities);
    return result;
  };

  return (
    <SafeAreaView style={{width: '100%', flex: 1}}>
      <ImgHbar
        backPress={() => navigation.goBack()}
        title="Select Cities"
        //headerImage={require('../Images/Home/citiesHeader.png')}
        headerImage={require('../Images/Home/mock.png')}
      />

      <View
        style={{
          width: '100%',
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={myCities}
          numColumns={3}
          renderItem={({item}) => {
            const imgS = `https://caterstation.pro/public/city/${item.image}`;
            // const imgS=`https://www.caterstation.pro/api/all-cities/city/${item.image}`

            return (
              <View
                style={{width: '30%', marginBottom: 15, marginHorizontal: 5}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handlePress(item.city)}>
                  <Image
                    style={{
                      borderRadius: 60,
                      height: responsiveWidth(17),
                      width: responsiveWidth(17),
                    }}
                    source={{uri: imgS}}
                  />

                  <Text
                    style={{fontWeight: '600', marginTop: responsiveHeight(1)}}>
                    {item.city}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cities;
