import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black} from '../../Colors';

const HorizontalImagesComponent = ({vendors}) => {
  const navigation = useNavigation();
  const RenderItem = ({item}) => {
    const imgS = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`;
    const cimg = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`;

    return (
      <View style={styles.container}>
        <Pressable
          disabled
          onPress={() => {
            navigation.navigate('DetailsVendor', {
              item,
              Thumb: imgS,
              Cover: cimg,
            });
          }}
          style={styles.wedDecCard}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: imgS}} />
          </View>

          <Text numberOfLines={1} style={styles.name}>
            {item.company_name}
          </Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.imgCard}>
      <FlatList
        data={vendors}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        horizontal
        renderItem={RenderItem}
      />
    </View>
  );
};

export default HorizontalImagesComponent;

const styles = StyleSheet.create({
  container: {marginHorizontal: responsiveWidth(1)},
  imgCard: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    marginVertical: responsiveHeight(1.8),
    height: responsiveHeight(20),
    marginHorizontal: responsiveWidth(1),
  },
  wedDecCard: {
    height: responsiveHeight(22),
    width: responsiveWidth(29),
    flexDirection: 'column',
    marginHorizontal: responsiveWidth(1),
  },
  image: {
    height: responsiveHeight(10),
    width: responsiveWidth(24),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: responsiveHeight(1),
    color: black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
