import {
  View,
  Text,
  styleheet,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import HorizontalBar from './HorizontalBar';
import {useNavigation} from '@react-navigation/native';
import {black, blue, greyBg, greyDark, white} from './Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';

const MenuConfirm = ({route}) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const {MyMenu = '', Suggestion = '', singleArray = []} = route.params || {};

  const combinedArray = [
    {MenuName: MyMenu},
    {Suggestion: Suggestion},
    {AddOns: [...singleArray]},
    {name: name},
    {phone: phone},
    {city: city},
    {address: address},
  ];

  const AddOns = [
    {food: 'Chicken'},
    {food: 'Mutton'},
    {food: 'Pulao'},
    {food: 'Biryani'},
    {food: 'Pudding'},
  ];

  const Popular = [
    {food: 'Chicken'},
    {food: 'Mutton'},
    {food: 'Pulao'},
    {food: 'Biryani'},
    {food: 'Pudding'},
    {food: 'Biryani'},
    {food: 'Pudding'},
    {food: 'Biryani'},
    {food: 'Pudding'},
  ];

  //console.log('menuuu fromm me:', MyMenu, Suggestion, singleArray);
  //console.log('combinedArray:', combinedArray);

  const handleSubmit = async () => {
    //console.log('handle')
    try {
      await axios.post(
        'https://caterstation.pro/api/store-menu-data',
        {
          MenuName: MyMenu,
          Suggestion,
          AddOns: singleArray,
          name,
          phone,
          city,
          address,
        },
        {headers: {'Content-Type': 'application/json'}},
      );
      // await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user, null, 2));
      // dispatch(userLogin(response.data.user));
      // savePhoneNumber();
      //console.log('====================================');
      //console.log("suucessful :: " , message);
      //console.log('====================================');
      // navigation.navigate("Otp", { verify: "Login" , phone:phone});
    } catch (error) {
      // Alert.alert('faileddddddd');
      // console.error('Error:', error);
      console.error('Error in POST request:', error.response.data);
      //console.log('Error in POST request:', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: white,
        paddingHorizontal: responsiveWidth(2),
        flexDirection: 'column',
      }}>
      <ScrollView>
        <HorizontalBar
          backPress={() => navigation.goBack()}
          title={'Order Confirmation'}
        />

        <View style={[style.flipshadowcard, {flexDirection: 'row'}]}>
          <View
            style={{
              width: responsiveWidth(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: responsiveWidth(11), height: responsiveHeight(5)}}
              source={require('../Images/bbqPlate.png')}
            />
          </View>
          <View style={{width: responsiveWidth(60), justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: black,
                fontWeight: 'bold',
              }}>
              {MyMenu} Menu
            </Text>
          </View>
        </View>

        <View style={[style.flipshadowcard, {flexDirection: 'row'}]}>
          <View
            style={{
              width: responsiveWidth(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: responsiveWidth(11), height: responsiveHeight(5)}}
              source={require('../Images/bbqPlate.png')}
            />
          </View>
          <View style={{width: responsiveWidth(60), justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: black,
                fontWeight: 'bold',
              }}>
              Add Ons
            </Text>
          </View>
        </View>
        {/* {singleArray.lenght==0?""} */}
        <View style={{width: responsiveWidth(100)}}>
          {singleArray && singleArray.length > 0 ? (
            <FlatList
              numColumns={3}
              data={singleArray}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View
                  style={{
                    width: responsiveWidth(28),
                    height: responsiveHeight(5),
                    backgroundColor: blue,
                    borderRadius: 15,
                    marginHorizontal: responsiveWidth(2),
                    marginVertical: responsiveHeight(2),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: responsiveWidth(15)}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: white,
                        fontWeight: '500',
                        fontSize: responsiveFontSize(1.8),
                      }}>
                      {item}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text
              style={{
                textAlign: 'center',
                fontSize: responsiveFontSize(2),
                color: 'gray',
                marginTop: responsiveHeight(2),
              }}>
              No add available
            </Text>
          )}
        </View>

        {Suggestion?.length ? (
          <View style={{marginTop: responsiveHeight(2)}}>
            <Text style={{fontSize: responsiveFontSize(2), color: blue}}>
              Your Suggestion
            </Text>
            <View style={[style.flipshadowcard, {flexDirection: 'row'}]}>
              <Text>{Suggestion}</Text>
            </View>
          </View>
        ) : null}

        {/* <View style={{ marginTop: responsiveHeight(4) }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: blue }}>Most Relevant From Your Order</Text>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              data={AddOns}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View>
                  <Image
                    style={{ height: responsiveHeight(12), width: responsiveWidth(25), marginLeft: responsiveWidth(3), marginTop: responsiveHeight(3) }}
                    source={require('../Images/menufood.png')}
                  />
                </View>
              )}
            />
          </View>
        </View> */}

        <View style={{marginTop: responsiveHeight(4)}}>
          <Text style={{fontSize: responsiveFontSize(2), color: blue}}>
            Enter your details here
          </Text>

          <View style={[style.commonBox, {justifyContent: 'center'}]}>
            <TextInput
              value={name}
              onChangeText={txt => setName(txt)}
              placeholder="Enter your name here"
              style={{
                fontSize: responsiveFontSize(1.8),
                color: black,
                marginHorizontal: responsiveWidth(2),
                borderRadius: 8,
                borderColor: blue,
                borderWidth: 1.5,
                height: responsiveHeight(5),
                marginTop: responsiveHeight(3),
                paddingHorizontal: responsiveWidth(2),
              }}
              placeholderTextColor={black}
            />

            <TextInput
              value={Number}
              onChangeText={txt => setPhone(txt)}
              keyboardType="number-pad"
              placeholder="Enter your phone number here"
              style={{
                fontSize: responsiveFontSize(1.8),
                color: black,
                marginHorizontal: responsiveWidth(2),
                borderRadius: 8,
                borderColor: blue,
                borderWidth: 1.5,
                height: responsiveHeight(5),
                marginTop: responsiveHeight(3),
                paddingHorizontal: responsiveWidth(2),
              }}
              placeholderTextColor={black}
            />

            <TextInput
              value={city}
              onChangeText={txt => setCity(txt)}
              placeholder="Enter your city here"
              style={{
                fontSize: responsiveFontSize(1.8),
                color: black,
                marginHorizontal: responsiveWidth(2),
                borderRadius: 8,
                borderColor: blue,
                borderWidth: 1.5,
                height: responsiveHeight(5),
                marginTop: responsiveHeight(3),
                paddingHorizontal: responsiveWidth(2),
              }}
              placeholderTextColor={black}
            />

            <TextInput
              value={address}
              onChangeText={txt => setAddress(txt)}
              placeholder="Enter your address here"
              style={{
                fontSize: responsiveFontSize(1.8),
                color: black,
                marginHorizontal: responsiveWidth(2),
                borderRadius: 8,
                borderColor: blue,
                borderWidth: 1.5,
                height: responsiveHeight(5),
                marginTop: responsiveHeight(3),
                paddingHorizontal: responsiveWidth(2),
              }}
              placeholderTextColor={black}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveHeight(3),
              }}>
              <Pressable
                onPress={() => {
                  handleSubmit();
                  navigation.navigate('ForYou');

                  // //console.log("Combined array:", combinedArray);
                }}
                style={{
                  height: responsiveHeight(4),
                  width: responsiveWidth(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: blue,
                  borderRadius: 5,
                }}>
                <Text style={{color: white, fontSize: responsiveFontSize(2)}}>
                  Submit
                </Text>
              </Pressable>
            </View>

            {/* <View style={{alignItems:"center", justifyContent:"center"}}>

<Pressable style={{ width: responsiveWidth(15),  }}>
                        <Text numberOfLines={1} style={{color:white, fontWeight:"500", fontSize:responsiveFontSize(1.8)}}>Submit</Text>
                    </Pressable>

</View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  flipshadowcard: {
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    width: responsiveWidth(96),
    backgroundColor: white,
    borderRadius: 5,
    paddingVertical: responsiveHeight(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  height: responsiveHeight(6),
  width: responsiveWidth(90),
  backgroundColor: greyBg,
  backgroundColor: greyBg,
  paddingHorizontal: responsiveWidth(4),
  marginVertical: responsiveHeight(2),
  marginHorizontal: responsiveWidth(5),
});

export default MenuConfirm;
