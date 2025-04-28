import {
  Alert,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {black, blue, greyBg, greyDark, white, yellow} from './Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import BackArrow from './BackArrow';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {v4 as uuidv4} from 'react-native-uuid';
import ImgHbar from './ImgHbar';

const PackageUserDetails = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]); // Array to hold cart items
  const [f_name, setFName] = useState('');
  const [l_name, setLName] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [payment_method, setPaymentMethod] = useState('transfer');
  const [userId, setUserId] = useState(''); // User ID from authentication (replace with actual value)

  const myData = useSelector(state => state.package.cart);
  //console.log("myData", myData)
  const totalBil = myData.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity; // Assuming each item has a 'price' property
  }, 0);

  const handleEmpty = () => {
    if (
      phone == [] ||
      email == [] ||
      zip == [] ||
      f_name == [] ||
      l_name == [] ||
      address == [] ||
      state == []
    ) {
      Alert.alert('Please Fill the empty fields');
    } else {
      // navigation.navigate('PackageORderSummary',{f_name,l_name,passid,phone }) //packagename, no of guest, total bill
      handleSubmit();
    }
  };
  const generateUniqueOrderId = () => {
    // Generate a full UUID
    const fullUuid = uuid.v4();

    // Extract a 6-character alphanumeric substring
    const randomPart = fullUuid.substring(0, 7);

    // Create the final ID with prefix and length control
    const orderId = `order_id${randomPart}`.substring(0, 100);

    return orderId;
  };
  useEffect(() => {}, []);
  const passid = generateUniqueOrderId();

  const scrollViewProps = Platform.select({
    ios: {
      contentInsetAdjustmentBehavior: 'automatic',
    },
    android: {
      keyboardShouldPersistTaps: 'handled',
    },
  });

  const handleSubmit = async () => {
    // Log the state to ensure that f_name is properly set
    //console.log("State:", { f_name, l_name, address, zip, state, city, email, phone, payment_method, passid });
    // const quantity= obj.quantity,
    const formattedCartItems = myData.map(obj => ({
      quantity: obj.quantity,
      image: obj.image,
      name: obj.package_name,
      id: obj.id,
    }));
    //console.log( "formattedCartItems",formattedCartItems)
    setCartItems(formattedCartItems);

    try {
      const response = await axios.post(
        'https://caterstation.pro/api/place-order',
        {
          cartItems: formattedCartItems,
          f_name: f_name, // Change to match the names used in Laravel
          l_name: l_name,
          address: address,
          zip: zip,
          state: state,
          city: city,
          email: email,
          phone: phone,
          price: totalBil,
          payment_method: payment_method,
          order_id: passid, // Send 'passid' instead of 'user_id' to match Laravel
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      navigation.navigate('PackageORderSummary', {
        f_name,
        l_name,
        passid,
        phone,
      });
      // Handle successful response
      // Alert.alert('Success!', response.data.message); // Display success message with order IDs
      //console.log('Created Order IDs:', response.data.orderIds); // Log order IDs for debugging
      navigation.navigate('PackageORderSummary', {
        f_name,
        l_name,
        passid,
        phone,
      });
    } catch (error) {
      // Handle error
      if (error.response) {
        console.error('HTTP error! status:', error.response);
      } else {
        console.error('Error from:', error.message);
      }
    }
  };

  // Clear form fields after successful placement (optional)
  // setCartItems([]);
  // setFName('');
  // setLName('');
  // setAddress('');
  // setZip('');
  // setState('');
  // setCity('');
  // setEmail('');
  // setPhone('');
  // setPaymentMethod('');

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={{backgroundColor: white}}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
        contentContainerStyle={styles.container}>
        <View style={{width: responsiveWidth(100)}}>
          <ImgHbar
            backPress={() => navigation.goBack()}
            title="User Detail"
            headerImage={require('../Images/eventType.png')}
          />
        </View>

        <Text
          style={{
            color: black,
            marginLeft: responsiveWidth(5),
            fontSize: responsiveFontSize(1.8),
            fontWeight: 'bold',
            marginTop: responsiveHeight(2),
          }}>
          Please let us know a bit more detail about your event
        </Text>
        {/* <View style={{paddingHorizontal:responsiveWidth(5), height:responsiveHeight(75)}}> */}
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            value={f_name}
            onChangeText={txt => setFName(txt)}
            placeholder="First Name"
            style={{fontSize: responsiveFontSize(1.8), color: black}}
            placeholderTextColor={black}
          />
        </View>
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            value={l_name}
            onChangeText={txt => {
              setLName(txt);
            }}
            placeholder="Last Name"
            style={{fontSize: responsiveFontSize(1.8), color: black}}
            placeholderTextColor={black}
          />
        </View>
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            value={email}
            onChangeText={txt => setEmail(txt)}
            placeholder="Email"
            style={{fontSize: responsiveFontSize(1.8), color: black}}
            placeholderTextColor={black}
          />
        </View>
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            value={city}
            onChangeText={txt => setCity(txt)}
            placeholder="City"
            style={{fontSize: responsiveFontSize(1.8), color: black}}
            placeholderTextColor={black}
          />
        </View>
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            value={state}
            onChangeText={txt => setState(txt)}
            placeholder="State"
            style={{fontSize: responsiveFontSize(1.8), color: black}}
            placeholderTextColor={black}
          />
        </View>

        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            value={zip}
            keyboardType="number-pad"
            onChangeText={txt => {
              setZip(txt);
            }}
            placeholder="Postal code"
            style={{fontSize: responsiveFontSize(1.8), color: black}}
            placeholderTextColor={black}
          />
        </View>
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            value={phone}
            keyboardType="phone-pad"
            onChangeText={txt => {
              setPhone(txt);
            }}
            placeholder="Phone"
            style={{fontSize: responsiveFontSize(1.8), color: black}}
            placeholderTextColor={black}
          />
        </View>

        <View
          style={[
            {
              height: responsiveHeight(15),
              paddingVertical: responsiveHeight(2),
              width: responsiveWidth(90),
              backgroundColor: greyBg,
              paddingHorizontal: responsiveWidth(4),
              marginVertical: responsiveHeight(2),
              marginHorizontal: responsiveWidth(5),
            },
          ]}>
          <TextInput
            numberOfLines={3}
            value={address}
            onChangeText={txt => {
              setAddress(txt);
            }}
            placeholder="Enter Your Address"
            style={{
              fontSize: responsiveFontSize(1.8),
              color: black,
              justifyContent: 'center',
            }}
            placeholderTextColor={black}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveWidth(100),
            marginBottom: responsiveHeight(5),
            marginTop: responsiveHeight(2),
          }}>
          <View style={{backgroundColor: blue}}>
            <TouchableOpacity
              style={{
                height: responsiveHeight(4),
                width: responsiveWidth(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                handleEmpty();
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* </View> */}
      </ScrollView>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: responsiveWidth(70),
    padding: responsiveHeight(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: responsiveWidth(20),
    height: responsiveHeight(4),
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
    // color:black,
    fontWeight: 'bold',
  },
  commonBox: {
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    backgroundColor: greyBg,
    paddingHorizontal: responsiveWidth(4),
    marginVertical: responsiveHeight(2),
    marginHorizontal: responsiveWidth(5),
  },
  // container: {padding: 16},
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: responsiveFontSize(1.8),
    color: black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  tabbar: {
    backgroundColor: '#ffffff',
  },
  tabLabel: {
    color: '#000000',
    // backgroundColor:"red"
    // marginTop:20
  },
  indicator: {
    backgroundColor: yellow,
    height: 50,
  },
});

export default PackageUserDetails;
