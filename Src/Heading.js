// Heading.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { blue } from './Colors';

const Heading = ({ children, style }) => {
  return <Text style={[styles.heading, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: blue,
    // marginVertical: responsiveHeight(1),
    fontFamily: 'Arial', // Specify Arial font
  },
});

export default Heading;
