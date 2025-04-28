import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient'; // Make sure to install this package
import ServiceCard from './ServiceCard'; // Assuming you've implemented ServiceCard
import {Lblue, blue, white, yellow} from '../Colors';
import DropdownComponent from './DropdownComponent';
import WelcomeImageSlider from '../WelcomeImageSlider';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
console.log('Screen Width:', screenWidth);

const HomeServices = () => {
  //const services = Array(6).fill({id: '', title: 'Service'}); // Mock data for 6 services
  const [services, setservices] = useState([
    {
      id: '1',
      title: 'Photography',
      src: require('../../Images/HomeServices/camera.png'),
    },
    {
      id: '2',
      title: 'Decor',
      src: require('../../Images/HomeServices/decor.png'),
    },
    {
      id: '3',
      title: 'Catering',
      src: require('../../Images/HomeServices/catering-2.png'),
    },
    {
      id: '4',
      title: 'Food',
      src: require('../../Images/HomeServices/food.png'),
    },
    {
      id: '5',
      title: 'Wedding Venues',
      src: require('../../Images/HomeServices/venue-2.png'),
    },
    {
      id: '6',
      title: 'Qawali',
      src: require('../../Images/HomeServices/qawali.png'),
    },
  ]);
  const renderServiceCard = ({item}) => <ServiceCard service={item} />;
  return (
    <View style={{backgroundColor: blue}}>
      <WelcomeImageSlider />

      <ImageBackground
        source={require('../../Images/HomeServices/background.jpg')} // Replace with your background image
        style={styles.backgroundImage}>
        <LinearGradient
          //colors={['rgba(34,26,77,1) 90%', 'rgba(255,255,255,.97) .10%']}
          colors={['rgba(34,26,77,0.8)', 'rgba(255,255,255,0.8)']}

          //colors={['rgba(0,0,0,0.1) 90%', 'rgba(255,255,255,.97) .10%']}
          style={styles.gradient}>
          {/* <DropdownComponent /> */}

          <Text style={styles.title} />

          {/*  <SearchComponent isHome={true} /> */}
          <FlatList
            data={services}
            renderItem={renderServiceCard}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default HomeServices;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: responsiveHeight(35),
    // backgroundColor: Lblue,
  },
  gradient: {
    flex: 1,
    //paddingHorizontal: 10,
    backgroundColor: 'transparent', // just to be safe
  },
  listContainer: {
    justifyContent: 'center',

    // paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: white,
    marginLeft: 12,
    letterSpacing: 0.6,
    marginTop: 10,
    // marginBottom: 10,
  },
});
