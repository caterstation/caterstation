import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Heading from '../../Heading';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const FollowUsComponent = () => {
  const openInsta = () => {
    const url =
      'https://www.instagram.com/caterstation.pro?igsh=bnZlYXRtOGV1a2Fm&utm_source=qr';
    openURL(url);
  };

  const openFb = () => {
    const url = 'https://www.facebook.com/caterstation.pro?mibextid=LQQJ4d';
    openURL(url);
  };

  const openTiktok = () => {
    const url = 'https://www.tiktok.com/@caterstation.pro0?_t=8p01Z0rLrYP&_r=1';
    openURL(url);
  };

  const openYoutube = () => {
    const url = 'https://youtube.com/@caterstationpro?si=vRSEJCkoe6zdELGb';
    openURL(url);
  };

  const openURL = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.warn("Don't know how to open URI: " + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  return (
    <View style={{marginHorizontal: responsiveWidth(2)}}>
      <Heading style={styles.heading}>Follow Us</Heading>
      <View style={styles.followUsContainer}>
        <Pressable onPress={openFb} style={styles.imageContainer}>
          <Image
            source={require('../../../Images/Home/fb.png')}
            style={styles.image}
          />
        </Pressable>

        <Pressable onPress={openInsta} style={styles.imageContainer}>
          <Image
            source={require('../../../Images/Home/insta.png')}
            style={styles.image}
          />
        </Pressable>
        <Pressable onPress={openTiktok} style={styles.imageContainer}>
          <Image
            source={require('../../../Images/Home/tt.png')}
            style={styles.image}
          />
        </Pressable>
        <Pressable onPress={openYoutube} style={styles.imageContainer}>
          <Image
            source={require('../../../Images/Home/yt.png')}
            style={styles.image}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default FollowUsComponent;

const styles = StyleSheet.create({
  followUsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
  },
  imageContainer: {
    paddingTop: responsiveHeight(0.5),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 50,
    height: responsiveWidth(15),
    width: responsiveWidth(15),
  },
  heading: {
    paddingLeft: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
});
