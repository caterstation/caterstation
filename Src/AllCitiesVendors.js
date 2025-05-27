import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { black, blue, white } from './Colors';
import HorizontalBar from './HorizontalBar';
import Title from './Title';

const AllCitiesVendors = ({ route }) => {
  const { city, id } = route.params;
  const navigation = useNavigation();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://www.caterstation.pro/api/vendors');
        const data = await response.json();

        const filtered = data.allvendors.filter(vendor => vendor.city == id);
        setVendors(filtered);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [id]);

  const renderVendorItem = ({ item }) => {
    const thumbUrl = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`;
    const coverUrl = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`;

    return (
      <Pressable
        onPress={() => navigation.navigate('ServiceVendorDetail', {
          item,
          Thumb: thumbUrl,
          Cover: coverUrl,
        })}
        style={styles.vendorCard}
      >
        <Image source={{ uri: thumbUrl }} style={styles.vendorImage} />
        <View style={styles.vendorNameContainer}>
          <Title numberOfLines={1}>{item.company_name}</Title>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HorizontalBar backPress={() => navigation.goBack()} title={city} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : vendors.length === 0 ? (
        <Text style={styles.noVendorText}>
          No vendors available for {city}. Coming Soon!
        </Text>
      ) : (
        <FlatList
          data={vendors}
          renderItem={renderVendorItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: responsiveWidth(1),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: blue,
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
  },
  noVendorText: {
    color: blue,
    textAlign: 'center',
    marginTop: responsiveHeight(2),
  },
  listContent: {
    paddingBottom: responsiveHeight(2),
  },
  vendorCard: {
    width: responsiveWidth(30),
    marginHorizontal: responsiveWidth(1),
    marginBottom: responsiveHeight(1),
  },
  vendorImage: {
    height: responsiveHeight(20),
    width: responsiveWidth(30),
  },
  vendorNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(1),
  },
});

export default AllCitiesVendors;
