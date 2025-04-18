
//my code



import { View, Text, StyleSheet, FlatList, Image, Pressable, Button, TextInput, ScrollView, Platform, KeyboardAvoidingView, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { black, blue, greyBg, greyDark, white } from './Colors';
import { useNavigation } from '@react-navigation/native'
// import DateTimePicker from '@react-native-community/datetimepicker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import DatePicker from 'react-native-date-picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackArrow from './BackArrow';
import axios from 'axios';
import { useSelector } from 'react-redux';
import HorizontalBar from './HorizontalBar';
import Heading from './Heading';
import Title from './Title';



const WedCardDetails = ({ route }) => {
  const { card } = route.params;
  const { picCard } = route.params;
  const user = useSelector(state => state.user.user);

  
  console.log('====================================');
  console.log(card);
  console.log('picCard', picCard);
  console.log('====================================');
  const navigation = useNavigation();

  const scrollViewProps = Platform.select({
    ios: {
      contentInsetAdjustmentBehavior: 'automatic',
    },
    android: {
      keyboardShouldPersistTaps: 'handled',
    },
  });

  const [bride_name, setBrideName] = useState('');
  const [groom_name, setGroomName] = useState('');
  const [company_name, setCompanyName] = useState('');
   const [event_time, setEventTime] = useState('');
  const [event_type, setEventType] = useState('');
  const [phone, setphone] = useState('');
  const [note, setNote] = useState('No note right now');
  const [venue, setVenue] = useState('');
  const [image, setImage] = useState(picCard);
const [modalVisible, setModalVisible] = useState(false);




  const [date, setDate] = useState(new Date());
  const [event_date, setEventDate] = useState('');
 
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

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDisplayTime(formatTime(selectedDate));
    setOpen(false);
  };



  const navigateToLogin = () => {
      
    // navigation.navigate('Login');
    
      navigation.reset({
    index: 0,
    routes: [{ name: 'AuthNav' }]
});



  };




  const showAlert = () => {
    // handleClosePress();
    setBrideName('');
      setCompanyName('');
      setDate(new Date());
      setDate1(new Date());
      setDisplayTime('');
      setEventDate('');
      setEventTime('');
      setGroomName('');
      setImage('');
      setVenue('');
      setphone('')
    Alert.alert(
      "No user found",
      "Would you like to go to the login screen?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Login", 
          onPress: navigateToLogin 
        }
      ],
      { cancelable: false }
    );
  };
  const handleEmpty = () => {
    if (user=="") {
      showAlert();
      
    } 
    else if(!bride_name || !groom_name || !event_date || !event_time || !venue ||!phone){
Alert.alert("Warning!!!","Fill the all fields");
    } 
    else if(!bride_name || !company_name|| !event_date || !event_time || !venue ||!phone){
Alert.alert("Fill the all fields");
    }
    else {
      handleSubmit();
      setBrideName('');
      setCompanyName('');
      setDate(new Date());
      setDate1(new Date());
      setDisplayTime('');
      setEventDate('');
      setEventTime('');
      setGroomName('');
      setImage('');
      setVenue('');
      setphone('')
    }
  };
  // const [modalVisible, setModalVisible] = useState(false);

  // Define a function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleSubmit = async () => {
    try {
      await axios.post('https://caterstation.pro/api/einvite-order', {
        bride_name,
        groom_name,
        event_date: formattedDate1,
        event_time: displayTime,
        venue,
        image: picCard, // Pass the image name here if required
        note,
        company_name,
        event_type,
        phone,
      });
      setModalVisible(true);
    } catch (error) {
      if (error.response) {
        console.error('HTTP error! status:', error.response);
      } else {
        console.error('Error from:', error.message);
      }
    }
  };

    
    

 

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView showsVerticalScrollIndicator={false} {...scrollViewProps} style={{flex:1, backgroundColor:white}}>
    <HorizontalBar backPress={() => navigation.goBack()} title="Preview" />



