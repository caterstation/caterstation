import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const Three = () => {
    const navigation=useNavigation();

  return (
    <View>
      <Text> i'm Three</Text>
    </View>
  )
}

export default Three