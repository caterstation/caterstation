import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import {black, blue,  white} from './Colors';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';

import ServiceTabComponent from './Components/Vendor/ServiceTabComponent';
import VenderInfoComponent from './Components/Vendor/VenderInfoComponent';
import ReviewTabComponent from './Components/Vendor/ReviewTabComponent';

const layout = Dimensions.get('window');

const DetailsVendor = ({route}) => {
  const [index, setIndex] = useState(0);
  const [myPortfolio, setmyPortfolio] = useState();

  const navigation = useNavigation();

  const {item, Thumb, Cover} = route.params; // Assuming Thumb and Cover are serializable

  const Slug = item.slug;
  const description = item.desc;

  const user = useSelector(state => state.user.user);
  ////console.log('====================================');
  ////console.log('  user from redux: ', user);
  ////console.log('====================================');

  // _________image sliding____________________



  useEffect(() => {
    const getmyPortfolio = async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await axios.get(
            `https://www.caterstation.pro/api/vendor-detail/${Slug}`,
          );
          resolve(result?.data.vendor_portfolio || {});
        } catch (error) {
          //console.log('error in api fetching: ', error);
          reject(error);
        }
      });
    };
    getmyPortfolio().then(result => {
      //console.log('====================================');
      //console.log('porfolio ', result);
      //console.log('====================================');
      setmyPortfolio(result);
      // //console.log('my Portfolio : ', result)
    });
    // //console.log('myAllDataTestimonials results: ', myAllDataTestimonials)
  }, [Slug]);

  const ImageCarousel = ({
    selectedImage,
    imageList,
    onClosePress,
    portfolio_id,
    vendor_id,
  }) => {
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
            onPress: () => console.log('Cancel Pressed'),
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

  const SecondRoute = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [vendor_id, setVendorID] = useState(null);
    const [portfolio_id, setPortfilioID] = useState(null);

    const handleImagePress = (img, vendorId, id) => {
      //console.log('passing data ', vendorId, id, img);
      setSelectedImage(img);
      setVendorID(vendorId);
      setPortfilioID(id);
    };

    const handleClosePress = () => {
      setSelectedImage(null);
    };

    return (
      <View
        style={[
          styles.scene,
          {
            paddingHorizontal: responsiveWidth(2),
            backgroundColor: '#ffffff',
            width: responsiveWidth(100),
          },
        ]}>
        <Text
          style={{
            color: black,
            fontSize: responsiveFontSize(2),
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: responsiveHeight(1),
          }}>
          Order Portfolio
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={myPortfolio}
          numColumns={3}
          renderItem={item => {
            //  //console.log('====================================');
            // //console.log('portfolio info : ', item);
            // //console.log('portfolio id : ', item.item.id);
            // //console.log('vendor_id : ', item.item.vendor_id);
            // //console.log('====================================');
            const myImg = item.item.image;
            const id = item.item.id;
            const vendorId = item.item.vendor_id;
            const img = `https://www.caterstation.pro/public/vendor/portfolio/${myImg}`;

            return (
              <TouchableOpacity
                onPress={() => handleImagePress(img, vendorId, id)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(30),
                  marginHorizontal: responsiveWidth(0.5),
                  marginVertical: responsiveHeight(1),
                }}>
                <Image
                  style={{
                    height: responsiveHeight(20),
                    width: responsiveWidth(30),
                  }}
                  source={{uri: img}}
                />
              </TouchableOpacity>
            );
          }}
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

  // //console.log(' my reviewsssssssssssssssss:', myAllDataTestimonials)

  const renderScene = SceneMap({
    service: () => <ServiceTabComponent slug={Slug} description={description} />,
    portfolio: SecondRoute,
    reviews: () => <ReviewTabComponent />, //ThirdRoute,
  });

  const [routes] = useState([
    {key: 'service', title: 'Service'},
    {key: 'portfolio', title: 'Portfolio'},
    {key: 'reviews', title: 'Reviews'},
  ]);



  const renderLabel = ({route, color}) => {
    console.log('Render label for route:', route.title); // ✅ Now this will print

    return (
      <Text
        style={[
          styles.tabLabel,
          { color }, // Tab color is controlled by TabBar itself
        ]}
      >
        {route.title}
      </Text>
    );
  };



  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      renderLabel={renderLabel}
      activeColor={blue}         // Color for selected tab
      inactiveColor={black}      // Color for unselected tabs
    />
  );




  return (
    <View style={styles.safeView}>
      <VenderInfoComponent
        companyName={item.company_name}
        thumb={Thumb}
        cover={Cover}
      />
       <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
        // tabBarOptions={{
        //   tabStyle: {color: black}, // Change 'red' to your desired text color
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeView:{flex: 1, backgroundColor: white},
  scene: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
  },
  tabbar: {
    backgroundColor: white,
  },
  tabLabel: {
    color: black,
    fontSize: responsiveFontSize(2),
  },
  indicator: {
    backgroundColor: blue,
    height: 2,
  },
});

export default DetailsVendor;
