import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { removeAllFromCart } from './redux/MyPackageSlice';
import HorizontalBar from './HorizontalBar';
import BackArrow from './BackArrow';
import { black, greyBg, white, lightgrey, blue } from './Colors';

const ConfirmPayment = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const myData = useSelector(state => state.package.cart);
  const { passid } = route.params;

  const totalBil = myData.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveAll = () => {
    dispatch(removeAllFromCart());
  };

  return (
    <SafeAreaView style={styles.container}>
      <HorizontalBar backPress={() => navigation.goBack()} title="Confirm Payment" />

      {/* Event Summary Card */}
      <View style={styles.eventCard}>
        <Text style={styles.eventId}>{passid}</Text>
        <View style={styles.eventRow}>
          <View style={styles.iconWrapper}>
            <Feather name="calendar" color={black} size={responsiveHeight(6)} />
          </View>
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>Wedding</Text>
          </View>
        </View>
      </View>

      {/* Bank Details */}
      <View style={styles.bankCard}>
        <View style={styles.bankHeader}>
          <MaterialCommunityIcons name="bank" color={black} size={responsiveHeight(4)} />
          <Text style={styles.bankTitle}>Bank Detail</Text>
        </View>

        <InfoRow label="Account Title" value="CATERSTATION" />
        <InfoRow label="IBAN" value="PK67 HABB OO15 4179 8115 4703" />
        <InfoRow label="Bank Name" value="HBL" />
      </View>

      {/* Info Text */}
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoText} numberOfLines={4}>
          Please send a screenshot of your partial payment to our Whatsapp. Meanwhile our CSR will contact you within 24 hours.
        </Text>
      </View>

      {/* WhatsApp Link */}
      <Pressable style={styles.whatsappRow}>
        <FontAwsome name="whatsapp" color="#075E54" size={responsiveHeight(2.5)} />
        <Text style={styles.whatsappText}>Contact us on Whatsapp.</Text>
      </Pressable>

      {/* Total Card */}
      <View style={styles.totalCard}>
        <InfoRow label="Total Amount" value={`${totalBil}`} bold />
        <Text style={styles.advanceText}>20% Advance Payable Amount PKR 4000</Text>
      </View>

      {/* Submit Button */}
      <View style={styles.submitWrapper}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
            handleRemoveAll();
          }}
          style={styles.submitBtn}
        >
          <Text style={styles.submitText}>Submit Order</Text>
        </Pressable>
      </View>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../Images/Vector.png')} />
            <Text style={styles.modalTitle}>Received Query</Text>
            <Text style={styles.modalMsg}>
              Thank you! Team CaterStation will contact you soon!
            </Text>
            <Pressable
              style={styles.modalBtn}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('ForYou');
              }}
            >
              <Text style={styles.modalBtnText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value, bold }) => (
  <View style={styles.infoRow}>
    <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.label, bold && styles.bold]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  eventCard: {
    borderRadius: 10,
    backgroundColor: lightgrey,
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
    marginVertical: responsiveHeight(2),
    height: responsiveHeight(12),
  },
  eventId: {
    color: black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(2),
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(60),
    marginTop: responsiveHeight(1.2),
  },
  iconWrapper: {
    width: responsiveWidth(15),
    alignItems: 'center',
  },
  eventDetails: {
    width: responsiveWidth(65),
  },
  eventTitle: {
    color: black,
    fontSize: responsiveFontSize(2.2),
  },
  bankCard: {
    marginHorizontal: responsiveWidth(5),
    borderRadius: 10,
    backgroundColor: lightgrey,
    padding: responsiveWidth(3),
    paddingVertical: responsiveHeight(3),
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankTitle: {
    color: black,
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3),
    paddingTop: responsiveHeight(0.7),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(2),
  },
  label: {
    color: black,
    fontSize: responsiveFontSize(1.8),
  },
  bold: {
    fontWeight: 'bold',
  },
  infoTextWrapper: {
    marginHorizontal: responsiveWidth(6),
    marginTop: responsiveHeight(3),
  },
  infoText: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'justify',
  },
  whatsappRow: {
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(6),
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  whatsappText: {
    color: black,
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3),
  },
  totalCard: {
    borderRadius: 10,
    backgroundColor: lightgrey,
    marginHorizontal: responsiveWidth(5),
    padding: responsiveWidth(3),
    marginVertical: responsiveHeight(2),
    height: responsiveHeight(13),
  },
  advanceText: {
    color: black,
    fontSize: responsiveFontSize(1.5),
    width: responsiveWidth(65),
  },
  submitWrapper: {
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(5),
  },
  submitBtn: {
    backgroundColor: blue,
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(1.5),
  },
  submitText: {
    color: white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: blue,
    height: responsiveHeight(45),
    width: responsiveWidth(90),
    alignItems: 'center',
    paddingVertical: responsiveHeight(3),
  },
  modalTitle: {
    color: white,
    marginTop: responsiveHeight(3),
    fontWeight: 'bold',
  },
  modalMsg: {
    color: white,
    textAlign: 'center',
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(2),
  },
  modalBtn: {
    backgroundColor: white,
    marginTop: responsiveHeight(6),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(20),
  },
  modalBtnText: {
    color: blue,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ConfirmPayment;
