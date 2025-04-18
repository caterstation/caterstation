import { View, Text, FlatList, Pressable, StyleSheet, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { black, blue, white } from './Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { getVendors } from './Hooks/api/vendorApi';
import BackArrow from './BackArrow';
import HorizontalBar from './HorizontalBar';
import Title from './Title';

const getAllVendors = async () => {
    const result = await getVendors();
    return result;
};

const MyAllVen = () => {
    const navigation = useNavigation();
    const [myAllDataVendor, setmyAllDataVendor] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllVendors().then((result) => {
            setmyAllDataVendor(result);
            setLoading(false); // Set loading to false after data is fetched
        });
    }, []);

    return (
        <SafeAreaView  style={{ flex: 1, backgroundColor: white,  }}>
            <View style={{  flex: 1 }}>
                <HorizontalBar backPress={() => navigation.goBack()} title="All Vendors" />

                {loading ? (
                    <View style={styles.loadingContainer}>
                        {/* <ActivityIndicator size="large" color={blue} /> */}
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={myAllDataVendor}
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
                                    {/* <View style={{ marginTop: responsiveHeight(1) }}>
                                     
                                     
                                     
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: black, textAlign: "center", fontWeight: '600' }}>
                                            {item.company_name}
                                        </Text>
                                    </View> */}
                                </Pressable>
                            );
                        }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wedDecCard: {
        width: responsiveWidth(30),
        marginHorizontal: responsiveWidth(1.5),
        marginBottom: responsiveHeight(1),
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
        width: responsiveWidth(100)
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

export default MyAllVen;
