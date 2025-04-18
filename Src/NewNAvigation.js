import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import ViewAllVendors from './ViewAllVendors'
import VendorTab from './VendorTab'
import ViewAllVendors from './ViewAllVendors'
// import myALLVendors from './myALLVendors'


export const NewNAvigation = () => {
    const Stack=createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='VendorTab'> 

          <Stack.Screen 
          name='VendorTab' 
          component={VendorTab}
           options={{headerShown:false}}
           />
          <Stack.Screen
          name="ViewAllVendors"
          component={ViewAllVendors}
          options={{headerShown: false}}
        />




          
        </Stack.Navigator>
  )
}

export default NewNAvigation