import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import { blue, white } from './Colors';


const HorizontalBar = ({ backPress, title }) => {
  return (
    <View>
      <View style={styles.container}>
  <TouchableOpacity onPress={backPress} style={{ flex: 1,  paddingVertical:responsiveHeight(1), paddingLeft:responsiveWidth(4) }}>
  <FontAwsome name="angle-left" color={blue} size={20} />
  </TouchableOpacity>
  <Text style={styles.title}>{title}</Text>
  <TouchableOpacity style={{ flex: 1 }} />
</View>

    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f2f2f2',
      paddingHorizontal: responsiveWidth(3),
    //   paddingVertical: 8,
    height:responsiveHeight(7),
    backgroundColor:white
    },
    title: {
      fontSize: responsiveFontSize(2.5),
      fontWeight: 'bold',
      color:blue
    },
  });

export default HorizontalBar