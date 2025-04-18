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
import React ,{useEffect, useState} from 'react'
import FontAwsome from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MyHeader from './MyHeader'
import { useNavigation } from '@react-navigation/native'
import ViewAllBtn from './ViewAllBtn'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { white , black, blue,yellow, greyBg, greyDark} from './Colors'
import { getVendors } from './Hooks/api/vendorApi'
import Title from './Title'
import Heading from './Heading'


const VendorTab = () => {
  const navigation=useNavigation();

  const [searchText, setSearchText] = useState('');
  const [view, setView] = useState('first');
  const [view3, setView3] = useState('third');
  const [view5, setView5] = useState('five');
  const [myAllDataVendor, setmyAllDataVendor] = useState(); // Initialize with empty array

 
  const [dataSearch, setDataSearch] = useState([
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    // Add more data as needed
  ]);
  const [vendors, setVendors] = useState([]);
  const [vendorsDecor, setVendorsDecore] = useState([]);
  const [vendorsfood, setVendorsfood] = useState([]);
  const [vendorsphotogaphy, setVendorsphotography] = useState([]);
  const [vendorsWedVenue, setVendorsWedvenue] = useState([]);
  // const {myService}=route.params;
  // console.log('my service======', myService)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.caterstation.pro/api/vendors'); // Replace with your API endpoint
     
     
      const data = await response.json();
  // console.log('my data======', data)


      const filteredVendors = data.allvendors.filter((vendor) => {
        return vendor.vendor_services.some((service) => service.service_name === 'Catering');
      });
      const filteredVendorsDecore = data.allvendors.filter((vendor) => {
        return vendor.vendor_services.some((service) => service.service_name === 'DECOR');
      });
      const filteredVendorsFood = data.allvendors.filter((vendor) => {
        return vendor.vendor_services.some((service) => service.service_name === 'Food');
      });
      const filteredVendorsPhotography = data.allvendors.filter((vendor) => {
        return vendor.vendor_services.some((service) => service.service_name === 'Photography');
      });
      const filteredVendorsWedVenue = data.allvendors.filter((vendor) => {
        return vendor.vendor_services.some((service) => service.service_name === 'Wedding Venues');
      });

      setVendors(filteredVendors);
      setVendorsDecore(filteredVendorsDecore);
      setVendorsfood(filteredVendorsFood);
      setVendorsphotography(filteredVendorsPhotography);
      setVendorsWedvenue(filteredVendorsWedVenue)
    };

    fetchData();
  }, []);

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
 

// _________________handle view all vendors_____________________________________



const handleNavigationCatering = () => {
  navigation.navigate('ViewAllVendors',{myService:'Catering'})

 
};
const handleNavigationDecore = () => {
  navigation.navigate('ViewAllVendors',{myService:'DECOR'})
 
};
const handleNavigationFood = () => {
  navigation.navigate('ViewAllVendors',{myService:'Food'})

 
};
const handleNavigationPhotography = () => {
  navigation.navigate('ViewAllVendors',{myService:'Photography'})

 
};
const handleNavigationWedVenue = () => {
  navigation.navigate('ViewAllVendors',{myService:'Wedding Venues'})

 
};


  return (




    <ScrollView  showsVerticalScrollIndicator={false} style={{flex:1, marginBottom:responsiveHeight(8), backgroundColor:"white", width:responsiveWidth(100)}}>
        {/* headerView */}


 <MyHeader/>
{/* ______________________________main view____________________________________________________ */}

         
          <View style={{flexDirection:"column",paddingRight:responsiveWidth(2), paddingTop:responsiveHeight(1),}}>

                     {/* __________________catering__________________ */}

                     <View style={{flexDirection:"column",position:"relative",}}>
                          {/* wedding decoration image card */}
          
                              <View style={{width:responsiveWidth(100),flexDirection:"row",}}>
                                        <View style={{width:responsiveWidth(38)}}>
                                                
                                        </View>
                                        <View style={{width:responsiveWidth(60),paddingRight:responsiveWidth(1)}}>
                                        <Image style={{height:responsiveHeight(20),width:responsiveHeight(32),marginRight:0}} source={require('../Images/cate111.jpeg')}/>

                                        </View>

                              </View>
                               
                               <View style={styles.shadowcard}>
                                <Heading>Catering</Heading>
                                <Title style={{color:greyDark, fontWeight: 'normal',}}>Indulge in a culinary journey with our diverse catering options.</Title>
                                                {/* <Text style={styles.headingText}>Catering</Text> */}

                                                {/* <Text style={{fontSize:responsiveFontSize(1.5),color:black}}>Indulge in a culinary journey with our diverse catering options.</Text> */}
                                        </View>

                                        <View style={{marginTop:responsiveHeight(2),flexDirection:"row-reverse",marginLeft:responsiveWidth(.5)}}>



                                        <ViewAllBtn onPress={handleNavigationCatering}/>

                                       



                                </View>

                                <View style={styles.imgCard}>
                                <FlatList
     
      data={vendors.slice(0,3)}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      horizontal
      // numColumns={3} // you can set the number of columns here
      // renderItem={(item)=> <RenderItem item={item}  />}
      renderItem={(item) => {
        
        const imgS=`https://caterstation.pro/public/vendor/thumb/${item.item.thumb}`
        const cimg=`https://caterstation.pro/public/vendor/cover/${item.item.cover_img}`
        // console.log("cover img", cimg)

        console.log('i am catering vendor', item); 

        return (
          <View style={{marginHorizontal: responsiveWidth(1),}}>
             <Pressable disabled onPress={() => {
             navigation.navigate("DetailsVendor", 
               {
                item,
                Thumb:imgS,
                Cover:cimg
              
              }
               
               ) 
           
              
              }} style={styles.wedDecCard}>
          <View style={{justifyContent:'center', alignItems:'center'}}>


<Image style={{height:responsiveHeight(10), width:responsiveWidth(24)}} source={{uri:imgS}} />
</View>
            <View style={{marginTop:responsiveHeight(1), justifyContent:'center', alignItems:'center'}}>
              <Text  numberOfLines={1}  style={{color:black, textAlign:"center", fontWeight: 'bold',}}>{item.item.company_name}</Text>
            </View>
          </Pressable>
          </View>
         
        )
      }}
     

    />

                                     
                                       
                                </View>
                    </View>



                    {/* __________________food___________________ */}

                    <View style={{flexDirection:"column",position:"relative",paddingHorizontal:responsiveWidth(0),  width:responsiveWidth(100)}}>
                          {/* wedding decoration image card */}
          
                              <View style={{width:responsiveWidth(100),flexDirection:"row",}}>
                                        
                                        <View style={{width:responsiveWidth(60)}}>
                                        <Image style={{height:responsiveHeight(20),width:responsiveHeight(32),}} source={require('../Images/de1.jpeg')}/>

                                        </View>
                                        <View style={{width:responsiveWidth(40)}}>
                                                
                                        </View>

                              </View>
                               
                              <View style={styles.flipshadowcard}>
                              <Heading>Decor</Heading>

                                                {/* <Text style={[styles.headingText,{ color:blue}]}></Text> */}


                                <Title style={{color:greyDark, fontWeight: 'normal',}}>Transform any space into a stunning masterpiece with our bespoke decor services.</Title>

                                                {/* <Text style={{fontSize:responsiveFontSize(1.5),color:black }}>Transform any space into a stunning masterpiece with our bespoke decor services.</Text> */}

                                        </View>


                                        <View style={{marginTop:responsiveHeight(2),flexDirection:"row-reverse",marginLeft:responsiveWidth(.5)}}>
                                            <ViewAllBtn onPress={handleNavigationDecore}/>
                                            </View>

                                            <View style={styles.imgCard}>
                                <FlatList
     
      data={vendorsDecor.slice(0,3)}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      horizontal
      // numColumns={3} // you can set the number of columns here
      // renderItem={(item)=> <RenderItem item={item}  />}
      renderItem={(item) => {
        
        const imgS=`https://caterstation.pro/public/vendor/thumb/${item.item.thumb}`
        const cimg=`https://caterstation.pro/public/vendor/cover/${item.item.cover_img}`
        // console.log("cover img", cimg)

        // console.log('item vendor', item); 

        return (
          <View style={{marginHorizontal: responsiveWidth(1),}}>
             <Pressable  disabled onPress={() => {
             navigation.navigate("DetailsVendor", 
               {
                item,
                Thumb:imgS,
                Cover:cimg
              
              }
               
               ) 
           
              
              }} style={styles.wedDecCard}>
             <View style={{justifyContent:'center', alignItems:'center'}}>


<Image style={{height:responsiveHeight(10), width:responsiveWidth(24)}} source={{uri:imgS}} />
</View>
            <View style={{marginTop:responsiveHeight(1), justifyContent:'center', alignItems:'center'}}>

              <Text numberOfLines={1}  style={{color:black, textAlign:"center", fontWeight: 'bold',}}>{item.item.company_name}</Text>
            </View>
          </Pressable>
          </View>
         
        )
      }}
     

    />

                                     
                                       
                                </View>
                    </View>

  {/*  */}

  <View style={{flexDirection:"column",position:"relative",}}>
                          {/* wedding decoration image card */}
          
                              <View style={{width:responsiveWidth(100),flexDirection:"row",}}>
                                        <View style={{width:responsiveWidth(38)}}>
                                                
                                        </View>
                                        <View style={{width:responsiveWidth(60),paddingRight:responsiveWidth(1)}}>
                                        <Image style={{height:responsiveHeight(20),width:responsiveHeight(32),marginRight:0}} source={require('../Images/f1.jpeg')}/>

                                        </View>

                              </View>
                               
                               <View style={styles.shadowcard}>
                                <Heading>Food</Heading>
                                                {/* <Text style={styles.headingText}>Food</Text> */}
                                                <Title style={{color:greyDark, fontWeight: 'normal',}}>Elevate your dining experience with our curated selection of delectable dishes.</Title>
                                                {/* <Text style={{fontSize:responsiveFontSize(1.5),color:black}}>Elevate your dining experience with our curated selection of delectable dishes.</Text> */}
                                        </View>

                                        <View style={{marginTop:responsiveHeight(2),flexDirection:"row-reverse",marginLeft:responsiveWidth(.5)}}>



                                        <ViewAllBtn onPress={handleNavigationFood}/>

                                       



                                </View>

                                <View style={styles.imgCard}>
                                <FlatList
     
      data={vendorsfood.slice(0,3)}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      horizontal
      // numColumns={3} // you can set the number of columns here
      // renderItem={(item)=> <RenderItem item={item}  />}
      renderItem={(item) => {
        
        const imgS=`https://caterstation.pro/public/vendor/thumb/${item.item.thumb}`
        const cimg=`https://caterstation.pro/public/vendor/cover/${item.item.cover_img}`
        // console.log("cover img", cimg)

        console.log('i am catering vendor', item); 

        return (
          <View style={{marginHorizontal: responsiveWidth(1),}}>
             <Pressable disabled onPress={() => {
             navigation.navigate("DetailsVendor", 
               {
                item,
                Thumb:imgS,
                Cover:cimg
              
              }
               
               ) 
           
              
              }} style={styles.wedDecCard}>
            <View style={{justifyContent:'center', alignItems:'center'}}>


<Image style={{height:responsiveHeight(10), width:responsiveWidth(24)}} source={{uri:imgS}} />
</View>
            <View style={{marginTop:responsiveHeight(1), justifyContent:'center', alignItems:'center'}}>

              <Text  numberOfLines={1}  style={{color:black, textAlign:"center", fontWeight: 'bold',}}>{item.item.company_name}</Text>
            </View>
          </Pressable>
          </View>
         
        )
      }}
     

    />

                                     
                                       
                                </View>
                    </View>



                    {/* __________________Photography___________________ */}

                    <View style={{flexDirection:"column",position:"relative",paddingHorizontal:responsiveWidth(0),  width:responsiveWidth(100)}}>
                          {/* wedding decoration image card */}
          
                              <View style={{width:responsiveWidth(100),flexDirection:"row",}}>
                                        
                                        <View style={{width:responsiveWidth(60)}}>
                                        <Image style={{height:responsiveHeight(20),width:responsiveHeight(32),}} source={require('../Images/p1.jpeg')}/>

                                        </View>
                                        <View style={{width:responsiveWidth(40)}}>
                                                
                                        </View>

                              </View>
                               
                              <View style={styles.flipshadowcard}>
                              <Heading>Photography</Heading>

                                                {/* <Text style={[styles.headingText,{ color:blue}]}></Text> */}

                                                <Title style={{color:greyDark, fontWeight: 'normal',}}>Capture every moment in detail with our professional photography services.</Title>


                                                {/* <Text style={{fontSize:responsiveFontSize(1.5),color:black }}>Capture every moment in detail with our professional photography services.</Text> */}

                                        </View>


                                        <View style={{marginTop:responsiveHeight(2),flexDirection:"row-reverse",marginLeft:responsiveWidth(.5)}}>
                                            <ViewAllBtn onPress={handleNavigationPhotography}/>
                                            </View>

                                            <View style={styles.imgCard}>
                                <FlatList
     
      data={vendorsphotogaphy.slice(0,3)}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      horizontal
      // numColumns={3} // you can set the number of columns here
      // renderItem={(item)=> <RenderItem item={item}  />}
      renderItem={(item) => {
        
        const imgS=`https://caterstation.pro/public/vendor/thumb/${item.item.thumb}`
        const cimg=`https://caterstation.pro/public/vendor/cover/${item.item.cover_img}`
        // console.log("cover img", cimg)

        // console.log('item vendor', item); 

        return (
          <View style={{marginHorizontal: responsiveWidth(1),}}>
             <Pressable  disabled onPress={() => {
             navigation.navigate("DetailsVendor", 
               {
                item,
                Thumb:imgS,
                Cover:cimg
              
              }
               
               ) 
           
              
              }} style={styles.wedDecCard}>
             <View style={{justifyContent:'center', alignItems:'center'}}>


<Image style={{height:responsiveHeight(10), width:responsiveWidth(24)}} source={{uri:imgS}} />
</View>
            <View style={{marginTop:responsiveHeight(1), justifyContent:'center', alignItems:'center'}}>

              <Text  numberOfLines={1}  style={{color:black, textAlign:"center", fontWeight: 'bold',}}>{item.item.company_name}</Text>
            </View>
          </Pressable>
          </View>
         
        )
      }}
     

    />

                                     
                                       
                                </View>
                    </View>

                    {/* __________________Co-operate Event Vendors___________________ */}

                    <View style={{flexDirection:"column",position:"relative",}}>
                          {/* wedding decoration image card */}
          
                          <View style={{width:responsiveWidth(100),flexDirection:"row",}}>
                                        <View style={{width:responsiveWidth(38)}}>
                                                
                                        </View>
                                        <View style={{width:responsiveWidth(60),paddingRight:responsiveWidth(1)}}>
                                        <Image style={{height:responsiveHeight(20),width:responsiveHeight(32),marginRight:0}} source={require('../Images/Wv1.jpeg')}/>

                                        </View>

                              </View>
                               
                              <View style={styles.shadowcard}>
                              <Heading>Wedding Venues</Heading>

                                                {/* <Text style={styles.headingText}></Text> */}
                                               
                                                <Title style={{color:greyDark, fontWeight: 'normal',}}>Discover the perfect setting for your event from our portfolio of versatile venues.</Title>
                                                
                                                {/* <Text style={{fontSize:responsiveFontSize(1.5),color:black}}></Text> */}

                                        </View>


                                        <View style={{marginTop:responsiveHeight(2),flexDirection:"row-reverse",marginLeft:responsiveWidth(.5)}}>
                                            <ViewAllBtn onPress={handleNavigationWedVenue}/>
                                            </View>


                                 <View style={styles.imgCard}>
                                <FlatList
     
      data={vendorsWedVenue.slice(0,3)}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      horizontal
      // numColumns={3} // you can set the number of columns here
      // renderItem={(item)=> <RenderItem item={item}  />}
      renderItem={(item) => {
        
        const imgS=`https://caterstation.pro/public/vendor/thumb/${item.item.thumb}`
        const cimg=`https://caterstation.pro/public/vendor/cover/${item.item.cover_img}`
        // console.log("cover img", cimg)

        // console.log('item vendor', item); 

        return (
          <View style={{marginHorizontal: responsiveWidth(1),}}>
             <Pressable disabled onPress={() => {
             navigation.navigate("DetailsVendor", 
               {
                item,
                Thumb:imgS,
                Cover:cimg
              
              }
               
               ) 
           
              
              }} style={styles.wedDecCard}>
          <View style={{justifyContent:'center', alignItems:'center'}}>


            <Image style={{height:responsiveHeight(10), width:responsiveWidth(24)}} source={{uri:imgS}} />
          </View>

            <View style={{marginTop:responsiveHeight(1), justifyContent:'center', alignItems:'center'}}>

              <Text numberOfLines={1} style={{color:black, textAlign:"center", fontWeight: 'bold',}}>{item.item.company_name}</Text>
            </View>
          </Pressable>
          </View>
         
        )
      }}
     

    />

                                     
                                       
                                </View>
                    </View>
                    {/* __________________Questions___________________________________ */}
                    <View style={{flexDirection: 'column',marginVertical:responsiveHeight(2), paddingLeft:responsiveWidth(2)}}>
                    <Heading>Frequently asked questions</Heading>

  <Text style={{fontWeight:"bold",color:blue, fontSize:responsiveFontSize(2),marginBottom:responsiveHeight(1)}}></Text>

 
  <View>{myView1()}</View>
  <View>{myView2()}</View>
  <View>{myView3()}</View>
  
  
  
  </View> 

          </View>

      




      </ScrollView>
  )
}
const styles=StyleSheet.create({


  
    headingText:{
      fontWeight:'bold', color:"#000D52",fontSize:responsiveFontSize(2), width:responsiveWidth(100)
    },
    shadowcard:{
      paddingHorizontal:responsiveWidth(2),width:responsiveWidth(50),backgroundColor:"white",height:responsiveHeight(14), position:"absolute",top: 25,left:15, height:responsiveHeight(12),     borderRadius:10,
      paddingTop:responsiveHeight(.8),  paddingBottom:responsiveHeight(.2),
      shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
        // Elevate the view to create a shadow effect
    elevation: 4,},
    
    flipshadowcard:{
      paddingHorizontal:responsiveWidth(2),width:responsiveWidth(50),backgroundColor:white,height:responsiveHeight(12),  position:"absolute",top: 25,right:30, borderRadius:10,paddingTop:responsiveHeight(.8),  paddingBottom:responsiveHeight(.2),  shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.3,shadowRadius: 4, elevation: 4,},
    wedDecCard:{
      height:responsiveHeight(22),width:responsiveWidth(29), flexDirection:"column", marginHorizontal:responsiveWidth(1)

    },
    wedDectext:{
      fontSize:responsiveFontSize(1.3), fontWeight:"bold",textAlign:"center",marginTop:responsiveHeight(1)
    },
    ViewAllBtn:{
      paddingHorizontal:responsiveWidth(.5),paddingVertical:responsiveHeight(.5),width:responsiveWidth(20), borderRadius:5,borderWidth:1,borderColor:"#BEBEBE",marginVertical:responsiveHeight(1)
    },



    // _____Questions styling_______________




    questionBox1:{justifyContent:"space-between",flexDirection:"row",marginVertical:responsiveHeight(2),paddingHorizontal:responsiveWidth(1),paddingVertical:responsiveHeight(2),backgroundColor:"#BEBEBE"},
    innerquestionBox:{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:responsiveWidth(1),paddingVertical:responsiveHeight(2),backgroundColor:blue},
    questionBox2:{flexDirection:"column",marginVertical:responsiveHeight(2),  backgroundColor:"white",},
    questionTxt:{color:"black",paddingHorizontal:responsiveWidth(2),marginTop:10},
    questionHeadingTxt:{color:"black",fontSize:responsiveFontSize(1.8), fontWeight:"bold",justifyContent:"center",justifyContent:"center", alignItems:"center", paddingLeft:responsiveWidth(1)},
    // questionHeadingTxt1:{color:"#000D52",fontSize:14, fontWeight:"700"},




    imgCard:{
   width:responsiveWidth(100) ,  flexDirection:"row",marginVertical:responsiveHeight(1.8), height:responsiveHeight(20), marginHorizontal:responsiveWidth(1)
    },
    Img:{
      height:responsiveHeight(18),width:responsiveWidth(30),
    }
  
});

export default VendorTab