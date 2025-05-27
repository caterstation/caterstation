import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { black, blue } from './Colors';
import { useNavigation } from '@react-navigation/native';

const AllPagesButtons = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detail vendor wala page</Text>

      <Pressable
        onPress={() => navigation.navigate('DetailsVendora')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>DetailedVendor.js</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('OtpInp')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>OtpInputs.js</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('MyNumber')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>MyNumber</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontWeight: 'bold',
    color: black,
    marginBottom: 16,
  },
  button: {
    backgroundColor: blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AllPagesButtons;
