import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Pressable} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Lblue, blue, white} from '../../Colors';
import Heading from '../../Heading';
import {useNavigation} from '@react-navigation/native';

const EventPlanningComponent = () => {
  const FlipShadowCard = ({title, subTitle, navigate, imageSrc}) => {
    return (
      <Pressable style={[styles.flipShadowCard]} onPress={navigate}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.column}>
            <Text style={styles.wedtoolColor}>{title} </Text>
            <Text style={styles.wedtoolColor}>{subTitle}</Text>
          </View>
          <View style={styles.flipImageContainer}>
            <Image style={styles.image} source={imageSrc} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: responsiveWidth(1),
          }}>
          <View style={{justifyContent: 'center'}}></View>
        </View>
      </Pressable>
    );
  };
  const navigation = useNavigation();
  return (
    <View style={styles.EventPlanContainer}>
      <Heading style={{marginLeft: responsiveWidth(3)}}>
        Event Planing Tool
      </Heading>
      <View style={styles.customPackageContainer}>
        <Pressable
          onPress={() => navigation.navigate('Menu')}
          style={{paddingVertical: responsiveHeight(1)}}>
          <View style={styles.container}>
            <Text style={[styles.text, styles.subText1]}>Custom Package</Text>
            <Text style={[styles.text, styles.subText]}>
              Personalise your event with our custom packages.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                style={styles.packageImage}
                source={require('../../../Images/Home/cpkg.png')}
              />
            </View>
          </View>
        </Pressable>

        <View style={styles.WedPlanToolBlockCover}>
          <FlipShadowCard
            title="Build your"
            subTitle="Digital E-invites"
            navigate={() => navigation.navigate('WeddingCard', {card: 'wed'})}
            imageSrc={require('../../../Images/Home/einvite.png')}
          />
          <FlipShadowCard
            title="Create your"
            subTitle="Custom Order"
            navigate={() => navigation.navigate('Cities')}
            imageSrc={require('../../../Images/Home/order.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default EventPlanningComponent;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(18),
    width: responsiveWidth(44),
    backgroundColor: Lblue,
    borderRadius: 10,
    paddingVertical: responsiveHeight(1),
    flexDirection: 'column',
    position: 'relative',
  },
  EventPlanContainer: {
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(3),
    justifyContent: 'space-around',
    paddingVertical: responsiveHeight(2),
  },
  WedPlanToolBlockCover: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: responsiveHeight(20),
  },
  customPackageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: responsiveHeight(20),
  },
  flipShadowCard: {
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(2),
    width: responsiveWidth(42),
    backgroundColor: white,
    height: responsiveHeight(7.8),
    borderRadius: 10,
    paddingBottom: responsiveHeight(0.2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  wedtoolColor: {
    color: blue,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
  image: {
    height: responsiveHeight(4),
    width: responsiveWidth(7.5),
  },
  flipImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(9),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(0.8),
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: responsiveWidth(30),
  },
  text: {
    color: white,
    paddingHorizontal: responsiveWidth(1.6),
    textAlign: 'center',
  },
  packageImage: {
    height: responsiveHeight(9.5),
    width: responsiveWidth(20),
  },
  subText: {
    fontWeight: '400',
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.6),
  },
  subText1: {
    fontWeight: '500',
    fontSize: responsiveFontSize(2),
  },
});
