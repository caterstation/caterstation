import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const Two = () => {
    const navigation=useNavigation();

  return (
    <View>
     <Text  style={{fontSize:20}} onPress={()=>{navigation.navigate('Three')}}>
      i'm  Two</Text>
    </View>
  )
}

export default Two