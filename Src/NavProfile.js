import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfilePage from './ProfilePage';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import About from './About';
import MyOrders from './MyOrders';
import TermsCondition from './TermsCondition';



export const NavProfile = () => {
    const Stack=createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='ProfilePage'> 
    <Stack.Screen name='ProfilePage' component={ProfilePage} options={{headerShown:false}}/>
    <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown:false}}/>
    <Stack.Screen name='ChangePassword' component={ChangePassword} options={{headerShown:false}}/>
    <Stack.Screen name='About' component={About} options={{headerShown:false}}/>
    <Stack.Screen name='MyOrders' component={MyOrders} options={{headerShown:false}}/>
    <Stack.Screen name='TermsCondition' component={TermsCondition} options={{headerShown:false}}/>
    
  </Stack.Navigator>
  )
}

export default NavProfile