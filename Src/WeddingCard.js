import { View, Text, StyleSheet, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { blue, white } from './Colors';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import HorizontalBar from './HorizontalBar';

const getEinvitesData = async () => {
  const result = await axios.get('https://www.caterstation.pro/api/e-invites');
  return result.data;
};

const WeddingCard = ({ route }) => {
  const { card } = route.params;
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getEinvitesData();
        console.log('Fetched data:', data);

        if (data && data.einvites) {
          const filteredImages = card === 'cor'
            ? data.einvites.filter(item => item.category === 'Corporate').map(item => item.image)
            : data.einvites.filter(item => item.category !== 'Corporate').map(item => item.image);

          setImages(filteredImages);
        } else {
          console.error('Unexpected data format:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };
    fetchImages();
  }, [card]);

  return (
    <SafeAreaView style={styles.container}>
      <HorizontalBar backPress={() => navigation.goBack()} title={card === "wed" ? "Wedding Cards" : "Corporate Cards"} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={images}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({ item }) => {
            const img = `https://caterstation.pro/public/einvites/${item}`;
            console.log('====================================');
            console.log("einvites item ", item);
            console.log('====================================');
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("WedCardDetails", { picCard: img, card });
                }}
                style={styles.wedDecCard}
              >
                <Image
                  resizeMode='contain'
                  style={styles.cardImage}
                  source={{ uri: img }}
                />
              </Pressable>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: blue,
  },
  wedDecCard: {
    width: responsiveWidth(30),
    marginHorizontal: responsiveWidth(1),
    marginBottom: 10,
  },
  cardImage: {
    height: responsiveHeight(22),
    width: responsiveWidth(30),
  },
});

export default WeddingCard;
