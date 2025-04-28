import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black, greyBg, white, lightgrey, blue} from './Colors';
import {useNavigation} from '@react-navigation/native';
import BackArrow from './BackArrow';

const PackageCheckout = () => {
  const navigation = useNavigation();

  const [randomNumber, setRandomNumber] = useState(0);

  const generateRandomNumber = () => {
    const min = 1; // Define minimum value
    const max = 10000; // Define maximum value

    const randomDecimal = Math.random(); // Generate random decimal (0 - 1)
    const scaledNumber = randomDecimal * (max - min) + min; // Scale and shift
    const randomInteger = Math.floor(scaledNumber); // Round down to integer

    setRandomNumber(randomInteger);
    //console.log('my random number is', randomNumber)
    //console.log('my random Integer number is', randomInteger)
  };

  return (
    <SafeAreaView style={{backgroundColor: white, flex: 1}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: responsiveWidth(100),
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(5),
            alignItems: 'center',
            borderBottomColor: greyBg,
            borderBottomWidth: 1,
          }}>
          {/* <FontAwsome  name="angle-left" color={"black"} size={20}/> */}
          <BackArrow />

          <Text
            style={{
              marginLeft: responsiveWidth(28),
              color: black,
              fontSize: responsiveFontSize(2.5),
              fontWeight: 'bold',
            }}>
            Checkout
          </Text>
        </View>
        <View
          style={{
            width: responsiveWidth(90),
            marginHorizontal: responsiveWidth(5),
            backgroundColor: lightgrey,
            flexDirection: 'column',
            paddingTop: responsiveHeight(1),
            paddingBottom: responsiveHeight(2),
            paddingLeft: responsiveWidth(2),
            marginVertical: responsiveHeight(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(60),
              marginTop: responsiveHeight(1.2),
            }}>
            <View
              style={{
                width: responsiveWidth(15),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Text style={{borderRadius: 30,backgroundColor:"green",fontSize:responsiveFontSize(7), width:responsiveWidth(15), height:responsiveHeight(9),textAlign:"center", paddingBottom:responsiveHeight(0.5)}}>D</Text> */}
              <Image
                style={{
                  width: responsiveWidth(15),
                  height: responsiveHeight(8),
                  borderRadius: 50,
                }}
                source={require('../Images/sofa.jpg')}
              />
            </View>
            <View
              style={{
                width: responsiveWidth(65),
                paddingTop: responsiveHeight(1.5),
                paddingLeft: responsiveWidth(5),
              }}>
              <Text
                style={{
                  color: black,
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: 'bold',
                }}>
                User name
              </Text>
              <Text
                style={{
                  color: black,
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: 'bold',
                }}>
                Order id #984589
              </Text>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: responsiveWidth(5)}}>
          <Text
            style={{
              color: black,
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2),
              marginBottom: responsiveHeight(1),
            }}>
            Package Checkout Details
          </Text>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginVertical: responsiveHeight(2),
            }}>
            <Text style={styles.txt}>Package Name</Text>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.txt}>Alnafora Sliver pkagae </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginVertical: responsiveHeight(2),
            }}>
            <Text style={styles.txt}>Event Type</Text>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.txt}>Mehandi</Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginVertical: responsiveHeight(2),
            }}>
            <Text style={styles.txt}>Expected Persons</Text>
            <Text style={styles.txt}>200 guests</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginVertical: responsiveHeight(2),
            }}>
            <Text style={styles.txt}>Price Per Head </Text>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.txt}>2500 Pkr</Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginVertical: responsiveHeight(1),
            }}>
            <Text style={styles.txt}>Total Amount</Text>
            <Text style={styles.txt}>100k</Text>
          </View>
          <View
            style={{
              width: responsiveWidth(60),
              flexDirection: 'row',
              marginBottom: responsiveHeight(1),
              marginTop: responsiveHeight(3),
              width: responsiveWidth(100),
            }}>
            <Text style={styles.txt}>20% Advance Payable Amount PKR 4000</Text>
          </View>
          <View
            style={{
              width: responsiveWidth(100),
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: responsiveHeight(1),
            }}>
            {/* <View style={{}}></View> */}
            <View
              style={{
                height: responsiveHeight(1.5),
                width: responsiveWidth(3),
                borderRadius: 10,
                backgroundColor: greyBg,
                marginRight: responsiveWidth(1),
              }}></View>
            <Text style={styles.txt}>
              By clicking you agree our Terms and Condition{' '}
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(3),
              marginBottom: responsiveHeight(5),
            }}>
            <Pressable
              onPress={() => {
                generateRandomNumber();
                navigation.navigate('ConfirmPayment');
              }}
              style={{
                paddingHorizontal: responsiveWidth(15),
                paddingVertical: responsiveHeight(1.5),
                backgroundColor: blue,
              }}>
              <Text style={{color: white}}>Submit Order</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  txt: {
    color: black,
    fontSize: responsiveFontSize(1.8),
  },
});

export default PackageCheckout;
