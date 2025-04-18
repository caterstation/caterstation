// import { View, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Provider } from 'react-redux';
// import { MyStore } from './Src/redux/MyStore';
// import Navigation from './Src/Navigation'
// import messaging from '@react-native-firebase/messaging'
// import { registerListenerWithFCM } from './Src/utils/fcmHelper';
// import axios from "axios";
 

// const App = () => {
//   const [token, setToken] = useState(null);

//   const registerAndGetToken = async () => {
//     try {
//       console.log("Registering device for remote messages...");
//       await messaging().registerDeviceForRemoteMessages();
//       console.log("Device registered for remote messages.");

//       console.log("Fetching token...");
//       const fetchedToken = await messaging().getToken();
//       setToken(fetchedToken);


//       try {
//         await axios.post('https://caterstation.pro/api/device-token', {
//           device_token:fetchedToken
//         });
//         console.log('====================================');
//         console.log("successfull");
//         console.log('====================================');
//       } catch (error) {
//         if (error.response) {
//           console.error('HTTP error! status fom push nortifi:', error.response);
//         } else {
//           console.error('Error from:', error.message);
//         }
//       }
   
//       console.log("Token fetched: ", fetchedToken);
//     } catch (error) {
//       console.error("Error fetching token: ", error);
//     }
//   };
  
//   // const handleSubmit = async () => {
    



//   //   try {
//   //     await axios.post('https://caterstation.pro/api/device-token', {
//   //       device_token:token
//   //     });
//   //   } catch (error) {
//   //     if (error.response) {
//   //       console.error('HTTP error! status:', error.response);
//   //     } else {
//   //       console.error('Error from:', error.message);
//   //     }
//   //   }
//   // };

//   useEffect(() => {
//     console.log('useEffect of App.js is working');
//     registerAndGetToken();
//     // handleSubmit();
//   }, []);


//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     console.log("notification : ", JSON.stringify(remoteMessage.notification.title));
//     Alert.alert('CaterStation', JSON.stringify(remoteMessage.notification.title));
//   });

//   const unsubscribeFCM = registerListenerWithFCM();

  
  
//   return (
// <Provider store={MyStore}>
//     <Navigation/>
// </Provider>
  
//   )
// }

// export default App;











import { View, Text, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { MyStore } from './Src/redux/MyStore';
import Navigation from './Src/Navigation';
import messaging from '@react-native-firebase/messaging';
import { registerListenerWithFCM } from './Src/utils/fcmHelper';
import axios from "axios";
import { Alert } from 'react-native';
import { white } from './Src/Colors';

const App = () => {
  const [token, setToken] = useState(null);

  const registerAndGetToken = async () => {
    try {
      console.log("Registering device for remote messages...");
      await messaging().registerDeviceForRemoteMessages();
      console.log("Device registered for remote messages.");

      console.log("Fetching token...");
      const fetchedToken = await messaging().getToken();
      setToken(fetchedToken);

      try {
        await axios.post('https://caterstation.pro/api/device-token', {
          device_token: fetchedToken
        });
        console.log('====================================');
        console.log("successfull");
        console.log('====================================');
      } catch (error) {
        if (error.response) {
          console.error('HTTP error! status fom push nortifi:', error.response);
        } else {
          console.error('Error from:', error.message);
        }
      }

      console.log("Token fetched: ", fetchedToken);
    } catch (error) {
      console.error("Error fetching token: ", error);
    }
  };

  useEffect(() => {
    console.log('useEffect of App.js is working');
    registerAndGetToken();
  }, []);

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log("notification : ", JSON.stringify(remoteMessage.notification.title));
    Alert.alert('CaterStation', JSON.stringify(remoteMessage.notification.title));
  });

  const unsubscribeFCM = registerListenerWithFCM();

  return (
    <Provider store={MyStore}>
      <View style={{ flex: 1 , backgroundColor:white}}>
        {/* <StatusBar barStyle="dark-content" backgroundColor={white} /> */}

        {/* <StatusBar
barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
  backgroundColor={Platform.OS === 'android' ? {white} : undefined}
/> */}
        <Navigation />
      </View>
    </Provider>
  )
}

export default App;