{
  card === "wed" ? 
  <View>
  <View style={[styles.PreviewImage]}>
    <Image style={{ height: responsiveHeight(48), width: responsiveWidth(70) }} source={{uri:picCard}} />
  </View>
  <View style={[styles.detailBox]} >
    
    <Heading style={{marginLeft: responsiveWidth(5),  marginBottom: responsiveHeight(2)}}>Enter your details here</Heading>
    {/* <Text style={[styles.detail]}></Text> */}
    <View>
      <View style={[{ flexDirection: "row", justifyContent: "space-around", width: responsiveWidth(100) }]}>

        <View style={{ width: responsiveWidth(45), height: responsiveHeight(10), }}>

          <Title style={{marginLeft: responsiveWidth(2)}}>Bride Name</Title>
          {/* <Text style={[{ marginLeft: responsiveWidth(2), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Bride Name</Text> */}
          <TextInput
            style={[styles.regNumTextInput]}
            placeholder='Bride Name'
            placeholderTextColor="grey"
            value={bride_name}
            onChangeText={txt => setBrideName(txt)}

          />
        </View>
        <View style={{ width: responsiveWidth(45), height: responsiveHeight(9), }}>
        <Title style={{marginLeft: responsiveWidth(2)}}>Groom Name</Title>

          {/* <Text style={[{ marginLeft: responsiveWidth(2), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}></Text> */}
          <TextInput
            style={[styles.regNumTextInput]}
            placeholder='Groom Name'
            placeholderTextColor="grey"
            value={groom_name}
            onChangeText={txt => {
              setCompanyName('None')
              setEventType('Wedding')
              setGroomName(txt)}}

          />
        </View>

      </View>
      <View>



        <View style={[{ flexDirection: "row", width: responsiveWidth(100), marginTop: responsiveHeight(2) }]}>
        
        
        <View style={{marginLeft: responsiveWidth(5),}}>
           <Title >Date</Title>
        </View>
         <View style={{marginLeft: responsiveWidth(42),}}>
           <Title>Time</Title>
        </View>
       


        {/* <Title style={{marginLeft: responsiveWidth(2)}}>Time</Title> */}

          {/* <Text style={[{ marginLeft: responsiveWidth(5), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Date</Text> */}
          {/* <Text style={[{ marginLeft: responsiveWidth(43), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Time</Text> */}

        </View>
        <View style={[{ flexDirection: 'row', marginTop: responsiveHeight(1), }]}>
          <Pressable onPress={() => {setOpen1(true)
            setEventDate(formattedDate1)
          }} style={[styles.pickerBtn,]}>
            <Text style={{ color: "grey", fontSize: responsiveFontSize(1.8) }}>
             {formattedDate1}

            </Text>
            
          </Pressable>
          <Pressable onPress={() => {setOpen(true)
            setEventTime(displayTime)
          }} style={[styles.pickerBtn, { marginLeft: responsiveWidth(5), }]}>
            <Text style={{ color: "grey", fontSize: responsiveFontSize(1.8) }}>
             {/* {formattedTime} */}
             {displayTime}

            </Text>
           
          </Pressable>




        </View>

        <View style={{ width: responsiveWidth(100), height: responsiveHeight(10), marginTop: responsiveHeight(2.5) }}>
        <View style={{ width: responsiveWidth(93), marginLeft: responsiveWidth(3.5),  }}>
        <Title style={{marginLeft: responsiveWidth(2),}} >Whatsapp Number</Title>

          {/* <Text style={[{ marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Whatsapp Number</Text> */}
          <TextInput
            style={[styles.regNumTextInput]}
            keyboardType='phone-pad'
            placeholder='Enter your Whatsapp Number'
            placeholderTextColor="grey"
            value={phone}
            onChangeText={txt => setphone(txt)}

          />
        </View>
        </View>

        <View>

        <Title style={{marginLeft: responsiveWidth(6),marginTop: responsiveHeight(2.5)}} >Venue</Title>


          {/* <Text style={[{ marginLeft: responsiveWidth(6), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", marginTop: responsiveHeight(2) }]}>Venue</Text> */}
          <TextInput
            style={[styles.VenueTextInput]}
            placeholder='Enter Your Venue'
            placeholderTextColor="grey"
            numberOfLines={3}
            value={venue}
            onChangeText={txt => setVenue(txt)}
          />

        </View>
       
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: responsiveHeight(3) }}>
          <Pressable onPress={()=>{
            // setCompanyName('None');
            setEventType('Wedding')
            handleEmpty()
            
            
            }} style={{ width: responsiveWidth(40), paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), backgroundColor: blue, justifyContent: "center", alignItems: "center", }}><Text style={{ color: "white", fontWeight: "bold", fontSize: responsiveFontSize(1.5) }}>Submit</Text></Pressable>

        </View>


      </View>
    </View>

  </View>

  
 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
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

