import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

export const getAllEvents = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        'https://caterstation.pro/api/event-types',
      );
      const eventData = JSON.stringify(result);
      resolve(result?.data || {}); // Resolve with empty object if no data
    } catch (error) {
      //console.log("error from api:", error);
      reject(error);
    }
  });
};
export const checkConnected = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};
