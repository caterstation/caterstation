import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Einvites from './Einvites';

import NewNAvigation from './NewNAvigation';
import NavProfile from './NavProfile';

import Pakagenavigation from './Pakagenavigation';
import {white, Lblue, greyMedium} from './Colors';
import ForYouNavigation from './ForYouNavigation';

import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const TabBarIcon = ({routeName, focused}) => {
  let icon;

  switch (routeName) {
    case 'ForYou':
      icon = focused
        ? require('../Images/bottomTab/home_active.png')
        : require('../Images/bottomTab/home.png');
      break;
    case 'Vendor':
      icon = focused
        ? require('../Images/bottomTab/vendor_active.png')
        : require('../Images/bottomTab/vendor.png');
      break;
    case 'E-invites':
      icon = focused
        ? require('../Images/bottomTab/e-invite_active.png')
        : require('../Images/bottomTab/e-invite.png');
      break;
    case 'Packages':
      icon = focused
        ? require('../Images/bottomTab/packages_active.png')
        : require('../Images/bottomTab/packages.png');
      break;
    case 'Profile':
      icon = focused
        ? require('../Images/bottomTab/profile_active.png')
        : require('../Images/bottomTab/profile.png');
      break;
  }

  return (
    <View style={styles.bottomTb}>
      <Image source={icon} style={styles.tabImage} />
    </View>
  );
};

const BottomTab = () => {
  const BottomTabNav = createBottomTabNavigator();
  return (
    /*  <SafeAreaView style={{flex: 1, backgroundColor: '#add8e6'}}> */
    <BottomTabNav.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyles,
        tabBarLabel: ({focused}) => {
          const labelColor = focused ? Lblue : greyMedium;
          return (
            <Text style={[styles.tabLabel, {color: labelColor}]}>
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({focused}) => (
          <TabBarIcon routeName={route.name} focused={focused} />
        ),
        headerShown: false,
      })}>
      <BottomTabNav.Screen name="ForYou" component={ForYouNavigation} />
      <BottomTabNav.Screen name="Vendor" component={NewNAvigation} />
      <BottomTabNav.Screen name="E-invites" component={Einvites} />
      <BottomTabNav.Screen name="Packages" component={Pakagenavigation} />
      <BottomTabNav.Screen name="Profile" component={NavProfile} />
    </BottomTabNav.Navigator>
    /*  </SafeAreaView> */
  );
};

const styles = StyleSheet.create({
  bottomTb: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabImage: {
    // width: 24,
    // height: 24,
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },
  tabLabel: {
    fontSize: responsiveFontSize(1.2),
    fontWeight: '500',
   // marginTop: -20,
  },
  tabBarStyles:{
    position: 'absolute',
    height: 80,
    paddingBottom: 10,
    backgroundColor: white,
    borderTopWidth: 0,
    elevation: 5,
    // marginTop: -20,
  },
});

export default BottomTab;
