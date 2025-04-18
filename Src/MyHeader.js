import {
  FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View, Platform, PermissionsAndroid,
  StatusBar
} from 'react-native';
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { blue, grey, greyBg, yellow } from './Colors';
import {
  responsiveFontSize, responsiveHeight, responsiveWidth,
} from 'react-native-responsive-dimensions';
import { AirbnbRating } from 'react-native-ratings';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { create } from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const MyHeader = ({ showBackButton = true }) => {
  const myPackages = useSelector((state) => state.package.cart);
  const [city, setCity] = useState();
  const navigation = useNavigation();
  const DropCity = [
    { LabelCity: 'Lahore' },
    { LabelCity: 'Islamabad' },
    { LabelCity: 'Karachi' },
  ];
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(DropCity);
  const [selectedLabelCity, setSelectedLabelCity] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.noConnection}>
        <Text style={styles.noConnectionText}>No Internet Connection</Text>
        <View style={{ height: responsiveHeight(7),
    paddingVertical: responsiveHeight(0.4),
    justifyContent: 'space-between',
    alignItems: 'center',
    width:responsiveWidth(100),
    flexDirection: 'row',
    paddingRight: responsiveWidth(2),
    paddingLeft: responsiveWidth(1),
    borderBlockColor: '#BEBEBE',
    // backgroundColor:"green",
    borderBottomWidth: 1,}}>
      {/* //DropDown view */}
      <View style={{ flexDirection: 'row' ,


      }}>
        
        {showBackButton && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              paddingHorizontal: responsiveWidth(2),
              paddingVertical: responsiveHeight(1),
              marginRight: responsiveWidth(1),
            }}>
            <Ionicons name="arrow-back" color={'#000D52'} size={18} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.DropDownCoverBox}
          onPress={() => {
            setClicked(!clicked);
          }}>
          <Text
            style={{
              fontWeight: '700',
              color: '#000D52',
              fontSize: responsiveFontSize(2.2),
            }}>
            {city ? <Text>You are in {city}</Text> : <Text>Lahore</Text>}
           
          </Text>
          {/* <Text>Hello</Text> */}
        </TouchableOpacity>
      </View>
      {/* search and profile */}
      <View style={{ flexDirection: 'row' , }}>
        {/* <Pressable style={styles.headerIcon}>
          <FontAwsome name="search" color={'#383838'} size={12} />
        </Pressable> */}
        <Pressable
          onPress={() => {
            navigation.navigate('AddToCart');
          }}
          style={styles.headerIcon}>
          {myPackages.length > 0 ? (
            <View
              style={{
                position: 'absolute',
                top: -10,
                left: 14,
                borderRadius: 5,
                paddingHorizontal: responsiveWidth(1.5),
                paddingVertical: responsiveHeight(0.2),
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  color: yellow,
                  fontWeight: 'bold',
                  backgroundColor: blue,
                  height: responsiveHeight(2.5),
                  width: responsiveWidth(4.5),
                  textAlign: 'center',
                  borderRadius: 10,
                }}>
                {myPackages.length}
              </Text>
            </View>
          ) : null}
          
          <FontAwesome5 name="shopping-cart" color={'#383838'} size={18} />

            
        </Pressable>
      </View>
    </View>
      </View>
    );
  }

  return (
    <View style={styles.ForYouHeader}>
            {/* <StatusBar
        
barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
  backgroundColor={Platform.OS === 'android' ? "#fff" : undefined}
/> */}

      {/* //DropDown view */}
      <View style={{ flexDirection: 'row' }}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              paddingHorizontal: responsiveWidth(2),
              paddingVertical: responsiveHeight(1),
              marginRight: responsiveWidth(1),
            }}>
            <Ionicons name="arrow-back" color={'#000D52'} size={18} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.DropDownCoverBox}
          onPress={() => {
            setClicked(!clicked);
          }}>
          <Text
            style={{
              fontWeight: '700',
              color: '#000D52',
              fontSize: responsiveFontSize(2.2),
            }}>
            {city ? <Text>You are in {city}</Text> : <Text>Lahore</Text>}
          </Text>
        </TouchableOpacity>
      </View>
      {/* search and profile */}
      <View style={{ flexDirection: 'row' }}>
        {/* <Pressable style={styles.headerIcon}>
          <FontAwsome name="search" color={'#383838'} size={12} />
        </Pressable> */}
        <Pressable
          onPress={() => {
            navigation.navigate('AddToCart');
          }}
          style={styles.headerIcon}>
          {myPackages.length > 0 ? (
            <View
              style={{
                position: 'absolute',
                top: -10,
                // left: 4,
                borderRadius: 5,
                paddingHorizontal: responsiveWidth(1.5),
                paddingVertical: responsiveHeight(0.2),
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: yellow,
                  fontWeight: 'bold',
                  // backgroundColor: blue,
                  height: responsiveHeight(2.5),
                  width: responsiveWidth(4.5),
                  textAlign: 'center',
                  borderRadius: 10,
                }}>
                {myPackages.length}
              </Text>
            </View>
          ) : null}
          <FontAwesome5 name="shopping-cart" color={'#383838'} size={18} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ForYouHeader: {
    height: responsiveHeight(7),
    paddingVertical: responsiveHeight(0.4),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: responsiveWidth(2),
    paddingLeft: responsiveWidth(1),
    borderBlockColor: '#BEBEBE',
    borderBottomWidth: 1,
    position:'relative'
  },
  DropDownCoverBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontColor: {
    color: blue,
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  DropDownBox: {
    elevation: 2,
    marginTop: 5,

    width: responsiveWidth(40),
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  headerIcon: {
    // width: responsiveWidth(10),
    // height: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(1),
    // backgroundColor: greyBg,
    // borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(3),
    // backgroundColor:"red"
  },
  noConnection: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noConnectionText: {
    fontSize: 18,
    color: 'red',
  },
});

export default MyHeader;
