import {Text, View} from 'react-native';

import PackageCheckout from './PackageCheckout';
import PackageDetails from './PackageDetails';
import PackageORderSummary from './PackageORderSummary';
import PackageUserDetails from './PackageUserDetails';
import Packages from './Packages';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PackageConfirmPAyment from './PackageConfirmPAyment';

// import AddToCart from './AddToCart';
// import UiAddToCart from './UiAddToCart';

const Pakagenavigation = () => {
  const Stack = createStackNavigator();

  return (
    // <Stack.Group  >
    <Stack.Navigator>
      <Stack.Screen
        name="Package"
        component={Packages}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name='AddToCart' component={AddToCart} options={{headerShown:false}}/>
    <Stack.Screen name='UiAddToCart' component={UiAddToCart} options={{headerShown:false}}/> */}

      {/* <Stack.Screen name="" component={} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="PackageDetails"
        component={PackageDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PackageORderSummary"
        component={PackageORderSummary}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PackageCheckout"
        component={PackageCheckout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PackageUserDetails"
        component={PackageUserDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PackageConfirmPAyment"
        component={PackageConfirmPAyment}
        options={{headerShown: false}}
      />

     
    </Stack.Navigator>
    // </Stack.Group>
  );
};

export default Pakagenavigation;
