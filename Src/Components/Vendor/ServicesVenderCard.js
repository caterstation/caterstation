import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ViewAllBtn from '../../ViewAllBtn';
import HorizontalImagesComponent from './HorizontalImagesComponent';
import Title from '../../Title';
import Heading from '../../Heading';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {greyDark, white} from '../../Colors';

const images = {
  Catering: require('../../../Images/services/catering.jpeg'),
  Decor: require('../../../Images/services/decor.jpeg'),
  Food: require('../../../Images/services/food.jpeg'),
  Photography: require('../../../Images/services/photography.jpeg'),
  'Wedding Venues': require('../../../Images/services/weddingVenue.jpeg'),
};
const titles = {
  Catering: 'Indulge in a culinary journey with our diverse catering options.',
  Decor: `Transform any space into a stunning masterpiece with our bespoke decor
    services.`,
  Food: 'Elevate your dining experience with our curated selection of delectable dishes.',
  Photography: 'Capture every moment in detail with our professional photography services.',
  'Wedding Venues': 'Discover the perfect setting for your event from our portfolio of versatile venues.',
};
const ServicesVenderCard = ({
  handleNavigation,
  vendors,
  heading,
  isLeft = false,
}) => {
  ////console.log('isLeft', isLeft, 'heading', heading);
  return (
    <View style={[styles.container, isLeft ? styles.leftContainer : null]}>
      <View style={styles.row}>
        {!isLeft && <View style={{width: responsiveWidth(38)}} />}
        <View
          style={isLeft ? styles.imageContainer : styles.imageContainerRight}>
          <Image style={styles.image} source={images[heading]} />
        </View>
        {isLeft && <View style={{width: responsiveWidth(40)}} />}
      </View>
      <View style={isLeft ? styles.flipshadowcard : styles.shadowcard}>
        <Heading>{heading}</Heading>
        <Title style={styles.title}>{titles[heading]}</Title>
      </View>

      <View style={styles.buttonContainer}>
        <ViewAllBtn onPress={handleNavigation} />
      </View>
      <HorizontalImagesComponent vendors={vendors} />
    </View>
  );
};

export default ServicesVenderCard;

const styles = StyleSheet.create({
  flipshadowcard: {
    paddingHorizontal: responsiveWidth(2),
    width: responsiveWidth(50),
    backgroundColor: white,
    height: responsiveHeight(12),
    position: 'absolute',
    top: 25,
    right: 30,
    borderRadius: 10,
    paddingTop: responsiveHeight(0.8),
    paddingBottom: responsiveHeight(0.2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  shadowcard: {
    paddingHorizontal: responsiveWidth(2),
    width: responsiveWidth(50),
    backgroundColor: 'white',
    height: responsiveHeight(14),
    position: 'absolute',
    top: 25,
    left: 15,
    //height: responsiveHeight(12),
    borderRadius: 10,
    paddingTop: responsiveHeight(0.8),
    paddingBottom: responsiveHeight(0.2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevate the view to create a shadow effect
    elevation: 4,
  },
  title: {color: greyDark, fontWeight: 'normal'},

  buttonContainer: {
    marginTop: responsiveHeight(2),
    flexDirection: 'row-reverse',
    marginLeft: responsiveWidth(0.5),
  },

  image: {
    height: responsiveHeight(20),
    width: responsiveHeight(32),
    marginRight: 0,
  },

  imageContainer: {
    width: responsiveWidth(60),
  },
  imageContainerRight: {
    width: responsiveWidth(60),
    paddingRight: responsiveWidth(1),
  },
  container: {flexDirection: 'column', position: 'relative'},
  leftContainer: {
    paddingHorizontal: responsiveWidth(0),
    width: responsiveWidth(100),
  },
  row: {width: responsiveWidth(100), flexDirection: 'row'},
});
