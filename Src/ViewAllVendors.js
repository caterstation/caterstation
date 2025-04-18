import { View, Text, FlatList, Pressable, StyleSheet, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { black, blue, white } from './Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { getVendors } from './Hooks/api/vendorApi';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import BackArrow from './BackArrow';
import HorizontalBar from './HorizontalBar';
import Title from './Title';

const ViewAllVendors = ({ route }) => {
  const navigation = useNavigation();
  const [vendors, setVendors] = useState([]);
  const { myService } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.caterstation.pro/api/vendors'); // Replace with your API endpoint
      const data = await response.json();
      
      const filteredVendors = data.allvendors.filter((vendor) => {
        return vendor.vendor_services.some((service) => service.service_name === myService);
      });

      setVendors(filteredVendors);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white,  }}>
      <View style={{ marginBottom: responsiveHeight(2), flex:1 }}>
      <HorizontalBar backPress={() => navigation.goBack()} title={myService} />

        {loading ? (
          <View style={styles.loadingContainer}>
            {/* <ActivityIndicator size="large" color={blue} /> */}
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <View style={{paddingBottom:responsiveHeight(15)}}>
                      <FlatList
                                  data={vendors}
                                  showsVerticalScrollIndicator={false}
                                  keyExtractor={item => item.id.toString()}
                                  numColumns={3}
                                  renderItem={({ item }) => {
                                    const imgS = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`;
                                    const cimg = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`;

                                    return (
                                      <Pressable
                                        onPress={() => {
                                          navigation.navigate("DetailsVendor", {
                                            item,
                                            Thumb: imgS,
                                            Cover: cimg
                                          });
                                        }}
                                        style={styles.wedDecCard}
                                      >
                                        <Image style={styles.cardImage} source={{ uri: imgS }} />
                                        <View style={{justifyContent:"center", alignItems:"center", marginVertical:responsiveHeight(1)}}>
                            <Title numberOfLines={1}>
                                        {item.company_name}
                                        </Title>
              </View>
                                      </Pressable>
                                    );
                                  }}
                                />

          </View>

          
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wedDecCard: {
    width: responsiveWidth(30),
    marginHorizontal: responsiveWidth(1.5),
    marginBottom: responsiveHeight(1.5),
  },
  cardImage: {
    height: responsiveHeight(20),
    width: responsiveWidth(30),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: responsiveFontSize(2),
    color: blue,
    marginTop: responsiveHeight(1),
    textAlign: "center",
    width:responsiveWidth(100)
  },
  questionBox1: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(2),
    backgroundColor: "#BEBEBE"
  },
  innerquestionBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(2),
    backgroundColor: blue
  },
  questionTxt: {
    color: "black",
    paddingHorizontal: responsiveWidth(2),
    marginTop: 10
  },
  questionBox2: {
    flexDirection: "column",
    marginVertical: responsiveHeight(2),
    backgroundColor: "white"
  },
  questionHeadingTxt: {
    color: black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default ViewAllVendors;
