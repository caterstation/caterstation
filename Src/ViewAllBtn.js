import { View, Text ,Pressable,StyleSheet} from 'react-native'
import React from 'react'
import { blue } from './Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


export const ViewAllBtn = ({  onPress  }) => {
  return (
    // style={{marginTop:10,flexDirection:"row-reverse",marginLeft:8}}
    <View >
    <Pressable onPress={onPress} 
    style={styles.ViewAllBtn}>
<Text style={[styles.fontColor,{textAlign:"center",fontSize:responsiveFontSize(1.6),fontWeight:"bold"}]}>View All</Text>
</Pressable>
</View>
  )
}
const styles=StyleSheet.create({
    ViewAllBtn:{
        paddingHorizontal:responsiveWidth(1),paddingVertical:responsiveHeight(1),width:responsiveWidth(20), borderRadius:5,borderWidth:1,borderColor:"#BEBEBE",
      },
      fontColor:{
        color:blue,
      },
  
});

export default ViewAllBtn