import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
import {useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {black,white} from './Colors';
import Heading from './Heading';
import {getHomeTestimonials} from './Hooks/api/ForyouApi';

// HTML description styling
const modifyHtmlDescription = htmlContent => {
  return htmlContent
    .replace(/<p[^>]*>(.*?)<\/p>/g, '<p style="color: black;">$1</p>')
    .replace(/<li[^>]*>(.*?)<\/li>/g, '<li style="color: black;">$1</li>');
};

// API Calls
const fetchVendorDetails = async slug => {
  try {
    const result = await axios.get(
      `https://www.caterstation.pro/api/vendor-detail/${slug}`,
    );
    return result?.data.vendor_services || {};
  } catch (error) {
    throw error;
  }
};

const fetchVendorPortfolio = async slug => {
  try {
    const result = await axios.get(
      `https://www.caterstation.pro/api/vendor-detail/${slug}`,
    );
    return result?.data.vendor_portfolio || {};
  } catch (error) {
    throw error;
  }
};

const fetchTestimonials = async () => {
  const result = await getHomeTestimonials();
  return result?.data || [];
};

// Main Component
const ServiceVendorDetail = ({route}) => {
  const [index, setIndex] = useState(0);
  const [myAllDataVendor, setMyAllDataVendor] = useState();
  const [myPortfolio, setMyPortfolio] = useState();
  const [myAllDataTestimonials, setMyAllDataTestimonials] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const user = useSelector(state => state.user.user);

  const {item} = route.params;
  const Slug = item.slug;
  const description = modifyHtmlDescription(item.desc);

  // useCallback ensures function identity stability
  const getVendorDetails = useCallback(() => fetchVendorDetails(Slug), [Slug]);
  const getVendorPortfolio = useCallback(() => fetchVendorPortfolio(Slug), [Slug]);

  useEffect(() => {
    fetchTestimonials().then(setMyAllDataTestimonials);
    getVendorPortfolio().then(setMyPortfolio);
    getVendorDetails().then(setMyAllDataVendor);
  }, [getVendorDetails, getVendorPortfolio]);

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <FlatList
        data={myAllDataVendor}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={styles.centeredHeader}>
            <Heading style={{color: black}}>Quick Services</Heading>
          </View>
        }
        ListFooterComponent={
          <View style={styles.centeredHeader}>
            <Heading style={{color: black, marginBottom: responsiveHeight(1)}}>
              Description
            </Heading>
            <View style={styles.htmlContainer}>
              <View style={{width: responsiveWidth(80)}}>
                <RenderHtml contentWidth={width} source={{html: description}} />
              </View>
            </View>
          </View>
        }
        renderItem={({item}) => {
          const img = `https://www.caterstation.pro/public/vendor/service/${item.icon}`;
          const customIcons = {
            Catering: require('../Images/ic.png'),
            DECOR: require('../Images/id.png'),
            Food: require('../Images/if.png'),
            Photography: require('../Images/ip.png'),
            'Wedding Venues': require('../Images/iv.png'),
          };
          const iconSource = customIcons[item.service_name] || {uri: img};
          return (
            <View style={styles.serviceItem}>
              <TouchableOpacity
                onPress={() => setSelectedImage(iconSource.uri)}>
                <Image
                  style={styles.serviceIcon}
                  resizeMode="contain"
                  source={iconSource}
                />
                <Text style={styles.serviceText}>{item.service_name}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );

  const ImageCarousel = ({selectedImage, onClosePress}) => {
    const [isModalOpened, setIsModalOpened] = useState(true);
    const handleOrderNowPress = () => {
      if (!user) {
        Alert.alert(
          'No user found',
          'Would you like to go to the login screen?',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Login',
              onPress: () =>
                navigation.reset({index: 0, routes: [{name: 'AuthNav'}]}),
            },
          ],
          {cancelable: false},
        );
      } else {
        setIsModalOpened(false);
        onClosePress();
        navigation.navigate('ServiceOrderDetails', {
          vendor_id: item.id,
          portfolio_id: selectedImage?.id,
        });
      }
    };

    return (
      <Modal visible={isModalOpened} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Image
            style={styles.modalImage}
            source={{uri: selectedImage}}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={onClosePress}
            style={styles.modalCloseButton}>
            <Text style={{color: white}}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOrderNowPress}
            style={styles.modalOrderButton}>
            <Text style={{color: white}}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FirstRoute />
      {selectedImage && (
        <ImageCarousel
          selectedImage={selectedImage}
          onClosePress={() => setSelectedImage(null)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredHeader: {
    marginTop: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  htmlContainer: {
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(15),
    width: responsiveWidth(33.3),
    marginVertical: responsiveHeight(3),
  },
  serviceIcon: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
  },
  serviceText: {
    marginTop: responsiveHeight(1.5),
    color: black,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000dd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(60),
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 30,
  },
  modalOrderButton: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
  },
});

export default ServiceVendorDetail;
