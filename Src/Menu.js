import { View, Text, Image, Pressable, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalBar from './HorizontalBar'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { black, blue, greyBg, greyDark, white, yellow } from './Colors';
import { MultiSelect } from 'react-native-element-dropdown';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';



const Menu = () => {
  const Tab = createBottomTabNavigator();
  const [isValid, setIsvalid] = useState(false);
 
  const [Suggestion, setSuggestion] = useState()

  const navigation = useNavigation();


   const [MyStarter, setMyStarter] = useState([]);
  const Starter=[

    { label: 'Club Sandwich', value: 'Club Sandwich' },
    { label: 'Chicken Tandoori Roll', value: 'Chicken Tandoori Roll' },
    
    
    

  ]


  const scrollViewProps = Platform.select({
    ios: { contentInsetAdjustmentBehavior: 'automatic' },
    android: { keyboardShouldPersistTaps: 'handled' },
  });


  const Chicken = () => {
    // const [MyMenu,setMenu]=useState("Chicken");F
  const [Adons, setaddon] = useState("");


    
    return (



      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >

      <ScrollView {...scrollViewProps}  style={{ flex: 1,backgroundColor:white, marginTop:responsiveHeight(8), }}>
       
       
        <Text style={{marginTop:responsiveHeight(1), fontSize:responsiveFontSize(2.5), fontWeight:"bold", color:blue, textAlign:"center"}}>Chicken Menu</Text>
        <View style={{ flexDirection:"row",marginHorizontal:responsiveWidth(2),}}>
        <View style={{ flexDirection: "row", marginHorizontal: responsiveWidth(2), marginTop: responsiveHeight(3) }}>
            <View style={{ flexDirection: "column", width: responsiveWidth(70) }}>
              
              {[
                "Chicken biryani / Pulao",
                "Chicken Qorma / Karahi",
                "Variety of Naan",
                "Sweet (Custard/firni/trifle/kulfa)",
                "Fresh Salad / Kachoomer Salad",
                "Raita zeera / Mint",
                "Min water & Soft drinks"
              ].map((item, index) => (
                <View key={index} style={{ flexDirection: "row", marginBottom: responsiveHeight(1) }}>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <FontAwesome5Icon name="slack" color={yellow} size={responsiveFontSize(2)} style={{ marginRight: responsiveWidth(2) }} />
                  </View>
                  <Text style={style.text}>{item}</Text>
                </View>
              ))}
  
            </View>
            
            <View style={{ width: responsiveWidth(30) }}>
              <Image
                resizeMode='contain'
                style={{ width: responsiveWidth(22), height: responsiveHeight(10) }}
                source={require('../Images/bbqPlate.png')}
              />
            </View>
          </View>
            <View style={{width:responsiveWidth(30)}}>
                <Image resizeMode='contain' style={{width:responsiveWidth(22), height:responsiveHeight(10)}} source={require('../Images/foodPlate.png')}/>
            </View>


       

        </View>
        <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:responsiveHeight(3),}}>
            <Pressable 
            
            onPress={() => {
  
              navigation.navigate('MenuConfirm',{MyMenu:"Chicken",Suggestion,Adons});
            }}
            
                style={{width:responsiveWidth(40), height:responsiveHeight(4), backgroundColor:blue, borderRadius:25, justifyContent:"center", alignItems:"center"}}><Text style={{color:white, fontSize: responsiveFontSize(2),}}>Order Now</Text></Pressable>
     

</View>
<View style={{marginTop:responsiveHeight(4),}}>
<Text style={{marginLeft:responsiveWidth(2), fontSize:responsiveFontSize(2.5), color:blue}}>Suggestion</Text>
<View style={{marginTop:responsiveHeight(1), justifyContent:"center", alignItems:"center"}}>
<View style={style.container}>
      <TextInput
        style={style.textInput}
        placeholderTextColor="#808080"
        // placeholderTextColor={greyDark}
        multiline={true}
        numberOfLines={3}
        scrollEnabled={true}
        onChangeText={item=>{setSuggestion(item)}}
        value={Suggestion}
        placeholder="Enter here If you want to sugguest or to remove anything from menu...!"
      />
      <Text style={{marginLeft:responsiveWidth(1), fontWeight:"bold", marginTop:responsiveHeight(.5), fontSize: responsiveFontSize(1.5),color:blue}}>
        Go to Add ons if you want to add more
      </Text>
    </View>


           <Pressable 
            
                    onPress={()=>{navigation.navigate('MenuAddOns', {MyMenu:"Chicken",Suggestion})}}
            style={{width:responsiveWidth(40), height:responsiveHeight(4), backgroundColor:white, borderRadius:25, borderBlockColor:blue,borderWidth:2,justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(2)}}><Text style={{color:blue, fontSize: responsiveFontSize(2),}}>Add ons</Text></Pressable>

</View></View>


{
    isValid==true? Adddons(): null
}
       
      </ScrollView>
      </KeyboardAvoidingView>
    );
  };


