import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {black, blue, greyBg, white} from './Colors';
import {removeFromCart, updateCartQuantity} from './redux/MyPackageSlice';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Dropdown } from 'react-native-element-dropdown';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {packageBaseUrl} from './utils/baseURL';
import {useDispatch} from 'react-redux';
import { useState } from 'react';

export const UiAddToCart = item => {


  
  const dispatch = useDispatch();
  const myImg = `${packageBaseUrl}/${item.item.item.image}`;
  const data = [];
  for (let i = 200; i <= 5000; i++) {
    data.push({ label: `${i}`, value: `${i}` });
  }
  const [updateQ,setupdateQ]=useState();  
  const handleIncreament = () => {
    dispatch(
      updateCartQuantity({
        id: item.item.item.id,
        quantity: item.item.item.quantity + 1,
      }),
    );
  };

  const handleDecrement = () => {
    if (item.item.item.quantity > 200) {
      dispatch(
        updateCartQuantity({
          id: item.item.item.id,
          quantity: item.item.item.quantity - 1,
        }),
      );
    }
  }; 
  const [quantity, setQuantity] = useState(item.item.item.quantity);

  const handleDrop = (selectedQuantity) => {
    const updatedQuantity = parseInt(selectedQuantity);
    dispatch(updateCartQuantity({ id: item.item.item.id, quantity: updatedQuantity }));
    setQuantity(updatedQuantity);
  };




  const handleRemove = () => {
    dispatch(
      removeFromCart({
        id: item.item.item.id,
      }),
    );
  };

  return (
    <View
      style={[
        styles.shadowcard,
        {
          flexDirection: 'column',
          marginLeft: responsiveWidth(2),
          marginRight: responsiveWidth(2),
          paddingVertical: responsiveHeight(1.5),
          width: responsiveWidth(96),
          marginVertical: responsiveHeight(1),
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', width: responsiveWidth(95)}}>
          <View style={{width: responsiveWidth(23), backgroundColor: 'green '}}>
            <Image
              style={{height: responsiveHeight(10), width: responsiveWidth(20)}}
              source={{uri: myImg}}
            />
          </View>

          <View style={{flexDirection: 'column', width: responsiveWidth(72)}}>
            <Text
              style={{
                color: black,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
              }}>
              {item.item.item.package_name}
            </Text>
            <Text
              style={{
                color: black,
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
                marginTop: responsiveHeight(0.5),
              }}>
              Event type:{' '}
              <Text style={{fontWeight: 'normal'}}>
                {item.item.item.event_type}
              </Text>
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
                color: black,
                marginTop: responsiveHeight(0.5),
              }}>
              Rs:{item.item.item.price}{' '}
              <Text style={{fontWeight: 'normal'}}>/ per head</Text>
            </Text>
            <View
              style={{
                width: responsiveWidth(70),
                height: responsiveHeight(7),
                flexDirection: 'row-reverse',
                marginTop: responsiveHeight(2),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: responsiveHeight(6),
                  width: responsiveWidth(60),
                  // backgroundColor:"red"
                }}>
                {/* <Pressable
                  style={{
                    backgroundColor: blue,
                    height: responsiveHeight(4),
                    width: responsiveHeight(4),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    handleDecrement();
                  }}>
                  <Text
                    style={{color: white, fontSize: 14, fontWeight: 'bold'}}>
                    -
                  </Text>
                </Pressable>
                <View
                  style={{
                    backgroundColor: white,
                    height: responsiveHeight(4),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>








                  <Text
                    style={{
                      color: blue,
                      justifyContent: 'center',
                      fontSize: responsiveFontSize(2.5),
                      marginHorizontal: responsiveWidth(1),
                    }}>
                    {item.item.item.quantity}
                  </Text>
                </View>
                <Pressable
                  style={{
                    backgroundColor: blue,
                    height: responsiveHeight(4),
                    width: responsiveHeight(4),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    handleIncreament();
                  }}>
                  <Text style={{color: white, fontSize: 14}}>+</Text>
                </Pressable> */}


<Dropdown
          style={{
            height: responsiveHeight(5),
            width: responsiveWidth(25),
            backgroundColor: blue,
            paddingHorizontal: responsiveWidth(4),
            marginHorizontal: responsiveWidth(5),
            marginVertical: responsiveHeight(2)
          }}
          placeholderStyle={{ fontSize: responsiveFontSize(1.8), color: white }}
          selectedTextStyle={{color:white}}
          iconStyle={{color:white}}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          // placeholder="Event Location"
                value={String(quantity)} // Ensure value is string for comparison
onChange={(selectedItem) => handleDrop(selectedItem.value)}
        />



                <Pressable
                  onPress={() => {
                    handleRemove();
                  }}
                  style={{
                    backgroundColor: white,
                    height: responsiveHeight(4.9),
                    width: responsiveHeight(4.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: responsiveWidth(2),
                    borderColor:blue,
                    borderWidth:1
                  }}>
                  <Text>
                    <AntDesign name="delete" color={blue} size={25} />
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>




     

         {/* <Dropdown
        style={styles.dropdown}
        data={data}
        placeholderStyle={{ fontSize: responsiveFontSize(1.8), color: black }}
        // placeholderStyle={{ fontSize: responsiveFontSize(1.8), color: 'black' }}
  selectedTextStyle={{ color: 'black' }} // Apply color to selected text
  textStyle={{ color: 'black' }} 
        value={String(quantity)} // Ensure value is string for comparison
        onChange={(selectedItem) => handleDrop(selectedItem.value)}
      /> */}

      <View style={{flexDirection: 'row', marginTop: responsiveHeight(2)}}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Number of Guests</Text>
          <Text style={{marginTop: responsiveHeight(1.5)}}>
            {item.item.item.quantity}
          </Text>
        </View>
        <Text style={{marginHorizontal: responsiveWidth(2)}}>x</Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Price Per Head</Text>
          <Text style={{marginTop: responsiveHeight(1.5)}}>
            {item.item.item.price}
          </Text>
        </View>
        <Text style={{marginHorizontal: responsiveWidth(2)}}>=</Text>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Total Bill</Text>
          <Text style={{marginTop: responsiveHeight(1.5)}}>
            {item.item.item.price * item.item.item.quantity} Pkr
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  text: {
    fontSize: 24,
  },
  shadowcard: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(1.5),
  },
  txt: {
    color: black,
    fontSize: responsiveFontSize(1.8),
  },

  dropdown: {
  height: responsiveHeight(6),
  width: responsiveWidth(90),
  backgroundColor: greyBg,
  paddingHorizontal: responsiveWidth(4),
  marginHorizontal: responsiveWidth(5),
  marginVertical: responsiveHeight(2),
  color:black

  },
});

export default UiAddToCart;