<DatePicker
        modal
        open={open}
        date={date}
        mode="time"
        onConfirm={handleConfirm}
    textColor={styles.datePickerText.color}

        onCancel={() => setOpen(false)}
      />
  





  <DatePicker
    modal
    mode={"date"}
    open={open1}
    date={date1}
    onConfirm={(date2) => {
      setOpen1(false)
      setDate1(date2)
    }}
    textColor={styles.datePickerText.color}

    onCancel={() => {
      setOpen1(false)
    }}
  />
</View>  :


<View>
  <View style={[styles.PreviewImage]}>
    <Image style={{ height: responsiveHeight(48), width: responsiveWidth(70) }} source={{uri:picCard}} />
  </View>
  <View style={[styles.detailBox]} >
    <Text style={[styles.detail]}>Enter your details here</Text>
    <View>
      <View style={[{ flexDirection: "row", justifyContent: "space-around", width: responsiveWidth(100) }]}>

        <View style={{ width: responsiveWidth(45), height: responsiveHeight(10), }}>
          <View style={{marginLeft: responsiveWidth(2), }}>
            <Title>Name</Title>
          </View>
          {/* <Text style={[{ marginLeft: responsiveWidth(2), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Name</Text> */}
          <TextInput
            style={[styles.regNumTextInput]}
            placeholder='Name'
            placeholderTextColor="grey"
            value={bride_name}
            onChangeText={txt => setBrideName(txt)}

          />
        </View>
        <View style={{ width: responsiveWidth(45), height: responsiveHeight(9), }}>
        <View style={{marginLeft: responsiveWidth(2), }}>
            <Title>Company Name</Title>
          </View>
          {/* <Text style={[{ marginLeft: responsiveWidth(2), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Company Name</Text> */}
          <TextInput
            style={[styles.regNumTextInput]}
            placeholder='Company Name'
            placeholderTextColor="grey"
            value={company_name}
            onChangeText={txt =>{ 
              
              setGroomName('None')
              setEventType("Corporate")
              setCompanyName(txt)}}

          />
        </View>

      </View>
      <View>



        <View style={[{ flexDirection: "row", width: responsiveWidth(100), marginTop: responsiveHeight(2) }]}>

        <View style={{marginLeft: responsiveWidth(5),}}>
           <Title >Date</Title>
        </View>
         <View style={{marginLeft: responsiveWidth(42),}}>
           <Title>Time</Title>
        </View>


          {/* <Text style={[{ marginLeft: responsiveWidth(5), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Date</Text> */}
          {/* <Text style={[{ marginLeft: responsiveWidth(43), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Time</Text> */}

        </View>
        <View style={[{ flexDirection: 'row', marginTop: responsiveHeight(1), }]}>
          <Pressable onPress={() => {setOpen1(true)
            setEventDate(formattedDate1)
          }} style={[styles.pickerBtn,]}>
            <Text style={{ color: "grey", fontSize: responsiveFontSize(1.8) }}>
             {formattedDate1}

            </Text>
            
          </Pressable>
          <Pressable onPress={() => {setOpen(true)
            setEventTime(displayTime)
          }} style={[styles.pickerBtn, { marginLeft: responsiveWidth(5), }]}>
            <Text style={{ color: "grey", fontSize: responsiveFontSize(1.8) }}>
             {/* {formattedTime} */}
             {displayTime}

            </Text>
           
          </Pressable>




        </View>
        <View style={{ width: responsiveWidth(100), height: responsiveHeight(10), marginTop: responsiveHeight(2) }}>
        <View style={{ width: responsiveWidth(93), marginLeft: responsiveWidth(3.5),  }}>
        <Title style={{marginLeft: responsiveWidth(2)}}>Whatsapp Number</Title>
       
          {/* <Text style={[{ marginLeft: responsiveWidth(2),fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", }]}>Whatsapp Number</Text> */}
          <TextInput
            style={[styles.regNumTextInput]}
            keyboardType='phone-pad'
            placeholder='Enter your Whatsapp Number'
            placeholderTextColor="grey"
            value={phone}
            onChangeText={txt => setphone(txt)}

          />
        </View>
        </View>
        <View>


        <Title style={{marginLeft: responsiveWidth(6),marginTop: responsiveHeight(2)}}>Venue</Title>

          {/* <Text style={[{ marginLeft: responsiveWidth(6), fontSize: responsiveFontSize(1.8), color: blue, fontWeight: "bold", marginTop: responsiveHeight(2) }]}>Venue</Text> */}
          <TextInput
            style={[styles.VenueTextInput]}
            placeholder='Enter Your Venue'
            placeholderTextColor="grey"
            numberOfLines={3}
            value={venue}
            onChangeText={txt => setVenue(txt)}
          />

        </View>
       
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: responsiveHeight(3) }}>
          <Pressable onPress={()=>{
          
            handleEmpty()
            
            
            }} style={{ width: responsiveWidth(40), paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(1.5), backgroundColor: blue, justifyContent: "center", alignItems: "center", }}><Text style={{ color: "white", fontWeight: "bold", fontSize: responsiveFontSize(1.5) }}>Submit</Text></Pressable>

        </View>


      </View>
    </View>

  </View>

  {/* <DatePicker
    modal
    mode={"time"}
    open={open}
    date={date}
    onConfirm={(date3) => {
      setOpen(false)
      setDate(date3)
    }}
    onCancel={() => {
      setOpen(false)
    }}
  /> */}
 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
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

