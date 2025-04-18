import { View, Text ,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import React,{useState} from 'react'
import {CountryPicker} from "react-native-country-codes-picker";

const MyNumber = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  return (
    <View style={{flex:1, backgroundColor:"pink"}}>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: '30%',
            height: 60,
            backgroundColor: 'white',
            padding: 10,
        }}
      >
        <Text style={{
            color: 'black',
            fontSize: 20
        }}>
            {countryCode}
        </Text>
      </TouchableOpacity>
      <View style={{backgroundColor:"white", width:"40%"}}>
      <TextInput  placeholder='Enter number'/>

      </View>

      {/* // For showing picker just put show state to show prop */}
      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
      </View>
  
    </View>
  )


}

export default MyNumber


