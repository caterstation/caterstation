import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';

import {blue, white} from '../../Colors';
import Heading from '../../Heading';

const VendorQuestionsComponent = () => {
  const [view, setView] = useState('first');
  const [view3, setView3] = useState('third');
  const [view5, setView5] = useState('five');
  // __________________Questions___________________________________
  const myView1 = () => {
    if (view5 === 'five') {
      return (
        <View style={styles.questionBox2}>
          <View style={styles.innerquestionBox}>
            <Text style={[styles.questionHeadingTxt, {color: white}]}>
              What types of events do you specialize in?
            </Text>

            <Pressable
              style={{flexDirection: 'row-reverse', paddingHorizontal: 15}}
              onPress={() => setView5('six')}>
              <FontAwsome name="angle-down" color={white} size={20} />
            </Pressable>
          </View>
          <Text style={styles.questionTxt}>
            Our expertise covers a wide range of events, including weddings,
            corporate functions, conferences, and casual events.
          </Text>
        </View>
      );
    } else if (view5 === 'six') {
      return (
        <View style={styles.questionBox1}>
          <Text style={styles.questionHeadingTxt}>
            Do you offer customized event packages?
          </Text>
          <Pressable
            style={{flexDirection: 'row-reverse', paddingHorizontal: 15}}
            onPress={() => setView5('five')}>
            <FontAwsome name="angle-up" color={'black'} size={20} />
          </Pressable>
        </View>
      );
    }
  };

  const myView2 = () => {
    // <View><Text>Frequently asked question   myView</Text></View>

    if (view3 === 'third') {
      return (
        <View style={styles.questionBox1}>
          <Text style={styles.questionHeadingTxt}>
            Do you offer customized event packages?
          </Text>
          <Pressable
            style={{flexDirection: 'row-reverse', paddingHorizontal: 15}}
            onPress={() => setView3('fourth')}>
            <FontAwsome name="angle-up" color={'black'} size={20} />
          </Pressable>
        </View>
      );
    } else if (view3 === 'fourth') {
      return (
        <View style={styles.questionBox2}>
          <View style={styles.innerquestionBox}>
            <Text style={[styles.questionHeadingTxt, {color: white}]}>
              Do you offer customized event packages?
            </Text>

            <Pressable
              style={{flexDirection: 'row-reverse', paddingHorizontal: 15}}
              onPress={() => setView3('third')}>
              <FontAwsome name="angle-down" color={white} size={20} />
            </Pressable>
          </View>
          <Text style={styles.questionTxt}>
            Absolutely Yes! We provide customized packages to suit your specific
            preferences and budget. Contact us to discuss your requirements.
          </Text>
        </View>
      );
    }
  };

  const myView3 = () => {
    {
      if (view === 'first') {
        return (
          <View style={styles.questionBox1}>
            <Text
              style={[styles.questionHeadingTxt, {width: responsiveWidth(80)}]}>
              How many days before should I book your services for my event?
            </Text>

            <Pressable
              style={{flexDirection: 'row-reverse', paddingHorizontal: 15}}
              onPress={() => setView('second')}>
              <FontAwsome name="angle-up" color={'black'} size={20} />
            </Pressable>
          </View>
        );
      } else if (view === 'second') {
        return (
          <View style={styles.questionBox2}>
            <View style={styles.innerquestionBox}>
              <Text
                style={[
                  styles.questionHeadingTxt,
                  {width: responsiveWidth(80), color: 'white'},
                ]}>
                How many days before should I book your services for my event?
              </Text>
              <Pressable
                style={{flexDirection: 'row-reverse', paddingHorizontal: 15}}
                onPress={() => setView('first')}>
                <FontAwsome name="angle-down" color={white} size={20} />
              </Pressable>
            </View>
            <Text style={styles.questionTxt}>
              You need to book your services at least 12-15 days prior the
              event. However, we can also accommodate last-minute requests based
              on availability.
            </Text>
          </View>
        );
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        marginVertical: responsiveHeight(2),
        paddingLeft: responsiveWidth(2),
      }}>
      <Heading>Frequently asked questions</Heading>

      <Text
        style={{
          fontWeight: 'bold',
          color: blue,
          fontSize: responsiveFontSize(2),
          marginBottom: responsiveHeight(1),
        }}></Text>

      <View>{myView1()}</View>
      <View>{myView2()}</View>
      <View>{myView3()}</View>
    </View>
  );
};

export default VendorQuestionsComponent;

const styles = StyleSheet.create({
  questionBox1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(2),
    backgroundColor: '#BEBEBE',
  },
  innerquestionBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(2),
    backgroundColor: blue,
  },
  questionBox2: {
    flexDirection: 'column',
    marginVertical: responsiveHeight(2),
    backgroundColor: 'white',
  },
  questionTxt: {
    color: 'black',
    paddingHorizontal: responsiveWidth(2),
    marginTop: 10,
  },
  questionHeadingTxt: {
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: responsiveWidth(1),
  },
});
