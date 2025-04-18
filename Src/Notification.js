import { View, Text ,FlatList,Image} from 'react-native'
import React from 'react'
import BottomTab from './BottomTab'
import { black, greyBg, lightgrey } from './Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Notify = [ 
    { 
      id:"1", 
      title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",
    },

    { 
        id:"2", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      { 
        id:"3", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      { 
        id:"4", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      
      { 
        id:"4", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      
      { 
        id:"4", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      
      { 
        id:"4", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      
      { 
        id:"4", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      
      { 
        id:"4", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      
      { 
        id:"4", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      
      { 
        id:"4", 
        title:"Hey Admin , You received a new order.Hey Admin , You received a new order. Hey Admin , You received a new order.Hey Admin , You received a new order",

      },
      


];
const Notification = () => {
  return (
    <View style={{flex:1, backgroundColor:"white" }}>
        <View style={{borderBottomWidth:1, borderColor: greyBg,}}>
        <Text style={{fontSize:responsiveFontSize(3), textAlign:"center", fontWeight:"bold", paddingVertical:responsiveHeight(3),color:black}}>Notification</Text>

        </View>

        {/* <View style={{paddingBottom:50}}> */}

        <FlatList 
	data={Notify} 
	
  showsHorizontalScrollIndicator={false}
//   horizontal={true}
	// keyExtractor={item => item.id} 
  renderItem={({item})=><>
  
  <View >
  <View style={{flexDirection:"row", paddingHorizontal:responsiveWidth(2.5),borderBottomWidth:1, borderColor: greyBg,paddingVertical:responsiveHeight(1)}}>

                <Image style={{marginTop:responsiveHeight(.7)}} source={require('../Images/Vector-personBlack.png')}/>
                <Text style={{color:black, marginLeft:responsiveWidth(2.5), paddingRight:responsiveWidth(3), fontSize: responsiveFontSize(1.5),}}>{item.title}</Text>
                
            </View>
        </View>
  
  </>} 
	/> 
    {/* </View> */}



        

        {/* botton Tab */}
      
      <View style={{flex:1, justifyContent:"flex-end",}}>
      <View style={{ height:responsiveHeight(8), backgroundColor:"red",justifyContent:"flex-end"}}>
<BottomTab/>      

</View>
      </View>
    
    </View>
  )
}

export default Notification