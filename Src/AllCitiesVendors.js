import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import { getHomeVendorService } from './Hooks/api/ForyouApi';
import { black, greyBg, blue, white } from './Colors';
import HorizontalBar from './HorizontalBar';
import Title from './Title';

const AllCitiesVendors = ({ route }) => {
    const { city, id } = route.params;
    const [City, setCity] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.caterstation.pro/api/vendors');
                const data = await response.json();
                
                // Filter vendors by city
                const filteredVendors = data.allvendors.filter(vendor => vendor.city ==id);
                setCity(filteredVendors);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        
        fetchData();
    }, [id]);

    return (
        <SafeAreaView   style={{ flex:1,backgroundColor:white,paddingHorizontal: responsiveWidth(1),  }}>
                    <HorizontalBar backPress={() => navigation.goBack()} title={city}/>

            {loading ? (
                <View style={{ flex: 1,
                    justifyContent:"center", alignItems:"center"}}>
                <Text style={{color:blue, textAlign:"center", width:responsiveWidth(100), fontSize:responsiveFontSize(2)}}>Loading...</Text>

                </View>
            ) : City.length === 0 ? (
                <Text style={{color:blue,}}>No vendors available for {city}. Coming Soon!</Text>
            ) : (
                <FlatList
                    data={City}
                    renderItem={({ item }) => {
                        const imgS = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`;
                        const cimg = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`;
                        return (
                            <Pressable onPress={() => navigation.navigate("ServiceVendorDetail", { item, Thumb: imgS, Cover: cimg })} style={{ width: responsiveWidth(30), marginHorizontal: responsiveWidth(1), marginBottom: responsiveHeight(1)  }}>
                                <Image style={{ height: responsiveHeight(20), width: responsiveWidth(30), }} source={{ uri: `https://caterstation.pro/public/vendor/thumb/${item.thumb}` }} />
                                
                                   
              <View style={{justifyContent:"center", alignItems:"center", marginVertical:responsiveHeight(1)}}>
                            <Title numberOfLines={1}>
                                        {item.company_name}
                                        </Title>
              </View>
                                
                                
                                {/* <Text style={{ color: black, textAlign: "center", fontWeight: '600', }} numberOfLines={3}>{item.company_name}</Text> */}
                            </Pressable>
                        );
                    }}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </SafeAreaView>
    );
}

export default AllCitiesVendors;