const Adddons=()=>{
    return(

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <ScrollView {...scrollViewProps}  style={{ flex: 1,backgroundColor:white, marginTop:responsiveHeight(8), }}>
       


        <View style={{flex:1,  marginTop:responsiveHeight(5), paddingBottom:responsiveHeight(15) }}>


            <View style={style.container}>
            <TextInput
  style={style.textInput}
  placeholderTextColor="#808080"
  
  multiline={true}
  // numberOfLines={3}
  // scrollEnabled={true}
  onChangeText={(item) => setSuggestion(item)}
  value={Suggestion}
  placeholder="Enter here If you want to suggest or to remove anything from menu...!"
/>







    </View>
             
            
    <Text style={{ fontSize:responsiveFontSize(2), fontWeight:"bold", marginLeft:responsiveWidth(2), marginTop:responsiveHeight(2)}}>Add Ons</Text>
            
            
              <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1), }}>
       <MultiSelect
            style={{
              height: responsiveHeight(6),
              width: responsiveWidth(95),
              backgroundColor: blue,
              paddingHorizontal: responsiveWidth(2),
              // marginHorizontal:responsiveWidth(2)
            }}
            placeholderStyle={{ fontSize: responsiveFontSize(1.8), color: white }}
            selectedTextStyle={style.selectedTextStyle}
            data={Starter}
            labelField="label"
            valueField="value"
            placeholder="Starter"
            onChange={item => setMyStarter(item)}
            value={MyStarter}
            selectedStyle={style.selectedStyle}
          />
    </View>
   
                 
                 <View style={{justifyContent:"center", alignItems:"center"}}>
                                    <Pressable 
                                
                                onPress={()=>{setIsvalid(false)}}
                        style={{width:responsiveWidth(40), height:responsiveHeight(4), backgroundColor:white, borderRadius:25, borderBlockColor:blue,borderWidth:2,justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(2),}}><Text style={{color:blue, fontSize: responsiveFontSize(2),}}>
                          Close</Text></Pressable>

                 </View>
                 
                 
    
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}


  const Mutton = () => {
    const [MyMenu,setMenu]=useState("Mutton");
  const [Adons, setaddon] = useState("");

    return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >

      <ScrollView {...scrollViewProps}  style={{ flex: 1,backgroundColor:white, marginTop:responsiveHeight(8), }}>
        <Text style={{marginTop:responsiveHeight(1), fontSize:responsiveFontSize(2.5), fontWeight:"bold", color:blue, textAlign:"center"}}>Mutton Menu</Text>
        <View style={{ flexDirection: "row", marginHorizontal: responsiveWidth(2), marginTop: responsiveHeight(3) }}>
            <View style={{ flexDirection: "column", width: responsiveWidth(70) }}>
              
              {[
                "Mutton Afghani Palao / Kabali Palao / Amratsari Palao",
                "Mutton Kunna",
                "Variety of Naan",
                "Sweet (Custard/firni/trifle/kulfa)",
                "Fresh Salad / Kachoomer Salad",
                "Raita zeera / Mint",
                "Min water & Soft drinks"
              ].map((item, index) => (
                <View key={index} style={{ flexDirection: "row", marginBottom: responsiveHeight(1) }}>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <FontAwesome5Icon name="slack" color={yellow} size={responsiveFontSize(2)} style={{ marginRight: responsiveWidth(2) }} />
                  </View>
                  <Text style={style.text}>{item}</Text>
                </View>
              ))}
  
            </View>
            
            <View style={{ width: responsiveWidth(30) }}>
              <Image
                resizeMode='contain'
                style={{ width: responsiveWidth(22), height: responsiveHeight(10) }}
                source={require('../Images/bbqPlate.png')}
              />
            </View>
          </View>
        <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:responsiveHeight(3),}}>
            <Pressable 
            
            
            onPress={() => {
              navigation.navigate('MenuConfirm',{MyMenu:"Mutton",Suggestion,Adons});

            }}
            
            
            
                  style={{width:responsiveWidth(40), height:responsiveHeight(4), backgroundColor:blue, borderRadius:25, justifyContent:"center", alignItems:"center"}}><Text style={{color:white, fontSize: responsiveFontSize(2),}}>Order Now</Text></Pressable>
     

