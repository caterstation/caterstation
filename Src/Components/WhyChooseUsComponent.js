import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Heading from '../Heading';

const BulletinItem = ({text1, text2}) => (
  <View style={styles.row}>
    <Image style={styles.image} source={require('../../Images/bullet.png')} />
    <View style={styles.column}>
      <Text style={styles.text}>{text1}</Text>
      <Text style={styles.text}>{text2}</Text>
    </View>
  </View>
);

const WhyChooseUsComponent = () => {
  return (
    <View style={styles.container}>
      <View style={{width: responsiveWidth(61)}}>
        <Heading style={styles.heading}>Why Choose Caterstation?</Heading>
        <BulletinItem
          text1="Comprehensive vendor network"
          text2="for all event needs."
        />
        <BulletinItem
          text1="User-friendly platform simplifies"
          text2="event planning process."
        />
        <BulletinItem
          text1="Convenient one-stop solution"
          text2="for booking vendors."
        />
        <BulletinItem
          text1="Trusted, high-quality services"
          text2="ensure memorable events."
        />
      </View>
      <View style={[{width: responsiveWidth(35)}, styles.column]}>
        <Image
          style={styles.mockGif}
          source={require('../../Images/Home/mock.png')}
          accessible={true}
          accessibilityLabel="Mock event planning process animation"
        />
      </View>
    </View>
  );
};

export default WhyChooseUsComponent;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(96),
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(5),
  },
  heading: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),
  },
  mockGif: {
    width: responsiveWidth(33),
    height: responsiveHeight(28),
  },
  image: {
    height: responsiveHeight(1),
    width: responsiveWidth(2),
    marginTop: responsiveHeight(1),
    marginRight: responsiveWidth(2),
  },
  row: {
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(2),
  },
  column: {flexDirection: 'column'},
  text: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '400',
  },
});
