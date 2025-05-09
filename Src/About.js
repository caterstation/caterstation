import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black, white} from './Colors';
import {useNavigation} from '@react-navigation/native';
import HorizontalBar from './HorizontalBar';

const About = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <HorizontalBar backPress={() => navigation.goBack()} title="About Us" />

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            At CaterStation, we have brought together an extensive network of
            vendors, including venues, caterers, event planners, photographers,
            and DJs, all in one place. With our user-friendly website and mobile
            app, you can easily browse through our extensive vendor network,
            compare prices and services, and book your preferred vendor in just
            a few clicks.
          </Text>

          {/* Chairman Section */}
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../Images/father.png')}
              />
              <Text style={styles.nameText}>CH. Faryad Ahmed</Text>
            </View>

            <View style={styles.messageContainer}>
              <Text style={styles.title}>Chairman’s Message:</Text>
              <Text style={styles.paragraph}>
                As the chairman of Al-Nafoura group we started all of our
                businesses knowing that we need to add value to our country.
                Similarly, we are now starting the project of CaterStation,
                keeping in mind our new generation, young work force and a huge
                growth that Pakistan has shown over the past few years in IT
                sector. Digitalisation is the future and we will continue
                providing opportunities to our young, innovative generation to
                induce our part in contributing to the national economy.
              </Text>
            </View>
          </View>

          {/* CEO Section */}
          <View style={styles.row}>
            <View style={styles.messageContainer}>
              <Text style={styles.title}>CEO’s Message:</Text>
              <Text style={styles.paragraph}>
                It gives me great pride to lead CaterStation, a one-of-its-kind
                online platform in Pakistan which is created keeping in mind
                the huge potential of growth of the Event Management industry in
                Pakistan. We remain committed to make CaterStation an attractive
                and easily accessible platform for both of our worthy clients
                and companies on-board. The outlook for CaterStation is very
                positive and we look forward to continue delivering maximum
                growth for all of our key stakeholders.
              </Text>
            </View>

            <View style={[styles.imageContainer, {marginLeft: responsiveWidth(1.5)}]}>
              <Image
                style={styles.image}
                source={require('../Images/sirD.jpg')}
              />
              <Text style={styles.nameText}>Dawood Ahmed</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: white,
  },
  container: {
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveHeight(10),

  },
  section: {
    marginTop: responsiveHeight(1),
  },
  paragraph: {
    textAlign: 'justify',
    color: black,
    fontSize: responsiveFontSize(1.5),
  },
  row: {
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
  },
  imageContainer: {
    width: responsiveWidth(40),
  },
  image: {
    width: responsiveWidth(38),
    height: responsiveHeight(25),
    resizeMode: 'cover',
  },
  nameText: {
    color: black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
  },
  messageContainer: {
    width: responsiveWidth(55),
  },
  title: {
    fontWeight: 'bold',
    color: black,
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(0.5),
  },
});

export default About;
