import React, { createContext, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

// import PackagesMenu from './Packages'


import WeddingCard from './WeddingCard'
import WedCardDetails from './WedCardDetails'
import VideoInvitation from './VideoInvitation'
import VideoInvitDetail from './VideoInvitDetail'
import SaveTheDate from './SaveTheDate'
import SaveDateDetails from './SaveDateDetails'

import Notification from './Notification'
import Cities from './Cities'
import AllPagesButtons from './AllPagesButtons'
import DetailsVendor from './DetailsVendor'
// import ViewAllVendors from './ViewAllVendors'
import CitiesEventType from './CitiesEventType'
import UserEventDetail from './UserEventDetail'
import VendorOffering from './VendorOffering'
import VendorDetailsEventype from './VendorDetailsEventype'
import OrderSummary from './OrderSummary'
import ConfirmPayment from './ConfirmPayment'
import AddToCart from './AddToCart'
import AuthNav from './AuthNav'
import HeaderHome from './HeaderHome'
import OtpInp from './OtpInp'
import MyNumber from './MyNumber'
import NewNAvigation from './NewNAvigation'
// import PackageCheckout from './PackageCheckout'
import BackArrow from './BackArrow'
import ServiceVendors from './ServiceVendors'
import PackageUserDetails from './PackageUserDetails'
import EventLocAndType from './EventLocAndType'
import EventTypeFilter from './EventTypeFilter'
import UiAddToCart from './UiAddToCart'
import VendorTab from './VendorTab'
import ForYouDetailVendor from './ForYouDetailVendor'
import Pakagenavigation from './Pakagenavigation'
import PackageORderSummary from './PackageORderSummary'
import OtpLogin from './OtpLogin'
import PkgFilterdetail from './PkgFilterdetail'
import PkgEventFilter from './PkgEventFilter'
import { NavigationContainer } from '@react-navigation/native';
import PackageConfirmPAyment from './PackageConfirmPAyment';
import One from './One';
import MyAllVen from './MyAllVen';
import ServiceVendorDetail from './ServiceVendorDetail';
import AllCitiesVendors from './AllCitiesVendors';
import ImageSlider from './ImageSlider';
import ServiceOrderDetails from './ServiceOrderDetails';
import SplashScreen from './SplashScreen';
import Home from './Home';
import HorizontalBar from './HorizontalBar';
import ImgHbar from './ImgHbar';
import Events from './Events';
import CSEvents from './CSEvents';
import ReadMoreText from './ReadMoreText';
import Heading from './Heading';
import Title from './Title';
import TextDetail from './TextDetail';
import Custompackage from './Custompackage';
import Menu from './Menu';
import MenuAddOns from './MenuAddOns';
import MenuConfirm from './MenuConfirm';
// import myALLVendors from './myALLVendors';


const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="AuthNav"
          component={AuthNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AfterLoginC"
          component={AfterLoginC}
          options={{ headerShown: false }}
        />
   </Stack.Navigator>
    </NavigationContainer>
  );
};

module.exports = Navigation;



const AfterLoginC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

      <Stack.Screen
        name='Menu'
        component={Menu}
        options={{ headerShown: false }}
      /> 
    
      <Stack.Screen
        name="WeddingCard"
        component={WeddingCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WedCardDetails"
        component={WedCardDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoInvitation"
        component={VideoInvitation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoInvitDetail"
        component={VideoInvitDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SaveTheDate"
        component={SaveTheDate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SaveDateDetails"
        component={SaveDateDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cities"
        component={Cities}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetailsVendor"
        component={DetailsVendor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CitiesEventType"
        component={CitiesEventType}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserEventDetail"
        component={UserEventDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorOffering"
        component={VendorOffering}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorDetailsEventype"
        component={VendorDetailsEventype}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmPayment"
        component={ConfirmPayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddToCart"
        component={AddToCart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HeaderHome"
        component={HeaderHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpInp"
        component={OtpInp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyNumber"
        component={MyNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewNAvigation"
        component={NewNAvigation}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name='PackageCheckout' component={PackageCheckout} options={{headerShown:false}}/> */}
      <Stack.Screen
        name="BackArrow"
        component={BackArrow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceVendors"
        component={ServiceVendors}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PackageUserDetails"
        component={PackageUserDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PackageORderSummary"
        component={PackageORderSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventLocAndType"
        component={EventLocAndType}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventTypeFilter"
        component={EventTypeFilter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UiAddToCart"
        component={UiAddToCart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VendorTab"
        component={VendorTab}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
          name="ViewAllVendors"
          component={ViewAllVendors}
          options={{headerShown: false}}
        /> */}
      <Stack.Screen
        name="ForYouDetailVendor"
        component={ForYouDetailVendor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pakagenavigation"
        component={Pakagenavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpLogin"
        component={OtpLogin}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='MyAllVen'
        component={MyAllVen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ServiceVendorDetail'
        component={ServiceVendorDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AllCitiesVendors'
        component={AllCitiesVendors}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name='ImageSlider'
        component={ImageSlider}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ServiceOrderDetails'
        component={ServiceOrderDetails}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name='HorizontalBar'
        component={HorizontalBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ImgHbar'
        component={ImgHbar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Events'
        component={Events}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CSEvents'
        component={CSEvents}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ReadMoreText'
        component={ReadMoreText}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Heading'
        component={Heading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Title'
        component={Title}
        options={{ headerShown: false }}
      />  
        <Stack.Screen
        name='Custompackage'
        component={Custompackage}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name='TextDetail'
        component={TextDetail}
        options={{ headerShown: false }}
      /> 
    <Stack.Screen
        name='MenuAddOns'
        component={MenuAddOns}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name='MenuConfirm'
        component={MenuConfirm}
        options={{ headerShown: false }}
      />


    </Stack.Navigator>
  )
}