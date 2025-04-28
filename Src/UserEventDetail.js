import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  useWindowDimensions,
  Pressable,
  Alert,
  // TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black, blue, greyBg, white} from './Colors';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import BackArrow from './BackArrow';
import {useSelector} from 'react-redux';
import ImgHbar from './ImgHbar';

const UserEventDetail = ({route}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);

  const {event_type} = route.params;
  const {city} = route.params;
  //console.log("event_type, city",event_type, city)

  const [full_name, setFullName] = useState('');
  const [num_of_guests, setNumOfGuests] = useState(0);
  const [phone, setPhone] = useState('');
  const [event_location, setEventLocation] = useState('');
  // const [venue_type, setVenueType] = useState('');
  const [event_duration, setEventDuration] = useState(0);
  const [event_date, setEventDate] = useState('');
  const [vendor_id, setVendorId] = useState('');
  const [required_services, setRequiredServices] = useState('');

  const [indoor, setIndoor] = useState(null);
  const [outdoor, setOutdoor] = useState(null);
  const [venue_type, setSelectedVenueType] = useState(null); // New state for the selected venue type
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'indoor', title: 'Indoor'},
    {key: 'outdoor', title: 'Outdoor'},
  ]);
  const [Event, setEvent] = useState('five');

  const renderLabel = ({route}) => (
    <Text style={styles.tabLabel}>{route.title}</Text>
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      renderLabel={renderLabel}
    />
  );

  const getSelectedVenueText = () => {
    if (indoor) {
      const selectedIndoor =
        indoor === 'Marriage Hall' ? 'Marriage Hall' : 'Marquee';

      return `${selectedIndoor}`;
    }
    if (outdoor) {
      const selectedOutdoor =
        outdoor === 'Farm House'
          ? 'Farm House'
          : outdoor === 'Dera'
          ? 'Dera'
          : 'Portable Marquee';
      return `${selectedOutdoor}`;
    }
    return 'Venue Type';
  };

  // And wherever you want to set the required services, you can do it like this:

  const handleIndoorChange = value => {
    setIndoor(value);
    setOutdoor(null); // Reset outdoor selection
    setSelectedVenueType(`Indoor - ${value}`); // Update the selected venue type

    const requiredService =
      value === 'Marriage Hall' ? 'Marriage Hall' : 'Marquee';
    setRequiredServices(requiredService); // Set required services here
  };

  const handleOutdoorChange = value => {
    setOutdoor(value);
    setIndoor(null); // Reset indoor selection
    setSelectedVenueType(`Outdoor - ${value}`); // Update the selected venue type

    let requiredService;
    if (value === 'Farm House') {
      requiredService = 'Farm House';
    } else if (value === 'Dera') {
      requiredService = 'Dera';
    } else {
      requiredService = 'Portable Marquee';
    }
    setRequiredServices(requiredService); // Set required services here
  };

  const FirstRoute = () => {
    const Indoor = [
      {label: 'Marriage Hall', value: 'Marriage Hall'},
      {label: 'Marquee', value: 'Marquee'},
    ];

    const renderItem = item => (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Dropdown
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(80),
            backgroundColor: greyBg,
            paddingHorizontal: responsiveWidth(4),
            marginHorizontal: responsiveWidth(5),
            marginVertical: responsiveHeight(2),
          }}
          placeholderStyle={{fontSize: responsiveFontSize(1.8), color: black}}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={Indoor}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Preferred Venue Type"
          value={indoor}
          onChange={item => handleIndoorChange(item.value)}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const SecondRoute = () => {
    const Outdoor = [
      {label: 'Farm House', value: 'Farm House'},
      {label: 'Dera', value: 'Dera'},
      {label: 'Portable Marquee', value: 'Portable Marquee'},
    ];

    const renderItem = item => (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Dropdown
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(80),
            backgroundColor: greyBg,
            paddingHorizontal: responsiveWidth(4),
            marginHorizontal: responsiveWidth(5),
            marginVertical: responsiveHeight(2),
          }}
          placeholderStyle={{fontSize: responsiveFontSize(1.8), color: black}}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={Outdoor}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Preferred Venue Type"
          value={outdoor}
          onChange={item => handleOutdoorChange(item.value)}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    indoor: FirstRoute,
    outdoor: SecondRoute,
  });

  const myEvent = () => {
    if (Event === 'five') {
      return (
        <TouchableOpacity
          style={[styles.commonBox]}
          onPress={() => setEvent('sixth')}>
          <Text style={{color: 'black', fontSize: responsiveFontSize(1.8)}}>
            {getSelectedVenueText()}
          </Text>
        </TouchableOpacity>
      );
    } else if (Event === 'sixth') {
      return (
        <View>
          <TouchableOpacity
            style={[styles.commonBox]}
            onPress={() => setEvent('five')}>
            <Text style={{color: 'black', fontSize: responsiveFontSize(1.8)}}>
              {getSelectedVenueText()}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              height: responsiveHeight(20),
              marginHorizontal: responsiveWidth(5),
            }}>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
              renderTabBar={renderTabBar}
            />
          </View>
        </View>
      );
    }
  };

  // __________Venue type__________________________________
  const [value, setValue] = useState(null);
  const [selectedService, setSelectedService] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [EventmodalVisible, setEventModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());

  const [event_time, setEventTime] = useState('');
  const [date1, setDate1] = useState(new Date());
  const [formattedDate1, setFormattedDate1] = useState('');

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [displayTime, setDisplayTime] = useState('');

  useEffect(() => {
    // Set initial time in AM/PM format
    setDisplayTime(formatTime(date));
    if (date1 instanceof Date && !isNaN(date1)) {
      setFormattedDate1(date1.toISOString().split('T')[0]);
    } else {
      console.error('date1 is not a valid Date object');
    }
  }, [date1]);

  const formatTime = date => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    setDisplayTime(formatTime(selectedDate));
    setOpen(false);
  };

  // ___________Date and time________________________

  // ___________Vendor type________________________

  const dataDrop = [
    {label: 'Catering', value: 'Catering'},
    {label: 'DECOR', value: 'DECOR'},
    {label: 'Photography', value: 'Photography'},
    {label: 'Food', value: 'Food'},
    {label: 'Wedding Venues', value: 'Wedding Venues'},
  ];
  const dataDropEventLoc = [
    {label: 'Personal   ( your own preferred venue )', value: 'Personal '},
    {label: 'Commercial   ( third party space )', value: 'Commercial '},
  ];
  const EventDuration = [{label: 'Single Day', value: 'Single Day'}];

  //console.log("event_duration",event_duration)

  const navigateToLogin = () => {
    // navigation.navigate('Login');

    navigation.reset({
      index: 0,
      routes: [{name: 'AuthNav'}],
    });
  };

  const showAlert = () => {
    // handleClosePress();

    Alert.alert(
      'No user found',
      'Would you like to go to the login screen?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Login',
          onPress: navigateToLogin,
        },
      ],
      {cancelable: false},
    );
  };
  const handleEmpty = () => {
    if (user == '') {
      showAlert();
    } else if (
      !formattedDate1 ||
      !full_name ||
      !num_of_guests ||
      !selectedService ||
      !event_location ||
      !venue_type ||
      !event_duration ||
      !phone ||
      !displayTime
    ) {
      Alert.alert('Missing Information', 'All fields are required.');
    } else {
      // Proceed with the form submission or other logic
      navigation.navigate('VendorOffering', {
        city: city,
        event_type: event_type,
        event_date: formattedDate1,
        full_name,
        num_of_guests,
        myService: selectedService,
        event_location,
        venue_type: venue_type,
        event_duration,
        event_time: displayTime,
        required_services: selectedService,
        phone,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <ScrollView>
        <View style={{width: responsiveWidth(100)}}>
          <ImgHbar
            backPress={() => navigation.goBack()}
            title="User Detail"
            headerImage={require('../Images/eventType.png')}
          />
        </View>

        <Text
          style={{
            color: black,
            fontSize: responsiveFontSize(1.8),
            fontWeight: 'bold',
            marginTop: responsiveHeight(2),
            textAlign: 'center',
            width: responsiveWidth(100),
          }}>
          Please let us know detail about your event
        </Text>
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            placeholder="Full Name"
            value={full_name}
            onChangeText={text => setFullName(text)}
            style={{fontSize: responsiveFontSize(1.8), color: black}}
            placeholderTextColor={black}
          />
        </View>
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            placeholder="Enter Number of Guests"
            value={num_of_guests}
            keyboardType="number-pad"
            onChangeText={text => setNumOfGuests(text)}
            style={{
              fontSize: responsiveFontSize(1.8),
              color: black,
              justifyContent: 'center',
            }}
            placeholderTextColor={black}
          />
        </View>
        <View style={[styles.commonBox, {justifyContent: 'center'}]}>
          <TextInput
            placeholder="Enter your Number"
            value={phone}
            keyboardType="number-pad"
            onChangeText={text => setPhone(text)}
            style={{
              fontSize: responsiveFontSize(1.8),
              color: black,
              justifyContent: 'center',
            }}
            placeholderTextColor={black}
          />
        </View>

        <View style={styles.container}>
          <MultiSelect
            style={{
              height: responsiveHeight(6),
              width: responsiveWidth(90),
              backgroundColor: greyBg,
              paddingHorizontal: responsiveWidth(4),
            }}
            placeholderStyle={{fontSize: responsiveFontSize(1.8), color: black}}
            selectedTextStyle={styles.selectedTextStyle}
            data={dataDrop}
            labelField="label"
            valueField="value"
            placeholder="Require Services"
            onChange={item => setSelectedService(item)}
            value={selectedService}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        <Dropdown
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(90),
            backgroundColor: greyBg,
            paddingHorizontal: responsiveWidth(4),
            marginHorizontal: responsiveWidth(5),
            marginVertical: responsiveHeight(2),
          }}
          placeholderStyle={{fontSize: responsiveFontSize(1.8), color: black}}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={dataDropEventLoc}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Event Location"
          value={event_location}
          onChange={item => setEventLocation(item.value)}
        />

        <View>{myEvent()}</View>
        <View>
          <Dropdown
            style={{
              height: responsiveHeight(6),
              width: responsiveWidth(90),
              backgroundColor: greyBg,
              paddingHorizontal: responsiveWidth(4),
              marginHorizontal: responsiveWidth(5),
              marginVertical: responsiveHeight(2),
            }}
            placeholderStyle={{fontSize: responsiveFontSize(1.8), color: black}}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={EventDuration}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Event Duration"
            value={event_duration}
            onChange={item => setEventDuration(item.value)}
          />
        </View>

        <View style={{flexDirection: 'column'}}>
          <Pressable onPress={() => setOpen1(true)} style={[styles.pickerBtn]}>
            <Text
              style={[
                styles.commonBox,
                {
                  paddingTop: responsiveHeight(1.9),
                  fontSize: responsiveFontSize(1.8),
                  color: black,
                },
              ]}>
              {formattedDate1}
            </Text>
          </Pressable>
          <Pressable onPress={() => setOpen(true)}>
            <Text
              style={[
                styles.commonBox,
                {
                  paddingTop: responsiveHeight(1.9),
                  fontSize: responsiveFontSize(1.8),
                  color: black,
                },
              ]}>
              {displayTime}
            </Text>
          </Pressable>

          <DatePicker
            modal
            open={open}
            date={date}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={() => setOpen(false)}
            textColor={styles.datePickerText.color}
          />

          <DatePicker
            modal
            mode={'date'}
            open={open1}
            date={date1}
            onConfirm={date2 => {
              setOpen1(false);
              setDate1(date2);
            }}
            textColor={styles.datePickerText.color}
            onCancel={() => {
              setOpen1(false);
            }}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveWidth(100),
            marginBottom: responsiveHeight(5),
            marginTop: responsiveHeight(2),
          }}>
          <View style={{backgroundColor: blue}}>
            <TouchableOpacity
              style={{
                height: responsiveHeight(4),
                width: responsiveWidth(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                handleEmpty();
              }}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: white,
    borderRadius: 10,
    width: responsiveWidth(70),
    padding: responsiveHeight(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: responsiveWidth(20),
    height: responsiveHeight(4),
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
    // color:black,
    fontWeight: 'bold',
  },
  commonBox: {
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    backgroundColor: greyBg,
    paddingHorizontal: responsiveWidth(4),
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(1.5),
    justifyContent: 'center',
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(1.8),
    color: black,
  },
  selectedStyle: {
    backgroundColor: greyBg,
    borderRadius: 5,
  },
  container: {
    marginHorizontal: responsiveWidth(1),
    padding: responsiveWidth(4),
  },
  tabLabel: {
    fontSize: responsiveFontSize(2),
    color: black,
    fontWeight: 'bold',
  },
  tabbar: {
    backgroundColor: white,
  },
  indicator: {
    backgroundColor: blue,
  },
  item: {
    padding: responsiveHeight(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textItem: {
    fontSize: responsiveFontSize(1.8),
    color: black,
  },
  icon: {
    paddingLeft: responsiveWidth(2),
  },
  datePickerText: {
    color: blue, // Change to your desired text color
  },
});
export default UserEventDetail;
