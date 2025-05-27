import React, { useState } from 'react';
import {
  FlatList,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  removeAllFromCart,
  removeFromCart,
  updateQuantity,
} from './redux/MyPackageSlice';
import { black, blue, white } from './Colors';
import HorizontalBar from './HorizontalBar';
import UiAddToCart from './UiAddToCart';

const AddToCart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const myPackages = useSelector(state => state.package.cart);
  const [oID, setoID] = useState(); // Currently unused

  const totalBill = myPackages.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveAll = () => {
    dispatch(removeAllFromCart(''));
  };

  const handleCheckout = () => {
    if (myPackages.length > 0) {
      navigation.navigate('PackageUserDetails');
    } else {
      Alert.alert('No Package Selected');
    }
  };

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total Amount = {totalBill} Pkr</Text>
        <Pressable onPress={handleRemoveAll} style={styles.clearButton}>
          <Text style={styles.totalText}>Clear</Text>
        </Pressable>
      </View>
      <View style={styles.checkoutContainer}>
        <Pressable onPress={handleCheckout} style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <HorizontalBar backPress={() => navigation.goBack()} title="Add To Cart" />
      {myPackages.length > 0 ? (
        <FlatList
          data={myPackages}
          renderItem={({ item }) => <UiAddToCart item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <View style={styles.emptyScreen}>
          <Text style={styles.emptyText}>Cart is Empty</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: white,
  },
  footerContainer: {
    marginHorizontal: responsiveWidth(5),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    color: blue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  clearButton: {
    width: responsiveWidth(20),
    alignItems: 'flex-end',
  },
  checkoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(5),
  },
  checkoutButton: {
    paddingHorizontal: responsiveWidth(15),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: blue,
  },
  checkoutText: {
    color: white,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: blue,
    fontSize: responsiveFontSize(2),
  },
});

export default AddToCart;
