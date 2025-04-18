import {  StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
    Pressable,
    
  } from 'react-native'
  import React ,{useState} from 'react'
  import FontAwsome from 'react-native-vector-icons/FontAwesome5'
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
  import Fontisto from 'react-native-vector-icons/Fontisto'
  import Ionicons from 'react-native-vector-icons/Ionicons'
  // import StarRating from 'react-native-star-rating-widget'
  import { AirbnbRating } from 'react-native-ratings'
import { create } from 'react-test-renderer'
import { blue, grey, greyBg ,yellow} from './Colors'
import { useNavigation } from '@react-navigation/native'
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import { useSelector } from 'react-redux'


export const HeaderHome = () => {
  const navigation=useNavigation();
  const myPackages = useSelector(state => state.package.cart);


    const DropCity = [
        {LabelCity: 'Lahore'},
        {LabelCity: 'Islamabad'},
        {LabelCity: 'Karachi'},
        
      
      ];
      
      
      const [clicked, setClicked] = useState(false);
      const [data, setData] = useState(DropCity);
      const [selectedLabelCity, setSelectedLabelCity] = useState('');
    
  return (
    <View style={styles.ForYouHeader}>
  {/* //DropDown view */}
  <View style={{flexDirection: 'row',}}>
           
        {/* <TouchableOpacity onPress={()=>{ navigation.goBack()}} style={{paddingHorizontal:responsiveWidth(2),paddingVertical:responsiveHeight(1), marginRight:responsiveWidth(1)}}>
           <Ionicons name="arrow-back" color={"#000D52"} size={18}/>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.DropDownCoverBox}
          onPress={() => {
            setClicked(!clicked);
          }}>
          <Text style={{fontWeight:'bold', color:"#000D52",fontSize:responsiveFontSize(2.2), paddingLeft:responsiveWidth(2)}}>
            {/* {selectedLabelCity == '' ? 'Location' : selectedLabelCity} */}
            Lahore
          </Text>
          
         
        </TouchableOpacity>
       
      </View>

    
      <View style={{flexDirection:'row'}}>

              <Pressable  style={styles.headerIcon}>
            <FontAwsome name="search" color={"#383838"} size={12}/>

              </Pressable>
              <Pressable
          onPress={() => {
            navigation.navigate('AddToCart');
          }}
          style={styles.headerIcon}>
          {}
          <FontAwesome5 name="shopping-cart" color={'#383838'} size={12} />


          {myPackages.length>0? <View style={{  position:  'absolute',
              top:-10, left:14, borderRadius:5, paddingHorizontal:responsiveWidth(1.5), paddingVertical:responsiveHeight(.2), }} >
          <Text style={{fontSize:responsiveFontSize(1.5),color:yellow, fontWeight:"bold", backgroundColor:blue, height:responsiveHeight(2.5), width:responsiveWidth(4.5), textAlign:"center", borderRadius:10}}>{myPackages.length}</Text>

          </View>:null}
         
        </Pressable>
              <Pressable onPress={()=>{navigation. navigate('Notification')}} style={styles.headerIcon}>
            <Ionicons name="notifications" color={"#383838"} size={14}/>

              </Pressable>
              {/* <Pressable onPress={()=>{navigation. navigate('OtpInputs')}} style={styles.headerIcon}>
            <Ionicons name="notifications" color={"#383838"} size={14}/>

              </Pressable> */}

      </View>
</View>
   
  )
}
const styles=StyleSheet.create({
   
        ForYouHeader:{
          height:responsiveHeight(7),
          paddingVertical:responsiveHeight(.4),
          justifyContent:"space-between",
          alignItems:"center",
          flexDirection:"row",
          paddingRight:responsiveWidth(2),
          paddingLeft:responsiveWidth(1),
          borderBlockColor:"#BEBEBE",
          borderBottomWidth:1,
        },
        DropDownCoverBox:{
          
          flexDirection: 'row',
          alignItems: 'center',
         
        },
        fontColor:{
          color:blue,
        },
        center:{
          justifyContent:"center",
          alignContent:"center",
        },
        DropDownBox:{
          elevation: 2,
          marginTop: 5,
         
          width: responsiveWidth(40),
          backgroundColor: '#fff',
          borderRadius: 10,
        },
        headerIcon:{
          width:responsiveWidth(7),
          height:responsiveHeight(4),
          paddingHorizontal:responsiveWidth(1), 
          paddingVertical:responsiveHeight(1), 
           backgroundColor:greyBg,
           borderRadius:30,
           justifyContent:"center",alignItems:"center",
           marginLeft:responsiveWidth(3)
          },
});
export default HeaderHome