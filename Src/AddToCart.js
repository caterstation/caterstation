// import {
//   FlatList,
//   Image,
//   Modal,
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useState} from 'react';
// import {black, blue, greyBg, lightgrey, white} from './Colors';
// // import {updateQuantity, removeFromCart } from './cartSlice';
// import {removeAllFromCart, removeFromCart, updateQuantity} from './redux/MyPackageSlice';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {useDispatch, useSelector} from 'react-redux';

// import BackArrow from './BackArrow';
// import UiAddToCart from './UiAddToCart';
// import {useNavigation} from '@react-navigation/native';
// import { Alert } from 'react-native';
// import HorizontalBar from './HorizontalBar';

// const AddToCart = () => {
//   const navigation = useNavigation();
//   const myPackages = useSelector(state => state.package.cart);
//   const [oID, setoID]=useState()
//   const totalBil = myPackages.reduce((totalPrice, item) => {
//     return totalPrice + item.price * item.quantity; // Assuming each item has a 'price' property
//   }, 0);
//   const dispatch = useDispatch();

//   const handleRemoveAll = () => {
//     dispatch(removeAllFromCart('')); // Dispatch the action to remove all items
//   };




//   return (
//     <SafeAreaView style={{flex:1, backgroundColor:white}}>
//       <FlatList
//         ListHeaderComponent={
//           <HorizontalBar backPress={() => navigation.goBack()} title="Add To Cart" /> 
//         }
//         data={myPackages}
//         renderItem={item => <UiAddToCart item={item} />}
//         ListFooterComponent={
//           <View style={{marginHorizontal: responsiveWidth(5)}}>
//              { myPackages.length>0?
//              <View>
//             <View style={{ flexDirection:"row"}}>
//               <View style={{width:responsiveWidth(70)}}><Text style={{color:blue, fontWeight: 'bold',fontSize: responsiveFontSize(2),}}>Total Amount = {totalBil} Pkr</Text></View>
//               <Pressable onPress={handleRemoveAll} style={{width:responsiveWidth(20), flexDirection:"row-reverse"}}><Text style={{color:blue, fontWeight: 'bold',fontSize: responsiveFontSize(2),}}>Clear</Text></Pressable>
//               </View>
//               <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginTop: responsiveHeight(3),
//                 marginBottom: responsiveHeight(5),
//               }}>
//               <Pressable
//                 onPress={() => {
//                     { myPackages.length>0?
//                   navigation.navigate('PackageUserDetails')
//                    : Alert.alert("No Package Selected")
//                   }
//                 }}
//                 style={{
//                   paddingHorizontal: responsiveWidth(15),
//                   paddingVertical: responsiveHeight(1.5),
//                   backgroundColor: blue,
//                 }}>
//                 <Text style={{color: white}}>Checkout</Text>
//               </Pressable>
//             </View>
//               </View>
//            :
           
//            <View style={styles.screen}>
//       <View style={styles.container}>
//         <Text style={styles.text}>Cart is Empty</Text>
//       </View>
//     </View>
            
//             }
           
           
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: 16,
//   },
//   image: {
//     width: 64,
//     height: 64,
//     marginRight: 16,
//   },
//   text: {
//     fontSize: 24,
//   },
//   shadowcard: {
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     // Android elevation (for consistent shadow on Android)
//     elevation: 5,
//     // Additional styles
//     backgroundColor: '#fff', // Example background color
//     // padding: 20, // Example padding
//     paddingHorizontal: responsiveWidth(2),
//     paddingVertical: responsiveHeight(1.5),
//   },
//   txt: {
//     color: black,
//     fontSize: responsiveFontSize(1.8),
//   },
//   screen: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "red"
//   },
//   text: {
//     color: 'blue',
//     fontSize: responsiveFontSize(2)
//   }
// });
// export default AddToCart;


import {
  FlatList,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { removeAllFromCart, removeFromCart, updateQuantity } from './redux/MyPackageSlice';
import { black, blue, greyBg, lightgrey, white } from './Colors';
import BackArrow from './BackArrow';
import UiAddToCart from './UiAddToCart';
import HorizontalBar from './HorizontalBar';

const AddToCart = () => {
  const navigation = useNavigation();
  const myPackages = useSelector(state => state.package.cart);
  const [oID, setoID] = useState();
  const totalBil = myPackages.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity; // Assuming each item has a 'price' property
  }, 0);
  const dispatch = useDispatch();

  const handleRemoveAll = () => {
    dispatch(removeAllFromCart('')); // Dispatch the action to remove all items
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
            <HorizontalBar backPress={() => navigation.goBack()} title="Add To Cart" />

      {myPackages.length > 0 ? (
        <FlatList
          // ListHeaderComponent={
          // }
          data={myPackages}
          renderItem={item => <UiAddToCart item={item} />}
          ListFooterComponent={
            <View style={{ marginHorizontal: responsiveWidth(5) }}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: responsiveWidth(70) }}>
                    <Text style={{ color: blue, fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>
                      Total Amount = {totalBil} Pkr
                    </Text>
                  </View>
                  <Pressable
                    onPress={handleRemoveAll}
                    style={{ width: responsiveWidth(20), flexDirection: "row-reverse" }}
                  >
                    <Text style={{ color: blue, fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>
                      Clear
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: responsiveHeight(3),
                    marginBottom: responsiveHeight(5),
                  }}
                >
                  <Pressable
                    onPress={() => {
                      myPackages.length > 0
                        ? navigation.navigate('PackageUserDetails')
                        : Alert.alert("No Package Selected");
                    }}
                    style={{
                      paddingHorizontal: responsiveWidth(15),
                      paddingVertical: responsiveHeight(1.5),
                      backgroundColor: blue,
                    }}
                  >
                    <Text style={{ color: white }}>Checkout</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          }
        />
      ) : (
        <View style={styles.screen}>
          <View style={styles.container}>
            <Text style={styles.emptyText}>Cart is Empty</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  shadowcard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.5),
  },
  txt: {
    color: black,
    fontSize: responsiveFontSize(1.8),
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    width: '100%',
    height: '100%',
  },
  emptyText: {
    color: blue,
    fontSize: responsiveFontSize(2),
  }
});

export default AddToCart;

