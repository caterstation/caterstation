import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import HorizontalBar from './HorizontalBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { white } from './Colors'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'

const Custompackage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex:1, backgroundColor:white}}>
 <ScrollView >
                    <HorizontalBar backPress={() => navigation.goBack()} title={"Custom Packages"} />

{/* left */}
                        <View style={{flexDirection:"row"}}>
                            <View style={{width:responsiveWidth(35), height:responsiveHeight(10), backgroundColor:"pink"}}></View>
                            <View style={{width:responsiveWidth(65), height:responsiveHeight(10), backgroundColor:"yellow"}}></View>

                        </View>
{/* right */}
                        <View style={{flexDirection:"row"}}>
                            <View style={{width:responsiveWidth(65), height:responsiveHeight(10), backgroundColor:"green"}}></View>
                            <View style={{width:responsiveWidth(35), height:responsiveHeight(10), backgroundColor:"red"}}></View>

                        </View>


 </ScrollView></SafeAreaView>
  )
}

export default Custompackage