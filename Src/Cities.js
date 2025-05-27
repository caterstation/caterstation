import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {black} from './Colors';
import {getAllCities} from './Hooks/api/MyCities';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImgHbar from './ImgHbar';

const Cities = () => {
  const navigation = useNavigation();
  const [myCities, setMyCities] = useState();

  const handlePress = city => {
    if (city === 'Lahore') {
      navigation.navigate('CitiesEventType', {city});
    } else {
      Alert.alert('Coming Soon!', `No vendor available in ${city}`);
    }
  };

  useEffect(() => {
    getData().then(result => {
      console.log('useEffect', result);
    });
  }, []);

  const getData = async () => {
    const result = await getAllCities();
    setMyCities(result?.cities);
    return result;
  };

  const renderCity = ({item}) => {
    const imgUri = `https://caterstation.pro/public/city/${item.image}`;
    return (
      <View style={styles.cityContainer}>
        <TouchableOpacity
          style={styles.cityButton}
          onPress={() => handlePress(item.city)}>
          <Image
            style={styles.cityImage}
            source={{uri: imgUri}}
          />
          <Text style={styles.cityText}>{item.city}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImgHbar
        backPress={() => navigation.goBack()}
        title="Select Cities"
        headerImage={require('../Images/Home/mock.png')}
      />

      <View style={styles.flatListContainer}>
        <FlatList
          data={myCities}
          numColumns={3}
          renderItem={renderCity}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  flatListContainer: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityContainer: {
    width: '30%',
    marginBottom: 15,
    marginHorizontal: 5,
  },
  cityButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityImage: {
    borderRadius: 60,
    height: responsiveWidth(17),
    width: responsiveWidth(17),
  },
  cityText: {
    fontWeight: '600',
    marginTop: responsiveHeight(1),
    color: black,
  },
});

export default Cities;
