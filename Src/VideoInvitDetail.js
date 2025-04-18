import { View, Text , StyleSheet,FlatList,Image,Pressable,Button,TextInput,ScrollView, Platform} from 'react-native'
import React,{useState} from 'react'
import { blue, greyBg, greyDark } from './Colors';
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';


const VideoInvitDetail = () => {
 
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
       const currentDate = selectedDate || date;
       setShow(Platform.OS === 'ios');
       setDate(currentDate);
    };
   
    const showMode = (currentMode) => {
       setShow(true);
       setMode(currentMode);
    };
   
    const showDatepicker = () => {
       showMode('date');
    };
   
    const showTimepicker = () => {
       showMode('time');
    };



  return (
    <ScrollView style={[styles.container]}>
     <View style={[styles.HeadingBlk]}>

      <Text style={[styles.HeadingTxt]}>Preview VideoInvite Card</Text>
    </View>
    <View style={[styles.PreviewImage]}>
                <Image style={{height:340, width:270}} source={require('../Images/invite2.png')}/>
    </View>
    <View style={[styles.detailBox]} >
        <Text  style={[styles.detail]}>Enter your details here</Text>
            <View>
                <View style={[{flexDirection:"row",justifyContent:"space-around", }]}>
        
                <View style={{width:"45%",}}>
                    <Text style={[{marginLeft:10,fontSize:14,color:blue,fontWeight:"bold",}]}>Bride Name</Text>
                   <TextInput 
              style={[styles.regNumTextInput]} 
              placeholder='Bride Name'
              placeholderTextColor="grey"
            
              />
                </View>
                <View style={{width:"45%",}}>

                <Text style={[{marginLeft:10,fontSize:14,color:blue,fontWeight:"bold", }]}>Groom Name</Text>

                   <TextInput 
              style={[styles.regNumTextInput]} 
              placeholder='Groom Name'
              placeholderTextColor="grey"
            
              />
                </View>
                </View>
                <View>
    


      <View style={[{flexDirection:'row', marginTop:10, paddingLeft:10, width:"100%", }]}>
      <Text style={[{marginLeft:10,fontSize:14,color:blue,fontWeight:"bold",}]}>Date</Text>
      <Text style={[{marginLeft:170,fontSize:14,color:blue,fontWeight:"bold",}]}>Time</Text>

        </View>
      <View style={[{flexDirection:'row', marginTop:5,}]}>
      <Pressable onPress={showDatepicker} style={[styles.pickerBtn,{marginRight:18}]}>
      <Text style={{color:"grey"}}>
        Enter your Date

        </Text>
        </Pressable>
      <Pressable onPress={showTimepicker} style={[styles.pickerBtn]}>
      <Text style={{color:"grey"}}>
      Enter your Time

        </Text>
        </Pressable>


        

      </View>
      <View>
      <Text style={[{marginLeft:22,fontSize:14,color:blue,fontWeight:"bold",marginTop:5}]}>Venue</Text>
      <TextInput 
              style={[styles.VenueTextInput]} 
              placeholder='Enter Your Venue'
              placeholderTextColor="grey"
              numberOfLines={3}
              />
        
      </View>
      <View style={{justifyContent:"center",alignItems:"center", marginTop:20}}>
      <Pressable style={{width:"40%",paddingHorizontal:20, paddingVertical:10, backgroundColor:blue,justifyContent:"center",alignItems:"center",}}><Text style={{color:"white", fontWeight:"bold", fontSize:14}}>Submit</Text></Pressable>

      </View>
      <View>
        

      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          textColor={blue}
          style={{ backgroundColor: blue}}
        />
      )}
    </View>
            </View>

    </View>

   


    </ScrollView>
  )
}
const styles=StyleSheet.create({
    container:{
            flex:1,
    },
    HeadingBlk:{
        height:60,
        // backgroundColor:"pink",
        justifyContent:"center",
        alignItems:"center"
    },
    HeadingTxt:{
        color:blue,
        fontWeight:"bold",
        fontSize:22,
        textAlign:"center",
        width:"100%"
    },
    PreviewImage:{
            height:350, justifyContent:"center",alignItems:"center"
    },
    detailBox:{
        marginTop:10,
        height:320,
        // backgroundColor:"red"
        marginBottom:50

    },
    detail:{
        fontSize:20,
        color:blue, marginLeft:20,fontWeight:'bold',marginBottom:20
    },
    regNumTextInput:{
        marginTop:5,
              width:"92%",
        
        height:40,
        borderColor:greyBg,
        borderWidth:2,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
        //     // Elevate the view to create a shadow effect
        // elevation: 4,
        paddingHorizontal:20,
        paddingTop:15,
        fontSize:14,
        marginLeft:5,
       
      },
    VenueTextInput:{
        
              width:"90%",
        marginTop:10,
        height:60,
        borderColor:greyBg,
        borderWidth:2,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
        //     // Elevate the view to create a shadow effect
        // elevation: 4,
        paddingHorizontal:20,
        paddingTop:15,
        fontSize:14,
        marginHorizontal:20
      },
      pickerBtn:{
        // backgroundColor:blue,
        width:"41.5%",
        // justifyContent:"center",
        // alignItems:"center",
        paddingVertical:9,
        borderColor:greyBg,
        borderWidth:2,
        paddingHorizontal:20,
        marginLeft:15
      }
    });
    


export default VideoInvitDetail