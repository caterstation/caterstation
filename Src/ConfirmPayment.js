import { View, Text ,Image,ScrollView,TextInput, Pressable,StyleSheet,Alert,Modal} from 'react-native'
import React,{useState} from 'react'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { black, greyBg, white , lightgrey, blue} from './Colors';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackArrow from './BackArrow'
import { useDispatch, useSelector } from 'react-redux'
import { removeAllFromCart } from './redux/MyPackageSlice'
import HorizontalBar from './HorizontalBar'


const ConfirmPayment = ({route}) => {
  const myData = useSelector(state => state.package.cart);
  const totalBil = myData.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity; // Assuming each item has a 'price' property
  }, 0);
  const {passid}= route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

 
    const handleRemoveAll = () => {
      dispatch(removeAllFromCart()); // Dispatch the action to remove all items
    };
  return (
    <SafeAreaView style={{backgroundColor:white, flex:1}}>
      <HorizontalBar backPress={() => navigation.goBack()} title="Confirm Payment" /> 
    <View style={{borderRadius: 10,width:responsiveWidth(90), marginHorizontal:responsiveWidth(5), backgroundColor:lightgrey, flexDirection:"column", paddingTop:responsiveHeight(1),paddingLeft:responsiveWidth(2), marginVertical: responsiveHeight(2),height:responsiveHeight(12)}}>
    <Text style={{color:black, fontSize:responsiveFontSize(1.8) , fontWeight:"bold", marginLeft: responsiveWidth(2), }}>{passid}</Text>
              
    <View style={{flexDirection:"row", justifyContent:"space-between", width:responsiveWidth(60),marginTop:responsiveHeight(1.2) }}>
              
                <View style={{width:responsiveWidth(15),  justifyContent:"center", alignItems:"center", }}>
                    {/* <Text style={{borderRadius: 30,backgroundColor:"green",fontSize:responsiveFontSize(7), width:responsiveWidth(15), height:responsiveHeight(9),textAlign:"center", paddingBottom:responsiveHeight(0.5)}}>D</Text> */}
                    <Feather  name='calendar' color={"black"} size={responsiveHeight(6)}/>
                    </View>
                              <View style={{width:responsiveWidth(65),  }}>
                              <Text style={{color:black,  fontSize:responsiveFontSize(2.2),}}>Wedding</Text>
                              {/* <Text style={{color:black, fontSize:responsiveFontSize(1.8) ,  }}>Date</Text> */}


                              </View>
                             
                             
                             
                             
                              
                             
                          </View>
                        


                    </View>


                    <View style={{ marginHorizontal:responsiveWidth(5),borderRadius: 10,backgroundColor:lightgrey, paddingHorizontal:responsiveWidth(3),paddingVertical:responsiveHeight(3)}} >
     
                            <View style={{flexDirection:"row"}}>
                                  <MaterialCommunityIcons name='bank' color={"black"} size={responsiveHeight(4)}/>
                                  <Text style={{color:black, fontWeight:"bold", paddingTop:responsiveHeight(.7), marginLeft:responsiveWidth(3)}}>Bank Detail</Text>
                            </View>

                            <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>Account Title</Text>
                        <Text style={styles.txt}>CATERSTATION</Text>
                    </View>
                            <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>IBAN</Text>
                        <Text style={styles.txt}>PK67 HABB OO15 4179 8115 4703</Text>
                    </View>
                            <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={styles.txt}>Bank Name</Text>
                        <Text style={styles.txt}>HBL</Text>
                    </View>
                    
                    </View>

                        <View style={{marginHorizontal:responsiveWidth(6), marginTop:responsiveHeight(3)}}>
                        <Text numberOfLines={4} style={{fontSize: responsiveFontSize(1.5),textAlign:"justify"}}>
                                 Please send a screenshot of your partial payment to our Whatsapp. Meanwhile our CSR will contact you within 24 hours.
                    </Text>

                        </View>

                        <Pressable style={{flexDirection:"row",marginHorizontal:responsiveWidth(6),}}>
                                  <FontAwsome name='whatsapp' color={"#075E54"} size={responsiveHeight(2.5)} style={{paddingTop:responsiveHeight(.4),}}/>
                                  <Text style={{color:black, fontWeight:"bold", paddingTop:responsiveHeight(.4), marginLeft:responsiveWidth(3)}}>Contact us on Whatsapp.</Text>
                            </Pressable>
                        <View style={{width:responsiveWidth(90), marginHorizontal:responsiveWidth(5), backgroundColor:lightgrey, flexDirection:"column", paddingTop:responsiveHeight(1),paddingHorizontal:responsiveWidth(3), marginVertical: responsiveHeight(2),height:responsiveHeight(13),borderRadius: 10,}}>
                        <View style={{justifyContent:"space-between", flexDirection:"row", marginVertical:responsiveHeight(2)}}>
                        <Text style={[styles.txt,{ fontWeight: 'bold',}]}>Total Amount</Text>
                        <Text style={[styles.txt,{ fontWeight: 'bold',}]}>{totalBil}</Text>
                    </View>
                              <View style={{width:responsiveWidth(65),  }}>
                              <Text style={{color:black,  fontSize:responsiveFontSize(1.5),}}>20% Advance Payable Amount PKR 4000</Text>
                          </View>
                        


                    </View>
                    <View style={{justifyContent:"center",alignItems:"center", marginTop:responsiveHeight(3), marginBottom:responsiveHeight(5)}}>
                        <Pressable  onPress={() => {setModalVisible(true);
                          handleRemoveAll();
                        }} style={{paddingHorizontal:responsiveWidth(15), paddingVertical:responsiveHeight(1.5), backgroundColor:blue}}><Text style={{color:white}}>Submit Order</Text></Pressable>

                    </View>
                    <View style={styles.centeredView}>
                    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width:responsiveWidth(90),justifyContent:"center",alignItems:"center", marginTop:responsiveHeight(3),}}>
                        <Image source={require('../Images/Vector.png')}/>
                       
                        <Text style={{color:"white", marginTop:responsiveHeight(3), fontWeight: 'bold',}}>Received Query</Text>
                        <Text style={{color:"white",paddingHorizontal:responsiveWidth(5),textAlign:"center",marginTop:responsiveHeight(3), fontSize: responsiveFontSize(2),}}>
                        Thankyou! Team CaterStation will contact you soon!</Text>
            {/* <Image style={{marginTop:responsiveHeight(3)}} source={require('../Images/logos_whatsapp-icon.png')}/>  */}
            <Pressable
              style={{paddingVertical:responsiveHeight(1), paddingHorizontal:responsiveWidth(20), backgroundColor:white,marginTop:responsiveHeight(6)}}
              onPress={() => {setModalVisible(!modalVisible), navigation.navigate("ForYou")}}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
            </View>
           
           
          </View>
        </View>
      </Modal>
      </View>
                   
                    
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    txt:{
        color:black,
        fontSize: responsiveFontSize(1.8),
    },
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        width: 24,
        height: 24,
        marginRight: 16,
      },
      message: {
        flex: 1,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        // margin: 20,
        backgroundColor: blue,
        height:responsiveHeight(45),
        width:responsiveWidth(90),
        
      },
      button: {
       
        paddingHorizontal: responsiveWidth(5),
        paddingVertical:responsiveHeight(2)
        
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor:blue ,
      },
      textStyle: {
        color: blue,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});

export default ConfirmPayment