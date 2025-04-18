import { View, Text, Image, Pressable, Modal, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
// import BottomTab from './BottomTab'
import { black, blue, greyBg, lightgrey } from './Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './redux/MyUserSlice'
import axios from "axios";


const ProfilePage = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();



    const [modalVisible, setModalVisible] = useState(false);



    useEffect(() => {

        console.log('my data from redux', JSON.stringify(user, null, 2))
        // console.log("id", id)
        // console.log('my data from redux', JSON.stringify(user.email))

    }, [])

    // const email = user?.email;


    const removePhoneNumber = async () => {
        try {
            await AsyncStorage.removeItem('phoneNumber',);
            await AsyncStorage.removeItem('userInfo',);

            console.log('Phone number removed successfully!');

            dispatch(userLogin(''));
            // Reset the navigation stack and navigate to the 'Login' screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'AuthNav' }]
            });
        } catch (error) {
            console.error('Error removing phone number:', error);
        }
    };

    const handleSubmit = async () => {
        const id = user.id;

        const phoneNumber = await AsyncStorage.getItem('phoneNumber');


        if (!phoneNumber) {
            Alert.alert("No Account is Login")
        } else {

            try {
                const response = await axios.post('https://caterstation.pro/api/delete-user', {
                    id
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                // navigation.navigate("Login")
            

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthNav' }]
                });

                // Handle successful response
            } catch (error) {
                //   Alert.alert('Invalid or empty field  from login ')
                console.log('Error in POST request:', error);
                // console.log('Error in POST request:', error.response.data);
                // setError(error.response?.data?.message || 'An error occurred.');
            }


        }


    };



    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View style={{ marginTop: 10, height: 100, width: "100%", paddingTop: 25, flexDirection: "row", paddingRight: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: lightgrey, }}>
                <View style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 4,
                }}>
                    <View style={{
                        width: Math.min(responsiveWidth(15), responsiveHeight(15)),
                        height: Math.min(responsiveWidth(15), responsiveHeight(15)),
                        borderRadius: Math.min(responsiveWidth(15), responsiveHeight(15)) / 2, backgroundColor: '#ccc', justifyContent: "center", alignItems: "center",
                    }}>
                        <Ionicons name="person" color={'white'} size={30} />
                    </View>
                </View>


                {user==""?<Pressable style={{justifyContent:"center",alignItems:"center", width:responsiveWidth(30)}}
                 onPress={()=>{
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AuthNav' }]
                    });
                 }
                    
                  
                   
                    
                    
                    }>
                 {/* onPress={navigation.navigate("AuthNav")}> */}
                    
                    
                    <Text style={{color:black, fontWeight:"bold", fontSize:responsiveFontSize(2)}}>Login User</Text></Pressable>:
                
                <View style={{ width: responsiveWidth(70), paddingTop: 10, marginLeft: responsiveWidth(3) }}>
                    <Text style={{ color: black, fontWeight: "bold" }}>
                      
                        {user && user?.name != null ? user?.name : "User"}
                    </Text>
                    <Text>
                   
                        {user && user?.email != null ? user?.email : "Email"}

                    </Text>
                </View>
                }

              
                {/* <View style={{ width: responsiveWidth(70), paddingTop: 10, marginLeft: responsiveWidth(3) }}>
                    <Text style={{ color: black, fontWeight: "bold" }}>
                     
                        {user && user?.name != null ? user?.name : "User"}
                    </Text>
                    <Text>
                       
                        {user && user?.email != null ? user?.email : "Email"}

                    </Text>
                </View> */}



                
            </View>
            <View>


                {user==""?null:
                
                <Pressable
                onPress={() => { navigation.navigate("EditProfile") }}
                style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 15, borderBottomWidth: 1, borderColor: lightgrey, paddingVertical: 5 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('../Images/Vector-personBlack.png')} />
                    <Text style={{ fontWeight: "bold", color: black, marginLeft: 10 }}>Edit Profile</Text>

                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
                    <AntDesign name="right" style={{ marginTop: 3, fontWeight: "1000" }} color={black} size={14} />

                </View>

            </Pressable>
                
                }
           

                {/* <Pressable 
        onPress={()=>{navigation.navigate("MyOrders")}}
        style={{justifyContent:"space-between",flexDirection:"row", paddingHorizontal:15,borderBottomWidth:1, borderColor: lightgrey,paddingVertical:5}}>
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <Image source={require('../Images/order.png')}/>

                <Text style={{fontWeight:"bold", color:black, marginLeft:10}}>My Orders</Text>
                
            </View>
            <View style={{paddingHorizontal:20,paddingVertical:10,}}>
               <AntDesign name="right" style={{ marginTop: 3,fontWeight:"1000"}} color={black} size={14} />


            </View>

        </Pressable> */}
                <Pressable onPress={() => { navigation.navigate('About') }} style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 15, borderBottomWidth: 1, borderColor: lightgrey, paddingVertical: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('../Images/about.png')} />
                        <Text style={{ fontWeight: "bold", color: black, marginLeft: 10 }}>About</Text>

                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
                        <AntDesign name="right" style={{ marginTop: 3, fontWeight: "1000" }} color={black} size={14} />

                    </View>

                </Pressable>
                {/* <Pressable onPress={()=>{navigation.navigate('ChangePassword')}} style={{justifyContent:"space-between",flexDirection:"row", paddingHorizontal:15,borderBottomWidth:1, borderColor: lightgrey,paddingVertical:5}}>
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <Image source={require('../Images/about.png')}/>
                <Text style={{fontWeight:"bold", color:black, marginLeft:10}}>Change Password</Text>
                
            </View>
            <View style={{paddingHorizontal:20,paddingVertical:10,}}>
         <AntDesign name="right" style={{ marginTop: 3,fontWeight:"1000"}} color={black} size={14} />

            </View>

        </Pressable> */}
                <Pressable onPress={() => { navigation.navigate('TermsCondition') }} style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 15, borderBottomWidth: 1, borderColor: lightgrey, paddingVertical: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('../Images/about.png')} />
                        <Text style={{ fontWeight: "bold", color: black, marginLeft: 10 }}>Terms and Condition</Text>

                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
                        <AntDesign name="right" style={{ marginTop: 3, fontWeight: "1000" }} color={black} size={14} />

                    </View>

                </Pressable>


                {user==""?null:


<>



<Pressable onPress={() => removePhoneNumber()} style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 15, borderBottomWidth: 1, borderColor: lightgrey, paddingVertical: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('../Images/logout.png')} />
                        <Text style={{ fontWeight: "bold", color: black, marginLeft: 10 }}>Logout</Text>

                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
                        <AntDesign name="right" style={{ marginTop: 3, fontWeight: "1000" }} color={black} size={14} />

                    </View>

                </Pressable>
                <Pressable
                      onPress={() => setModalVisible(true)} 


                    style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 15, borderBottomWidth: 1, borderColor: lightgrey, paddingVertical: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('../Images/delete.png')} />
                        <Text style={{ fontWeight: "bold", color: black, marginLeft: 10 }}>Delete Account</Text>

                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10, }}>
                        <AntDesign name="right" style={{ marginTop: 3, fontWeight: "1000" }} color={black} size={14} />

                    </View>

                </Pressable>
