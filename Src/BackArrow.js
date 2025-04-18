import { View, Text, Pressable } from 'react-native'
import React from 'react'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'


import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'


export const BackArrow = () => {
  const navigation = useNavigation();

  return (
    <View>
        <Pressable   style={{paddingHorizontal:responsiveWidth(4), height:responsiveHeight(3), }} onPress={()=>{ navigation.goBack()}} >
        <FontAwsome name="angle-left" color={"black"} size={20} />
        </Pressable>
      
    </View>
  )
}

export default BackArrow