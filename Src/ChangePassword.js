import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black, blue, greyBg, greyDark, white} from './Colors';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://caterstation.pro/api/',
        {
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      navigation.navigate('ProfilePage');
    } catch (error) {
      console.error('Error:', error.response?.data);
      setError(error.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="angle-left" color={black} size={20} />
        <Text style={styles.headerText}>Change Password</Text>
      </View>

      {/* New Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="New Password"
          placeholderTextColor={black}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.textInput}
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={black}
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
          style={styles.textInput}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Submit Button */}
      <View style={styles.buttonWrapper}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator color={white} />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    backgroundColor: white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    borderBottomWidth: 1,
    borderBottomColor: greyBg,
  },
  headerText: {
    marginLeft: responsiveWidth(28),
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: black,
  },
  inputWrapper: {
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: greyDark,
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
  textInput: {
    height: responsiveHeight(6),
    color: black,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(5),
  },
  button: {
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: blue,
    borderRadius: 5,
  },
  buttonText: {
    color: white,
    fontSize: responsiveFontSize(2),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
  },
});

export default ChangePassword;
