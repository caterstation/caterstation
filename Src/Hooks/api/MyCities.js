import axios from 'axios';
export const getAllCities = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        'https://www.caterstation.pro/api/all-cities',
      );
      resolve(result?.data || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};
