import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {black, blue, greyBg, greyDark} from './Colors';
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

const getDataTestimonials = async () => {
  const result = await getHomeTestimonials();
  return result;
};

const ForYouDetailVendor = ({route}) => {
  const [index, setIndex] = useState(0);
  const [myAllDataVendor, setmyAllDataVendor] = useState();
  const [myPortfolio, setmyPortfolio] = useState();
  const {width} = useWindowDimensions();

  const {item, Thumb, Cover} = route.params;

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
      //console.log('review results: ', result);

      setmyAllDataTestimonials(result?.data); // Set myAllDataService after data is fetched

      // //console.log('review results: ', result)
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
          ListHeaderComponent={
            <Text
              numberOfLines={3}
              style={{
                color: black,
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: responsiveHeight(2),
                fontSize: responsiveFontSize(2.5),
              }}>
              Quick Services
            </Text>
          }
          ListFooterComponent={
            <View>
              <Text
                numberOfLines={3}
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                  color: black,
                  marginBottom: responsiveHeight(2),
                }}>
                Description
              </Text>

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
              Catering: require('../Images/mycater.png'),
              DECOR: require('../Images/mydecore.png'),
              Food: require('../Images/myfood.png'),
              Photography: require('../Images/myphoto.png'),
              'Wedding Venues': require('../Images/mywedvenue.png'),
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
                  <Image resizeMode="contain" source={iconSource} />

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

  const SecondRoute = () => {
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
        <FlatList
          data={myPortfolio}
          numColumns={3}
          renderItem={item => {
            const img = `https://www.caterstation.pro/public/vendor/portfolio/${item.item.image}`;
            return (
              <View
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
              </View>
            );
          }}
        />
      </View>
    );
  };

  // //console.log(' my reviewsssssssssssssssss:', myAllDataTestimonials)

  const ThirdRoute = () => {
    return (
      <View style={[styles.scene, {backgroundColor: '#ffff'}]}>
        <View style={{paddingBottom: responsiveHeight(2)}}>
          <FlatList
            data={myAllDataTestimonials}
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

  //console.log('my vendor data is working ', myAllDataVendor);

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
              source={{uri: `${Thumb}`}}
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
            source={{uri: `${Cover}`}}
          />

          {/* <Text style={{ marginTop: responsiveHeight(1), letterSpacing: 1, fontSize: responsiveFontSize(1.8) }}>{item.item.company_name}</Text> */}
          <View
            style={{
              marginHorizontal: responsiveWidth(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
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
  },
  tabbar: {
    backgroundColor: '#ffffff',
    color: black,
  },
  tabLabel: {
    // color: '#000000',
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

export default ForYouDetailVendor;
