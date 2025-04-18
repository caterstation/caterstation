import { View, Text, Image, ScrollView, TextInput, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { black, greyBg, white, lightgrey, blue } from './Colors';
import BackArrow from './BackArrow';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import HorizontalBar from './HorizontalBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const PackageORderSummary = ({route}) => {
    const myData = useSelector(state => state.package.cart);
    const totalBil = myData.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.quantity; // Assuming each item has a 'price' property
    }, 0);
    const {f_name,l_name,passid ,phone}=route.params;
    console.log('Name : ',f_name,l_name)
    const name= `${f_name} ${l_name}`
    const navigation = useNavigation();
    let quantity=[];
    let Pname=[];
    const cartItems = myData.map(obj => {
         quantity= obj.quantity;
         Pname= obj.package_name
        return {
          quantity,
        
          Pname,
       
         
        };
      });
      console.log('ct', cartItems);
      console.log('cartItems.quantity', quantity);

  useEffect(()=>{
  console.log('my data from order summary ',myData)
//   console.log('my data from cart ',DataCart)

  },[])


    return (
        <SafeAreaView style={{ backgroundColor: white, flex: 1,}}>
            {/* <ScrollView> */}
         

<View style={{paddingHorizontal:responsiveWidth(1.5)}}>
                <FlatList


                    data={cartItems}
                    renderItem={(item)=>{
                        console.log("item", item)
                        return(
                            <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: responsiveHeight(2) }}>
                            {/* <Text  style={styles.txt}>Package Name</Text> */}
                            <Text numberOfLines={4}style={styles.txt}>{item.item.Pname}</Text>
                        <Text style={styles.txt}>{quantity} Guests</Text>

                        </View>
                        )

                    }}


                    ListHeaderComponent={()=>{return(

                        <>
                            <View>
                            <HorizontalBar backPress={() => navigation.goBack()} title="Order Summary" /> 
                <View style={{ width: responsiveWidth(100),  backgroundColor: lightgrey, flexDirection: "column", paddingTop: responsiveHeight(1), paddingBottom: responsiveHeight(2), paddingLeft: responsiveWidth(2), marginVertical: responsiveHeight(2), }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: responsiveWidth(60), marginTop: responsiveHeight(1.2) }}>

                        <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center", }}>
                            {/* <Text style={{borderRadius: 30,backgroundColor:"green",fontSize:responsiveFontSize(7), width:responsiveWidth(15), height:responsiveHeight(9),textAlign:"center", paddingBottom:responsiveHeight(0.5)}}>D</Text> */}
                            {/* <Image style={{ width: responsiveWidth(15), height: responsiveHeight(8), borderRadius: 50 }} source={require('../Images/sofa.jpg')} /> */}
                        
          <FontAwesome5 name="shopping-cart" color={'#383838'} size={55} />
                        
                        </View>
                        <View style={{ width: responsiveWidth(65), paddingTop: responsiveHeight(1.5), paddingLeft: responsiveWidth(5) }}>
                            <Text style={{ color: black, fontSize: responsiveFontSize(2.2), fontWeight: 'bold', }}>{name}</Text>
                            <Text style={{ color: black, fontSize: responsiveFontSize(1.8), fontWeight: 'bold', }}>{passid}</Text>


                        </View>






                    </View>



                </View>
                <Text style={{ color: black, fontWeight: "bold", fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(1), }}>Package Order Summary</Text>
                <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: responsiveHeight(2) }}>
                        <Text style={styles.txt}>Name</Text>
                        <Text style={styles.txt}>{name}</Text>
                    </View>
                            </View>

                        </>
                    )}}
                    
                    
                    ListFooterComponent={()=>{return(
                            <>
                            <View>
                       

                    
                 
                  
                 
                
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: responsiveHeight(2) }}>
                        <Text style={styles.txt}>Phone</Text>
                        <Text style={styles.txt}>{phone}</Text>
                    </View>
                  
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: responsiveHeight(2) }}>
                        <Text style={styles.txt}>Number of Guests</Text>
                        <Text style={styles.txt}>{quantity}</Text>
                    </View>
                   
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: responsiveHeight(2) }}>
                        <Text style={styles.txt}>Total Amount</Text>
                        <Text style={styles.txt}>{totalBil}</Text>
                    </View>
                   
                   
                 

                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: responsiveHeight(3), marginBottom: responsiveHeight(5) }}>
                        <Pressable onPress={() => { navigation.navigate('ConfirmPayment', {passid}) }} style={{ paddingHorizontal: responsiveWidth(15), paddingVertical: responsiveHeight(1.5), backgroundColor: blue }}><Text style={{ color: white }}>Submit Order</Text></Pressable>

                    </View>



                            </View>
                            </>


                    )}}
                    />




                   
                   
                    
</View>
                

            {/* </ScrollView> */}

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    txt: {
        color: black,
        fontSize: responsiveFontSize(1.8),
    }
});

export default PackageORderSummary