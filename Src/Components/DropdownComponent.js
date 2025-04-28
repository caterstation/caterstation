import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker'; // Dropdown library
import Icon from 'react-native-vector-icons/FontAwesome';
import {Lblue, white} from '../Colors';

const DropdownComponent = () => {
  const [city, setCity] = useState('Lahore');
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Sialkot coming Soon..', value: 'Sialkot', disabled: true},
    {label: 'Gujranwala coming Soon..', value: 'Gujranwala', disabled: true},
    {label: 'Islamabad coming Soon..', value: 'Islamabad', disabled: true},
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={city}
        items={cities}
        setOpen={setOpen}
        setValue={setCity}
        setItems={setCities}
        placeholder={city}
        ArrowDownIconComponent={({style}) => (
          <View style={styles.iconContainer}>
            <Icon name="chevron-down" size={10} color={white} style={style} />
          </View>
        )}
        ArrowUpIconComponent={({style}) => (
          <View style={styles.iconContainer}>
            <Icon name="chevron-up" size={10} color={white} style={style} />
          </View>
        )}
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.textStyle}
        zIndex={5000}
        zIndexInverse={4000}
        nestedScrollEnabled
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    width: 130,
    marginHorizontal: 5,
    zIndex: 5000,
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
  },
  dropdownContainer: {
    backgroundColor: Lblue,
    borderWidth: 0,
  },
  placeholder: {
    color: white,
    fontSize: 12,
  },
  textStyle: {
    color: white,
    fontSize: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    marginTop: 10,
  },
});
