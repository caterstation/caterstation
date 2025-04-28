import { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { MyStore } from './Src/redux/MyStore';
import messaging from '@react-native-firebase/messaging';
import Navigation from './Src/Navigation';
import { initializeFCM } from './Src/utils/fcmHelper';
import axios from 'axios';
import { white } from './Src/Colors';

const App = () => {
  useEffect(() => {
    const setupFCM = async () => {
      await initializeFCM();
      const token = await messaging().getToken();
      try {
        await axios.post('https://caterstation.pro/api/device-token', {
          device_token: token,
        });
        console.log('Device token sent successfully');
      } catch (error) {
        console.error('Failed to send device token:', error);
      }
    };

    setupFCM();
  }, []);

  return (
    <Provider store={MyStore}>
      <View style={{ flex: 1, backgroundColor: white }}>
        <Navigation />
      </View>
    </Provider>
  );
};

export default App;
