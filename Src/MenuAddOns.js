import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import HorizontalBar from './HorizontalBar';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { black, blue, greyBg, white } from './Colors';
import { MultiSelect } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

const MenuAddOns = ({route}) => {
  const navigation = useNavigation();
  const {MyMenu, Suggestion}=route.params;
  console.log('====================================');
  console.log(" MenuAddOns  my nav  :"  ,  MyMenu, Suggestion);
  // console.log("  my nav  :"  ,  MyMenu);
  console.log('====================================');
  const [MyStarter, setMyStarter] = useState([]);
  
  const Starter=[
    { label: 'Club Sandwich', value: 'Club Sandwich' },
    { label: 'Chicken Tandoori Roll', value: 'Chicken Tandoori Roll' },
 
  ] ;


  const [MyChinese, setMyChinese] = useState([]);
  const Chinese = [
    { label: 'Egg Fried Rice', value: 'Egg Fried Rice' },
    { label: 'Masala Fried Rice', value: 'Masala Fried Rice' },
    { label: 'Chicken Fried Rice', value: 'Chicken Fried Rice' },
    { label: 'Chicken Ginger', value: 'Chicken Ginger' }
  ];
  const [MyFishVariety, setMyFishVariety] = useState([]);

  const FishVariety = [
    { label: 'Fish BBQ', value: 'Fish BBQ' },
    { label: 'Grilled Fish', value: 'Grilled Fish' },
    { label: 'Fish Crackers', value: 'Fish Crackers' }
  ];

  const [MySalads, setMySalads] = useState([]);

  const Salads = [
    { label: 'Russian Salad', value: 'Russian Salad' },
    { label: 'Bean Salad', value: 'Bean Salad' },
    { label: 'Fresh Salad', value: 'Fresh Salad' }
  ];

  const [MyDesserts, setMyDesserts] = useState([]);

  const Desserts = [
    { label: 'Pastries', value: 'Pastries' },
    { label: 'Brownies', value: 'Brownies' },
    { label: 'Cakes', value: 'Cakes' }
  ];
  




  const [MyFishCorner, setMyFishCorner] = useState([]);

  // Menu options array
  const FishCorner = [
    { label: 'Tempura', value: 'Tempura' },
    { label: 'Butterfly Prawns', value: 'Butterfly Prawns' },
    { label: 'Lemon Butter Fish', value: 'Lemon Butter Fish' }
  ];




  const [MyPremiumFishCorner, setMyPremiumFishCorner] = useState([]);
  const [MyPremiumStarter, setMyPremiumStarter] = useState([]);
  const [MySteak, setMySteak] = useState([]);
  const [MyChineseThai, setMyChineseThai] = useState([]);
  const [MyItalian, setMyItalian] = useState([]);
  const [MyPremiumSalads, setMyPremiumSalads] = useState([]);
  const [MyPremiumDesserts, setMyPremiumDesserts] = useState([]);
  // const [MyLivePremiumPackage, setMyLivePremiumPackage] = useState([]);

  // Menu options arrays
  const PremiumFishCorner = [
    { label: 'Tempura', value: 'Tempura' },
    { label: 'Butterfly Prawns', value: 'Butterfly Prawns' },
    { label: 'Lemon Butter Fish', value: 'Lemon Butter Fish' },
  ];

  const PremiumStarter = [
    { label: 'Sesame Chicken', value: 'Sesame Chicken' },
    { label: 'Chicken Hot Shots', value: 'Chicken Hot Shots' },
    { label: 'Buffalo Wings', value: 'Buffalo Wings' },
  ];

  const Steak = [
    { label: 'Chicken Steak with Mushroom Sauce', value: 'Chicken Steak with Mushroom Sauce' },
    { label: 'Chicken Steak with Salsa Sauce', value: 'Chicken Steak with Salsa Sauce' },
    { label: 'Chicken Steak with Pineapple Sauce', value: 'Chicken Steak with Pineapple Sauce' },
  ];

  const ChineseThai = [
    { label: 'Chicken Chili Dry', value: 'Chicken Chili Dry' },
    { label: 'Oyster Chicken', value: 'Oyster Chicken' },
    { label: 'Chicken with Lemon Sauce', value: 'Chicken with Lemon Sauce' },
  ];

  const Italian = [
    { label: 'Mexican Pasta', value: 'Mexican Pasta' },
    { label: 'Alfredo Pasta', value: 'Alfredo Pasta' },
    { label: 'Lasagna', value: 'Lasagna' },
  ];

  const PremiumSalads = [
    { label: 'Chicken Pineapple Salad', value: 'Chicken Pineapple Salad' },
    { label: 'Baby German Potato Salad', value: 'Baby German Potato Salad' },
    { label: 'Italian Salad', value: 'Italian Salad' },
  ];

  const PremiumDesserts = [
    { label: 'Oreo Delight', value: 'Oreo Delight' },
    { label: 'Banoffee Pie', value: 'Banoffee Pie' },
    { label: 'Cream Caramel', value: 'Cream Caramel' },
    { label: 'Egg Pudding', value: 'Egg Pudding' },
  ];



    // const {menu,sugguestion }=route.params;
        console.log('====================================');
        // console.log("my menu", menu);
        // console.log("my sugguestion", sugguestion);
        console.log('====================================');
   


      const scrollViewRef = useRef(null);  // Reference for ScrollView
      
      const scrollViewProps = Platform.select({
        ios: { contentInsetAdjustmentBehavior: 'automatic' },
        android: { keyboardShouldPersistTaps: 'handled' },
      });
    


      const [allSelections, setAllSelections] = useState([]);

  const updateAllSelections = (newSelection, category) => {
    setAllSelections((prevSelections) => {
      const filteredSelections = prevSelections.filter(item => item.category !== category);
      const newItems = newSelection.map(value => ({ category, value }));
      return [...filteredSelections, ...newItems];
    });
  };

  const [items, setItems] = useState([]);

  const addItem = (myitem) => {
    // Create a new array with the new item added
    const newItems = [...items];
    newItems.push(myitem);
    
    // Update the state with the new array
    setItems(newItems);
  };

  console.log("updateAllSelections ",items);
      
  return (
    <SafeAreaView style={{flex:1, backgroundColor:white}}>
    <ScrollView ref={scrollViewRef} {...scrollViewProps} showsVerticalScrollIndicator={false}>
      <HorizontalBar backPress={() => navigation.goBack()} title={"Add Ons"} />

      <Text style={{marginVertical:responsiveHeight(2), fontSize:responsiveFontSize(2), fontWeight:"bold", color:blue,marginLeft:responsiveWidth(2)}}>Choose items from our Add Ons menu:</Text>
      <Text style={{marginVertical:responsiveHeight(2), fontSize:responsiveFontSize(2.5), fontWeight:"bold", color:blue, textAlign:"center"}}>LIVE COOKING BASIC MENU</Text>





      <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2) }}>
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
            onChange={item => {
              setMyStarter(item)
              // updateAllSelections(item);
              // addItem(item)
            }}
            value={MyStarter}
            selectedStyle={style.selectedStyle}
          />
    </View>





      <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={Chinese}
            labelField="label"
            valueField="value"
            placeholder="Chinese"
            onChange={item => {setMyChinese(item)
              updateAllSelections(item);

            }}
            value={MyChinese}
            selectedStyle={style.selectedStyle}
          />
    </View>







      <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={FishVariety}
            labelField="label"
            valueField="value"
            placeholder="Fish Variety"
            onChange={item =>{ setMyFishVariety(item)
              updateAllSelections(item);

            }}
            value={MyFishVariety}
            selectedStyle={style.selectedStyle}
          />
    </View>









      <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={Salads}
            labelField="label"
            valueField="value"
            placeholder="Salads"
            onChange={item => {setMySalads(item)
              updateAllSelections(item);

            }}
            value={MySalads}
            selectedStyle={style.selectedStyle}
          />
    </View>











      <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={Desserts}
            labelField="label"
            valueField="value"
            placeholder="Desserts"
            onChange={item =>{ setMyDesserts(item)
              updateAllSelections(item);

            }}
            value={MyDesserts}
            selectedStyle={style.selectedStyle}
          />
    </View>




    <Text style={{marginVertical:responsiveHeight(2), fontSize:responsiveFontSize(2.5), fontWeight:"bold", color:blue, textAlign:"center"}}>LIVE PREMIUM PACKAGE</Text>







    <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={PremiumStarter}
            labelField="label"
            valueField="value"
            placeholder="Starter"
            onChange={item => {setMyPremiumStarter(item)
              updateAllSelections(item);

            }}
            value={MyPremiumStarter}
            selectedStyle={style.selectedStyle}
          />
    </View>










    <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={PremiumFishCorner}
            labelField="label"
            valueField="value"
            placeholder="Fish Corner"
            onChange={item => {setMyPremiumFishCorner(item)
              updateAllSelections(item);

            }}
            value={MyPremiumFishCorner}
            selectedStyle={style.selectedStyle}
          />
    </View>











    <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={Steak}
            labelField="label"
            valueField="value"
            placeholder="Steak"
            onChange={item => {setMySteak(item)
              updateAllSelections(item);

            }}
            value={MySteak}
            selectedStyle={style.selectedStyle}
          />
    </View>














    <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={ChineseThai}
            labelField="label"
            valueField="value"
            placeholder="Chinese/Thai"
            onChange={item => {setMyChineseThai(item)
              updateAllSelections(item);

            }}
            value={MyChineseThai}
            selectedStyle={style.selectedStyle}
          />
    </View>
















    <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={Italian}
            labelField="label"
            valueField="value"
            placeholder="Italian"
            onChange={item => {setMyItalian(item)
              updateAllSelections(item);

            }}
            value={MyItalian}
            selectedStyle={style.selectedStyle}
          />
    </View>















    <View style={{ justifyContent:"center", alignItems:"center", marginTop:responsiveHeight(1),marginBottom:responsiveHeight(2)  }}>
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
            data={PremiumSalads}
            labelField="label"
            valueField="value"
            placeholder="Salads"
            onChange={item =>{ setMyPremiumSalads(item)
              updateAllSelections(item);

            }}
            value={MyPremiumSalads}
            selectedStyle={style.selectedStyle}
          />
    </View>












    <View style={{ justifyContent: "center", alignItems: "center", marginTop: responsiveHeight(1), marginBottom: responsiveHeight(2) }}>
          <MultiSelect
            style={{
              height: responsiveHeight(6),
              width: responsiveWidth(95),
              backgroundColor: blue,
              paddingHorizontal: responsiveWidth(2),
            }}
            placeholderStyle={{ fontSize: responsiveFontSize(1.8), color: white }}
            selectedTextStyle={style.selectedTextStyle}
            data={PremiumDesserts}
            labelField="label"
            valueField="value"
            placeholder="Desserts"
            onChange={item => {setMyPremiumDesserts(item)
              updateAllSelections(item);

            }}
            value={MyPremiumDesserts}
            selectedStyle={style.selectedStyle}
            onFocus={() => {
              scrollViewRef.current?.scrollTo({ 
                y: responsiveHeight(50),  // Adjust y value based on your requirement
                animated: true 
              });
            }}
          />
        </View>

        {/* Other MultiSelect components can also have similar onFocus event */}
        {/* ... */}
        

        <View style={{justifyContent:"center", alignItems:"center", width:responsiveWidth(100)}}>
             <Pressable
          onPress={() => {


            const newItems = [...items];
            
    // newItems.push(MyStarter);
    // newItems.push(MyChinese);
    // newItems.push(MyFishVariety);
    // newItems.push(MySalads);
    // newItems.push(MyDesserts);
    // newItems.push(MyFishCorner);
    // newItems.push(MyPremiumFishCorner);
    // newItems.push(MyPremiumStarter);
    // newItems.push(MySteak);
    // newItems.push(MyChineseThai);
    // newItems.push(MyItalian);
    // newItems.push(MyPremiumSalads);
    // newItems.push(MyPremiumDesserts);


    if (MyStarter.length > 0) {
      newItems.push(MyStarter);
  }
  
  if (MyChinese.length > 0) {
      newItems.push(MyChinese);
  }
  
  if (MyFishVariety.length > 0) {
      newItems.push(MyFishVariety);
  }
  
  if (MySalads.length > 0) {
      newItems.push(MySalads);
  }
  
  if (MyDesserts.length > 0) {
      newItems.push(MyDesserts);
  }
  
  if (MyFishCorner.length > 0) {
      newItems.push(MyFishCorner);
  }
  
  if (MyPremiumFishCorner.length > 0) {
      newItems.push(MyPremiumFishCorner);
  }
  
  if (MyPremiumStarter.length > 0) {
      newItems.push(MyPremiumStarter);
  }
  
  if (MySteak.length > 0) {
      newItems.push(MySteak);
  }
  
  if (MyChineseThai.length > 0) {
      newItems.push(MyChineseThai);
  }
  
  if (MyItalian.length > 0) {
      newItems.push(MyItalian);
  }
  
  if (MyPremiumSalads.length > 0) {
      newItems.push(MyPremiumSalads);
  }
  
  if (MyPremiumDesserts.length > 0) {
      newItems.push(MyPremiumDesserts);
  }
    
    // Update the state with the new array
    setItems(newItems);
    const singleArray = items.reduce((acc, curr) => acc.concat(curr), []);

console.log("singleArray "  ,singleArray);

    console.log('my push item ', items)
            
            navigation.navigate('MenuConfirm',{MyMenu, Suggestion,singleArray});
          }}
          style={{
            width: responsiveWidth(40),
            height: responsiveHeight(4),
            backgroundColor: 'white',
            borderRadius: 25,
            borderColor: blue,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            marginTop: responsiveHeight(2)
          }}
        >
          <Text style={{ color: blue, fontSize: responsiveFontSize(2) }}>Confirm Order</Text>
        </Pressable>
        </View>
       










    </ScrollView>

    </SafeAreaView>
  )
};

const style =StyleSheet.create({
  
      selectedTextStyle: {
        fontSize: responsiveFontSize(1.8),
        color: black,
       
      },
      selectedStyle: {
        backgroundColor: greyBg,
        // borderRadius: 5,  
        marginHorizontal: responsiveWidth(4),
        //  borderColor:blue, borderWidth:2
        // justifyContent:"center", alignItems:"center"
      },
})




export default MenuAddOns