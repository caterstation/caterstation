import { View, Text, FlatList, Image, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { black, greyBg, blue, white } from './Colors';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import HorizontalBar from './HorizontalBar';
import Title from './Title';

const ServiceVendors = ({ route }) => {
    const navigation = useNavigation();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { myService } = route.params;

    

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

    const renderItem = ({ item }) => {
        const imgS = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`;
        const cimg = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`;

        return (
            <Pressable
                onPress={() => {
                    navigation.navigate("ServiceVendorDetail", {
                        item,
                        Thumb: imgS,
                        Cover: cimg
                    });
                }}
                style={{ width: responsiveWidth(30), marginHorizontal: responsiveWidth(1), marginBottom: responsiveHeight(1) }}
            >
                <Image style={{ height: responsiveHeight(20), width: responsiveWidth(30),  }} source={{ uri: imgS }} />
              
              <View style={{justifyContent:"center", alignItems:"center", marginVertical:responsiveHeight(1)}}>
                            <Title numberOfLines={1}>
                                        {item.company_name}
                                        </Title>
              </View>
              
              
                {/* <Text style={{ color: black, textAlign: "center", fontWeight: '600' }} numberOfLines={1}> {item.company_name}</Text> */}
            </Pressable>
        );
    };

    return (
        <SafeAreaView style={{ flex:1,paddingHorizontal: responsiveWidth(1), paddingBottom: responsiveHeight(7), backgroundColor:white }}>
                    <HorizontalBar backPress={() => navigation.goBack()} title={myService} />

            {loading ? (
                <View style={styles.loadingContainer}>
                    {/* <ActivityIndicator size="large" color={blue} /> */}
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <View style={{backgroundColor:white}}>
                     <FlatList
                    data={vendors}
                    renderItem={renderItem}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()}
                />
                </View>
               
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent:"center", alignItems:"center"
       
    },
    loadingText: {
        fontSize: responsiveFontSize(2),
        color: blue,
        marginTop: responsiveHeight(1),
        textAlign: 'center',
    },
});

export default ServiceVendors;