</View>
<View style={{marginTop:responsiveHeight(4),}}>
<Text style={{marginLeft:responsiveWidth(2), fontSize:responsiveFontSize(2.5), color:blue}}>Suggestion</Text>
<View style={{marginTop:responsiveHeight(1), justifyContent:"center", alignItems:"center"}}>
<View style={style.container}>
<TextInput
        style={style.textInput}
        placeholderTextColor="#808080"
        // placeholderTextColor={greyDark}
        multiline={true}
        numberOfLines={3}
        scrollEnabled={true}
        onChangeText={item=>{setSuggestion(item)}}
        value={Suggestion}
        placeholder="Enter here If you want to sugguest or to remove anything from menu...!"
      />



      <Text style={{marginLeft:responsiveWidth(1), fontWeight:"bold", marginTop:responsiveHeight(.5), fontSize: responsiveFontSize(1.5),color:blue}}>
        Go to Add ons if you want to add more
      </Text>
    </View>


           <Pressable 
            
            onPress={()=>{navigation.navigate('MenuAddOns', {MyMenu:"Mutton", Suggestion})}}

                    // onPress={()=>{setIsvalid(true)}}
            style={{width:responsiveWidth(40), height:responsiveHeight(4), backgroundColor:white, borderRadius:25, borderBlockColor:blue,borderWidth:2,justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(2)}}><Text style={{color:blue, fontSize: responsiveFontSize(2),}}>Add ons</Text></Pressable>

</View></View>


