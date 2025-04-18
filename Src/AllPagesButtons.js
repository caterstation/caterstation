import { View, Text ,Pressable} from 'react-native'
import React from 'react'
import { black, blue } from './Colors'
import { useNavigation } from '@react-navigation/native'


const AllPagesButtons = () => {
  const navigation=useNavigation();

  return (
    <View >
       <View>
      <Text style={{fontWeight:"bold", color:black}}>Detail vendor wala page</Text>
      <Pressable onPress={()=>{
        navigation.navigate('DetailsVendora')
      }} style={{backgroundColor:blue, paddingHorizontal:20, paddingVertical:10, marginVertical:30}}>
        <Text style={{color:"white"}}>DetailedVendor.js</Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('OtpInp')
      }} style={{backgroundColor:blue, paddingHorizontal:20, paddingVertical:10, marginVertical:30}}>
        <Text style={{color:"white"}}>OtpInputs.js</Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('MyNumber')
      }} style={{backgroundColor:blue, paddingHorizontal:20, paddingVertical:10, marginVertical:30}}>
        <Text style={{color:"white"}}>MyNumber</Text>
      </Pressable>
    </View>
    </View>
  )
}

export default AllPagesButtons