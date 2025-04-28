import {View, Text, StyleSheet,Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
export const welcomeSliderImages = [
  //require('../Images/Slider/360.png'),
  require('../Images/Slider/Slider2.png'),
  require('../Images/Slider/Slider1.png'),
  require('../Images/Slider/Slider3.png'),
  //require('../Images/Slider/300-200.png'),
];

export default function WelcomeImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({item, index}, parallaxProps) => {
    return <ItemCard key={index} item={item} parallaxProps={parallaxProps} />;
  };

  const handleSnapToItem = index => {
    setActiveIndex(index);
  };

  return (
        <Carousel
          data={welcomeSliderImages}
          loop
          autoplay
          renderItem={renderItem}
          hasParallaxImages
          sliderWidth={responsiveWidth(100)}
          itemWidth={responsiveWidth(100)}
          autoplayInterval={4000}
          useNativeDriver={false}
          onSnapToItem={handleSnapToItem}
          removeClippedSubviews={false}
        />
  );
}

const ItemCard = ({item, parallaxProps}) => (
  <Image
  source={item}
  style={{
       width: responsiveWidth(100),
       //height: responsiveHeight(30),
       resizeMode: 'cover',
        }}
/>
);

const styles = StyleSheet.create({});
