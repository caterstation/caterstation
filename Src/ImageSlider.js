import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions,FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const width = Dimensions.get('window').width;
const myPortfolio = [
  { id: 1, image: 'image1.jpg' },
  { id: 2, image: 'image2.jpg' },
  { id: 3, image: 'image3.jpg' },
  // ...
];

const ImageSlider = ({ route }) => {
  const { image,data} = route.params;
  // console.log("selectedImage",image)
  const [indexSelected, setIndexSelected] = useState(0);
  const carouselRef = useRef(null);
  const flatListRef = useRef(null);

  const onSelect = (index) => {
    setIndexSelected(index);
  };

  const onTouchThumbnail = (touched) => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        layout='default'
        data={data}
        sliderWidth={width}
        itemWidth={width}
        renderItem={({ item, index }) => (
          <Image
            key={index}
            style={styles.carouselImage}
            resizeMode='contain'
            source={{ uri: `https://www.caterstation.pro/public/vendor/portfolio/${item.image}` }}
          />
        )}
        onSnapToItem={(index) => onSelect(index)}
      />
      <View style={styles.thumbnailContainer}>
        <FlatList
          ref={flatListRef}
          data={data}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onTouchThumbnail(index)}
              activeOpacity={0.9}
            >
              <Image
                style={styles.thumbnailImage}
                source={{ uri: `https://www.caterstation.pro/public/vendor/portfolio/${item.image}` }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {indexSelected + 1}/{myPortfolio.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  thumbnailImage: {
    width: (width - 32) / 3,
    height: (width - 32) / 3,
    marginBottom: 8,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  counterText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImageSlider;