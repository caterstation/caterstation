import {  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  
} from 'react-native'
import React ,{useState} from 'react'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MyHeader from './MyHeader'
import ViewAllBtn from './ViewAllBtn'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { blue ,white} from './Colors'
import Heading from './Heading'


const Einvites = () => {
  
  const navigation=useNavigation();
  const [view, setView] = useState('first');
  const [view3, setView3] = useState('third');
  const [view5, setView5] = useState('five');


  const handleWeddingCard = () => {
    navigation.navigate('WeddingCard',{card:"wed"})
   
  };
  const handleVideoInvitation = () => {
    navigation.navigate('VideoInvitation')
   
  };
  const handleSaveTheDate = () => {
    navigation.navigate('SaveTheDate')
   
  };


// __________________Questions___________________________________
const myView1=()=>{

  if (view5==="five") {
    return(
      <View style={styles.questionBox2}>
      <View style={styles.innerquestionBox}>

        <Text style={[styles.questionHeadingTxt,{color:white}]}>What types of events do you specialize in?</Text>

      <Pressable  style={{flexDirection:"row-reverse",paddingHorizontal:15,}} onPress={() => setView5('six')}>
        <FontAwsome  name="angle-down" color={white} size={20}/>


        </Pressable>
      </View>
      <Text style={styles.questionTxt}>Our expertise covers a wide range of events, including weddings, corporate functions, conferences, and casual events.</Text>
       
       
      </View>

    );
   
  }
  else if (view5==="six") {
    return(
      <View style={styles.questionBox1}>
      <Text style={styles.questionHeadingTxt}>Do you offer customized event packages?</Text>
      <Pressable  style={{flexDirection:"row-reverse",paddingHorizontal:15,}} onPress={() => setView5('five')}>
          <FontAwsome  name="angle-up" color={"black"} size={20}/>


          </Pressable>

      </View>
    );
    
    
  }
}

const myView2=()=>{
  // <View><Text>Frequently asked question   myView</Text></View>

  if(view3==="third"){
    return(
      <View style={styles.questionBox1}>
         <Text style={styles.questionHeadingTxt}>Do you offer customized event packages?</Text>
         <Pressable  style={{flexDirection:"row-reverse",paddingHorizontal:15,}}onPress={() => setView3('fourth')}>
          <FontAwsome  name="angle-up" color={"black"} size={20}/>


          </Pressable>

      </View>

    );
  }else if (view3==="fourth"){
    return(

      <View style={styles.questionBox2}>
        <View style={styles.innerquestionBox}>
        <Text style={[styles.questionHeadingTxt,{color:white}]}>Do you offer customized event packages?</Text>

          <Pressable  style={{flexDirection:"row-reverse",paddingHorizontal:15,}} onPress={() => setView3('third')}>
          <FontAwsome  name="angle-down" color={white} size={20}/>
        </Pressable>
      </View>
      <Text style={styles.questionTxt}>
      Absolutely Yes! We provide customized packages to suit your specific preferences and budget. Contact us to discuss your requirements.
        </Text>
       
       
      </View>

    );
  }

}


 const myView3 = () => {
 
  {
    if (view === 'first') {
      return (
        <View style={styles.questionBox1}>
         <Text style={[styles.questionHeadingTxt,{ width:responsiveWidth(80)}]}>How many days before should I book your services for my event?</Text>

         <Pressable  style={{flexDirection:"row-reverse",paddingHorizontal:15,}}onPress={() => setView('second')}>
          <FontAwsome  name="angle-up" color={"black"} size={20}/>
          </Pressable>
        </View>
      );
    } else if (view === 'second') {
      return (
        <View style={styles.questionBox2}>
        <View style={styles.innerquestionBox}>

        <Text style={[styles.questionHeadingTxt,{ width:responsiveWidth(80), color:"white"}]}>How many days before should I book your services for my event?</Text>
          <Pressable  style={{flexDirection:"row-reverse",paddingHorizontal:15,}} onPress={() => setView('first')}>
          <FontAwsome  name="angle-down" color={white} size={20}/>



          </Pressable>
        </View>
          <Text style={styles.questionTxt}>You need to book your services at least 12-15 days prior the event. However, we can also accommodate last-minute requests based on availability.</Text>
         
         
        </View>
      );
    }
  }

  
 };

  return (
    <ScrollView  showsVerticalScrollIndicator={false} style={{flex:1, marginBottom:responsiveHeight(8), backgroundColor:"white"}}>
              {/* -------------------HEADER----------------------------------- */}

              <MyHeader/>
              {/* --------------------Main------------------------------------ */}
              <View style= {{flexDirection:"column", paddingHorizontal:responsiveWidth(1),paddingTop: responsiveHeight(2),}}>
                {/* card */}




                {/* Wedding Cards */}
              <View style= {{flexDirection:"column", marginBottom:responsiveHeight(2)}}>
                
                  <View style={{width:responsiveWidth(100),justifyContent:"space-between",flexDirection:"row", paddingVertical:responsiveHeight(2)}}> 
                      
                      <Heading>Wedding Invites</Heading>
                      {/* <Text style={styles.headingText}></Text> */}

                      <View style={{paddingRight:responsiveWidth(3)}}> 
                          <ViewAllBtn onPress={()=>{
    navigation.navigate('WeddingCard',{card:"wed"})


                          }}/>
                        </View>

                        
                    </View>



                    <View style={{flexDirection:"row",marginTop:5,width:responsiveWidth(100),}}>
                                        <View style={styles.wedDecCard}>
                                          <Image style={styles.cardImage} source={require('../Images/2.jpg')}/>
                                          {/* <Text style={styles.wedDectext}>Divine Events </ Text> */}
                                        </View>

                                        
                                        <View style={[styles.wedDecCard,{marginHorizontal:15}]}>
                                        <Image style={styles.cardImage} source={require('../Images/5.jpg')}/>
                                        </View>
                                        <View style={styles.wedDecCard}>
                                        <Image style={styles.cardImage} source={require('../Images/6.jpg')}/>
                                        </View>
                                       
                                </View>


              </View>



                {/* Videos Invitation */}
                <View style= {{flexDirection:"column", }}>
                
                <View style={{width:responsiveWidth(100),justifyContent:"space-between",flexDirection:"row", paddingVertical:responsiveHeight(2)}}> 
                <Heading>Corporate Invites</Heading>
                    
                    {/* <Text style={styles.headingText}></Text> */}
                    <View style={{paddingRight:responsiveWidth(3)}}> 

                    <ViewAllBtn onPress={()=>{
    navigation.navigate('WeddingCard',{card:"cor"})


                          }}/>


                      </View>
                  </View>



                  <View style={{flexDirection:"row",marginTop:responsiveHeight(1),width:responsiveWidth(100),}}>
                                        <View style={styles.wedDecCard}>
                                          <Image style={styles.cardImage} source={require('../Images/c1.jpg')}/>
                                          {/* <Text style={styles.wedDectext}>Divine Events </ Text> */}
                                        </View>

                                        
                                        <View style={[styles.wedDecCard,{marginHorizontal:15}]}>
                                        <Image style={styles.cardImage} source={require('../Images/c3.jpg')}/>

                                        </View>
                                        <View style={styles.wedDecCard}>
                                        <Image style={styles.cardImage} source={require('../Images/c7.jpg')}/>


                                        </View>
                                       
                                </View>

            </View>


            
               


              
              </View>


              <View style={{flexDirection: 'column',marginVertical:responsiveHeight(3)}}>
  
                          <View style={{marginLeft:responsiveWidth(1),marginTop:responsiveHeight(1)}}>
            <Heading>Frequently asked questions</Heading>
            </View>
              
 
  
  
  {/* <Text style={{fontWeight:"bold",color:blue, fontSize:responsiveFontSize(2),marginBottom:responsiveHeight(1),marginHorizontal: responsiveWidth(2),}}></Text> */}

  <View>{myView1()}</View>
  <View>{myView2()}</View>
  <View>{myView3()}</View>
  
  
  
  </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({


  headingText:{
    fontWeight:'bold', color:"#000D52",fontSize:responsiveFontSize(2)
  },
  wedDecCard:{
     width:responsiveWidth(30),
  },
  cardImage:{height:responsiveHeight(22),width:responsiveWidth(30),},
  questionBox1:{justifyContent:"space-between",flexDirection:"row",marginHorizontal:responsiveWidth(2),marginVertical:responsiveHeight(2),paddingHorizontal:responsiveWidth(2),paddingVertical:responsiveHeight(2),backgroundColor:"#BEBEBE"},
  innerquestionBox:{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:responsiveWidth(1),paddingVertical:responsiveHeight(2),backgroundColor:blue
},

  questionBox2:{flexDirection:"column",marginHorizontal:responsiveWidth(2),marginVertical:responsiveHeight(2),  backgroundColor:"white",},
  questionTxt:{color:"black",paddingHorizontal:responsiveWidth(2),marginTop:10},
  questionHeadingTxt:{color:"black",fontSize:responsiveFontSize(1.8), fontWeight:"bold",},
  // questionHeadingTxt1:{color:"#000D52",fontSize:14, fontWeight:"700"},

});

export default Einvites