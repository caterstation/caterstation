// import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// // import Home from './Home';
// import ForYou from './ForYou';
// import Vendor from './VendorTab';
// import Einvites from './Einvites';
// import Fontisto from 'react-native-vector-icons/Fontisto'


// // import PackagesMenu from './Packages';
// import Packages from './Packages';
// // import Example from './Example';
// import AllPagesButtons from './AllPagesButtons';
// import { createStackNavigator } from '@react-navigation/stack'

// import NewNAvigation from './NewNAvigation';
// import NavProfile from './NavProfile';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import Pakagenavigation from './Pakagenavigation';




// const BottomTab = () => {
//   const BottomTab = createBottomTabNavigator();
//   const Stack = createStackNavigator();


//   return (

//     <BottomTab.Navigator
//       screenOptions={() => ({
//         tabBarHideOnKeyboard: true,
//         tabBarLabelStyle: { color: "black", fontSize: responsiveFontSize(1.5), fontWeight: "bold" },
//         tabBarStyle: {
//           display: 'flex',
//           position: 'absolute',

//           height: responsiveHeight(9),
//           paddingBottom: responsiveHeight(.5),
//         },
//         tabBarShowLabel: true,
//         headerShown: false,
//       })}>

//       <BottomTab.Screen
//         name='ForYou'
//         component={ForYou}
//         options={{
//           headerShown: false, tabBarIcon: () => {
//             return (
//               <View style={styles.bottomTb}>
//                 <Image style={styles.tabImage} source={require("../Images/foryou.png")} />

//                 {/* <FontAwsome name="home" color={"yellow"} size={22}/> */}
//               </View>
//             )
//           }
//         }}
//       />
//       <BottomTab.Screen
//         initialRouteName='Vendor'
//         name='Vendor'
//         component={NewNAvigation}
//         options={{
//           headerShown: false, tabBarIcon: () => {
//             return (
//               <View style={styles.bottomTb}>
//                 <Image style={styles.tabImage} source={require("../Images/vendors.png")} />
//                 {/* <Fontisto name="person" color={"#383838"} size={14}/> */}

//               </View>
//             )
//           }
//         }}
//       />

//       <BottomTab.Screen
//         name='E-invites'
//         component={Einvites}
//         options={{
//           headerShown: false, tabBarIcon: () => {
//             return (
//               <View style={styles.bottomTb}>
//                 <Image style={styles.tabImage} source={require("../Images/einvite.png")} />
//               </View>
//             )
//           }
//         }}
//       />
//       <BottomTab.Screen
//         name='Packages'
//         component={Pakagenavigation}
//         options={{
//           headerShown: false, tabBarIcon: () => {
//             return (
//               <View style={styles.bottomTb}>
//                 <Image style={styles.tabImage} source={require("../Images/packages.png")} />
//               </View>
//             )
//           }
//         }}
//       />
//       <BottomTab.Screen
//         name='Profile'
//         component={NavProfile}
//         options={{
//           headerShown: false, tabBarIcon: () => {
//             return (
//               <View style={styles.bottomTb}>
//                 <Image style={styles.tabImage} source={require("../Images/profile.png")} />

//               </View>
//             )
//           }
//         }}
//       />

//       {/* <BottomTab.Screen
//         name='AllPagesButtons'
//         component={AllPagesButtons}
//         options={{
//           headerShown: false, tabBarIcon: () => {
//             return (
//               <View style={styles.bottomTb}>
//                 <Image style={styles.tabImage} source={require("../Images/profile.png")} />

//               </View>
//             )
//           }
//         }}
//       /> */}



//     </BottomTab.Navigator>

//   )
// }
// const styles = StyleSheet.create({
//   bottomTb: {
//     // backgroundColor: "#E8E8E8",
//     // paddingVertical: responsiveHeight(1),
//     // paddingHorizontal: responsiveWidth(1.8),
//     // borderRadius: 50,
//   },
//   tabImage: {
//     // width:14,height:14
//   }
// })

import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ForYou from './ForYou';
import Vendor from './VendorTab';
import Einvites from './Einvites';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Packages from './Packages';
import AllPagesButtons from './AllPagesButtons';
import { createStackNavigator } from '@react-navigation/stack';
import NewNAvigation from './NewNAvigation';
import NavProfile from './NavProfile';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Pakagenavigation from './Pakagenavigation';
import { white } from './Colors';

const BottomTab = () => {
  const BottomTab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* <StatusBar
barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
  backgroundColor={Platform.OS === 'android' ? '#fff': undefined}
/> */}
      <BottomTab.Navigator
        screenOptions={() => ({
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: { color: "black", fontSize: responsiveFontSize(1.5), fontWeight: "bold" },
          tabBarStyle: {
            display: 'flex',
            position: 'absolute',
            height: responsiveHeight(9),
            paddingBottom: responsiveHeight(0.5),
          },
          tabBarShowLabel: true,
          headerShown: false,
        })}
      >
        <BottomTab.Screen
          name='ForYou'
          component={ForYou}
          
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View style={styles.bottomTb}>
                <Image style={styles.tabImage} source={require("../Images/foryou.png")} />
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name='Vendor'
          component={NewNAvigation}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View style={styles.bottomTb}>
                <Image style={styles.tabImage} source={require("../Images/vendors.png")} />
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name='E-invites'
          component={Einvites}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View style={styles.bottomTb}>
                <Image style={styles.tabImage} source={require("../Images/einvite.png")} />
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name='Packages'
          component={Pakagenavigation}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View style={styles.bottomTb}>
                <Image style={styles.tabImage} source={require("../Images/packages.png")} />
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name='Profile'
          component={NavProfile}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <View style={styles.bottomTb}>
                <Image style={styles.tabImage} source={require("../Images/profile.png")} />
              </View>
            ),
          }}
        />
      </BottomTab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomTb: {
    // Customize as needed
  },
  tabImage: {
    // Customize as needed
  }
});

export default BottomTab;

// export default BottomTab  