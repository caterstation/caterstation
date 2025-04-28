import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {black, blue} from '../../Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getHomeTestimonials} from '../../Hooks/api/ForyouApi';

const getDataTestimonials = async () => {
  const result = await getHomeTestimonials();
  return result;
};

const ReviewTabComponent = () => {
  const [myAllDataTestimonials, setmyAllDataTestimonials] = useState([]);
  const [expandedTestimonials, setExpandedTestimonials] = useState({});

  useEffect(() => {
    getDataTestimonials().then(result => {
      setmyAllDataTestimonials(result?.data || []); // Set myAllDataTestimonials after data is fetched
    });
  }, []);

  const toggleReadMore = id => {
    setExpandedTestimonials(prevState => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the expanded state for the specific testimonial
    }));
  };

  return (
    <View style={[styles.scene, {backgroundColor: '#ffff'}]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={myAllDataTestimonials}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => {
          const img = `https://caterstation.pro/public/testimonial/decor/${item.decor_image}`;
          const isExpanded = expandedTestimonials[item.id];

          return (
            <View style={styles.testimonialContainer}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: img}} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.personName}>{item.person_name}</Text>
                <Text
                  numberOfLines={isExpanded ? null : 3} // Show limited lines if not expanded
                  style={styles.testimonialText}>
                  {item.testimonial}
                </Text>
                {item.testimonial.length > 100 && ( // Show "Read More" if text is long
                  <TouchableOpacity onPress={() => toggleReadMore(item.id)}>
                    <Text style={styles.readMoreText}>
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ReviewTabComponent;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: responsiveWidth(2),
  },
  testimonialContainer: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(100),
    backgroundColor: '#F0F0F0',
    padding: responsiveHeight(1),
    flexDirection: 'row',
    borderRadius: 8,
  },
  imageContainer: {
    width: responsiveWidth(18),
    paddingHorizontal: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 30,
    height: responsiveHeight(7),
    width: responsiveWidth(13),
  },
  textContainer: {
    width: responsiveWidth(78),
  },
  personName: {
    color: black,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(0.5),
  },
  testimonialText: {
    fontSize: responsiveFontSize(1.9),
    color: black,
  },
  readMoreText: {
    color: blue,
    marginTop: responsiveHeight(0.5),
    //fontWeight: 'bold',
  },
});
