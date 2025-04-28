import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black, greyBg, blue, yellow, white} from './Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import HorizontalBar from './HorizontalBar';

const VendorOffering = ({route}) => {
  const navigation = useNavigation();

  const {
    city,
    event_date,
    event_duration,
    event_location,
    event_time,
    event_type,
    full_name,
    num_of_guests,
    required_services,
    venue_type,
    phone,
  } = route.params;

  //console.log('====================================');

  //console.log("passing data");
  // //console.log("city", city);
  // //console.log("event_type", event_type);

  //console.log("full_name", full_name);
  //console.log("num_of_guests", num_of_guests);
  //console.log("required_services", required_services);
  //console.log("event_location", event_location);
  //console.log("venue_type", venue_type);
  //console.log("event_duration", event_duration);

  //console.log("event_date", event_date);

  //console.log("event_time", event_time);
  //console.log("phone", phone);

  //console.log('====================================');
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const {myService} = route.params;
  //console.log("my selected service is ")

  const [selectedServices, setSelectedServices] = useState([myService[0]]); // Initialize with the first service
  const [selectedVendors, setSelectedVendors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('https://www.caterstation.pro/api/vendors'); // Replace with your API endpoint
      const data = await response.json();

      const filteredVendors = data.allvendors.filter(vendor => {
        return vendor.vendor_services.some(service =>
          selectedServices.includes(service.service_name),
        );
      });
      setVendors(filteredVendors);
      setLoading(false);
    };

    fetchData();
  }, [selectedServices]);

  const handleServiceSelection = service => {
    setSelectedServices([service]);
    if (!selectedVendors[service]) {
      setSelectedVendors(prev => ({...prev, [service]: []}));
    }
  };

  // const [selectedVendors, setSelectedVendors] = useState({});
  const [allSelectedVendorIds, setAllSelectedVendorIds] = useState([]);

  const handleVendorSelection = (service, vendorId) => {
    //console.log('====================================');
    //console.log("service   :: ", service,"  vendorId    :: ",vendorId);
    //console.log('====================================');

    setSelectedVendors(prevSelectedVendors => {
      const serviceVendors = prevSelectedVendors[service] || [];
      let updatedServiceVendors;
      let updatedAllSelectedVendorIds;

      if (serviceVendors.includes(vendorId)) {
        updatedServiceVendors = serviceVendors.filter(id => id !== vendorId);
        updatedAllSelectedVendorIds = allSelectedVendorIds.filter(
          id => id !== vendorId,
        );
      } else {
        updatedServiceVendors = [...serviceVendors, vendorId];
        updatedAllSelectedVendorIds = [...allSelectedVendorIds, vendorId];
      }

      setAllSelectedVendorIds(updatedAllSelectedVendorIds);

      return {
        ...prevSelectedVendors,
        [service]: updatedServiceVendors,
      };
    });
  };
  //console.log('====================================');
  //console.log("vendor id : ", allSelectedVendorIds);
  //console.log('====================================');
  const renderServiceButton = service => {
    const isSelected = selectedServices.includes(service);
    return (
      <Pressable
        key={service}
        onPress={() => handleServiceSelection(service)}
        style={[
          styles.serviceButton,
          isSelected && styles.serviceButtonSelected,
        ]}>
        <Text style={{color: isSelected ? 'white' : black}}>{service}</Text>
      </Pressable>
    );
  };

  const renderItem = ({item}) => {
    const imgS = `https://caterstation.pro/public/vendor/thumb/${item.thumb}`;
    const cimg = `https://caterstation.pro/public/vendor/cover/${item.cover_img}`;
    const currentService = selectedServices[0];
    const isSelected = selectedVendors[currentService]?.includes(item.id);

    return (
      <Pressable
        onPress={() => handleVendorSelection(currentService, item.id)}
        style={[
          styles.vendorContainer,
          isSelected ? styles.vendorSelected : null,
        ]}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              height: responsiveHeight(20),
              width: responsiveWidth(25),
              marginBottom: responsiveHeight(1),
            }}
            source={{uri: imgS}}
          />
          <Text
            numberOfLines={1}
            style={{color: black, textAlign: 'center', fontWeight: 'bold'}}>
            {' '}
            {item.company_name}
          </Text>
        </View>
      </Pressable>
    );
  };

  const handleSubmit = async () => {
    // //console.log("State:", { person_name, message, location, email, phone,portfolio_id,vendor_id,event_date});

    try {
      await axios.post(
        'https://caterstation.pro/api/custom-orders',
        {
          city,
          event_date,
          event_duration,
          event_location,
          event_time,
          event_type,
          full_name,
          num_of_guests,
          required_services,
          venue_type,
          phone: phone,
          vendor_id: allSelectedVendorIds,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      navigation.navigate('OrderSummary', {
        city,
        event_date,
        event_duration,
        event_location,
        event_time,
        event_type,
        full_name,
        num_of_guests,
        required_services,
        venue_type,
        phone: phone,
        vendor_id: allSelectedVendorIds,
      });
      // setModalVisible(true)
    } catch (error) {
      // Handle error
      if (error.response) {
        console.error('HTTP error! status:', error.response);
      } else {
        console.error('Error from:', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <View style={{flex: 1, backgroundColor: white}}>
        <HorizontalBar
          backPress={() => navigation.goBack()}
          title="All Vendors "
        />

        <View>
          <ScrollView horizontal style={styles.serviceSelectionContainer}>
            {myService.map(renderServiceButton)}
          </ScrollView>
        </View>

        <View style={styles.contentContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <View>
              <View style={{height: responsiveHeight(70)}}>
                <FlatList
                  data={vendors}
                  renderItem={renderItem}
                  numColumns={3}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.flatListContainer}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(100),
                  marginBottom: responsiveHeight(5),
                  marginTop: responsiveHeight(3),
                }}>
                <View style={{backgroundColor: blue}}>
                  <TouchableOpacity
                    style={{
                      height: responsiveHeight(4),
                      width: responsiveWidth(40),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={handleSubmit}

                    // () => { navigation.navigate('VendorOffering',{

                    //   city,                // 1
                    //   event_date:formattedDate1,         // 2
                    //   event_duration,      // 3
                    //   event_location,      // 4
                    //   event_time:displayTime,        // 5
                    //   event_type:event_type,          // 6
                    //   full_name,           // 7
                    //   num_of_guests,       // 8
                    //   required_services,   // 9
                    //   myService :selectedService         // 10

                    //  }) }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: white,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceSelectionContainer: {
    flexDirection: 'row',
    padding: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
    backgroundColor: white,
  },
  serviceButton: {
    width: responsiveWidth(25),
    height: responsiveHeight(4),
    marginHorizontal: responsiveWidth(1),
    borderRadius: 15,
    borderWidth: 2,
    borderColor: yellow,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  serviceButtonSelected: {
    backgroundColor: blue,
  },
  loadingContainer: {
    backgroundColor: white,
  },
  loadingText: {
    fontSize: responsiveFontSize(2),
    color: blue,
    textAlign: 'center',
  },
  vendorContainer: {
    width: responsiveWidth(30),
    marginHorizontal: responsiveWidth(1),
    marginBottom: responsiveHeight(2),
    borderWidth: 2,
    borderColor: 'white', // Default border color
    borderRadius: 5,
    backgroundColor: white,
  },
  vendorSelected: {
    borderColor: blue, // Change border color when selected
  },
});

export default VendorOffering;
