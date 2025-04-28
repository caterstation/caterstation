import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {black, white} from '../Colors';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const {width} = Dimensions.get('window'); // Get the screen width
const cardWidth = width / 3 - 20; // Calculate the width to fit 3 cards with spacing
const cardHeight = cardWidth * 1;

const ServiceCard = ({service}) => {
  const navigation = useNavigation();

  // console.log(service.src, ' service.src');
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ViewAllVendors', {
          myService: service.title,
        })
      }
      style={[styles.card, styles.dimensions]}>
      <Image style={styles.image} source={service.src} />
      <Text style={styles.title}>{service.title}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    borderRadius: 10,
    position: 'relative', // To position child elements within the card
    overflow: 'hidden', // To clip the image to card boundaries
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
  },
  image: {
    position: 'absolute',
    top: 5,
    //right: 20,
    // width: '60%',
    //height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: responsiveHeight(9),
    width: responsiveWidth(15),
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 7,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    color: black,
  },
  dimensions: {width: cardWidth, height: cardHeight},
});
