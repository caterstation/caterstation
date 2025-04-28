import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {black, blue, greyBg, greyDark, white} from './Colors';
import Entypo from 'react-native-vector-icons/Entypo';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import MyHeader from './MyHeader';
import {getVendorsDetail} from './Hooks/api/vendorApi';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {getHomeTestimonials} from './Hooks/api/ForyouApi';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import Heading from './Heading';

const getDataTestimonials = async () => {
  const result = await getHomeTestimonials();
  return result;
};

const ServiceVendorDetail = ({route}) => {
  const [index, setIndex] = useState(0);
  const [myAllDataVendor, setmyAllDataVendor] = useState();
  const [myPortfolio, setmyPortfolio] = useState();
  const {width} = useWindowDimensions();

  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);

  const {item, Thumb, Cover} = route.params; // Assuming Thumb and Cover are serializable

  const Slug = item.slug;
  const description = item.desc;
  const source = {
    html: `${description}`,
  };

  const modifyHtmlDescription = htmlContent => {
    // Use regular expression to add color style to <span> elements
    const modifiedHtml = htmlContent
      .replace(/<p[^>]*>(.*?)<\/p>/g, '<p style="color: black;">$1</p>')
      .replace(/<li[^>]*>(.*?)<\/li>/g, '<li style="color: black;">$1</li>');

    //console.log('Modified HTMLlllll:', modifiedHtml); // Log the modified HTML
    return modifiedHtml;
  };

  //console.log('====================================');
  //console.log('my decrip data ', description);
  //console.log('====================================');
  const modifiedHtmldescription = modifyHtmlDescription(description);

  const getmyVendorsDetail = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(
          `https://www.caterstation.pro/api/vendor-detail/${Slug}`,
        );
        resolve(result?.data.vendor_services || {});
      } catch (error) {
        //console.log('error in api fetching: ', error);
        reject(error);
      }
    });
  };

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

  const [myAllDataTestimonials, setmyAllDataTestimonials] = useState();

  useEffect(() => {
    getDataTestimonials().then(result => {
      setmyAllDataTestimonials(result?.data); // Set myAllDataService after data is fetched

      //console.log('review results: ', result);
    });

    getmyPortfolio().then(result => {
      setmyPortfolio(result);
      // //console.log('my Portfolio : ', result)
    });
    // //console.log('myAllDataTestimonials results: ', myAllDataTestimonials)

    getmyVendorsDetail().then(result => {
      setmyAllDataVendor(result);

      //console.log('my vendor result  data  : ', result);
    });
  }, []);

  const FirstRoute = ({slug}) => {
    return (
      <View style={[{flex: 1, backgroundColor: '#ffffff'}]}>
        <FlatList
          data={myAllDataVendor}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                marginTop: responsiveHeight(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Heading style={{color: black}}>Quick Services</Heading>
              {/* <Text numberOfLines={3} style={{ color:black,textAlign: "center", fontWeight: "bold", marginTop: responsiveHeight(2), fontSize: responsiveFontSize(2.5), }}>Quick Services</Text> */}
            </View>
          }
          ListFooterComponent={
            <View
              style={{
                marginTop: responsiveHeight(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Heading
                style={{color: black, marginBottom: responsiveHeight(1)}}>
                Description
              </Heading>

              <View
                style={[
                  {
                    width: responsiveWidth(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <View style={[{width: responsiveWidth(80)}]}>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: modifiedHtmldescription}}
                  />
                </View>
              </View>
            </View>
          }
          numColumns={3}
          renderItem={item => {
            // //console.log('Flatlis item', item)
            const img = `https://www.caterstation.pro/public/vendor/service/${item.item.icon}`;
            const customIcons = {
              Catering: require('../Images/ic.png'),
              DECOR: require('../Images/id.png'),
              Food: require('../Images/if.png'),
              Photography: require('../Images/ip.png'),
              'Wedding Venues': require('../Images/iv.png'),
            };
            const service = item.item.service_name;
            const iconSource = customIcons[service] || img; // Use custom icon if available, otherwise use API icon

            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: responsiveHeight(15),
                  width: responsiveWidth(33.3),
                  marginVertical: responsiveHeight(3),
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: responsiveWidth(30),
                    paddingBottom: responsiveHeight(1),
                  }}>
                  <Image
                    style={{
                      width: responsiveWidth(10),
                      height: responsiveHeight(5),
                    }}
                    resizeMode="contain"
                    source={iconSource}
                  />
                  <Text
                    style={{marginTop: responsiveHeight(1.5), color: black}}>
                    {item.item.service_name}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  //   const ImageCarousel = ({ selectedImage, imageList, onClosePress }) => {
  //     const [currentIndex, setCurrentIndex] = useState(0);
  //     const [isModalOpened, setIsModalOpened] = useState(true);

  //     const handleClosePress = () => {
  //       onClosePress();
  //     };

  //     const renderItem = ({ item, index }) => {
  //       //console.log('====================================');
  //       //console.log("portfolio iteeeeemmmmmm: ", item);
  //       //console.log('====================================');
  //       const img = `https://www.caterstation.pro/public/vendor/portfolio/${item.image}`;
  //       if (isModalOpened && index === currentIndex) {
  //         return (
  //           <View style={{
  //             flex: 1,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             flexDirection: "row",
  //           }}>
  //             <View style={{
  //               // backgroundColor:"red",
  //               // Add a container for the image card
  //               width: responsiveWidth(90),
  //               height: responsiveHeight(50),
  //               borderRadius: 16, // Add a border radius
  //               overflow: 'hidden', // Ensure the image is clipped within the container
  //             }}>
  //               <Image
  //                 style={{
  //                   flex: 1, // Make the image take up the full container
  //                   // resizeMode: 'contain',
  //                   width: responsiveWidth(100),
  //                   height: responsiveHeight(40),
  //                   marginBottom: 8, // Add some margin between the image and the text container
  //                 }}
  //                 source={{ uri: selectedImage }}
  //               />
  //  <View style={{
  //               width: responsiveWidth(90),
  //               height: responsiveHeight(20),
  //               backgroundColor: 'white',
  //               paddingHorizontal:responsiveWidth(2),
  //               paddingVertical:responsiveHeight(2)

  //               // justifyContent: "space-between",
  //               // alignItems: 'center',
  //               // Add some margin between the text container and the image
  //             }}>
  //                <View style={{
  //               width: responsiveWidth(85.5),
  //               // height: responsiveHeight(20),
  //               justifyContent: "space-between",
  //               // alignItems: 'center',
  //               // Add some margin between the text container and the image
  //               flexDirection:"row",

  //             }}>
  //               <Text style={{ color: 'black', fontWeight: 'bold',fontSize: responsiveFontSize(2),}}>{item.title}</Text>
  //               <Text style={{ color: 'black', fontWeight: 'bold',fontSize: responsiveFontSize(2),}}>Pkr {item.price}</Text>

  //             </View>
  //                <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5),marginTop:responsiveHeight(2), textAlign:"justify"}}>{item.summary}</Text>

  //         <View style={{justifyContent:"flex-end", alignItems:"center", flex:1}}>
  //         <TouchableOpacity
  //                 onPress={

  //                   ()=>{
  //                     //console.log("iteeeeem pppiddddd: ",item.id)
  //                     //console.log("iteeeeem vvvviddddd: ",item.vendor_id)
  //                   handleOrderNowPress()

  //                   }
  //                 }
  //                 style={{ justifyContent: "center", alignItems: "center", width: responsiveWidth(30), backgroundColor: blue, height: responsiveHeight(4), borderRadius: 4 }}>
  //                 <Text style={{ color: 'white' }}>Order Now</Text>
  //               </TouchableOpacity>
  //         </View>

  //             </View>

  //             </View>

  //           </View>
  //         );
  //       }

  //       else {
  //         return (
  //           <View style={{
  //             flex: 1,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             flexDirection: "row",
  //           }}>
  //             <View style={{
  //               // backgroundColor:"red",
  //               // Add a container for the image card
  //               width: responsiveWidth(90),
  //               height: responsiveHeight(50),
  //               borderRadius: 16, // Add a border radius
  //               overflow: 'hidden', // Ensure the image is clipped within the container
  //             }}>
  //               <Image
  //                 style={{
  //                   flex: 1, // Make the image take up the full container
  //                   // resizeMode: 'contain',
  //                   width: responsiveWidth(100),
  //                   height: responsiveHeight(40),
  //                   marginBottom: 8, // Add some margin between the image and the text container
  //                 }}
  //                 source={{ uri: img }}
  //               />
  //  <View style={{
  //               width: responsiveWidth(90),
  //               height: responsiveHeight(20),
  //               backgroundColor: 'white',
  //               paddingHorizontal:responsiveWidth(2),
  //               paddingVertical:responsiveHeight(2)

  //               // justifyContent: "space-between",
  //               // alignItems: 'center',
  //               // Add some margin between the text container and the image
  //             }}>
  //                <View style={{
  //               width: responsiveWidth(85.5),
  //               // height: responsiveHeight(20),
  //               justifyContent: "space-between",
  //               // alignItems: 'center',
  //               // Add some margin between the text container and the image
  //               flexDirection:"row",

  //             }}>
  //               <Text style={{ color: 'black', fontWeight: 'bold',fontSize: responsiveFontSize(2),}}>{item.title}</Text>
  //               <Text style={{ color: 'black', fontWeight: 'bold',fontSize: responsiveFontSize(2),}}>Pkr {item.price}</Text>

  //             </View>
  //                <Text style={{ color: 'black', fontSize: responsiveFontSize(1.5),marginTop:responsiveHeight(2), textAlign:"justify"}}>Pkr {item.summary}</Text>

  //         <View style={{justifyContent:"flex-end", alignItems:"center", flex:1}}>
  //           <TouchableOpacity style={{justifyContent:"center", alignItems:"center", width: responsiveWidth(30),backgroundColor:blue,
  //               height: responsiveHeight(4), borderRadius:4}}>
  //             <Text style={{color:white}}>Order Now</Text>
  //           </TouchableOpacity>
  //         </View>

  //             </View>

  //             </View>

  //           </View>
  //         );
  //       }
  //     };

  //     const handleSnapToItem = (index) => {
  //       setCurrentIndex(index);
  //       setIsModalOpened(false); // Set to false after initial snap
  //     };

  //     return (
  //       <Modal visible={true} animationType="fade" transparent={true}>
  //         <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
  //           <Carousel
  //             data={imageList}
  //             renderItem={renderItem}
  //             sliderWidth={responsiveWidth(100)}
  //             itemWidth={responsiveWidth(90)}
  //             onSnapToItem={handleSnapToItem}
  //           />
  //           {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: responsiveHeight(2) }}>
  //             {imageList.map((image, index) => (
  //               <TouchableOpacity
  //                 key={index}
  //                 onPress={() => {}}
  //                 style={{
  //                   height: responsiveHeight(2),
  //                   width: responsiveHeight(2),
  //                   borderRadius: responsiveHeight(1),
  //                   backgroundColor: currentIndex === index ? 'white' : 'grey',
  //                   marginHorizontal: responsiveWidth(1),
  //                 }}
  //               />
  //             ))}
  //           </View> */}

  //           <TouchableOpacity
  //             style={{
  //               position: 'absolute',
  //               top: responsiveHeight(2),
  //               right: responsiveWidth(2),
  //               backgroundColor: 'white',
  //               padding: responsiveWidth(1),
  //               borderRadius: responsiveWidth(1),
  //             }}
  //             onPress={handleClosePress}
  //           >
  //             <Text style={{ color: 'black', fontSize: responsiveFontSize(2) }}>Close</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </Modal>
  //     );
  //   };
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

        {/* <View style={{flex:1,width:responsiveWidth(100), justifyContent:"center", alignItems:'center', }}>
        <Text style={{color:black, fontSize:responsiveFontSize(2), fontWeight: 'bold', textAlign:'center', marginVertical:responsiveHeight(1), backgroundColor:"red"}}>Order Portfolio</Text>
        </View> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={myPortfolio}
          numColumns={3}
          renderItem={item => {
            // //console.log('====================================');
            ////console.log("portfolio info : ",item);
            // //console.log("portfolio id : ",item.item.id);
            // //console.log("vendor_id : ",item.item.vendor_id);
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

  // const SecondRoute = () => {
  //   const [selectedImage, setSelectedImage] = useState(null);

  //   const handleImagePress = (img, imageList) => {
  //     setSelectedImage(img);
  //   };

  //   const handleClosePress = () => {
  //     setSelectedImage(null);
  //   };

  //   return (
  //     <View style={[styles.scene, { paddingHorizontal: responsiveWidth(2), backgroundColor: '#ffffff', width: responsiveWidth(100), }]}>
  //       <FlatList
  //         data={myPortfolio}
  //         showsVerticalScrollIndicator={false}
  //         showsHorizontalScrollIndicator={false}
  //         numColumns={3}
  //         renderItem={(item) => {
  //           const myImg = item.item.image;
  //           //console.log('====================================');
  //           //console.log("service item",item);
  //           //console.log('====================================');
  //           const img = `https://www.caterstation.pro/public/vendor/portfolio/${myImg}`;
  //           return (
  //             <TouchableOpacity
  //               // onPress={() => handleImagePress(img, myPortfolio)}
  //               style={{
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 width: responsiveWidth(30),
  //                 marginHorizontal: responsiveWidth(0.5),
  //                 marginVertical: responsiveHeight(1),
  //               }}
  //             >
  //               <Image style={{ height: responsiveHeight(20), width: responsiveWidth(30) }} source={{ uri: img }} />
  //             </TouchableOpacity>
  //           );
  //         }}
  //       />
  //       <Modal
  //         animationType="slide"
  //         transparent={true}
  //         visible={selectedImage !== null}
  //         onRequestClose={handleClosePress}
  //       >
  //         <ImageCarousel
  //           selectedImage={selectedImage}
  //           imageList={myPortfolio}
  //           onClosePress={handleClosePress}
  //         />
  //       </Modal>
  //     </View>
  //   );
  // };

  // //console.log(' my reviewsssssssssssssssss:', myAllDataTestimonials)

  const ThirdRoute = () => {
    return (
      <View style={[styles.scene, {backgroundColor: '#ffff'}]}>
        <View style={{paddingBottom: responsiveHeight(2)}}>
          <FlatList
            data={myAllDataTestimonials}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // showsHorizontalScrollIndicator={false}
            // horizontal={true}
            // keyExtractor={item => item.id}
            renderItem={({item}) => {
              //console.log('item testimonials uiehw jh coijniqjnc j ', item);
              const img = `https://caterstation.pro/public/testimonial/decor/${item.decor_image}`;

              return (
                <>
                  <View
                    style={{
                      marginTop: responsiveHeight(2),
                      width: responsiveWidth(100),
                      backgroundColor: '#F0F0F0',
                      paddingVertical: responsiveHeight(1),
                      flexDirection: 'row',
                      paddingRight: responsiveHeight(3),
                    }}>
                    <View
                      style={{
                        width: responsiveWidth(18),
                        paddingHorizontal: responsiveWidth(1),
                      }}>
                      <Image
                        style={{
                          borderRadius: 30,
                          height: responsiveHeight(7),
                          width: responsiveWidth(13),
                        }}
                        source={{uri: img}}
                      />
                    </View>
                    <View style={{width: responsiveWidth(82)}}>
                      <Text style={{color: black, fontWeight: 'bold'}}>
                        {item.person_name}
                      </Text>
                      {/* <Text>Star Ratings</Text> */}
                      <Text
                        numberOfLines={3}
                        style={{
                          fontSize: responsiveFontSize(1.9),
                          color: black,
                        }}>
                        {item.testimonial}
                      </Text>
                    </View>
                  </View>
                </>
              );
            }}
          />
        </View>
      </View>
    );
  };

  const renderScene = SceneMap({
    service: FirstRoute,
    portfolio: SecondRoute,
    reviews: ThirdRoute,
  });

  const [routes] = useState([
    {key: 'service', title: 'Service'},
    {key: 'portfolio', title: 'Portfolio'},
    {key: 'reviews', title: 'Reviews'},
  ]);

  const renderLabel = ({route}) => (
    <Text style={styles.tabLabel}>{route.title}</Text>
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      renderLabel={renderLabel}
    />
  );

  // //console.log('my vendor data is working ', myAllDataVendor)

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <MyHeader />
      {/* <Text>{item}</Text> */}
      <View style={{height: responsiveHeight(35), width: responsiveWidth(100)}}>
        <View style={{position: 'relative'}}>
          <View>
            <Image
              style={{
                height: responsiveHeight(22),
                width: responsiveWidth(100),
              }}
              source={{uri: `${Cover}`}}
            />
          </View>
        </View>
        <View
          style={{
            top: responsiveHeight(15),
            position: 'absolute',
            borderColor: greyBg,
            borderBottomWidth: 1,
            borderBottomColor: greyBg,
            width: responsiveWidth(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: responsiveHeight(11),
              width: responsiveWidth(25),
              borderRadius: Math.min(responsiveHeight(20), responsiveWidth(20)),
            }}
            source={{uri: `${Thumb}`}}
          />

          <View
            style={{
              marginHorizontal: responsiveWidth(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: black,
                marginTop: responsiveHeight(1),
                letterSpacing: 1,
                fontSize: responsiveFontSize(1.8),
              }}>
              {item.company_name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: responsiveHeight(2),
                }}>
                <Entypo name="location-pin" color={black} size={14} />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: responsiveHeight(1.2),
                  marginHorizontal: responsiveWidth(2),
                }}>
                <Text
                  style={{
                    color: black,
                    letterSpacing: 1.5,
                    fontSize: responsiveFontSize(1.8),
                    textAlign: 'center',
                  }}>
                  {item.address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: '100%'}}
        renderTabBar={renderTabBar}
        tabBarOptions={{
          tabStyle: {color: black}, // Change 'red' to your desired text color
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
  },
  tabbar: {
    backgroundColor: '#ffffff',
  },
  tabLabel: {
    color: black,
    fontSize: responsiveFontSize(1.8),
    //  backgroundColor:"red"
    // marginTop:20
  },
  indicator: {
    backgroundColor: '#ffffff',
    height: 2,
  },
});

export default ServiceVendorDetail;
