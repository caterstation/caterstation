import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

const ImageCarousel = ({
  selectedImage,
  imageList,
  onClosePress,
  portfolio_id,
  vendor_id,
}) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  // const [isOrderModalOpened, setIsOrderModalOpened] = useState(false);
  const [orderedImageList, setOrderedImageList] = useState([]);

  useEffect(() => {
    if (selectedImage) {
      const selectedImageIndex = imageList.findIndex(
        img =>
          `https://www.caterstation.pro/public/vendor/portfolio/${img.image}` ===
          selectedImage,
      );
      const reorderedList = [
        imageList[selectedImageIndex],
        ...imageList.slice(0, selectedImageIndex),
        ...imageList.slice(selectedImageIndex + 1),
      ];
      setOrderedImageList(reorderedList);
      setCurrentIndex(0);
    }
  }, [selectedImage, imageList]);

  const handleClosePress = () => {
    onClosePress();
  };

  const navigateToLogin = () => {
    // navigation.navigate('Login');

    navigation.reset({
      index: 0,
      routes: [{name: 'AuthNav'}],
    });
  };

  const showAlert = () => {
    handleClosePress();
    Alert.alert(
      'No user found',
      'Would you like to go to the login screen?',
      [
        {
          text: 'Cancel',
          onPress: () => //console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Login',
          onPress: navigateToLogin,
        },
      ],
      {cancelable: false},
    );
  };
  const handleOrderNowPress = () => {
    if (user == '') {
      // Alert.alert("no user found")
      showAlert();
    } else {
      //console.log('my data passing : ', vendor_id, portfolio_id);
      setIsModalOpened(false);
      handleClosePress();
      navigation.navigate('ServiceOrderDetails', {
        vendor_id: vendor_id,
        portfolio_id: portfolio_id,
      });
    }

    // setIsOrderModalOpened(true);
  };

  const renderItem = ({item}) => {
    const img = `https://www.caterstation.pro/public/vendor/portfolio/${item.image}`;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(50),
            borderRadius: 16,
            overflow: 'hidden',
          }}>
          <Image
            style={{
              flex: 1,
              width: responsiveWidth(100),
              height: responsiveHeight(40),
              marginBottom: 8,
            }}
            source={{uri: img}}
          />
          <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(20),
              backgroundColor: 'white',
              paddingHorizontal: responsiveWidth(2),
              paddingVertical: responsiveHeight(2),
            }}>
            <View
              style={{
                width: responsiveWidth(85.5),
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                Pkr {item.price}
              </Text>
            </View>
            <Text
              numberOfLines={4}
              style={{
                color: 'black',
                fontSize: responsiveFontSize(1.5),
                marginTop: responsiveHeight(2),
                textAlign: 'justify',
              }}>
              {item.summary}
            </Text>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  //console.log('iteeeeem pppiddddd: ', item.id);
                  //console.log('iteeeeem vvvviddddd: ', item.vendor_id);
                  handleOrderNowPress();
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(30),
                  backgroundColor: blue,
                  height: responsiveHeight(4),
                  borderRadius: 4,
                }}>
                <Text style={{color: 'white'}}>Order Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handleSnapToItem = index => {
    setCurrentIndex(index);
    setIsModalOpened(false);
  };

  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        <Carousel
          data={orderedImageList}
          renderItem={renderItem}
          sliderWidth={responsiveWidth(100)}
          itemWidth={responsiveWidth(90)}
          onSnapToItem={handleSnapToItem}
          firstItem={currentIndex}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            // top: responsiveHeight(10),
            marginTop: responsiveHeight(10),
            right: responsiveWidth(2),
            backgroundColor: 'white',
            // backgroundColor: 'white',
            width: responsiveWidth(6),
            height: responsiveHeight(3),
            borderRadius: responsiveWidth(1),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleClosePress}>
          <Text style={{color: 'black', fontSize: responsiveFontSize(2)}}>
            x
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({});
