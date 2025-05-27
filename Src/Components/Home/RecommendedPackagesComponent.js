import {FlatList, Image, Pressable, StyleSheet, Text, View,Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getHomeOffers} from '../../Hooks/api/ForyouApi';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NetInfo from '@react-native-community/netinfo';
import Heading from '../../Heading';
import Title from '../../Title';

const getDataoffers = async () => {
  const result = await getHomeOffers();
  return result;
};
const RecommendedPackagesComponent = ({isPressed}) => {
  const [myAllDataoffers, setmyAllDataoffers] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    const checkConnectionAndFetchData = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        getDataoffers().then(result => {
          setmyAllDataoffers(result?.data);
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
    <View style={[styles.venuesBlock, {marginBottom: responsiveHeight(3)}]}>
      <Heading style={styles.heading}>Recommended Packages</Heading>
      <View style={{paddingLeft: responsiveWidth(2)}}>
        <FlatList
          data={myAllDataoffers}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => {
            const imgS = `https://www.caterstation.pro/public/vendor/package/${item.image}`;
            return (
              <View>
                <Image style={styles.image} source={{uri: imgS}} />
                <View />
                <Title style={styles.title}>{item.package_name}</Title>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            navigation.navigate('Packages');
          }}
          style={[styles.pressableRadius, pressableStyle]}>
          <Text style={[styles.headingText, TextpressableStyle]}>
            View All Packages
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RecommendedPackagesComponent;

const styles = StyleSheet.create({
  venuesBlock: {
    paddingLeft: responsiveWidth(2),
    paddingBottom: responsiveWidth(1),
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(2),
  },
  container: {
    marginTop: responsiveHeight(2),
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
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
