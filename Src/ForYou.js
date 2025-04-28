import React, {useState} from 'react';
import {StyleSheet, FlatList, SafeAreaView, View} from 'react-native';
import {white} from './Colors';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import HomeServices from './Components/HomeServices';
import WhyChooseUsComponent from './Components/WhyChooseUsComponent';
import EventPlanningComponent from './Components/Home/EventPlanningComponent';
import FeaturedVendorComponent from './Components/Home/FeaturedVendorComponent';
import EventByCaterstationComponent from './Components/Home/EventByCaterstationComponent';
import RecommendedPackagesComponent from './Components/Home/RecommendedPackagesComponent';
import FollowUsComponent from './Components/Home/FollowUsComponent';

const ForYou = () => {
  const [isPressed, setIsPressed] = useState(false);

  const components = [
    {id: 'homeServices', component: <HomeServices />},
    {id: 'eventPlanning', component: <EventPlanningComponent />},
    {
      id: 'featuredVendor',
      component: <FeaturedVendorComponent isPressed={isPressed} />,
    },
    {
      id: 'eventByCaterstation',
      component: <EventByCaterstationComponent isPressed={isPressed} />,
    },
    {
      id: 'recommendedPackages',
      component: <RecommendedPackagesComponent isPressed={isPressed} />,
    },
    {id: 'whyChooseUs', component: <WhyChooseUsComponent />},
    {id: 'followUs', component: <FollowUsComponent />},
  ];

  const renderComponent = ({item}) => <View>{item.component}</View>;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={components}
        renderItem={renderComponent}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginBottom: responsiveHeight(9),
    backgroundColor: white,
  },
  contentContainer: {
    paddingBottom: responsiveHeight(5),
  },
});

export default ForYou;
