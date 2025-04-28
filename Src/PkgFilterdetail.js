import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  black,
  blue,
  greyBg,
  greyDark,
  white,
  yellow,
  yellowOpacity,
} from './Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import MyHeader from './MyHeader';
import RenderHtml from 'react-native-render-html';
import {SafeAreaView} from 'react-native-safe-area-context';
import {addToCart} from './redux/MyPackageSlice';
import {getHomeOffers} from './Hooks/api/ForyouApi';
import {useNavigation} from '@react-navigation/native';
import {useWindowDimensions} from 'react-native';

const getDataoffers = async () => {
  const result = await getHomeOffers();
  return result;
};

const PkgFilterdetail = ({route}) => {
  const currentPackage = useSelector(state => state.package);
  const dispatch = useDispatch();

  const storepackage = data => {
    if (
      currentPackage?.packagedetails.length === 0 ||
      typeof currentPackage?.packagedetails === 'undefined'
    ) {
      dispatch(addMyPackage(data));
      dispatch(noOfGuests({id: data.item.id, noGuest: 200}));
    } else {
      const existingItem = currentPackage?.packagedetails?.find(
        item => item.item.id === data.item.id,

        // pkage ki id(item.item.id)
        // yeh hmre selected data ki id(data.item.id)
      );

      if (existingItem) {
        //console.log('already existed');
      } else {
        dispatch(addMyPackage(data));
        dispatch(noOfGuests({id: data.item.id, noGuest: 200}));
      }
    }
  };

  const {item} = route.params;
  //console.log('filter pg item', item)
  const {img} = route.params;
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [view, setView] = useState('first');
  const [view3, setView3] = useState('third');
  const [view5, setView5] = useState('five');
  const [myAllDataoffers, setmyAllDataoffers] = useState([]);
  const source = {
    html: `${item.item.package_detail}`,
  };

  const ImageaddToCart = () => {
    dispatch(myImg({img})); // Dispatch the action

    storepackage({item});
  };
  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };
  // __________________Questions___________________________________
  const myView1 = () => {
    if (view5 === 'five') {
      return (
        <View style={styles.questionBox2}>
          <View style={styles.innerquestionBox}>
            <Text style={styles.questionHeadingTxt}>
              frequently ask questions
            </Text>

            <Pressable
              style={{marginLeft: 50, paddingHorizontal: 15}}
              onPress={() => setView5('six')}>
              <FontAwsome name="angle-down" color={'black'} size={20} />
            </Pressable>
          </View>
          <Text style={styles.questionTxt}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters.
          </Text>
        </View>
      );
    } else if (view5 === 'six') {
      return (
        <View style={styles.questionBox1}>
          <Text style={styles.questionHeadingTxt}>
            frequently ask questions
          </Text>
          <Pressable
            style={{marginLeft: 50, paddingHorizontal: 15}}
            onPress={() => setView5('five')}>
            <FontAwsome name="angle-up" color={'black'} size={20} />
          </Pressable>
        </View>
      );
    }
  };

  const myView2 = () => {
    if (view3 === 'third') {
      return (
        <View style={styles.questionBox1}>
          <Text style={styles.questionHeadingTxt}>
            frequently ask questions
          </Text>
          <Pressable
            style={{marginLeft: 50, paddingHorizontal: 15}}
            onPress={() => setView3('fourth')}>
            <FontAwsome name="angle-up" color={'black'} size={20} />
          </Pressable>
        </View>
      );
    } else if (view3 === 'fourth') {
      return (
        <View style={styles.questionBox2}>
          <View style={styles.innerquestionBox}>
            <Text style={styles.questionHeadingTxt}>
              frequently ask questions
            </Text>

            <Pressable
              style={{marginLeft: 50, paddingHorizontal: 15}}
              onPress={() => setView3('third')}>
              <FontAwsome name="angle-down" color={'black'} size={20} />
            </Pressable>
          </View>
          <Text style={styles.questionTxt}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters.
          </Text>
        </View>
      );
    }
  };

  const myView3 = () => {
    {
      if (view === 'first') {
        return (
          <View style={styles.questionBox1}>
            <Text style={styles.questionHeadingTxt}>
              frequently ask questions
            </Text>

            <Pressable
              style={{marginLeft: 50, paddingHorizontal: 15}}
              onPress={() => setView('second')}>
              <FontAwsome name="angle-up" color={'black'} size={20} />
            </Pressable>
          </View>
        );
      } else if (view === 'second') {
        return (
          <View style={styles.questionBox2}>
            <View style={styles.innerquestionBox}>
              <Text style={styles.questionHeadingTxt}>
                frequently ask questions
              </Text>
              <Pressable
                style={{marginLeft: 50, paddingHorizontal: 15}}
                onPress={() => setView('first')}>
                <FontAwsome name="angle-down" color={'black'} size={20} />
              </Pressable>
            </View>
            <Text style={styles.questionTxt}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters.
            </Text>
          </View>
        );
      }
    }
  };
  useEffect(() => {
    getDataoffers().then(result => {
      // //console.log("homeApi offer useEffect", result);
      setmyAllDataoffers(result?.data); // Set myAllDataService after data is fetched
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          width: responsiveWidth(100),
          paddingHorizontal: responsiveWidth(1),
          backgroundColor: white,
        }}>
        <View>
          <MyHeader />

          <View style={[styles.pakageName]}>
            <View style={{width: responsiveWidth(100)}}>
              <Image
                source={{uri: `${img}/${item.item.image}`}}
                style={{
                  width: responsiveWidth(95),
                  height: responsiveHeight(30),
                  marginTop: responsiveHeight(1.5),
                  marginHorizontal: responsiveWidth(1),
                  borderRadius: 10,
                }}
              />
            </View>
          </View>

          <View style={[styles.packgIntro]}>
            <View style={[{flexDirection: 'column'}]}>
              <Text
                style={[styles.PkgText, {fontSize: responsiveFontSize(2.6)}]}>
                {item.item.package_name}
              </Text>

              <View style={[{flexDirection: 'row'}]}>
                <Text
                  style={[
                    {
                      color: black,
                      fontSize: responsiveFontSize(1.8),
                      fontWeight: 'bold',
                    },
                  ]}>
                  Package Price :{' '}
                  <Text style={{fontWeight: 'normal'}}>
                    {item.item.price} / per head
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={[
                {
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'row',
                  marginTop: responsiveHeight(1),
                },
              ]}>
              <AntDesign
                name="star"
                style={{
                  marginRight: responsiveWidth(1),
                  marginTop: responsiveHeight(0.4),
                }}
                color="gold"
                size={12}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: black,
                  marginRight: responsiveWidth(1),
                  fontSize: responsiveFontSize(1.8),
                }}>
                4.8
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.6),
                  marginTop: responsiveHeight(0.2),
                }}>
                (200)
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: black,
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2.3),
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(5),
            }}>
            Included Services{' '}
          </Text>
        </View>

        <View
          style={[
            {paddingLeft: responsiveHeight(3), width: responsiveWidth(100)},
          ]}>
          <RenderHtml contentWidth={width} source={source} />
        </View>
        <View>
          <View style={[styles.orderNow]}>
            <Pressable
              // onPress={() => {
              //   handleAddToCart();

              //   navigation.navigate('AddToCart');
              // }}
              style={[styles.orderNowBtn]}>
              <Text style={[{color: black, fontSize: responsiveFontSize(1.5)}]}>
                Order Now
              </Text>
            </Pressable>
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: blue,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(1.9),
                paddingLeft: responsiveWidth(3),
              }}>
              Recomended Package{' '}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: responsiveWidth(2),
              width: responsiveWidth(92),
            }}>
            <FlatList
              data={myAllDataoffers}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({item}) => {
                // //console.log("my offers: " ,item)
                const imgS = `https://www.caterstation.pro/public/vendor/package/${item.image}`;

                return (
                  <>
                    <View>
                      <Image
                        style={{
                          height: responsiveHeight(12),
                          width: responsiveWidth(35),
                          borderRadius: 10,
                          marginHorizontal: responsiveWidth(1),
                          marginTop: responsiveHeight(1),
                        }}
                        source={{uri: imgS}}
                      />
                    </View>
                  </>
                );
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                marginVertical: responsiveHeight(2),
                width: responsiveWidth(93),
              }}>
              <View>{myView1()}</View>
              <View>{myView2()}</View>
              <View>{myView3()}</View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: blue,
    position: 'relative',
  },
  pakageName: {
    flexDirection: 'row',
  },
  body: {
    // flex: 1,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  PkgNameText: {
    color: blue,
    fontSize: 18,
    fontWeight: '800',
  },

  Checkcontainer: {
    // flex: 1,
    paddingHorizontal: responsiveWidth(2),
  },
  checkboxContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 5,
    flexDirection: 'row',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
    //  marginTop: 5,
    textAlign: 'center',
  },
  foodBox: {
    // backgroundColor:"green",
    height: 70,
    width: '47%',
    //  paddingVertical:10,
    //  paddingHorizontal:5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    shadowColor: yellow,
    // shadowColor: '#BEBEBE',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // Elevate the view to create a shadow effect
    elevation: 4,
  },
  orderNow: {
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(2),
    // marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderNowBtn: {
    backgroundColor: greyBg,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 15,
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 20,
    width: responsiveWidth(40),
    borderColor: blue,
    borderWidth: 1,
  },
  packgIntro: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  PkgText: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recomndPkg: {
    width: responsiveWidth(30),

    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(1),
  },

  // _____Questions styling_______________

  questionBox1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(2),
    backgroundColor: '#BEBEBE',
  },
  innerquestionBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(2),
    backgroundColor: '#BEBEBE',
  },
  questionBox2: {
    flexDirection: 'column',
    marginVertical: responsiveHeight(2),
    backgroundColor: 'white',
  },
  questionTxt: {
    color: 'black',
    paddingHorizontal: responsiveWidth(2),
    marginTop: 10,
  },
  questionHeadingTxt: {
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
});

export default PkgFilterdetail;
