import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { userLogin } from './redux/MyUserSlice';
import { black, lightgrey } from './Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ProfilePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [modalVisible, setModalVisible] = useState(false);

  const removePhoneNumber = async () => {
    try {
      await AsyncStorage.multiRemove(['phoneNumber', 'userInfo']);
      dispatch(userLogin(''));
      navigation.reset({ index: 0, routes: [{ name: 'AuthNav' }] });
    } catch (error) {
      console.error('Error removing phone number:', error);
    }
  };

  const handleSubmit = async () => {
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    if (!phoneNumber) {
      Alert.alert('No Account is Login');
      return;
    }

    try {
      await axios.post('https://caterstation.pro/api/delete-user', { id: user.id }, {
        headers: { 'Content-Type': 'application/json' },
      });

      navigation.reset({ index: 0, routes: [{ name: 'AuthNav' }] });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderOption = (label, icon, onPress) => (
    <Pressable onPress={onPress} style={styles.optionRow}>
      <View style={styles.optionLeft}>
        <Image source={icon} />
        <Text style={styles.optionText}>{label}</Text>
      </View>
      <AntDesign name="right" size={14} color={black} style={{ marginTop: 3 }} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarShadow}>
          <View style={styles.avatar}>
            <Ionicons name="person" color={'white'} size={30} />
          </View>
        </View>

        {user === '' ? (
          <Pressable style={styles.loginPrompt} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'AuthNav' }] })}>
            <Text style={styles.loginText}>Login User</Text>
          </Pressable>
        ) : (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text>{user?.email || 'Email'}</Text>
          </View>
        )}
      </View>

      {user !== '' && renderOption('Edit Profile', require('../Images/Vector-personBlack.png'), () => navigation.navigate('EditProfile'))}
      {renderOption('About', require('../Images/about.png'), () => navigation.navigate('About'))}
      {renderOption('Terms and Condition', require('../Images/about.png'), () => navigation.navigate('TermsCondition'))}

      {user !== '' && (
        <>
          {renderOption('Logout', require('../Images/logout.png'), removePhoneNumber)}
          {renderOption('Delete Account', require('../Images/delete.png'), () => setModalVisible(true))}
        </>
      )}

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
            <View style={styles.modalActions}>
              <Pressable onPress={handleSubmit} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  profileHeader: {
    marginTop: 10,
    height: 100,
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: lightgrey,
  },
  avatarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    width: Math.min(responsiveWidth(15), responsiveHeight(15)),
    height: Math.min(responsiveWidth(15), responsiveHeight(15)),
    borderRadius: Math.min(responsiveWidth(15), responsiveHeight(15)) / 2,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(30),
  },
  loginText: {
    color: black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  userInfo: {
    width: responsiveWidth(70),
    paddingTop: 10,
    marginLeft: responsiveWidth(3),
  },
  userName: {
    color: black,
    fontWeight: 'bold',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: lightgrey,
    alignItems: 'center',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontWeight: 'bold',
    color: black,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    height: responsiveHeight(20),
    width: responsiveWidth(80),
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    justifyContent: 'space-between',
  },
  modalText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default ProfilePage;
