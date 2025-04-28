import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getHomeEvents} from '../../Hooks/api/ForyouApi';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NetInfo from '@react-native-community/netinfo';
import Heading from '../../Heading';
import Title from '../../Title';

const EventByCaterstationComponent = ({isPressed}) => {
  const [myAllDataEvent, setMyAllDataEvent] = useState([]); // Corrected state setter function

  const navigation = useNavigation();

  const getDataEvents = async () => {
    try {
      const result = await getHomeEvents();
      // //console.log('Events method result:', result);
      const data = JSON.stringify(result);
      setMyAllDataEvent(result?.events);
    } catch (error) {
      //console.log(' methoid   Error ');
    }
  };

  useEffect(() => {
    const checkConnectionAndFetchData = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        getDataEvents();
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
    <View style={[styles.venuesBlock]}>
      <Heading style={styles.heading}>Events by Caterstation</Heading>
      <View style={{paddingLeft: responsiveWidth(2)}}>
        <FlatList
          data={myAllDataEvent}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => {
            const imgS = `https://www.caterstation.pro/public/event/mbl_img/${item.mbl_img}`;
            return (
              <Pressable
                disabled
                onPress={() => {
                  navigation.navigate('CSEvents');
                }}>
                <Image style={styles.image} source={{uri: imgS}} />
                <View style={styles.titleContainer}>
                  <Title> {item.title} </Title>
                </View>
              </Pressable>
            );
          }}
        />
      </View>

      <View style={styles.container}>
        <Pressable
          onPress={() => {
            navigation.navigate('CSEvents');
          }}
          style={[styles.pressableRadius, pressableStyle]}>
          <Text style={[styles.headingText, TextpressableStyle]}>
            Events by Caterstation
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EventByCaterstationComponent;

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
    height: responsiveHeight(20),
    width: responsiveWidth(25),
    borderRadius: 10,
    marginHorizontal: responsiveWidth(2),
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
  titleContainer: {justifyContent: 'center', alignItems: 'center'},
});
