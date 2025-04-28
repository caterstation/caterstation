import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {black, blue} from './Colors';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from './redux/MyUserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HorizontalBar from './HorizontalBar';

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  //console.log('edit user', user);

  const user_id = user.id;
  const navigation = useNavigation();
  const [name, setName] = useState(user && user !== null ? user.name : '');
  const [phn, setphn] = useState(user && user !== null ? user.phone : '');
  const [email, setEmail] = useState(user && user !== null ? user.email : '');
  const [loading, setLoading] = useState(false);

  const savephnNumber = async phnNumber => {
    try {
      await AsyncStorage.setItem('phnNumber', phn);
      //console.log('phn number saved successfully!');
    } catch (error) {
      console.error('Error saving phn number:', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://caterstation.pro/api/update-profile',
        {
          name,
          phn,
          email,
          user_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(userLogin(response.data.user));
      savephnNumber();
      //console.log('POST request successful:', JSON.stringify(response.data, null, 2));
      Alert.alert('Your details are updated');
      navigation.navigate('ProfilePage');
    } catch (error) {
      console.error('Error in POST request:', error);
      Alert.alert('An error occurred while updating your details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HorizontalBar
        backPress={() => navigation.goBack()}
        title="Edit Profile"
      />
      <View style={styles.avatarCenter}>
        <View style={styles.shadowCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" color={'white'} size={50} />
          </View>
        </View>
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholderTextColor={'black'}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholderTextColor={'black'}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          style={styles.input}
        />
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholderTextColor={'black'}
          value={phn}
          keyboardType="number-pad"
          onChangeText={setphn}
          placeholder="Phone Number"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSubmit}
          style={styles.button}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerText: {
    marginLeft: 100,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarCenter: {
    // flex: 1,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  shadowCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginBottom: 10,
    color: black,
    marginHorizontal: 20,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: black,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: blue,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default EditProfile;
