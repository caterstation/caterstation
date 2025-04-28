import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform, StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {black, blue, greyBg, white, yellow} from './Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';

import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import {addToCart} from './redux/MyPackageSlice';

import {useNavigation} from '@react-navigation/native';
import PackageIntroComponent from './Components/Packages/PackageIntroComponent';
import RenderHtmlContent from './Components/RenderHtmlContent';
import {getHomeOffers} from './Hooks/api/ForyouApi';

const topInset = Platform.OS === 'android' ? StatusBar.currentHeight : 44; // Typical iOS notch height

const getDataoffers = async () => {
  const result = await getHomeOffers();
  return result;
};

const PackageDetails = ({route, product}) => {
  const currentPackage = useSelector(state => state.package);
  const dispatch = useDispatch();

  const {item, img} = route.params;

  const navigation = useNavigation();
  const [myAllDataoffers, setmyAllDataoffers] = useState([]);
  const user = useSelector(state => state.user.user);
  const navigateToLogin = () => {
    // navigation.navigate('Login');

    navigation.reset({
      index: 0,
      routes: [{name: 'AuthNav'}],
    });
  };

  const showAlert = () => {
    // handleClosePress();
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

  const handleAddToCart = () => {
    if (user == '') {
      showAlert();
    } else {
      dispatch(addToCart(item));
      navigation.navigate('AddToCart');
    }
  };

  useEffect(() => {
    getDataoffers().then(result => {
      // //console.log("homeApi offer useEffect", result);
      setmyAllDataoffers(result?.data); // Set myAllDataService after data is fetched
    });
  }, []);

  const renderItem = ({item}) => {
    //console.log('my offers: ', item);
    const imgS = `https://www.caterstation.pro/public/vendor/package/${item.image}`;
    return (
      <View>
        <Image style={styles.image} source={{uri: imgS}} />
        <Text style={styles.packageName}>{item.package_name}</Text>
      </View>
    );
  };

  return (
    /*     <SafeAreaView style={{backgroundColor: white}}> */
    <ScrollView style={{backgroundColor: white}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <FontAwsome name="angle-left" color={blue} size={20} />
        </TouchableOpacity>
        <Image
          source={{uri: `${img}/${item.image}`}}
          style={styles.coverImage}
        />
        <PackageIntroComponent
          packageName={item.package_name}
          price={item.price}
        />

        <Text style={styles.servicesTitle}>Included Services </Text>
      </View>

      <View
        style={[
          {paddingLeft: responsiveHeight(3), width: responsiveWidth(100)},
        ]}>
        <RenderHtmlContent htmlContent={item.package_detail} isVendor={false} />
        <RenderHtmlContent htmlContent={item.catering} isVendor={false} />
        <RenderHtmlContent htmlContent={item.decor} isVendor={false} />
        <RenderHtmlContent htmlContent={item.venue} isVendor={false} />
      </View>
      <View style={{marginBottom: responsiveWidth(25)}}>
        <View style={[styles.orderNow]}>
          <Pressable
            onPress={() => {
              handleAddToCart();
            }}
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
            renderItem={renderItem}
          />
        </View>
      </View>
    </ScrollView>
    /* </SafeAreaView> */
  );
};
const styles = StyleSheet.create({
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

  back: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
   // paddingTop: topInset,
    backgroundColor: white,
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    position: 'absolute',
    top: 5 + topInset,
    left: 5,
    zIndex: 10,
  },
  coverImage: {
    width: responsiveWidth(100),
    height: responsiveHeight(35),
  },
  image: {
    height: responsiveHeight(12),
    width: responsiveWidth(35),
    borderRadius: 10,
    marginHorizontal: responsiveWidth(1),
    marginTop: responsiveHeight(1),
  },
  packageName: {
    fontSize: responsiveFontSize(1.5),
    color: blue,
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  servicesTitle: {
    color: black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(5),
  },
});

export default PackageDetails;
