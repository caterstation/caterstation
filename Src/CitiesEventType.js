import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { white, blue } from './Colors';
import ImgHbar from './ImgHbar';
import { getAllEvents } from './Hooks/api/AllEventsApi';

const CitiesEventType = ({ route }) => {
  const navigation = useNavigation();
  const { city } = route.params;
  const [events, setEvents] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const fetchEventTypes = async () => {
    try {
      const result = await getAllEvents();
      setEvents(result?.event_types || []);
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  };

  const BlueIcons = {
    'Baat Paki': require('../Images/baatpakiB.png'),
    'Casual Events': require('../Images/CasualB.png'),
    'Corporate Events': require('../Images/CorporateB.png'),
    Mehndi: require('../Images/MehndiB.png'),
    Nikkah: require('../Images/NikkahB.png'),
    Baraat: require('../Images/BaraatB.png'),
    Walima: require('../Images/WalimaB.png'),
    Birthday: require('../Images/BirthdayB.png'),
    'Bridal Shower': require('../Images/BridalShowerB.png'),
    Mayoun: require('../Images/MayounB.png'),
    Dholki: require('../Images/DholkiB.png'),
    'Qawali Night': require('../Images/QawaliNightB.png'),
    Millad: require('../Images/MilladB.png'),
    Concerts: require('../Images/ConcertsB.png'),
    'DJ Night': require('../Images/DJNightB.png'),
    'Educational EXPO': require('../Images/EducationaExB.png'),
    'Industrial EXPO': require('../Images/IndustrialB.png'),
    'Baby Shower': require('../Images/BabyShowerB.png'),
  };

  const WhiteIcons = {
    'Baat Paki': require('../Images/Baatpakki.png'),
    'Casual Events': require('../Images/Casual.png'),
    'Corporate Events': require('../Images/Corporate.png'),
    Mehndi: require('../Images/Mehndi.png'),
    Nikkah: require('../Images/Nikkah.png'),
    Baraat: require('../Images/Baraat.png'),
    Walima: require('../Images/Walima.png'),
    Birthday: require('../Images/Birthday.png'),
    'Bridal Shower': require('../Images/BridalShower.png'),
    Mayoun: require('../Images/Mayoun.png'),
    Dholki: require('../Images/Dholki.png'),
    'Qawali Night': require('../Images/QawaliNight.png'),
    Millad: require('../Images/Millad.png'),
    Concerts: require('../Images/Concert.png'),
    'DJ Night': require('../Images/DJN.png'),
    'Educational EXPO': require('../Images/EducationalEXPO.png'),
    'Industrial EXPO': require('../Images/IndustrialEXPO.png'),
    'Baby Shower': require('../Images/BabyShower.png'),
  };

  const renderEventItem = ({ item }) => {
    const eventType = item.name;
    const isSelected = selectedType === eventType;

    const iconSource = isSelected ? WhiteIcons[eventType] : BlueIcons[eventType];

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: isSelected ? blue : white,
            borderColor: blue,
          },
        ]}
        onPress={() => {
          setSelectedType(eventType);
          navigation.navigate('UserEventDetail', {
            event_type: eventType,
            city,
          });
        }}
      >
        <Image source={iconSource} resizeMode="contain" style={styles.icon} />
        <Text style={[styles.cardText, { color: isSelected ? white : blue }]}>
          {eventType}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImgHbar
        backPress={() => navigation.goBack()}
        title="Event Type"
        headerImage={require('../Images/eventType.png')}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderEventItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: responsiveHeight(4) }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  listContainer: {
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(2),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(44),
    marginBottom: responsiveHeight(2),
    paddingVertical: responsiveHeight(1.5),
    borderWidth: 2,
  },
  icon: {
    marginHorizontal: responsiveWidth(2),
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  cardText: {
    flex: 1,
    fontSize: responsiveFontSize(1.85),
    fontWeight: '600',
  },
});

export default CitiesEventType;
