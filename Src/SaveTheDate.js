import { View, Text , StyleSheet,FlatList,Image,Pressable} from 'react-native'
import React from 'react'
import { blue } from './Colors';
import { useNavigation } from '@react-navigation/native'


const CardMenu = [
    { id: 1, name: 'Card 1' },
    { id: 2, name: 'Card 2' },
    { id: 4, name: 'Card 4' },
    { id: 5, name: 'Card 5' },
    { id: 6, name: 'Card 6' },
    { id: 7, name: 'Card 7' },
    { id: 8, name: 'Card 8' },
    { id: 9, name: 'Card 9' },
    { id: 10, name: 'Card 10' },
    { id: 11, name: 'Card 1' },
    { id: 12, name: 'Card 1' },
    { id: 13, name: 'Card 1' },
    { id: 14, name: 'Card 1' },
    { id: 15, name: 'Card 1' },
    { id: 16, name: 'Card 1' },
    { id: 17, name: 'Card 1' },
    { id: 18, name: 'Card 1' },
    { id: 19, name: 'Card 1' },
    { id: 20, name: 'Card 1' },
    { id: 21, name: 'Card 21' },
    { id: 22, name: 'Card 22' },

    // ... add more data here
];
const SaveTheDate = () => {
    const navigation=useNavigation();


  return (
     <View style={[styles.container]}>
     <View style={[styles.HeadingBlk]}>

      <Text style={[styles.HeadingTxt]}>Save the date</Text>
    </View>
    <View style={{justifyContent:"center",alignItems:"center",marginRight:15, height:600}}>
          <FlatList
                            data={CardMenu}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id.toString()}
                            numColumns={3} // you can set the number of columns here
                            renderItem={({item}) => {
                                return (
                                    // <View style={[{backgroundColor:"red", width:"100%"}]}>
                                    <Pressable onPress={()=>{navigation.navigate("SaveDateDetails")}} style={styles.wedDecCard}>
                                    <Image style={styles.cardImage} source={require('../Images/invite2.png')}/>
                                    {/* <Text style={styles.wedDectext}>Divine Events </ Text> */}
                                  </Pressable>
                                    // </View>
                                )
                            }}
                        />
    </View>
  
    </View>
  )
}
const styles=StyleSheet.create({
container:{
        flex:1,
        // paddingHorizontal:10
},
HeadingBlk:{
    height:100,
    // backgroundColor:"pink",
    justifyContent:"center",
    alignItems:"center"
},
HeadingTxt:{
    color:blue,
    fontWeight:"bold",
    fontSize:22,
    textAlign:"center",
    width:"100%"
},
wedDecCard:{
    width:"25%",
    marginHorizontal:15,
    marginBottom: 10,
 },
 cardImage:{height:150,width:115},

});



export default SaveTheDate