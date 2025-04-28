import React, {useEffect, useState, useRef, useMemo} from 'react';
import {Animated, StyleSheet, View, ActivityIndicator} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import SearchComponent from './Components/SearchComponent';
import ServicesVenderCard from './Components/Vendor/ServicesVenderCard';
import VendorQuestionsComponent from './Components/Vendor/VendorQuestionsComponent';
import {white} from './Colors';

const VendorTab = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [vendorCategories, setVendorCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const hideSuggestions = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const fetchVendors = async () => {
    try {
      const response = await fetch('https://www.caterstation.pro/api/vendors');
      const data = await response.json();

      const filterVendorsByService = serviceName =>
        data.allvendors.filter(vendor =>
          vendor.vendor_services.some(
            service => service.service_name === serviceName,
          ),
        );

      setVendorCategories({
        Catering: filterVendorsByService('Catering'),
        Decor: filterVendorsByService('DECOR'),
        Food: filterVendorsByService('Food'),
        Photography: filterVendorsByService('Photography'),
        'Wedding Venues': filterVendorsByService('Wedding Venues'),
      });
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const getFilteredCategories = useMemo(() => {
    if (!searchQuery) {return vendorCategories;}

    return Object.fromEntries(
      Object.entries(vendorCategories).filter(([key]) =>
        key.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, vendorCategories]);

  const navigateToViewAll = service =>
    navigation.navigate('ViewAllVendors', {myService: service});

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.stickySearch,
          {transform: [{translateY: hideSuggestions}]},
        ]}>
        <SearchComponent
          hideSuggestions={false}
          isHome={false}
          setServiceSearchQuery={setSearchQuery}
          isVendor={true}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        style={styles.scrollView}>
        <View style={styles.servicesContainer}>
          {Object.entries(getFilteredCategories).map(([key, vendors]) => (
            <ServicesVenderCard
              key={key}
              handleNavigation={() => navigateToViewAll(key)}
              vendors={vendors.slice(0, 3)}
              heading={key}
              isLeft={key === 'Decor' || key === 'Photography'}
            />
          ))}
          <VendorQuestionsComponent />
        </View>
      </Animated.ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: white,
  },

  container: {
    flex: 1,
    backgroundColor: white,
  },
  stickySearch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: white,
  },
  scrollView: {
    flex: 1,
    marginBottom: responsiveHeight(8),
    marginTop: responsiveHeight(15),
    width: responsiveWidth(100),
  },
  servicesContainer: {
    paddingTop: responsiveHeight(5),
    paddingRight: responsiveWidth(2),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VendorTab;
