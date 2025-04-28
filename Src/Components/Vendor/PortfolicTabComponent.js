import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {black, blue, white} from '../../Colors';
import axios from 'axios';
import ImageCarousel from './ImageCarousel';

const PortfolicTabComponent = ({slug}) => {
  const [myPortfolio, setmyPortfolio] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [vendor_id, setVendorID] = useState(null);
  const [portfolio_id, setPortfilioID] = useState(null);

  // Fetch Portfolio Data
  useEffect(() => {
    const getmyPortfolio = async () => {
      try {
        const result = await axios.get(
          `https://www.caterstation.pro/api/vendor-detail/${slug}`,
        );
        setmyPortfolio(result?.data.vendor_portfolio || []);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    getmyPortfolio();
  }, [slug]);

  // Handle image click
  const handleImagePress = (img, vendorId, id) => {
    setSelectedImage(img);
    setVendorID(vendorId);
    setPortfilioID(id);
  };

  // Close modal
  const handleClosePress = () => {
    setSelectedImage(null);
  };

  // Render individual portfolio item
  const RenderItemHandler = ({item}) => {
    const myImg = item.image;
    const id = item.id;
    const vendorId = item.vendor_id;
    const img = `https://www.caterstation.pro/public/vendor/portfolio/${myImg}`;

    return (
      <TouchableOpacity
        onPress={() => handleImagePress(img, vendorId, id)}
        style={styles.portfolioItem}>
        <Image style={styles.image} source={{uri: img}} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.portolioTitle}>Order Portfolio</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={myPortfolio}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RenderItemHandler item={item} />}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedImage !== null}
        onRequestClose={handleClosePress}>
        <ImageCarousel
          selectedImage={selectedImage}
          portfolio_id={portfolio_id}
          vendor_id={vendor_id}
          imageList={myPortfolio}
          onClosePress={handleClosePress}
        />
      </Modal>
    </View>
  );
};

export default PortfolicTabComponent;

const styles = StyleSheet.create({
  portolioTitle: {
    color: black,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: responsiveHeight(1),
  },
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: white,
  },
  portfolioItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(30),
    marginHorizontal: responsiveWidth(0.5),
    marginVertical: responsiveHeight(1),
  },
  image: {
    height: responsiveHeight(20),
    width: responsiveWidth(30),
  },
});
