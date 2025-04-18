import { View, Text, Image } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import HorizontalBar from './HorizontalBar';
import { black, blue, white } from './Colors';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { Dimensions } from 'react-native';
import ReadMoreText from './ReadMoreText';

const { width: screenWidth } = Dimensions.get('window');

export const getHomeEvents = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get("https://www.caterstation.pro/api/events");
            // resolve(result?.data?.events?.data || []);
            resolve(result?.data || []);

        } catch (error) {
            console.log("Error: ", error);
            reject(error);
        }
    });
};

const ImageComponent = ({ uri }) => {
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const setImageDimensions = useCallback(() => {
        Image.getSize(uri, (width, height) => {
            // Calculate aspect ratio
            const aspectRatio = width / height;
            const adjustedWidth = screenWidth - responsiveWidth(4); // subtract margin
            const adjustedHeight = adjustedWidth / aspectRatio;

            setImageSize({
                width: adjustedWidth,
                height: adjustedHeight,
            });
        }, (error) => {
            console.error('Error fetching image size:', error);
        });
    }, [uri]);

    useEffect(() => {
        setImageDimensions();
    }, [setImageDimensions]);

    if (imageSize.width === 0 || imageSize.height === 0) {
        return null; // or a loading spinner, placeholder, etc.
    }

    return (
        <Image
            resizeMode="contain"
            style={{
                height: imageSize.height,
                width: imageSize.width,
            }}
            source={{ uri }}
        />
    );
};

const CSEvents = () => {
    const navigation = useNavigation();
    const [myAllDataEvent, setMyAllDataEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDataEvents = async () => {
        try {
            const result = await getHomeEvents();
            setMyAllDataEvent(result?.events);
        } catch (error) {
            console.error('Error response data:', error.response);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
            console.error('Error request:', error.request);
        } finally {
            setLoading(false); // Ensure loading is set to false regardless of the result
        }
    };
    // console.log("myAllDataEvent : ",myAllDataEvent)

    useEffect(() => {
        getDataEvents();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
            <HorizontalBar backPress={() => navigation.goBack()} title={"Events by Caterstation"} />
            <View style={{ flex: 1 }}>
                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: blue, marginTop: responsiveHeight(1), textAlign: "center", width: responsiveWidth(100) }}>Loading...</Text>
                    </View>
                ) : (
                    <View style={{ justifyContent: "center", alignItems: "center",  }}>
                        <FlatList
                            data={myAllDataEvent}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                const imgS = `https://www.caterstation.pro/public/event/mbl_img/${item.mbl_img}`;
                                    console.error("error",item.error)
                                return (
                                    <View
                                        onPress={() => {
                                            navigation.navigate("CSEvents");
                                        }}
                                    >
                                        <ImageComponent uri={imgS} />
                                        <View style={{ marginTop: responsiveHeight(1), marginBottom: responsiveHeight(4) }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Image style={{ height: responsiveHeight(2.6), width: responsiveWidth(6) }} source={require("../Images/profile.png")} />
                                                <View style={{ justifyContent: "center" }}>
                                                    <Text style={{ color: black, fontWeight: "bold", fontSize: responsiveScreenFontSize(1.8), marginLeft: responsiveWidth(1.5) }}>
                                                        {item.person_name}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: responsiveHeight(1) }}>
                                                <Text style={{ color: black, fontWeight: "bold", fontSize: responsiveScreenFontSize(1.8) }}>
                                                    Event Type : <Text style={{ fontWeight: 'normal' }}> {item.title}</Text>
                                                </Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <ReadMoreText>
                                                        {item.event_review}
                                                    </ReadMoreText>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default CSEvents;
