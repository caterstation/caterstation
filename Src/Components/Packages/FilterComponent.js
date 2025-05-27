import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {black, blue} from '../../Colors';
import {getEventType, getLocation} from '../../Hooks/api/packagesApi';

const GetFilterDataHandler = ({
  data,
  setSelectedType,
  setView,
  setLoading,
  emptyText,
  title,
}) => {
  return (
    <View style={styles.checkContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={2}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              setSelectedType(item);
              setLoading(true);
              setTimeout(() => {
                setView('first');
                setLoading(false);
              }, 500);
            }}
            style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>{emptyText}</Text>}
      />
    </View>
  );
};

const FilterComponent = ({view, setView, setSelectedType, setLoading}) => {
  const [myAllEvent, setMyAllEvents] = useState([]);
  const [myAllLocation, setMyAllLocation] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const events = await getEventType();
      const locations = await getLocation();
      setMyAllEvents(events || []); // Fallback to empty array
      setMyAllLocation(locations || []);
      setLoading(false);
    };
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render "first" view
  if (view === 'first') {
    return (
      <View style={styles.buttonFilterCard}>
        <Pressable
          onPress={() => setView('second')}
          style={styles.filterButtonContainer}>
          <Text style={styles.filterText}>Filter</Text>
          <Image
            style={styles.filterIcon}
            source={require('../../../Images/Filter.png')}
          />
        </Pressable>
      </View>
    );
  }

  // Render "second" view
  return (
    <View>
      <View style={styles.modalBox}>
        <GetFilterDataHandler
          data={myAllEvent}
          setSelectedType={setSelectedType}
          setView={setView}
          setLoading={setLoading}
          emptyText="No Events Available"
          title="Select Events"
        />
        {/* Location List */}
        <GetFilterDataHandler
          data={myAllLocation}
          setSelectedType={setSelectedType}
          setView={setView}
          setLoading={setLoading}
          emptyText="No Location Available"
          title="Select Location"
        />

        {/* Footer Buttons */}
        <View style={styles.bottomRow}>
          <Pressable onPress={() => setView('first')} style={styles.bottomBtn}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedType('');
              setView('first');
            }}
            style={styles.bottomBtn}>
            <Text style={styles.buttonText}>Clear</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default FilterComponent;

// Styles
const styles = StyleSheet.create({
  buttonFilterCard: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    marginHorizontal: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1.7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonContainer: {
    width: responsiveWidth(90),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    color: black,
  },
  filterIcon: {
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(2),
  },
  modalBox: {
    marginHorizontal: responsiveWidth(2),
    height: responsiveHeight(35),
  },
  checkContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
  },
  sectionTitle: {
    color: blue,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(1),
  },
  listItem: {
    width: responsiveWidth(45),
    paddingVertical: responsiveHeight(0.5),
  },
  itemText: {
    fontWeight: 'bold',
    color: black,
  },
  bottomRow: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  bottomBtn: {
    backgroundColor: blue,
    paddingHorizontal: responsiveWidth(15),
    paddingBottom: responsiveHeight(1),
    borderRadius: 5,
    marginBottom: responsiveHeight(2),
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
