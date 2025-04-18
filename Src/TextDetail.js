// TextDetail.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { blue } from './Colors';

const TextDetail = ({ children, style }) => {
  return <Text style={[styles.TextDetail, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  TextDetail: {
    fontSize: responsiveFontSize(2.2),
    // fontWeight: 'bold',
    color: blue,
    // marginVertical: responsiveHeight(1),
    fontFamily: 'Arial', // Specify Arial font
  },
});

export default TextDetail;
