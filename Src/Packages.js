import {
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {black, blue, greyBg, lightgrey, yellow} from './Colors';
import {getEventType, getLocation, getPackage} from './Hooks/api/packagesApi';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import MyHeader from './MyHeader';
import {getAllEvents} from './Hooks/api/AllEventsApi';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const getAllPackages = async () => {
  // Implement your data fetching logic here
  // (e.g., fetch from an API or database)
  const result = await getPackage();
  // console.log('package', result)

  return result;
};
const getmyAllEvents = async () => {
  // Implement your data fetching logic here
  // (e.g., fetch from an API or database)
  const result = await getEventType();
  console.log('events types package', result);
  return result;
};
const getmyLocation = async () => {
  // Implement your data fetching logic here
  // (e.g., fetch from an API or database)
  const result = await getLocation();
  // console.log('events types', result);
  return result;
};

const Packages = () => {

  const [loading, setLoading] = useState(false); // Loading state

  const [view, setView] = useState('first');
  const [myAllDataPackage, setmyAllDataPackage] = useState([]); // Initialize with empty array
  const [myAllEvent, setmyAllEvents] = useState(); // Initialize with empty array
  const [myAllLocation, setmyAllLocation] = useState(); // Initialize with empty array
  const [selectedType, setSelectedType] = useState('');

  
  const filteredAndMappedData =
  // item.event_type === selectedType ||

  
 selectedType === ''
      ? myAllDataPackage

      : myAllDataPackage.filter((item )=> item.event_type === selectedType || item.location === selectedType
         
      
      
     );
    // selectedType === ''
    //   ? myAllDataPackage
    //   : myAllDataPackage.filter(item => item.locations === selectedType);
    
    
    

  useEffect(() => {
    setLoading(true); // Start loading
    getAllPackages().then(result => {
      console.log('useEffect package', result);

      setmyAllDataPackage(result);
      setLoading(false); 
    });
    // getmyAllEvents();

    getmyAllEvents().then(result => {
      // const dataEvent=JSON.stringify(result)
      // const events = result?.data?.events;
      setmyAllEvents(result);
      // console.log('All events here', result); // Log fetched data
    });
    getmyLocation().then(result => {
      // const dataEvent=JSON.stringify(result)
      // const events = result?.data?.events;
      setmyAllLocation(result);
      // console.log('All setmyAllLocation here', result); // Log fetched data
    });
  }, []);
  // console.log('my all package', myAllDataPackage);

  const myView3 = () => {
    {
      if (view === 'first') {
        return (
          <View
            style={[
              styles.buttonfiltershadowcard,
              {
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: responsiveHeight(1.5),
                marginBottom: responsiveHeight(1.7),
              },
            ]}>
            <Pressable
              onPress={() =>
                // setPressFilter(true)
                setView('second')
              }
              style={[
                {
                  width: responsiveWidth(90),
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text style={{color:black}}>Filter</Text>
              <Image
                style={{
                  marginTop: responsiveHeight(1),
                  marginLeft: responsiveWidth(2),
                }}
                source={require('../Images/Filter.png')}
              />
            </Pressable>
          </View>
        );
      } else if (view === 'second') {
        return (
          <View>
            <View style={[styles.ModalBox]}>
              {/* ____________________ select vendor checkbox___________________________ */}

              <View style={[styles.Checkcontainer]}>
                <Text
                  style={{
                    color: blue,
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2),
                    marginBottom: responsiveHeight(1),
                  }}>
                  Select Events{' '}
                </Text>

                <View
                  style={{
                    height: responsiveHeight(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FlatList
                    data={myAllEvent}
                    
                    showsVerticalScrollIndicator={true}
                    numColumns={2} // you can set the number of columns here
                    renderItem={({item}) => {
                      // console.log('event item flatlist ', item);
                      return (
                        <Pressable
                          onPress={() => {
                            // navigation.navigate('EventTypeFilter', {item});
                            setSelectedType(item);
                            setLoading(true); // Start loading
                            setTimeout(() => {
                              setView('first');
                              setLoading(false); // Stop loading after filtering
                            }, 500); // Simulate loading duration
                          }}
                         
                          style={{
                            width: responsiveWidth(45),
                            paddingVertical: responsiveHeight(0.5),
                          }}>
                          <Text style={{fontWeight: 'bold', color:black}}> {item} </Text>
                        </Pressable>
                      );
                    }}
                  />
                </View>
              </View>

              {/* ____________________ select price range checkbox___________________________ */}

              <View style={[styles.Checkcontainer]}>
                <Text
                  style={{
                    color: blue,
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2),
                    marginBottom: responsiveHeight(1),
                  }}>
                  Select Location
                </Text>

                <View style={{height: responsiveHeight(15), paddingLeft:responsiveWidth(1)}}>
                <FlatList
                    data={myAllLocation}
                    showsVerticalScrollIndicator={true}
                    numColumns={2} // you can set the number of columns here
                    renderItem={({item}) => {
                      // console.log('event item flatlist ', item);
                      return (
                        <Pressable
                        onPress={() => {
                          setSelectedType(item);
                          setLoading(true); // Start loading
                          setTimeout(() => {
                            setView('first');
                            setLoading(false); // Stop loading after filtering
                          }, 500); // Simulate loading duration
                        }}
                          style={{
                            width: responsiveWidth(45),
                            paddingVertical: responsiveHeight(0.5),
                          }}>

                          <Text style={{fontWeight: 'bold', color:black}}> {item} </Text>
                        </Pressable>
                      );
                    }}
                  />


                </View>
              </View>

              {/* bottom buttons */}

              <View style={[styles.bottomRow]}>
                <View style={{flexDirection: 'row', width:responsiveWidth(90), justifyContent:"space-around"}}>
                  <Pressable
                    onPress={() =>
                      // setPressFilter(false)
                      setView('first')
                    }
                    style={[styles.bottomBtn]}>
                    <Text
                      style={[
                        {
                          color: 'white',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: 'bold',
                          paddingTop: responsiveHeight(0.2),
                          textAlign: 'center',
                        },
                      ]}>
                      Close
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedType('');

                      setView('first');
                    }}
                    style={[styles.bottomBtn]}>
                    <Text
                      style={[
                        {
                          color: 'white',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: 'bold',
                          paddingTop: responsiveHeight(0.2),
                          textAlign: 'center',
                        },
                      ]}>
                      Clear
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        );
      }
    }
  };

  // ___________checkbox_____________________________

  const [checkedItems, setCheckedItems] = useState([]);

  const dynamicData = [
    {id: 1, name: 'Option 1'},
    {id: 2, name: 'Option 2'},
    {id: 4, name: 'Option 4'},
    {id: 5, name: 'Option 5'},
    {id: 6, name: 'Option 6'},
    {id: 7, name: 'Option 7'},
    {id: 8, name: 'Option 8'},
    {id: 9, name: 'Option 9'},
    {id: 10, name: 'Option 10'},
    {id: 11, name: 'Option 11'},
    {id: 12, name: 'Option 12'},
    {id: 13, name: 'Option 13'},
    {id: 14, name: 'Option 14'},
    {id: 15, name: 'Option 15'},

    // ... add more data here
  ];

  const renderCheckbox = ({item}) => {
    const isChecked = checkedItems.some(
      checkedItem => checkedItem.id === item.id,
    );

    return (
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          if (isChecked) {
            setCheckedItems(
              checkedItems.filter(checkedItem => checkedItem.id !== item.id),
            );
          } else {
            setCheckedItems([...checkedItems, item]);
          }
        }}>
        <View style={[styles.checkbox]}>
          {isChecked ? (
            <Text
              style={{
                color: yellow,
                fontSize: responsiveFontSize(5),
                backgroundColor: yellow,
              }}>
              x
            </Text>
          ) : null}
        </View>
        <Text style={styles.checkboxLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // __________end _checkbox____________________

  // ___________Select price range____________________
  const [checkedPrices, setcheckedPrices] = useState([]);

  const dynamicPriceData = [
    {id: 1, name: '50,000 - 100,000'},
    {id: 2, name: '100,000 - 500,000'},
    {id: 3, name: '500,000 - 1,000,000'},

    // ... add more data here
  ];

  const renderPriceCheckbox = ({item}) => {
    const isChecked = checkedPrices.some(
      checkedPrice => checkedPrice.id === item.id,
    );

    return (
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          if (isChecked) {
            setcheckedPrices(
              checkedPrices.filter(checkedPrice => checkedPrice.id !== item.id),
            );
          } else {
            setcheckedPrices([...checkedPrices, item]);
          }
        }}>
        <View style={[styles.checkbox]}>
          {isChecked ? (
            <Text
              style={{
                color: yellow,
                fontSize: responsiveFontSize(5),
                backgroundColor: yellow,
              }}>
              x
            </Text>
          ) : null}
        </View>
        <Text style={styles.checkboxLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // __________end _Select price range____________________

  const [selected, setSelected] = useState([]);
  // console.log("my selected data : " + selected)

  const [PressFilter, setPressFilter] = useState(false);
  const data = [
    {id: 1, name: 'Alphaaa Name', price: '10k', rating: '4.8', reviews: '200'},
    {id: 2, name: 'Alph Name', price: '10k', rating: '4.8', reviews: '200'},
    {id: 3, name: 'Menu Name', price: '10k', rating: '4.8', reviews: '200'},
    {id: 4, name: 'Menu Name', price: '10k', rating: '4.8', reviews: '200'},
    {id: 5, name: 'Menu Name', price: '10k', rating: '4.8', reviews: '200'},
    {id: 6, name: 'Menu Name', price: '10k', rating: '4.8', reviews: '200'},
    // ... more items
  ];

  const [filter, setFilter] = useState('');

  const filteredData = data.filter(item => item.name.includes(filter));

  const navigation = useNavigation();
  // ______________________________________________________

  const myPackage = useSelector(state => state.package);
  // console.log("added packages",myPackage)

  const dataToSend = {
    name: 'John Doe',
    age: 30,
  };

  const handlePress = number => {
    const url = `https://wa.me/+923257870001`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          alert('WhatsApp not installed or unavailable.'); // Informative message
        }
      })
      .catch(err => console.error('An error occurred:', err));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        marginBottom: responsiveHeight(8),
      }}>
      <MyHeader />
      <View style={{marginTop: responsiveHeight(1.5)}}>{myView3()}</View>

      <View
        style={{
          flex:1,
          width: responsiveWidth(98),
          paddingTop: responsiveHeight(1),
          paddingBottom: responsiveHeight(1),
        }}>

       {loading ? (
  // Conditionally render ActivityIndicator based on loading state
  <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',}}>
    {/* <ActivityIndicator size="large" color={blue} /> */}
    <Text style={ {fontSize: responsiveFontSize(2), color: blue,marginTop: responsiveHeight(1), textAlign: "center", width: responsiveWidth(100)}}>Loading...</Text>
</View>
  // <Text style={{width:responsiveWidth(100), textAlign:"center", fontSize:responsiveFontSize(2),color:blue}}>Loading...</Text>
) : (
  <FlatList
    data={filteredAndMappedData}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => {
      // console.log('item pkg', item)
      const imgS = `https://www.caterstation.pro/public/vendor/package/${item.image}`;

      return (
        <>
          <View
            style={[
              styles.MainContainer,
              styles.shadowcard,
              // {backgroundColor:"red"}
            ]}
          >
            {/* image view */}
            <Pressable style={{width: responsiveWidth(90)}}>
              {/* img */}
              <Image
                source={{uri: imgS}}
                style={{
                  width: '99%',
                  height: responsiveHeight(20),
                  borderRadius: 10,
                }}
              />
            </Pressable>

            <View style={{paddingHorizontal: responsiveWidth(2)}}>
              <View
                style={[
                  styles.Row,
                  styles.JustifyContent_spaceBetween,
                  {marginTop: responsiveHeight(1)},
                ]}
              >
                {/* passing data from button view detail */}
                <Pressable
                // onPress={() => navigation.navigate("PackageDetails")}
                >
                  <Text style={styles.EventHeading}>
                    {item.package_name}
                  </Text>
                </Pressable>

                <View
                  style={[
                    styles.Row,
                    styles.JustifyContent_center,
                    styles.AlignItemsCenter,
                  ]}
                >
                  <AntDesign name="star" color="gold" size={12} />
                  <Text style={styles.EventPRiceHeading}>5</Text>
                  <Text style={styles.EventReviewCountHeading}>
                    (200)
                  </Text>
                </View>
              </View>

              {/* detail body */}
              <View>
                <View>
                  <Text style={[styles.EventPRice]}>
                    PKR {item.price}
                  </Text>
                </View>

                <View
                  style={[
                    styles.Row,
                    styles.JustifyContent_spaceBetween,
                    {marginTop: 5, marginBottom: 10},
                  ]}
                >
                  {/* Wedding Event title */}
                  <View style={{position: 'relative'}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('PackageDetails', {
                          item,
                          img: 'https://www.caterstation.pro/public/vendor/package/',
                          // Myitem:item.price
                        });
                      }}
                      style={styles.btnViewDetail}
                    >
                      <Text
                        style={{
                          color: black,
                          fontSize: responsiveFontSize(1.5),
                        }}
                      >
                        View Detail
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Wedding Event reviews */}
                  <Pressable
                    onPress={() => handlePress()}
                    style={[
                      styles.JustifyContent_center,
                      styles.AlignItemsCenter,
                    ]}
                  >
                    <FontAwsome
                      name="whatsapp"
                      color={'#25D366'}
                      size={25}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* <Text>{item.name}</Text> */}
        </>
      );
    }}
  />
)}

      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    marginHorizontal: responsiveWidth(2.5),
    // borderRadius:50,
    marginBottom: responsiveHeight(2),
    // borderRadius:30,
    width: responsiveWidth(95),
  },
  Row: {
    flexDirection: 'row',
  },
  Column: {
    flexDirection: 'column',
  },
  JustifyContent_spaceBetween: {
    justifyContent: 'space-between',
  },
  JustifyContent_center: {
    justifyContent: 'center',
  },
  AlignItemsCenter: {
    alignItems: 'center',
  },
  EventHeading: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
  EventPRiceHeading: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
    color: 'black',
    marginLeft: responsiveWidth(1),
  },
  EventPRice: {
    // fontWeight:"600",
    fontSize: responsiveFontSize(1.5),
    color: 'grey',
    // marginLeft:5
    marginTop: responsiveHeight(0.5),
  },
  EventReviewCountHeading: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
    color: greyBg,
    marginLeft: responsiveWidth(1),
  },
  btnViewDetail: {
    backgroundColor: lightgrey,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(0.8),
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: responsiveHeight(1),
    flexDirection: 'row',
  },
  shadowcard: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android elevation (for consistent shadow on Android)
    elevation: 5,
    // Additional styles
    backgroundColor: '#fff', // Example background color
    // padding: 20, // Example padding
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
  },

  buttonfiltershadowcard: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android elevation (for consistent shadow on Android)
    elevation: 5,
    // Additional styles
    backgroundColor: '#fff', // Example background color
    // padding: 20, // Example padding
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
  },
  ModalBox: {
    height: responsiveHeight(35),
    marginHorizontal: responsiveWidth(2),
  },

  bottomBtn: {
    backgroundColor: blue,
    paddingHorizontal: responsiveWidth(15),
    paddingBottom: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: responsiveHeight(2),
    paddingTop: responsiveHeight(0.8),
  },

  bottomRow: {
    flexDirection: 'column-reverse',

    alignItems: 'center',
  },

  // ____________________checkbox___________________________
  Checkcontainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
  },
  checkboxContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: responsiveWidth(1),
    flexDirection: 'row',
    marginVertical: responsiveHeight(0.7),
  },
  checkbox: {
    width: responsiveWidth(4.2),
    height: responsiveHeight(2.3),
    borderRadius: 2,
    borderWidth: 2,
    borderColor: yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(2),
    marginTop: responsiveHeight(0.3),
  },
  checked: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
    marginTop: responsiveHeight(0.2),
    textAlign: 'center',
    fontSize: responsiveFontSize(1.5),
  },
});

export default Packages;
