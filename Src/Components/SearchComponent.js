import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



import {greyBg, white} from '../Colors';
import { vendorData, packageData, packageData2 } from '../utils/Contants';


const SearchComponent = ({
  hideSuggestions = false,
  isHome = false,
  isFilter = false,
  onPress = null,
  setServiceSearchQuery = () => {},
  isVendor = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');


  const [data, setData] = useState(isVendor ? vendorData : packageData);

  useEffect(() => {
    setData(isVendor ? vendorData : packageData);
  }, [isVendor]);

  const filteredData = searchQuery
    ? data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : data;

  const filteredData2 = searchQuery
    ? packageData2.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : packageData2;

  const handleSuggestionPress = title => {
    //console.log('title', title);
    setServiceSearchQuery(title);
    setSearchQuery(title);
  };

  const SearchKeywordsHandler = ({data}) => (
    <FlatList
      data={data}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => handleSuggestionPress(item.title)}
          style={[styles.suggestionItem, index === 0 ? {marginLeft: 10} : {}]}>
          <Text style={styles.suggestionText}>{item.title}</Text>
        </TouchableOpacity>
      )}
      style={styles.suggestionsList}
      showsHorizontalScrollIndicator={false}
    />
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          {backgroundColor: isHome ? white : '#f7f7f7'},
        ]}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />

        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={text => {
            setServiceSearchQuery(text);
            setSearchQuery(text);
          }}
        />
        {isFilter && (
          <TouchableOpacity onPress={() => onPress && onPress()}>
            <Image
              style={styles.image}
              source={require('../../Images/Filter.png')}
            />
          </TouchableOpacity>
        )}
      </View>

      {!hideSuggestions && filteredData.length > 0 && !isHome && (
        <SearchKeywordsHandler data={filteredData} />
      )}
      {!isVendor && !hideSuggestions && filteredData2.length > 0 && !isHome && (
        <SearchKeywordsHandler data={filteredData2} />
      )}
      {!isHome && <View style={styles.bottomBorder} />}
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  suggestionsList: {
    marginTop: 10,
  },
  suggestionItem: {
    backgroundColor: white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  bottomBorder: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: greyBg,
  },
});
