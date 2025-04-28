import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewAllBtn from './ViewAllBtn';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {blue, white} from './Colors';
import Heading from './Heading';
//import SearchComponent from './Components/SearchComponent';

const Einvites = () => {
  const navigation = useNavigation();
  const [view, setView] = useState('first');
  const [view3, setView3] = useState('third');
  const [view5, setView5] = useState('five');

  const handleWeddingCard = () => {
    navigation.navigate('WeddingCard', {card: 'wed'});
  };
  const handleVideoInvitation = () => {
    navigation.navigate('VideoInvitation');
  };
  const handleSaveTheDate = () => {
    navigation.navigate('SaveTheDate');
  };

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

  const Card = ({image, style}) => {
    return (
      <View style={[styles.wedDecCard, style]}>
        <Image style={styles.cardImage} source={image} />
      </View>
    );
  };

  const Invites = ({image1, image2, image3, heading, onPress}) => {
    return (
      <View style={styles.invitesContainer}>
        <View style={styles.invitesRow}>
          <Heading>{heading}</Heading>

          <View style={{paddingRight: responsiveWidth(3)}}>
            <ViewAllBtn onPress={onPress} />
          </View>
        </View>

        <View style={styles.cardsRow}>
          <Card image={image1} />
          <Card image={image2} style={{marginHorizontal: 15}} />
          <Card image={image3} />
        </View>
      </View>
    );
  };

  return (
      <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {/* <SearchComponent hideSuggestions={false} isHome={false} /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardsColumn}>
          {/* Wedding Cards */}
          <Invites
            image1={require('../Images/EInvites/2.jpg')}
            image2={require('../Images/EInvites/5.jpg')}
            image3={require('../Images/EInvites/6.jpg')}
            heading={'Wedding Invites'}
            onPress={() => navigation.navigate('WeddingCard', {card: 'wed'})}
          />
          <Invites
            image1={require('../Images/EInvites/c1.jpg')}
            image2={require('../Images/EInvites/c3.jpg')}
            image3={require('../Images/EInvites/c7.jpg')}
            heading={'Corporate Invites'}
            onPress={() => navigation.navigate('WeddingCard', {card: 'cor'})}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginVertical: responsiveHeight(3),
          }}>
          <View
            style={{
              marginLeft: responsiveWidth(1),
              marginTop: responsiveHeight(1),
            }}>
            <Heading>Frequently asked questions</Heading>
          </View>
          <View>{myView1()}</View>
          <View>{myView2()}</View>
          <View>{myView3()}</View>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: white,
  },
  container: {
    flex: 1,
    marginBottom: responsiveHeight(8),
    backgroundColor: 'white',
  },
  invitesContainer: {
    flexDirection: 'column',
    marginBottom: responsiveHeight(2),
  },
  invitesRow: {
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: responsiveHeight(2),
  },
  cardsRow: {
    flexDirection: 'row',
    marginTop: 5,
    width: responsiveWidth(100),
  },
  cardsColumn: {
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(1),
    paddingTop: responsiveHeight(2),
  },
  wedDecCard: {
    width: responsiveWidth(30),
  },
  cardImage: {height: responsiveHeight(22), width: responsiveWidth(30)},
  questionBox1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(2),
    marginVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
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
    marginHorizontal: responsiveWidth(2),
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
  },
  // questionHeadingTxt1:{color:"#000D52",fontSize:14, fontWeight:"700"},
});

export default Einvites;