{
    isValid==true? Adddons(): null
}
       
      </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  const Bbq = () => {
    const [MyMenu,setMenu]=useState("Barbecue");
    const [Adons, setaddon] = useState("");

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <ScrollView
          {...scrollViewProps}
          style={{ flex: 1, backgroundColor: 'white', marginTop: responsiveHeight(8) }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ marginTop: responsiveHeight(1), fontSize: responsiveFontSize(2.5), fontWeight: "bold", color: blue, textAlign: "center" }}>
            Barbecue Menu
          </Text>
          
          <View style={{ flexDirection: "row", marginHorizontal: responsiveWidth(2), marginTop: responsiveHeight(3) }}>
            <View style={{ flexDirection: "column", width: responsiveWidth(70) }}>
              
              {[
                "Puri / Pathoora",
                "Channa Bhaaji",
                "Chicken Tikka Boti / Seekh Kebab",
                "Sweet (Custard/firni/trifle/kulfa)",
                "Fresh Salad / Kachoomer Salad",
                "Raita zeera / Mint",
                "Min water & Soft drinks"
              ].map((item, index) => (
                <View key={index} style={{ flexDirection: "row", marginBottom: responsiveHeight(1) }}>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <FontAwesome5Icon name="slack" color={yellow} size={responsiveFontSize(2)} style={{ marginRight: responsiveWidth(2) }} />
                  </View>
                  <Text style={style.text}>{item}</Text>
                </View>
              ))}
  
            </View>
            
            <View style={{ width: responsiveWidth(30) }}>
              <Image
                resizeMode='contain'
                style={{ width: responsiveWidth(22), height: responsiveHeight(10) }}
                source={require('../Images/bbqPlate.png')}
              />
            </View>
          </View>
  
          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: responsiveHeight(3) }}>
            <Pressable
            
            
            onPress={() => {
              navigation.navigate('MenuConfirm',{MyMenu:" Barbecue",Suggestion,Adons});

            }}
            
            
            
            
            style={{ width: responsiveWidth(40), height: responsiveHeight(4), backgroundColor: blue, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: 'white', fontSize: responsiveFontSize(2) }}>Order Now</Text>
            </Pressable>
          </View>
  
          <View style={{ marginTop: responsiveHeight(4) }}>
            <Text style={{ marginLeft: responsiveWidth(2), fontSize: responsiveFontSize(2.5), color: blue }}>Suggestion</Text>
            <View style={{ marginTop: responsiveHeight(1), justifyContent: "center", alignItems: "center" }}>
              <View style={style.container}>
                <TextInput
                  style={style.textInput}
                  placeholderTextColor="#808080"
                  multiline={true}
                  numberOfLines={3}
                  scrollEnabled={true}
                  placeholder="Enter here If you want to suggest or to remove anything from menu...!"
                  blurOnSubmit={false}
                />
                <Text style={{ marginLeft: responsiveWidth(1), fontWeight: "bold", marginTop: responsiveHeight(.5), fontSize: responsiveFontSize(1.5), color: blue }}>
                  Go to Add ons if you want to add more
                </Text>
              </View>
  
              <Pressable
                    onPress={()=>{navigation.navigate('MenuAddOns', {MyMenu:" Barbecue", Suggestion})}}

                style={{
                  width: responsiveWidth(40),
                  height: responsiveHeight(4),
                  backgroundColor: 'white',
                  borderRadius: 25,
                  borderBlockColor: blue,
                  borderWidth: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: responsiveHeight(2)
                }}
              >
                <Text style={{ color: blue, fontSize: responsiveFontSize(2) }}>Add ons</Text>
              </Pressable>
            </View>
          </View>
  
          {isValid == true ? Addons() : null}
  
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      
      <HorizontalBar backPress={() => navigation.goBack()} title={"Menu"} />
      
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Chicken') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Mutton') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              } else if (route.name === 'Bbq') {
                iconName = focused ? 'ios-bonfire' : 'ios-bonfire-outline';
              }

              // Customize your tabBarIcon view here if needed
              return (
                <Ionicons name={iconName} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarLabel: () => null, // Remove the label
            tabBarStyle: {
              borderTopColor: 'transparent', // Removes the top border
              borderBottomColor: 'transparent', // Removes the bottom border
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
              justifyContent: 'center', // Center the content
              alignItems: 'center', // Center the content
              position: 'absolute', // Position at the top
              top: 0, // Place at the top
              left: 0,
              right: 0,
            },
            tabBarItemStyle: {
              borderBottomWidth: 2,
              borderBottomColor: 'transparent', // Customize the bottom border color for active tab
            },
          })}
        >
          <Tab.Screen
            name="Chicken"
            component={Chicken}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={{ width: responsiveWidth(27), height: responsiveHeight(4) }}
                    source={require("../Images/chick.png")}
                  />
                </View>
              ),
              tabBarLabel: () => null, // Remove the label
            }}
          />
          <Tab.Screen
            name="Mutton"
            component={Mutton}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={{ width: responsiveWidth(27), height: responsiveHeight(4) }}
                    source={require("../Images/mutton.png")}
                  />
                </View>
              ),
              tabBarLabel: () => null, // Remove the label
            }}
          />
          <Tab.Screen
            name="Bbq"
            component={Bbq}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={{ width: responsiveWidth(27), height: responsiveHeight(4) }}
                    source={require("../Images/bbq.png")}
                  />
                </View>
              ),
              tabBarLabel: () => null, // Remove the label
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
const style=StyleSheet.create({
    text:{
        color:blue,fontSize:responsiveFontSize(2),
    },
    container: {
        // flex: 1,
        // justifyContent: 'center',
        paddingHorizontal:responsiveWidth(2),
        
      },
      textInput: {
        backgroundColor:white,
        width:responsiveWidth(90),
        height: responsiveHeight(15), // This sets an approximate height for 3 lines
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top', // Ensures text starts at the top
        borderRadius:10,
        marginTop:responsiveHeight(1)
      },
      selectedTextStyle: {
        fontSize: responsiveFontSize(1.8),
        color: black
      },
      selectedStyle: {
        backgroundColor: greyBg,
        borderRadius: 5
      },
})


export default Menu;
