import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {black} from './../../Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PackageIntroComponent = ({packageName, price}) => {
  return (
    <View style={styles.packgIntro}>
      {/* Left Section */}
      <View style={{flex: 1}}>
        <Text style={styles.PkgText}>{packageName}</Text>

        {/* Row for Wallet Icon and Price + Rating */}
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', marginTop: 10},
          ]}>
          {/* Wallet Icon and Price */}
          <View style={[styles.row, {alignItems: 'center'}]}>
            <AntDesign
              name="wallet"
              style={styles.icon}
              color="green"
              size={20}
            />
            <Text style={styles.title}>{price}</Text>
            <Text style={styles.subTitle}>/ per head</Text>
          </View>

          {/* Star Icon and Rating */}
          <View style={[styles.row, {alignItems: 'center'}]}>
            <AntDesign name="star" style={styles.icon} color="gold" size={20} />
            <Text style={styles.title}>5</Text>
            <Text style={styles.subTitle}>(200)</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PackageIntroComponent;

const styles = StyleSheet.create({
  packgIntro: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginTop: 15,
  },
  PkgText: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: responsiveFontSize(2.6),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
    fontSize: responsiveFontSize(1.8),
  },
  subTitle: {
    fontSize: responsiveFontSize(1.6),
  },

  servicesTitle: {
    color: black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(5),
  },
});
