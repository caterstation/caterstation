import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View,Alert} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Heading from '../../Heading';
import {getVendors} from '../../Hooks/api/vendorApi';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

const getAllVendors = async () => {
  const result = await getVendors();
  return result;
};

const FeaturedVendorComponent = ({isPressed}) => {
  const [myAllDataVendor, setmyAllDataVendor] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    const checkConnectionAndFetchData = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        getAllVendors().then(result => {
          setmyAllDataVendor(result);
        });
      } else {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
        );
      }
    };

    checkConnectionAndFetchData();
  }, []);

  const pressableStyle = {
    backgroundColor: isPressed ? '#000D52' : 'white',
  };
  const TextpressableStyle = {
    color: isPressed ? 'white' : '#000D52',
  };

  return (
    <View style={styles.venuesBlock}>
      <Heading style={styles.heading}>Featured Vendors</Heading>
      <View style={{paddingLeft: responsiveWidth(2)}}>
        <FlatList
          data={myAllDataVendor}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => {
            // //console.log('vendor', item)
            const imgS = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`;
            const cover = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`;

            return (
              <>
                <Pressable
                  disabled
                  onPress={() => {
                    navigation.navigate('ForYouDetailVendor', {
                      item,
                      Thumb: imgS,
                      Cover: cover,
                    });
                  }}>
                  <Image style={styles.image} source={{uri: imgS}} />
                </Pressable>
              </>
            );
          }}
        />
      </View>

      <View style={styles.container}>
        <Pressable
          onPress={() => {
            navigation.navigate('MyAllVen');
          }}
          style={[styles.pressableRadius, pressableStyle]}>
          <Text style={[styles.headingText, TextpressableStyle]}>
            View All Vendors
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FeaturedVendorComponent;

const styles = StyleSheet.create({
  venuesBlock: {
    paddingLeft: responsiveWidth(2),
    paddingBottom: responsiveWidth(1),
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(2),
  },
  container: {
    marginTop: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: responsiveHeight(12),
    width: responsiveWidth(35),
    borderRadius: 10,
    marginHorizontal: responsiveWidth(1),
    marginTop: responsiveHeight(1),
  },
  heading: {
    paddingLeft: responsiveWidth(4),
    marginBottom: responsiveHeight(1),
  },
  pressableRadius: {
    borderWidth: responsiveHeight(0.2),
    borderRadius: 18,
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(0.8),
    borderColor: '#D8D8D8',
  },
  headingText: {
    fontWeight: 'bold',
    color: '#000D52',
    fontSize: responsiveFontSize(1.5),
  },
});