<DatePicker
        modal
        open={open}
        date={date}
        mode="time"
    textColor={styles.datePickerText.color}

        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
  





  <DatePicker
    modal
    mode={"date"}
    open={open1}
    date={date1}
    onConfirm={(date2) => {
      setOpen1(false)
      setDate1(date2)
    }}
    textColor={styles.datePickerText.color}

    onCancel={() => {
      setOpen1(false)
    }}
  />
</View>
}


  


    </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
 
  HeadingBlk: {
    paddingVertical: responsiveWidth(4),

   flexDirection:"row"
  },
  HeadingTxt: {
    color: blue,
    fontWeight: "bold",
    fontSize: responsiveFontSize(3),
    // textAlign: "center",
    marginLeft:responsiveWidth(30),
    width: responsiveWidth(100)
  },
  PreviewImage: {




    height: responsiveHeight(50), 
    justifyContent: "center", alignItems: "center",
  },
  detailBox: {
    marginVertical: responsiveHeight(3),
    paddingBottom: responsiveHeight(3)

  },
  detail: {
    fontSize: responsiveFontSize(2.5),
    color: blue, marginLeft: responsiveWidth(5), fontWeight: 'bold', marginBottom: responsiveHeight(2)
  },
  regNumTextInput: {
    marginTop: responsiveHeight(1),
    // width: "92%",
    height: responsiveHeight(6),
    borderColor: greyBg,
    borderWidth: 2,
    paddingHorizontal: responsiveWidth(3),
    // paddingTop: responsiveHeight(2),
    fontSize: responsiveFontSize(1.8),
    marginLeft: responsiveWidth(1),
    color:black

  },
  VenueTextInput: {

    width: responsiveWidth(92),
    marginTop: responsiveHeight(1),
    height: responsiveHeight(8),
    borderColor: greyBg,
    borderWidth: 2,
    paddingHorizontal: responsiveWidth(3),
    // paddingTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
    marginHorizontal: responsiveWidth(5),
    color:black,
    // backgroundColor:"red"
  },
  pickerBtn: {
    width: responsiveWidth(44),
    paddingVertical: responsiveHeight(2),
    paddingVertical: responsiveHeight(2),
    borderColor: greyBg,
    borderWidth: 2,
    paddingHorizontal: responsiveWidth(2),
    marginLeft: responsiveWidth(4)
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        // margin: 20,
        backgroundColor: blue,
        height:responsiveHeight(45),
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


export default WedCardDetails