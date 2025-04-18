import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const One = () => {
    const navigation=useNavigation();

  return (
    <View>
      <Text  style={{fontSize:20}} onPress={()=>{navigation.navigate('Two')}}>
      i'm  One</Text>
    </View>
  )
}

export default One