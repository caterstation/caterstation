// Title.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { blue } from './Colors';

const Title = ({ children, style ,numberOfLines}) => {
  return <Text    numberOfLines={numberOfLines} style={[styles.Title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  Title: {
    fontSize: responsiveFontSize(1.7),
    // fontWeight: 'bold',
    color: blue,
    // marginVertical: responsiveHeight(1),
    fontFamily: 'Arial', // Specify Arial font
    fontWeight: '500',marginTop:responsiveHeight(1), color:blue 
  },
});

export default Title;