</>

                
                }



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <View style={{
                            height: responsiveHeight(20), width: responsiveWidth(80), backgroundColor: "white", borderRadius: 5, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            // Elevate the view to create a shadow effect
                            elevation: 4,
                        }}>

                            <Text style={{ color: black, textAlign: "justify", fontSize: responsiveFontSize(1.8), paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(3) }}>
                                 Are you sure ? 
                                 Do you want to delete your acount ?
                            </Text>
                            <View style={{ flexDirection: 'row-reverse', width: responsiveWidth(70), }}>


                                <Pressable
                                
                                
                                // onPress={() => { handleSubmit() }}
                                
                    onPress={() => {
                        
                         setModalVisible(!modalVisible) 
                        handleSubmit()
                       
                    }}
                                
                                
                                >


                                    <Text style={{ color: blue, fontSize: responsiveFontSize(1.5), marginLeft: responsiveWidth(5), fontWeight: 'bold', }}>Yes</Text>

                                </Pressable>
                                <Pressable onPress={() => { setModalVisible(!modalVisible) }}>
                                    <Text style={{ color: blue, fontSize: responsiveFontSize(1.5), marginHorizontal: responsiveWidth(3), fontWeight: 'bold', }}>No</Text>
                                </Pressable>

                            </View>

                        </View>
                    </View>

                </Modal>





            </View>

            {/* <FlatList
                data={user}
                renderItem={(item) => {

                    console.log('my flatlist', item)



                    return (
                  
                    
                    
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        
                    )
                }}
            /> */}





        </View>
    )
}


export default ProfilePage