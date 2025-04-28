import React, {useEffect, useState, useMemo} from 'react';
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {blue, white} from './Colors';
import SearchComponent from './Components/SearchComponent';
import FilterComponent from './Components/Packages/FilterComponent';
import PackageIntroComponent from './Components/Packages/PackageIntroComponent';
import {getPackage} from './Hooks/api/packagesApi';

const RenderContent = ({view, setView, setSelectedType, setLoading}) => {
  if (view === 'second') {
    return (
      <FilterComponent
        view={view}
        setView={setView}
        setSelectedType={setSelectedType}
        setLoading={setLoading}
      />
    );
  }
  return (
    <SearchComponent
      hideSuggestions={false}
      isHome={false}
      isFilter={true}
      onPress={() => {
        setView('second');
      }}
      setServiceSearchQuery={setSelectedType}
    />
  );
};

const Packages = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('first');
  const [myAllDataPackage, setmyAllDataPackage] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const navigation = useNavigation();
  const filteredAndMappedData = useMemo(() => {
    // Log the entire data before filtering
    //console.log('Original Data:', myAllDataPackage);

    if (selectedType === '') {
      return myAllDataPackage;
    }

    return myAllDataPackage.filter(item => {
      // Log each item being checked

      return (
        // item.event_type === selectedType ||
        //item.location === selectedType ||
        item.package_name.toLowerCase().includes(selectedType.toLowerCase())
      );
    });
  }, [selectedType, myAllDataPackage]);

  useEffect(() => {
    setLoading(true);
    getPackage().then(result => {
      //console.log('----------------------------------setmyAllDataPackage');
      //console.log('setmyAllDataPackage', result);
      //console.log('----------------------------------setmyAllDataPackage');
      setmyAllDataPackage(result);
      setLoading(false);
    });
  }, []);

  /*   useEffect(() => {
    //console.log('Current view:', view);
  }, [view]); */

  const whatsAppPressHandler = () => {
    const url = `https://wa.me/+923257870001`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          alert('WhatsApp not installed or unavailable.');
        }
      })
      .catch(err => console.error('An error occurred:', err));
  };

  const renderItem = ({item}) => {
    //console.log('-------------------- renderItem ', item);
    if (!item) return null;
    const imgS = `https://www.caterstation.pro/public/vendor/package/${item.image}`;
    return (
      <View style={styles.shadowCard}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PackageDetails', {
              item,
              img: 'https://www.caterstation.pro/public/vendor/package/',
            })
          }>
          <Image source={{uri: imgS}} style={styles.cardImage} />
          <Pressable onPress={whatsAppPressHandler} style={styles.whatsApp}>
            <FontAwesome name="whatsapp" color={'#25D366'} size={25} />
          </Pressable>
        </TouchableOpacity>
        <View style={{padding: responsiveWidth(2)}}>
          <PackageIntroComponent
            packageName={item.package_name}
            price={item.price}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <RenderContent
        view={view}
        setView={setView}
        setSelectedType={setSelectedType}
        setLoading={setLoading}
      />
      <View style={styles.list}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredAndMappedData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: responsiveHeight(8),
  },
  list: {
    flex: 1,
    width: responsiveWidth(98),
    paddingVertical: responsiveHeight(1),
  },
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loadingText: {
    fontSize: responsiveFontSize(2),
    color: blue,
    marginTop: responsiveHeight(1),
    textAlign: 'center',
    width: responsiveWidth(100),
  },
  shadowCard: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 8,
    elevation: 5,
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    marginHorizontal: responsiveWidth(2.5),
    marginBottom: responsiveHeight(2),
    width: responsiveWidth(95),
  },
  whatsApp: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: white,
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  cardImage: {
    width: '99%',
    height: responsiveHeight(20),
    borderRadius: 8,
    width: responsiveWidth(90),
  },
});

export default Packages;
