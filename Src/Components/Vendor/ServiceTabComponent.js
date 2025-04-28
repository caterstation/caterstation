import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black, blue, white} from '../../Colors';
import Heading from '../../Heading';
import {FlatList} from 'react-native';
import RenderHtmlContent from '../RenderHtmlContent';
import axios from 'axios';

const customIcons = {
  Catering: require('../../../Images/ic.png'),
  DECOR: require('../../../Images/id.png'),
  Food: require('../../../Images/if.png'),
  Photography: require('../../../Images/ip.png'),
  'Wedding Venues': require('../../../Images/iv.png'),
};
const RenderItemHandler = ({item}) => {
  const img = `https://www.caterstation.pro/public/vendor/service/${item.item.icon}`;
  const service = item.item.service_name;
  const iconSource = customIcons[service] || img; // Use custom icon if available, otherwise use API icon

  return (
    <View style={styles.serviceContainer}>
      <Image resizeMode="contain" style={styles.image} source={iconSource} />
      <Text style={styles.imageText}>{item.item.service_name}</Text>
    </View>
  );
};

const FooterComponent = ({description}) => {
  return (
    <View
      style={{
        marginTop: responsiveHeight(1),
      }}>
      <Heading style={styles.heading}>Description</Heading>

      <View style={styles.description}>
        <RenderHtmlContent htmlContent={description} />
      </View>
    </View>
  );
};

const getmyVendorsDetail = async slug => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        `https://www.caterstation.pro/api/vendor-detail/${slug}`,
      );
      resolve(result?.data.vendor_services || {});
    } catch (error) {
      //console.log('error in api fetching: ', error);
      reject(error);
    }
  });
};
const ServiceTabComponent = ({slug, description}) => {
  const [myAllDataVendor, setmyAllDataVendor] = useState();
  useEffect(() => {
    getmyVendorsDetail(slug).then(result => {
      setmyAllDataVendor(result);
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={myAllDataVendor}
        ListHeaderComponent={
          <Heading style={styles.heading}>Quick Services</Heading>
        }
        ListFooterComponent={<FooterComponent description={description} />}
        numColumns={3}
        renderItem={item => <RenderItemHandler item={item} />}
      />
    </View>
  );
};

export default ServiceTabComponent;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: white, width: responsiveHeight(50)},
  heading: {
    color: blue,
    marginTop: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
  },
  imageText: {marginTop: responsiveHeight(1), color: black},
  serviceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(10),
    width: responsiveWidth(33.3),
  },
  description: {
    width: responsiveWidth(100),
    marginLeft: responsiveHeight(2),
  },
});
