import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import ViewAllVendors from './ViewAllVendors'
import ForYou from './ForYou';
import ViewAllVendors from './ViewAllVendors';
// import myALLVendors from './myALLVendors'

export const ForYouNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ForYouNav">
      <Stack.Screen
        name="ForYouNav"
        component={ForYou}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewAllVendors"
        component={ViewAllVendors}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ForYouNavigation;
