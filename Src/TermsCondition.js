import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { black, blue, white } from './Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import HorizontalBar from './HorizontalBar';
import { useNavigation } from '@react-navigation/native';

const TermsCondition = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <HorizontalBar backPress={() => navigation.goBack()} title="Terms and Conditions" />

        <View style={styles.innerContainer}>
          <Text style={styles.headtxt}>User Registration Policy</Text>
          <Text style={styles.txt}>
            Unregistered users cannot place orders, per our policy; they may only view pricing and packages. They must sign up for an account on either app or website, then log in with their credentials and place a complete order from beginning to end.
          </Text>

          <Text style={styles.headtxt}>General Terms and Conditions</Text>
          {bulletPoints.map((point, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.bullet} />
              <Text style={styles.txt}>{point}</Text>
            </View>
          ))}

          <Text style={styles.headtxt}>Refund & Cancellation Policy</Text>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={styles.txt}>
              Cancel events at least 15 days before the event. The pre-booking amount will be refundable within 48 hours of the booking time; otherwise, there will be no money payback. In case of cancellation, 3% of CaterStation's overall service amount will be non-refundable.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const bulletPoints = [
  'CaterStation is a digital platform offering services to book events online.',
  'Users can book halls, marquees, farmhouses, and corporate events through the app.',
  'CaterStation provides a convenient way to book your events displayed on the platform.',
  'It connects consumers to event organizers offering reliable services.',
  "CaterStation does not independently verify vendors' product quality or legal compliance.",
  'Users are responsible for verifying vendor quality, reliability, and compliance themselves.',
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: white,
  },
  container: {
    paddingBottom: responsiveHeight(10),
  },
  innerContainer: {
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2),
  },
  headtxt: {
    color: black,
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  txt: {
    color: black,
    fontSize: responsiveFontSize(1.8),
    textAlign: 'justify',
    marginBottom: responsiveHeight(2),
    marginRight: responsiveHeight(2),
  },
  row: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(1),
  },
  bullet: {
    marginTop: responsiveHeight(0.5),
    marginRight: responsiveWidth(2),
    width: responsiveWidth(2),
    height: responsiveWidth(2),
    borderRadius: responsiveWidth(1),
    backgroundColor: blue,
  },
});

export default TermsCondition;
