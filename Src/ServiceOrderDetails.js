import {
    Alert,
    Button,
    FlatList,
    Image,
    ImageBackground,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
    Platform,
    KeyboardAvoidingView
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {black, blue, greyBg, greyDark, white, yellow} from './Colors';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import {useDispatch, useSelector} from 'react-redux';
  
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import BackArrow from './BackArrow';
  import {Dropdown} from 'react-native-element-dropdown';
  import axios from 'axios';
  import {useNavigation} from '@react-navigation/native';
  import uuid from 'react-native-uuid';
  import {v4 as uuidv4} from 'react-native-uuid';
import DatePicker from 'react-native-date-picker'
import ImgHbar from './ImgHbar';
  
  const ServiceOrderDetails = ({route}) => {
   
    const navigation = useNavigation();
    const {vendor_id,portfolio_id}=route.params;
    console.log(" vendddddd  idd: ", vendor_id, "  portfolio id : ",portfolio_id)
    const [cartItems, setCartItems] = useState([]); // Array to hold cart items
    const [person_name, setperson_name] = useState('');
    const [message, setmessage] = useState('');
    const [location, setlocation] = useState('');
   
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [payment_method, setPaymentMethod] = useState('transfer');
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  
  
// _________________date handling________________
// const [event_date, setDate] = useState(new Date());
// const [open, setOpen] = useState(false);
// const [mode, setMode] = useState('date');
// const [show, setShow] = useState(false);

// const formattedDate = event_date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

// console.log(formattedDate);

// const [date1, setDate1] = useState(new Date());
// const formattedDate1 = date1.toISOString().split('T')[0];
// // console.log("date", event_date);

// const showMode = (currentMode) => {
//   setShow(true);
//   setMode(currentMode);
// };

// // Calculate the minimum date (one day after the current date)
// const minDate = new Date();
// minDate.setDate(minDate.getDate() + 5);




const [event_date, setevent_date] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date'); // Not currently used

  const formattedDate = event_date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const handleOpen = () => setOpen(true); // Simplified handler for opening picker

  const handleDateChange = (selectedDate) => {
    // Handle date selection from your date picker library (e.g., react-native-datepicker)
    // Update eventDate state based on user selection
    setevent_date(new Date(selectedDate));
    setOpen(false); // Close picker after selection
  };



console.log("State:", { person_name, message, location, email, phone,portfolio_id,vendor_id,event_date});
  
    const handleEmpty=()=>{
      if(phone==[] || email==[] || location ==[] || person_name ==[] ){
        Alert.alert('Please Fill the empty fields')
      } else{
        handleSubmit();
      }
    }
  
    
    
  
    
     const scrollViewProps = Platform.select({
      ios: {
        contentInsetAdjustmentBehavior: 'automatic',
      },
      android: {
        keyboardShouldPersistTaps: 'handled',
      },
    });
    
  
  
   
    
  
    const handleSubmit = async () => {
     
      console.log("State:", { person_name, message, location, email, phone,portfolio_id,vendor_id,event_date});
      
  
    
      try {
        await axios.post('https://caterstation.pro/api/service-order', {
          name:person_name, // Change to match the names used in Laravel
          message: message,
          location: location,
          email: email,
          phone: phone,
          vendor_id: vendor_id,
          portfolio_id: portfolio_id,
          event_date:event_date,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
                  setModalVisible(true)

 
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false} {...scrollViewProps} contentContainerStyle={styles.container}>
        
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
              marginLeft: responsiveWidth(5),
              fontSize: responsiveFontSize(1.8),
              fontWeight: 'bold',
              marginTop: responsiveHeight(2),
            }}>
            Please let us know a bit more detail about your event
          </Text>
          {/* <View style={{paddingHorizontal:responsiveWidth(5), height:responsiveHeight(75)}}> */}
          <View style={[styles.commonBox, {justifyContent: 'center'}]}>
            <TextInput
              value={person_name}
              onChangeText={txt => setperson_name(txt)}
              placeholder="First Name"
              style={{fontSize: responsiveFontSize(1.8), color: black}}
              placeholderTextColor={black}
            />
          </View>
          
          <View style={[styles.commonBox, {justifyContent: 'center'}]}>
            <TextInput
              value={email}
              onChangeText={txt => setEmail(txt)}
              placeholder="Email"
              style={{fontSize: responsiveFontSize(1.8), color: black}}
              placeholderTextColor={black}
            />
          </View>
          <View style={[styles.commonBox, {justifyContent: 'center'}]}>
       
<Pressable onPress={handleOpen} style={[styles.pickerBtn, {  }]}>
<Text style={{ color: black, fontSize: responsiveFontSize(1.8) }}>{formattedDate}</Text>
      </Pressable>
    


        </View>
           {open && (
        // Integrate your chosen date picker library here (e.g., react-native-datepicker)
        // Replace with your library's specific syntax
        <View style={{alignItems:"center", justifyContent:"center"}}>
            <DatePicker
    textColor={styles.datePickerText.color}

          mode={'date'} // Ensure only date mode is used
          date={event_date} // Set initial date
          onDateChange={handleDateChange}
          // Add other relevant props as needed
        />
        </View>
      
      )}
  
         
          <View style={[styles.commonBox, {justifyContent: 'center'}]}>
            <TextInput
              value={phone}
              keyboardType='number-pad'
              onChangeText={txt => {
                setPhone(txt);
              }}
              placeholder="Phone"
              style={{fontSize: responsiveFontSize(1.8), color: black}}
              placeholderTextColor={black}
            />
          </View>
          <View style={[styles.commonBox, {justifyContent: 'center'}]}>
            <TextInput
              value={location}
              onChangeText={txt => {
                setlocation(txt);
              }}
              placeholder="Location"
              style={{fontSize: responsiveFontSize(1.8), color: black}}
              placeholderTextColor={black}
            />
          </View>
  
          <View style={[{height: responsiveHeight(15),  paddingVertical:responsiveHeight(2),
      width: responsiveWidth(90),
      backgroundColor: greyBg,
      paddingHorizontal: responsiveWidth(4),
      marginVertical: responsiveHeight(2),
      marginHorizontal: responsiveWidth(5),}]}>
            <TextInput
              numberOfLines={3}
              value={message}
              onChangeText={txt => {
                setmessage(txt);
              }}
              placeholder="Share your message here!"
              style={{
                fontSize: responsiveFontSize(1.8),
                color: black,
                justifyContent: 'center',
              }}
              placeholderTextColor={black}
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
            <View style={{ justifyContent: "center", alignItems: "center", width: responsiveWidth(100), marginBottom: responsiveHeight(5), marginTop: responsiveHeight(2) }}>
          <View style={{  backgroundColor: blue }}>
            <TouchableOpacity style={{height: responsiveHeight(4), width: responsiveWidth(40),justifyContent:"center", alignItems:"center", }}
             onPress={() => {handleEmpty() }}>
              <Text style={{ color: "white", fontWeight: "bold",textAlign:"center"  }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
          </View>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width:responsiveWidth(90),justifyContent:"center",alignItems:"center", marginTop:responsiveHeight(3),}}>
                        <Image source={require('../Images/Vector.png')}/>
                       
                        <Text style={{color:"white", marginTop:responsiveHeight(3), fontWeight: 'bold',}}>Received Query</Text>
                        <Text style={{color:"white",paddingHorizontal:responsiveWidth(5),textAlign:"center",marginTop:responsiveHeight(3), fontSize: responsiveFontSize(2),}}>
                        Thankyou! Team CaterStation will contact you soon!</Text>
            {/* <Image style={{marginTop:responsiveHeight(3)}} source={require('../Images/logos_whatsapp-icon.png')}/>  */}
            <Pressable
              style={{paddingVertical:responsiveHeight(1), paddingHorizontal:responsiveWidth(20), backgroundColor:white,marginTop:responsiveHeight(6)}}
              onPress={() => {setModalVisible(!modalVisible), navigation.navigate("ForYou")}}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
            </View>
           
           
          </View>
        </View>
      </Modal>
  
          {/* </View> */}
        </ScrollView>
      {/* </SafeAreaView> */}
      </KeyboardAvoidingView>
    );}
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
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
    //   textAlign: 'center',
      justifyContent:"center"
      
    },
   
    commonBox: {
      height: responsiveHeight(6),
      width: responsiveWidth(90),
      backgroundColor: greyBg,
      paddingHorizontal: responsiveWidth(4),
      marginVertical: responsiveHeight(2),
      marginHorizontal: responsiveWidth(5),
    },
    // container: {padding: 16},
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
  
    selectedTextStyle: {
      fontSize: responsiveFontSize(1.8),
      color: black,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
    tabbar: {
      backgroundColor: '#ffffff',
    },
    tabLabel: {
      color: '#000000',
      // backgroundColor:"red"
      // marginTop:20
    },
    indicator: {
      backgroundColor: yellow,
      height: 50,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        // margin: 20,
        backgroundColor: blue,
        height:responsiveHeight(35),
        width:responsiveWidth(90),
        
      },
      button: {
       
        paddingHorizontal: responsiveWidth(5),
        paddingVertical:responsiveHeight(2)
        
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor:blue ,
      },
      textStyle: {
        color: blue,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      datePickerText: {
        color: blue, // Change to your desired text color
      },
  });
  
  

export default ServiceOrderDetails