import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { black, greyBg, white } from './Colors';

const OrderCard = () => (
  <View style={styles.shadowCard}>
    <View style={styles.cardRow}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../Images/food1.jpg')}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.itemTitle}>One Dish with mutton</Text>
        <Text>Alnafora</Text>
        <Text style={styles.price}>Rs: 2000</Text>
      </View>
    </View>
  </View>
);

const OrderList = () => (
  <ScrollView style={styles.scene}>
    <OrderCard />
    <OrderCard />
    <OrderCard />
  </ScrollView>
);

const renderScene = SceneMap({
  upcoming: OrderList,
  completed: OrderList,
  cancelled: OrderList,
});

const MyOrders = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'completed', title: 'Completed' },
    { key: 'cancelled', title: 'Cancelled' },
  ]);

  const renderLabel = ({ route }) => (
    <Text style={styles.tabLabel}>{route.title}</Text>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      renderLabel={renderLabel}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwsome name="angle-left" color={black} size={20} />
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      <View style={styles.tabContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: '100%' }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    alignItems: 'center',
    borderBottomColor: greyBg,
    borderBottomWidth: 1,
  },
  headerText: {
    marginLeft: responsiveWidth(28),
    color: black,
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  tabContainer: {
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(1),
    height: responsiveHeight(90),
  },
  scene: {
    flex: 1,
    backgroundColor: white,
  },
  tabbar: {
    backgroundColor: white,
    marginBottom: responsiveHeight(2),
  },
  tabLabel: {
    color: black,
  },
  indicator: {
    backgroundColor: black,
    height: 2,
  },
  shadowCard: {
    marginVertical: responsiveHeight(1),
    borderRadius: 5,
    backgroundColor: white,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    width: responsiveWidth(94),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveWidth(2),
  },
  imageWrapper: {
    width: responsiveWidth(15),
    marginRight: responsiveWidth(3),
  },
  image: {
    height: responsiveHeight(6),
    width: responsiveWidth(12),
  },
  textWrapper: {
    flexDirection: 'column',
  },
  itemTitle: {
    fontWeight: 'bold',
    color: black,
  },
  price: {
    fontWeight: 'bold',
    color: black,
  },
});

export default MyOrders;
