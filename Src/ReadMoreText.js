import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { black } from './Colors';

const ReadMoreText = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text numberOfLines={isExpanded ? undefined : 1} style={styles.text}>
        {children}
      </Text>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.readMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 10,
  },
  text: {
    fontSize: 16,
    width:responsiveWidth(90),
    

  },
  readMore: {
    color: black,
    marginTop: 5,
    fontWeight:"bold"
  },
});

export default ReadMoreText;
