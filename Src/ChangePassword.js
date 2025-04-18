import { View, Text ,StyleSheet, TextInput , Pressable} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { black, blue, greyBg, greyDark, lightgrey, white } from './Colors';
import { useNavigation } from '@react-navigation/native'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'


const ChangePassword = () => {
   const navigation=useNavigation();
   const [password,setpss]=useState();
   const [confirmPassword, setCpass]=useState();
   const handleSubmit = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
  
    try {
      const response = await axios.post('https://caterstation.pro/api/', {
        // email,
        password, // Assuming phone is the correct state variable name
        // password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    //   console.log('POST request successful fromlogin apiss:', response.data);
    // navigation.navigate("Otp")


      // Handle successful response
    } catch (error) {
      console.error('Error in POST request:', error);
      console.error('Error in POST request:', error.response.data);
      setError(error.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ height:responsiveHeight(100)}}>
         <View
            style={{ flexDirection: "row", width: responsiveWidth(100), paddingVertical: responsiveHeight(2), paddingHorizontal: responsiveWidth(5), alignItems: "center", borderBottomColor: greyBg, borderBottomWidth: 1 ,}}>
            <FontAwsome name="angle-left" color={"black"} size={20} />

            <Text style={{ marginLeft: responsiveWidth(28), color: black, fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>Change Password</Text>
          </View>

          
                <View style={styles.txtInput}>
               <TextInput placeholderTextColor={black} value={password} onChange={txt=>(txt)} placeholder='New Password'/>

                </View>

                <View style={styles.txtInput}>

                </View>

          <View style={{justifyContent:"center",alignItems:"center", marginTop:responsiveHeight(5), marginBottom:responsiveHeight(5)}}>
                        <Pressable onPress={()=>{
                          handleSubmit()
                          navigation.navigate('ProfilePage')}} style={{paddingHorizontal:responsiveWidth(15), paddingVertical:responsiveHeight(1.5), backgroundColor:blue}}><Text style={{color:white}}>Save Changes</Text></Pressable>

                    </View>


    </View>
    
  )
}
const styles=StyleSheet.create({
    txtInput:{
        borderBottomWidth:responsiveWidth(.1),
        borderBottomColor:greyDark,
        marginHorizontal: responsiveWidth(4),
        marginBottom:responsiveHeight(1),
        height:responsiveHeight(6)

      },
      txt:{
        color:black,
        fontSize: responsiveFontSize(1.8),
      }
});

export default ChangePassword