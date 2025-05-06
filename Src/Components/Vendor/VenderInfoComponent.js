import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {black, blue, greyBg, white} from '../../Colors';
const VenderInfoComponent = ({companyName, thumb, cover}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.back}>
        <FontAwsome name="angle-left" color={blue} size={20} />
      </TouchableOpacity>
      <Image style={styles.cover} source={{uri: `${cover}`}} />
      <View style={styles.bottomContainer}>
        <Image style={styles.thumb} source={{uri: `${thumb}`}} />
        <Text style={styles.name}>{companyName}</Text>
      </View>
    </View>
  );
};

export default VenderInfoComponent;

const styles = StyleSheet.create({
  container: {height: responsiveHeight(35), width: responsiveWidth(100)},
  cover: {
    height: responsiveHeight(22),
    width: responsiveWidth(100),
  },
  bottomContainer: {
    top: responsiveHeight(15),
    position: 'absolute',
    borderColor: greyBg,
    borderBottomWidth: 1,
    borderBottomColor: greyBg,
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    height: responsiveHeight(11),
    width: responsiveWidth(25),
    borderRadius: Math.min(responsiveHeight(20), responsiveWidth(20)),
  },
  name: {
    color: black,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1.5),
    letterSpacing: 1,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  back: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    backgroundColor: white,
    height: responsiveHeight(4),
    width: responsiveWidth(9),
    borderRadius: responsiveWidth(5),
    position: 'absolute',
    top: responsiveHeight(4),
    left: responsiveWidth(3),
    zIndex: 10,
  },
});
